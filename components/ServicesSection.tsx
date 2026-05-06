'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SluzbaItem } from '@/lib/queries'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Knihovna ikon — přidejte libovolnou další
───────────────────────────────────────────────────────── */
const ICONS: Record<string, () => JSX.Element> = {
  recruit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      <path d="M11 8a3 3 0 0 1 0 6" /><path d="M14 11h1" />
    </svg>
  ),
  audit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  hunt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M22 12h-5M7 12H2M12 2v5M12 17v5" />
    </svg>
  ),
  culture: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  learn: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  strategy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12 2.1 6.2" />
      <path d="M12 12v-4" />
      <path d="m16 6 6-4" /><path d="m22 2-1 4h-4" />
    </svg>
  ),
  data: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  brand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  onboarding: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
  communication: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25}
      strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
}

/* ─────────────────────────────────────────────────────────
   SVG geometrie prstenů (konstanty)
───────────────────────────────────────────────────────── */
const SVG_SIZE = 340
const CX       = SVG_SIZE / 2
const CY       = SVG_SIZE / 2
const R_OUTER  = 158
const R_TRACK  = 122
const R_INNER  = 88
const CIRC     = 2 * Math.PI * R_TRACK

/* Pomocná funkce — pozice teček na prstenu */
function dotPositions(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (i * 2 * Math.PI / n) - Math.PI / 2
    return { x: CX + R_TRACK * Math.cos(angle), y: CY + R_TRACK * Math.sin(angle) }
  })
}

/* Padding pro čítač: 01, 02 … 09, 10, 11 … */
const pad = (n: number) => n < 10 ? `0${n}` : String(n)

/* Fallback pro případ že Sanity ještě nemá data */
const FALLBACK: SluzbaItem[] = []

