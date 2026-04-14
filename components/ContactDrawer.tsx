'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const CONTACT = {
  name:     'Mgr. Zdeňka Kocandová',
  title:    'ředitelka společnosti',
  phone:    '+420 737 277 272',
  email:    'kocandova@mztraining.cz',
  linkedin: 'https://www.linkedin.com/in/zdenkakocandova/',
  web:      'https://mztraining.cz/',
  photo:    '/contact-photo.jpg',
}

export default function ContactDrawer() {
  const [visible, setVisible]     = useState(false)   // je drawer v DOM?
  const [imgError, setImgError]   = useState(false)   // fallback pro fotku

  const backdropRef  = useRef<HTMLDivElement>(null)
  const panelRef     = useRef<HTMLDivElement>(null)

  /* ── Otevření: nejdřív vložit do DOM, pak animovat ────── */
  const open = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    // panel je v DOM → spusť animaci
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    tl.fromTo(panelRef.current,
      { x: '100%' },
      { x: '0%', duration: 0.45 },
      '-=0.2'
    )
    tl.fromTo('.cdi',          // contact-drawer-item
      { opacity: 0, x: 18 },
      { opacity: 1, x: 0, stagger: 0.06, duration: 0.35 },
      '-=0.15'
    )
  }, [visible])

  /* ── Zavření: animovat pryč, pak odstranit z DOM ───────── */
  const close = useCallback(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onComplete: () => setVisible(false),
    })
    tl.to(panelRef.current,   { x: '100%', duration: 0.38 })
    tl.to(backdropRef.current,{ opacity: 0, duration: 0.25 }, '-=0.15')
  }, [])

  /* ── Escape key ────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    if (visible) window.addEventListener('keydown', onKey)
    return ()  => window.removeEventListener('keydown', onKey)
  }, [visible, close])

  /* ── Pulse na trigger tlačítku ─────────────────────────── */
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, {
      scale: 1.06,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <>
      {/* ── Trigger tab ─────────────────────────────────────── */}
      <button
        ref={btnRef}
        onClick={open}
        aria-label="Rychlý kontakt"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40
                   flex flex-col items-center gap-2
                   bg-brand-blue text-white
                   px-3 py-5 rounded-l-2xl
                   shadow-xl shadow-brand-blue/30
                   transition-colors duration-300 hover:bg-brand-mid
                   cursor-pointer select-none group"
      >
        <svg
          className="w-4 h-4 mb-1 transition-transform duration-300 group-hover:scale-110"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 6.338c0-.724.6-1.338 1.32-1.338h2.664c.613 0 1.138.416 1.295 1.01l.737 2.77a1.338 1.338 0 0 1-.54 1.434l-.99.726a11.251 11.251 0 0 0 5.318 5.318l.727-.99a1.338 1.338 0 0 1 1.434-.54l2.77.737c.594.157 1.01.682 1.01 1.295v2.664c0 .72-.614 1.32-1.338 1.32C8.393 21 3 15.607 3 8.888c0-.724-.014-2.55 0-2.55Z"
          />
        </svg>
        <span
          className="text-[11px] font-semibold tracking-widest uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Rychlý kontakt
        </span>
      </button>

      {/* ── Drawer — renderuje se jen když visible === true ── */}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end">

          {/* Backdrop */}
          <div
            ref={backdropRef}
            onClick={close}
            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className="relative z-10 w-full max-w-sm bg-white h-full
                       flex flex-col shadow-2xl shadow-brand-dark/20
                       overflow-y-auto"
          >
            {/* Zavřít */}
            <button
              onClick={close}
              className="cdi absolute top-5 right-5 z-10
                         w-9 h-9 rounded-full
                         flex items-center justify-center
                         bg-gray-100 hover:bg-red-50
                         text-gray-400 hover:text-red-500
                         transition-colors duration-200"
              aria-label="Zavřít"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hlavička */}
            <div className="cdi w-full pt-12 pb-8 px-8 flex flex-col items-center text-center
                            bg-gradient-to-br from-brand-dark via-brand-mid to-brand-blue">
              {/* Fotka / fallback */}
              <div className="w-28 h-28 rounded-full overflow-hidden
                              border-4 border-white/30 shadow-xl mb-5
                              bg-brand-mid/50 flex items-center justify-center">
                {!imgError ? (
                  <Image
                    src={CONTACT.photo}
                    alt={CONTACT.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="text-white text-3xl font-black select-none">ZK</span>
                )}
              </div>

              <h2 className="cdi text-white font-bold text-lg leading-tight mb-1">
                {CONTACT.name}
              </h2>
              <p className="cdi text-white/65 text-sm font-medium tracking-wide">
                {CONTACT.title}
              </p>
            </div>

            {/* Kontaktní položky */}
            <div className="flex flex-col px-6 py-6 gap-3">

              {/* Telefon */}
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="cdi group flex items-center gap-4 p-4 rounded-2xl
                           border border-gray-100 hover:border-brand-blue/30 hover:bg-blue-50/50
                           transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex-shrink-0
                                flex items-center justify-center
                                group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 6.338c0-.724.6-1.338 1.32-1.338h2.664c.613 0 1.138.416 1.295 1.01l.737 2.77a1.338 1.338 0 0 1-.54 1.434l-.99.726a11.251 11.251 0 0 0 5.318 5.318l.727-.99a1.338 1.338 0 0 1 1.434-.54l2.77.737c.594.157 1.01.682 1.01 1.295v2.664c0 .72-.614 1.32-1.338 1.32C8.393 21 3 15.607 3 8.888c0-.724-.014-2.55 0-2.55Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Telefon</p>
                  <p className="text-sm font-semibold text-gray-800">{CONTACT.phone}</p>
                </div>
              </a>

              {/* E-mail */}
              <a href={`mailto:${CONTACT.email}`}
                className="cdi group flex items-center gap-4 p-4 rounded-2xl
                           border border-gray-100 hover:border-brand-blue/30 hover:bg-blue-50/50
                           transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex-shrink-0
                                flex items-center justify-center
                                group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">E-mail</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{CONTACT.email}</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer"
                className="cdi group flex items-center gap-4 p-4 rounded-2xl
                           border border-gray-100 hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5
                           transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex-shrink-0
                                flex items-center justify-center
                                group-hover:bg-[#0A66C2] group-hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">LinkedIn</p>
                  <p className="text-sm font-semibold text-gray-800">Zdeňka Kocandová</p>
                </div>
              </a>

              {/* Web */}
              <a href={CONTACT.web} target="_blank" rel="noopener noreferrer"
                className="cdi group flex items-center gap-4 p-4 rounded-2xl
                           border border-gray-100 hover:border-brand-blue/30 hover:bg-blue-50/50
                           transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex-shrink-0
                                flex items-center justify-center
                                group-hover:bg-brand-blue group-hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Web</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">mztraining.cz</p>
                </div>
              </a>
            </div>

            {/* Footer */}
            <div className="mt-auto px-6 pb-8 pt-2">
              <div className="cdi rounded-2xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rádi zodpovíme vaše dotazy.<br />
                  <span className="text-brand-blue font-medium">Nice Job.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
