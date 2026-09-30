# BD Weather
 
A weather app for Bangladesh's divisions, built while transitioning from Angular to React/Next.js. Pick a district, see the current temperature and conditions.
 
**Live demo:** https://bdweatherlive.vercel.app/
 
## Stack
 
- **React + TypeScript** (Vite)
- **SWR** for data fetching, caching, and revalidation
- **Tailwind CSS** for styling
- **wttr.in** as the weather API (no key required)
## Features
 
- District dropdown driven by a typed data array, covering all 8 divisions of Bangladesh
- Server state handled with SWR: automatic caching by city, loading and error states, no manual fetch/cleanup code
- Fully typed API response shape end to end (fetcher → SWR generic → JSX)
- Soft, muted color theme defined once as CSS variables and reused via Tailwind utility classes
## Getting started
 
```bash
git clone https://github.com/turbolagged/bd-weather.git
cd bd-weather
npm install
npm run dev
```
 
Create a `.env` file in the project root with:
 
```
VITE_WEATHER_API_URL=https://wttr.in
```
 
## What this project was for
 
I'm a frontend engineer with a background in Angular, building this to get hands-on with React, hooks, and the modern data-fetching/state ecosystem (SWR, and Zustand next) ahead of moving into React/Next.js roles. The early commits deliberately start with a plain `useEffect` + `AbortController` implementation before moving to SWR, to understand what the library actually replaces rather than treating it as a black box.
 
## Roadmap
 
- [ ] Zustand store for recent/saved city searches
- [ ] 3-day forecast view
- [ ] Searchable district input
- [ ] Unit tests with Jest / React Testing Library
- [ ] Migrate to Next.js App Router
## License
 
MIT
