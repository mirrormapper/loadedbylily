"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowLeft,
  ArrowRight,
  Cookie,
  MapPin,
} from "@phosphor-icons/react"
import {
  facebookUrl,
  flavours,
  marqueeItems,
  scrubWords,
  stories,
  weekendGallery,
} from "@/lib/content"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HomeExperience() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [storyIndex, setStoryIndex] = useState(0)
  const story = stories[storyIndex]

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduce) return

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[120vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,183,196,0.16),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(193,122,58,0.12),transparent_28%)]"
      />

      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#120e0c]/70 px-3 py-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-5">
          <a href="#top" className="flex items-center gap-2 pl-2 text-sm font-semibold tracking-[0.18em] uppercase">
            <Cookie size={18} weight="fill" className="text-lily" />
            Loaded by Lily
          </a>
          <div className="hidden items-center gap-8 text-sm text-ash md:flex">
            <a href="#flavours" className="transition-colors hover:text-sugar">
              Flavours
            </a>
            <a href="#weekend" className="transition-colors hover:text-sugar">
              Weekend
            </a>
            <a href="#stories" className="transition-colors hover:text-sugar">
              Stories
            </a>
          </div>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-sugar px-4 py-2 text-sm font-medium text-cacao transition-transform duration-300 hover:scale-[1.03]"
          >
            Order
          </a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-screen items-end pb-20 pt-36 md:items-center md:pb-0 md:pt-24">
        <div className="absolute inset-0">
          <Image
            src="/cookies/hero.jpg"
            alt="Freshly baked chocolate chip cookies"
            fill
            priority
            className="object-cover object-center brightness-[0.92] contrast-110 saturate-90"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,11,9,0.08)_0%,rgba(14,11,9,0.38)_48%,rgba(14,11,9,0.88)_100%)]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <h1 className="w-full max-w-6xl text-balance font-medium tracking-[-0.045em] text-sugar" style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", lineHeight: 0.98 }}>
            Loaded cookies, baked in Tamworth.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sugar/78 md:text-xl">
            Lily fills thick weekend dough with chocolate, cream, and crumb.
            Order before Friday. Collect Saturday in Tamworth.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-sugar px-8 py-4 text-base font-medium text-cacao transition-transform duration-300 hover:scale-[1.03]"
            >
              Order this weekend
            </a>
            <a
              href="#flavours"
              className="inline-flex items-center justify-center rounded-full border border-sugar/20 bg-transparent px-8 py-4 text-base font-medium text-sugar transition-colors hover:bg-sugar/10"
            >
              See the flavours
            </a>
          </div>
        </div>
      </section>

      <div className="relative border-y border-line bg-glaze py-5">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex min-w-max items-center gap-10 pr-10">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-10 text-sm tracking-[0.22em] text-ash uppercase"
              >
                <Cookie size={16} className="text-lily" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section id="flavours" className="px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="max-w-5xl text-5xl leading-[0.95] font-medium tracking-[-0.04em] md:text-7xl">
              Four ways to get
              <span
                className="mx-3 inline-block h-10 w-24 align-middle rounded-full bg-cover bg-center md:h-14 md:w-32"
                style={{ backgroundImage: "url(/cookies/inline-1.jpg)" }}
              />
              properly loaded.
            </h2>
            <p className="mt-8 max-w-xl text-lg text-ash">
              Thick centres, real fillings, and a finish you can see from the
              box. $8 a cookie. $9 for pistachio. Boxes of four or six on
              request.
            </p>
          </div>

          <div className="mt-16 grid auto-rows-[280px] grid-flow-dense grid-cols-12 gap-4 md:auto-rows-[320px]">
            {flavours.map((flavour) => (
              <article
                key={flavour.slug}
                className={`group relative col-span-12 overflow-hidden rounded-[2rem] bg-panel ${flavour.span}`}
              >
                <Image
                  src={flavour.image}
                  alt={flavour.name}
                  fill
                  className="object-cover contrast-125 grayscale-[20%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cacao via-cacao/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                      {flavour.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-sugar/75">
                      {flavour.note}
                    </p>
                  </div>
                  <span className="rounded-full bg-sugar px-4 py-2 text-sm font-medium text-cacao">
                    ${flavour.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 md:px-10 md:py-48">
        <p className="mx-auto max-w-5xl text-center text-4xl leading-[1.2] font-medium tracking-[-0.03em] md:text-6xl">
          {scrubWords.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="scrub-word inline">
              {word}{" "}
            </span>
          ))}
        </p>
      </section>

      <section
        id="weekend"
        className="pin-section relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:h-screen md:flex-row md:items-start md:gap-16 md:px-12"
      >
        <div className="md:w-[38%] md:pt-36">
          <h2 className="max-w-xl text-5xl leading-[0.95] font-medium tracking-[-0.04em] md:text-7xl">
            Weekend dough.
            <span
              className="mx-3 inline-block h-10 w-20 align-middle rounded-full bg-cover bg-center md:h-12 md:w-24"
              style={{ backgroundImage: "url(/cookies/inline-2.jpg)" }}
            />
            Weekday cravings.
          </h2>
          <p className="mt-8 max-w-md text-lg text-ash">
            Orders close Friday evening. Lily bakes through the night and
            opens collection on Saturday in Tamworth.
          </p>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 text-sugar"
          >
            Message Lily to lock a box
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="pin-gallery mt-16 flex w-full flex-col gap-8 md:mt-0 md:w-[54%]">
          {weekendGallery.map((item) => (
            <article
              key={item.name}
              className="group overflow-hidden rounded-[2rem] bg-panel"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-medium tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-3 text-ash">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stories" className="px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex min-h-[22rem] items-end">
            {stories.map((entry, index) => (
              <div
                key={entry.name}
                className={`absolute overflow-hidden rounded-full border-4 border-cacao bg-panel transition-all duration-500 ${
                  index === storyIndex
                    ? "bottom-0 left-0 z-20 h-72 w-56 md:h-80 md:w-64"
                    : index === (storyIndex + 1) % stories.length
                      ? "bottom-10 left-28 z-10 h-56 w-44 opacity-70 md:left-40"
                      : "bottom-20 left-16 z-0 h-48 w-36 opacity-40 md:left-24"
                }`}
              >
                <Image
                  src={entry.image}
                  alt={entry.name}
                  fill
                  className="object-cover grayscale contrast-125"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-3xl leading-snug font-medium tracking-[-0.03em] md:text-4xl">
              {story.quote}
            </p>
            <p className="mt-8 text-sm tracking-[0.18em] text-ash uppercase">
              {story.name} / {story.place}
            </p>
            <div className="mt-10 flex gap-3">
              <button
                type="button"
                onClick={() => showStory(storyIndex - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-sugar transition-colors hover:bg-sugar hover:text-cacao"
                aria-label="Previous story"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => showStory(storyIndex + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-sugar transition-colors hover:bg-sugar hover:text-cacao"
                aria-label="Next story"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="order"
        className="px-6 pb-24 md:px-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 rounded-[2.5rem] bg-sugar px-8 py-16 text-cacao md:flex-row md:items-end md:px-16 md:py-24">
          <div className="max-w-3xl">
            <h2 className="text-5xl leading-[0.92] font-medium tracking-[-0.045em] md:text-8xl">
              Place your weekend order.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-cacao/70">
              Message Loaded by Lily on Facebook with your flavours and
              collection time. Pickup in Tamworth, Saturday.
            </p>
          </div>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-cacao px-8 py-4 text-base font-medium text-sugar transition-transform duration-300 hover:scale-[1.03]"
          >
            Open Facebook
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <footer className="px-6 pb-12 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="text-sm tracking-[0.18em] uppercase">Loaded by Lily</p>
          <p className="flex items-center gap-2 text-sm text-ash">
            <MapPin size={16} />
            Tamworth, NSW
          </p>
          <div className="flex gap-6 text-sm text-ash">
            <a href={facebookUrl} target="_blank" rel="noreferrer" className="hover:text-sugar">
              Facebook
            </a>
            <a href="#flavours" className="hover:text-sugar">
              Menu
            </a>
            <span>Contains gluten, dairy, egg, soy, nuts</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
