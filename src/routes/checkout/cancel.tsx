import { Link, createFileRoute } from '@tanstack/react-router'
import { useCart } from '@/lib/cart'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  const { open } = useCart()

  return (
    <div className="max-w-xl mx-auto px-5 py-28 text-center">
      <h1 className="font-display text-5xl">Checkout cancelled</h1>
      <p className="mt-4 text-muted text-lg">No charge was made. Your bag is right where you left it.</p>
      <div className="mt-10 flex justify-center gap-3">
        <button onClick={open} className="rounded-full bg-ink text-paper px-7 py-4 font-semibold hover:bg-clay transition">
          Return to bag
        </button>
        <Link to="/" className="rounded-full border border-ink/20 px-7 py-4 font-semibold hover:border-ink transition">
          Home
        </Link>
      </div>
    </div>
  )
}
