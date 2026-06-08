// Refresher Oils (standalone) tab.
import { RF_ITEMS, METRIC_LABELS } from '../data.js';
import { makeTabSummary } from '../widgets.js';

export function buildRefresherOils() {
  const sect = document.getElementById('sect-rf');
  sect.appendChild(makeTabSummary('sect-rf', ['oils', 'total'], METRIC_LABELS.refresher_oils_total));
  const note = document.createElement('div');
  note.className = 'qty-note';
  note.id = 'rf-rule-note';
  note.innerHTML = '<strong>Quantities:</strong> Refresher oils are ordered in multiples of 6.';
  sect.appendChild(note);
  const grid = document.createElement('div');
  grid.className = 'rf-grid';
  RF_ITEMS.forEach(([code, name]) => {
    const qid = 'q-' + code.replace(/\//g, '-');
    const rowId = 'rr-' + code.replace(/\//g, '-');
    const row = document.createElement('div');
    row.className = 'rf-row';
    row.id = rowId;
    row.innerHTML = `
      <div>
        <div class="rf-name">${name}</div>
        <div class="rf-code">${code}</div>
      </div>
      <div class="rf-price">$6.75</div>
      <input type="number" min="0" step="6" value="" placeholder="0" id="${qid}" class="qty"
             data-code="${code}" data-price="6.75" data-name="Refresher Oil ${name}" data-step="6"
             oninput="onQtyChange('${code}', 6.75, this); toggleCard('${rowId}', this.value)">
    `;
    grid.appendChild(row);
  });
  sect.appendChild(grid);
}
