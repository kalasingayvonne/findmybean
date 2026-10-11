'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CAFES, CONFIG } from '@/lib/data';
import { dedupe, matches, searchPlaces } from '@/lib/places';
import { load, save } from '@/lib/storage';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
const ANY = { wifi: 'Any', outlets: 'Any', noise: 'Any', seating: 'Any' };

export function AppProvider({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [favs, setFavs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState({});
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState(ANY);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  // read saved data once, in the browser
  useEffect(() => {
    setFavs(load('favs', [])); setReviews(load('reviews', []));
    setPhotos(load('photos', {})); setPlaces(load('places', []));
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) save('favs', favs); }, [loaded, favs]);
  useEffect(() => { if (loaded) save('reviews', reviews); }, [loaded, reviews]);
  useEffect(() => { if (loaded) save('photos', photos); }, [loaded, photos]);
  useEffect(() => { if (loaded) save('places', places.slice(-150)); }, [loaded, places]);

  const addPlaces = useCallback((found) => setPlaces((prev) => {
    const have = new Set(prev.map((p) => p.id));
    const add = found.filter((c) => c.name && !have.has(c.id));
    return add.length ? [...prev, ...add].slice(-500) : prev;
  }), []);

  const runSearch = useCallback(async (q, quiet) => {
    setLoading(true); setError('');
    try {
      const found = await searchPlaces((q || '').trim());
      addPlaces(found);
      if (!found.length && !quiet) setError('No cafés found for that search. Try a shorter name.');
    } catch {
      if (!quiet) setError('Could not reach the café search. Check your internet and try again.');
    }
    setLoading(false);
  }, [addPlaces]);

  // load real cafés across the city when the app opens
  useEffect(() => { if (loaded) runSearch('', true); }, [loaded, runSearch]);

  const allCafes = useMemo(() => [...CAFES, ...places], [places]);
  const visible = useMemo(() => dedupe(allCafes).filter((c) => matches(c, filters, query)), [allCafes, filters, query]);
  const getCafe = useCallback((id) => allCafes.find((c) => c.id === id), [allCafes]);

  const value = {
    CONFIG, loaded, favs, reviews, photos, places, allCafes, visible, filters, query, loading, error, sheetOpen,
    getCafe, addPlaces, runSearch, setQuery, setSheetOpen,
    photoFor: (c) => photos[c.id] || c.photo || '',
    setPhoto: (id, url) => setPhotos((p) => ({ ...p, [id]: url })),
    toggleFav: (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    addReview: (r) => setReviews((list) => [...list, r]),
    setFilter: (k, v) => setFilters((f) => ({ ...f, [k]: v })),
    resetFilters: () => { setFilters(ANY); setQuery(''); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
