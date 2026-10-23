import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { FREE_SHIPPING_THRESHOLD } from '@/data/products'

export function SiteHeader() {
  const { count, open } = useCart()

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-cream text-xs tracking-[0.2em] uppercase text-center py-2 px-4">
        Free shipping on orders over ${FREE_SHIPPING_THRESHOLD} · Always 0.0% hangover
      </div>
      <div className="bg-cream/85 backdrop-blur-md border-b border-line">
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight leading-none">
            Zero Proof <em className="text-clay font-normal">Pantry</em>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/shop" search={{ category: 'drinks' }} className="hover:text-clay transition-colors">
              Drinks
            </Link>
            <Link to="/shop" search={{ category: 'snacks' }} className="hover:text-clay transition-colors">
              Snacks
            </Link>
            <Link to="/shop" search={{}} className="hover:text-clay transition-colors">
              Shop all
            </Link>
            <a href="/#about" className="hover:text-clay transition-colors">
              Our story
            </a>
          </div>
          <button
            type="button"
            onClick={open}
            className="relative inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-medium hover:border-ink/40 active:scale-95 transition"
            aria-label={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Bag</span>
            <span
              className={`min-w-5 h-5 px-1 grid place-items-center rounded-full text-[11px] font-semibold transition ${
                count > 0 ? 'bg-clay text-paper' : 'bg-line text-muted'
              }`}
            >
              {count}
            </span>
          </button>
        </nav>
      </div>
    </header>
  )
}
