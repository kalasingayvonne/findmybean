// Small shared pieces: icons, heart, stars, illustrated café pictures, logo.
const P = {
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  seat: '<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M3 15a2 2 0 0 1 2-4 2 2 0 0 1 2 2v1h10v-1a2 2 0 0 1 2-2 2 2 0 0 1 2 4v3H3zM6 18v2M18 18v2"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  sliders: '<path d="M4 7h16M7 12h10M10 17h4"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
};
const STAR = '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>';
export const HEART_PATH = 'M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z';

export function Icon({ name }) {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: P[name] }} />;
}
export function Heart({ on }) {
  return <svg className={'heart' + (on ? ' on' : '')} viewBox="0 0 24 24" aria-hidden="true"><path d={HEART_PATH} /></svg>;
}
export function Stars({ n }) {
  return (
    <span className="stars" role="img" aria-label={`${n.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => <svg key={i} viewBox="0 0 24 24" className={i <= Math.round(n) ? '' : 'off'} dangerouslySetInnerHTML={{ __html: STAR }} />)}
    </span>
  );
}
export const STAR_PATH = STAR;
export const Wordmark = () => <span className="wordmark">find<span>my</span>bean</span>;
export const hideBroken = (e) => { e.currentTarget.style.display = 'none'; };

export function PinMascot() {
  const inner = '<path d="M50 4C25 4 8 22 8 46c0 30 42 68 42 68s42-38 42-68C92 22 75 4 50 4z" fill="#2F5D46"/><ellipse cx="50" cy="46" rx="22" ry="28" transform="rotate(-8 50 46)" fill="#FFF6EA"/><circle cx="42" cy="42" r="3.5" fill="#4A2C1A"/><circle cx="58" cy="42" r="3.5" fill="#4A2C1A"/><circle cx="36" cy="52" r="4.5" fill="#FFB8CC"/><circle cx="64" cy="52" r="4.5" fill="#FFB8CC"/><path d="M44 53q6 6 12 0" fill="none" stroke="#4A2C1A" stroke-width="2.5" stroke-linecap="round"/>';
  return <svg width="52" height="62" viewBox="0 0 100 120" aria-hidden="true" dangerouslySetInnerHTML={{ __html: inner }} />;
}

const ART = [
  '<ellipse cx="58" cy="80" rx="42" ry="7" fill="#FFF6EA" opacity=".8"/><path d="M28 38h54v16a27 24 0 0 1-54 0z" fill="#FFF6EA" stroke="#4A2C1A" stroke-width="3" stroke-linejoin="round"/><path d="M82 44h6a9 9 0 0 1 0 18h-9" fill="none" stroke="#4A2C1A" stroke-width="3" stroke-linecap="round"/><ellipse cx="55" cy="38" rx="27" ry="5" fill="#B5703F" stroke="#4A2C1A" stroke-width="3"/><path d="M55 40s-6-3-6-6a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 3-6 6-6 6z" fill="#FFF6EA"/><path d="M46 26c-4-5 4-8 0-14M64 26c-4-5 4-8 0-14" fill="none" stroke="#4A2C1A" stroke-width="3" stroke-linecap="round" opacity=".45"/>',
  '<path d="M34 32h52l-6 48H40z" fill="#C98B5B" stroke="#4A2C1A" stroke-width="3" stroke-linejoin="round"/><path d="M35.5 32h49l-1.5 12H37z" fill="#FFF6EA"/><rect x="30" y="24" width="60" height="9" rx="4.5" fill="#4A2C1A"/><path d="M68 24l10-20" stroke="#F28B7B" stroke-width="5" stroke-linecap="round"/><rect x="46" y="52" width="13" height="13" rx="3" fill="#FFF6EA" opacity=".75" transform="rotate(-12 52 58)"/><rect x="62" y="60" width="11" height="11" rx="3" fill="#FFF6EA" opacity=".75" transform="rotate(10 67 65)"/>',
  '<path d="M34 28h52l-6 52H40z" fill="#8DBE7A" stroke="#2F5D46" stroke-width="3" stroke-linejoin="round"/><path d="M35 28h50l-1.5 14H36.5z" fill="#BFE0B0"/><rect x="44" y="52" width="12" height="12" rx="3" fill="#FFF6EA" opacity=".6" transform="rotate(8 50 58)"/><rect x="62" y="48" width="12" height="12" rx="3" fill="#FFF6EA" opacity=".6" transform="rotate(-10 68 54)"/><path d="M62 28L74 4" stroke="#FFB8CC" stroke-width="5" stroke-linecap="round"/>',
  '<ellipse cx="46" cy="50" rx="20" ry="28" transform="rotate(-25 46 50)" fill="#4A2C1A"/><path d="M36 30c8 10-8 22 2 38" fill="none" stroke="#FFF6EA" stroke-width="3" stroke-linecap="round" opacity=".7"/><ellipse cx="78" cy="52" rx="17" ry="24" transform="rotate(20 78 52)" fill="#B5703F"/><path d="M82 32c-8 10 8 20-2 36" fill="none" stroke="#FFF6EA" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M60 22s-7-4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5-7 9-7 9z" fill="#F28B7B"/>',
];
// Illustrated picture, used until a café has a real photo. The same café always gets the same picture.
export function Art({ c, w = 72 }) {
  const i = [...String(c.id)].reduce((s, ch) => s + ch.charCodeAt(0), 0) % ART.length;
  return <svg width={w} height={Math.round(w * 0.75)} viewBox="0 0 120 90" role="img" aria-label="Illustration of coffee" dangerouslySetInnerHTML={{ __html: ART[i] }} />;
}
