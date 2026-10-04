# Vaercast

A weather app built while learning React. It currently uses wttr.in and a Bangladesh divisions dropdown, and is being rebuilt as a global city search on top of Open-Meteo.

**Live demo:** https://vaercast.vercel.app/

## Stack

- **React + TypeScript** (Vite)
- **SWR** for data fetching, caching, and revalidation
- **Tailwind CSS** for styling
- **wttr.in** as the weather API (no key required)

## Features

- City search with a debounced input and a conditional SWR key, so no request fires for empty input
- Server state handled with SWR: caching by city, loading and error states, no manual fetch/cleanup code
- Fully typed API response shape end to end (fetcher → SWR generic → JSX)
- Soft, muted color theme defined once as CSS variables and reused via Tailwind utility classes

## Planned

- Switch the data source to Open-Meteo (geocoding search, then forecast by coordinates)
- Global city search with a picker for ambiguous names
- Day and night themes based on local sunset time
- Zustand for shared state

## License

MIT
