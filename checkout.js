/* ===== MOBILE NAV ===== */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  mobileNav.hidden = !open;
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
  });
});

/* =====================================================================
   PRICING — for on-page display only. The Helcim checkout amount is
   always recalculated from the matching table on the server
   (functions/api/helcim-initialize.js), which is the source of truth.
   Keep both tables in sync when prices change.
   ===================================================================== */
const PACKAGES = [
  { id: 'studio',     name: 'Studio / 1-Bedroom', price: 11900, totes: 20,  blurb: '20 totes · 1 dolly' },
  { id: '1bed-plus',  name: '1 Bedroom Plus',      price: 14900, totes: 30,  blurb: '30 totes · 1 dolly' },
  { id: '2bed',       name: '2-Bedroom',           price: 18900, totes: 45,  blurb: '45 totes · 1 dolly', featured: true },
  { id: '3bed',       name: '3-Bedroom',           price: 22900, totes: 60,  blurb: '60 totes · 1 dolly' },
  { id: '4bed',       name: '4-Bedroom',           price: 29900, totes: 80,  blurb: '80 totes · 2 dollies' },
  { id: '5bed',       name: '5-Bedroom',           price: 38900, totes: 100, blurb: '100 totes · 2 dollies' },
];

const ADDONS = [
  { id: 'extra-dolly',       name: 'Extra Dolly',                price: 2500 },
  { id: 'extra-totes',       name: 'Bundle of 10 Extra Totes',   price: 2500 },
  { id: 'moving-blankets',   name: 'Moving Blankets (2 blankets)', perWeek: 500 },
  { id: 'priority-delivery', name: 'Priority Weekend Delivery',  price: 1500 },
];

const HST_RATE = 0.13; // Ontario HST
const EXTRA_TOTES_COUNT = 10;
const EXTRA_WEEK_RATE_PER_TOTE = 100; // $1.00/tote/week, in cents
const INCLUDED_WEEKS = 2;
const MAX_EXTRA_WEEKS = 4;
const SERVICE_CITIES = ['Brampton', 'Caledon', 'Georgetown', 'Acton', 'Halton Hills', 'Bolton', 'Erin', 'Hillsburgh', 'Orangeville', 'Mississauga'];

const fmt = cents => `$${(cents / 100).toFixed(2)}`;

/* ===== STATE ===== */
const state = {
  packageId: null,
  addonIds: new Set(),
  extraWeeks: 0,
};

/* ===== RENDER PACKAGE OPTIONS ===== */
const packageOptions = document.getElementById('packageOptions');
PACKAGES.forEach(pkg => {
  const label = document.createElement('label');
  label.className = 'package-option' + (pkg.featured ? ' package-option--featured' : '');
  label.innerHTML = `
    <input type="radio" name="package" value="${pkg.id}" />
    ${pkg.featured ? '<span class="package-badge">MOST POPULAR</span>' : ''}
    <span class="package-option-name">${pkg.name}</span>
    <span class="package-option-blurb">${pkg.blurb}</span>
    <span class="package-option-price">${fmt(pkg.price)}</span>
  `;
  label.querySelector('input').addEventListener('change', () => {
    state.packageId = pkg.id;
    document.getElementById('package-error').textContent = '';
    packageOptions.querySelectorAll('.package-option').forEach(el => el.classList.remove('is-selected'));
    label.classList.add('is-selected');
    updateSummary();
  });
  packageOptions.appendChild(label);
});

/* ===== RENDER ADD-ON OPTIONS ===== */
const addonOptions = document.getElementById('addonOptions');
ADDONS.forEach(addon => {
  const label = document.createElement('label');
  label.className = 'addon-option';
  const priceLabel = addon.perWeek ? `+${fmt(addon.perWeek)}/wk` : `+${fmt(addon.price)}`;
  label.innerHTML = `
    <input type="checkbox" name="addon" value="${addon.id}" />
    <span class="addon-option-name">${addon.name}</span>
    <span class="addon-option-price">${priceLabel}</span>
  `;
  label.querySelector('input').addEventListener('change', e => {
    if (e.target.checked) state.addonIds.add(addon.id);
    else state.addonIds.delete(addon.id);
    label.classList.toggle('is-selected', e.target.checked);
    updateSummary();
  });
  addonOptions.appendChild(label);
});

