// Product catalogs, tab definitions, image maps, and shared label constants.
// Pure data — no DOM, no side effects.

export const FW_SCENTS = [
  ['BO', "Bag O' Boo!"],
  ['CA', 'Cottage Apple'],
  ['HS', 'Holiday Spruce'],
  ['MK', 'Mistletoe Kiss'],
  ['MC', 'Mulled Cider'],
  ['PO', 'Pomander'],
  ['WP', 'Winter Pine'],
  ['IS', 'Indian Summer'],
  ['PS', 'Pumpkin Spice'],
  ['IP', 'Island Proteas'],
  ['PT', 'Pear Tree'],
];
export const SS_SCENTS = [
  ['CB', 'Clementine Bergamot'],
  ['IP', 'Island Proteas'],
  ['LF', 'Lavender Fields'],
  ['LS', 'Lakeside'],
  ['LR', 'Lovely Rose'],
  ['MI', 'Magnolia & Ivy'],
  ['OS', 'Ocean Spa'],
  ['SB', 'Sanibel'],
  ['WF', 'Wildflowers'],
  ['VG', 'Vintage Garden'],
  ['LB', 'Lemon Blossom'],
];
export const BLEND_VARIANTS = [
  { prefix: 'BB',  desc: 'Large',   price: 15, step: 12 },
  { prefix: 'BBS', desc: 'Small',   price: 12, step: 12 },
  { prefix: 'FO',  desc: 'Oil', price: 7.25,  step: 6  },
  { prefix: 'BBD', desc: 'Display',   price: 12, step: 1  },
];
export const FW_OTHER = [
  { product: 'Simmer Potpourri', variants: [{ code: 'SIM/OSO', name: 'Simmer Pot - Orange Slices', price: 12, step: 12 }]},
  { product: 'Garlands', variants: [{ code: 'G48/OSO', name: 'Orange Slices Orange - 60 IN', price: 10, step: 24 }]},
];

export function otherImagePath(code) {
  return `photos/fallwinter/${code.replace(/\//g, '-')}.jpeg`;
}

export const VF_ITEMS = [
  ['VF/PPO', 'Putka Pods Orange', 'HARVEST - 3.87oz/110g', 9],
  ['VF/PUM', 'Pumpinos', 'THANKFUL - 7oz / 200g', 9],
];
export const VN_ITEMS = [
  ['VN/ASA', 'Apple Slices Assorted', '6.34oz/180g', 9],
  ['VN/ASG', 'Apple Slices Green', '6.34oz/180g', 9],
  ['VN/ASR', 'Apple Slices Red', '6.34oz/180g', 9],
  ['VN/HEM', 'Hemlock Cones', '4.23oz/120g', 9],
  ['VN/MBL', 'Mini Birch Logs', '6.34oz/180g', 9],
  ['VN/OSG', 'Orange Slices Green', '5.38oz/153g', 9],
  ['VN/OSO', 'Orange Slices Orange', '6.30oz/180g', 9],
  ['VN/OWG', 'Whole Oranges Green', '10/bag', 9],
  ['VN/PPO', 'Putka Pods Orange', '3.4oz/95g', 9],
  ['VN/PUM', 'Pumpinos', '6.34oz/180g', 9],
  ['VN/RMC', 'Reindeer Moss Chartreuse', '2.5oz/70g', 9],
  ['VN/RPW', 'Pine Cone Tipped White', '10/bag', 10],
  ['VN/SMC', 'Spanish Moss Chartreuse', '1.76oz/50g', 9],
  ['VN/WR', 'White Root', '18 pieces/bag', 9],
];
export const RH_ITEMS = [
  ['RH/CA', 'Cottage Apple', 10],
  ['RH/HS', 'Holiday Spice', 10],
  ['RH/OH', 'Orange Harvest', 10],
  ['RH/PS', 'Pumpkin Spice', 10],
  ['RH/CN', 'Cinnamon', 10],
  ['RH/SD', 'Snickerdoodle', 10],
  ['RH/WP', 'Winter Pine', 10],
  ['RH/BO', 'BOO!', 10],
];
export const RF_ITEMS = [
  ['FO/AW','Aspen Woods'],
  ['FO/BO','Boo!'],
  ['FO/CA','Cottage Apple'],
  ['FO/CB','Clementine Bergamot'],
  ['FO/CN','Cinnamon'],
  ['FO/GF','Green Apple Fig'],
  ['FO/HO','Holiday Orchard'],
  ['FO/HOS','Holiday Spruce'],
  ['FO/HS','Holiday Spice'],
  ['FO/IP','Island Proteas'],
  ['FO/IS','Indian Summer'],
  ['FO/LB','Lemon Blossom'],
  ['FO/LF','Lavender Fields'],
  ['FO/LR','Lovely Rose'],
  ['FO/LS','Lakeside'],
  ['FO/MB','Merry Berry'],
  ['FO/MC','Mulled Cider'],
  ['FO/MI','Magnolia & Ivy'],
  ['FO/MK','Mistletoe Kiss'],
  ['FO/NT','Nantucket'],
  ['FO/OH','Orange Harvest'],
  ['FO/OS','Ocean Spa'],
  ['FO/PO','Pomander'],
  ['FO/PS','Pumpkin Spice'],
  ['FO/SB','Sanibel'],
  ['FO/SD','Snickerdoodle'],
  ['FO/VG','Vintage Garden'],
  ['FO/VS','Vanilla Spruce'],
  ['FO/WF','Wildflowers'],
  ['FO/WP','Winter Pine'], 
  ['FO/PT','Pear Tree'],
];
export const TAB_DEFS = [
  ['fw', 'Fall / Winter'], ['ss', 'Spring / Summer'],
  ['vf', 'Vase Fillers'], ['rh', 'Rose Hips'], ['rf', 'Refresher Oils'],
  ['sm', 'Summary'],
];

const FW_SCENT_CODES = new Set(FW_SCENTS.map(([code]) => code));

export function scentImagePath(code) {
  const folder = FW_SCENT_CODES.has(code) ? 'fallwinter' : 'springsummer';
  return `photos/${folder}/${code}.jpeg`;
}

export function itemImagePath(code) {
  const folder = code.startsWith('RH/') ? 'rosehips' : 'vasefillers';
  return `photos/${folder}/${code.replace(/\//g, '-')}.jpeg`;
}

// Encode spaces etc. for use in an <img src>
export function imgSrc(path) { return path ? encodeURI(path) : ''; }

export const METRIC_LABELS = {
  cases: 'Cases',
  large_cases: 'Large Cases',
  small_cases: 'Small Cases',
  oils: 'Oils',
  displayBags: 'Display Bags',
  fall_winter_total: 'Fall / Winter Total',
  spring_summer_total: 'Spring / Summer Total',
  vase_fillers_total: 'Vase Fillers Total',
  rose_hips_total: 'Rose Hips Total',
  refresher_oils_total: 'Refresher Oils Total',
  total: 'Total',
  units: 'Total Units',
};
