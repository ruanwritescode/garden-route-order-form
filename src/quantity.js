// Quantity-input handlers. Referenced from inline markup, so main.js also
// exposes these on window.
import { qty } from './state.js';
import { saveState } from './state.js';
import { BLEND_VARIANTS } from './data.js';
import { recalc } from './calc.js';

export function onQtyChange(code, price, input) {
  const v = Math.max(0, parseInt(input.value) || 0);
  qty[code] = { qty: v, price, name: input.dataset.name };
  input.classList.toggle('has-value', v > 0);
  const ltId = 'lt-' + ('q-' + code.replace(/\//g, '-'));
  const lt = document.getElementById(ltId);
  if (lt) {
    lt.textContent = '$' + (v * price).toFixed(2);
    lt.classList.toggle('zero', v === 0);
  }
  recalc();
  saveState();
}

export function toggleCard(id, val) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('has-items', parseInt(val) > 0);
}

export function updateItemSub(cardId, price, val) {
  const v = Math.max(0, parseInt(val) || 0);
  const el = document.getElementById('sub-' + cardId);
  if (el) el.textContent = '$' + (v * price).toFixed(2);
}

export function updateBlendSub(scentCode) {
  let sub = 0;
  BLEND_VARIANTS.forEach(v => {
    const c = v.prefix + '/' + scentCode;
    const q = qty[c];
    if (q) sub += q.qty * q.price;
  });
  const el = document.getElementById('sub-' + scentCode);
  if (el) {
    el.textContent = '$' + sub.toFixed(2);
    el.classList.toggle('zero', sub === 0);
  }
  const card = document.getElementById('sc-' + scentCode);
  if (card) card.classList.toggle('has-items', sub > 0);
}
