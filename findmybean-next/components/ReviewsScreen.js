'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/app/providers';
import { CAFES } from '@/lib/data';
import { Stars, STAR_PATH } from './ui';

export default function ReviewsScreen({ cafeId, startOpen = false }) {
  const { loaded, getCafe, reviews, addReview } = useApp();
  const [open, setOpen] = useState(startOpen);
  const [rating, setRating] = useState(0);
  const [msg, setMsg] = useState('');
  if (!loaded) return null;

  const c = getCafe(cafeId) || CAFES[0];
  const list = reviews.filter((r) => r.cafe === c.id).sort((a, b) => b.id - a.id);
  const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  const pills = CAFES.some((x) => x.id === c.id) ? CAFES : [...CAFES, c];

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget), text = String(f.get('text') || '').trim();
    if (!rating) { setMsg('Choose a star rating first.'); return; }
    if (text.length < 5) { setMsg('Write at least a few words about the café.'); return; }
    addReview({ id: Date.now(), cafe: c.id, name: String(f.get('name') || '').trim() || 'Guest', rating, text });
    setRating(0); setMsg(''); setOpen(false);
  }

  return (
    <>
      <h1 className="title" style={{ marginTop: 16 }}>Reviews</h1>
      <div className="switch" role="group" aria-label="Choose a café">
        {pills.map((x) => (
          <Link key={x.id} className="pill" href={`/reviews/${encodeURIComponent(x.id)}`} style={{ display: 'flex', alignItems: 'center' }} aria-pressed={x.id === c.id}>{x.name}</Link>
        ))}
      </div>
      <div className="summary">
        <span className="num">{list.length ? avg.toFixed(1) : '–'}</span>
        <div><Stars n={avg} /><div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{list.length} review{list.length === 1 ? '' : 's'} for {c.name}</div></div>
      </div>
      {open ? (
        <form className="write" onSubmit={submit} noValidate>
          <label htmlFor="rn">Your name (optional)</label>
          <input id="rn" name="name" maxLength={40} autoComplete="name" />
          <label id="rl">Your rating</label>
          <div className="rate" role="group" aria-labelledby="rl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} className={n <= rating ? 'on' : ''} onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? 's' : ''}`}>
                <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: STAR_PATH }} />
              </button>
            ))}
          </div>
          <label htmlFor="rt">What was it like?</label>
          <textarea id="rt" name="text" maxLength={400} placeholder="Wi-Fi speed, plugs, noise, seats…" />
          <p className="msg" role="alert">{msg}</p>
          <button className="btn btn-forest" type="submit">Post review</button>
        </form>
      ) : (
        <button className="btn btn-forest" style={{ width: '100%', marginBottom: 14 }} onClick={() => setOpen(true)}>Write a review</button>
      )}
      <div className="rows">
        {list.length ? list.map((r) => (
          <div className="review" key={r.id}>
            <header><span className="avatar" /><b>{r.name}</b><Stars n={r.rating} /></header>
            <p>{r.text}</p>
          </div>
        )) : <div className="empty"><strong>No reviews yet</strong>Be the first to review {c.name}.</div>}
      </div>
    </>
  );
}
