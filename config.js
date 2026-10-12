// Trip configuration — everything specific to this trip lives here.
// To make this guide yours, edit this file and the JSON files in data/.
// Look and feel lives in styles/tokens.css. See REMIX.md for the full guide.

window.TRIP = {
  // The city this guide covers.
  city: {
    name: 'Tokyo',
    localName: '東京',            // Shown beside the wordmark. Set to '' to hide.
    geocodeSuffix: 'Tokyo',       // Appended to place names when a place has no mapsQuery.
    // Map search is biased to this box (south-west and north-east corners).
    bounds: { south: 35.55, west: 139.55, north: 35.82, east: 139.92 }
  },

  // Your trip, one entry per day, in order. Empty by default: the header date
  // line, the schedule and the planner's day columns all come from this list.
  //   date   YYYY-MM-DD (required, unique). Labels like "Sun, Feb 15" are made from it.
  //   theme  Short label for the day in the planner, e.g. 'Arrival' or 'Free day'.
  //   plan   One line for the header schedule. May include <strong> for emphasis.
  // Example:
  //   { date: '2026-05-03', theme: 'Arrival', plan: '<strong>Land 3pm</strong> — check in, walk the neighborhood' },
  days: [],

  // Where you're staying and any fixed venues, shown on the Stay page. Empty by default.
  // Example:
  //   { kind: 'Hotel', name: 'Hotel name', details: 'Address or notes', mapsQuery: 'Hotel name Tokyo' },
  stays: [],

  // The neighborhood you're based in. Used in headings like "Key lines from Akasaka".
  baseArea: 'Akasaka',

  // Google Maps JavaScript API key for the Plan > Map view. Leave '' to hide maps.
  // Create one at https://console.cloud.google.com/ with the Maps JavaScript,
  // Geocoding and Directions APIs enabled, and restrict it to your domain.
  mapsApiKey: '',

  // 'auto' follows the device setting. Or force 'light' / 'dark'.
  theme: 'auto',

  // Prefix for saved favorites and itinerary in the browser. Change it for a new
  // trip so old saved data doesn't carry over.
  storagePrefix: 'tokyo',

  // The page the app opens on: 'Plan' or the id of one of the tabs below.
  defaultTab: 'Food',

  // Bottom-nav tabs that list places. `sources` are file names in data/ (no .json).
  // `icon` is one of: food, see, do, shop, star, map.
  tabs: [
    { id: 'Food', label: 'Food', sources: ['food'],                icon: 'food' },
    { id: 'See',  label: 'See',  sources: ['sights'],              icon: 'see'  },
    { id: 'Do',   label: 'Do',   sources: ['nightlife', 'hidden'], icon: 'do'   },
    { id: 'Shop', label: 'Shop', sources: ['shopping'],            icon: 'shop' }
  ],

  // Each category gets a colored marker. Values are tone names from
  // styles/tokens.css (--tone-*). Categories not listed get a tone automatically.
  categoryTones: {
    // Food
    'Ramen': 'ginza', 'Udon/Soba': 'ginza', 'Curry': 'ginza', 'Gyoza': 'ginza', 'Tonkatsu': 'ginza', 'Tempura': 'ginza',
    'Sushi': 'tozai', 'Kaiseki/Fine Dining': 'hanzomon',
    'Izakaya': 'marunouchi', 'Yakitori': 'marunouchi', 'Yakiniku': 'marunouchi', 'Late Night': 'marunouchi', 'Street Food': 'marunouchi', 'Okonomiyaki/Takoyaki': 'marunouchi',
    'Breakfast/Coffee': 'fukutoshin', 'Desserts/Sweets': 'fukutoshin',
    'Convenience Store': 'chiyoda', 'Chain Restaurant': 'chiyoda', 'Unique Experience': 'namboku',
    // See
    'Temple/Shrine': 'marunouchi', 'Cultural Experience': 'marunouchi', 'Museum': 'hanzomon',
    'Park/Garden': 'chiyoda', 'Neighborhood': 'tozai', 'Viewpoint': 'ginza', 'Photo Spot': 'ginza',
    'Day Trip': 'namboku', 'Architecture': 'hibiya',
    // Do
    'Bar': 'hanzomon', 'Club': 'hanzomon', 'Nightlife District': 'hanzomon', 'Karaoke': 'tozai', 'Arcade/Gaming': 'tozai',
    'Live Music': 'ginza', 'Themed Experience': 'marunouchi', 'Unique Activity': 'namboku', 'Adult/Edgy': 'marunouchi',
    'Animal Cafe': 'fukutoshin', 'Onsen/Sento': 'chiyoda',
    'Secret Bar': 'hanzomon', 'Hidden Restaurant': 'marunouchi', 'Hidden Garden': 'chiyoda', 'Hidden Shrine': 'chiyoda',
    'Secret Viewpoint': 'ginza', 'Unusual Museum': 'yurakucho', 'Record Shop': 'tozai', 'Bookstore': 'tozai',
    'Artisan Workshop': 'yurakucho', 'Local Market': 'ginza', 'Underground Venue': 'hibiya',
    // Shop
    'Fashion': 'hanzomon', 'Vintage/Thrift': 'hanzomon', 'Electronics': 'tozai', 'Records/Music': 'tozai',
    'Kitchen/Cookware': 'yurakucho', 'Stationery/Art': 'yurakucho', 'Anime/Manga': 'marunouchi',
    'Food Souvenirs': 'chiyoda', 'Traditional': 'chiyoda', 'Whisky/Sake': 'fukutoshin',
    'Discount/100 Yen': 'ginza', 'Beauty/Skincare': 'fukutoshin', 'Department Store': 'hibiya', 'Market/Flea Market': 'ginza',
    'Don Quijote': 'ginza', 'Character Goods': 'marunouchi', 'Jewelry': 'hanzomon', 'Lifestyle': 'yurakucho', 'Books & Lifestyle': 'tozai'
  },

  // Colors for transit lines named in data/practical.json → keyStations[].line.
  transitLines: {
    'Ginza Line (orange)': '#F39700',
    'Marunouchi Line (red)': '#E60012',
    'Chiyoda Line (green)': '#00A040',
    'Namboku Line (teal)': '#00ADA9',
    'Hanzomon Line (purple)': '#8F76D6',
    'JR Yamanote Loop (green loop)': '#80C241'
  }
};
