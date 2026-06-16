// Product catalogs, tab definitions, image maps, and shared label constants.
// Pure data — no DOM, no side effects.

export const FW_SCENTS = [
  ['AW', 'Aspen Woods'],
  ['BO', "Bag O' Boo!"],
  ['CA', 'Cottage Apple'],
  ['HS', 'Holiday Spruce'],
  ['MK', 'Mistletoe Kiss'],
  ['MC', 'Mulled Cider'],
  ['NP', 'Nutmeg Pear'],
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
export const VF_ITEMS = [
  ['VF/MIC-H', 'Mini Indian Corn / Harvest', '8 ears/bag · 12 per case', 9.75],
  ['VF/MUC-J', 'Muirri Cones / Joyful',       '325g · 12 per case', 8],
  ['VF/PMP-T', 'Pumpinos / Thankful',         '190g · 12 per case', 8],
  ['VF/PUT-H', 'Putka Pods / Harvest',        '110g · 12 per case', 8],
  ['VF/ABS',   'Ambernut Stems Natural',       '12 stems/bag · 12 per case', 8],
  ['VF/FBC',   'Frosted Birch Cones',          '160g · 12 per case', 8],
  ['VF/ASA',   'Apple Slices Assorted',        '180g · 12 per case', 8],
  ['VF/ASG',   'Apple Slices Green',           '180g · 12 per case', 8],
  ['VF/ASR',   'Apple Slices Red',             '180g · 12 per case', 8],
  ['VF/OSG',   'Orange Slices Green',          '180g · 12 per case', 8],
  ['VF/OSO',   'Orange Slices Orange',         '180g · 12 per case', 8],
  ['VF/JP',    'Juniper Preserved',            '130g · 12 per case', 9.75],
  ['VF/MICN',  'Mini Indian Corn (No Husk)',  '10 ears/bag · 12 per case', 9.75],
  ['VF/MIC',   'Mini Indian Corn',             '8 ears/bag · 12 per case', 9.75],
  ['VF/MUC',   'Muirii Cones',                 '375g · 12 per case', 8],
  ['VF/SMC',   'Spanish Moss Chartreuse',     '50g · 12 per case', 8],
  ['VF/PMP',   'Pumpinos',                     '180g · 12 per case', 8],
  ['VF/WR',    'White Root',                   '18 pieces/bag · 12 per case', 8],
  ['VF/OG',    'Oranges Green',                '50g · 12 per case', 8],
  ['VF/OO',    'Oranges Orange',               '18 pieces/bag · 12 per case', 8],
  ['VF/CSR',   'Canella Stems Red',            '130g · 12 per case', 8],
  ['VF/DW',    'Driftwood',                    '20 piece · 12 per case', 9.75],
  ['VF/PTP',   'Putka Pods',                   '95g · 12 per case', 8],
  ['VF/PCW',   'Pine Cones Tipped White',     '10 cones/bag · 12 per case', 8],
  ['VF/HC',    'Hemlock Cones',                '120g · 12 per case', 8],
  ['VF/MBL',   'Mini Birch Logs',              '16 logs/bag · 12 per case', 8],
  ['VF/RMC',   'Reindeer Moss Chartreuse',     '70g · 12 per case', 8],
];
export const RH_ITEMS = [
  ['RH/CA', 'Cottage Apple', 9.75], ['RH/HS', 'Holiday Spice', 9.75],
  ['RH/OH', 'Orange Harvest', 9.75], ['RH/PS', 'Pumpkin Spice', 9.75],
  ['RH/CN', 'Cinnamon', 9.75], ['RH/SD', 'Snickerdoodle', 9.75],
  ['RH/WP', 'Winter Pine', 9.75], ['RH/BO', 'BOO!', 9.75],
];
export const RF_ITEMS = [
  ['FO/AW','Aspen Woods'],['FO/BO','Boo!'],['FO/CA','Cottage Apple'],
  ['FO/CB','Clementine Bergamot'],['FO/CN','Cinnamon'],['FO/GF','Green Apple Fig'],
  ['FO/HO','Holiday Orchard'],['FO/HOS','Holiday Spruce'],['FO/HS','Holiday Spice'],
  ['FO/IP','Island Proteas'],['FO/IS','Indian Summer'],['FO/LB','Lemon Blossom'],
  ['FO/LF','Lavender Fields'],['FO/LR','Lovely Rose'],['FO/LS','Lakeside'],
  ['FO/MB','Merry Berry'],['FO/MC','Mulled Cider'],['FO/MI','Magnolia & Ivy'],
  ['FO/MK','Mistletoe Kiss'],['FO/NP','Nutmeg Pear'],['FO/NT','Nantucket'],
  ['FO/OH','Orange Harvest'],['FO/OS','Ocean Spa'],['FO/PO','Pomander'],
  ['FO/PS','Pumpkin Spice'],['FO/SB','Sanibel'],['FO/SD','Snickerdoodle'],
  ['FO/VG','Vintage Garden'],['FO/VS','Vanilla Spruce'],['FO/WF','Wildflowers'],
  ['FO/WP','Winter Pine'],
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
