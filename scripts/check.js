#!/usr/bin/env node
// Checks config.js, data/*.json and styles/tokens.css for mistakes that would
// break the guide or quietly lose saved favorites and plans.
//
//   node scripts/check.js
//
// Exits with code 1 if it finds errors. Warnings are worth a look but don't fail.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];
const error = msg => errors.push(msg);
const warn = msg => warnings.push(msg);
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// ---------- config.js ----------

let TRIP;
try {
  const sandbox = { window: {} };
  vm.runInNewContext(read('config.js'), sandbox, { filename: 'config.js' });
  TRIP = sandbox.window.TRIP;
  if (!TRIP) throw new Error('config.js must set window.TRIP');
} catch (e) {
  console.error(`✗ config.js could not be loaded: ${e.message}`);
  process.exit(1);
}

const requireString = (value, name) => {
  if (typeof value !== 'string' || !value.trim()) error(`config.js: ${name} must be a non-empty string`);
};

requireString(TRIP.city && TRIP.city.name, 'city.name');
requireString(TRIP.city && TRIP.city.geocodeSuffix, 'city.geocodeSuffix');
requireString(TRIP.trip && TRIP.trip.dateRange, 'trip.dateRange');
requireString(TRIP.trip && TRIP.trip.pageTitle, 'trip.pageTitle');
requireString(TRIP.storagePrefix, 'storagePrefix');
requireString(TRIP.baseArea, 'baseArea');

const b = TRIP.city && TRIP.city.bounds;
if (!b || [b.south, b.west, b.north, b.east].some(n => typeof n !== 'number')) {
  error('config.js: city.bounds needs numeric south, west, north and east');
} else if (b.south >= b.north || b.west >= b.east) {
  error('config.js: city.bounds south must be less than north, and west less than east');
}

if (!Array.isArray(TRIP.days) || TRIP.days.length === 0) {
  error('config.js: days must list at least one day');
} else {
  const seen = new Set();
  TRIP.days.forEach((d, i) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date || '')) error(`config.js: days[${i}].date must be YYYY-MM-DD (got "${d.date}")`);
    if (seen.has(d.date)) error(`config.js: days[${i}].date "${d.date}" is repeated`);
    seen.add(d.date);
    if (!d.label) error(`config.js: days[${i}] needs a label`);
  });
}

(TRIP.stays || []).forEach((s, i) => {
  if (!s.kind || !s.name) error(`config.js: stays[${i}] needs kind and name`);
});

if (!['auto', 'light', 'dark'].includes(TRIP.theme)) error(`config.js: theme must be 'auto', 'light' or 'dark'`);

const ICONS = ['food', 'see', 'do', 'shop', 'star', 'map'];
if (!Array.isArray(TRIP.tabs) || TRIP.tabs.length === 0) {
  error('config.js: tabs must list at least one tab');
} else {
  const ids = new Set();
  TRIP.tabs.forEach((t, i) => {
    if (!t.id || !t.label) error(`config.js: tabs[${i}] needs id and label`);
    if (['Plan', 'Info'].includes(t.id)) error(`config.js: tabs[${i}].id "${t.id}" is reserved`);
    if (ids.has(t.id)) error(`config.js: tab id "${t.id}" is repeated`);
    ids.add(t.id);
    if (t.icon && !ICONS.includes(t.icon)) warn(`config.js: tabs[${i}].icon "${t.icon}" isn't one of ${ICONS.join(', ')}; a star will be shown`);
    if (!Array.isArray(t.sources) || t.sources.length === 0) error(`config.js: tabs[${i}].sources must list data files`);
  });
  if (TRIP.tabs.length > 5) warn(`config.js: ${TRIP.tabs.length} tabs plus Plan and More may be cramped on a phone`);
}

// ---------- Tones: tokens.css, config.js and app.js must agree ----------

const tokenTones = [...read('styles/tokens.css').matchAll(/--tone-([a-z0-9-]+)\s*:/g)].map(m => m[1]);
const appTonesMatch = read('app.js').match(/const TONES = \[([^\]]*)\]/);
const appTones = appTonesMatch ? [...appTonesMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]) : [];

if (tokenTones.length === 0) error('styles/tokens.css: no --tone-* tokens found');
appTones.filter(t => !tokenTones.includes(t)).forEach(t =>
  error(`app.js: TONES includes "${t}" but styles/tokens.css has no --tone-${t}`));
tokenTones.filter(t => !appTones.includes(t)).forEach(t =>
  warn(`styles/tokens.css: --tone-${t} isn't in TONES in app.js, so unmapped categories won't use it`));
Object.entries(TRIP.categoryTones || {}).forEach(([cat, tone]) => {
  if (!tokenTones.includes(tone)) error(`config.js: categoryTones["${cat}"] uses "${tone}", which has no --tone-${tone} in styles/tokens.css`);
});

// ---------- Place data ----------

const sources = [...new Set((TRIP.tabs || []).flatMap(t => t.sources || []))];
const idsBySource = {};
const categories = new Set();
let placeCount = 0;

const itemId = item => (item.name + item.neighborhood).replace(/\W/g, '').toLowerCase();
const rating = (value, field, where) => {
  if (value === undefined) return;
  if (!Number.isInteger(value) || value < 0 || value > 5) error(`${where}: ${field} must be a whole number from 0 to 5, where 0 hides it (got ${JSON.stringify(value)})`);
};

