'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { PodsluzbaItem } from '@/lib/queries'

const FALLBACK: PodsluzbaItem[] = [
  { _key: 'f1', nazev: 'Nastavení náborového procesu',  popis: 'Od zadání pozice přes screening kandidátů až po strukturu pohovorů a rozhodování.' },
  { _key: 'f2', nazev: 'Vzdělávání v oblasti HR',        popis: 'Školení manažerů, jak vést pohovory, hodnotit kandidáty a dávat zpětnou vazbu.' },
  { _key: 'f3', nazev: 'Správa náborových kanálů',       popis: 'LinkedIn, pracovní portály, kariérní profily a databáze uchazečů.' },
  { _key: 'f4', nazev: 'Tvorba pracovních inzerátů',     popis: 'Aby pozice byla srozumitelná, atraktivní a zároveň realistická.' },
  { _key: 'f5', nazev: 'Audit náboru',                   popis: 'Vyhodnocení toho, kde se kandidáti ztrácejí a proč se nedaří obsadit konkrétní role.' },
  { _key: 'f6', nazev: 'Employer branding',              popis: 'Jak firmu představit kandidátům — v inzerci, na LinkedInu i během pohovorů.' },
  { _key: 'f7', nazev: 'Onboarding nových zaměstnanců',  popis: 'Jak nového člověka převzít po nástupu, aby spolupráce neskončila po zkušební době.' },
  { _key: 'f8', nazev: 'Strukturované pohovory',         popis: 'Příprava otázek, hodnoticích formulářů a jasných pravidel pro porovnání kandidátů.' },
  { _key: 'f9', nazev: 'Retenční rizika',                popis: 'Jak rozpoznat, proč lidé odcházejí, a co zlepšit ve vedení, komunikaci nebo nastavení role.' },
]

const GAP = 16

export default function ServicesAccordion({ podsluzby }: { podsluzby?: PodsluzbaItem[] }) {
  const ITEMS = podsluzby?.length ? podsluzby : FALLBACK
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sliderRef  = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [step, setStep]           = useState(0) // px per card

  // Compute card width = (containerWidth - 2*gap) / 3
  useEffect(() => {
    const calc = () => {
      if (!wrapperRef.current) return
      const w = wrapperRef.current.offsetWidth
      setStep((w - 2 * GAP) / 3 + GAP)
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  const maxIdx = ITEMS.length - 3

  const goTo = useCallback((idx: number) => {
    const target = Math.max(0, Math.min(idx, maxIdx))
    setActiveIdx(target)
    sliderRef.current?.scrollTo({ left: target * step, behavior: 'smooth' })
  }, [step, maxIdx])

  // Sync dot indicator on native scroll (touch / trackpad)
  const onScroll = useCallback(() => {
    if (!sliderRef.current || step === 0) return
    const idx = Math.round(sliderRef.current.scrollLeft / step)
    setActiveIdx(Math.max(0, Math.min(idx, maxIdx)))
  }, [step, maxIdx])

  return (
    <section id="sluzby-detail" className="bg-white" style={{ padding: 'clamp(5rem, 10vw, 8rem) 0' }}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Heading + arrows */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-px" style={{ background: 'rgba(5,14,29,0.2)' }} />
              <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: 'rgba(5,14,29,0.4)' }}>
                HR poradenství
              </span>
            </div>
            <h2
              className="font-black leading-tight"
              style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#050e1d' }}
            >
              Co vše v poradenství{' '}
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: '#1E71C9' }}>
                řešíme
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Prev */}
            <button
              onClick={() => goTo(activeIdx - 1)}
              disabled={activeIdx === 0}
              aria-label="Předchozí"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid rgba(5,14,29,0.15)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: activeIdx === 0 ? 'default' : 'pointer',
                opacity: activeIdx === 0 ? 0.3 : 1,
                transition: 'opacity 0.2s',
                color: '#050e1d',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Next */}
            <button
              onClick={() => goTo(activeIdx + 1)}
              disabled={activeIdx >= maxIdx}
              aria-label="Další"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid rgba(5,14,29,0.15)',
                background: activeIdx >= maxIdx ? 'transparent' : '#050e1d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: activeIdx >= maxIdx ? 'default' : 'pointer',
                opacity: activeIdx >= maxIdx ? 0.3 : 1,
                transition: 'opacity 0.2s, background 0.2s',
                color: activeIdx >= maxIdx ? '#050e1d' : '#ffffff',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={wrapperRef}
          style={{ position: 'relative' }}
        >
          <div
            ref={sliderRef}
            onScroll={onScroll}
            style={{
              display: 'flex',
              gap: GAP,
              overflowX: 'scroll',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch' as never,
              cursor: 'grab',
            }}
          >
            <style>{`.nicejob-slider::-webkit-scrollbar { display: none; }`}</style>

            {ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  // Exactly 1/3 of container minus gaps
                  width: `calc((100% - ${2 * GAP}px) / 3)`,
                  scrollSnapAlign: 'start',
                  background: '#f4f7fb',
                  borderRadius: 14,
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  userSelect: 'none',
                  minHeight: 200,
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#1E71C9', opacity: 0.7 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#050e1d', lineHeight: 1.35, margin: 0 }}>
                  {item.nazev}
                </h3>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(5,14,29,0.5)', margin: 0 }}>
                  {item.popis}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Přejít na položku ${i + 1}`}
              style={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: activeIdx === i ? '#1E71C9' : 'rgba(5,14,29,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
