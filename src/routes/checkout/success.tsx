import { useEffect } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  const { clear } = useCart()

  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-xl mx-auto px-5 py-28 text-center">
      <div className="mx-auto size-20 rounded-full bg-sage text-paper grid place-items-center text-4xl">✓</div>
      <h1 className="font-display text-5xl mt-8">Cheers to that!</h1>
      <p className="mt-4 text-muted text-lg">
        Thanks for your order. Stripe will email your receipt, and we'll get your box packed up.
      </p>
      <Link to="/shop" search={{}} className="mt-10 inline-block rounded-full bg-ink text-paper px-7 py-4 font-semibold hover:bg-clay transition">
        Keep browsing
      </Link>
    </div>
  )
}
