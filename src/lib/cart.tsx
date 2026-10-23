import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '@/data/products'

export interface CartLine {
  id: number
  quantity: number
}

interface CartContextValue {
  lines: Array<CartLine & { product: Product }>
  count: number
  subtotal: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (id: number, quantity?: number) => void
  setQuantity: (id: number, quantity: number) => void
  remove: (id: number) => void
  clear: () => void
}

const STORAGE_KEY = 'zpp-cart'
const MAX_QTY = 24
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Array<CartLine>>([])
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (Array.isArray(saved)) setRaw(saved.filter((l) => getProduct(l.id)))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  }, [raw, hydrated])

  const value = useMemo<CartContextValue>(() => {
    const lines = raw.flatMap((l) => {
      const product = getProduct(l.id)
      return product ? [{ ...l, product }] : []
    })
    const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(n)))
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.quantity * l.product.price, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (id, quantity = 1) => {
        setRaw((prev) => {
          const existing = prev.find((l) => l.id === id)
          if (existing) {
            return prev.map((l) => (l.id === id ? { ...l, quantity: clamp(l.quantity + quantity) } : l))
          }
          return [...prev, { id, quantity: clamp(quantity) }]
        })
        setIsOpen(true)
      },
      setQuantity: (id, quantity) =>
        setRaw((prev) =>
          quantity < 1
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, quantity: clamp(quantity) } : l)),
        ),
      remove: (id) => setRaw((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setRaw([]),
    }
  }, [raw, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
