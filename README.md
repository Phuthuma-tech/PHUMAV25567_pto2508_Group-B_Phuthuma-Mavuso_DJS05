# DJS05 — Podcast Show Detail Page with Routing & Navigation

A React + Vite podcast browsing app that adds dynamic, per-show detail
pages to the DJS series. Users can browse a searchable, filterable,
sortable, paginated show list, click into any show for a full detail
page, and navigate back to the homepage with their previous search and
filters exactly as they left them.

## Features

- **Dynamic routing** — every show has its own URL at `/show/:showId`,
  powered by `react-router-dom`. The id is read from the route param and
  used to fetch that show's full record.
- **Show detail page** — title, large artwork, description, genre tags,
  and a human-readable "last updated" date.
- **Season navigation** — an accordion lets users expand one season at a
  time, see its title and episode count, and switch seasons without
  scrolling through the entire show.
- **Episode list** — each episode shows its number, the season's image,
  its title, and a shortened (truncated) description.
- **Loading, error, and empty states** — handled independently for both
  the homepage list and the show detail fetch, so the user is never
  looking at a blank screen or an unexplained failure.
- **State preservation** — search term, genre filter, sort order, and
  page number all live in the homepage URL's query string. Navigating to
  a show and back (via browser back or the in-page "Back to shows" link)
  restores the exact same view. As a safety net, the last homepage URL is
  also mirrored to `sessionStorage`, so the "Back to shows" link still
  works correctly even if a show page is opened directly.
- **Responsive layout** — grid, hero, and season/episode lists adapt down
  to mobile widths.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open
it in your browser.

### Build for production

```bash
npm run build
npm run preview   # serve the production build locally
```

## Project Structure

```
src/
  api/              Centralised fetch layer (previews, genre, show-by-id)
  hooks/
    useShowListQuery.js   Homepage search/filter/sort/pagination state, synced to the URL
    useShowDetail.js      Fetches a single show by route id
  utils/            Genre lookup, date formatting, text truncation
  components/
    Header/               Site header
    ShowCard/, ShowGrid/   Homepage listing UI
    Filters/, Pagination/  Homepage controls
    StatusStates/          Shared loading / error / empty UI
    GenreTags/             Genre pill list (used on show detail)
    SeasonAccordion/       Expand/collapse season navigation
    EpisodeCard/           Single episode row
  pages/
    HomePage.jsx          Listing page
    ShowDetailPage.jsx    Dynamic per-show detail page
    NotFoundPage.jsx      Fallback for unmatched routes
  App.jsx           Route definitions
  main.jsx          App entry point
```

## API Reference

| Endpoint | Returns |
| --- | --- |
| `GET /` | Array of show `PREVIEW` objects (homepage listing) |
| `GET /genre/:id` | A single `GENRE` object |
| `GET /id/:id` | A full `SHOW` object with `seasons` and `episodes` embedded |

Genre id → title mapping is maintained locally in `src/utils/genres.js`,
since the API only exposes genre ids (not titles) on preview and show
records.

## Known Limitations

- Genre titles are mapped from a static local table rather than fetched
  from `/genre/:id` per show, since the id-to-title mapping is fixed and
  known in advance — this avoids an extra network round trip per show.
- Season/episode "favouriting" or playback is out of scope for this
  project; the season accordion is for browsing and information display
  only.
- State preservation relies on the URL query string and a
  `sessionStorage` fallback; it does not persist across different
  browser sessions or devices.
