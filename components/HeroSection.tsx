'use client'

import Image from 'next/image'
import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useContactModal } from '@/context/ContactModalContext'

export default function HeroSection() {
  const { open: openModal } = useContactModal()

  const sectionRef  = useRef<HTMLElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  const [imgLoaded, setImgLoaded] = useState(false)

  // ── Před prvním vyrenderováním skryj pozadí ───────────────
  useLayoutEffect(() => {
    if (bgRef.current) gsap.set(bgRef.current, { scale: 1.07, opacity: 0 })
  }, [])

  // ── Pre-nastav GSAP stavy na hero content ─────────────────
  useLayoutEffect(() => {
    const headlineLines = headlineRef.current?.querySelectorAll<HTMLElement>('span') ?? []
    gsap.set(badgeRef.current,           { opacity: 0, y: 24, scale: 0.94 })
    gsap.set(Array.from(headlineLines),  { opacity: 0, y: 38 })
    gsap.set(subtitleRef.current,        { opacity: 0, y: 22 })
    gsap.set(ctaRef.current,             { opacity: 0, y: 20, scale: 0.95 })
  }, [])

  // ── Animace po načtení obrázku ────────────────────────────
  useEffect(() => {
    if (!imgLoaded) return

    const headlineLines = headlineRef.current?.querySelectorAll<HTMLElement>('span') ?? []
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(bgRef.current,     { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, 0)
      tl.to(badgeRef.current,  { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.5)
      tl.to(headlineLines,     { opacity: 1, y: 0, duration: 0.65, stagger: 0.15 }, 0.7)
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.55 }, 1.1)
      tl.to(ctaRef.current,    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 1.3)

      gsap.to(badgeRef.current, {
        y: -6, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [imgLoaded])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050e1d' }}
    >
      {/* ── Fotografie na pozadí ───────────────────────────── */}
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

      {/* ── Tmavý overlay ──────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(5,14,29,0.72) 0%, rgba(5,14,29,0.58) 50%, rgba(5,14,29,0.78) 100%)' }}
      />

      {/* ── Obsah ──────────────────────────────────────────── */}
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
            onClick={() => openModal()}
            className="group inline-flex items-center gap-3 bg-white text-brand-dark px-9 py-4 rounded-full text-base font-semibold shadow-xl shadow-black/20 transition-all duration-300 hover:bg-brand-blue hover:text-white hover:shadow-2xl hover:shadow-brand-blue/30 hover:gap-5"
          >
            Chci zjistit více
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-lg">→</span>
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none" style={{ opacity: 0.45 }}>
        <span className="text-xs font-medium text-white tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