/* ===== WEEKS STEPPER ===== */
const weeksValue = document.getElementById('weeksValue');
const weeksRateHint = document.getElementById('weeksRateHint');

function toteRate() {
  const pkg = PACKAGES.find(p => p.id === state.packageId);
  if (!pkg) return 0;
  return pkg.totes + (state.addonIds.has('extra-totes') ? EXTRA_TOTES_COUNT : 0);
}

function updateWeeksHint() {
  const rate = toteRate();
  if (rate > 0) {
    weeksRateHint.textContent = `≈ ${fmt(rate * EXTRA_WEEK_RATE_PER_TOTE)}/week with your current selections`;
    weeksRateHint.hidden = false;
  } else {
    weeksRateHint.hidden = true;
  }
}

document.getElementById('weeksMinus').addEventListener('click', () => {
  state.extraWeeks = Math.max(0, state.extraWeeks - 1);
  weeksValue.textContent = state.extraWeeks;
  updateSummary();
});
document.getElementById('weeksPlus').addEventListener('click', () => {
  state.extraWeeks = Math.min(MAX_EXTRA_WEEKS, state.extraWeeks + 1);
  weeksValue.textContent = state.extraWeeks;
  updateSummary();
});

/* ===== ORDER SUMMARY ===== */
const summaryLines = document.getElementById('summaryLines');
const summaryTotal = document.getElementById('summaryTotal');

function updateSummary() {
  summaryLines.innerHTML = '';
  updateWeeksHint();
  updateSignLine();

  const pkg = PACKAGES.find(p => p.id === state.packageId);
  if (!pkg) {
    summaryLines.innerHTML = '<li class="summary-empty">Choose a package to get started.</li>';
    summaryTotal.textContent = '$0.00';
    return;
  }

  let total = pkg.price;
  addSummaryLine(pkg.name, pkg.price);

  state.addonIds.forEach(id => {
    if (id === 'moving-blankets') return; // added below with weeks-aware pricing
    const addon = ADDONS.find(a => a.id === id);
    if (!addon) return;
    total += addon.price;
    addSummaryLine(addon.name, addon.price);
  });

  if (state.extraWeeks > 0) {
    const rate = toteRate();
    const weeksTotal = state.extraWeeks * rate * EXTRA_WEEK_RATE_PER_TOTE;
    total += weeksTotal;
    addSummaryLine(`${state.extraWeeks} extra week${state.extraWeeks > 1 ? 's' : ''} (${rate} totes × $1)`, weeksTotal);
  }

  if (state.addonIds.has('moving-blankets')) {
    const addon = ADDONS.find(a => a.id === 'moving-blankets');
    const totalWeeks = INCLUDED_WEEKS + state.extraWeeks;
    const blanketsTotal = addon.perWeek * totalWeeks;
    total += blanketsTotal;
    addSummaryLine(`${addon.name} — ${totalWeeks} wks`, blanketsTotal);
  }

  addSummaryLine('Subtotal', total, 'summary-subtotal');

  const hst = Math.round(total * HST_RATE);
  addSummaryLine('HST (13%)', hst, 'summary-tax');
  total += hst;

  summaryTotal.textContent = fmt(total);
}

function addSummaryLine(name, price, extraClass) {
  const li = document.createElement('li');
  if (extraClass) li.className = extraClass;
  li.innerHTML = `<span>${name}</span><span>${fmt(price)}</span>`;
  summaryLines.appendChild(li);
}

/* ===== STRUCTURED ADDRESS: SAME-AS-DROPOFF TOGGLE ===== */
const sameAsDropoff = document.getElementById('pu-same');
const pickupFields = document.getElementById('pickupFields');

sameAsDropoff.addEventListener('change', () => {
  pickupFields.hidden = sameAsDropoff.checked;
});

