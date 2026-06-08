// Vase Fillers tab.
import { VF_ITEMS, ITEM_IMG, METRIC_LABELS, imgSrc } from '../data.js';
import { makeTabSummary } from '../widgets.js';

export function buildVaseFillers() {
  const sect = document.getElementById('sect-vf');
  sect.appendChild(makeTabSummary('sect-vf', ['cases', 'total'], METRIC_LABELS.vase_fillers_total));
  const note = document.createElement('div');
  note.className = 'qty-note';
  note.innerHTML = '<strong>Quantities:</strong> Vase fillers are ordered in multiples of 12 (one case = 12 per item).';
  sect.appendChild(note);
  const grid = document.createElement('div');
  grid.className = 'item-grid';
  VF_ITEMS.forEach(([code, name, meta, price]) => {
    const qid = 'q-' + code.replace(/\//g, '-');
    const cardId = 'ic-' + code.replace(/\//g, '-');
    const card = document.createElement('div');
    card.className = 'item-card';
    card.id = cardId;
    card.innerHTML = `
      ${ITEM_IMG[code] ? `<img class="item-img" src="${imgSrc(ITEM_IMG[code])}" alt="${name}" loading="lazy">` : ''}
      <div class="item-name">${name}</div>
      <div class="item-meta">${meta}</div>
      <div class="item-foot">
        <span class="item-price">$${price.toFixed(2)} / unit</span>
        <input type="number" min="0" step="12" value="" placeholder="0" id="${qid}" class="qty" style="width:72px;"
               data-code="${code}" data-price="${price}" data-name="${name}" data-step="12"
               oninput="onQtyChange('${code}', ${price}, this); toggleCard('${cardId}', this.value); updateItemSub('${cardId}', ${price}, this.value)">
      </div>
      <div class="item-sub" id="sub-${cardId}">$0.00</div>`;
    grid.appendChild(card);
  });
  sect.appendChild(grid);
}