/* ─────────────────────────────────────────────────────────
   Komponenta
───────────────────────────────────────────────────────── */
export default function ServicesSection({ sluzby = FALLBACK }: { sluzby?: SluzbaItem[] }) {
  const sectionRef     = useRef<HTMLElement>(null)
  const outerGroupRef  = useRef<SVGGElement>(null)
  const progressArcRef = useRef<SVGCircleElement>(null)
  const svcDotRefs     = useRef<(SVGCircleElement | null)[]>([])
  const iconRefs       = useRef<(HTMLDivElement | null)[]>([])
  const ghostNumRef    = useRef<HTMLSpanElement>(null)
  const textRefs       = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs        = useRef<(HTMLDivElement | null)[]>([])
  const activeRef      = useRef(0)

  const [isMobile, setIsMobile] = useState(false)

  const N = sluzby.length
  const DOT_POSITIONS = useMemo(() => dotPositions(N), [N])

  /* ── Detekce mobilního zařízení ─────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (N === 0) return
    const section = sectionRef.current
    if (!section) return

    /* Počáteční stavy */
    textRefs.current.forEach((p, i) =>
      p && gsap.set(p, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 })
    )
    iconRefs.current.forEach((el, i) =>
      el && gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.8 })
    )
    svcDotRefs.current.forEach((dot, i) => {
      if (!dot) return
      dot.setAttribute('r', i === 0 ? '7' : '4')
      dot.setAttribute('fill', i === 0 ? '#1E71C9' : 'rgba(30,113,201,0.30)')
    })

    const arc = progressArcRef.current
    if (arc) {
      arc.style.strokeDasharray  = String(CIRC)
      arc.style.strokeDashoffset = String(CIRC)
    }

    /* Rotace vnějšího prstenu */
    let outerAngle = 0
    let ringRaf: number
    const rotateOuter = () => {
      outerAngle = (outerAngle + 0.18) % 360
      outerGroupRef.current?.setAttribute('transform', `rotate(${outerAngle}, ${CX}, ${CY})`)
      ringRaf = requestAnimationFrame(rotateOuter)
    }
    ringRaf = requestAnimationFrame(rotateOuter)

    /* ScrollTrigger — délka scrollu závisí na počtu služeb */
    const totalScroll = window.innerHeight * N

    const st = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     `+=${totalScroll}`,
      pin:     true,
      scrub:   1.5,
      onUpdate: (self) => {
        if (arc) {
          arc.style.strokeDashoffset = String(CIRC * (1 - self.progress))
        }

        const idx = Math.min(N - 1, Math.floor(self.progress * N))

        svcDotRefs.current.forEach((dot, i) => {
          if (!dot) return
          dot.setAttribute('r', i === idx ? '7' : '4')
          dot.setAttribute('fill', i === idx ? '#1E71C9' : 'rgba(30,113,201,0.30)')
        })

        if (idx === activeRef.current) return
        activeRef.current = idx

        if (ghostNumRef.current) ghostNumRef.current.textContent = pad(idx + 1)

        iconRefs.current.forEach(el => el && gsap.killTweensOf(el))
        textRefs.current.forEach(el => el && gsap.killTweensOf(el))

        iconRefs.current.forEach((el, i) => {
          if (!el || i === idx) return
          gsap.set(el, { opacity: 0, scale: 0.8 })
        })
        textRefs.current.forEach((el, i) => {
          if (!el || i === idx) return
          gsap.set(el, { opacity: 0, y: i < idx ? -28 : 28 })
        })

        const nextIcon = iconRefs.current[idx]
        if (nextIcon) gsap.fromTo(nextIcon,
          { opacity: 0, scale: 1.15 },
          { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }
        )

        const nextP = textRefs.current[idx]
        if (nextP) gsap.fromTo(nextP,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
        )

        dotRefs.current.forEach((d, i) => {
          if (!d) return
          d.style.background = i === idx ? '#1E71C9' : 'rgba(255,255,255,0.18)'
          gsap.to(d, { width: i === idx ? 30 : 8, duration: 0.3, ease: 'power2.out', overwrite: true })
        })
      },
    })

    return () => {
      cancelAnimationFrame(ringRaf)
      st.kill()
    }
  }, [N]) // ← re-inicializuje se při změně počtu služeb

  /* ── Vypočítané rozměry prstenu ─────────────────────── */
  const ringSize = isMobile
    ? Math.min(220, typeof window !== 'undefined' ? window.innerWidth - 64 : 260)
    : SVG_SIZE
  const scale    = ringSize / SVG_SIZE
  const cardSize = Math.round(168 * scale)
  const iconSize = Math.round(70  * scale)

  if (N === 0) return null

  return (
    <section
      ref={sectionRef}
      id="sluzby"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #050e1d 0%, #0B294A 28%, #13467D 55%, #0B294A 80%, #050e1d 100%)' }}
    >
      {/* Mřížka bodů */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.2) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
      }} />

      {/* Ambientní záře */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full blur-[110px] opacity-[0.18]"
          style={{ width: 600, height: 600, top: '50%', left: '30%', transform: 'translate(-50%,-50%)', background: '#1E71C9' }} />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none opacity-35">
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(30,113,201,0.9), transparent)' }} />
      </div>

      {/* ── Layout ──────────────────────────────────────── */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16"
        style={isMobile
          ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', paddingTop: 72 }
          : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 8vw, 8rem)', alignItems: 'center' }
        }
      >
        {/* ── Levá strana — orbit ring ─────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: ringSize, height: ringSize }}>

            {/* Záře */}
            <div style={{
              position: 'absolute', inset: -20, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(30,113,201,0.35) 0%, transparent 65%)',
              filter: 'blur(32px)', pointerEvents: 'none',
            }} />

            {/* Ghost číslo */}
            {!isMobile && (
              <span ref={ghostNumRef} style={{
                position: 'absolute', top: -20, left: -10,
                fontSize: '9rem', fontWeight: 900,
                color: 'rgba(255,255,255,0.04)', lineHeight: 1,
                pointerEvents: 'none', userSelect: 'none',
                fontFamily: 'Roboto, sans-serif', zIndex: 0,
              }}>
                {pad(1)}
              </span>
            )}

            {/* SVG prsteny */}
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              width={ringSize} height={ringSize}
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, overflow: 'visible' }}
            >
              <defs>
                <filter id="svc-arc-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="svc-dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Vnější rotující prsten */}
              <g ref={outerGroupRef}>
                <circle cx={CX} cy={CY} r={R_OUTER}
                  fill="none" stroke="rgba(30,113,201,0.11)" strokeWidth={1} strokeDasharray="3 16" />
                {[0, 90, 180, 270].map(deg => {
                  const rad = (deg - 90) * Math.PI / 180
                  return (
                    <line key={deg}
                      x1={CX + (R_OUTER - 10) * Math.cos(rad)} y1={CY + (R_OUTER - 10) * Math.sin(rad)}
                      x2={CX + (R_OUTER + 10) * Math.cos(rad)} y2={CY + (R_OUTER + 10) * Math.sin(rad)}
                      stroke="rgba(30,113,201,0.50)" strokeWidth={1.5} strokeLinecap="round"
                    />
                  )
                })}
              </g>

              {/* Vnitřní dekorativní prsten */}
              <circle cx={CX} cy={CY} r={R_INNER}
                fill="none" stroke="rgba(30,113,201,0.09)" strokeWidth={1} />

              {/* Progress track */}
              <circle cx={CX} cy={CY} r={R_TRACK}
                fill="none" stroke="rgba(30,113,201,0.14)" strokeWidth={1.5}
                transform={`rotate(-90 ${CX} ${CY})`} />

              {/* Progress oblouk */}
              <circle
                ref={progressArcRef}
                cx={CX} cy={CY} r={R_TRACK}
                fill="none" stroke="#1E71C9" strokeWidth={2} strokeLinecap="round"
                transform={`rotate(-90 ${CX} ${CY})`}
                filter="url(#svc-arc-glow)"
              />

              {/* Tečky na prstenu — dynamicky podle N */}
              {DOT_POSITIONS.map(({ x, y }, i) => (
                <circle
                  key={i}
                  ref={el => { svcDotRefs.current[i] = el }}
                  cx={x} cy={y} r={4}
                  fill="rgba(30,113,201,0.30)"
                />
              ))}
            </svg>

            {/* Střední karta s ikonou */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: cardSize, height: cardSize,
              borderRadius: Math.round(24 * scale),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 2, overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', width: iconSize, height: iconSize }}>
                {sluzby.map((s, i) => {
                  const IconComp = ICONS[s.ikona] ?? ICONS['recruit']
                  return (
                    <div
                      key={s._id}
                      ref={el => { iconRefs.current[i] = el }}
                      style={{ position: 'absolute', inset: 0, color: 'rgba(255,255,255,0.90)' }}
                    >
                      <IconComp />
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── Pravá strana — text ─────────────────────── */}
        <div style={{ width: '100%' }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 16 : 32 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622', flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Naše služby
            </span>
          </div>

          {/* Překryté textové panely */}
          <div style={{ position: 'relative', minHeight: isMobile ? 220 : 380 }}>
            {sluzby.map((s, i) => (
              <div
                key={s._id}
                ref={el => { textRefs.current[i] = el }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
              >
                {/* Počítadlo */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: isMobile ? 10 : 20 }}>
                  <span style={{
                    fontSize: isMobile ? '2.4rem' : '3.8rem',
                    fontWeight: 900, color: 'rgba(255,255,255,0.07)',
                    lineHeight: 1, fontFamily: 'Roboto, system-ui, sans-serif',
                  }}>
                    {pad(i + 1)}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 14 }}>
                    / {pad(N)}
                  </span>
                </div>

                {/* Nadpis */}
                <h2 style={{
                  fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 900,
                  fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.7rem)' : 'clamp(1.8rem, 2.8vw, 2.5rem)',
                  color: '#fff', lineHeight: 1.15, marginBottom: isMobile ? 10 : 20,
                }}>
                  {s.nazev}
                </h2>

                {/* Popis */}
                <p style={{
                  color: 'rgba(255,255,255,0.58)',
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  lineHeight: 1.75, marginBottom: isMobile ? 0 : 28, maxWidth: 460,
                }}>
                  {s.popis}
                </p>

                {/* Detaily — skryté na mobilu */}
                {!isMobile && s.detaily && s.detaily.length > 0 && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {s.detaily.map((d, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.72)', fontSize: '0.875rem' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E71C9', flexShrink: 0, boxShadow: '0 0 7px rgba(30,113,201,0.9)' }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Progress tečky */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: isMobile ? 20 : 44 }}>
            {sluzby.map((_, i) => (
              <div
                key={i}
                ref={el => { dotRefs.current[i] = el }}
                style={{
                  height: 3, borderRadius: 999,
                  background: i === 0 ? '#1E71C9' : 'rgba(255,255,255,0.18)',
                  width: i === 0 ? 30 : 8, transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