['pu-number', 'pu-street', 'pu-city', 'pu-province', 'pu-postal'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  const revalidate = () => { if (el.classList.contains('invalid')) validatePickup(); };
  el.addEventListener('blur', revalidate);
  el.addEventListener('input', revalidate);
  if (el.tagName === 'SELECT') el.addEventListener('change', revalidate);
});

/* ===== SIGN & ACCEPT: LIVE CONFIRMATION LINE ===== */
const signLine = document.getElementById('signLine');

function formatAddress(numberEl, streetEl, unitEl, cityEl, provinceEl, postalEl) {
  const number = numberEl.value.trim();
  const street = streetEl.value.trim();
  const unit = unitEl.value.trim();
  const city = cityEl.value.trim();
  const province = provinceEl.value.trim();
  const postal = postalEl.value.trim();
  if (!number || !street || !city) return '';
  const line1 = unit ? `${number} ${street}, Unit ${unit}` : `${number} ${street}`;
  const line2 = [city, province, postal].filter(Boolean).join(' ');
  return `${line1}, ${line2}`;
}

function updateSignLine() {
  const name = document.getElementById('co-name').value.trim();
  const address = formatAddress(
    document.getElementById('do-number'),
    document.getElementById('do-street'),
    document.getElementById('do-unit'),
    document.getElementById('do-city'),
    document.getElementById('do-province'),
    document.getElementById('do-postal')
  );
  if (!name && !address) {
    signLine.innerHTML = 'Signing as <strong>—</strong>';
    return;
  }
  signLine.innerHTML = `Signing as <strong>${name || '—'}</strong>${address ? `, ${address}` : ''}`;
}

['co-name', 'do-number', 'do-street', 'do-unit', 'do-city', 'do-province', 'do-postal'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', updateSignLine);
  if (el && el.tagName === 'SELECT') el.addEventListener('change', updateSignLine);
});

updateSummary();
updateSignLine();

/* ===== FORM VALIDATION ===== */
const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
document.getElementById('co-move-date').min = minDate.toISOString().split('T')[0];

const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

const validators = {
  'co-name':      v => v.trim().length >= 2 ? '' : 'Please enter your full name.',
  'co-phone':     v => /^[\d\s\-()+.]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.',
  'co-email':     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  'co-move-date': v => {
    if (!v) return 'Please select a move date.';
    const chosen = new Date(v + 'T00:00:00');
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0, 0, 0, 0);
    return chosen >= tomorrow ? '' : 'Move date must be at least tomorrow.';
  },
  'do-number':   v => v.trim() ? '' : 'Required.',
  'do-street':   v => v.trim() ? '' : 'Required.',
  'do-city':     v => SERVICE_CITIES.includes(v) ? '' : 'Please select a city.',
  'do-province': v => v.trim() ? '' : 'Required.',
  'do-postal':   v => POSTAL_RE.test(v.trim()) ? '' : 'Enter a valid postal code (e.g. L6T 1A1).',
};

function validateField(id) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(id + '-error');
  if (!el || !errEl || !validators[id]) return true;
  const msg = validators[id](el.value);
  errEl.textContent = msg;
  el.classList.toggle('invalid', !!msg);
  return !msg;
}

Object.keys(validators).forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', () => validateField(id));
  el.addEventListener('input', () => {
    if (el.classList.contains('invalid')) validateField(id);
  });
  if (el.tagName === 'SELECT') el.addEventListener('change', () => validateField(id));
});

function validatePackage() {
  const errEl = document.getElementById('package-error');
  if (!state.packageId) {
    errEl.textContent = 'Please choose a package.';
    return false;
  }
  errEl.textContent = '';
  return true;
}

function validateRadioGroup(name, errElId) {
  const errEl = document.getElementById(errElId);
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  if (!checked) {
    errEl.textContent = 'Please select an option.';
    return false;
  }
  errEl.textContent = '';
  return true;
}

document.querySelectorAll('input[name="dropoff-elevator"]').forEach(el => {
  el.addEventListener('change', () => validateRadioGroup('dropoff-elevator', 'do-elevator-error'));
});
document.querySelectorAll('input[name="pickup-elevator"]').forEach(el => {
  el.addEventListener('change', () => validateRadioGroup('pickup-elevator', 'pu-elevator-error'));
});

