// Tab navigation: build the tab bar, switch tabs, activate by id.
import { TAB_DEFS } from './data.js';
import { saveState } from './state.js';

export function buildTabs() {
  const tabs = document.getElementById('tabs');
  TAB_DEFS.forEach(([id, label], i) => {
    const b = document.createElement('button');
    b.className = 'tab' + (i === 0 ? ' active' : '');
    b.textContent = label;
    b.onclick = () => switchTab(id, b);
    tabs.appendChild(b);
  });
}

export function switchTab(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('sect-' + id).classList.add('active');
  btn.classList.add('active');
  document.body.classList.toggle('summary-tab-active', id === 'sm');
  window.dispatchEvent(new Event('resize'));
  saveState();
}

// Activate a tab by its id (matches a TAB_DEFS entry + its button).
export function activateTab(id) {
  const idx = TAB_DEFS.findIndex(t => t[0] === id);
  const btns = document.querySelectorAll('#tabs .tab');
  if (idx >= 0 && btns[idx]) switchTab(id, btns[idx]);
}
