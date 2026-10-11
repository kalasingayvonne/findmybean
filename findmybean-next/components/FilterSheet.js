'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/app/providers';
import { LABELS, OPTIONS } from '@/lib/data';

export default function FilterSheet() {
  const path = usePathname();
  const { sheetOpen, setSheetOpen, filters, setFilter, resetFilters, visible } = useApp();
  useEffect(() => { setSheetOpen(false); }, [path, setSheetOpen]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSheetOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSheetOpen]);
  if (!sheetOpen || path !== '/explore') return null;
  const n = visible.length;
  return (
    <>
      <div className="scrim" onClick={() => setSheetOpen(false)} />
      <section className="sheet" role="dialog" aria-modal="true" aria-label="Filters">
        <div className="grab" />
        <div className="head"><h2>Filters</h2><button className="link-btn" onClick={resetFilters}>Reset</button></div>
        {Object.keys(OPTIONS).map((k) => (
          <div className="group" key={k}>
            <h3>{LABELS[k]}</h3>
            <div className="chips">
              {OPTIONS[k].map((v) => (
                <button key={v} className="pill" aria-pressed={filters[k] === v} onClick={() => setFilter(k, v)}>{v}</button>
              ))}
            </div>
          </div>
        ))}
        <button className="btn btn-coral" onClick={() => setSheetOpen(false)}>Show {n} café{n === 1 ? '' : 's'}</button>
      </section>
    </>
  );
}
