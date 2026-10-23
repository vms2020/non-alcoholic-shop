import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import products from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

const searchSchema = z.object({
  category: z.enum(['drinks', 'snacks']).optional().catch(undefined),
  sort: z.enum(['featured', 'price-asc', 'price-desc']).optional().catch(undefined),
})

export const Route = createFileRoute('/shop')({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: 'Shop · Zero Proof Pantry' }] }),
  component: Shop,
})

const tabs = [
  { value: undefined, label: 'Everything' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'snacks', label: 'Snacks' },
] as const

const headings = {
  all: { title: 'The whole pantry', blurb: 'Every bottle, can and crunchy thing we stock.' },
  drinks: { title: 'Drinks', blurb: 'Zero-proof spirits, spritzes, dealcoholised wine, NA beer and kombucha.' },
  snacks: { title: 'Snacks', blurb: 'Small-batch nuts, crackers, popcorn and sweet-salty bites to pour alongside.' },
}

function Shop() {
  const { category, sort = 'featured' } = Route.useSearch()
  const heading = headings[category ?? 'all']

  const list = products
    .filter((p) => !category || p.category === category)
    .sort((a, b) => (sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : 0))

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <header className="grid md:grid-cols-[1fr_auto] gap-6 items-end border-b border-line pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sage font-semibold">
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </p>
          <h1 className="font-display text-5xl md:text-7xl mt-3 tracking-tight">{heading.title}</h1>
          <p className="mt-3 text-muted max-w-lg">{heading.blurb}</p>
        </div>
        <label className="text-sm flex items-center gap-2">
          <span className="text-muted">Sort</span>
          <SortSelect category={category} sort={sort} />
        </label>
      </header>

      <nav className="flex gap-2 mt-6 overflow-x-auto" aria-label="Categories">
        {tabs.map((tab) => {
          const active = category === tab.value
          return (
            <Link
              key={tab.label}
              to="/shop"
              search={(prev) => ({ ...prev, category: tab.value })}
              className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap border transition ${
                active ? 'bg-ink text-paper border-ink' : 'border-line hover:border-ink/40'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

function SortSelect({ category, sort }: { category?: 'drinks' | 'snacks'; sort: string }) {
  const navigate = Route.useNavigate()
  return (
    <select
      value={sort}
      onChange={(e) =>
        navigate({
          search: { category, sort: e.target.value as 'featured' | 'price-asc' | 'price-desc' },
          replace: true,
        })
      }
      className="rounded-full border border-line bg-paper px-4 py-2 font-medium outline-none focus:border-ink"
    >
      <option value="featured">Featured</option>
      <option value="price-asc">Price: low to high</option>
      <option value="price-desc">Price: high to low</option>
    </select>
  )
}
