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

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = document.querySelector('.site-header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== HEADER SHADOW ON SCROLL ===== */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 8
    ? '0 2px 12px rgba(26,122,110,.12)'
    : '';
}, { passive: true });

/* ===== BOOKING FORM ===== */
const form = document.getElementById('bookingForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
document.getElementById('move-date').min = minDate.toISOString().split('T')[0];

const validators = {
  name: v => v.trim().length >= 2 ? '' : 'Please enter your full name.',
  phone: v => /^[\d\s\-()+.]{7,20}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  'home-size': v => v ? '' : 'Please select your home size.',
  'move-date': v => {
    if (!v) return 'Please select a move date.';
    const chosen = new Date(v + 'T00:00:00');
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0,0,0,0);
    return chosen >= tomorrow ? '' : 'Move date must be at least tomorrow.';
  },
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
  if (el) {
    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateField(id);
    });
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const valid = Object.keys(validators).map(id => validateField(id)).every(Boolean);
  if (!valid) {
    const firstInvalid = form.querySelector('.invalid');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  /* In production replace this timeout with a real fetch() to your form endpoint. */
  setTimeout(() => {
    form.querySelectorAll('.form-row, .form-group, .form-submit').forEach(el => {
      el.style.display = 'none';
    });
    successMsg.hidden = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 800);
});
