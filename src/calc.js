// Totals, shipping tiers, per-tab metric rollups, and the master recalc().
import { qty } from './state.js';
import { FW_SCENTS, SS_SCENTS, BLEND_VARIANTS, VF_ITEMS, RH_ITEMS, RF_ITEMS } from './data.js';
import { updateSummaryTab } from './tabs/summary.js';
import { validate, renderValidation, updateQtyPopover } from './validate.js';

export function setText(id, txt) {
  const el = document.getElementById(id);
  if (el) el.textContent = txt;
}

// Compute aggregate metrics for a section scope: 'fw','ss','vf','rh','rf'.
export function computeTabMetrics(scope) {
  let largeUnits = 0, smallUnits = 0, oils = 0, displayBags = 0, units = 0, total = 0;

  if (scope === 'fw' || scope === 'ss') {
    const scents = scope === 'fw' ? FW_SCENTS : SS_SCENTS;
    scents.forEach(([code]) => {
      BLEND_VARIANTS.forEach(v => {
        const q = qty[v.prefix + '/' + code];
        if (!q || q.qty <= 0) return;
        total += q.qty * q.price;
        if (v.prefix === 'BB') largeUnits += q.qty;
        else if (v.prefix === 'BBS') smallUnits += q.qty;
        else if (v.prefix === 'FO') oils += q.qty;
        else if (v.prefix === 'BBD') displayBags += q.qty;
      });
    });
  } else if (scope === 'vf') {
    VF_ITEMS.forEach(([code, , , price]) => {
      const q = qty[code];
      if (q && q.qty > 0) { total += q.qty * price; units += q.qty; }
    });
  } else if (scope === 'rh') {
    RH_ITEMS.forEach(([code, , price]) => {
      const q = qty[code];
      if (q && q.qty > 0) { total += q.qty * price; units += q.qty; }
    });
  } else if (scope === 'rf') {
    RF_ITEMS.forEach(([code]) => {
      const q = qty[code];
      if (q && q.qty > 0) { total += q.qty * 6.75; oils += q.qty; }
    });
  }
  return {
    large_cases: Math.floor(largeUnits / 12),
    small_cases: Math.floor(smallUnits / 12),
    oils,
    displayBags,
    units,
    total,
  };
}

export function updateAllTabSummaries() {
  ['fw', 'ss'].forEach(scope => {
    const m = computeTabMetrics(scope);
    setText(`ts-sect-${scope}-large_cases`, m.large_cases);
    setText(`ts-sect-${scope}-small_cases`, m.small_cases);
    setText(`ts-sect-${scope}-oils`, m.oils);
    setText(`ts-sect-${scope}-displayBags`, m.displayBags);
    setText(`ts-sect-${scope}-total`, '$' + m.total.toFixed(2));
  });
  const mVf = computeTabMetrics('vf');
  setText('ts-sect-vf-cases', Math.floor(mVf.units / 12));
  setText('ts-sect-vf-total', '$' + mVf.total.toFixed(2));
  const mRh = computeTabMetrics('rh');
  setText('ts-sect-rh-cases', Math.floor(mRh.units / 24));
  setText('ts-sect-rh-total', '$' + mRh.total.toFixed(2));
  const mRf = computeTabMetrics('rf');
  setText('ts-sect-rf-oils', mRf.oils);
  setText('ts-sect-rf-total', '$' + mRf.total.toFixed(2));
}

export function shippingRate(sub) {
  if (sub >= 3000) return 0;
  if (sub >= 2000) return 0.10;
  if (sub >= 500) return 0.12;
  return 0.15;
}

export function recalc() {
  let sub = 0;
  Object.values(qty).forEach(q => { if (q.qty > 0) sub += q.qty * q.price; });
  const rate = shippingRate(sub);
  const shipping = sub * rate;
  const total = sub + shipping;
  document.getElementById('d-subtotal').textContent = '$' + sub.toFixed(2);
  document.getElementById('d-shipping').textContent = '$' + shipping.toFixed(2);
  document.getElementById('d-rate').textContent = 'Rate: ' + (rate === 0 ? 'Free' : (rate * 100).toFixed(0) + '%');
  document.getElementById('d-total').textContent = '$' + total.toFixed(2);
  const sfTotal = document.getElementById('sf-total');
  if (sfTotal) sfTotal.textContent = '$' + total.toFixed(2);

  // Shipping tip at top of summary bar
  const tip = document.getElementById('ship-tip');
  if (sub === 0) {
    tip.textContent = '';
    tip.classList.remove('qualified');
  } else if (sub >= 3000) {
    tip.innerHTML = '<svg width="18" height="11" viewBox="0 0 14 9" fill="currentColor" style="vertical-align:-2px;margin-right:8px;"><ellipse cx="3" cy="3" rx="2.4" ry="1.1" transform="rotate(-30 3 3)"/><ellipse cx="7" cy="6" rx="2.4" ry="1.1" transform="rotate(30 7 6)"/><ellipse cx="11" cy="3" rx="2.4" ry="1.1" transform="rotate(-30 11 3)"/></svg>You Are Eligible for Free Shipping<svg width="18" height="11" viewBox="0 0 14 9" fill="currentColor" style="vertical-align:-2px;margin-left:8px;transform:scaleX(-1);"><ellipse cx="3" cy="3" rx="2.4" ry="1.1" transform="rotate(-30 3 3)"/><ellipse cx="7" cy="6" rx="2.4" ry="1.1" transform="rotate(30 7 6)"/><ellipse cx="11" cy="3" rx="2.4" ry="1.1" transform="rotate(-30 11 3)"/></svg>';
    tip.classList.add('qualified');
  } else {
    const next = sub < 500 ? 500 : sub < 2000 ? 2000 : 3000;
    const nextRate = sub < 500 ? '12% shipping' : sub < 2000 ? '10% shipping' : 'free shipping';
    tip.textContent = `Add $${(next - sub).toFixed(2)} more for ${nextRate} rate`;
    tip.classList.remove('qualified');
  }

  // Per-tab summary widgets, summary tab, validation
  updateAllTabSummaries();
  updateSummaryTab();
  const v = validate();
  renderValidation(v);
  updateQtyPopover();

  document.getElementById('place-btn').disabled = (sub === 0);
}

// Keep page content clear of whichever fixed bar is currently visible.
export function syncBottomPadding() {
  const container = document.querySelector('.container');
  if (!container) return;
  const isSummary = document.body.classList.contains('summary-tab-active');
  const bar = document.querySelector(isSummary ? '.summary-footer' : '.summary-bar');
  container.style.paddingBottom = ((bar ? bar.offsetHeight : 0) + 48) + 'px';
}
