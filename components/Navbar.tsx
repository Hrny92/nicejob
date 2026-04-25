'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useContactModal } from '@/context/ContactModalContext'

const navLinks = [
  { label: 'O nás',     href: '#o-nas'     },
  { label: 'Služby',    href: '#sluzby'    },
  { label: 'Proč my',   href: '#proc-my'   },
  { label: 'Reference', href: '#reference' },
]

export default function Navbar() {
  const { open: openModal } = useContactModal()
  const navRef       = useRef<HTMLElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)
  const listRef      = useRef<HTMLUListElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const menuRef      = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<(HTMLElement | null)[]>([])

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  /* ── Scroll → frosted glass ────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Desktop entrance animace ──────────────────────────── */
  useEffect(() => {
    const nav  = navRef.current
    const logo = logoRef.current
    const list = listRef.current
    const cta  = ctaRef.current
    if (!nav || !logo || !list || !cta) return

    const items = Array.from(list.children) as HTMLElement[]

    gsap.set(nav,   { y: -70, opacity: 0 })
    gsap.set(logo,  { opacity: 0, x: -14 })
    gsap.set(items, { opacity: 0, y: -10 })
    gsap.set(cta,   { opacity: 0, x: 14 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(nav,   { y: 0, opacity: 1, duration: 0.7 })
      .to(logo,  { opacity: 1, x: 0,  duration: 0.45 }, '-=0.4')
      .to(items, { opacity: 1, y: 0,  duration: 0.38, stagger: 0.07 }, '-=0.3')
      .to(cta,   { opacity: 1, x: 0,  duration: 0.45 }, '-=0.3')

    return () => {
      tl.kill()
      gsap.set([nav, logo, cta, ...items], { clearProps: 'all' })
    }
  }, [])

  /* ── Mobilní menu — animace vstupu ─────────────────────── */
  useEffect(() => {
    const menu = menuRef.current
    if (!menu || !menuOpen) return

    const items = menuItemsRef.current.filter(Boolean) as HTMLElement[]

    gsap.fromTo(menu,
      { opacity: 0, y: -18 },
      { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }
    )
    gsap.fromTo(items,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.32, stagger: 0.065, delay: 0.14, ease: 'power2.out' }
    )
  }, [menuOpen])

  /* ── Body scroll lock ──────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Zavřít menu s animací */
  const closeMenu = () => {
    const menu = menuRef.current
    if (menu) {
      gsap.to(menu, {
        opacity: 0, y: -14,
        duration: 0.26, ease: 'power2.in',
        onComplete: () => setMenuOpen(false),
      })
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
      {/* ── Hlavní navbar ─────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center
          px-6 md:px-8 lg:px-16 py-5
          transition-all duration-500
          ${scrolled
            ? 'bg-white shadow-sm shadow-brand-dark/5 border-b border-gray-100/60'
            : 'bg-transparent'}
        `}
      >
        {/* Logo */}
        <div ref={logoRef} className="flex-shrink-0">
          <Image src="/loga/logo-color.svg" alt="Nice Job" width={100} height={44} priority />
        </div>

        {/* Desktop links — přesně na středu viewportu */}
        <ul ref={listRef} className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-sm font-medium text-gray-700
                           hover:text-brand-blue transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-blue
                                 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — přitlačen doprava */}
        <div ref={ctaRef} className="hidden md:block ml-auto">
          <button
            onClick={openModal}
            className="group inline-flex items-center gap-2
                       bg-brand-dark text-white px-6 py-2.5 rounded-full
                       text-sm font-semibold transition-all duration-300
                       hover:bg-brand-mid hover:shadow-lg hover:shadow-brand-dark/25 hover:gap-3"
          >
            Napiš nám
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`
            md:hidden relative z-50 flex flex-col justify-center items-center
            w-9 h-9 gap-[5px] transition-colors duration-300
            ${scrolled || menuOpen ? 'text-brand-dark' : 'text-white'}
          `}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
        >
          <span className={`block h-px w-6 bg-current origin-center transition-all duration-300
            ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px w-6 bg-current transition-all duration-300
            ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block h-px w-6 bg-current origin-center transition-all duration-300
            ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* ── Mobilní menu overlay ───────────────────────────── */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col"
          style={{ background: 'linear-gradient(145deg, #050e1d 0%, #0B294A 55%, #13467D 100%)' }}
        >
          {/* Dot pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.18) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />

          {/* Obsah */}
          <div className="relative z-10 flex flex-col flex-1 px-8 pt-28 pb-10 justify-between">

            {/* Nav links */}
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={el => { menuItemsRef.current[i] = el }}
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-4
                             border-b border-white/8 text-white/75 hover:text-white
                             transition-colors duration-200"
                >
                  <span className="text-2xl font-semibold tracking-tight">{link.label}</span>
                  <span className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-lg">→</span>
                </Link>
              ))}
            </nav>

            {/* CTA + brand tag */}
            <div
              ref={el => { menuItemsRef.current[navLinks.length] = el }}
              className="flex flex-col gap-4 mt-8"
            >
              <button
                onClick={() => { closeMenu(); setTimeout(openModal, 320) }}
                className="flex items-center justify-center gap-2
                           bg-brand-dark text-white px-8 py-4 rounded-full
                           text-base font-semibold w-full
                           hover:bg-brand-mid transition-all duration-300"
              >
                Napiš nám →
              </button>
              <p className="text-center text-white/25 text-xs tracking-widest uppercase">
                Nice Job — HR s přidanou hodnotou
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
