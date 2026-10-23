# Zero Proof Pantry — agent notes

Storefront for non-alcoholic drinks and snacks. TanStack Start + React 19 + Tailwind v4, deployed on Netlify.

## Layout

- `src/data/products.ts` — the catalog (single source of truth for prices, in whole USD), plus `getProduct`, `imageUrl` (Netlify Image CDN URL builder), `formatPrice`, `FREE_SHIPPING_THRESHOLD`.
- `src/lib/cart.tsx` — `CartProvider`/`useCart`: client-only bag persisted to `localStorage` (`zpp-cart`), hydrated in an effect to stay SSR-safe. Stores only `{id, quantity}`.
- `src/lib/stripe.ts` — server functions: `getStripeEnabled` and `createCheckoutSession` (zod-validated cart; prices re-read from the catalog server-side; flat $6 shipping under the threshold).
- `src/components/` — `SiteHeader`, `SiteFooter`, `CartDrawer` (checkout button lives here), `ProductCard`, `NewsletterForm`.
- `src/routes/` — `/` home, `/shop` (search params `category`, `sort`), `/products/$productId` (param is the product **slug**), `/checkout/success` (clears bag), `/checkout/cancel`.
- `public/img/` — AI-generated product photos. Always reference them via `imageUrl(src, width)`, never the raw PNGs.
- `public/newsletter-form.html` — static Netlify Forms registration; fields must match `NewsletterForm.tsx`.

## Conventions

- Theme tokens are in `src/styles.css` `@theme` (`cream`, `paper`, `ink`, `muted`, `clay`, `sage`, `blush`, `line`; fonts `font-display` = Fraunces, `font-sans` = Instrument Sans).
- Rounded, warm editorial look: large radii, Fraunces headings with italic `text-clay` accents, uppercase tracked eyebrows in `text-sage`.
- Never trust client prices; keep checkout validation in the server function.
- There is no order database or webhook — the success page is not proof of payment.
