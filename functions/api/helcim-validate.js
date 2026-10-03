/**
 * POST /api/helcim-validate
 *
 * Confirms a HelcimPay.js SUCCESS postMessage is genuine before we treat
 * an order as paid. We recompute the SHA-256 hash of the transaction data
 * using the secretToken we stored server-side during /api/helcim-initialize
 * (never exposed to the browser) and compare it to the hash HelcimPay.js
 * returned. On success we notify the team by email and burn the token so
 * it can't be replayed.
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdabowrv';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function sha256Hex(input) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env }) {
  if (!env.CHECKOUT_KV) {
    return json({ ok: false, error: 'Payments are temporarily unavailable. Please contact us.' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  const { checkoutToken, response } = body;
  if (!checkoutToken || !response || typeof response.data === 'undefined' || !response.hash) {
    return json({ ok: false, error: 'Malformed payment response.' }, 400);
  }

  const record = await env.CHECKOUT_KV.get(checkoutToken);
  if (!record) {
    return json({ ok: false, error: 'This checkout session has expired. Please start again.' }, 410);
  }

  const { secretToken, order, signatureAgreedAt, signatureIp, agreementVersion } = JSON.parse(record);

  const expectedHash = await sha256Hex(JSON.stringify(response.data) + secretToken);
  if (expectedHash.toLowerCase() !== String(response.hash).toLowerCase()) {
    return json({ ok: false, error: 'Payment verification failed. Please contact us before trying again.' }, 400);
  }

  // Token is single-use once verified.
  await env.CHECKOUT_KV.delete(checkoutToken);

  const transactionId = response.data.transactionId || response.data.cardTransactionId || checkoutToken;

  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: `Paid Checkout Order — ${order.contact.name} — $${order.total}`,
        name: order.contact.name,
        email: order.contact.email,
        phone: order.contact.phone,
        package: order.packageName,
        addons: order.lineItems.slice(1, -1).map(li => li.description).join(', ') || 'None',
        hst: `$${order.lineItems[order.lineItems.length - 1].amount} CAD`,
        total: `$${order.total} CAD`,
        'move-date': order.delivery.moveDate,
        'dropoff-address': order.delivery.dropoffFormatted,
        'pickup-address': order.delivery.pickupFormatted,
        notes: order.delivery.notes || '',
        transactionId,
        'signed-name': order.contact.name,
        'signed-at': signatureAgreedAt,
        'signed-ip': signatureIp,
        'agreement-version': agreementVersion,
      }),
    });
  } catch (err) {
    // Payment already succeeded and is verified — a failed notification email
    // shouldn't block the customer's confirmation. Log for manual follow-up.
    console.error('Order notification email failed:', err);
  }

  return json({ ok: true, order: { packageName: order.packageName, total: order.total } });
}
