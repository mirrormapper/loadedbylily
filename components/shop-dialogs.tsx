"use client"

import { useEffect, useId, useState } from "react"
import Image from "next/image"
import { Minus, Plus, X } from "@phosphor-icons/react"
import { useCart } from "@/components/cart-provider"
import {
  bundleBySlug,
  cookieBySlug,
  cookies,
  finishes,
} from "@/lib/content"

function Overlay({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-cacao/72"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-dialog-title"
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[1.8rem] bg-glaze shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:max-w-3xl md:rounded-[1.8rem]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cacao/70 text-sugar"
          aria-label={`Close ${title}`}
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}

function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 12,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-line">
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center text-sugar"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center text-sugar"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}

function CookieDialog({ slug }: { slug: string }) {
  const cookie = cookieBySlug(slug)
  const { addCookie, closeDialog, openBundle } = useCart()
  const [qty, setQty] = useState(1)
  const [finish, setFinish] = useState<(typeof finishes)[number]["id"]>("classic")
  const finishName = useId()

  if (!cookie) return null

  const extra = finishes.find((item) => item.id === finish)?.price ?? 0
  const total = (cookie.price + extra) * qty

  return (
    <Overlay title={cookie.name} onClose={closeDialog}>
      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[28rem]">
          <Image
            src={cookie.image}
            alt={cookie.name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover contrast-125"
          />
        </div>
        <div className="px-6 py-8 md:px-8 md:py-10">
          <p className="text-sm text-ash">{cookie.fill}</p>
          <h2
            id="shop-dialog-title"
            className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-4xl"
          >
            {cookie.name}
          </h2>
          <p className="mt-3 text-sugar/74">{cookie.note}</p>
          <p className="mt-5 text-2xl font-semibold tabular-nums tracking-[-0.03em]">
            ${cookie.price}
            {extra > 0 ? <span className="text-base text-ash"> + ${extra} crumb</span> : null}
          </p>

          <fieldset className="mt-8">
            <legend className="text-sm text-ash">Finish</legend>
            <div className="mt-3 grid gap-2">
              {finishes.map((item) => (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-200 ${
                    finish === item.id
                      ? "border-lily bg-lily/10"
                      : "border-line hover:border-sugar/30"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-xs text-ash">{item.hint}</span>
                  </span>
                  <span className="text-sm tabular-nums text-ash">
                    {item.price ? `+$${item.price}` : "Included"}
                  </span>
                  <input
                    type="radio"
                    className="sr-only"
                    name={finishName}
                    checked={finish === item.id}
                    onChange={() => setFinish(item.id)}
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              type="button"
              onClick={() => addCookie({ slug: cookie.slug, qty, finish })}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-sugar px-6 text-sm font-medium text-cacao transition-transform duration-200 hover:scale-[1.02]"
            >
              Add to bag · ${total}
            </button>
          </div>

          {qty >= 2 ? (
            <button
              type="button"
              onClick={() => openBundle(qty >= 6 ? "loaded-six" : qty >= 4 ? "weekend-four" : "the-pair")}
              className="mt-4 text-sm text-lily underline-offset-4 hover:underline"
            >
              Make it a box and save a few dollars
            </button>
          ) : null}
        </div>
      </div>
    </Overlay>
  )
}

function BundleDialog({ slug }: { slug: string }) {
  const bundle = bundleBySlug(slug)
  const { addBundle, closeDialog } = useCart()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [error, setError] = useState("")

  if (!bundle) return null

  const picked = Object.entries(counts).flatMap(([flavourSlug, qty]) =>
    Array.from({ length: qty }, () => flavourSlug)
  )
  const remaining = bundle.cookieCount - picked.length
  const pistachioExtra = picked.filter((item) => item === "pistachio").length
  const total = bundle.price + pistachioExtra

  function setCount(flavourSlug: string, qty: number) {
    setError("")
    setCounts((current) => {
      const next = Math.max(0, qty)
      const other = Object.entries(current)
        .filter(([key]) => key !== flavourSlug)
        .reduce((sum, [, value]) => sum + value, 0)
      const allowed = Math.min(next, bundle.cookieCount - other)
      return { ...current, [flavourSlug]: allowed }
    })
  }

  function submit() {
    if (picked.length !== bundle.cookieCount) {
      setError(`Pick ${bundle.cookieCount} cookies for this box.`)
      return
    }
    addBundle({ slug: bundle.slug, flavourSlugs: picked })
  }

  return (
    <Overlay title={bundle.name} onClose={closeDialog}>
      <div className="grid md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[28rem]">
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover contrast-125"
          />
        </div>
        <div className="px-6 py-8 md:px-8 md:py-10">
          <p className="text-sm text-ash">
            ${bundle.price} instead of ${bundle.compareAt}
          </p>
          <h2
            id="shop-dialog-title"
            className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-4xl"
          >
            {bundle.name}
          </h2>
          <p className="mt-3 text-sugar/74">{bundle.note}</p>
          <p className="mt-5 text-sm text-ash">
            {remaining === 0
              ? "Box is full."
              : `Pick ${remaining} more cookie${remaining === 1 ? "" : "s"}.`}
          </p>

          <div className="mt-5 grid gap-2">
            {cookies.map((cookie) => {
              const qty = counts[cookie.slug] ?? 0
              return (
                <div
                  key={cookie.slug}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
                    qty > 0 ? "border-lily bg-lily/10" : "border-line"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-medium">{cookie.name}</span>
                    <span className="block text-xs text-ash">
                      {cookie.slug === "pistachio" ? "+$1 each in a box" : cookie.fill}
                    </span>
                  </span>
                  <QtyStepper
                    min={0}
                    max={bundle.cookieCount}
                    value={qty}
                    onChange={(next) => setCount(cookie.slug, next)}
                  />
                </div>
              )
            })}
          </div>

          {error ? <p className="mt-4 text-sm text-lily">{error}</p> : null}

          <button
            type="button"
            onClick={submit}
            className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sugar px-6 text-sm font-medium text-cacao transition-transform duration-200 hover:scale-[1.02]"
          >
            Add {bundle.name} · ${total}
          </button>
        </div>
      </div>
    </Overlay>
  )
}

export function ShopDialogs() {
  const { activeCookie, activeBundle } = useCart()

  if (activeCookie) return <CookieDialog slug={activeCookie} />
  if (activeBundle) return <BundleDialog slug={activeBundle} />
  return null
}
