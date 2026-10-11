import { CONFIG } from './data';

export function fromOSM(el) {
  const t = el.tags || {}, lat = el.lat ?? el.center?.lat, lon = el.lon ?? el.center?.lon;
  const wifi = t.internet_access ? (t.internet_access === 'no' ? 'None' : 'Works') : 'Unknown';
  return {
    id: 'osm-' + el.type[0] + el.id, name: t.name, lat, lon, wifi, outlets: 'Unknown', noise: 'Unknown',
    seating: t.outdoor_seating === 'yes' ? 'Outdoor' : 'Unknown', tint: (t.name || '').length % 2 ? 'blush' : 'mint',
    area: [t['addr:street'], t['addr:suburb'] || t['addr:city']].filter(Boolean).join(', ') || CONFIG.CITY,
    hours: t.opening_hours || '', photo: /^https?:\/\//.test(t.image || '') ? t.image : '',
    website: /^https?:\/\//.test(t.website || '') ? t.website : '',
  };
}

export function fromGoogle(p) {
  const ph = p.photos && p.photos[0], name = p.displayName?.text || '';
  return {
    id: 'g-' + p.id, name, area: p.formattedAddress || CONFIG.CITY, lat: p.location?.latitude, lon: p.location?.longitude,
    wifi: 'Unknown', outlets: 'Unknown', noise: 'Unknown', seating: 'Unknown', tint: name.length % 2 ? 'blush' : 'mint',
    rating: '', hours: '', website: '',
    photo: ph ? `https://places.googleapis.com/v1/${ph.name}/media?maxHeightPx=400&maxWidthPx=600&key=${CONFIG.GOOGLE_API_KEY}` : '',
  };
}

// q = text to look for ('' = every café), bounds = [south, west, north, east] (default: the whole city box)
export async function searchPlaces(q, bounds) {
  if (CONFIG.GOOGLE_API_KEY) {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'X-Goog-Api-Key': CONFIG.GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.photos',
      },
      body: JSON.stringify({
        textQuery: (q || 'coffee shops') + ' cafe in ' + CONFIG.CITY, maxResultCount: 20,
        ...(bounds ? { locationRestriction: { rectangle: { low: { latitude: bounds[0], longitude: bounds[1] }, high: { latitude: bounds[2], longitude: bounds[3] } } } } : {}),
      }),
    });
    if (!r.ok) throw new Error('Google ' + r.status);
    return ((await r.json()).places || []).map(fromGoogle);
  }
  const box = (bounds || CONFIG.BBOX).join(','), clean = q.replace(/[^\p{L}\p{N} ]/gu, '').trim();
  const f = clean ? `["name"~"${clean}",i]` : '["name"]';
  const ql = `[out:json][timeout:20];(nwr["amenity"="cafe"]${f}(${box});nwr["shop"="coffee"]${f}(${box}););out center tags 300;`;
  const r = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(ql),
  });
  if (!r.ok) throw new Error('Overpass ' + r.status);
  return (await r.json()).elements.map(fromOSM).filter((c) => c.name);
}

// A real café replaces the sample café with the same name.
export function dedupe(list) {
  const real = new Set(list.filter((c) => !c.sample).map((c) => c.name.toLowerCase()));
  return list.filter((c) => !c.sample || !real.has(c.name.toLowerCase()));
}

export function matches(c, filters, query) {
  const q = query.trim().toLowerCase();
  return (!q || (c.name + ' ' + c.area).toLowerCase().includes(q)) &&
    Object.entries(filters).every(([k, v]) => v === 'Any' || c[k] === v);
}
