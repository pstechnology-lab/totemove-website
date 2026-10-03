/**
 * POST /api/helcim-initialize
 *
 * Starts a HelcimPay.js checkout session for a cart built on the
 * /checkout page (package + add-ons + extra weeks + delivery/pick-up
 * addresses + e-signature). The amount charged is always recomputed
 * here from PACKAGES/ADDONS below — never trust a total sent by the
 * client. Keep this table in sync with the display copy in checkout.js.
 *
 * Requires environment bindings on the Cloudflare project:
 *   - HELCIM_API_TOKEN  (secret) — API Access Configuration token from
 *     the Helcim dashboard, scoped to allow HelcimPay.js checkout/purchase.
 *   - CHECKOUT_KV        (KV namespace) — holds the secretToken + order
 *     details returned by Helcim, looked up again in helcim-validate.js.
 */

const PACKAGES = {
  'studio':    { name: 'Studio / 1-Bedroom Package', amount: 119, totes: 20 },
  '1bed-plus': { name: '1 Bedroom Plus Package',      amount: 149, totes: 30 },
  '2bed':      { name: '2-Bedroom Package',           amount: 189, totes: 45 },
  '3bed':      { name: '3-Bedroom Package',           amount: 229, totes: 60 },
  '4bed':      { name: '4-Bedroom Package',           amount: 299, totes: 80 },
  '5bed':      { name: '5-Bedroom Package',           amount: 389, totes: 100 },
};

const ADDONS = {
  'extra-dolly':       { name: 'Extra Dolly',                   amount: 25 },
  'extra-totes':       { name: 'Bundle of 10 Extra Totes',      amount: 25 },
  'moving-blankets':   { name: 'Moving Blankets (2 blankets)',  perWeek: 5 },
  'priority-delivery': { name: 'Priority Weekend Delivery',     amount: 15 },
};

const EXTRA_TOTES_COUNT = 10;
const EXTRA_WEEK_RATE_PER_TOTE = 1; // $1/tote/week
const INCLUDED_WEEKS = 2;
const MAX_EXTRA_WEEKS = 4;
const SERVICE_CITIES = ['Brampton', 'Caledon', 'Georgetown', 'Acton', 'Halton Hills', 'Bolton', 'Erin', 'Hillsburgh', 'Orangeville', 'Mississauga'];
const AGREEMENT_VERSION = 'v1-2026-10-03';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function validateAddress(addr) {
  if (!addr || typeof addr !== 'object') return 'Address is required.';
  const required = ['streetNumber', 'street', 'city', 'province', 'postalCode'];
  for (const key of required) {
    if (!addr[key] || !String(addr[key]).trim()) return `Missing required address field: ${key}.`;
  }
  if (!SERVICE_CITIES.includes(addr.city)) return `We don't currently service ${addr.city}. Please call us.`;
  if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(String(addr.postalCode).trim())) return 'Invalid postal code.';
  if (addr.elevator !== 'yes' && addr.elevator !== 'no') return 'Missing elevator access selection.';
  return null;
}

function formatAddress(addr) {
  const line1 = addr.unit ? `${addr.streetNumber} ${addr.street}, Unit ${addr.unit}` : `${addr.streetNumber} ${addr.street}`;
  const line2 = [addr.city, addr.province, addr.postalCode].filter(Boolean).join(' ');
  return `${line1}, ${line2} (Elevator: ${addr.elevator === 'yes' ? 'Yes' : 'No'})`;
}

