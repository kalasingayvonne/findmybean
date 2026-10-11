'use client';
import Link from 'next/link';
import { useApp } from '@/app/providers';
import { Art, Heart, hideBroken } from './ui';

export function Tags({ c }) {
  const tags = [];
  if (c.wifi !== 'Unknown') tags.push(<span key="w" className="tag">Wi-Fi {c.wifi}</span>);
  if (c.noise !== 'Unknown') tags.push(<span key="n" className="tag p">{c.noise}</span>);
  return tags.length ? tags : <span className="tag p">Details not added yet</span>;
}

export default function CafeCard({ c }) {
  const { favs, toggleFav, photoFor } = useApp();
  const on = favs.includes(c.id), photo = photoFor(c);
  return (
    <article className="card">
      <Link href={`/cafe/${encodeURIComponent(c.id)}`} aria-label={`${c.name}, ${c.area}`}>
        <div className={`card-img tint-${c.tint}`}>
          <Art c={c} w={84} />
          {photo && <img className="card-photo over" src={photo} alt="" loading="lazy" onError={hideBroken} />}
        </div>
        <h3>{c.name}</h3><p>{c.area}</p>
        <div className="tags"><Tags c={c} /></div>
      </Link>
      <button className="fav" onClick={() => toggleFav(c.id)} aria-pressed={on} aria-label={`${on ? 'Remove' : 'Save'} ${c.name}`}>
        <span><Heart on={on} /></span>
      </button>
    </article>
  );
}
