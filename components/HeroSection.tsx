'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = headlineRef.current
      if (!headline) return

      // Animujeme přímo oba spany nadpisu (bez word-split, který by zničil styling)
      const headlineLines = headline.querySelectorAll<HTMLElement>('span')

      /* ── Master timeline ───────────────────────────────── */
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } })

      // Video gentle zoom-out on load
      tl.from(videoRef.current, {
        scale: 1.06,
        duration: 2.2,
        ease: 'power2.out',
      }, 0)

      // Overlay fade
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 0)

      // Badge
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.94,
        duration: 0.65,
      }, 0.35)

      // Headline — oba řádky postupně vyjedou zdola
      tl.from(headlineLines, {
        opacity: 0,
        y: 36,
        duration: 0.72,
        stagger: 0.18,
        ease: 'power3.out',
      }, 0.6)

      // Subtitle
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.65,
      }, 1.05)

      // CTA button
      tl.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, 1.25)

      /* ── Subtle float on badge ─────────────────────────── */
      gsap.to(badgeRef.current, {
        y: -6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Video background ─────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/hero-video.mp4"
      />

      {/* ── White overlay — keeps the "airy" brand feel ─── */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,0.72) 0%,
              rgba(255,255,255,0.60) 50%,
              rgba(255,255,255,0.78) 100%
            )
          `,
        }}
      />

      {/* ── Oválný vignette — bílé kraje, průhledný střed ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 80% 90% at 50% 50%,
            transparent       0%,
            transparent      35%,
            rgba(255,255,255,0.55) 78%,
            rgba(255,255,255,0.88) 93%,
            #ffffff           100%
          )`,
        }}
      />

      {/* ── Decorative gradient blobs ────────────────────── */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1E71C9 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[440px] h-[440px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0B294A 0%, transparent 70%)' }}
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-0">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2
                     bg-white/80 backdrop-blur-sm
                     text-brand-mid text-sm font-semibold
                     px-5 py-2 rounded-full mb-10
                     border border-brand-blue/20
                     shadow-sm shadow-brand-blue/10"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-brand-red"
          />
          HR agentura | Praha
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="mb-8 max-w-5xl"
          style={{ lineHeight: 1.08 }}
        >
          <span className="block"
            style={{
              fontFamily: 'Roboto, system-ui, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              color: '#050e1d',
              marginBottom: 8,
            }}>
            Najdeme talent, který
          </span>
          <span className="block"
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              color: '#1E71C9',
            }}>
            vaší firmu posune dál.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-gray-500
                     leading-relaxed max-w-xl mb-12"
        >
          Firmám přivádíme lidi, kteří je posunou, a talentům otevíráme dveře do míst, kde mohou skutečně růst.
          <span className="text-brand-mid font-medium"> NICEJOB.</span>{' '}
          Protože na skvělých lidech záleží nejvíc.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <a
            href="#o-nas"
            className="group inline-flex items-center gap-3
                       bg-brand-dark text-white
                       px-9 py-4 rounded-full
                       text-base font-semibold
                       shadow-xl shadow-brand-dark/25
                       transition-all duration-300
                       hover:bg-brand-mid
                       hover:shadow-2xl hover:shadow-brand-mid/30
                       hover:gap-5"
          >
            Chci zjistit více
            <span
              className="inline-block transition-transform duration-300
                         group-hover:translate-x-1 text-lg"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* ── Bottom fade — plynulý přechod do bílé ────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 40%, #ffffff 100%)',
        }}
      />

      {/* ── Scroll indicator ─────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30
                   flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-xs font-medium text-brand-dark tracking-widest uppercase">
          Scroll
        </span>
        <div
          className="w-px h-10 bg-gradient-to-b from-brand-blue to-transparent
                     animate-[shimmer_2s_ease-in-out_infinite]"
        />
      </div>
    </section>
  )
}
