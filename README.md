# Zero Proof Pantry

An online shop for non-alcoholic drinks and the snacks that go with them — zero-proof spirits, spritzes, dealcoholised wine, NA beer, kombucha, nuts, crackers, popcorn and more.

## Features

- **Home page** with hero, house favourites, Drinks/Snacks category tiles, one-tap "perfect pair" bundles and the shop story
- **Shop** at `/shop` with Drinks / Snacks / Everything filters and price sorting (shareable via URL, e.g. `/shop?category=snacks`)
- **Product pages** with tasting notes, size, ABV, quantity picker, a suggested pairing and related products
- **Shopping bag** drawer saved in the browser, with a free-shipping progress bar
- **Stripe Checkout** for the whole bag — prices are always taken from the server-side catalog; shipping is free over $50, otherwise a flat $6
- **Newsletter signup** in the footer powered by Netlify Forms
- Product photography served through the Netlify Image CDN (resized WebP)

## Tech

TanStack Start (React 19) · Tailwind CSS v4 · Stripe · Netlify Forms · Netlify Image CDN

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Enables checkout. Without it the bag still works but checkout shows "opening soon". |
| `SITE_URL` | Optional. Origin for Stripe return URLs; defaults to Netlify's `URL`. |

## Editing the catalog

All products live in `src/data/products.ts`. Images are in `public/img/`.

## Ideas for later

- Stripe webhook to record orders and send shipping notifications
- Inventory / sold-out states
- Age-neutral gift boxes and subscriptions
