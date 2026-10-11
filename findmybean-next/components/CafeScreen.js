'use client';
import Link from 'next/link';
import { useApp } from '@/app/providers';
import { resizePhoto } from '@/lib/image';
import { Art, Heart, Icon, hideBroken } from './ui';

export default function CafeScreen({ id }) {
  const { loaded, getCafe, favs, toggleFav, photoFor, setPhoto, reviews } = useApp();
  if (!loaded) return null;
  const c = getCafe(id);
  if (!c) {
    return <div className="detail"><div className="empty"><strong>Café not found</strong><Link className="link-btn" href="/explore">Back to Explore</Link></div></div>;
  }
  const on = favs.includes(c.id), photo = photoFor(c);
  const last = reviews.filter((r) => r.cafe === c.id).sort((a, b) => b.id - a.id)[0];
  const tiles = [['Wi-Fi', c.wifi, 'wifi', 'mint'], ['Outlets', c.outlets, 'plug', 'blush'], ['Noise', c.noise, 'moon', 'mint'], ['Seating', c.seating, 'seat', 'blush']];
  async function onPhoto(e) {
    const file = e.target.files[0]; if (!file) return;
    try { setPhoto(c.id, await resizePhoto(file)); } catch { /* not an image */ }
  }
  return (
    <>
      <div className="hero">
        <div className="b1" /><div className="b2" />
        <Link className="round back" href="/explore" aria-label="Back to Explore"><Icon name="back" /></Link>
        <button className="round favbtn" onClick={() => toggleFav(c.id)} aria-pressed={on} aria-label={on ? 'Remove from saved' : 'Add to saved'}><Heart on={on} /></button>
        <div className="cup">
          <Art c={c} w={110} />
          {photo && <img src={photo} alt={`Photo of ${c.name}`} onError={hideBroken} />}
        </div>
      </div>
      <div className="detail">
        <div className="detail-head"><h1>{c.name}</h1><span className="chip">{c.area.split(',').pop().trim()}</span></div>
        <div className="amen">
          {tiles.map(([label, value, icon, tone]) => (
            <div className={`tile ${tone}`} key={label}>
              <span className="ic"><Icon name={icon} /></span>
              <span><small>{label}</small><b>{value}</b></span>
            </div>
          ))}
        </div>
        <div className="extras">
          {c.hours && <p className="meta"><b>Hours:</b> {c.hours}</p>}
          <div className="links">
            {c.lat != null && <a className="link-btn" href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lon}`} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>}
            {c.website && <a className="link-btn" href={c.website} target="_blank" rel="noopener noreferrer">Website</a>}
          </div>
          <label className="btn btn-line photo-add">
            {photo ? 'Change photo' : 'Add a photo'}
            <input className="sr" type="file" accept="image/*" onChange={onPhoto} />
          </label>
        </div>
        <div className="mini-review">
          <span className="avatar" />
          <div><b>{last ? last.name : 'No reviews yet'}</b><p>{last ? last.text : 'Be the first to tell people what it is like here.'}</p></div>
        </div>
      </div>
      <div className="actions">
        <button className="btn btn-line" onClick={() => toggleFav(c.id)}>{on ? 'Saved' : 'Save'}</button>
        <Link className="btn btn-forest" href={`/reviews/${encodeURIComponent(c.id)}/write`}>Write review</Link>
      </div>
    </>
  );
}
