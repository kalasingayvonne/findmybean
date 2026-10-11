'use client';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/providers';
import { searchPlaces } from '@/lib/places';
import { Art, HEART_PATH, Heart, Icon, hideBroken } from '@/components/ui';

const PIN_HTML = `<span><svg class="heart on" viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART_PATH}"/></svg></span>`;

export default function MapPage() {
  const { visible, addPlaces, getCafe, favs, toggleFav, photoFor } = useApp();
  const el = useRef(null), mapRef = useRef(null), LRef = useRef(null), markers = useRef(new Map());
  const addRef = useRef(addPlaces); addRef.current = addPlaces;
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('Loading map…');
  const [selected, setSelected] = useState(null);

  // create the map once, load the cafés in view whenever it moves
  useEffect(() => {
    let cancelled = false, timer, map;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !el.current) return;
      LRef.current = L;
      map = L.map(el.current).setView([-1.2864, 36.8172], 12);
      mapRef.current = map;
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(map);
      const loadView = async () => {
        if (map.getZoom() < 12) { setStatus('Zoom in to see cafés.'); return; }
        const b = map.getBounds();
        setStatus('Finding cafés…');
        try {
          const found = await searchPlaces('', [b.getSouth(), b.getWest(), b.getNorth(), b.getEast()]);
          addRef.current(found);
          setStatus(found.length ? `${found.length} café${found.length === 1 ? '' : 's'} in view` : 'No cafés in view. Move or zoom out.');
        } catch { setStatus('Could not load cafés. Move the map to try again.'); }
      };
      map.on('moveend', () => { clearTimeout(timer); timer = setTimeout(loadView, 600); });
      loadView();
      setReady(true);
    })();
    return () => { cancelled = true; clearTimeout(timer); if (map) map.remove(); mapRef.current = null; markers.current.clear(); };
  }, []);

  // keep the pins in step with the cafés and the selected pin
  useEffect(() => {
    const L = LRef.current, map = mapRef.current;
    if (!ready || !L || !map) return;
    const want = new Map(visible.filter((c) => c.lat != null).map((c) => [c.id, c]));
    markers.current.forEach((m, id) => { if (!want.has(id)) { m.remove(); markers.current.delete(id); } });
    want.forEach((c, id) => {
      const sel = id === selected;
      let m = markers.current.get(id);
      if (m && m._sel === sel) return;
      const icon = L.divIcon({ className: 'fmb-pin' + (sel ? ' sel' : ''), html: PIN_HTML, iconSize: [34, 34], iconAnchor: [17, 34] });
      if (!m) { m = L.marker([c.lat, c.lon], { icon, title: c.name }).addTo(map); m.on('click', () => setSelected(id)); markers.current.set(id, m); }
      else m.setIcon(icon);
      m._sel = sel;
    });
  }, [visible, selected, ready]);

  function locateMe() {
    if (!navigator.geolocation) { setStatus('Your browser cannot share your location.'); return; }
    setStatus('Finding you…');
    navigator.geolocation.getCurrentPosition(
      (p) => mapRef.current && mapRef.current.setView([p.coords.latitude, p.coords.longitude], 15),
      () => setStatus('Location is blocked. Allow it in your browser, or move the map yourself.'));
  }

  const sel = selected && getCafe(selected), photo = sel && photoFor(sel);
  return (
    <>
      <div ref={el} className="leaflet-host" />
      <div className="map-top">
        <p className="map-status" role="status">{status}</p>
        <button className="round" onClick={locateMe} aria-label="Show my location"><Icon name="locate" /></button>
      </div>
      <div className="map-sheet">
        <div className="grab" />
        {sel ? (
          <div className="row">
            <Link className={`thumb tint-${sel.tint}`} href={`/cafe/${encodeURIComponent(sel.id)}`} aria-label={`Open ${sel.name}`}>
              <Art c={sel} w={52} />
              {photo && <img className="card-photo over" src={photo} alt="" onError={hideBroken} />}
            </Link>
            <Link className="grow" href={`/cafe/${encodeURIComponent(sel.id)}`}><b>{sel.name}</b><small>{sel.area}</small></Link>
            <button className="round" onClick={() => toggleFav(sel.id)} aria-pressed={favs.includes(sel.id)} aria-label={`Save ${sel.name}`}><Heart on={favs.includes(sel.id)} /></button>
          </div>
        ) : <div className="empty"><strong>Tap a heart pin</strong>Every pin is a coffee café. Pan and zoom to find more.</div>}
      </div>
    </>
  );
}
