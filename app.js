// App logic. Trip-specific values come from config.js (window.TRIP);
// visual values come from styles/tokens.css. You rarely need to edit this file
// to make the guide your own. See REMIX.md.

const TRIP = window.TRIP;
const STORE = {
  favs: TRIP.storagePrefix + 'Favs',
  itinerary: TRIP.storagePrefix + 'Itinerary',
  geo: TRIP.storagePrefix + 'GeoCache'
};

// ---------- Icons ----------

const svg = (body, sw = 1.8, fill = 'none') =>
  `<svg viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const ICONS = {
  plan: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
  food: svg('<path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/>'),
  see: svg('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20"/>'),
  do: svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  shop: svg('<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>'),
  star: svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
  map: svg('<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>'),
  list: svg('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>', 2),
  home: svg('<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
  train: svg('<rect x="4" y="3" width="16" height="14" rx="2"/><circle cx="8.5" cy="20" r="1.5"/><circle cx="15.5" cy="20" r="1.5"/><path d="M4 11h16"/>'),
  money: svg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>'),
  bag: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>'),
  language: svg('<path d="M3 5h12M9 3v2m1.048 3.5A18.24 18.24 0 016 20.5M3 17c1-1.5 3-3.5 5-4.5"/><path d="M14 3l7 14h-14"/>'),
  pin: svg('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', 2),
  plane: svg('<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1l5.6 3.4-2.8 2.8-2 .7c-.4.1-.7.4-.7.8 0 .3.2.6.5.7l2.8 1.1 1.1 2.8c.1.3.4.5.7.5.4 0 .7-.3.8-.7l.7-2 2.8-2.8 3.4 5.6c.2.4.7.5 1.1.3l.5-.3c.4-.2.6-.6.5-1.1z"/>', 2),
  clipboard: svg('<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>', 2),
  thermometer: svg('<path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>', 2),
  rain: svg('<path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"/><path d="M8 16l-2 3M12 16l-2 3M16 16l-2 3"/>', 2),
  flag: svg('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>', 2),
  wifi: svg('<path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>', 2),
  phone: svg('<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>', 2),
  link: svg('<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>', 2),
  directions: svg('<polygon points="3 11 22 2 13 21 11 13 3 11"/>', 2),
  heart: svg('<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>', 2),
  heartFilled: svg('<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>', 2, 'currentColor'),
  check: svg('<polyline points="20 6 9 17 4 12"/>', 2),
  chevronDown: svg('<path d="M6 9l6 6 6-6"/>', 2),
  chevronUp: svg('<path d="M18 15l-6-6-6 6"/>', 2),
  close: svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 2),
  arrow: svg('<path d="M5 12h14M12 5l7 7-7 7"/>', 2),
  search: svg('<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>', 2),
  grip: svg('<circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>', 0, 'currentColor'),
  alert: svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 2),
  empty: svg('<circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/>', 1.5)
};

// ---------- State ----------

const ITIN_DAYS = ['unsorted', ...TRIP.days.map(d => d.date)];
const ITIN_DAY_LABELS = { unsorted: ['Unsorted', ''] };
TRIP.days.forEach(d => { ITIN_DAY_LABELS[d.date] = [d.label, d.theme || '']; });

const DATA_SOURCES = [...new Set(TRIP.tabs.flatMap(t => t.sources))];

const state = {
  tab: 'Plan',
  filter: null,
  favOnly: false,
  search: '',
  favorites: readJSON(STORE.favs, {}),
  data: { practical: null },
  expanded: {},
  infoPage: 'stay',
  infoPanelOpen: false,
  itinerary: null,
  planView: 'list',
  mapDay: TRIP.days[0] && TRIP.days[0].date,
  mapInstance: null,
  mapMarkers: [],
  mapDirectionsRenderer: null,
  collapsedDays: {}
};

const infoPages = [
  { id: 'stay',        label: 'Stay',       icon: ICONS.home,     title: 'Your stay',          subtitle: 'Where you are staying and the neighborhoods around it.' },
  { id: 'transport',   label: 'Transport',  icon: ICONS.train,    title: 'Getting around',     subtitle: 'Trains, metro lines and airport transfers.' },
  { id: 'itineraries', label: 'Day plans',  icon: ICONS.plan,     title: 'Suggested day plans', subtitle: 'Ready-made days to borrow from.' },
  { id: 'money',       label: 'Money',      icon: ICONS.money,    title: 'Money and budget',   subtitle: 'Budget, prices, reservations and payments.' },
  { id: 'packing',     label: 'Packing',    icon: ICONS.bag,      title: 'Packing and weather', subtitle: 'What to bring and what to expect.' },
  { id: 'phrases',     label: 'Phrases',    icon: ICONS.language, title: 'Language and culture', subtitle: 'Key phrases and etiquette.' },
  { id: 'essentials',  label: 'Essentials', icon: ICONS.do,       title: 'Essentials',         subtitle: 'Connectivity, apps, emergency numbers and more.' }
];

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

function saveFavs() {
  localStorage.setItem(STORE.favs, JSON.stringify(state.favorites));
}

function allPlaces() {
  return DATA_SOURCES.flatMap(s => state.data[s] || []);
}

function findPlace(id) {
  return allPlaces().find(i => itemId(i) === id);
}

function itemId(item) {
  return (item.name + item.neighborhood).replace(/\W/g, '').toLowerCase();
}

// ---------- Category tones ----------

const TONES = ['ginza', 'marunouchi', 'hibiya', 'tozai', 'chiyoda', 'yurakucho', 'hanzomon', 'namboku', 'fukutoshin'];

function categoryTone(cat) {
  if (TRIP.categoryTones[cat]) return TRIP.categoryTones[cat];
  let h = 0;
  for (const ch of cat || '') h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

function catBadge(cat) {
  return `<span class="cat" style="--tone:var(--tone-${categoryTone(cat)})">${cat}</span>`;
}

// ---------- Itinerary ----------

function seedItinerary() {
  state.itinerary = {};
  ITIN_DAYS.forEach(d => { state.itinerary[d] = []; });
}

function initItinerary() {
  const saved = readJSON(STORE.itinerary, null);
  if (saved) {
    state.itinerary = saved;
    ITIN_DAYS.forEach(d => { if (!state.itinerary[d]) state.itinerary[d] = []; });
  } else {
    seedItinerary();
  }
}

function saveItinerary() {
  localStorage.setItem(STORE.itinerary, JSON.stringify(state.itinerary));
}

function getItineraryItem(id) {
  const item = findPlace(id);
  return item ? { id, name: item.name, note: item.description, category: item.category } : null;
}

function getItemArea(id) {
  const item = findPlace(id);
  return item ? (item.neighborhood || 'Other') : 'Other';
}

function isInItinerary(id) {
  if (!state.itinerary) return false;
  return ITIN_DAYS.some(day => (state.itinerary[day] || []).includes(id));
}

function removeFromItinerary(id) {
  if (!state.itinerary) return;
  for (const day of ITIN_DAYS) {
    const idx = state.itinerary[day].indexOf(id);
    if (idx !== -1) { state.itinerary[day].splice(idx, 1); break; }
  }
  saveItinerary();
}

function toggleItineraryItem(id) {
  if (!state.itinerary) initItinerary();
  if (isInItinerary(id)) {
    removeFromItinerary(id);
  } else {
    state.itinerary.unsorted.push(id);
    saveItinerary();
  }
}

function planButtonHtml(inPlan) {
  return inPlan ? `${ICONS.check}In plan` : `${ICONS.plan}Add to plan`;
}

function toggleCardPlan(id, btn) {
  toggleItineraryItem(id);
  const inPlan = isInItinerary(id);
  btn.classList.toggle('in-plan', inPlan);
  btn.innerHTML = planButtonHtml(inPlan);
}

// ---------- Google Maps ----------

let _gmapsPromise = null;

function loadGoogleMaps() {
  if (_gmapsPromise) return _gmapsPromise;
  _gmapsPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(TRIP.mapsApiKey) + '&libraries=geometry';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => { _gmapsPromise = null; reject(new Error('Failed to load Google Maps')); };
    document.head.appendChild(script);
  });
  return _gmapsPromise;
}

const GEO_CACHE_TTL = 30 * 24 * 60 * 60 * 1000;

function getGeoCache() { return readJSON(STORE.geo, {}); }
function setGeoCache(cache) { localStorage.setItem(STORE.geo, JSON.stringify(cache)); }

function geoQueryFor(item) {
  return item.mapsQuery || (item.name + ' ' + TRIP.city.geocodeSuffix);
}

function getGeoQuery(id) {
  const item = findPlace(id);
  return item ? geoQueryFor(item) : null;
}

async function geocodeItems(ids) {
  const cache = getGeoCache();
  const now = Date.now();
  const results = {};
  const toGeocode = [];

  for (const id of ids) {
    const query = getGeoQuery(id);
    if (!query) { results[id] = null; continue; }
    const cached = cache[query];
    if (cached && cached.status === 'OK' && (now - cached.ts) < GEO_CACHE_TTL) {
      results[id] = { lat: cached.lat, lng: cached.lng };
    } else if (cached && cached.status === 'FAIL' && (now - cached.ts) < GEO_CACHE_TTL) {
      results[id] = null;
    } else {
      toGeocode.push({ id, query });
    }
  }

  if (toGeocode.length > 0) {
    await loadGoogleMaps();
    const geocoder = new google.maps.Geocoder();
    const b = TRIP.city.bounds;
    const cityBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(b.south, b.west),
      new google.maps.LatLng(b.north, b.east)
    );
    const newEntries = {};
    for (const { id, query } of toGeocode) {
      try {
        const result = await new Promise((resolve, reject) => {
          geocoder.geocode({ address: query, bounds: cityBounds }, (res, status) => {
            if (status === 'OK' && res[0]) {
              const loc = res[0].geometry.location;
              resolve({ lat: loc.lat(), lng: loc.lng() });
            } else {
              reject(new Error(status));
            }
          });
        });
        newEntries[query] = { lat: result.lat, lng: result.lng, status: 'OK', ts: now };
        results[id] = result;
      } catch {
        newEntries[query] = { status: 'FAIL', ts: now };
        results[id] = null;
      }
    }
    const freshCache = getGeoCache();
    Object.assign(freshCache, newEntries);
    setGeoCache(freshCache);
  }

  return results;
}

let _bgGeocoding = false;
async function backgroundGeocodeAll() {
  if (_bgGeocoding) return;
  _bgGeocoding = true;
  const cache = getGeoCache();
  const now = Date.now();
  const uncached = allPlaces().map(itemId).filter(id => {
    const query = getGeoQuery(id);
    if (!query) return false;
    const c = cache[query];
    return !c || (now - c.ts) >= GEO_CACHE_TTL;
  });
  for (let i = 0; i < uncached.length; i += 5) {
    await geocodeItems(uncached.slice(i, i + 5));
    if (i + 5 < uncached.length) await new Promise(r => setTimeout(r, 1000));
  }
  _bgGeocoding = false;
}

// Read a token from tokens.css so the map follows the theme.
function token(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function mapStyles() {
  return [
    { elementType: 'geometry', stylers: [{ color: token('--map-land') }] },
    { elementType: 'labels.text.fill', stylers: [{ color: token('--map-label') }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: token('--map-label-halo') }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: token('--map-road') }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: token('--map-road-major') }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: token('--map-water') }] },
    { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: token('--color-accent') }] },
    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: token('--map-park') }] }
  ];
}

// Numbered station-style marker: surface-colored disc with an accent ring.
function createNumberedMarker(map, position, number) {
  const accent = token('--color-accent');
  const surface = token('--color-surface');
  const markup = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">' +
    `<circle cx="15" cy="15" r="12" fill="${surface}" stroke="${accent}" stroke-width="4"/>` +
    `<text x="15" y="19.5" text-anchor="middle" fill="${accent}" font-family="sans-serif" font-size="12" font-weight="900">${number}</text></svg>`;
  return new google.maps.Marker({
    position,
    map,
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markup),
      scaledSize: new google.maps.Size(30, 30),
      anchor: new google.maps.Point(15, 15)
    },
    optimized: false
  });
}

function routeRequest(items, optimize) {
  const toLatLng = p => new google.maps.LatLng(p.lat, p.lng);
  return {
    origin: toLatLng(items[0].position),
    destination: toLatLng(items[items.length - 1].position),
    waypoints: items.slice(1, -1).map(i => ({ location: toLatLng(i.position), stopover: true })),
    travelMode: 'WALKING',
    optimizeWaypoints: optimize
  };
}

function requestRoute(req) {
  return new Promise((resolve, reject) => {
    new google.maps.DirectionsService().route(req, (res, status) => {
      if (status === 'OK') resolve(res); else reject(new Error(status));
    });
  });
}

async function drawRoute(map, geocodedItems) {
  if (geocodedItems.length < 2) return null;
  try {
    const result = await requestRoute(routeRequest(geocodedItems, false));
    if (state.mapDirectionsRenderer) state.mapDirectionsRenderer.setMap(null);
    state.mapDirectionsRenderer = new google.maps.DirectionsRenderer({
      map,
      directions: result,
      suppressMarkers: true,
      polylineOptions: { strokeColor: token('--color-accent'), strokeWeight: 4, strokeOpacity: 0.75 }
    });
    let totalDist = 0, totalTime = 0;
    result.routes[0].legs.forEach(leg => { totalDist += leg.distance.value; totalTime += leg.duration.value; });
    return {
      distance: totalDist < 1000 ? totalDist + ' m' : (totalDist / 1000).toFixed(1) + ' km',
      duration: totalTime < 3600 ? Math.round(totalTime / 60) + ' min' : Math.floor(totalTime / 3600) + ' h ' + Math.round((totalTime % 3600) / 60) + ' min'
    };
  } catch { return null; }
}

async function optimizeRoute() {
  const day = state.mapDay;
  const ids = state.itinerary[day] || [];
  if (ids.length < 3) return;
  const geocoded = await geocodeItems(ids);
  const validItems = ids.filter(id => geocoded[id]).map(id => ({ id, position: geocoded[id] }));
  if (validItems.length < 3) return;
  try {
    const result = await requestRoute(routeRequest(validItems, true));
    const middle = validItems.slice(1, -1);
    const reordered = [validItems[0].id, ...result.routes[0].waypoint_order.map(i => middle[i].id), validItems[validItems.length - 1].id];
    state.itinerary[day] = [...reordered, ...ids.filter(id => !geocoded[id])];
    saveItinerary();
    render();
  } catch (e) { console.warn('Route optimization failed:', e); }
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function renderNearby(validItems) {
  if (validItems.length === 0) return;
  let cLat = 0, cLng = 0;
  validItems.forEach(vi => { cLat += vi.position.lat; cLng += vi.position.lng; });
  cLat /= validItems.length;
  cLng /= validItems.length;
  const cache = getGeoCache();
  const now = Date.now();
  const nearby = [];
  allPlaces().forEach(item => {
    const id = itemId(item);
    if (isInItinerary(id)) return;
    const cached = cache[geoQueryFor(item)];
    if (!cached || cached.status !== 'OK' || (now - cached.ts) >= GEO_CACHE_TTL) return;
    const dist = haversine(cLat, cLng, cached.lat, cached.lng);
    if (dist <= 1000) nearby.push({ item, id, dist });
  });
  nearby.sort((a, b) => a.dist - b.dist);
  const top = nearby.slice(0, 5);
  const section = document.getElementById('mapNearbySection');
  if (top.length === 0 || !section) return;
  section.innerHTML = '<div class="map-nearby-section"><h3>Nearby places</h3>' + top.map(n => {
    const distStr = n.dist < 100 ? Math.round(n.dist) + ' m' : (n.dist / 1000).toFixed(1) + ' km';
    return `<div class="map-row" onclick="addNearbyToDay('${jsArg(n.id)}')">` +
      `<span class="map-row-name">${n.item.name}</span>${catBadge(n.item.category)}` +
      `<span class="map-row-dist">${distStr}</span></div>`;
  }).join('') + '</div>';
}

function jsArg(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function toggleDayCollapse(day) {
  if (state.collapsedDays[day]) delete state.collapsedDays[day];
  else state.collapsedDays[day] = true;
  const section = document.querySelector('.itin-day-section[data-day="' + day + '"]');
  if (section) section.classList.toggle('collapsed', !!state.collapsedDays[day]);
}

function resetMap() {
  if (state.mapDirectionsRenderer) { state.mapDirectionsRenderer.setMap(null); state.mapDirectionsRenderer = null; }
  state.mapInstance = null;
  state.mapMarkers = [];
}

function setPlanView(view) {
  if (state.planView === view) return;
  state.planView = view;
  if (view === 'list') resetMap();
  render();
  window.scrollTo({ top: 0 });
}

function setMapDay(day) {
  if (state.mapDay === day) return;
  state.mapDay = day;
  resetMap();
  render();
}

function panToMarker(id) {
  if (!state.mapInstance) return;
  const marker = state.mapMarkers.find(m => m._itemId === id);
  if (marker) {
    state.mapInstance.panTo(marker.getPosition());
    state.mapInstance.setZoom(Math.max(state.mapInstance.getZoom(), 16));
  }
  const card = document.querySelector('.map-row[data-map-id="' + id + '"]');
  if (card) {
    document.querySelectorAll('.map-row.highlighted').forEach(c => c.classList.remove('highlighted'));
    card.classList.add('highlighted');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => card.classList.remove('highlighted'), 2000);
  }
}

function addNearbyToDay(id) {
  if (!state.itinerary[state.mapDay] || isInItinerary(id)) return;
  state.itinerary[state.mapDay].push(id);
  saveItinerary();
  render();
}

function mapMessage(icon, html) {
  return `<div class="map-message">${icon}<p>${html}</p></div>`;
}

let _mapViewGen = 0;

async function initMapView() {
  const gen = ++_mapViewGen;
  const ids = state.itinerary[state.mapDay] || [];
  const container = document.getElementById('mapContainer');
  if (!container) return;

  if (!TRIP.mapsApiKey) {
    container.innerHTML = mapMessage(ICONS.map, 'The map needs a Google Maps API key.<br>Add one as <code>mapsApiKey</code> in <code>config.js</code>.');
    return;
  }
  if (ids.length === 0) {
    container.innerHTML = mapMessage(ICONS.map, 'Nothing planned for this day yet.<br>Add places in List view to see them here.');
    return;
  }

  try { await loadGoogleMaps(); } catch {
    if (gen !== _mapViewGen) return;
    container.innerHTML = mapMessage(ICONS.alert, 'Google Maps didn’t load.<br>Check your connection and API key, then try again.');
    return;
  }
  if (gen !== _mapViewGen) return;

  const geocoded = await geocodeItems(ids);
  if (gen !== _mapViewGen) return;

  const validItems = [];
  const failedItems = [];
  ids.forEach(id => {
    const item = getItineraryItem(id);
    if (!item) return;
    if (geocoded[id]) validItems.push({ id, item, position: geocoded[id], number: validItems.length + 1 });
    else failedItems.push({ id, item });
  });

  const mapContainer = document.getElementById('mapContainer');
  if (!mapContainer) return;
  if (validItems.length === 0) {
    mapContainer.innerHTML = mapMessage(ICONS.alert, 'None of this day’s places could be found on the map.');
    return;
  }

  mapContainer.innerHTML = '';
  const bounds = new google.maps.LatLngBounds();
  validItems.forEach(vi => bounds.extend(new google.maps.LatLng(vi.position.lat, vi.position.lng)));

  const map = new google.maps.Map(mapContainer, {
    center: bounds.getCenter(),
    zoom: validItems.length === 1 ? 16 : 14,
    styles: mapStyles(),
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: 'greedy'
  });
  if (validItems.length > 1) map.fitBounds(bounds, 50);

  state.mapInstance = map;
  state.mapMarkers = validItems.map(vi => {
    const marker = createNumberedMarker(map, vi.position, vi.number);
    marker._itemId = vi.id;
    marker.addListener('click', () => panToMarker(vi.id));
    return marker;
  });

  const routeInfo = validItems.length >= 2 ? await drawRoute(map, validItems) : null;
  if (gen !== _mapViewGen) return;

  const routeEl = document.getElementById('mapRouteInfo');
  if (routeInfo && routeEl) {
    routeEl.innerHTML = '<div class="map-route-info">' + ICONS.arrow +
      `<span><strong>${routeInfo.duration}</strong> walking</span><span>${routeInfo.distance}</span>` +
      '<span class="route-spacer"></span>' +
      (ids.length >= 3 ? '<button class="map-optimize-btn" onclick="optimizeRoute()">Optimize route</button>' : '') +
      '</div>';
  }

  const itemListEl = document.getElementById('mapItemList');
  if (itemListEl) {
    itemListEl.innerHTML =
      validItems.map(vi =>
        `<div class="map-row" data-map-id="${vi.id}" onclick="panToMarker('${jsArg(vi.id)}')">` +
        `<span class="map-item-number">${vi.number}</span><span class="map-row-name">${vi.item.name}</span>${catBadge(vi.item.category)}</div>`
      ).join('') +
      failedItems.map(fi => `<div class="map-item-failed">${fi.item.name} couldn’t be found on the map</div>`).join('');
  }

  renderNearby(validItems);
  backgroundGeocodeAll();
}

// ---------- Places ----------

function isFav(item) {
  return !!state.favorites[itemId(item)];
}

function toggleFav(id, el) {
  if (state.favorites[id]) {
    delete state.favorites[id];
    el.classList.remove('active');
    el.innerHTML = ICONS.heart;
  } else {
    state.favorites[id] = true;
    el.classList.add('active');
    el.innerHTML = ICONS.heartFilled;
  }
  el.setAttribute('aria-pressed', !!state.favorites[id]);
  saveFavs();
  const count = document.querySelector('.fav-chip .fav-count');
  if (count) count.textContent = Object.keys(state.favorites).length || '';
  if (state.favOnly) render();
}

function currentTab() {
  return TRIP.tabs.find(t => t.id === state.tab);
}

// A tab can combine several data files; if a place appears in more than one,
// show only the first copy.
function getTabData() {
  const tab = currentTab();
  if (!tab) return [];
  const seen = new Set();
  return tab.sources.flatMap(s => state.data[s] || []).filter(item => {
    const id = itemId(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function filterData() {
  let data = getTabData();
  if (state.favOnly) data = data.filter(isFav);
  if (state.filter) data = data.filter(d => d.category === state.filter);
  if (state.search) {
    const s = state.search.toLowerCase();
    data = data.filter(d =>
      d.name.toLowerCase().includes(s) ||
      (d.nameJa || '').includes(s) ||
      (d.neighborhood || '').toLowerCase().includes(s) ||
      (d.category || '').toLowerCase().includes(s) ||
      (d.tags || []).some(t => t.toLowerCase().includes(s)) ||
      (d.description || '').toLowerCase().includes(s)
    );
  }
  return data;
}

// Optional detail fields shown when a card is expanded, in display order.
const DETAIL_FIELDS = [
  ['priceRange', 'Price'],
  ['admissionCost', 'Cost'],
  ['hours', 'Hours'],
  ['timeNeeded', 'Time'],
  ['whatToOrder', 'Order'],
  ['whatToBuy', 'Buy'],
  ['howToFind', 'Find it'],
  ['tips', 'Tips']
];

function renderCard(item) {
  const id = itemId(item);
  const fav = isFav(item);
  const inPlan = isInItinerary(id);

  const vibeHtml = item.vibeRating
    ? `<span class="card-vibe" title="Rating ${item.vibeRating} of 5"><span class="card-vibe-dots">${Array.from({ length: 5 }, (_, i) => `<span class="dot ${i < item.vibeRating ? 'filled' : ''}"></span>`).join('')}</span><span class="rating-label">rating</span></span>`
    : '';
  const weirdHtml = item.weirdnessLevel
    ? `<span class="weirdness" title="Weirdness ${item.weirdnessLevel} of 5"><span class="rating-label">weird</span><span class="weirdness-bar">${Array.from({ length: 5 }, (_, i) => `<span class="seg ${i < item.weirdnessLevel ? 'filled' : ''}"></span>`).join('')}</span></span>`
    : '';
  const detailsHtml = DETAIL_FIELDS
    .filter(([key]) => item[key])
    .map(([key, label]) => `<div class="card-detail"><span class="card-detail-label">${label}</span><span class="card-detail-value">${item[key]}</span></div>`)
    .join('');
  const tagsHtml = (item.tags || []).map(t => `<span class="card-tag">${t}</span>`).join('');
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(geoQueryFor(item))}`;

  return `
    <article class="card ${state.expanded[id] ? 'expanded' : ''}" data-id="${id}">
      <div class="card-header" onclick="toggleCard('${id}')">
        <div class="card-main">
          <div class="card-title-row">
            <span class="card-name">${item.name}</span>
            ${item.nameJa ? `<span class="card-name-ja" lang="ja">${item.nameJa}</span>` : ''}
          </div>
          <div class="card-meta">
            ${catBadge(item.category)}
            <span class="card-location">${item.neighborhood}${item.nearestStation ? ', ' + item.nearestStation : ''}</span>
          </div>
        </div>
        <button class="card-fav ${fav ? 'active' : ''}" aria-label="Save ${item.name}" aria-pressed="${fav}" onclick="event.stopPropagation();toggleFav('${id}',this)">
          ${fav ? ICONS.heartFilled : ICONS.heart}
        </button>
        ${vibeHtml || weirdHtml ? `<div class="card-ratings">${vibeHtml}${weirdHtml}</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-body-inner">
          ${item.description ? `<p class="card-desc">${item.description}</p>` : ''}
          ${detailsHtml}
          ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
          <div class="card-actions">
            <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn btn-primary">${ICONS.directions}Directions</a>
            <button class="btn btn-secondary ${inPlan ? 'in-plan' : ''}" onclick="event.stopPropagation();toggleCardPlan('${id}',this)">${planButtonHtml(inPlan)}</button>
          </div>
        </div>
      </div>
    </article>`;
}

function toggleCard(id) {
  state.expanded[id] = !state.expanded[id];
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (card) card.classList.toggle('expanded', state.expanded[id]);
}

function renderPlaces() {
  const data = filterData();
  const container = document.getElementById('placesCards');
  if (data.length === 0) {
    container.innerHTML = `<div class="empty-state">${ICONS.empty}<p>${
      state.favOnly ? 'Nothing saved here yet. Tap the heart on a place to save it.' : 'No places match your search.'
    }</p></div>`;
  } else {
    container.innerHTML =
      `<div class="card-count">${data.length} place${data.length !== 1 ? 's' : ''}</div>` +
      data.map(renderCard).join('');
  }
  renderFilters();
}

function renderFilters() {
  const cats = [...new Set(getTabData().map(d => d.category))].sort();
  const favCount = Object.keys(state.favorites).length;
  document.getElementById('filterRow').innerHTML =
    `<button class="filter-chip fav-chip ${state.favOnly ? 'active' : ''}" aria-pressed="${state.favOnly}" onclick="toggleFavFilter()">
      ${state.favOnly ? ICONS.heartFilled : ICONS.heart}Saved <span class="fav-count">${favCount || ''}</span>
    </button>
    <button class="filter-chip ${!state.filter ? 'active' : ''}" onclick="setFilter(null)">All</button>` +
    cats.map(c => `<button class="filter-chip ${state.filter === c ? 'active' : ''}" onclick="setFilter('${jsArg(c)}')">${c}</button>`).join('');
}

function toggleFavFilter() {
  state.favOnly = !state.favOnly;
  render();
}

function setFilter(cat) {
  state.filter = cat;
  render();
}

// ---------- Navigation ----------

function render() {
  const isPlaces = !!currentTab();
  document.getElementById('controls').style.display = isPlaces ? '' : 'none';
  if (state.tab === 'Plan') renderPlan();
  else if (state.tab === 'Info') renderInfo();
  else renderPlaces();
}

function setTab(tab) {
  state.tab = tab;
  state.filter = null;
  state.search = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').classList.remove('visible');
  const view = tab === 'Plan' ? 'tabPlan' : tab === 'Info' ? 'tabInfo' : 'tabPlaces';
  document.querySelectorAll('.tab-content').forEach(t => t.classList.toggle('active', t.id === view));
  document.querySelectorAll('.nav-item').forEach(n => {
    const active = n.dataset.tab === tab;
    n.classList.toggle('active', active);
    if (active) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current');
  });
  document.getElementById('navMore').classList.toggle('active', tab === 'Info');
  closeInfoPanel();
  render();
  window.scrollTo({ top: 0 });
}

function buildNav() {
  const items = [{ id: 'Plan', label: 'Plan', icon: 'plan' }, ...TRIP.tabs];
  const nav = document.getElementById('bottomNav');
  nav.style.setProperty('--nav-columns', items.length + 1);
  nav.insertAdjacentHTML('afterbegin', items.map(t =>
    `<button class="nav-item" data-tab="${t.id}">${ICONS[t.icon] || ICONS.star}${t.label}</button>`
  ).join(''));
  nav.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
}

function toggleInfoPanel() {
  state.infoPanelOpen = !state.infoPanelOpen;
  document.getElementById('bottomNav').classList.toggle('expanded', state.infoPanelOpen);
  const btn = document.getElementById('navMore');
  btn.classList.toggle('open', state.infoPanelOpen);
  btn.setAttribute('aria-expanded', state.infoPanelOpen);
  if (state.infoPanelOpen) renderInfoPanel();
}

function closeInfoPanel() {
  state.infoPanelOpen = false;
  document.getElementById('bottomNav').classList.remove('expanded');
  const btn = document.getElementById('navMore');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}

function renderInfoPanel() {
  document.getElementById('navDrawerGrid').innerHTML = infoPages.map(p => `
    <button class="info-grid-item ${state.infoPage === p.id ? 'active' : ''}" onclick="selectInfoPage('${p.id}')">
      ${p.icon}<span>${p.label}</span>
    </button>`).join('');
}

function selectInfoPage(pageId) {
  state.infoPage = pageId;
  closeInfoPanel();
  const page = infoPages.find(p => p.id === pageId);
  document.getElementById('navMoreLabel').textContent = page.label;
  const iconEl = document.getElementById('navMoreIcon');
  iconEl.innerHTML = page.icon;
  iconEl.classList.add('has-icon');
  if (state.tab !== 'Info') setTab('Info');
  else { render(); window.scrollTo({ top: 0 }); }
}

// ---------- Info pages ----------
// Content comes from data/practical.json. Sections whose data is missing are skipped,
// so a remix can drop any key it doesn't need.

function section(icon, title, body) {
  return body ? `<section class="info-section"><h2 class="info-section-title">${icon}${title}</h2>${body}</section>` : '';
}

function infoCard(title, text) {
  return text ? `<div class="info-card"><h4>${title}</h4><p>${text}</p></div>` : '';
}

function directionsLink(query) {
  return `<div class="info-actions"><a href="https://www.google.com/maps/search/${encodeURIComponent(query)}" target="_blank" rel="noopener" class="btn btn-primary">${ICONS.directions}Directions</a></div>`;
}

function humanize(key) {
  const s = key.replace(/([A-Z])/g, ' $1').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderNeighborhood(n) {
  const known = ['title', 'description', 'stations'];
  const lists = Object.entries(n).filter(([, v]) => Array.isArray(v));
  const extras = Object.entries(n).filter(([k, v]) => !known.includes(k) && typeof v === 'string');
  return `<div class="info-card">
    <h4>${n.title}</h4>
    ${n.description ? `<p>${n.description}</p>` : ''}
    ${n.stations ? `<p><strong>Stations:</strong> ${n.stations}</p>` : ''}
    ${lists.map(([, items]) => items.map(w => `<div class="list-row">${w}</div>`).join('')).join('')}
    ${extras.map(([k, v]) => `<p><strong>${humanize(k)}:</strong> ${v}</p>`).join('')}
  </div>`;
}

const INFO_RENDERERS = {
  stay(p) {
    return section(ICONS.home, 'Accommodation', (TRIP.stays || []).map(s => `
        <div class="info-card">
          <h4>${s.kind}</h4>
          <p class="info-name">${s.name}</p>
          ${s.details ? `<p>${s.details}</p>` : ''}
          ${s.mapsQuery ? directionsLink(s.mapsQuery) : ''}
        </div>`).join('')) +
      section(ICONS.pin, 'Your neighborhoods', p.neighborhoods && Object.values(p.neighborhoods).map(renderNeighborhood).join(''));
  },

  transport(p) {
    const airports = p.airportDirections && Object.values(p.airportDirections).map(apt => `
      <div class="info-card">
        <h4>${apt.title}</h4>
        ${apt.options.map(o => `
          <div class="transport-option">
            <div class="transport-header">
              <span class="transport-method">${o.method}${o.recommended ? '<span class="transport-rec">Recommended</span>' : ''}</span>
              <span class="transport-badge"><span class="pill pill-accent">${o.time}</span><span class="pill pill-quiet">${o.cost}</span></span>
            </div>
            <div class="transport-steps">${o.steps}</div>
          </div>`).join('')}
      </div>`).join('');

    const stations = p.keyStations && `<div class="info-card is-list">${p.keyStations.map(s => `
      <div class="list-row">
        <div class="station-line"><span class="station-dot" style="--line:${TRIP.transitLines[s.line] || 'var(--color-accent)'}"></span>${s.line}</div>
        <div class="station-from">From ${s.from}</div>
        <div>${s.note}</div>
      </div>`).join('')}</div>`;

    const t = p.transportation || {};
    return section(ICONS.plane, 'Airport to hotel', airports) +
      section(ICONS.train, `Key lines from ${TRIP.baseArea}`, stations) +
      section(ICONS.train, 'Getting around', infoCard('Transit cards', t.suica) + infoCard('Train tips', t.trainTips) + infoCard('Last trains', t.lastTrains));
  },

  itineraries(p) {
    if (!p.itineraries) return `<div class="empty-state"><p>No suggested day plans yet. Add them to <code>itineraries</code> in data/practical.json.</p></div>`;
    return `<div class="info-section">${p.itineraries.map(day => `
      <div class="info-card">
        <div class="itin-day-title">${day.day}</div>
        <div class="itin-theme">${day.theme}</div>
        ${day.slots.map(s => !s.time && (s.activity.startsWith('OPTION') || s.activity.startsWith('—'))
          ? `<div class="itin-slot divider">${s.activity}</div>`
          : `<div class="itin-slot"><span class="itin-time">${s.time}</span><span class="itin-activity">${s.activity}</span></div>`
        ).join('')}
      </div>`).join('')}</div>`;
  },

  money(p) {
    const reservations = p.reservations && `<div class="info-card is-list">${p.reservations.map(r => {
      const cls = /ASAP|Extremely/.test(r.urgency) ? 'asap' : /week/.test(r.urgency) ? 'soon' : 'normal';
      return `<div class="res-row">
        <span class="res-urgency ${cls}">${r.urgency}</span>
        <div><div class="res-name">${r.name}<span class="res-price">${r.price || ''}</span></div><div class="res-how">${r.how}</div></div>
      </div>`;
    }).join('')}</div>`;

    const budget = p.budget && `
      <div class="info-card">
        <h4>Spending tiers</h4>
        ${Object.entries(p.budget.daily).map(([k, v]) => `
          <div class="budget-tier"><span class="budget-label ${k}">${k}</span><span class="budget-amount">${v.amount}</span><span class="budget-usd">${v.usd || ''}</span></div>
          <div class="budget-note">${v.description}</div>`).join('')}
      </div>
      ${p.budget.references ? `<div class="info-card"><h4>Price references</h4>${p.budget.references.map(r => {
        const [label, ...rest] = r.split(': ');
        return `<div class="budget-ref"><span>${label}</span><span>${rest.join(': ')}</span></div>`;
      }).join('')}</div>` : ''}`;

    const m = p.money || {};
    return section(ICONS.clipboard, 'Reservations', reservations) +
      section(ICONS.money, 'Daily budget', budget) +
      section(ICONS.money, 'Paying', infoCard('Cash or card', m.cashVsCard) + infoCard('Tipping', m.tipping) + infoCard('Tax-free shopping', m.taxFree));
  },

  packing(p) {
    return section(ICONS.thermometer, 'Weather', p.weather && `<div class="info-card"><p>${p.weather}</p></div>`) +
      section(ICONS.bag, 'Packing checklist', p.packingList && `<div class="info-card is-list">${Object.entries(p.packingList).map(([cat, items]) =>
        `<div class="pack-category">${cat}</div>${items.map(i => `<div class="pack-item">${i}</div>`).join('')}`).join('')}</div>`) +
      section(ICONS.rain, 'Rainy day plan', p.rainyDay && `<div class="info-card is-list">${p.rainyDay.map(r =>
        `<div class="list-row"><div class="list-row-title">${r.activity}</div><div>${r.why}</div></div>`).join('')}</div>`);
  },

  phrases(p) {
    return section(ICONS.language, 'Key phrases', p.language && `<div class="info-card is-list">${p.language.map(l => `
        <div class="phrase-row"><span class="phrase-en">${l.phrase}</span><span class="phrase-ja" lang="ja">${l.japanese}</span><span class="phrase-pr">${l.pronunciation}</span></div>`).join('')}</div>`) +
      section(ICONS.flag, 'Etiquette', p.etiquette && `<div class="info-card is-list"><ul class="dot-list">${p.etiquette.map(e => `<li>${e}</li>`).join('')}</ul></div>`);
  },

  essentials(p) {
    const c = p.connectivity || {};
    const e = p.emergencyNumbers;
    const emergency = e && `<div class="info-card"><h4>Emergency</h4><p>Police: ${e.police}<br>Ambulance and fire: ${e.ambulance}<br>${e.embassy}<br>Tourist hotline: ${e.tourist_helpline}</p></div>`;
    return section(ICONS.wifi, 'Connectivity', infoCard('Wi-Fi', c.wifi) + infoCard('eSIM and pocket Wi-Fi', c.esim)) +
      section(ICONS.bag, 'Other essentials', infoCard('Luggage storage', p.luggage) + infoCard('Electrical', p.electrical) + (emergency || '')) +
      section(ICONS.phone, 'Useful apps', p.apps && p.apps.map(a => infoCard(a.name, a.description)).join('')) +
      section(ICONS.link, 'Useful links', p.usefulLinks && p.usefulLinks.length && `<div class="info-card is-list">${p.usefulLinks.map(l =>
        `<div class="list-row"><a href="${l.url}" target="_blank" rel="noopener">${l.name}</a></div>`).join('')}</div>`);
  }
};

function renderInfo() {
  const p = state.data.practical;
  if (!p) return;
  const page = infoPages.find(x => x.id === state.infoPage) || infoPages[0];
  document.getElementById('infoContent').innerHTML =
    `<div class="page-header"><h1>${page.title}</h1><p>${page.subtitle}</p></div>` + INFO_RENDERERS[page.id](p);
}

// ---------- Plan ----------

function renderPlan() {
  if (!state.itinerary) initItinerary();
  const el = document.getElementById('planContent');
  const subtitle = state.planView === 'map' ? 'See each day’s route on the map.' : 'Hold and drag places between days to build your plan.';
  let html = `<div class="page-header"><h1>Plan</h1><p>${subtitle}</p></div>` +
    '<div class="plan-view-toggle" role="tablist">' +
    `<button class="plan-view-btn ${state.planView === 'list' ? 'active' : ''}" role="tab" aria-selected="${state.planView === 'list'}" onclick="setPlanView('list')">${ICONS.list}List</button>` +
    `<button class="plan-view-btn ${state.planView === 'map' ? 'active' : ''}" role="tab" aria-selected="${state.planView === 'map'}" onclick="setPlanView('map')">${ICONS.map}Map</button></div>`;

  if (state.planView === 'map') {
    html += '<div class="map-day-selector">' + TRIP.days.map(d =>
      `<button class="filter-chip map-day-chip ${state.mapDay === d.date ? 'active' : ''}" onclick="setMapDay('${d.date}')">${d.short || d.label}<span class="chip-count">${(state.itinerary[d.date] || []).length}</span></button>`
    ).join('') + '</div>' +
      `<div class="map-container" id="mapContainer"><div class="map-message"><div class="map-loading-spinner"></div>Loading map…</div></div>` +
      '<div id="mapRouteInfo"></div><div class="map-item-list" id="mapItemList"></div><div id="mapNearbySection"></div>';
    el.innerHTML = html;
    initMapView();
  } else {
    el.innerHTML = html + renderPlanListHtml();
    requestAnimationFrame(initDragAndDrop);
  }
}

function renderPlanListHtml() {
  let html = '<div class="itin-board">';
  ITIN_DAYS.forEach(day => {
    const [label, sublabel] = ITIN_DAY_LABELS[day];
    const ids = state.itinerary[day] || [];
    const isUnsorted = day === 'unsorted';
    html += `<div class="itin-day-section ${isUnsorted ? 'itin-section-unsorted' : ''} ${state.collapsedDays[day] ? 'collapsed' : ''}" data-day="${day}">` +
      `<div class="itin-day-header" onclick="toggleDayCollapse('${day}')">` +
      `<span><span class="itin-day-label">${label}</span>${sublabel ? `<span class="itin-day-sublabel">${sublabel}</span>` : ''}</span>` +
      `<span class="itin-day-meta"><span class="itin-day-count">${ids.length} ${ids.length === 1 ? 'place' : 'places'}</span>` +
      `<span class="itin-day-chevron">${ICONS.chevronDown}</span></span></div>` +
      `<div class="itin-drop-zone" data-day="${day}">`;
    if (ids.length === 0) {
      html += `<div class="itin-drop-zone-empty">${isUnsorted ? 'Places you add from Food, See, Do and Shop land here' : 'Drag places here'}</div>`;
    } else {
      const displayIds = isUnsorted ? [...ids].sort((a, b) => getItemArea(a).localeCompare(getItemArea(b))) : ids;
      let lastArea = '';
      displayIds.forEach(id => {
        const item = getItineraryItem(id);
        if (!item) return;
        if (isUnsorted) {
          const area = getItemArea(id);
          if (area !== lastArea) { html += `<div class="itin-neighborhood-label">${area}</div>`; lastArea = area; }
        }
        html += `<div class="itin-item" data-id="${id}" data-day="${day}">` +
          `<span class="itin-item-grip">${ICONS.grip}</span>` +
          `<span class="itin-item-name">${item.name}</span>${catBadge(item.category)}` +
          `<button class="itin-item-remove" aria-label="Remove ${item.name}" onclick="event.stopPropagation();removeFromItineraryAndRender('${id}')">${ICONS.close}</button></div>`;
      });
    }
    html += '</div></div>';
  });
  return html + '</div>';
}

// ---------- Undo ----------

let _undoTimer = null;
let _undoData = null;

function removeFromItineraryAndRender(id) {
  let fromDay = null, fromIdx = -1;
  for (const day of ITIN_DAYS) {
    const idx = (state.itinerary[day] || []).indexOf(id);
    if (idx !== -1) { fromDay = day; fromIdx = idx; break; }
  }
  const item = getItineraryItem(id);
  removeFromItinerary(id);
  render();

  _undoData = { id, fromDay, fromIdx };
  const toast = document.getElementById('undoToast');
  document.getElementById('undoToastText').innerHTML = `<strong>${item ? item.name : 'Place'}</strong> removed`;
  toast.classList.add('visible');
  clearTimeout(_undoTimer);
  _undoTimer = setTimeout(() => { toast.classList.remove('visible'); _undoData = null; }, 4000);
}

function undoRemove() {
  if (!_undoData) return;
  const { id, fromDay, fromIdx } = _undoData;
  if (fromDay && state.itinerary[fromDay]) {
    state.itinerary[fromDay].splice(fromIdx, 0, id);
    saveItinerary();
  }
  _undoData = null;
  clearTimeout(_undoTimer);
  document.getElementById('undoToast').classList.remove('visible');
  render();
}

// ---------- Drag and drop ----------

function initDragAndDrop() {
  const items = document.querySelectorAll('.itin-item');
  if (!items.length) return;

  let dragState = null;
  let longPressTimer = null;

  const getDropZones = () => Array.from(document.querySelectorAll('.itin-drop-zone'));
  const sortableChildren = zone => Array.from(zone.children).filter(c =>
    !c.classList.contains('itin-insert-line') && !c.classList.contains('itin-drop-zone-empty') &&
    !c.classList.contains('dragging') && !c.classList.contains('itin-neighborhood-label'));
  const hit = (el, x, y) => { const r = el.getBoundingClientRect(); return y >= r.top && y <= r.bottom && x >= r.left && x <= r.right; };

  function getInsertIndex(zone, clientY) {
    const children = sortableChildren(zone);
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) return i;
    }
    return children.length;
  }

  function removeInsertLines() {
    document.querySelectorAll('.itin-insert-line').forEach(el => el.remove());
  }

  function showInsertLine(zone, index) {
    removeInsertLines();
    const line = document.createElement('div');
    line.className = 'itin-insert-line';
    const children = sortableChildren(zone);
    if (children.length === 0 || index === 0) zone.insertBefore(line, zone.firstChild);
    else if (index >= children.length) zone.appendChild(line);
    else zone.insertBefore(line, children[index]);
  }

  function createGhost(el, x, y) {
    const ghost = el.cloneNode(true);
    ghost.classList.add('itin-item-ghost');
    const rect = el.getBoundingClientRect();
    ghost.style.width = rect.width + 'px';
    ghost.style.left = (x - rect.width / 2) + 'px';
    ghost.style.top = (y - rect.height / 2) + 'px';
    document.body.appendChild(ghost);
    return ghost;
  }

  function moveGhost(ghost, x, y) {
    ghost.style.left = (x - ghost.offsetWidth / 2) + 'px';
    ghost.style.top = (y - ghost.offsetHeight / 2) + 'px';
  }

  function autoScroll(y) {
    const margin = 200, maxSpeed = 60, vh = window.innerHeight;
    if (y < margin) window.scrollBy(0, -Math.ceil(maxSpeed * (1 - y / margin)));
    else if (y > vh - margin - 72) window.scrollBy(0, Math.ceil(maxSpeed * Math.min((y - (vh - margin - 72)) / margin, 1)));
  }

  function clearDragUi() {
    clearInterval(dragState.scrollInterval);
    dragState.el.classList.remove('dragging');
    dragState.ghost.remove();
    removeInsertLines();
    document.querySelectorAll('.itin-day-header.drag-target').forEach(h => h.classList.remove('drag-target'));
    getDropZones().forEach(z => z.classList.remove('drag-over'));
  }

  function startDrag(el, clientX, clientY) {
    el.classList.add('dragging');
    dragState = { id: el.dataset.id, fromDay: el.dataset.day, el, ghost: createGhost(el, clientX, clientY) };
    dragState.scrollInterval = setInterval(() => { if (dragState && dragState._lastY != null) autoScroll(dragState._lastY); }, 16);
    if (navigator.vibrate) navigator.vibrate(30);
    getDropZones().forEach(z => z.classList.add('drag-over'));
  }

  function onMove(clientX, clientY) {
    if (!dragState) return;
    dragState._lastY = clientY;
    moveGhost(dragState.ghost, clientX, clientY);
    document.querySelectorAll('.itin-day-header.drag-target').forEach(h => h.classList.remove('drag-target'));
    const overZone = getDropZones().find(z => hit(z, clientX, clientY));
    if (overZone) {
      showInsertLine(overZone, getInsertIndex(overZone, clientY));
    } else {
      removeInsertLines();
      const header = Array.from(document.querySelectorAll('.itin-day-section.collapsed .itin-day-header')).find(h => hit(h, clientX, clientY));
      if (header) header.classList.add('drag-target');
    }
  }

  function endDrag(clientX, clientY) {
    if (!dragState) return;
    const fromArr = state.itinerary[dragState.fromDay];
    const targetZone = getDropZones().find(z => hit(z, clientX, clientY));
    if (targetZone) {
      const toDay = targetZone.dataset.day;
      const insertIdx = getInsertIndex(targetZone, clientY);
      const oldIdx = fromArr.indexOf(dragState.id);
      if (oldIdx !== -1) fromArr.splice(oldIdx, 1);
      const adjustedIdx = dragState.fromDay === toDay && oldIdx < insertIdx ? Math.max(0, insertIdx - 1) : insertIdx;
      state.itinerary[toDay].splice(adjustedIdx, 0, dragState.id);
      saveItinerary();
    } else {
      const header = Array.from(document.querySelectorAll('.itin-day-section.collapsed .itin-day-header')).find(h => hit(h, clientX, clientY));
      if (header) {
        const oldIdx = fromArr.indexOf(dragState.id);
        if (oldIdx !== -1) fromArr.splice(oldIdx, 1);
        state.itinerary[header.closest('.itin-day-section').dataset.day].push(dragState.id);
        saveItinerary();
      }
    }
    clearDragUi();
    dragState = null;
    render();
  }

  function cancelDrag() {
    if (!dragState) return;
    clearDragUi();
    dragState = null;
  }

  items.forEach(el => {
    el.addEventListener('touchstart', function (e) {
      if (dragState) return;
      const { clientX: startX, clientY: startY } = e.touches[0];
      longPressTimer = setTimeout(() => startDrag(el, startX, startY), 300);

      const onTouchMove = ev => {
        const t = ev.touches[0];
        if (longPressTimer && (Math.abs(t.clientX - startX) > 10 || Math.abs(t.clientY - startY) > 10)) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
        if (dragState) { ev.preventDefault(); onMove(t.clientX, t.clientY); }
      };
      const cleanup = () => {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('touchcancel', onTouchCancel);
      };
      const onTouchEnd = ev => {
        cleanup();
        if (dragState) { const t = ev.changedTouches[0]; endDrag(t.clientX, t.clientY); }
      };
      const onTouchCancel = () => { cleanup(); cancelDrag(); };

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
      document.addEventListener('touchcancel', onTouchCancel);
    }, { passive: false });

    el.addEventListener('mousedown', function (e) {
      if (dragState || e.button !== 0 || e.target.closest('.itin-item-remove')) return;
      e.preventDefault();
      const startX = e.clientX, startY = e.clientY;
      longPressTimer = setTimeout(() => startDrag(el, startX, startY), 300);

      const onMouseMove = ev => {
        if (longPressTimer && (Math.abs(ev.clientX - startX) > 10 || Math.abs(ev.clientY - startY) > 10)) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
        if (dragState) { ev.preventDefault(); onMove(ev.clientX, ev.clientY); }
      };
      const onMouseUp = ev => {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (dragState) endDrag(ev.clientX, ev.clientY);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
}

// ---------- Init ----------

function renderHeader() {
  document.title = TRIP.trip.pageTitle;
  document.getElementById('wordmark').innerHTML =
    TRIP.city.name + (TRIP.city.localName ? `<span class="wordmark-local" lang="ja">${TRIP.city.localName}</span>` : '');
  document.getElementById('headerDates').textContent = TRIP.trip.dateRange;
  document.getElementById('scheduleContent').innerHTML = TRIP.days.map(d =>
    `<div class="schedule-day"><span class="day">${d.short || d.label}</span><span class="plan">${d.plan || d.theme || ''}</span></div>`
  ).join('');
}

async function loadData() {
  const load = (name, fallback) => fetch(`data/${name}.json`).then(r => r.json()).catch(() => fallback);
  const [practical, ...lists] = await Promise.all([load('practical', null), ...DATA_SOURCES.map(s => load(s, []))]);
  state.data = { practical };
  DATA_SOURCES.forEach((s, i) => { state.data[s] = lists[i]; });
  initItinerary();
  render();
}

renderHeader();
buildNav();
setTab('Plan');

document.getElementById('navMore').addEventListener('click', toggleInfoPanel);
document.getElementById('undoToastBtn').addEventListener('click', undoRemove);

document.getElementById('scheduleToggle').addEventListener('click', function () {
  const open = this.classList.toggle('open');
  document.getElementById('scheduleDrawer').classList.toggle('open', open);
  this.setAttribute('aria-expanded', open);
});

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
searchInput.addEventListener('input', function () {
  state.search = this.value;
  searchClear.classList.toggle('visible', this.value.length > 0);
  render();
});
searchClear.addEventListener('click', function () {
  searchInput.value = '';
  state.search = '';
  this.classList.remove('visible');
  render();
});

loadData();
