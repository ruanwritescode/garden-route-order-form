// Fall/Winter & Spring/Summer blend tabs.
import { BLEND_VARIANTS, FW_OTHER, METRIC_LABELS, imgSrc, scentImagePath } from '../data.js';
import { makeTabSummary } from '../widgets.js';

export function buildBlendSection(scents, sectId) {
  const sect = document.getElementById(sectId);
  const blendTotalLabel = sectId === 'sect-fw' ? METRIC_LABELS.fall_winter_total : METRIC_LABELS.spring_summer_total;
  sect.appendChild(makeTabSummary(sectId, ['large_cases', 'small_cases', 'oils', 'displayBags', 'total'], blendTotalLabel));
  const note = document.createElement('div');
  note.className = 'qty-note';
  note.innerHTML = '<strong>Quantities:</strong><br>Large and small blends are ordered in multiples of 12 (one case = 12).<br>Refresher oils are ordered in multiples of 6.<br>Display bags can be ordered individually.';
  sect.appendChild(note);
  const grid = document.createElement('div');
  grid.className = 'scent-grid';
  scents.forEach(([code, name]) => {
    const card = document.createElement('div');
    card.className = 'scent-card';
    card.id = 'sc-' + code;
    card.innerHTML = `
      <div class="scent-head">
        <div class="scent-name">${name}</div>
        <div class="scent-sub zero" id="sub-${code}">$0.00</div>
      </div>
      <div class="scent-body">
        <img class="scent-side" src="${imgSrc(scentImagePath(code))}" alt="${name}" loading="lazy" onerror="this.remove()">
        <div class="scent-rows">
          ${BLEND_VARIANTS.map(v => {
            const itemCode = v.prefix + '/' + code;
            const qid = 'q-' + itemCode.replace(/\//g, '-');
            return `<div class="product-row">
              <div class="prow-label">
                <span class="name">${v.desc}</span>
                <span class="code">- ${itemCode}</span>
              </div>
              <div class="price">$${v.price.toFixed(2)}</div>
              <input type="number" min="0" step="${v.step}" value="" placeholder="0" id="${qid}" class="qty"
                     data-code="${itemCode}" data-price="${v.price}" data-name="${v.desc} ${name}" data-step="${v.step}"
                     oninput="onQtyChange('${itemCode}', ${v.price}, this); updateBlendSub('${code}')">
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  sect.appendChild(grid);

  // Add other Fall/Winter products in their own section
  if (sectId === 'sect-fw' && FW_OTHER.length > 0) {
    const otherGrid = document.createElement('div');
    otherGrid.className = 'scent-grid';
    
    FW_OTHER.forEach(product => {
      const card = document.createElement('div');
      card.className = 'scent-card';
      card.id = 'sc-' + product.code;
      const qid = 'q-' + product.code.replace(/\//g, '-');
      card.innerHTML = `
        <div class="scent-head">
          <div class="scent-name">${product.name}</div>
          <div class="scent-sub zero" id="sub-${product.code}">$0.00</div>
        </div>
        <div class="scent-body">
          <img class="scent-side" src="${imgSrc(scentImagePath(product.code))}" alt="${product.name}" loading="lazy" onerror="this.remove()">
          <div class="scent-rows">
            <div class="product-row">
              <div class="prow-label">
                <span class="name">${product.name}</span>
                <span class="code">- ${product.code}</span>
              </div>
              <div class="price">$${product.price.toFixed(2)}</div>
              <input type="number" min="0" step="${product.step}" value="" placeholder="0" id="${qid}" class="qty"
                     data-code="${product.code}" data-price="${product.price}" data-name="${product.name}" data-step="${product.step}"
                     oninput="onQtyChange('${product.code}', ${product.price}, this); updateBlendSub('${product.code}')">
            </div>
          </div>
        </div>
      `;
      otherGrid.appendChild(card);
    });
    
    sect.appendChild(otherGrid);
  }
}
