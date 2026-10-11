'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const seg = usePathname().split('/')[1] || '';
  if (seg === '' || seg === 'cafe') return null; // hidden on the cover and café pages
  const current = { explore: 'explore', map: 'explore', saved: 'saved', reviews: 'reviews' }[seg];
  return (
    <nav className="nav" aria-label="Main">
      {[['explore', 'Explore'], ['saved', 'Saved'], ['reviews', 'Reviews']].map(([href, label]) => (
        <Link key={href} href={'/' + href} aria-current={current === href ? 'page' : undefined}>{label}</Link>
      ))}
    </nav>
  );
}
