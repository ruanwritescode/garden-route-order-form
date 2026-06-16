// Summary tab: customer/order recap, grouped line items, shipping tiers, totals.
import { qty } from '../state.js';
import { RF_ITEMS, FW_SCENTS, SS_SCENTS, BLEND_VARIANTS } from '../data.js';

export function buildSummaryTab() {
  const sect = document.getElementById('sect-sm');
  sect.innerHTML = `
    <div class="summary-tab" id="summary-tab-content">
      <h3>Customer</h3>
      <div class="customer-recap" id="recap-customer"></div>

      <h3>Order Details</h3>
      <div class="customer-recap" id="recap-order"></div>

      <h3>Items</h3>
      <div id="recap-items"></div>

      <div class="ship-totals">
        <div class="ship-left">
          <h3>Shipping Tiers</h3>
          <table class="ship-table" id="recap-ship-tiers">
            <thead><tr><th>Order Subtotal</th><th>Shipping Rate</th></tr></thead>
            <tbody>
              <tr data-tier="0"><td>Under $500</td><td>15%</td></tr>
              <tr data-tier="500"><td>$500 – $1,999.99</td><td>12%</td></tr>
              <tr data-tier="2000"><td>$2,000 – $2,999.99</td><td>10%</td></tr>
              <tr data-tier="3000"><td>$3,000 and up</td><td>Free</td></tr>
            </tbody>
          </table>
        </div>
        <div class="ship-right">
          <div class="totals-header" id="recap-totals-header">Order Totals</div>
          <div class="totals-block" id="recap-totals"></div>
        </div>
      </div>
    </div>
  `;
}

