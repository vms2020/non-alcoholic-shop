import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'
import { FREE_SHIPPING_THRESHOLD, formatPrice, imageUrl } from '@/data/products'

export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQuantity, remove } = useCart()
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled).catch(() => setStripeEnabled(false))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  async function checkout() {
    setPending(true)
    setError(null)
    try {
      const url = await createCheckoutSession({
        data: lines.map(({ id, quantity }) => ({ id, quantity })),
      })
      if (!url) throw new Error('No checkout URL')
      window.location.href = url
    } catch {
      setError('We couldn’t start checkout. Please try again in a moment.')
      setPending(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen} inert={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-paper shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="font-display text-2xl">Your bag</h2>
          <button onClick={close} className="p-2 -mr-2 rounded-full hover:bg-cream" aria-label="Close bag">
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 grid place-items-center px-8 text-center">
            <div>
              <div className="mx-auto mb-5 size-20 rounded-full bg-blush/60 grid place-items-center">
                <ShoppingBag className="size-8 text-clay" />
              </div>
              <p className="font-display text-2xl mb-2">Your bag is empty</p>
              <p className="text-muted text-sm mb-6">A spritz and a snack is a very good place to start.</p>
              <Link
                to="/shop"
                search={{}}
                onClick={close}
                className="inline-block rounded-full bg-ink text-paper px-6 py-3 text-sm font-semibold hover:bg-clay transition"
              >
                Browse the pantry
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-line">
              <p className="text-sm mb-2">
                {remaining > 0 ? (
                  <>You're <strong>{formatPrice(remaining)}</strong> away from free shipping</>
                ) : (
                  <>🎉 You've unlocked <strong>free shipping</strong></>
                )}
              </p>
              <div className="h-1.5 rounded-full bg-line overflow-hidden">
                <div className="h-full bg-sage origin-left transition-transform duration-500" style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-line px-6">
              {lines.map(({ id, quantity, product }) => (
                <li key={id} className="py-5 flex gap-4">
                  <Link
                    to="/products/$productId"
                    params={{ productId: product.slug }}
                    onClick={close}
                    className="shrink-0 size-20 rounded-xl overflow-hidden bg-cream"
                  >
                    <img src={imageUrl(product.image, 160)} alt="" className="size-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium leading-tight truncate">{product.name}</p>
                        <p className="text-xs text-muted mt-0.5">{product.size}</p>
                      </div>
                      <p className="font-medium tabular-nums">{formatPrice(product.price * quantity)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button
                          onClick={() => setQuantity(id, quantity - 1)}
                          className="p-2 hover:text-clay"
                          aria-label={`Decrease ${product.name}`}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{quantity}</span>
                        <button
                          onClick={() => setQuantity(id, quantity + 1)}
                          className="p-2 hover:text-clay"
                          aria-label={`Increase ${product.name}`}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button onClick={() => remove(id)} className="text-xs text-muted underline underline-offset-4 hover:text-clay">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-5 space-y-3 bg-cream/60">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted">Shipping is calculated at checkout.</p>
              {error && <p role="alert" className="text-sm text-clay-dark">{error}</p>}
              <button
                onClick={checkout}
                disabled={pending || !stripeEnabled}
                className="w-full rounded-full bg-ink text-paper py-4 font-semibold hover:bg-clay active:scale-[.98] transition disabled:opacity-50 disabled:hover:bg-ink disabled:cursor-not-allowed"
              >
                {pending
                  ? 'Heading to checkout…'
                  : stripeEnabled === false
                    ? 'Checkout opening soon'
                    : `Checkout · ${formatPrice(subtotal)}`}
              </button>
              {stripeEnabled === false && (
                <p className="text-xs text-muted text-center">Online payments aren't switched on yet — your bag is saved.</p>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
