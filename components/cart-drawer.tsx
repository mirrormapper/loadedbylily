"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, X } from "@phosphor-icons/react"
import { useCart } from "@/components/cart-provider"
import { collectionSlots } from "@/lib/content"

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    isCartOpen,
    closeCart,
    setQty,
    remove,
    clear,
    openCookie,
    openBundle,
  } = useCart()
  const [name, setName] = useState("")
  const [slot, setSlot] = useState<(typeof collectionSlots)[number]["id"]>("11-1")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isCartOpen) return

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart()
    }

    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [closeCart, isCartOpen])

  if (!isCartOpen) return null

  function requestCollection(event: React.FormEvent) {
    event.preventDefault()
    if (!lines.length || !name.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-cacao/72"
        aria-label="Close bag"
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        className="relative flex h-full w-full max-w-md flex-col bg-glaze shadow-[-24px_0_80px_rgba(0,0,0,0.4)]"
      >
        <header className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2 id="bag-title" className="text-lg font-semibold tracking-[-0.03em]">
              Saturday bag
            </h2>
            {count > 0 ? (
              <span className="text-sm tabular-nums text-ash">{count}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line"
            aria-label="Close bag"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {submitted ? (
            <div className="rounded-[1.4rem] bg-lily px-6 py-8 text-cacao">
              <p className="text-2xl font-semibold tracking-[-0.04em]">
                Bag reserved for {name.trim()}.
              </p>
              <p className="mt-3 text-cacao/70">
                Demo only — Lily would confirm{" "}
                {collectionSlots.find((item) => item.id === slot)?.label} pickup in
                Tamworth.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  clear()
                  closeCart()
                }}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-cacao px-5 text-sm font-medium text-sugar"
              >
                Start another bag
              </button>
            </div>
          ) : lines.length === 0 ? (
            <div className="pt-6">
              <p className="text-xl font-semibold tracking-[-0.03em]">
                Nothing in the bag yet.
              </p>
              <p className="mt-2 text-sm text-ash">
                Start with a single cookie or jump to a box.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    closeCart()
                    openCookie("triple-choc")
                  }}
                  className="rounded-2xl border border-line px-4 py-3 text-left text-sm hover:border-sugar/30"
                >
                  Triple Choc Slab
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeCart()
                    openBundle("weekend-four")
                  }}
                  className="rounded-2xl border border-line px-4 py-3 text-left text-sm hover:border-sugar/30"
                >
                  Weekend Four · save $2
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-panel">
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover contrast-125"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium tracking-[-0.02em]">{line.name}</p>
                        <p className="mt-1 text-xs leading-snug text-ash">{line.detail}</p>
                      </div>
                      <p className="text-sm tabular-nums">
                        ${line.unitPrice * line.qty}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center"
                          aria-label={`Decrease ${line.name}`}
                          onClick={() => setQty(line.id, line.qty - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-6 text-center text-sm tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center"
                          aria-label={`Increase ${line.name}`}
                          onClick={() => setQty(line.id, line.qty + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.id)}
                        className="text-xs text-ash hover:text-sugar"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!submitted &&
          count > 0 &&
          count < 4 &&
          !lines.some((line) => line.kind === "bundle") ? (
            <button
              type="button"
              onClick={() => {
                closeCart()
                openBundle("weekend-four")
              }}
              className="mt-8 w-full rounded-2xl border border-lily/40 bg-lily/8 px-4 py-4 text-left"
            >
              <span className="block text-sm font-medium">Make it a Weekend Four</span>
              <span className="mt-1 block text-xs text-ash">
                Four cookies for $30 instead of $32.
              </span>
            </button>
          ) : null}
        </div>

        {!submitted && lines.length > 0 ? (
          <form
            onSubmit={requestCollection}
            className="border-t border-line px-6 py-5"
          >
            <div className="flex items-end justify-between">
              <p className="text-sm text-ash">Subtotal</p>
              <p className="text-xl font-semibold tabular-nums tracking-[-0.03em]">
                ${subtotal}
              </p>
            </div>
            <label className="mt-5 block text-sm text-ash" htmlFor="pickup-name">
              Name for collection
            </label>
            <input
              id="pickup-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Lily will write this on the box"
              className="mt-2 h-11 w-full rounded-2xl border border-line bg-cacao px-4 text-sm text-sugar placeholder:text-ash/70"
              required
            />
            <fieldset className="mt-4">
              <legend className="text-sm text-ash">Saturday slot</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {collectionSlots.map((item) => (
                  <label
                    key={item.id}
                    className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-2 text-center text-xs ${
                      slot === item.id
                        ? "border-lily bg-lily/10"
                        : "border-line"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="slot"
                      checked={slot === item.id}
                      onChange={() => setSlot(item.id)}
                    />
                    {item.label.replace("Saturday ", "")}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sugar text-sm font-medium text-cacao"
            >
              Request Saturday collection
            </button>
            <p className="mt-3 text-center text-xs text-ash">
              Demo checkout. No payment, no Facebook.
            </p>
          </form>
        ) : null}
      </aside>
    </div>
  )
}
