// Order submission: builds an .xlsx PO and opens a prefilled email.
import * as XLSX from 'xlsx';
import { qty } from './state.js';
import { validate } from './validate.js';

export function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4500);
}

export function submitOrder() {
  const items = Object.entries(qty).filter(([_, v]) => v.qty > 0);
  if (items.length === 0) { showToast('Add at least one item.'); return; }
  const v = validate();
  if (v.issues.length > 0 || v.invalidCount > 0) { showToast('Please fix the highlighted quantities first.'); return; }

  const customer = document.getElementById('f-customer').value || 'Customer';
  const street = document.getElementById('f-street').value || '';
  const city = document.getElementById('f-city').value || '';
  const state = document.getElementById('f-state').value || '';
  const zip = document.getElementById('f-zip').value || '';
  const email = document.getElementById('f-email').value || '';
  const phone = document.getElementById('f-phone').value || '';
  const po = document.getElementById('f-po').value || 'PO-' + new Date().toISOString().slice(0, 10);
  const orderDate = new Date().toISOString().slice(0, 10);
  const shipDate = document.getElementById('f-shipdate').value || '';
  const fedex = document.getElementById('f-fedex').value || '';
  const cityStateZip = [city, state, zip].filter(Boolean).join(', ');

  const sub = parseFloat(document.getElementById('d-subtotal').textContent.replace('$', ''));
  const shipping = parseFloat(document.getElementById('d-shipping').textContent.replace('$', ''));
  const total = parseFloat(document.getElementById('d-total').textContent.replace('$', ''));
  const rate = document.getElementById('d-rate').textContent;

  const rows = [
    ['GARDEN ROUTE HOME — PURCHASE ORDER'],
    [],
    ['Customer:', customer],
    ['Street:', street],
    ['City/State/ZIP:', cityStateZip],
    ['Email:', email],
    ['Phone:', phone],
    [],
    ['PO #:', po],
    ['Order date:', orderDate],
    ['Ship date:', shipDate],
    ['FedEx acct #:', fedex],
    [],
    ['ITEM NO.', 'DESCRIPTION', 'PRICE/EACH', 'QTY.', 'AMOUNT'],
  ];

  items.forEach(([code, v]) => {
    rows.push([code, v.name, v.price, v.qty, +(v.qty * v.price).toFixed(2)]);
  });

  rows.push([]);
  rows.push(['', '', '', 'Subtotal', +sub.toFixed(2)]);
  rows.push(['', '', '', `Shipping (${rate})`, +shipping.toFixed(2)]);
  rows.push(['', '', '', 'TOTAL', +total.toFixed(2)]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 14 }, { wch: 38 }, { wch: 12 }, { wch: 8 }, { wch: 12 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrder');

  const filename = `GardenRoute_PO_${po.replace(/[^\w-]/g, '_')}.xlsx`;
  XLSX.writeFile(wb, filename);

  const body = [
    `Purchase Order from ${customer}`,
    ``,
    `PO #: ${po}`,
    `Order date: ${orderDate}`,
    `Ship date: ${shipDate || '(TBD)'}`,
    `FedEx acct: ${fedex || '(none)'}`,
    ``,
    `Order Ship To:`,
    customer,
    street,
    cityStateZip,
    `Phone: ${phone}`,
    `Email: ${email}`,
    ``,
    `--- ORDER SUMMARY ---`,
    ...items.map(([code, v]) => `${code}  ${v.name} × ${v.qty} @ $${v.price.toFixed(2)} = $${(v.qty * v.price).toFixed(2)}`),
    ``,
    `Subtotal: $${sub.toFixed(2)}`,
    `Shipping (${rate}): $${shipping.toFixed(2)}`,
    `TOTAL: $${total.toFixed(2)}`,
    ``,
    `(Please attach the downloaded file: ${filename})`,
  ].join('\n');

  const subject = `Garden Route PO — ${customer} — ${po}`;
  const mailto = `mailto:13ruan13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  showToast('Spreadsheet downloaded. Opening email — please attach the file before sending.');
  setTimeout(() => { window.location.href = mailto; }, 600);
}
