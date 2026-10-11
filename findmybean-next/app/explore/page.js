'use client';
import Link from 'next/link';
import { useApp } from '@/app/providers';
import CafeCard from '@/components/CafeCard';
import { Icon, Wordmark } from '@/components/ui';
import { BUBBLES, CONFIG } from '@/lib/data';

export default function Explore() {
  const { visible, query, setQuery, filters, setFilter, runSearch, loading, error, setSheetOpen } = useApp();
  const active = Object.values(filters).filter((v) => v !== 'Any').length;
  const q = query.trim();
  const status = loading ? `Searching ${CONFIG.CITY}…`
    : error || (q ? `${visible.length} result${visible.length === 1 ? '' : 's'} for “${q}”. Press Enter to search all of ${CONFIG.CITY}.`
      : `Showing cafés across ${CONFIG.CITY}. Type to filter, or open the map.`);
  return (
    <>
      <div className="blob" />
      <div className="top"><Wordmark /><button className="round" aria-label="Notifications"><Icon name="bell" /></button></div>
      <h1 className="title">Find your <em>cozy</em> spot</h1>
      <div className="search-row">
        <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); runSearch(query); }}>
          <Icon name="search" />
          <input type="search" placeholder="Search any café in Nairobi" aria-label="Search any café in Nairobi" autoComplete="off" enterKeyHint="search"
            value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>
        <button className="filter-btn" onClick={() => setSheetOpen(true)} aria-label="Open filters">
          <Icon name="sliders" />{active > 0 && <span className="dot">{active}</span>}
        </button>
      </div>
      <p className="status" role="status">{status}</p>
      <div className="bubbles">
        {BUBBLES.map((b) => (
          <button key={b.key} className={`bubble ${b.tone}`} aria-pressed={filters[b.key] === b.value}
            onClick={() => setFilter(b.key, filters[b.key] === b.value ? 'Any' : b.value)}>
            <i><Icon name={b.icon} /></i>{b.label}
          </button>
        ))}
      </div>
      <div className="sec-head"><h2>Nearby cafés</h2><Link className="link-btn" href="/map">See on map</Link></div>
      <div className="grid">
        {visible.length ? visible.slice(0, 60).map((c) => <CafeCard key={c.id} c={c} />) : (
          <div className="empty"><strong>No cafés match yet</strong>
            Try removing a filter, or <button className="link-btn" onClick={() => runSearch(query)}>search all of {CONFIG.CITY} for “{query}”</button>.
          </div>
        )}
      </div>
      <div className="banner">
        <div className="date"><small>OCT</small><b>12</b></div>
        <div><p className="t">Latte art meetup</p><p className="s">Join other bean lovers</p></div>
      </div>
      <p className="credit">{CONFIG.GOOGLE_API_KEY ? '' : 'Café data © OpenStreetMap contributors'}</p>
    </>
  );
}
