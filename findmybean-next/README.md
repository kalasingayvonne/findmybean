# findmybean (Next.js)

Find cafés by Wi-Fi, outlets, noise level and seating. Real map, favourites, reviews and photos.

## Run it
1. Install **Node.js (LTS)** from https://nodejs.org if `node -v` shows nothing in your terminal.
2. Open this folder in VS Code, then open a terminal (Terminal > New Terminal).
3. Run:

       npm install
       npm run dev

4. Open http://localhost:3000 in your browser.

Stop it with Ctrl + C. You need internet for the map, the café data and the fonts.

## Where things are
- `app/page.js` cover, `app/explore`, `app/map`, `app/saved`, `app/reviews`, `app/cafe/[id]`: the screens (each folder is a URL)
- `app/layout.js` the phone frame, bottom nav and filter sheet shared by every screen
- `app/providers.js` the shared state: favourites, reviews, photos, filters, search
- `app/globals.css` all styling (colours are CSS variables at the top)
- `components/` reusable pieces (café card, café page, reviews, icons)
- `lib/places.js` café search (OpenStreetMap, or Google if a key is set)
- `public/cover.jpg` the cover photo

## Optional: Google photos and search
Copy `.env.local.example` to `.env.local` and paste a Google Places API key after `NEXT_PUBLIC_GOOGLE_API_KEY=`, then restart `npm run dev`.
Leave it empty to use free OpenStreetMap data.

## Next step
Favourites, reviews and photos are saved in the browser for now. The next step is to save them in PostgreSQL.