function validatePickup() {
  if (sameAsDropoff.checked) return true;
  const pickupValidators = {
    'pu-number':   v => v.trim() ? '' : 'Required.',
    'pu-street':   v => v.trim() ? '' : 'Required.',
    'pu-city':     v => SERVICE_CITIES.includes(v) ? '' : 'Please select a city.',
    'pu-province': v => v.trim() ? '' : 'Required.',
    'pu-postal':   v => POSTAL_RE.test(v.trim()) ? '' : 'Enter a valid postal code (e.g. L6T 1A1).',
  };
  let valid = true;
  Object.keys(pickupValidators).forEach(id => {
    const el = document.getElementById(id);
    const errEl = document.getElementById(id + '-error');
    const msg = pickupValidators[id](el.value);
    errEl.textContent = msg;
    el.classList.toggle('invalid', !!msg);
    if (msg) valid = false;
  });
  if (!validateRadioGroup('pickup-elevator', 'pu-elevator-error')) valid = false;
  return valid;
}

function validateAgree() {
  const el = document.getElementById('co-agree');
  const errEl = document.getElementById('co-agree-error');
  if (el.disabled) {
    errEl.textContent = 'Please open and review both the Rental Agreement and Liability Waiver links above first.';
    return false;
  }
  if (!el.checked) {
    errEl.textContent = 'Please accept the rental agreement and liability waiver to continue.';
    return false;
  }
  errEl.textContent = '';
  return true;
}

document.getElementById('co-agree').addEventListener('change', validateAgree);

/* ===== SIGN & ACCEPT: MUST OPEN BOTH DOCUMENTS FIRST ===== */
const viewed = { rentalAgreement: false, liabilityWaiver: false };
const agreeCheckbox = document.getElementById('co-agree');
const agreeHint = document.getElementById('agreeHint');

function updateAgreeAvailability() {
  const bothViewed = viewed.rentalAgreement && viewed.liabilityWaiver;
  agreeCheckbox.disabled = !bothViewed;
  if (bothViewed) {
    agreeHint.textContent = 'Thanks — you can now check the box below.';
  } else if (viewed.rentalAgreement) {
    agreeHint.textContent = 'Now open the Liability Waiver link above too.';
  } else if (viewed.liabilityWaiver) {
    agreeHint.textContent = 'Now open the Rental Agreement link above too.';
  } else {
    agreeHint.textContent = 'Open both documents above to enable this checkbox.';
  }
}

document.getElementById('rentalAgreementLink').addEventListener('click', () => {
  viewed.rentalAgreement = true;
  updateAgreeAvailability();
});
document.getElementById('liabilityWaiverLink').addEventListener('click', () => {
  viewed.liabilityWaiver = true;
  updateAgreeAvailability();
});

/* ===== SUBMIT / PAYMENT ===== */
const form = document.getElementById('checkoutForm');
const payBtn = document.getElementById('payBtn');
const payBtnLabel = document.getElementById('payBtnLabel');
const summaryError = document.getElementById('summaryError');

let helcimScriptPromise = null;
function loadHelcimScript() {
  if (helcimScriptPromise) return helcimScriptPromise;
  helcimScriptPromise = new Promise((resolve, reject) => {
    if (window.appendHelcimPayIframe) return resolve();
    const script = document.createElement('script');
    script.src = 'https://secure.helcim.app/helcim-pay/services/start.js';
    script.onload = resolve;
    script.onerror = () => reject(new Error('Could not load the secure payment form. Please check your connection and try again.'));
    document.head.appendChild(script);
  });
  return helcimScriptPromise;
}

