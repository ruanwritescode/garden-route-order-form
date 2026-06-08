// IndexedDB-backed draft storage (durable local drafts, client-only).
import { openDB } from 'idb';

const DB_NAME = 'gr-order-form';
const STORE = 'drafts';
const KEY = 'current';

let dbPromise = null;
function db() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(d) {
        if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE);
      },
    });
  }
  return dbPromise;
}

export async function loadDraft() {
  try { return (await db()).get(STORE, KEY); } catch (e) { return null; }
}

export async function saveDraft(data) {
  try { await (await db()).put(STORE, data, KEY); } catch (e) { /* storage unavailable */ }
}

export async function clearDraft() {
  try { await (await db()).delete(STORE, KEY); } catch (e) { /* storage unavailable */ }
}

// Resolves true if IndexedDB can be opened (false in some locked-down/incognito modes)
export async function storageWorks() {
  try { await db(); return true; } catch (e) { return false; }
}
