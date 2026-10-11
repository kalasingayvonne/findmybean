export const CONFIG = {
  GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  CITY: 'Nairobi',
  BBOX: [-1.45, 36.65, -1.15, 37.1], // south, west, north, east
};

/* SAMPLE DATA — real cafés are loaded from the map/search and replace these when names match. */
export const CAFES = [
  { id: 'c1', name: 'Connect Coffee', area: 'Riverside Drive, Westlands', wifi: 'Fast', outlets: 'Plenty', noise: 'Quiet', seating: 'Cozy', tint: 'mint', sample: true },
  { id: 'c2', name: 'Java House', area: 'Nairobi CBD', wifi: 'Fast', outlets: 'Some', noise: 'Moderate', seating: 'Cozy', tint: 'blush', sample: true },
  { id: 'c3', name: 'Artcaffé', area: 'Several branches', wifi: 'Works', outlets: 'Some', noise: 'Lively', seating: 'Bar', tint: 'mint', sample: true },
];
export const OPTIONS = {
  wifi: ['Any', 'Fast', 'Works'],
  outlets: ['Any', 'Some', 'Plenty'],
  noise: ['Any', 'Quiet', 'Moderate', 'Lively'],
  seating: ['Any', 'Cozy', 'Bar', 'Outdoor'],
};
export const LABELS = { wifi: 'Wi-Fi', outlets: 'Outlets', noise: 'Noise level', seating: 'Seating' };
export const BUBBLES = [
  { key: 'wifi', value: 'Fast', label: 'Wi-Fi', icon: 'wifi', tone: 'mint' },
  { key: 'outlets', value: 'Plenty', label: 'Outlets', icon: 'plug', tone: 'blush' },
  { key: 'noise', value: 'Quiet', label: 'Quiet', icon: 'moon', tone: 'mint' },
  { key: 'seating', value: 'Cozy', label: 'Seats', icon: 'seat', tone: 'blush' },
];
