# Oneday

The things we keep saying we'll do. A shared list for your people that turns into the story of what you did together.

This is the landing page, built with React, TypeScript and Vite.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.tsx              page layout
  data.ts              list items, memories, learning steps, credits
  styles.css           all styles
  components/          Hero, Board (the live list), ItemPage, Story, Sections, Footer
  hooks/               useFitText, useInView
public/img/            photos
```

The page uses Geist on a warm paper ground with Bear red (#C9372C) as the accent.

Photos are from Wikimedia Commons; credits are listed in `src/data.ts`.
