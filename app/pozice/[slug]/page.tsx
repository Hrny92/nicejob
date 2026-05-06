import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPoziceBySlug, getAllPoziceSlugs, TYP_UVAZKU, formatMzda } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactDrawer from '@/components/ContactDrawer'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await getAllPoziceSlugs()
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pozice = await getPoziceBySlug(params.slug)
  if (!pozice) return {}
  return {
    title: `${pozice.nazev} | Nice Job`,
    description: pozice.perex,
  }
}

// Styly pro Portable Text (rich text popis)
const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-600 leading-relaxed mb-4 text-[0.95rem]">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        className="text-gray-900 font-black text-xl mt-8 mb-3"
        style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        className="text-gray-800 font-bold text-lg mt-6 mb-2"
        style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
      >
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-gray-900 font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
}

export default async function PoziceDetailPage({ params }: { params: { slug: string } }) {
  const p = await getPoziceBySlug(params.slug)
  if (!p) notFound()

  const mzda = formatMzda(p.mzdaOd, p.mzdaDo)
  const typArr = Array.isArray(p.typUvazku) ? p.typUvazku : p.typUvazku ? [p.typUvazku] : []
  const typLabels = typArr.map((t) => TYP_UVAZKU[t] ?? t).join(', ')

  return (
    <>
    <Navbar darkHero />
    <main className="min-h-screen bg-white">

      {/* Hero záhlaví */}
      <div
        className="w-full pt-36 pb-20"
        style={{
          background: 'linear-gradient(160deg, #050e1d 0%, #0B294A 60%, #050e1d 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <Link
            href="/pozice"
            className="inline-flex items-center gap-2 text-sm text-white/40
                       hover:text-white/70 transition-colors duration-200 mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
            </svg>
            Všechny nabídky
          </Link>

          {/* Tagy */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                             text-white/70 bg-white/10 px-3 py-1.5 rounded-full">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
              </svg>
              {p.lokalita}
            </span>
            <span className="text-xs font-semibold text-white/70 bg-white/10 px-3 py-1.5 rounded-full">
              {typLabels}
            </span>
            {mzda && (
              <span className="text-xs font-semibold text-white bg-brand-red px-3 py-1.5 rounded-full">
                {mzda}
              </span>
            )}
          </div>

          <h1 style={{ lineHeight: 1.1 }}>
            <span
              className="block text-white"
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                marginBottom: 8,
              }}
            >
              {p.nazev}
            </span>
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                color: '#1E71C9',
              }}
            >
              {p.perex}
            </span>
          </h1>

          {p.zverejneno && (
            <p className="text-white/30 text-xs mt-6">
              Zveřejněno{' '}
              {new Date(p.zverejneno).toLocaleDateString('cs-CZ', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {/* Tělo stránky */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Hlavní obsah */}
          <div className="lg:col-span-2">
            {p.popis && (
              <div className="mb-10">
                <h2
                  className="text-gray-900 font-black text-xl mb-5"
                  style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
                >
                  O pozici
                </h2>
                {/* @ts-expect-error next-sanity PortableText types */}
                <PortableText value={p.popis} components={ptComponents} />
              </div>
            )}

            {p.pozadavky && p.pozadavky.length > 0 && (
              <div className="mb-10">
                <h2
                  className="text-gray-900 font-black text-xl mb-5"
                  style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
                >
                  Co hledáme
                </h2>
                <ul className="flex flex-col gap-3">
                  {p.pozadavky.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex-shrink-0
                                       flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-brand-blue" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                        </svg>
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.benefity && p.benefity.length > 0 && (
              <div className="mb-10">
                <h2
                  className="text-gray-900 font-black text-xl mb-5"
                  style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
                >
                  Co nabízíme
                </h2>
                <ul className="flex flex-col gap-3">
                  {p.benefity.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-brand-red/10 flex-shrink-0
                                       flex items-center justify-center mt-0.5">
                        <svg className="w-2.5 h-2.5 text-brand-red" viewBox="0 0 8 8" fill="currentColor">
                          <circle cx="4" cy="4" r="3"/>
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Postranní panel — CTA */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3
                className="text-gray-900 font-black text-lg mb-2"
                style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
              >
                Zaujala vás tato pozice?
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Napište nám a náš tým se vám ozve do 24 hodin.
              </p>

              <a
                href={`mailto:info@nicejob.cz?subject=Zájem o pozici: ${encodeURIComponent(p.nazev)}`}
                className="block w-full text-center bg-brand-dark text-white
                           px-5 py-3.5 rounded-full text-sm font-semibold mb-3
                           hover:bg-brand-mid transition-all duration-300"
              >
                Poslat životopis →
              </a>

              <Link
                href="/pozice"
                className="block w-full text-center border border-gray-200 text-gray-500
                           px-5 py-3 rounded-full text-sm font-medium
                           hover:border-gray-300 hover:text-gray-700
                           transition-all duration-300"
              >
                Další nabídky
              </Link>

              {/* Detaily */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                  </svg>
                  {p.lokalita}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  {typLabels}
                </div>
                {mzda && (
                  <div className="flex items-center gap-2 text-sm text-brand-red font-semibold">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {mzda}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    <Footer />
    <ContactDrawer />
    </>
  )
}
