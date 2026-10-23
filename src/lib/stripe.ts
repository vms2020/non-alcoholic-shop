import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { FREE_SHIPPING_THRESHOLD, getProduct } from '@/data/products'

const SHIPPING_FLAT_RATE = 6

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY,
)

const cartSchema = z
  .array(
    z.object({
      id: z.number().int().positive(),
      quantity: z.number().int().min(1).max(24),
    }),
  )
  .min(1)
  .max(50)

export const createCheckoutSession = createServerFn({ method: 'POST' })
  .validator(cartSchema)
  .handler(async ({ data: cart }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const origin = process.env.SITE_URL ?? process.env.URL ?? 'http://localhost:3000'

    // Prices always come from the server-side catalog, never from the client.
    let subtotal = 0
    const line_items = cart.map(({ id, quantity }) => {
      const product = getProduct(id)
      if (!product) throw new Error('Product not found')
      subtotal += product.price * quantity
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: `${product.maker} · ${product.size}`,
            images: [`${origin}${product.image}`],
          },
          unit_amount: product.price * 100,
        },
        quantity,
      }
    })

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE

    const session = await stripe.checkout.sessions.create({
      allowed_payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: shipping === 0 ? 'Free standard shipping' : 'Standard shipping',
            fixed_amount: { amount: shipping * 100, currency: 'usd' },
          },
        },
      ],
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
    })

    return session.url
  })
