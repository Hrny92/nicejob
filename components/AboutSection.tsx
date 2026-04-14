'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHECK_ITEMS = [
  'Lidský přístup ke každé zakázce',
  'Propojení dat, intuice a moderních nástrojů',
  'Rychlost a transparentnost bez kompromisů',
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)
  const listRef    = useRef<HTMLUListElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Label + linky ──────────────────────────────────── */
      gsap.from(labelRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: labelRef.current,
          start: 'top 88%',
          once: true,
        },
      })

      /* ── Nadpis — každý řádek zvlášť ───────────────────── */
      const lines = headingRef.current?.querySelectorAll<HTMLElement>('.h-line') ?? []
      gsap.from(lines, {
        opacity: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      /* ── Tělo textu ─────────────────────────────────────── */
      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 88%',
          once: true,
        },
      })

      /* ── Checklist položky ──────────────────────────────── */
      const items = listRef.current?.querySelectorAll<HTMLElement>('li') ?? []
      gsap.from(items, {
        opacity: 0,
        x: -18,
        duration: 0.45,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      /* ── Obrázek ────────────────────────────────────────── */
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 82%',
          once: true,
        },
      })

      /* ── Kartička přes foto ─────────────────────────────── */
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 82%',
          once: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="o-nas"
      className="w-full bg-white py-24 lg:py-32 px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

        {/* ── Levý sloupec ──────────────────────────────────── */}
        <div className="flex flex-col gap-8">

          {/* Label */}
          <div ref={labelRef} className="flex items-center gap-3">
            <div className="w-7 h-px bg-brand-dark" />
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-brand-dark">
              O nás
            </span>
          </div>

          {/* Nadpis */}
          <h2
            ref={headingRef}
            className="font-display font-black uppercase leading-[1.06]
                       text-4xl sm:text-5xl xl:text-[3.5rem]"
          >
            <span className="h-line block text-brand-dark">Vznikli jsme</span>
            <span className="h-line block text-brand-dark">z potřeby</span>
            <span className="h-line block text-brand-blue">dělat věci jinak</span>
          </h2>

          {/* Tělo */}
          <p ref={bodyRef} className="text-gray-500 leading-relaxed text-[0.95rem] max-w-md">
            Spojujeme roky zkušeností z MZ Training s dravostí nové značky zaměřené čistě na lidi.{' '}
            <strong className="text-gray-800 font-semibold">
              Nice Job není jen název, je to náš standard.
            </strong>{' '}
            Pomáháme firmám růst skrze ty správné lidi a nastavujeme novou laťku v HR praxi.
          </p>

          {/* Checklist */}
          <ul ref={listRef} className="flex flex-col gap-3.5">
            {CHECK_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                {/* Zaškrtnutí */}
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0
                             flex items-center justify-center
                             bg-brand-blue/10"
                >
                  <svg
                    className="w-3 h-3 text-brand-blue"
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Pravý sloupec — fotka ──────────────────────────── */}
        <div ref={imageRef} className="relative">
          <div
            className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-xl shadow-brand-dark/10"
            style={{ aspectRatio: '4 / 5' }}
          >
            {/* Dekorativní rámeček za fotkou */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-brand-blue/15 -z-10"
            />

            {!imgError ? (
              <Image
                src="/onas-photo.jpg"
                alt="Tým Nice Job"
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Placeholder pokud fotka chybí */
              <div className="absolute inset-0 flex flex-col items-center justify-center
                              bg-gradient-to-br from-brand-dark/5 to-brand-blue/10 gap-4">
                <svg className="w-16 h-16 text-brand-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 18h16.5M4.5 3.75h15a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 .75-.75Z" />
                </svg>
                <p className="text-brand-blue/50 text-sm font-medium">
                  Vložte fotku jako /public/onas-photo.jpg
                </p>
              </div>
            )}

            {/* Kartička overlay */}
            <div
              ref={cardRef}
              className="absolute bottom-5 left-5 right-5
                         bg-brand-dark/88 backdrop-blur-md
                         rounded-2xl px-5 py-4 text-white"
            >
              <p className="font-bold text-sm mb-1 tracking-wide">Nová laťka v HR praxi</p>
              <p className="text-white/65 text-xs leading-relaxed">
                Od MZ Training k Nice Job — vždy s lidmi v centru pozornosti.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
