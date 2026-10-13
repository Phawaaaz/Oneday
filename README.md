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
  data.ts              list items, memories, learning steps, credits, palettes
  styles.css           all styles
  components/          Hero, Board (the live list), ItemPage, Story, Sections, Footer, RemixBar
  hooks/               useRemix (fonts and colours), useFitText, useInView
public/img/            photos
```

The remix bar (bottom right) lets you try fonts and colours on the live page; the choice is kept in the URL so you can share it.

Photos are from Wikimedia Commons; credits are listed in the page footer.