export function updateSummaryTab() {
  const cust = document.getElementById('recap-customer');
  const order = document.getElementById('recap-order');
  if (!cust) return;
  const get = id => document.getElementById(id).value || '—';
  cust.innerHTML = `
    <div class="recap-row"><span>Company</span> ${get('f-customer')}</div>
    <div class="recap-row"><span>Email</span> ${get('f-email')}</div>
    <div class="recap-row"><span>Street</span> ${get('f-street')}</div>
    <div class="recap-row"><span>Phone</span> ${get('f-phone')}</div>
    <div class="recap-row"><span>City</span> ${get('f-city')}</div>
    <div class="recap-row"><span>State</span> ${get('f-state')}</div>
    <div class="recap-row"><span>ZIP</span> ${get('f-zip')}</div>
  `;
  order.innerHTML = `
    <div class="recap-row"><span>PO #</span> ${get('f-po')}</div>
    <div class="recap-row"><span>Order date</span> ${new Date().toISOString().slice(0, 10)} <em style="color:var(--ink-light)">(set when submitted)</em></div>
    <div class="recap-row"><span>Ship date</span> ${get('f-shipdate')}</div>
    <div class="recap-row"><span>FedEx acct</span> ${get('f-fedex')}</div>
    <div class="recap-row"><span>Resale Cert</span> ${get('f-resalecertificate')}</div>
  `;

  // Group line items by category. For blends we group further by scent code
  const scentNameFor = code => {
    const f = FW_SCENTS.concat(SS_SCENTS).find(([c, n]) => c === code);
    return f ? f[1] : code;
  };

  const groups = {
    'Fall / Winter Blends': { byScent: {}, pred: c => c.match(/^(BB|BBS|FO|BBD)\/[A-Z]{2}$/) },
    'Spring / Summer Blends': { byScent: {}, pred: c => c.match(/^(BB|BBS|FO|BBD)\/[A-Z]{2}$/) },
    'Vase Fillers': { rows: [], pred: c => c.startsWith('VF/') },
    'Rose Hips': { rows: [], pred: c => c.startsWith('RH/') },
    'Refresher Oils (standalone)': { rows: [], pred: c => RF_ITEMS.some(r => r[0] === c) },
  };

  Object.entries(qty).forEach(([code, v]) => {
    if (v.qty <= 0) return;
    // blends
    if (code.match(/^(BB|BBS|FO|BBD)\/[A-Z]{2}$/)) {
      const m = code.match(/^([^/]+)\/(.+)$/) || [];
      const prefix = m[1];
      const scent = m[2];
      const cat = FW_SCENTS.some(([c]) => c === scent) ? 'Fall / Winter Blends' : 'Spring / Summer Blends';
      const g = groups[cat];
      g.byScent[scent] = g.byScent[scent] || { name: scentNameFor(scent), rows: [] };
      const variant = BLEND_VARIANTS.find(b => b.prefix === prefix);
      const label = variant ? variant.desc : prefix;
      g.byScent[scent].rows.push([code, label, v.qty, v.price, v.qty * v.price]);
      return;
    }
    for (const [, g] of Object.entries(groups)) {
      if (g.pred(code)) { g.rows.push([code, v.name, v.qty, v.price, v.qty * v.price]); return; }
    }
  });

  const renderTable = (title, headerRows, rowsHtml, subtotal) => `
      <table class="line-table">
        <colgroup>
          <col>
          <col class="c-num">
          <col class="c-num">
          <col class="c-num">
        </colgroup>
        <thead><tr>
          <th>${title}</th>
          <th class="num">Qty</th>
          <th class="num">Price</th>
          <th class="num">Amount</th>
        </tr></thead>
        <tbody>
          ${headerRows.join('')}
          ${rowsHtml}
          <tr class="cat-sub"><td colspan="3">Subtotal · ${title}</td><td class="num">$${subtotal.toFixed(2)}</td></tr>
        </tbody>
      </table>
    `;

  const itemsHtml = Object.entries(groups).map(([cat, g]) => {
    // blends: byScent
    if (g.byScent) {
      const scentEntries = Object.entries(g.byScent);
      if (scentEntries.length === 0) return '';
      const catSub = scentEntries.reduce((s, [, sdata]) => s + sdata.rows.reduce((ss, r) => ss + r[4], 0), 0);
      const rowsHtml = scentEntries.map(([scent, sdata]) => {
        const scentHeader = `<tr class="scent-header"><td colspan="4"><strong>${sdata.name}</strong></td></tr>`;
        const rows = sdata.rows.map(r => `<tr>
            <td><div class="code-name">${r[0]} - ${r[1]}</div></td>
            <td class="num">${r[2]}</td>
            <td class="num">$${r[3].toFixed(2)}</td>
            <td class="num">$${r[4].toFixed(2)}</td>
          </tr>`).join('');
        return scentHeader + rows;
      }).join('');
      return renderTable(cat, [], rowsHtml, catSub);
    }
    // non-blend groups
    if (!g.rows || g.rows.length === 0) return '';
    const catSub = g.rows.reduce((s, r) => s + r[4], 0);
    const rowsHtml = g.rows.map(r => `<tr>
            <td><div class="code-name">${r[0]} - ${r[1]}</div></td>
            <td class="num">${r[2]}</td>
            <td class="num">$${r[3].toFixed(2)}</td>
            <td class="num">$${r[4].toFixed(2)}</td>
          </tr>`).join('');
    return renderTable(cat, [], rowsHtml, catSub);
  }).join('');

  const itemsEl = document.getElementById('recap-items');
  itemsEl.innerHTML = itemsHtml || '<div class="empty-note">No items added yet — add quantities on the other tabs.</div>';

  // Totals (read from the live summary bar)
  const sub = parseFloat(document.getElementById('d-subtotal').textContent.replace('$', ''));
  const ship = parseFloat(document.getElementById('d-shipping').textContent.replace('$', ''));
  const total = parseFloat(document.getElementById('d-total').textContent.replace('$', ''));
  const rate = document.getElementById('d-rate').textContent;

  let tipHtml = '';
  if (sub >= 3000) {
    tipHtml = `<div class="sm-ship-tip qualified" style="grid-column:1/-1">You Are Eligible for Free Shipping</div>`;
  } else if (sub > 0) {
    const next = sub < 500 ? 500 : sub < 2000 ? 2000 : 3000;
    const nextRate = sub < 500 ? '12% shipping' : sub < 2000 ? '10% shipping' : 'free shipping';
    tipHtml = `<div class="sm-ship-tip" style="grid-column:1/-1">Add $${(next - sub).toFixed(2)} more for ${nextRate} rate</div>`;
  }

  document.getElementById('recap-totals').innerHTML = `
    <div class="total-label">Subtotal</div><div class="total-value">$${sub.toFixed(2)}</div>
    <div class="total-label">Shipping</div><div class="total-value">$${ship.toFixed(2)}</div>
    <div class="grand total-label">Order Total</div><div class="grand total-value">$${total.toFixed(2)}</div>
    ${tipHtml}
  `;

  // Highlight current shipping tier
  document.querySelectorAll('#recap-ship-tiers tbody tr').forEach(tr => tr.classList.remove('current'));
  let activeTier = '0';
  if (sub >= 3000) activeTier = '3000';
  else if (sub >= 2000) activeTier = '2000';
  else if (sub >= 500) activeTier = '500';
  if (sub > 0) {
    const tr = document.querySelector(`#recap-ship-tiers tbody tr[data-tier="${activeTier}"]`);
    if (tr) tr.classList.add('current');
  }
}
