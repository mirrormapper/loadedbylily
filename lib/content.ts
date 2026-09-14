export const orderLabel = "Order this weekend"

export interface CookieProduct {
  slug: string
  name: string
  note: string
  fill: string
  price: number
  image: string
  span: string
  featured: boolean
}

export const cookies: CookieProduct[] = [
  {
    slug: "triple-choc",
    name: "Triple Choc Slab",
    note: "Dark dough, ganache core, cocoa shards.",
    fill: "Ganache core",
    price: 8,
    image: "/cookies/triple-choc.jpg",
    span: "md:col-span-7 md:row-span-2",
    featured: true,
  },
  {
    slug: "biscoff",
    name: "Biscoff Drip",
    note: "Speculoos fill and a warm biscuit crumb.",
    fill: "Speculoos cream",
    price: 8,
    image: "/cookies/biscoff.jpg",
    span: "md:col-span-5",
    featured: false,
  },
  {
    slug: "kinder",
    name: "Kinder Crush",
    note: "Milk chocolate, wafer, and hazelnut cream.",
    fill: "Hazelnut cream",
    price: 8,
    image: "/cookies/kinder.jpg",
    span: "md:col-span-3",
    featured: false,
  },
  {
    slug: "pistachio",
    name: "Pistachio Cream",
    note: "White chocolate and toasted pistachio.",
    fill: "Pistachio cream",
    price: 9,
    image: "/cookies/pistachio.jpg",
    span: "md:col-span-2",
    featured: false,
  },
  {
    slug: "raspberry",
    name: "Raspberry White",
    note: "Tart freeze-dried raspberry through a white chocolate river.",
    fill: "White chocolate + raspberry",
    price: 8,
    image: "/cookies/raspberry.jpg",
    span: "md:col-span-12",
    featured: false,
  },
]

export const flavours = cookies.filter((cookie) => cookie.slug !== "raspberry")

export interface BundleProduct {
  slug: string
  name: string
  note: string
  cookieCount: number
  price: number
  compareAt: number
  image: string
  span: string
  featured: boolean
}

export const bundles: BundleProduct[] = [
  {
    slug: "weekend-four",
    name: "Weekend Four",
    note: "Pick four flavours. The box most people take home.",
    cookieCount: 4,
    price: 30,
    compareAt: 32,
    image: "/cookies/stack.jpg",
    span: "md:col-span-7 md:row-span-2",
    featured: true,
  },
  {
    slug: "the-pair",
    name: "The Pair",
    note: "Two cookies, one paper bag. Easy first order.",
    cookieCount: 2,
    price: 15,
    compareAt: 16,
    image: "/cookies/hero.jpg",
    span: "md:col-span-5",
    featured: false,
  },
  {
    slug: "loaded-six",
    name: "Loaded Six",
    note: "The birthday box. Mix any six for Saturday.",
    cookieCount: 6,
    price: 45,
    compareAt: 50,
    image: "/cookies/crumb.jpg",
    span: "md:col-span-5",
    featured: false,
  },
]

export const finishes = [
  {
    id: "classic",
    label: "Classic finish",
    hint: "Set as it cools",
    price: 0,
  },
  {
    id: "warm",
    label: "Collect warm",
    hint: "Soft centre, same price",
    price: 0,
  },
  {
    id: "crumb",
    label: "Extra crumb",
    hint: "More biscuit on top",
    price: 1,
  },
] as const

export const collectionSlots = [
  { id: "9-11", label: "Saturday 9–11" },
  { id: "11-1", label: "Saturday 11–1" },
  { id: "1-3", label: "Saturday 1–3" },
] as const

export const weekendGallery = [
  {
    slug: "raspberry",
    kind: "cookie" as const,
    name: "Raspberry White",
    copy: "Tart freeze-dried raspberry through a white chocolate river.",
    image: "/cookies/raspberry.jpg",
  },
  {
    slug: "weekend-four",
    kind: "bundle" as const,
    name: "The Stack",
    copy: "Four cookies, one box, baked Friday night for Saturday collection.",
    image: "/cookies/stack.jpg",
  },
  {
    slug: "loaded-six",
    kind: "bundle" as const,
    name: "Crumb Finish",
    copy: "Every bake is finished by hand. No two tops look the same.",
    image: "/cookies/crumb.jpg",
  },
] as const

export const marqueeItems = [
  "Triple Choc Slab",
  "Biscoff Drip",
  "Kinder Crush",
  "Pistachio Cream",
  "Raspberry White",
  "Weekend Four",
  "Loaded Six",
  "The Pair",
] as const

export const stories = [
  {
    quote:
      "Thick, warm, and actually filled. I collected on Saturday and they were still soft in the centre.",
    name: "Maya T.",
    place: "East Tamworth",
    image: "/cookies/portrait-1.jpg",
  },
  {
    quote:
      "We ordered a mixed six for a birthday. They looked bakery-window and tasted better than they looked.",
    name: "Josh R.",
    place: "Calala",
    image: "/cookies/portrait-2.jpg",
  },
  {
    quote:
      "The pistachio one is dangerous. Lily has the weekend bake thing down.",
    name: "Priya S.",
    place: "South Tamworth",
    image: "/cookies/portrait-3.jpg",
  },
] as const

export const scrubWords =
  "Each cookie starts as a thick New York dough, then gets filled, finished, and baked the same weekend you order it. Lily works in small batches so the chocolate still sits glossy when you collect."

export function cookieBySlug(slug: string) {
  return cookies.find((cookie) => cookie.slug === slug)
}

export function bundleBySlug(slug: string) {
  return bundles.find((bundle) => bundle.slug === slug)
}

export function finishById(id: string) {
  return finishes.find((finish) => finish.id === id)
}
