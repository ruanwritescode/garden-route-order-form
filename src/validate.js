// Order validation + the per-input error popover + the order-level banner.
import { qty } from './state.js';

// Returns { issues, hasNonOilProduct, totalOils, totalRoseHips, invalidCount }
export function validate() {
  const issues = [];

  // Aggregates needed for the casepack rules
  let totalOils = 0;
  let totalRoseHips = 0;
  let hasNonOilProduct = false;
  Object.entries(qty).forEach(([code, v]) => {
    if (v.qty <= 0) return;
    if (code.startsWith('FO/')) totalOils += v.qty;
    else hasNonOilProduct = true; // any BB, BBS, BBD, VF/, RH/ counts
    if (code.startsWith('RH/')) totalRoseHips += v.qty;
  });

  // Per-input step checks → shown as a popover near the input (not the banner)
  let invalidCount = 0;
  document.querySelectorAll('input.qty').forEach(input => {
    const v = parseInt(input.value) || 0;
    const step = parseInt(input.dataset.step) || 1;
    input.classList.remove('invalid');
    if (v > 0 && step > 1 && v % step !== 0) {
      input.classList.add('invalid');
      const next = Math.ceil(v / step) * step;
      input.dataset.errMsg = `Use a multiple of ${step}. Next valid: ${next}`;
      invalidCount++;
    } else {
      delete input.dataset.errMsg;
    }
  });

  // Rose hips must always complete casepacks of 24
  if (totalRoseHips > 0 && totalRoseHips % 24 !== 0) {
    const next = Math.ceil(totalRoseHips / 24) * 24;
    issues.push(`Rose hips must total a multiple of 24 (currently ${totalRoseHips}) — next valid quantity is ${next}. Add ${24 - (totalRoseHips % 24)} more.`);
  }

  // 24-pack rule when no other products in order
  if (!hasNonOilProduct && totalOils > 0 && totalOils % 24 !== 0) {
    const next = Math.ceil(totalOils / 24) * 24;
    issues.push(`Refresher-oils-only orders must total a multiple of 24 (currently ${totalOils}) — next valid quantity is ${next}. Add ${24 - (totalOils % 24)} more.`);
  }

  return { issues, hasNonOilProduct, totalOils, totalRoseHips, invalidCount };
}

// Floating popover anchored to a quantity input
export function showQtyPopover(input, msg) {
  const p = document.getElementById('qty-popover');
  if (!p) return;
  p.textContent = msg;
  p.style.display = 'block';
  const r = input.getBoundingClientRect();
  const pr = p.getBoundingClientRect();
  let left = r.left + r.width / 2 - pr.width / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));
  let top = r.top - pr.height - 9;
  let below = false;
  if (top < 8) { top = r.bottom + 9; below = true; } // flip under if no room above
  p.classList.toggle('below', below);
  p.style.left = left + 'px';
  p.style.top = top + 'px';
}

export function hideQtyPopover() {
  const p = document.getElementById('qty-popover');
  if (p) p.style.display = 'none';
}

// Show the popover only for the focused input when it's invalid
export function updateQtyPopover() {
  const a = document.activeElement;
  if (a && a.classList && a.classList.contains('qty') && a.classList.contains('invalid')) {
    showQtyPopover(a, a.dataset.errMsg || 'Invalid quantity');
  } else {
    hideQtyPopover();
  }
}

export function renderValidation(v) {
  const box = document.getElementById('validation-warning');
  if (v.issues.length === 0) {
    box.style.display = 'none';
    box.innerHTML = '';
  } else {
    box.style.display = 'block';
    box.innerHTML = '<strong>Please fix:</strong><ul>' +
      v.issues.map(i => `<li>${i}</li>`).join('') + '</ul>';
  }
  // Update refresher-oil tab note text to reflect current rule
  const note = document.getElementById('rf-rule-note');
  if (note) {
    if (!v.hasNonOilProduct) {
      note.innerHTML = '<strong>Quantities:</strong> Refresher oils are ordered in multiples of 6</br>Since this order contains no blends, vase fillers, or rose hips, the total across all scents must complete casepacks of 24.';
    } else {
      note.innerHTML = '<strong>Quantities:</strong> Refresher oils are ordered in multiples of 6.';
    }
  }
}
