# findmybean ☕

A coffee shop finder web app that helps people discover cafés based on what actually matters to them, wifi quality, available outlets, noise level, and seating, not just location. Built with Next.js.

> 🚧 **Status: In Progress** — The frontend (pages, components, UI) is built. Backend integration (database, live search, authentication) is the current focus.

## Features (Planned & In Progress)

- 🔍 **Explore** — browse and filter cafés by wifi, outlets, noise level, and seating
- 🗺️ **Map view** — see cafés plotted on an interactive map
- ⭐ **Favourites** — save cafés to revisit later
- 📝 **Reviews** — read and write reviews for individual cafés
- 📱 Responsive, mobile-friendly layout

## Tech Stack

- **Frontend:** Next.js (App Router), React
- **Planned backend:** PostgreSQL
- **Planned integration:** Google Maps API for live café search and map display

## Project Structure

```
findmybean/
├── app/
│   ├── explore/        # browse & filter cafés
│   ├── map/             # map view
│   ├── cafe/[id]/       # individual café details
│   ├── reviews/         # reviews list, write, and view
│   ├── saved/           # saved/favourite cafés
│   └── layout.js
├── components/
│   ├── CafeCard.js
│   ├── CafeScreen.js
│   ├── FilterSheet.js
│   ├── Nav.js
│   ├── ReviewsScreen.js
│   └── Shell.js
├── lib/
│   ├── data.js          # café data handling
│   ├── places.js        # places/search logic
│   ├── storage.js        # saved cafés storage
│   └── image.js
└── public/
```

## Current Progress

- [x] Page routing and layout (explore, map, café detail, reviews, saved)
- [x] Core UI components (cards, filters, nav)
- [x] Static/sample café data
- [ ] Connect to PostgreSQL database
- [ ] Live café search via Google Maps API
- [ ] User authentication
- [ ] Deploy live demo

## Running Locally

```bash
git clone https://github.com/kalasingayvonne/findmybean.git
cd findmybean
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Design

The UI follows a "Sunshine Pop" palette, cream, espresso brown, forest and mint green, and blush/coral pink, paired with Fredoka and Nunito fonts, for a chill-coffee-shop aesthetic.

## Author

**Yvonne Kalasinga**
[GitHub](https://github.com/kalasingayvonne)
