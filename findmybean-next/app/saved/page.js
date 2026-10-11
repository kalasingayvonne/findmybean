'use client';
import Link from 'next/link';
import { useApp } from '@/app/providers';
import { Art, Heart, hideBroken } from '@/components/ui';

export default function Saved() {
  const { allCafes, favs, toggleFav, photoFor } = useApp();
  const list = allCafes.filter((c) => favs.includes(c.id));
  return (
    <>
      <div className="blob" />
      <h1 className="title" style={{ marginTop: 44 }}>Your <em>saved</em> spots</h1>
      <p className="sub">The cafés you hearted</p>
      <div className="rows">
        {list.length ? list.map((c) => {
          const href = `/cafe/${encodeURIComponent(c.id)}`, photo = photoFor(c);
          return (
            <div className="row" key={c.id}>
              <Link className={`thumb tint-${c.tint}`} href={href} aria-label={`Open ${c.name}`}>
                <Art c={c} w={52} />
                {photo && <img className="card-photo over" src={photo} alt="" onError={hideBroken} />}
              </Link>
              <Link className="grow" href={href}><b>{c.name}</b><small>{c.area}</small></Link>
              <button className="round" onClick={() => toggleFav(c.id)} aria-label={`Remove ${c.name} from saved`}><Heart on /></button>
            </div>
          );
        }) : <div className="empty"><strong>Nothing saved yet</strong>Tap the heart on a café to keep it here.</div>}
      </div>
    </>
  );
}
