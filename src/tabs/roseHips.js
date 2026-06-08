// Rose Hips tab.
import { RH_ITEMS, ITEM_IMG, METRIC_LABELS, imgSrc } from '../data.js';
import { makeTabSummary } from '../widgets.js';

export function buildRoseHips() {
  const sect = document.getElementById('sect-rh');
  sect.appendChild(makeTabSummary('sect-rh', ['cases', 'total'], METRIC_LABELS.rose_hips_total));
  const note = document.createElement('div');
  note.className = 'qty-note';
  note.id = 'rh-rule-note';
  note.innerHTML = '<strong>Quantities:</strong> Rose hips are ordered in multiples of 12, and the total across all scents must complete casepacks of 24.';
  sect.appendChild(note);
  const grid = document.createElement('div');
  grid.className = 'item-grid';
  RH_ITEMS.forEach(([code, name, price]) => {
    const qid = 'q-' + code.replace(/\//g, '-');
    const card = document.createElement('div');
    card.className = 'item-card';
    card.id = 'ic-' + code.replace(/\//g, '-');
    card.innerHTML = `
      ${ITEM_IMG[code] ? `<img class="item-img" src="${imgSrc(ITEM_IMG[code])}" alt="${name}" loading="lazy">` : ''}
      <div class="item-name">${name}</div>
      <div class="item-meta">${code} · Rose Hips</div>
      <div class="item-foot">
        <span class="item-price">$${price.toFixed(2)}</span>
        <input type="number" min="0" step="12" value="" placeholder="0" id="${qid}" class="qty" style="width:64px;"
               data-code="${code}" data-price="${price}" data-name="${name} Rose Hips" data-step="12"
               oninput="onQtyChange('${code}', ${price}, this); toggleCard('ic-${code.replace(/\//g, '-')}', this.value)">
      </div>`;
    grid.appendChild(card);
  });
  sect.appendChild(grid);
}
