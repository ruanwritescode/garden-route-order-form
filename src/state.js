// Shared order state + draft persistence (save/restore/reset).
import { loadDraft, saveDraft, clearDraft, storageWorks } from './persist.js';
import { activateTab } from './tabnav.js';

// Live quantity map: { [code]: { qty, price, name } }. Shared across modules.
export const qty = {};

export const FORM_FIELDS = [
  'f-customer', 'f-street', 'f-city', 'f-state', 'f-zip', 'f-email', 'f-phone',
  'f-po', 'f-shipdate', 'f-fedex', 'f-resalecertificate',
];

// Persist current order (quantities + form fields + active tab). Fire-and-forget.
export function saveState() {
  const data = { qty: {}, fields: {} };
  Object.entries(qty).forEach(([code, v]) => { if (v.qty > 0) data.qty[code] = v.qty; });
  FORM_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) data.fields[id] = el.value;
  });
  const activeSection = document.querySelector('.section.active');
  if (activeSection) data.activeTab = activeSection.id.replace('sect-', '');
  saveDraft(data);
}

// Restore a saved order. Dispatches 'input' on quantity fields so all derived
// UI (line totals, subtotals, summaries, validation) recomputes via delegation.
export async function restoreState() {
  const data = await loadDraft();
  if (!data) return;
  if (data.fields) {
    FORM_FIELDS.forEach(id => {
      const el = document.getElementById(id);
      if (el && data.fields[id] != null) el.value = data.fields[id];
    });
  }
  if (data.qty) {
    Object.entries(data.qty).forEach(([code, q]) => {
      const input = document.getElementById('q-' + code.replace(/\//g, '-'));
      if (input && q > 0) {
        input.value = q;
        input.dispatchEvent(new Event('input'));
      }
    });
  }
  if (data.activeTab) activateTab(data.activeTab);
}

export async function clearSavedState() {
  if (!confirm('Start a new order? This will erase the saved order on this device.')) return;
  await clearDraft();
  location.reload();
}

function showStorageWarning() {
  const bar = document.getElementById('storage-warning');
  if (bar) bar.style.display = 'block';
}

// Warn if drafts can't be saved reliably (private/incognito or storage disabled).
export async function checkStorageReliability() {
  if (!(await storageWorks())) { showStorageWarning(); return; }
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const { quota } = await navigator.storage.estimate();
      if (typeof quota === 'number' && quota < 120 * 1024 * 1024) showStorageWarning();
    } catch (e) { /* ignore */ }
  }
}