export async function onRequestPost({ request, env }) {
  if (!env.HELCIM_API_TOKEN) {
    return json({ error: 'Payments are not configured yet. Please contact us to complete your booking.' }, 500);
  }
  if (!env.CHECKOUT_KV) {
    return json({ error: 'Payments are temporarily unavailable. Please contact us to complete your booking.' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const pkg = PACKAGES[body.packageId];
  if (!pkg) {
    return json({ error: 'Please choose a valid package.' }, 400);
  }

  const addonIds = Array.isArray(body.addonIds) ? [...new Set(body.addonIds)] : [];
  const invalidAddon = addonIds.find(id => !ADDONS[id]);
  if (invalidAddon) {
    return json({ error: 'One of the selected features is not available.' }, 400);
  }

  const extraWeeks = Math.max(0, Math.min(MAX_EXTRA_WEEKS, parseInt(body.extraWeeks, 10) || 0));

  const contact = body.contact || {};
  if (!contact.name || !contact.email || !contact.phone) {
    return json({ error: 'Please fill in all required contact details.' }, 400);
  }

  const delivery = body.delivery || {};
  if (!delivery.moveDate) {
    return json({ error: 'Please select a move date.' }, 400);
  }

  const dropoffError = validateAddress(delivery.dropoff);
  if (dropoffError) return json({ error: `Drop off address: ${dropoffError}` }, 400);

  const pickup = delivery.pickup && delivery.pickup.sameAsDropoff ? delivery.dropoff : delivery.pickup;
  const pickupError = validateAddress(pickup);
  if (pickupError) return json({ error: `Pick up address: ${pickupError}` }, 400);

  const signature = body.signature || {};
  if (!signature.agreedAt) {
    return json({ error: 'Please accept the rental agreement and liability waiver.' }, 400);
  }

  const lineItems = [{ description: pkg.name, amount: pkg.amount }];
  let total = pkg.amount;

  addonIds.forEach(id => {
    if (id === 'moving-blankets') return;
    const addon = ADDONS[id];
    lineItems.push({ description: addon.name, amount: addon.amount });
    total += addon.amount;
  });

  const toteRate = pkg.totes + (addonIds.includes('extra-totes') ? EXTRA_TOTES_COUNT : 0);
  if (extraWeeks > 0) {
    const weeksAmount = extraWeeks * toteRate * EXTRA_WEEK_RATE_PER_TOTE;
    lineItems.push({ description: `${extraWeeks} extra week(s) (${toteRate} totes × $1)`, amount: weeksAmount });
    total += weeksAmount;
  }

  if (addonIds.includes('moving-blankets')) {
    const addon = ADDONS['moving-blankets'];
    const totalWeeks = INCLUDED_WEEKS + extraWeeks;
    const blanketsAmount = addon.perWeek * totalWeeks;
    lineItems.push({ description: `${addon.name} — ${totalWeeks} wks`, amount: blanketsAmount });
    total += blanketsAmount;
  }

  let helcimRes;
  try {
    helcimRes = await fetch('https://api.helcim.com/v2/helcim-pay/initialize', {
      method: 'POST',
      headers: {
        'api-token': env.HELCIM_API_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        paymentType: 'purchase',
        amount: total,
        currency: 'CAD',
      }),
    });
  } catch (err) {
    return json({ error: 'Could not reach the payment provider. Please try again.' }, 502);
  }

  const helcimData = await helcimRes.json().catch(() => ({}));
  if (!helcimRes.ok || !helcimData.checkoutToken || !helcimData.secretToken) {
    console.error('Helcim initialize failed:', helcimRes.status, JSON.stringify(helcimData));
    return json({ error: 'Could not start checkout. Please try again.' }, 502);
  }

  const order = {
    packageId: body.packageId,
    packageName: pkg.name,
    addonIds,
    extraWeeks,
    lineItems,
    total,
    contact: { name: contact.name, email: contact.email, phone: contact.phone },
    delivery: {
      moveDate: delivery.moveDate,
      notes: delivery.notes || '',
      dropoffFormatted: formatAddress(delivery.dropoff),
      pickupFormatted: formatAddress(pickup),
    },
  };

  const signatureIp = request.headers.get('CF-Connecting-IP') || 'unknown';

  await env.CHECKOUT_KV.put(
    helcimData.checkoutToken,
    JSON.stringify({
      secretToken: helcimData.secretToken,
      order,
      signatureAgreedAt: signature.agreedAt,
      signatureIp,
      agreementVersion: AGREEMENT_VERSION,
      createdAt: Date.now(),
    }),
    { expirationTtl: 3600 }
  );

  return json({ checkoutToken: helcimData.checkoutToken });
}