function showError(msg) {
  summaryError.textContent = msg;
  summaryError.hidden = false;
  summaryError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearError() {
  summaryError.hidden = true;
  summaryError.textContent = '';
}

function setPaying(isPaying, label) {
  payBtn.disabled = isPaying;
  payBtnLabel.textContent = label || (isPaying ? 'Processing…' : 'Reserve & Pay Now →');
}

function addressFromFields(prefix) {
  return {
    streetNumber: document.getElementById(`${prefix}-number`).value.trim(),
    street: document.getElementById(`${prefix}-street`).value.trim(),
    unit: document.getElementById(`${prefix}-unit`).value.trim(),
    city: document.getElementById(`${prefix}-city`).value.trim(),
    province: document.getElementById(`${prefix}-province`).value.trim(),
    postalCode: document.getElementById(`${prefix}-postal`).value.trim(),
    elevator: (document.querySelector(`input[name="${prefix === 'do' ? 'dropoff' : 'pickup'}-elevator"]:checked`) || {}).value || '',
  };
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearError();

  const fieldsValid = Object.keys(validators).map(id => validateField(id)).every(Boolean);
  const packageValid = validatePackage();
  const elevatorValid = validateRadioGroup('dropoff-elevator', 'do-elevator-error');
  const pickupValid = validatePickup();
  const agreeValid = validateAgree();

  if (!fieldsValid || !packageValid || !elevatorValid || !pickupValid || !agreeValid) {
    const firstInvalid = form.querySelector('.invalid') || document.getElementById('packageOptions');
    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const dropoff = addressFromFields('do');
  const pickup = sameAsDropoff.checked ? { ...dropoff, sameAsDropoff: true } : { ...addressFromFields('pu'), sameAsDropoff: false };

  const order = {
    packageId: state.packageId,
    addonIds: Array.from(state.addonIds),
    extraWeeks: state.extraWeeks,
    contact: {
      name: document.getElementById('co-name').value.trim(),
      email: document.getElementById('co-email').value.trim(),
      phone: document.getElementById('co-phone').value.trim(),
    },
    delivery: {
      moveDate: document.getElementById('co-move-date').value,
      notes: document.getElementById('co-notes').value.trim(),
      dropoff,
      pickup,
    },
    signature: {
      agreedAt: new Date().toISOString(),
    },
  };

  setPaying(true, 'Loading secure payment…');

  try {
    const [initRes] = await Promise.all([
      fetch('/api/helcim-initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      }),
      loadHelcimScript(),
    ]);

    const initData = await initRes.json().catch(() => ({}));
    if (!initRes.ok || !initData.checkoutToken) {
      throw new Error(initData.error || 'Could not start checkout. Please try again.');
    }

    const checkoutToken = initData.checkoutToken;
    setPaying(true, 'Opening payment form…');

    const handleMessage = async event => {
      const payload = event.data;
      if (!payload || payload.eventName !== `helcim-pay-js-${checkoutToken}`) return;

      if (payload.eventStatus === 'ABORTED' || payload.eventStatus === 'HIDE') {
        window.removeEventListener('message', handleMessage);
        if (payload.eventStatus === 'ABORTED') showError('Payment was not completed. Please try again.');
        setPaying(false);
        return;
      }

      if (payload.eventStatus === 'SUCCESS') {
        window.removeEventListener('message', handleMessage);
        setPaying(true, 'Confirming payment…');
        try {
          const parsed = typeof payload.eventMessage === 'string' ? JSON.parse(payload.eventMessage) : payload.eventMessage;
          const verifyRes = await fetch('/api/helcim-validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutToken, response: parsed }),
          });
          const verifyData = await verifyRes.json().catch(() => ({}));
          if (!verifyRes.ok || !verifyData.ok) {
            throw new Error(verifyData.error || 'We could not confirm your payment. Please contact us before trying again.');
          }
          sessionStorage.setItem('totemove-order-summary', JSON.stringify({
            packageName: PACKAGES.find(p => p.id === state.packageId)?.name,
            total: summaryTotal.textContent,
            name: order.contact.name,
            email: order.contact.email,
            moveDate: order.delivery.moveDate,
          }));
          window.location.href = '/checkout-success';
        } catch (err) {
          showError(err.message);
          setPaying(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    window.appendHelcimPayIframe(checkoutToken);
    setPaying(true, 'Complete payment in the window above ↑');
  } catch (err) {
    showError(err.message || 'Something went wrong. Please try again.');
    setPaying(false);
  }
});
