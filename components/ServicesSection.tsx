'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { SluzbaItem } from '@/lib/queries'

gsap.registerPlugin(ScrollTrigger)

const pad = (n: number) => String(n).padStart(2, '0')
const LOCAL_FALLBACKS = ['/nabor.jpg', '/headhunting.jpg', '/skoleni.jpg']
const getOffsetX = (i: number, vw: number) => (i % 2 === 0 ? 1 : -1) * vw * 0.22

// ─── Desktop: GSAP flip karta ────────────────────────────────────────────────
function DesktopServices({ sluzby }: { sluzby: SluzbaItem[] }) {
  const sectionRef  = useRef<HTMLElement>(null)
  const cardRef     = useRef<HTMLDivElement>(null)
  const frontImgRef = useRef<HTMLImageElement>(null)
  const backImgRef  = useRef<HTMLImageElement>(null)
  const lastFlips   = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  const N = sluzby.length
  const imageUrls = useMemo(
    () => sluzby.map((s, i) => s.fotoUrl || LOCAL_FALLBACKS[i % LOCAL_FALLBACKS.length]),
    [sluzby],
  )

  useEffect(() => {
    if (N === 0 || !sectionRef.current || !cardRef.current) return

    if (frontImgRef.current) frontImgRef.current.src = imageUrls[0]
    if (backImgRef.current)  backImgRef.current.src  = imageUrls[Math.min(1, N - 1)]

    const vw   = window.innerWidth
    const LEGS = Math.max(N - 1, 1)
    const SEG  = 1 / LEGS

    const getFaces = (fd: number) => {
      const isOdd = fd % 2 === 1
      return {
        frontIdx: isOdd ? Math.min(fd + 1, N - 1) : fd,
        backIdx:  isOdd ? fd : Math.min(fd + 1, N - 1),
      }
    }

    gsap.set(cardRef.current, { x: getOffsetX(0, vw), rotateY: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   0.6,
        onUpdate(self) {
          const totalRot  = self.progress * LEGS * 180
          const flipsDone = Math.min(Math.floor(totalRot / 180), N - 1)
          setActiveIdx(Math.min(Math.round(self.progress * LEGS), N - 1))
          if (flipsDone !== lastFlips.current) {
            lastFlips.current = flipsDone
            const { frontIdx, backIdx } = getFaces(flipsDone)
            if (frontImgRef.current) frontImgRef.current.src = imageUrls[frontIdx]
            if (backImgRef.current)  backImgRef.current.src  = imageUrls[backIdx]
          }
        },
      },
    })

    sluzby.forEach((_, i) => {
      if (i === 0) return
      tl.to(cardRef.current, {
        x:       getOffsetX(i, vw),
        rotateY: -(i * 180),
        ease:    'power2.inOut',
        duration: SEG,
      }, (i - 1) * SEG)
    })

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(st => st.kill()) }
  }, [N, imageUrls]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      id="sluzby"
      className="relative"
      style={{
        background: 'linear-gradient(145deg, #050e1d 0%, #0B294A 28%, #13467D 55%, #0B294A 80%, #050e1d 100%)',
        height: `${N * 100}vh`,
      }}
    >
      {/* Label */}
      <div className="sticky top-0 h-0 z-30 pointer-events-none overflow-visible">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-28 flex items-center gap-3">
          <div className="w-7 h-px bg-white/30" />
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-white/50">Naše služby</span>
        </div>
      </div>

      {/* Sticky vrstva — karta */}
      <div className="sticky top-0 h-screen z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.18) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}>
          <div
            ref={cardRef}
            style={{ width: 'min(380px, 38vw)', height: 'min(380px, 38vw)', transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {/* Přední strana */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={frontImgRef} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(5,14,29,0.6) 0%, transparent 100%)' }} />
            </div>
            {/* Zadní strana */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={backImgRef} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(5,14,29,0.6) 0%, transparent 100%)' }} />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 flex items-center gap-4">
          {sluzby.map((_, j) => (
            <div key={j} className="h-px flex-1 transition-all duration-700" style={{ backgroundColor: j === activeIdx ? '#1E71C9' : 'rgba(255,255,255,0.10)' }} />
          ))}
          <span className="font-mono text-xs tracking-widest shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {pad(activeIdx + 1)}&nbsp;/&nbsp;{pad(N)}
          </span>
        </div>
      </div>

      {/* Textové bloky */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {sluzby.map((s, i) => {
          const isLeft   = i % 2 === 0
          const isActive = i === activeIdx
          return (
            <div key={s._id} className="absolute left-0 right-0" style={{ top: `${i * 100}vh`, height: '100vh' }}>
              <div
                className="pointer-events-auto"
                style={{
                  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                  ...(isLeft
                    ? { left: 'max(2rem, calc((100vw - 80rem) / 2 + 2.5rem))', maxWidth: '34vw', minWidth: '220px' }
                    : { right: 'max(2rem, calc((100vw - 80rem) / 2 + 2.5rem))', maxWidth: '34vw', minWidth: '220px', textAlign: 'right' as const }),
                  opacity: isActive ? 1 : 0.18,
                  transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div className={`flex items-center gap-3 mb-5 ${!isLeft ? 'justify-end' : ''}`}>
                  <span className={`font-mono text-sm transition-colors duration-500 ${!isLeft ? 'order-2' : ''}`} style={{ color: isActive ? '#5ba3f5' : 'rgba(255,255,255,0.22)' }}>
                    {pad(i + 1)}
                  </span>
                  <div className="h-px w-10 transition-colors duration-500" style={{ backgroundColor: isActive ? 'rgba(91,163,245,0.40)' : 'rgba(255,255,255,0.10)' }} />
                </div>
                <h2 className="font-black leading-tight mb-4 transition-colors duration-500" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 'clamp(1.6rem, 2.6vw, 2.8rem)', color: isActive ? '#ffffff' : 'rgba(255,255,255,0.18)' }}>
                  {s.nazev}
                </h2>
                <p className="leading-relaxed transition-colors duration-500" style={{ fontSize: '0.95rem', maxWidth: '500px', marginLeft: isLeft ? 0 : 'auto', color: isActive ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.13)', whiteSpace: 'pre-wrap' }}>
                  {s.popis}
                </p>
                {s.detaily && s.detaily.length > 0 && (
                  <ul className="hidden lg:flex flex-col mt-5" style={{ gap: 9, alignItems: isLeft ? 'flex-start' : 'flex-end' }}>
                    {s.detaily.map((d, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm transition-colors duration-500" style={{ color: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.11)', flexDirection: isLeft ? 'row' : 'row-reverse' }}>
                        <span className="rounded-full shrink-0" style={{ width: 5, height: 5, background: '#1E71C9', opacity: isActive ? 1 : 0.25 }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Preloader */}
      <div style={{ display: 'none' }} aria-hidden>
        {imageUrls.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={url} alt="" />
        ))}
      </div>
    </section>
  )
}

// ─── Mobile: jednoduchý grid obrázek + text ──────────────────────────────────
function MobileServices({ sluzby }: { sluzby: SluzbaItem[] }) {
  return (
    <section
      id="sluzby"
      style={{
        background: 'linear-gradient(145deg, #050e1d 0%, #0B294A 28%, #13467D 55%, #0B294A 80%, #050e1d 100%)',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.18) 1px, transparent 1px)', backgroundSize: '38px 38px' }} />

      <div className="relative px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-7 h-px bg-white/30" />
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-white/50">Naše služby</span>
        </div>

        <div className="flex flex-col gap-14">
          {sluzby.map((s, i) => {
            const imgUrl = s.fotoUrl || LOCAL_FALLBACKS[i % LOCAL_FALLBACKS.length]
            return (
              <div key={s._id}>
                <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 14, overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 16px 40px rgba(0,0,0,0.45)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={s.nazev} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs" style={{ color: 'rgba(91,163,245,0.7)' }}>{pad(i + 1)}</span>
                  <div className="h-px w-6" style={{ backgroundColor: 'rgba(91,163,245,0.25)' }} />
                </div>
                <h2 className="font-black leading-tight mb-3" style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 'clamp(1.4rem, 6vw, 1.8rem)', color: '#ffffff' }}>
                  {s.nazev}
                </h2>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', whiteSpace: 'pre-wrap' }}>
                  {s.popis}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Export — desktop / mobile ───────────────────────────────────────────────
export default function ServicesSection({ sluzby = [] }: { sluzby?: SluzbaItem[] }) {
  if (sluzby.length === 0) return null
  return (
    <>
      <div className="hidden md:block"><DesktopServices sluzby={sluzby} /></div>
      <div className="md:hidden"><MobileServices sluzby={sluzby} /></div>
    </>
  )
}
