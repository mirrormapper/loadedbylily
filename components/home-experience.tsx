"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight, MapPin, ShoppingBag } from "@phosphor-icons/react"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/components/cart-provider"
import { Wordmark } from "@/components/lily-mark"
import { ShopDialogs } from "@/components/shop-dialogs"
import {
  bundles,
  flavours,
  marqueeItems,
  orderLabel,
  scrubWords,
  stories,
  weekendGallery,
} from "@/lib/content"

gsap.registerPlugin(useGSAP, ScrollTrigger)

function LilyStroke() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-1 left-0 h-[0.28em] w-[108%]"
      viewBox="0 0 220 18"
      fill="none"
    >
      <path
        className="lily-stroke"
        d="M3 12 C 28 4, 54 16, 86 9 C 118 2, 148 15, 182 8 C 196 5, 208 11, 217 7"
        stroke="var(--lily)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function HomeExperience() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [storyIndex, setStoryIndex] = useState(0)
  const story = stories[storyIndex]
  const { count, lines, openCart, openCookie, openBundle } = useCart()

  function startOrder() {
    if (lines.length) {
      openCart()
      return
    }
    document.getElementById("flavours")?.scrollIntoView({ behavior: "smooth" })
  }

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

      gsap.from(".hero-copy > *", {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
      })

      gsap.from(".hero-shot", {
        scale: 1.14,
        opacity: 0,
        duration: 1.15,
        ease: "power2.out",
      })

      gsap.utils.toArray<HTMLElement>(".scrub-word").forEach((word) => {
        gsap.fromTo(
          word,
          { opacity: 0.1 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 82%",
              end: "top 42%",
              scrub: true,
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>(".scale-media").forEach((media) => {
        gsap.fromTo(
          media,
          { scale: 0.8 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top 88%",
              end: "center 48%",
              scrub: true,
            },
          }
        )
      })

      const pinSection = document.querySelector(".pin-section")
      const pinGallery = document.querySelector(".pin-gallery")
      if (!pinSection || !pinGallery) return

      const mm = gsap.matchMedia()
      mm.add("(min-width: 768px)", () => {
        const distance = () =>
          Math.max(pinGallery.scrollHeight - window.innerHeight * 0.72, 320)

        gsap.to(pinGallery, {
          y: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            start: "top top",
            end: () => `+=${distance() + 280}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  function showStory(next: number) {
    const count = stories.length
    setStoryIndex((next + count) % count)
  }

  return (
    <main
      ref={rootRef}
      className="relative w-full max-w-full overflow-x-hidden bg-cacao"
    >
      <header className="sticky top-0 z-[80] bg-gradient-to-b from-cacao/80 to-transparent">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-7 md:px-10">
          <a href="#top" className="shrink-0">
            <Wordmark />
          </a>
          <div className="hidden items-center gap-9 text-[15px] text-ash md:flex">
            <a href="#flavours" className="transition-colors duration-200 hover:text-sugar">
              Flavours
            </a>
            <a href="#boxes" className="transition-colors duration-200 hover:text-sugar">
              Boxes
            </a>
            <a href="#weekend" className="transition-colors duration-200 hover:text-sugar">
              Weekend
            </a>
          </div>
          <button
            type="button"
            onClick={openCart}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lily px-4 py-2 text-[13px] font-medium text-cacao transition-transform duration-300 hover:scale-[1.03]"
          >
            <ShoppingBag size={15} />
            Bag
            {count > 0 ? <span className="tabular-nums">{count}</span> : null}
          </button>
        </nav>
      </header>

      <section id="top" className="relative min-h-screen">
        <div className="grid min-h-screen grid-cols-12">
          <div className="hero-copy col-span-12 flex flex-col justify-center px-6 pt-[22vh] pb-16 md:col-span-7 md:px-10 md:pb-24 lg:px-16">
            <h1
              className="w-full max-w-5xl font-semibold tracking-[-0.055em] text-sugar"
              style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", lineHeight: 0.94 }}
            >
              <span className="relative inline-block">
                Loaded
                <LilyStroke />
              </span>{" "}
              cookies,
              <br />
              baked in Tamworth.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-sugar/74">
              Lily fills thick weekend dough. Order Friday. Collect Saturday in Tamworth.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <button
                type="button"
                onClick={startOrder}
                className="inline-flex items-center justify-center rounded-full bg-sugar px-8 py-4 text-base font-medium text-cacao transition-transform duration-300 hover:scale-[1.03]"
              >
                {orderLabel}
              </button>
              <a
                href="#flavours"
                className="inline-flex items-center justify-center rounded-full border border-sugar/20 px-8 py-4 text-base font-medium text-sugar transition-colors duration-200 hover:bg-sugar/10"
              >
                See the flavours
              </a>
            </div>
          </div>

          <div className="relative z-0 col-span-12 h-[62vh] overflow-hidden md:col-span-5 md:h-auto">
            <div className="hero-shot absolute inset-0 origin-center">
              <Image
                src="/cookies/hero.jpg"
                alt="A cracked chocolate chip cookie with a molten centre"
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover object-[55%_40%] contrast-125 saturate-75"
              />
            </div>
            <aside className="absolute bottom-16 left-6 max-w-[16rem] rounded-2xl border border-lily/40 bg-cacao/80 px-5 py-4 text-sm leading-snug text-sugar md:bottom-20 md:left-8">
              Still soft in the centre.
              <span className="mt-2 block text-ash">Maya T., East Tamworth</span>
            </aside>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden border-y border-line py-8 md:py-10">
        <div className="marquee-track flex min-w-max items-center gap-12 pr-12">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-4xl font-semibold tracking-[-0.04em] text-sugar/28 md:text-6xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="flavours" className="px-6 py-32 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="max-w-5xl text-5xl leading-[0.92] font-semibold tracking-[-0.05em] md:text-7xl">
            Four ways to get
            <span
              className="mx-3 inline-block h-10 w-24 align-middle rounded-full bg-cover bg-center md:h-14 md:w-32"
              style={{ backgroundImage: "url(/cookies/inline-1.jpg)" }}
            />
            properly loaded.
          </h2>
          <p className="mt-8 max-w-lg text-lg text-ash">
            Thick centres and a finish you can see from the box.{" "}
            <span className="tabular-nums text-sugar">$8</span> a cookie.{" "}
            <span className="tabular-nums text-sugar">$9</span> for pistachio.
          </p>

          <div className="mt-16 grid auto-rows-[280px] grid-flow-dense grid-cols-12 gap-3 md:auto-rows-[340px] md:gap-4">
            {flavours.map((flavour) => (
              <article
                key={flavour.slug}
                className={`group relative col-span-12 overflow-hidden bg-panel ${
                  flavour.featured ? "rounded-[2.2rem]" : "rounded-[1.4rem]"
                } ${flavour.span}`}
              >
                <button
                  type="button"
                  onClick={() => openCookie(flavour.slug)}
                  className="absolute inset-0 z-10"
                  aria-label={`Choose ${flavour.name}`}
                />
                <Image
                  src={flavour.image}
                  alt={flavour.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover contrast-125 grayscale-[18%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 ${
                    flavour.featured
                      ? "bg-gradient-to-t from-cacao via-cacao/35 to-lily/10"
                      : "bg-gradient-to-t from-cacao via-cacao/25 to-transparent"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                      {flavour.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-sugar/72">
                      {flavour.note}
                    </p>
                  </div>
                  <span className="rounded-full bg-sugar px-4 py-2 text-sm font-medium text-cacao tabular-nums">
                    ${flavour.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="boxes" className="px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="max-w-4xl text-5xl leading-[0.92] font-semibold tracking-[-0.05em] md:text-7xl">
            Take a box. Save a few dollars.
          </h2>
          <p className="mt-8 max-w-lg text-lg text-ash">
            Singles stay at $8. Boxes cut the price when you commit to Saturday.
          </p>
          <div className="mt-16 grid auto-rows-[260px] grid-flow-dense grid-cols-12 gap-3 md:auto-rows-[300px] md:gap-4">
            {bundles.map((bundle) => (
              <article
                key={bundle.slug}
                className={`group relative col-span-12 overflow-hidden bg-panel ${
                  bundle.featured ? "rounded-[2.2rem]" : "rounded-[1.4rem]"
                } ${bundle.span}`}
              >
                <button
                  type="button"
                  onClick={() => openBundle(bundle.slug)}
                  className="absolute inset-0 z-10"
                  aria-label={`Build ${bundle.name}`}
                />
                <Image
                  src={bundle.image}
                  alt={bundle.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover contrast-125 grayscale-[12%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cacao via-cacao/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                      {bundle.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-sugar/72">
                      {bundle.note}
                    </p>
                  </div>
                  <span className="rounded-full bg-sugar px-4 py-2 text-sm font-medium text-cacao tabular-nums">
                    ${bundle.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-10 md:py-36">
        <p className="mx-auto max-w-5xl text-center text-4xl leading-[1.15] font-semibold tracking-[-0.04em] md:text-6xl">
          {scrubWords.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="scrub-word inline">
              {word}{" "}
            </span>
          ))}
        </p>
      </section>

      <section
        id="weekend"
        className="pin-section relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:h-screen md:flex-row md:items-start md:gap-20 md:px-12"
      >
        <div className="md:w-[38%] md:pt-32">
          <h2 className="max-w-xl text-5xl leading-[0.92] font-semibold tracking-[-0.05em] md:text-7xl">
            Weekend dough.
            <span
              className="mx-3 inline-block h-10 w-20 align-middle rounded-full bg-cover bg-center md:h-12 md:w-24"
              style={{ backgroundImage: "url(/cookies/inline-2.jpg)" }}
            />
            Weekday cravings.
          </h2>
          <p className="mt-8 max-w-md text-lg text-ash">
            Orders close Friday evening. Lily bakes overnight and opens collection on Saturday.
          </p>
          <button
            type="button"
            onClick={startOrder}
            className="mt-10 inline-flex items-center gap-3 text-sugar"
          >
            {orderLabel}
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="pin-gallery mt-16 flex w-full flex-col gap-8 md:mt-0 md:w-[54%]">
          {weekendGallery.map((item) => (
            <article key={item.name} className="relative overflow-hidden rounded-[1.6rem] bg-panel">
              <button
                type="button"
                onClick={() =>
                  item.kind === "cookie" ? openCookie(item.slug) : openBundle(item.slug)
                }
                className="absolute inset-0 z-10"
                aria-label={`Choose ${item.name}`}
              />
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="scale-media object-cover contrast-125"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {item.name}
                </h3>
                <p className="mt-3 text-ash">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stories" className="px-6 py-32 md:px-10 md:py-44">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-[22rem] items-end">
            {stories.map((entry, index) => (
              <div
                key={entry.name}
                className={`absolute overflow-hidden rounded-[2rem] bg-panel transition-all duration-500 ${
                  index === storyIndex
                    ? "bottom-0 left-0 z-20 h-80 w-56 md:h-[22rem] md:w-64"
                    : index === (storyIndex + 1) % stories.length
                      ? "bottom-8 left-24 z-10 h-56 w-40 opacity-70 md:left-36"
                      : "bottom-16 left-12 z-0 h-44 w-32 opacity-35 md:left-20"
                }`}
              >
                <Image
                  src={entry.image}
                  alt={entry.name}
                  fill
                  className="object-cover contrast-125 grayscale"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-3xl leading-snug font-semibold tracking-[-0.035em] md:text-5xl">
              {story.quote}
            </p>
            <p className="mt-8 text-sm text-ash">
              {story.name}, {story.place}
            </p>
            <div className="mt-10 flex gap-3">
              <button
                type="button"
                onClick={() => showStory(storyIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-sugar transition-colors duration-200 hover:bg-sugar hover:text-cacao"
                aria-label="Previous story"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => showStory(storyIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-sugar transition-colors duration-200 hover:bg-sugar hover:text-cacao"
                aria-label="Next story"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="px-6 pb-20 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-10 rounded-[2.2rem] bg-lily px-8 py-16 text-cacao md:flex-row md:items-end md:px-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-5xl leading-[0.9] font-semibold tracking-[-0.055em] md:text-8xl">
              {orderLabel}.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-cacao/70">
              Build a bag, pick a Saturday slot, and collect in Tamworth.
            </p>
          </div>
          <button
            type="button"
            onClick={startOrder}
            className="inline-flex items-center gap-3 rounded-full bg-cacao px-8 py-4 text-base font-medium text-sugar transition-transform duration-300 hover:scale-[1.03]"
          >
            {orderLabel}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <footer className="px-6 pb-12 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <a href="#top">
            <Wordmark markClassName="h-7 w-7" />
          </a>
          <p className="flex items-center gap-2 text-sm text-ash">
            <MapPin size={16} />
            Tamworth, NSW
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-ash">
            <button type="button" onClick={openCart} className="hover:text-sugar">
              Bag
            </button>
            <a href="#flavours" className="hover:text-sugar">
              Menu
            </a>
            <span>Contains gluten, dairy, egg, soy, nuts</span>
          </div>
        </div>
      </footer>
      <ShopDialogs />
      <CartDrawer />
    </main>
  )
}
