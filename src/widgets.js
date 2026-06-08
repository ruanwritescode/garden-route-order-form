// Reusable per-tab summary widget (the metric cells shown atop each tab).
import { METRIC_LABELS } from './data.js';

export function makeTabSummary(sectId, metrics, totalLabel) {
  const wrap = document.createElement('div');
  wrap.className = 'tab-summary';
  const inner = document.createElement('div');
  inner.className = 'tab-summary-inner';
  metrics.forEach(m => {
    const cell = document.createElement('div');
    cell.className = 'ts-cell' + (m === 'total' ? ' total' : '');
    const label = (m === 'total' && totalLabel) ? totalLabel : METRIC_LABELS[m];
    cell.innerHTML = `
      <div class="ts-label">${label}</div>
      <div class="ts-value" id="ts-${sectId}-${m}">${m === 'total' ? '$0.00' : '0'}</div>
    `;
    inner.appendChild(cell);
  });
  wrap.appendChild(inner);
  return wrap;
}
