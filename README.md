# Vaercast

A weather app built while learning React. Search for a city and see its current temperature. Dhaka is shown by default. Currently uses wttr.in and is being rebuilt as a global search on top of Open-Meteo.

**Live demo:** https://vaercast.vercel.app/

## Stack

- **React + TypeScript** (Vite)
- **SWR** for data fetching, caching, and revalidation
- **Tailwind CSS** for styling
- **wttr.in** as the weather API (no key required)

## Features

- City search with a debounced input, so a request only fires after you stop typing
- No request is sent when the search box is empty (SWR key is `null`)
- Shows current temperature and "feels like" for the searched city, defaulting to Dhaka
- Loading and error states handled by SWR, with caching by city
- Fully typed API response shape end to end (fetcher → SWR generic → JSX)
- Soft, muted color theme defined once as CSS variables and reused via Tailwind utility classes

## Planned

- Switch the data source to Open-Meteo (geocoding search, then forecast by coordinates)
- Picker for ambiguous city names
- Day and night themes based on local sunset time
- Zustand for shared state

## Getting started

```bash
git clone https://github.com/turbolagged/Vaercast
cd Vaercast
npm install
npm run dev
```
