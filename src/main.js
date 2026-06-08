// App entry point: styles, builders, event wiring, and init.
import './styles.css';

import { FW_SCENTS, SS_SCENTS } from './data.js';
import { buildTabs } from './tabnav.js';
import { buildBlendSection } from './tabs/blends.js';
import { buildVaseFillers } from './tabs/vaseFillers.js';
import { buildRoseHips } from './tabs/roseHips.js';
import { buildRefresherOils } from './tabs/refresherOils.js';
import { buildSummaryTab, updateSummaryTab } from './tabs/summary.js';
import { FORM_FIELDS, saveState, restoreState, clearSavedState, checkStorageReliability } from './state.js';
import { recalc, syncBottomPadding } from './calc.js';
import { updateQtyPopover, hideQtyPopover } from './validate.js';
import { onQtyChange, toggleCard, updateItemSub, updateBlendSub } from './quantity.js';
import { submitOrder } from './submit.js';

// Expose functions referenced by inline handlers in the generated/markup HTML.
Object.assign(window, {
  onQtyChange, toggleCard, updateItemSub, updateBlendSub,
  submitOrder, clearSavedState,
});

async function init() {
  // Build all tabs/sections
  buildTabs();
  buildBlendSection(FW_SCENTS, 'sect-fw');
  buildBlendSection(SS_SCENTS, 'sect-ss');
  buildVaseFillers();
  buildRoseHips();
  buildRefresherOils();
  buildSummaryTab();

  // Refresh summary + persist whenever customer/order details change
  FORM_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => { updateSummaryTab(); saveState(); });
  });

  // Restore a saved draft, then warn if storage looks unreliable
  await restoreState();
  checkStorageReliability();

  // Select the whole value when a quantity field gains focus, so typing replaces it
  document.addEventListener('focusin', e => {
    if (e.target.matches('input.qty')) { e.target.select(); updateQtyPopover(); }
  });
  // Keep the selection when focus is gained via mouse click
  document.addEventListener('mouseup', e => {
    if (e.target.matches('input.qty') && e.target.selectionStart === e.target.selectionEnd) {
      e.target.select();
    }
  });
  // Leave a quantity field empty rather than showing 0
  document.addEventListener('focusout', e => {
    if (e.target.matches('input.qty')) {
      if ((parseInt(e.target.value) || 0) === 0) e.target.value = '';
      hideQtyPopover();
    }
  });
  // Keep the popover aligned (or hidden) as the page scrolls
  window.addEventListener('scroll', updateQtyPopover, true);

  recalc();
  syncBottomPadding();
  window.addEventListener('resize', () => { syncBottomPadding(); updateQtyPopover(); });
  new ResizeObserver(syncBottomPadding).observe(document.querySelector('.summary-bar'));
}

init();
