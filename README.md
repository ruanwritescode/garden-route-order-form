# Garden Route — Wholesale Order Form

A static, single-page wholesale order form. Built with [Vite](https://vitejs.dev/);
drafts are saved locally in the browser via IndexedDB (no server, works offline).

## Develop

```bash
npm install
npm run dev      # start the dev server (hot reload)
```

## Build / Preview

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the production build locally
```

Deploy the contents of `dist/` to any static host.

## Project layout

```
index.html              Page shell (header, customer fields, tab containers, summary bar)
src/
  main.js               Entry point: imports CSS, wires events, runs init
  styles.css            All styles
  data.js               Product catalogs, tab defs, image maps, labels (pure data)
  persist.js            IndexedDB draft storage (load/save/clear)
  state.js              Order state (qty) + save/restore/reset + storage check
  tabnav.js             Tab bar build / switch / activate
  widgets.js            Shared per-tab summary widget
  calc.js               Totals, shipping tiers, metric rollups, recalc()
  validate.js           Validation + error popover + warning banner
  quantity.js           Quantity input handlers (exposed on window)
  submit.js             XLSX export + mailto submission
  tabs/
    blends.js           Fall/Winter + Spring/Summer
    vaseFillers.js
    roseHips.js
    refresherOils.js
    summary.js          Recap + grouped line items + totals
public/
  photos/               Product images, served at /photos/...
```

## Notes

- Drafts (quantities, customer fields, active tab) persist per device/browser.
  Private/incognito windows show a warning that data won't survive a reload.
- The original single-file version is preserved as `GardenRouteOrderForm.html.bak`.
