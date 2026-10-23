import { Link } from '@tanstack/react-router'
import { NewsletterForm } from './NewsletterForm'

export function SiteFooter() {
  return (
    <footer className="bg-espresso text-oat mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl md:text-5xl leading-[1.05] max-w-md">
            Good taste, <em className="text-petal">clear head.</em>
          </p>
          <p className="mt-4 text-oat/60 max-w-sm text-sm">
            New arrivals, pairing ideas and the occasional members-only bundle. One email a month, no hangovers.
          </p>
          <NewsletterForm />
        </div>
        <div className="text-sm">
          <h3 className="uppercase tracking-[0.2em] text-xs text-oat/50 mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/shop" search={{ category: 'drinks' }} className="hover:text-petal">Drinks</Link></li>
            <li><Link to="/shop" search={{ category: 'snacks' }} className="hover:text-petal">Snacks</Link></li>
            <li><Link to="/shop" search={{}} className="hover:text-petal">Everything</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="uppercase tracking-[0.2em] text-xs text-oat/50 mb-4">Good to know</h3>
          <ul className="space-y-2 text-oat/80">
            <li>Ships across the US in 2–4 days</li>
            <li>Free shipping over $50</li>
            <li>All drinks under 0.5% ABV</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-oat/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 text-xs text-oat/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Zero Proof Pantry</span>
          <span>Drink curiously. Snack generously.</span>
        </div>
      </div>
    </footer>
  )
}
