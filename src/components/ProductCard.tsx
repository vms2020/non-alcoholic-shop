import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { formatPrice, imageUrl, type Product } from '@/data/products'
import { useCart } from '@/lib/cart'

export function ProductCard({ product, className = '' }: { product: Product; className?: string }) {
  const { add } = useCart()

  return (
    <article className={`group relative ${className}`}>
      <Link
        to="/products/$productId"
        params={{ productId: product.slug }}
        className="block relative aspect-[4/5] rounded-[1.75rem] overflow-hidden bg-blush/40"
      >
        <img
          src={imageUrl(product.image, 640)}
          srcSet={`${imageUrl(product.image, 400)} 400w, ${imageUrl(product.image, 640)} 640w, ${imageUrl(product.image, 900)} 900w`}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </Link>
      <button
        type="button"
        onClick={() => add(product.id)}
        className="absolute right-3 top-3 size-11 rounded-full bg-ink text-paper grid place-items-center shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 hover:bg-clay active:scale-90 transition max-md:opacity-100 max-md:translate-y-0"
        aria-label={`Add ${product.name} to bag`}
      >
        <Plus className="size-5" />
      </button>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{product.kind}</p>
          <h3 className="mt-1 font-display text-xl leading-snug">
            <Link to="/products/$productId" params={{ productId: product.slug }} className="hover:text-clay transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-muted mt-0.5">{product.size}</p>
        </div>
        <p className="font-medium tabular-nums pt-5">{formatPrice(product.price)}</p>
      </div>
    </article>
  )
}
