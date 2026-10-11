// Shrinks a chosen photo so it fits in browser storage.
export async function resizePhoto(file) {
  const url = URL.createObjectURL(file), img = new Image();
  await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = url; });
  const s = Math.min(1, 640 / Math.max(img.width, img.height)), cv = document.createElement('canvas');
  cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
  cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
  URL.revokeObjectURL(url);
  return cv.toDataURL('image/jpeg', 0.72);
}
