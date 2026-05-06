'use client'

import Image from 'next/image'
import { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { useContactModal } from '@/context/ContactModalContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ONasData } from '@/lib/queries'

gsap.registerPlugin(ScrollTrigger)

// Fallbacková data pro případ, že Sanity ještě nemá obsah
const FALLBACK: ONasData = {
  nadpis1: 'Vznikli jsme z potřeby',
  nadpis2: 'dělat věci jinak.',
  perex: 'Spojujeme roky zkušeností s dravostí nové značky zaměřené čistě na lidi.',
  perexTucne: 'Nice Job není jen název, je to náš standard.',
  perexPo: 'Pomáháme firmám růst skrze ty správné lidi a nastavujeme novou laťku v HR praxi.',
  checklistPolozky: [
    'Lidský přístup ke každé zakázce',
    'Propojení dat, intuice a moderních nástrojů',
    'Rychlost a transparentnost bez kompromisů',
  ],
}

export default function AboutSection({ data }: { data?: ONasData | null }) {
  const d = data ?? FALLBACK
  const checkItems = d.checklistPolozky ?? FALLBACK.checklistPolozky ?? []
  const { open: openModal } = useContactModal()
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)
  const listRef    = useRef<HTMLUListElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)

  const [imgError, setImgError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const photoContainerRef = useRef<HTMLDivElement>(null)
  const greenLayerRef     = useRef<HTMLDivElement>(null)
  const crosshairRef      = useRef<HTMLDivElement>(null)

  // Inicializujeme masku mimo JSX — React ji pak nikdy nepřepisuje
  useEffect(() => {
    if (greenLayerRef.current) {
      const init = 'radial-gradient(circle at -999px -999px, black 65px, transparent 65px)'
      greenLayerRef.current.style.maskImage = init
      greenLayerRef.current.style.webkitMaskImage = init
    }
  }, [])

  // Aktualizujeme DOM přímo — žádný setState = žádné re-rendery = plynulý pohyb
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = photoContainerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Maska: černá (viditelná) uprostřed, průhledná vně
    if (greenLayerRef.current) {
      const g = `radial-gradient(circle at ${x}px ${y}px, black 65px, transparent 65px)`
      greenLayerRef.current.style.maskImage = g
      greenLayerRef.current.style.webkitMaskImage = g
    }

    // Zaměřovač sleduje kurzor — centrovaný na pozici myši (150px → offset 75)
    if (crosshairRef.current) {
      crosshairRef.current.style.transform = `translate(${x - 75}px, ${y - 75}px)`
    }
  }, [])

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
          <h2 ref={headingRef} style={{ lineHeight: 1.1 }}>
            <span className="h-line block"
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                color: '#050e1d',
                marginBottom: 6,
              }}>
              {d.nadpis1}
            </span>
            <span className="h-line block"
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                color: '#1E71C9',
              }}>
              {d.nadpis2}
            </span>
          </h2>

          {/* Tělo */}
          <p ref={bodyRef} className="text-gray-500 leading-relaxed text-[0.95rem] max-w-md">
            {d.perex}{d.perex && d.perexTucne ? ' ' : ''}
            {d.perexTucne && (
              <strong className="text-gray-800 font-semibold">{d.perexTucne}</strong>
            )}
            {d.perexPo ? ` ${d.perexPo}` : ''}
          </p>

          {/* Checklist */}
          <ul ref={listRef} className="flex flex-col gap-3.5 mb-8">
            {checkItems.map((item) => (
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

          <button
            onClick={openModal}
            className="group self-start inline-flex items-center gap-2
                       bg-brand-dark text-white px-7 py-3.5 rounded-full
                       text-sm font-semibold transition-all duration-300
                       hover:bg-brand-mid hover:gap-3"
          >
            Jdem do toho
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* ── Pravý sloupec — fotka ──────────────────────────── */}
        <div ref={imageRef} className="relative">
          <div
            className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-xl shadow-brand-dark/10"
            style={{ aspectRatio: '3 / 4' }}
          >
            {/* Dekorativní rámeček za fotkou */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-brand-blue/15 -z-10"
            />

            {/* Interaktivní dvouvrstvý obrázek */}
            <div
              ref={photoContainerRef}
              className="absolute inset-0 cursor-none-force"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Spodní vrstva — červené postavičky (vždy viditelné) */}
              <Image
                src="/onas-photo-red.png"
                alt="Tým Nice Job"
                fill
                className="object-cover"
              />

              {/* Horní vrstva — zelené postavičky, maska aktualizovaná přímo přes ref */}
              <div
                ref={greenLayerRef}
                className="absolute inset-0"
                style={{
                  opacity: isHovering ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  // maskImage záměrně NENÍ tady — React by ji přepsal při re-renderu
                  // Nastavujeme ji čistě imperativně v handleMouseMove
                }}
              >
                <Image
                  src="/onas-photo-green.png"
                  alt="Tým Nice Job — zelené postavičky"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Viditelný zaměřovač sledující kurzor */}
              <div
                ref={crosshairRef}
                className="absolute top-0 left-0 pointer-events-none"
                style={{
                  width: 150,
                  height: 150,
                  opacity: isHovering ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                  zIndex: 4,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/loga/zamerovac.svg"
                  alt=""
                  width={150}
                  height={150}
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            {/* Kartička overlay */}
            
          </div>
        </div>

      </div>
    </section>
  )
}
