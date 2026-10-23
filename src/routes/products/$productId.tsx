import { useState } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, Check, Minus, Plus, Truck } from 'lucide-react'
import products, { formatPrice, getProduct, imageUrl } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/products/$productId')({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.productId)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} · Zero Proof Pantry` },
          { name: 'description', content: loaderData.shortDescription },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <h1 className="font-display text-5xl">Gone from the shelf</h1>
      <p className="mt-4 text-muted">We couldn't find that product. It may have sold out for good.</p>
      <Link to="/shop" search={{}} className="mt-8 inline-block rounded-full bg-ink text-paper px-6 py-3 font-semibold">
        Back to the shop
      </Link>
    </div>
  ),
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const pair = product.pairsWith ? getProduct(product.pairsWith) : undefined
  const more = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  function addToBag() {
    add(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12">
      <Link
        to="/shop"
        search={{ category: product.category }}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="size-4" /> Back to {product.category}
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-blush/40 rise">
          <img
            src={imageUrl(product.image, 1000)}
            srcSet={`${imageUrl(product.image, 600)} 600w, ${imageUrl(product.image, 1000)} 1000w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={product.name}
            className="size-full object-cover"
          />
          {product.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        <div className="lg:py-8 rise" style={{ animationDelay: '120ms' }}>
          <p className="text-xs uppercase tracking-[0.25em] text-sage font-semibold">
            {product.maker} · {product.kind}
          </p>
          <h1 className="font-display text-5xl md:text-6xl mt-4 leading-[1.02] tracking-tight">{product.name}</h1>
          <p className="mt-5 text-2xl tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-paper border border-line p-4">
              <dt className="text-muted">Size</dt>
              <dd className="font-medium mt-1">{product.size}</dd>
            </div>
            <div className="rounded-2xl bg-paper border border-line p-4">
              <dt className="text-muted">{product.category === 'drinks' ? 'Strength' : 'Category'}</dt>
              <dd className="font-medium mt-1">
                {product.category === 'drinks' ? (product.abv ?? '0.0% ABV') : 'Snack'}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="text-sm text-muted mb-2">{product.category === 'drinks' ? 'Tasting notes' : 'Flavours'}</p>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <span key={n} className="rounded-full bg-blush/70 px-4 py-1.5 text-sm">
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            <div className="inline-flex items-center rounded-full border border-ink/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-4 hover:text-clay" aria-label="Decrease quantity">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center tabular-nums font-medium" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(24, q + 1))} className="p-4 hover:text-clay" aria-label="Increase quantity">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={addToBag}
              className="flex-1 rounded-full bg-ink text-paper font-semibold hover:bg-clay active:scale-[.98] transition inline-flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="size-4" /> Added to bag
                </>
              ) : (
                <>Add to bag · {formatPrice(product.price * qty)}</>
              )}
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Truck className="size-4" /> Ships in 2–4 days · free over $50
          </p>

          {pair && (
            <Link
              to="/products/$productId"
              params={{ productId: pair.slug }}
              className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 hover:border-ink/30 transition"
            >
              <img src={imageUrl(pair.image, 160)} alt="" className="size-16 rounded-xl object-cover" />
              <span className="flex-1">
                <span className="block text-xs uppercase tracking-[0.18em] text-sage font-semibold">Pairs well with</span>
                <span className="font-display text-lg">{pair.name}</span>
              </span>
              <span className="text-sm font-medium tabular-nums">{formatPrice(pair.price)}</span>
            </Link>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-4xl">More {product.category}</h2>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
