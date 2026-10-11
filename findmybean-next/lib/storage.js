export function load(key, fallback) {
  try { const v = window.localStorage.getItem('fmb:' + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
export function save(key, value) {
  try { window.localStorage.setItem('fmb:' + key, JSON.stringify(value)); } catch { /* storage full or blocked */ }
}
