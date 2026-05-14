'use client'

import Image from 'next/image'
import { useRef, useEffect, useLayoutEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { useContactModal } from '@/context/ContactModalContext'

const PEOPLE = [
  { left: '6%',  top: '10%', size: 105, rot: -5  },
  { left: '18%', top: '66%', size: 88,  rot:  8  },
  { left: '31%', top: '14%', size: 145, rot: -10 },
  { left: '48%', top: '52%', size: 92,  rot:  12 },
  { left: '57%', top: '20%', size: 125, rot: -7  },
  { left: '70%', top: '70%', size: 112, rot:  5  },
  { left: '83%', top: '12%', size: 98,  rot: -14 },
  { left: '89%', top: '52%', size: 78,  rot:  10 },
  { left: '10%', top: '80%', size: 132, rot: -3  },
  { left: '50%', top: '78%', size: 82,  rot:  6  },
  { left: '76%', top: '35%', size: 155, rot: -8  },
]

const CROSSHAIR_SIZE = 220
const REVEAL_RADIUS  = 82
const MASK_HIDDEN    = 'radial-gradient(circle at -999px -999px, black 0px, transparent 0px)'

export default function HeroSection() {
  const { open: openModal } = useContactModal()

  const sectionRef     = useRef<HTMLElement>(null)
  const bgRef          = useRef<HTMLDivElement>(null)
  const contentRef     = useRef<HTMLDivElement>(null)
  const badgeRef       = useRef<HTMLDivElement>(null)
  const headlineRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef         = useRef<HTMLDivElement>(null)
  const crosshairRef   = useRef<HTMLDivElement>(null)
  const revealLayerRef = useRef<HTMLDivElement>(null)

  const [imgLoaded, setImgLoaded] = useState(false)

  // ── Před prvním vyrenderováním skryj veškerý obsah a pozadí ──────────────
  // useLayoutEffect = synchronně před tím než prohlížeč vykreslí
  useLayoutEffect(() => {
    if (contentRef.current) gsap.set(contentRef.current, { opacity: 0 })
    if (bgRef.current)      gsap.set(bgRef.current, { scale: 1.07, opacity: 0 })
  }, [])

  // ── Spusť animaci až po načtení obrázku ──────────────────────────────────
  useEffect(() => {
    if (!imgLoaded) return

    const headlineLines = headlineRef.current?.querySelectorAll<HTMLElement>('span') ?? []
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Nejdříve obrázek — zoom-out + fade in
      tl.to(bgRef.current, { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, 0)

      // 2. Pak obsah
      tl.to(badgeRef.current,   { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.5)
      tl.to(headlineLines,      { opacity: 1, y: 0, duration: 0.65, stagger: 0.15 }, 0.7)
      tl.to(subtitleRef.current,{ opacity: 1, y: 0, duration: 0.55 }, 1.1)
      tl.to(ctaRef.current,     { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 1.3)

      // Badge float — po animaci
      gsap.to(badgeRef.current, {
        y: -6, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [imgLoaded])

  // ── Pre-nastav GSAP stavy na hero content — před prvním renderem ─────────
  useLayoutEffect(() => {
    const headlineLines = headlineRef.current?.querySelectorAll<HTMLElement>('span') ?? []
    gsap.set(badgeRef.current,    { opacity: 0, y: 24, scale: 0.94 })
    gsap.set(Array.from(headlineLines), { opacity: 0, y: 38 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 22 })
    gsap.set(ctaRef.current,      { opacity: 0, y: 20, scale: 0.95 })
  }, [])

  // ── Pohyb zaměřovače ─────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (crosshairRef.current) {
      crosshairRef.current.style.transform = `translate(${x - CROSSHAIR_SIZE / 2}px, ${y - CROSSHAIR_SIZE / 2}px)`
      crosshairRef.current.style.opacity = '1'
    }
    if (revealLayerRef.current) {
      const mask = `radial-gradient(circle at ${x}px ${y}px, black ${REVEAL_RADIUS}px, transparent ${REVEAL_RADIUS + 10}px)`
      revealLayerRef.current.style.maskImage = mask
      revealLayerRef.current.style.webkitMaskImage = mask
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (crosshairRef.current) crosshairRef.current.style.opacity = '0'
    if (revealLayerRef.current) {
      revealLayerRef.current.style.maskImage = MASK_HIDDEN
      revealLayerRef.current.style.webkitMaskImage = MASK_HIDDEN
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden md:cursor-none-force"
      style={{ backgroundColor: '#050e1d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Fotografie na pozadí ───────────────────────────────────────────── */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* ── Tmavý overlay ──────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(5,14,29,0.72) 0%, rgba(5,14,29,0.58) 50%, rgba(5,14,29,0.78) 100%)' }}
      />

      {/* ── Panáčci + zaměřovač — pouze desktop ─────────────────────────── */}
      <div className="hidden md:contents">
        {/* VRSTVA 1: Neviditelní panáčci (opacity 0 vždy) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {PEOPLE.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src="/people.svg" alt=""
              style={{ position: 'absolute', left: p.left, top: p.top, height: p.size, width: 'auto', transform: `rotate(${p.rot}deg)`, opacity: 0, userSelect: 'none' }}
            />
          ))}
        </div>

        {/* VRSTVA 2: Reveal panáčci — maska skryta od začátku v JSX */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            willChange: 'mask-image',
            maskImage: MASK_HIDDEN,
            WebkitMaskImage: MASK_HIDDEN,
          } as React.CSSProperties}
        >
          {PEOPLE.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src="/people.svg" alt=""
              style={{ position: 'absolute', left: p.left, top: p.top, height: p.size, width: 'auto', transform: `rotate(${p.rot}deg)`, opacity: 0.9, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))', userSelect: 'none' }}
            />
          ))}
        </div>

        {/* Zaměřovač */}
        <div ref={crosshairRef} className="absolute top-0 left-0 pointer-events-none select-none z-30"
          style={{ width: CROSSHAIR_SIZE, height: CROSSHAIR_SIZE, opacity: 0, transition: 'opacity 0.25s ease', willChange: 'transform' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/loga/zamerovac.svg" alt="" width={CROSSHAIR_SIZE} height={CROSSHAIR_SIZE} style={{ display: 'block' }} />
        </div>
      </div>

      {/* ── Obsah — skrytý do načtení obrázku ─────────────────────────────── */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 text-sm font-semibold px-5 py-2 rounded-full mb-10 border border-white/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
          HR agentura | Praha
        </div>

        <h1 ref={headlineRef} className="mb-8 max-w-5xl" style={{ lineHeight: 1.08 }}>
          <span className="block" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#ffffff', marginBottom: 8 }}>
            Najdeme talent, který
          </span>
          <span className="block" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', color: '#5ba3f5' }}>
            vaší firmu posune dál.
          </span>
        </h1>

        <p ref={subtitleRef} className="text-base sm:text-lg leading-relaxed max-w-xl mb-12" style={{ color: 'rgba(255,255,255,0.62)' }}>
          Firmám přivádíme lidi, kteří je posunou, a talentům otevíráme dveře do míst,
          kde mohou skutečně růst.{' '}
          <span style={{ color: '#5ba3f5', fontWeight: 500 }}>NICEJOB.</span>{' '}
          Protože na skvělých lidech záleží nejvíc.
        </p>

        <div ref={ctaRef} className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="group inline-flex items-center gap-3 bg-white text-brand-dark px-9 py-4 rounded-full text-base font-semibold shadow-xl shadow-black/20 transition-all duration-300 hover:bg-brand-blue hover:text-white hover:shadow-2xl hover:shadow-brand-blue/30 hover:gap-5"
          >
            Chci zjistit více
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-lg">→</span>
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none" style={{ opacity: 0.45 }}>
        <span className="text-xs font-medium text-white tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
