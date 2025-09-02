# Movie Explorer (Vue 3 + Vite + Pinia + PWA)

A simple, polished Movie Explorer that lets you search by title, browse results, and view details (plot, genre, cast, IMDb rating). Built with Vue 3, Vite, Pinia (with persisted state), Tailwind CSS, and a PWA service worker via `vite-plugin-pwa`.

## Why these choices
- **Vue 3 + Vite**: modern, fast DX; standard way to scaffold Vue apps.
- **Pinia (persisted)**: single, tiny store to preserve search state (query, results, page) across navigation, reloads, and offline instances.
- **Tailwind**: quick, consistent styling without heavy component libs.
- **PWA**: installable, offline-friendly. Caches app shell, posters, and OMDb GETs.

## Getting started

### Prerequisites
- Node 18+ and npm

### Setup
1. Install deps:
```
`npm i`
```
2. Create a `.env.local` file and set your OMDb key:
   ```
   VITE_OMDB_API_KEY=your_key_here
   ```
3. `npm run dev` and open the dev URL.
4. Open the printed URL.

## Build & Preview (to test PWA)
```
npm run build
npm run preview
```
- Use your browser's "Install app" option.
- Try searches, open details, reload, adn test offline: previously viewed content is instant.

## Scripts
- `npm run dev` - dev server
- `npm run build` - production build
- `npm run preview` - preview server to test PWA
- `test` - run tests in watch mode
- `test:run` - single CI run

## Testing
This project uses Vitest, @vue/test-utils, and jsdom.

### What we cover
1. Component behaviour - MovieCard renders the title and falls back to a placeholder image hen the poster is missing.
2. Store behaviour - getDetails() returns cached data without calling fetch again, and fetches when not cached.

### How to run
```
npm run test
npm run test:run
```

### Config (in vite.config.js)
```
export default defineConfig({
   test: {
      environment: 'jsdom',
      globals: true
   }
})
```

## Architecture
- `src/stores/movies.js` - single Pinia store with search actions and a details cache.
- `src/pages/SearchView.vue` - search bar, results grid, pagination, states.
- `src/pages/MovieDetailsView.vue` - details with loading/error/placeholder handling.
- `src/components` - small, reusable UI pieces.
- `vite.config.js` - PWA config + Tailwind Vite plugin + alias @ => /src.

## Design & branding
- Palette inspired by Clear Business: `primary-*` purples and `bluegray-*` neutrals for surfaces, borders, and text.
- Shapes: rounded inputs/buttons (rounded-full) and sof shadows (shadow-soft / shadow-lift).
- Fonts: applied Nunito family to provide a similar feel to that of Clear Business.

## Notes & tradeoffs
- We persist only serialisable store fields (query, page, totalResults, results). The details cache is in memory (refetches are fast and/or served from the SW cache).
- We use fetch over extra HTTP libs to keep dependencies minimal.
- With more time: add tests for SearchView pagination, loading skeletons, favourites, and accessibility checks (keyboard focus traps, ARIA)

## PWA details
- Installable via `vite-plugin-pwa` `(registerType: 'autoUpdate')`.
- Runtime caching:
   - Posters (images): CacheFirst, 7 days
   - OMDb GETs: StaleWhileRevalidate, 1 day

## Environment variables

### Option 1 — Included `.env` (for evaluation only)
A demo OMDb API key is committed in `.env` so the project runs out-of-the-box for reviewers.

> **Important:** Committing credentials to a repository is **not recommended** beyond demo/test scenarios. While frontend API keys are inherently visible in the browser, checking them into version control increases the blast radius (forks, mirrors, logs). This key is intentionally low-privilege and rate-limited, and may be rotated at any time.  
> **If you intend to deploy or fork this project:**
> - Remove the committed `.env` from source control.
> - Create your own key and place it in `.env.local` (not committed) or your hosting provider’s environment settings.
> - Update `VITE_OMDB_API_KEY` accordingly and restart the app.

### Option 2 — Bring-your-own key
Alternatively, do **not** commit `.env` and set your key locally:
```
# .env.local (not committed)
VITE_OMDB_API_KEY=your_key_here
```

## Troubleshooting
- Blank page: check the browser console for errors; ensure `app.use(router)` and `<router-view />` exist.
- API key issues: If the provided API key fails, add `VITE_OMDB_API_KEY` in `.env.local`, restart the dev server. Request should look like:
```
https://www.omdbapi.com/?apikey=YOURKEY&s=batman&page=1
```
- Mixed content: always use `https://www.omdbapi.com/` (not `http://`)
- PWA not activating: service workers run on the preview/prod build, not regular dev. Use `npm run preview`.