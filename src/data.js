// Product catalogs, tab definitions, image maps, and shared label constants.
// Pure data — no DOM, no side effects.

export const FW_SCENTS = [
  ['AW', 'Aspen Woods'], ['BO', "Bag O' Boo!"], ['CA', 'Cottage Apple'],
  ['HS', 'Holiday Spruce'], ['MK', 'Mistletoe Kiss'], ['MC', 'Mulled Cider'],
  ['NP', 'Nutmeg Pear'], ['PO', 'Pomander'], ['WP', 'Winter Pine'],
  ['IS', 'Indian Summer'], ['PS', 'Pumpkin Spice'],
];
export const SS_SCENTS = [
  ['CB', 'Clementine Bergamot'], ['IP', 'Island Proteas'], ['LF', 'Lavender Fields'],
  ['LS', 'Lakeside'], ['LR', 'Lovely Rose'], ['MI', 'Magnolia & Ivy'],
  ['OS', 'Ocean Spa'], ['SB', 'Sanibel'], ['WF', 'Wildflowers'],
  ['VG', 'Vintage Garden'], ['LB', 'Lemon Blossom'],
];
export const BLEND_VARIANTS = [
  { prefix: 'BB',  desc: 'Large',   price: 15, step: 12 },
  { prefix: 'BBS', desc: 'Small',   price: 12, step: 12 },
  { prefix: 'FO',  desc: 'Oil', price: 6.75,  step: 6  },
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

// ============== PRODUCT IMAGES ==============
// Blend scents keyed by 2-letter scent code (one photo per scent).
// Lakeside (LS) and Sanibel (SB) have no photo yet.
export const SCENT_IMG = {
  AW: 'photos/fallwinter/AW Small.jpeg',
  BO: 'photos/fallwinter/BO Small.jpeg',
  CA: 'photos/fallwinter/CA Small.jpeg',
  HS: 'photos/fallwinter/HS Small.jpeg',
  MK: 'photos/fallwinter/MK Small.jpeg',
  MC: 'photos/fallwinter/MC Small.jpeg',
  NP: 'photos/fallwinter/NP Small.jpeg',
  PO: 'photos/fallwinter/PO Small.jpeg',
  WP: 'photos/fallwinter/WP Small.jpeg',
  IS: 'photos/fallwinter/IS Small.jpeg',
  PS: 'photos/fallwinter/PS Small.jpeg',
  CB: 'photos/springsummer/CB Small.jpeg',
  IP: 'photos/springsummer/IP Small.jpeg',
  LF: 'photos/springsummer/LF Small.jpeg',
  LR: 'photos/springsummer/LR Small.jpeg',
  MI: 'photos/springsummer/MI Small.jpeg',
  OS: 'photos/springsummer/OS Small.jpeg',
  VG: 'photos/springsummer/VG Small.jpeg',
  WF: 'photos/springsummer/WF Small.jpeg',
  LB: 'photos/springsummer/LB Small.jpeg',
};

// Vase fillers and rose hips keyed by full item code.
export const ITEM_IMG = {
  'RH/CA': 'photos/rosehips/Cottage Apple Medium.jpeg',
  'RH/HS': 'photos/rosehips/Holiday Spice Medium.jpeg',
  'RH/OH': 'photos/rosehips/Orange Harvest Medium.jpeg',
  'RH/PS': 'photos/rosehips/Pumpkin Spice Medium.jpeg',
  'RH/CN': 'photos/rosehips/Cinnamon Medium.jpeg',
  'RH/SD': 'photos/rosehips/Snickerdoodle Medium.jpeg',
  'RH/WP': 'photos/rosehips/Winter Pine Medium.jpeg',
  'RH/BO': 'photos/rosehips/BOO! Medium.jpeg',
  'VF/MIC-H': 'photos/vasefillers/miniindiancornharvest Small.jpeg',
  'VF/MUC-J': 'photos/vasefillers/muirriconesjoyful Small.jpeg',
  'VF/PMP-T': 'photos/vasefillers/pumpinosthankful Small.jpeg',
  'VF/PUT-H': 'photos/vasefillers/putkapodsharvest Small.jpeg',
  'VF/ABS': 'photos/vasefillers/ambernutstemsnatural Small.jpeg',
  'VF/FBC': 'photos/vasefillers/frostedbirchcones Small.jpeg',
  'VF/ASA': 'photos/vasefillers/appleslicesassorted Small.jpeg',
  'VF/ASG': 'photos/vasefillers/appleslicesgreen Small.jpeg',
  'VF/ASR': 'photos/vasefillers/appleslicesred Small.jpeg',
  'VF/OSG': 'photos/vasefillers/orangeslicesgreen Small.jpeg',
  'VF/OSO': 'photos/vasefillers/orangeslicesorange Small.jpeg',
  'VF/JP': 'photos/vasefillers/juniperpreserved Small.jpeg',
  'VF/MICN': 'photos/vasefillers/miniindiancornnohusk Small.jpeg',
  'VF/MIC': 'photos/vasefillers/miniindiancorn Small.jpeg',
  'VF/MUC': 'photos/vasefillers/muiriicones Small.jpeg',
  'VF/SMC': 'photos/vasefillers/spanishmosschartreuse Small.jpeg',
  'VF/PMP': 'photos/vasefillers/pumpinos Small.jpeg',
  'VF/WR': 'photos/vasefillers/whiteroot Small.jpeg',
  'VF/OG': 'photos/vasefillers/orangesgreen Small.jpeg',
  'VF/OO': 'photos/vasefillers/orangesorange Small.jpeg',
  'VF/CSR': 'photos/vasefillers/canellastemsred Small.jpeg',
  'VF/DW': 'photos/vasefillers/driftwood Small.jpeg',
  'VF/PTP': 'photos/vasefillers/putkapods Small.jpeg',
  'VF/PCW': 'photos/vasefillers/pineconestippedwhite Small.jpeg',
  'VF/HC': 'photos/vasefillers/hemlockcones Small.jpeg',
  'VF/MBL': 'photos/vasefillers/minibirchlogs Small.jpeg',
  'VF/RMC': 'photos/vasefillers/reindeermodsschartreuse Small.jpeg',
};

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
