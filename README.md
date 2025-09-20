# Next Cocktails (Fixed, Standard Next.js App)

This is a clean, **Next.js 14 (App Router) + TypeScript + Tailwind** project wired to TheCocktailDB.

## Features

- App Router with server components
- TypeScript, strict mode
- Tailwind CSS
- ESLint (`next/core-web-vitals`)
- Image optimization via `next/image`
- 5 random cocktails on Home (3 cards first row, 2 next row)
- Search cocktails by name
- Cocktail detail page with ingredients and instructions
- Proper `next.config.ts` to allow CocktailDB images

## Getting Started

```bash
# 1) Install deps
npm i

# 2) Run dev server
npm run dev

# 3) Build & start
npm run build && npm start
```

Create a `.env.local` if you want to override defaults:

```
NEXT_PUBLIC_COCKTAIL_API_BASE=https://www.thecocktaildb.com/api/json/v1/1
```

## Project Structure

```
app/
  layout.tsx
  page.tsx            # Home: 5 random cocktails
  search/page.tsx     # Search by name
  cocktail/[id]/page.tsx  # Details
components/
  CocktailCard.tsx
lib/
  api.ts              # API layer (fetch helpers)
tailwind.config.ts
postcss.config.js
next.config.ts
.eslintrc.json
tsconfig.json
```

## Notes

- All data fetching is on the server, with basic caching (`next: { revalidate: 60 }`).
- You can switch to RSC streaming or add loading.tsx files for skeletons if desired.
- Designed to pass a standard **create-next-app** baseline for config & scripts.
