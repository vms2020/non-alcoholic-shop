import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Leaf, Moon, Truck } from 'lucide-react'
import products, { formatPrice, getProduct, imageUrl } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/')({
  component: Home,
})

const pairings = [
  { title: 'Golden hour', drink: 1, snack: 7, line: 'Citrusy bubbles meet chili heat.' },
  { title: 'Fireside', drink: 3, snack: 9, line: 'Smoke, oak and salted dark chocolate.' },
  { title: 'Movie night', drink: 5, snack: 10, line: 'Hops and truffle — trust us.' },
]

const ticker = ['Sparkling spritzes', 'Zero-proof spirits', 'Dealcoholised wine', 'Craft NA beer', 'Small-batch snacks', 'Kombucha', 'Pairing boxes']

function Home() {
  const featured = products.filter((p) => p.badge).concat(products.filter((p) => !p.badge)).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          <div className="lg:col-span-5 lg:pb-16 relative z-10">
            <p className="rise text-xs uppercase tracking-[0.25em] text-sage font-semibold">
              Non-alcoholic drinks & snacks
            </p>
            <h1 className="rise font-display text-[clamp(3rem,7vw,6.25rem)] leading-[0.92] tracking-tight mt-5" style={{ animationDelay: '80ms' }}>
              All the ritual.
              <br />
              <em className="text-clay">None of</em> the proof.
            </h1>
            <p className="rise mt-6 text-lg text-muted max-w-md" style={{ animationDelay: '160ms' }}>
              We taste hundreds of zero-proof spirits, spritzes and NA beers to stock only the ones worth pouring — plus
              the salty, crunchy things that belong beside them.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <Link
                to="/shop"
                search={{ category: 'drinks' }}
                className="group inline-flex items-center gap-2 rounded-full bg-ink text-paper px-7 py-4 font-semibold hover:bg-clay transition"
              >
                Shop drinks <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/shop"
                search={{ category: 'snacks' }}
                className="inline-flex items-center rounded-full border border-ink/20 px-7 py-4 font-semibold hover:border-ink transition"
              >
                Shop snacks
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative rise" style={{ animationDelay: '200ms' }}>
            <div className="relative aspect-[16/11] lg:aspect-[16/12] rounded-[2.5rem] overflow-hidden lg:-mr-16 xl:-mr-24 shadow-[0_40px_80px_-40px_rgba(43,31,26,.5)]">
              <img
                src={imageUrl('/img/hero.png', 1400)}
                srcSet={`${imageUrl('/img/hero.png', 800)} 800w, ${imageUrl('/img/hero.png', 1400)} 1400w`}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt="A table set with zero-proof spritzes, an amber nightcap and bowls of snacks"
                className="size-full object-cover"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-6 left-4 md:-left-10 rounded-2xl bg-paper px-5 py-4 shadow-xl border border-line flex items-center gap-4 max-w-xs">
              <span className="font-display text-4xl text-clay leading-none">&lt;0.5</span>
              <span className="text-sm leading-tight">
                <strong className="block">% ABV, full flavour</strong>
                <span className="text-muted">Every drink tasted by our team</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="mt-16 border-y border-line bg-paper overflow-hidden">
        <div className="marquee flex w-max gap-10 py-4 font-display text-2xl italic text-ink/70">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {t} <span className="text-clay not-italic">✺</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-24">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sage font-semibold">On the shelf now</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3">House favourites</h2>
          </div>
          <Link to="/shop" search={{}} className="hidden sm:inline-flex items-center gap-2 font-medium hover:text-clay">
            Shop everything <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} className={i % 2 === 1 ? 'lg:mt-12' : ''} />
          ))}
        </div>
      </section>

      {/* Category split */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28 grid md:grid-cols-2 gap-6">
        <CategoryTile
          category="drinks"
          title="Drinks"
          blurb="Spirits, spritzes, wine, beer & kombucha"
          image="/img/hibiscus-aperitivo.png"
          tone="bg-clay"
        />
        <CategoryTile
          category="snacks"
          title="Snacks"
          blurb="Nuts, crackers, popcorn & sweet-salty bites"
          image="/img/chili-almonds.png"
          tone="bg-sage"
        />
      </section>

      {/* Pairings */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-sage font-semibold">Perfect pairs</p>
          <h2 className="font-display text-4xl md:text-5xl mt-3">One drink, one snack, one great night.</h2>
          <p className="mt-4 text-muted">Our favourite combinations, added to your bag in a single tap.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {pairings.map((pair) => (
            <PairingCard key={pair.title} {...pair} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="about" className="max-w-7xl mx-auto px-5 md:px-8 mt-28 scroll-mt-28">
        <div className="rounded-[2.5rem] bg-paper border border-line p-8 md:p-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sage font-semibold">Our story</p>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
              A corner shop for people who'd rather <em className="text-clay">remember</em> the party.
            </h2>
            <p className="mt-6 text-muted leading-relaxed">
              Zero Proof Pantry started with a simple frustration: the alcohol-free shelf was always an afterthought.
              So we built the shop we wanted — independent makers, honest tasting notes, and snacks good enough to
              build an evening around.
            </p>
          </div>
          <ul className="grid gap-5">
            {[
              { icon: Leaf, title: 'Independent makers', text: 'Small producers, real botanicals, no syrupy shortcuts.' },
              { icon: Moon, title: 'Tasted, then stocked', text: 'If we wouldn’t pour it at our own table, it isn’t here.' },
              { icon: Truck, title: 'Fast, careful shipping', text: 'Packed by hand, delivered in 2–4 days, free over $50.' },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-cream p-5">
                <span className="shrink-0 size-11 rounded-full bg-blush grid place-items-center">
                  <Icon className="size-5 text-clay" />
                </span>
                <span>
                  <strong className="block font-semibold">{title}</strong>
                  <span className="text-sm text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function CategoryTile({
  category,
  title,
  blurb,
  image,
  tone,
}: {
  category: 'drinks' | 'snacks'
  title: string
  blurb: string
  image: string
  tone: string
}) {
  return (
    <Link
      to="/shop"
      search={{ category }}
      className={`group relative overflow-hidden rounded-[2rem] ${tone} text-oat min-h-[22rem] flex`}
    >
      <img
        src={imageUrl(image, 900)}
        alt=""
        loading="lazy"
        className="absolute right-0 top-0 h-full w-3/5 object-cover [mask-image:linear-gradient(to_right,transparent,black_40%)] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="relative p-8 md:p-10 mt-auto">
        <h3 className="font-display text-6xl md:text-7xl italic">{title}</h3>
        <p className="mt-2 text-oat/80 max-w-[14rem]">{blurb}</p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper text-ink px-5 py-2.5 text-sm font-semibold">
          Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function PairingCard({ title, drink, snack, line }: { title: string; drink: number; snack: number; line: string }) {
  const { add } = useCart()
  const d = getProduct(drink)!
  const s = getProduct(snack)!

  return (
    <div className="rounded-[2rem] bg-paper border border-line p-6 flex flex-col">
      <div className="flex -space-x-6">
        {[d, s].map((p, i) => (
          <img
            key={p.id}
            src={imageUrl(p.image, 300)}
            alt={p.name}
            loading="lazy"
            className={`size-28 rounded-full object-cover border-4 border-paper ${i === 1 ? 'mt-6' : ''}`}
          />
        ))}
      </div>
      <h3 className="font-display text-2xl mt-5">{title}</h3>
      <p className="text-sm text-muted mt-1">{line}</p>
      <p className="text-sm mt-4">
        {d.name} <span className="text-clay">+</span> {s.name}
      </p>
      <button
        onClick={() => {
          add(d.id)
          add(s.id)
        }}
        className="mt-6 self-start rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold hover:bg-ink hover:text-paper active:scale-95 transition"
      >
        Add the pair · {formatPrice(d.price + s.price)}
      </button>
    </div>
  )
}
