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

  // Shown in the header and the browser tab.
  trip: {
    dateRange: 'Feb 15 – 23, 2026',
    pageTitle: 'Tokyo — Feb 2026'
  },

  // One entry per day. `date` is the itinerary key, so keep it unique (YYYY-MM-DD).
  // `plan` appears in the header schedule; `theme` labels the day in the planner.
  days: [
    { date: '2026-02-15', label: 'Sun, Feb 15', short: 'Sun 15', theme: 'Arrival',        plan: '<strong>Arrive 3pm</strong> — settle in Akasaka, explore the neighborhood' },
    { date: '2026-02-16', label: 'Mon, Feb 16', short: 'Mon 16', theme: 'Conference eve', plan: '<strong>Afternoon free</strong> — conference starts in the evening at Trunk Hotel' },
    { date: '2026-02-17', label: 'Tue, Feb 17', short: 'Tue 17', theme: 'Conference',     plan: '<strong>Conference</strong> — mornings might be free' },
    { date: '2026-02-18', label: 'Wed, Feb 18', short: 'Wed 18', theme: 'Conference',     plan: '<strong>Conference</strong> — last day, evening free' },
    { date: '2026-02-19', label: 'Thu, Feb 19', short: 'Thu 19', theme: 'Free day',       plan: '<strong>Free day</strong> — full day to explore' },
    { date: '2026-02-20', label: 'Fri, Feb 20', short: 'Fri 20', theme: 'Free day',       plan: '<strong>Free day</strong> — full day to explore' },
    { date: '2026-02-21', label: 'Sat, Feb 21', short: 'Sat 21', theme: 'Free day',       plan: '<strong>Free day</strong> — last full day' },
    { date: '2026-02-22', label: 'Sun, Feb 22', short: 'Sun 22', theme: 'Departure',      plan: '<strong>Depart</strong> — fly home to Portland' }
  ],

  // Where you're staying and any fixed venues. Shown on the Stay page.
  stays: [
    {
      kind: 'Hotel',
      name: 'Hotel Mystays Premier Akasaka',
      details: '2-17-54 Akasaka, Minato, Tokyo 107-0052',
      mapsQuery: 'Hotel Mystays Premier Akasaka Tokyo'
    },
    {
      kind: 'Conference venue',
      name: 'Trunk Hotel, Shibuya',
      details: 'Mon 16 (evening) through Wed 18. About 20 min by metro from Akasaka.',
      mapsQuery: 'Trunk Hotel Shibuya Tokyo'
    }
  ],

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
