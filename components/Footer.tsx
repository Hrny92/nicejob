'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useContactModal } from '@/context/ContactModalContext'

const NAV_LINKS = [
  { label: 'O nás',              href: '/#o-nas'            },
  { label: 'Služby',             href: '/#sluzby'           },
  { label: 'Proč my',            href: '/#proc-my'          },
  { label: 'Pracovní nabídky',   href: '/pozice'            },
  { label: 'Reference',          href: '/#reference'        },
]

const LEGAL_LINKS = [
  { label: 'Ochrana osobních údajů', href: '/gdpr'    },
  { label: 'Nastavení cookies',       href: '/cookies' },
]

export default function Footer() {
  const { open: openModal } = useContactModal()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #050e1d 0%, #0B294A 60%, #050e1d 100%)',
        borderTop: '1px solid rgba(30,113,201,0.12)',
      }}
    >
      {/* Tečkový vzor */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.08) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Hlavní oblast ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 md:py-20
                        border-b border-white/[0.06]">

          {/* Sloupec 1 — Logo + tagline */}
          <div className="flex flex-col gap-5">
            <Image
              src="/loga/logo-white.svg"
              alt="Nice Job"
              width={110}
              height={48}
            />
            <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: 240 }}>
              Moderní HR agentura s&nbsp;lidským přístupem. Najdeme talent, který vaší firmu posune dál.
            </p>

            {/* Červený akcent dot — echo loga */}
            <div className="flex items-center gap-2 mt-1">
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622' }} />
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Praha, Česká republika
              </span>
            </div>
          </div>

          {/* Sloupec 2 — Navigace */}
          <div className="flex flex-col gap-4">
            <span style={{ color: 'rgba(255,255,255,0.30)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
              Navigace
            </span>
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}
                className="hover:text-white transition-colors duration-200 w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Sloupec 3 — Kontakt */}
          <div className="flex flex-col gap-4 md:items-end md:text-right">
            <span style={{ color: 'rgba(255,255,255,0.30)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
              Kontakt
            </span>
            <a
              href="mailto:info@nicejob.cz"
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}
              className="hover:text-white transition-colors duration-200 w-fit"
            >
              info@nicejob.cz
            </a>
            <a
              href="tel:+420123456789"
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}
              className="hover:text-white transition-colors duration-200 w-fit"
            >
              +420 123 456 789
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}
              className="hover:text-white transition-colors duration-200 w-fit flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>

            {/* CTA */}
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 mt-2 self-start md:self-end
                         text-sm font-semibold px-5 py-2.5 rounded-full
                         transition-all duration-300 hover:gap-3 hover:bg-[#a01220]"
              style={{ background: '#be1622', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Napiš nám →
            </button>
          </div>
        </div>

        {/* ── Spodní lišta ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between
                        gap-4 py-6 text-[0.78rem]"
          style={{ color: 'rgba(255,255,255,0.22)' }}>

          <span>© {year} Nice Job s.r.o. Všechna práva vyhrazena.</span>

          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-white/60 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