for (const source of sources) {
  const file = `data/${source}.json`;
  let list;
  try {
    list = JSON.parse(read(file));
  } catch (e) {
    error(`${file}: ${e.code === 'ENOENT' ? 'file not found (listed in config.js tabs)' : 'invalid JSON: ' + e.message}`);
    continue;
  }
  if (!Array.isArray(list)) { error(`${file}: must be a JSON array of places`); continue; }
  const placeIds = idsBySource[source] = new Map();
  if (list.length === 0) warn(`${file}: has no places`);

  list.forEach((item, i) => {
    const where = `${file} [${i}]${item && item.name ? ' "' + item.name + '"' : ''}`;
    if (!item || typeof item !== 'object') { error(`${where}: must be an object`); return; }
    placeCount++;
    for (const field of ['name', 'category', 'neighborhood']) {
      if (typeof item[field] !== 'string' || !item[field].trim()) error(`${where}: missing required "${field}"`);
    }
    rating(item.vibeRating, 'vibeRating', where);
    rating(item.weirdnessLevel, 'weirdnessLevel', where);
    if (item.tags !== undefined && (!Array.isArray(item.tags) || item.tags.some(t => typeof t !== 'string'))) {
      error(`${where}: tags must be an array of strings`);
    }
    if (item.category) categories.add(item.category);
    if (item.name && item.neighborhood) {
      const id = itemId(item);
      if (placeIds.has(id)) {
        error(`${where}: same name and neighborhood as ${placeIds.get(id)} in the same file`);
      } else {
        placeIds.set(id, where);
      }
    }
  });
}

// The same place may appear under two tabs (it shares one favorite and plan entry),
// but within one tab only the first copy is shown.
(TRIP.tabs || []).forEach(tab => {
  const seen = new Map();
  (tab.sources || []).forEach(source => (idsBySource[source] || new Map()).forEach((where, id) => {
    if (seen.has(id)) warn(`${tab.label} tab: ${where} duplicates ${seen.get(id)}; only the first is shown`);
    else seen.set(id, where);
  }));
});

const unmapped = [...categories].filter(c => !(TRIP.categoryTones || {})[c]).sort();
if (unmapped.length) warn(`config.js: these categories have no entry in categoryTones and will get an automatic tone: ${unmapped.join(', ')}`);
const unused = Object.keys(TRIP.categoryTones || {}).filter(c => !categories.has(c)).sort();
if (unused.length) warn(`config.js: categoryTones has entries no place uses: ${unused.join(', ')}`);

// ---------- practical.json ----------

let practical = null;
try {
  practical = JSON.parse(read('data/practical.json'));
  if (!practical || typeof practical !== 'object' || Array.isArray(practical)) error('data/practical.json: must be a JSON object');
} catch (e) {
  error(`data/practical.json: ${e.code === 'ENOENT' ? 'file not found' : 'invalid JSON: ' + e.message}`);
}

if (practical) {
  const KNOWN = ['neighborhoods', 'airportDirections', 'keyStations', 'transportation', 'itineraries', 'reservations', 'budget',
    'money', 'weather', 'packingList', 'rainyDay', 'language', 'etiquette', 'connectivity', 'luggage', 'electrical',
    'emergencyNumbers', 'apps', 'usefulLinks'];
  Object.keys(practical).filter(k => !KNOWN.includes(k)).forEach(k =>
    warn(`data/practical.json: "${k}" isn't shown anywhere in the app`));

  const arrayOf = (key, fields) => {
    const v = practical[key];
    if (v === undefined) return;
    if (!Array.isArray(v)) { error(`data/practical.json: ${key} must be an array`); return; }
    v.forEach((x, i) => fields.forEach(f => {
      if (x[f] === undefined) error(`data/practical.json: ${key}[${i}] is missing "${f}"`);
    }));
  };
  arrayOf('keyStations', ['line', 'from', 'note']);
  arrayOf('itineraries', ['day', 'theme', 'slots']);
  arrayOf('reservations', ['name', 'urgency', 'how']);
  arrayOf('rainyDay', ['activity', 'why']);
  arrayOf('language', ['phrase', 'japanese', 'pronunciation']);
  arrayOf('apps', ['name', 'description']);
  arrayOf('usefulLinks', ['name', 'url']);

  Object.entries(practical.airportDirections || {}).forEach(([k, a]) => {
    if (!a.title || !Array.isArray(a.options)) error(`data/practical.json: airportDirections.${k} needs title and options`);
    else a.options.forEach((o, i) => ['method', 'time', 'cost', 'steps'].forEach(f => {
      if (o[f] === undefined) error(`data/practical.json: airportDirections.${k}.options[${i}] is missing "${f}"`);
    }));
  });
  Object.entries(practical.neighborhoods || {}).forEach(([k, n]) => {
    if (!n.title) error(`data/practical.json: neighborhoods.${k} needs a title`);
  });
  (practical.keyStations || []).forEach((s, i) => {
    if (s.line && !(TRIP.transitLines || {})[s.line]) warn(`data/practical.json: keyStations[${i}].line "${s.line}" has no color in config.js transitLines`);
  });
}

// ---------- Report ----------

warnings.forEach(w => console.log(`! ${w}`));
errors.forEach(e => console.log(`✗ ${e}`));
const summary = `${placeCount} places in ${sources.length} files, ${categories.size} categories, ${TRIP.days.length} days`;
if (errors.length) {
  console.log(`\n✗ ${errors.length} error${errors.length === 1 ? '' : 's'}, ${warnings.length} warning${warnings.length === 1 ? '' : 's'} (${summary})`);
  process.exit(1);
}
console.log(`\n✓ No errors${warnings.length ? `, ${warnings.length} warning${warnings.length === 1 ? '' : 's'}` : ''} (${summary})`);
