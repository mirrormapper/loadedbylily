"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import {
  bundleBySlug,
  cookieBySlug,
  finishById,
} from "@/lib/content"

export interface CartLine {
  id: string
  kind: "cookie" | "bundle"
  slug: string
  name: string
  detail: string
  unitPrice: number
  qty: number
  image: string
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  isCartOpen: boolean
  activeCookie: string | null
  activeBundle: string | null
  openCart: () => void
  closeCart: () => void
  openCookie: (slug: string) => void
  openBundle: (slug: string) => void
  closeDialog: () => void
  addCookie: (input: { slug: string; qty: number; finish: string }) => void
  addBundle: (input: { slug: string; flavourSlugs: string[] }) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function cookieLineId(slug: string, finish: string) {
  return `cookie:${slug}:${finish}`
}

function bundleLineId(slug: string, flavourSlugs: string[]) {
  return `bundle:${slug}:${[...flavourSlugs].sort().join(",")}`
}

function bundlePrice(slug: string, flavourSlugs: string[]) {
  const bundle = bundleBySlug(slug)
  if (!bundle) return 0
  const pistachioCount = flavourSlugs.filter((item) => item === "pistachio").length
  return bundle.price + pistachioCount
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isCartOpen, setCartOpen] = useState(false)
  const [activeCookie, setActiveCookie] = useState<string | null>(null)
  const [activeBundle, setActiveBundle] = useState<string | null>(null)

  const closeDialog = useCallback(() => {
    setActiveCookie(null)
    setActiveBundle(null)
  }, [])

  const addCookie = useCallback(
    ({ slug, qty, finish }: { slug: string; qty: number; finish: string }) => {
      const cookie = cookieBySlug(slug)
      const extra = finishById(finish)
      if (!cookie || !extra) return

      const id = cookieLineId(slug, finish)
      const unitPrice = cookie.price + extra.price

      setLines((current) => {
        const existing = current.find((line) => line.id === id)
        if (existing) {
          return current.map((line) =>
            line.id === id ? { ...line, qty: line.qty + qty } : line
          )
        }

        return [
          ...current,
          {
            id,
            kind: "cookie",
            slug,
            name: cookie.name,
            detail: extra.label,
            unitPrice,
            qty,
            image: cookie.image,
          },
        ]
      })
      setActiveCookie(null)
      setCartOpen(true)
    },
    []
  )

  const addBundle = useCallback(
    ({ slug, flavourSlugs }: { slug: string; flavourSlugs: string[] }) => {
      const bundle = bundleBySlug(slug)
      if (!bundle) return

      const names = flavourSlugs
        .map((item) => cookieBySlug(item)?.name)
        .filter(Boolean)
        .join(" · ")
      const id = bundleLineId(slug, flavourSlugs)
      const unitPrice = bundlePrice(slug, flavourSlugs)

      setLines((current) => {
        const existing = current.find((line) => line.id === id)
        if (existing) {
          return current.map((line) =>
            line.id === id ? { ...line, qty: line.qty + 1 } : line
          )
        }

        return [
          ...current,
          {
            id,
            kind: "bundle",
            slug,
            name: bundle.name,
            detail: names,
            unitPrice,
            qty: 1,
            image: bundle.image,
          },
        ]
      })
      setActiveBundle(null)
      setCartOpen(true)
    },
    []
  )

  const setQty = useCallback((id: string, qty: number) => {
    setLines((current) => {
      if (qty < 1) return current.filter((line) => line.id !== id)
      return current.map((line) => (line.id === id ? { ...line, qty } : line))
    })
  }, [])

  const remove = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0)

    return {
      lines,
      count,
      subtotal,
      isCartOpen,
      activeCookie,
      activeBundle,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openCookie: (slug) => {
        setActiveBundle(null)
        setActiveCookie(slug)
      },
      openBundle: (slug) => {
        setActiveCookie(null)
        setActiveBundle(slug)
      },
      closeDialog,
      addCookie,
      addBundle,
      setQty,
      remove,
      clear,
    }
  }, [
    activeBundle,
    activeCookie,
    addBundle,
    addCookie,
    closeDialog,
    isCartOpen,
    lines,
    remove,
    setQty,
    clear,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}
