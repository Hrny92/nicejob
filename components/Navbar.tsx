'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'O nás',     href: '#o-nas'     },
  { label: 'Služby',    href: '#sluzby'    },
  { label: 'Proč my',   href: '#proc-my'   },
  { label: 'Reference', href: '#reference' },
  { label: 'Kontakt',   href: '#kontakt'   },
]

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null)
  const logoRef  = useRef<HTMLDivElement>(null)
  const listRef  = useRef<HTMLUListElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  /* ── Scroll → frosted glass po opuštění hero ──────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Entrance animace ──────────────────────────────────── */
  useEffect(() => {
    const nav   = navRef.current
    const logo  = logoRef.current
    const list  = listRef.current
    const cta   = ctaRef.current
    if (!nav || !logo || !list || !cta) return

    const items = Array.from(list.children) as HTMLElement[]

    // 1. Explicitně nastav počáteční stav
    gsap.set(nav,   { y: -70, opacity: 0 })
    gsap.set(logo,  { opacity: 0, x: -14 })
    gsap.set(items, { opacity: 0, y: -10 })
    gsap.set(cta,   { opacity: 0, x: 14 })

    // 2. Animuj do finálního stavu (gsap.to = předvídatelné)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to(nav,   { y: 0, opacity: 1, duration: 0.7 })
      .to(logo,  { opacity: 1, x: 0, duration: 0.45 }, '-=0.4')
      .to(items, { opacity: 1, y: 0,  duration: 0.38, stagger: 0.07 }, '-=0.3')
      .to(cta,   { opacity: 1, x: 0, duration: 0.45 }, '-=0.3')

    // 3. Cleanup: zastav animaci a vždy obnov viditelnost
    return () => {
      tl.kill()
      gsap.set([nav, logo, cta, ...items], { clearProps: 'all' })
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-8 lg:px-16 py-5
        transition-all duration-500
        ${scrolled
          ? 'bg-white/100 shadow-sm shadow-brand-dark/5 border-b border-gray-100/60'
          : 'bg-transparent'}
      `}
    >
      {/* Logo */}
      <div ref={logoRef} className="flex-shrink-0">
        <Image
          src="/loga/logo-color.svg"
          alt="Nice Job"
          width={100}
          height={44}
          priority
        />
      </div>

      {/* Nav links */}
      <ul ref={listRef} className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="relative text-sm font-medium text-gray-700
                         hover:text-brand-blue transition-colors duration-200
                         group"
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-blue
                           transition-all duration-300 group-hover:w-full"
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA tlačítko Kontakt */}
      <div ref={ctaRef} className="hidden md:block">
        <Link
          href="#kontakt"
          className="group inline-flex items-center gap-2
                     bg-brand-dark text-white
                     px-6 py-2.5 rounded-full
                     text-sm font-semibold
                     transition-all duration-300
                     hover:bg-brand-mid
                     hover:shadow-lg hover:shadow-brand-dark/25
                     hover:gap-3"
        >
          Kontakt
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </nav>
  )
}
