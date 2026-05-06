import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPozice, TYP_UVAZKU, formatMzda, PozicePreview } from '@/lib/queries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactDrawer from '@/components/ContactDrawer'
import StructuredData from '@/components/StructuredData'
import { buildMetadata, schemaBreadcrumb, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title:       'Pracovní nabídky — HR agentura Nice Job Praha',
  description: 'Aktuální pracovní nabídky od HR agentury Nice Job. Pozice v Praze a okolí — nábor na klíč s lidským přístupem.',
  path:        '/pozice',
})

export const revalidate = 30

function PoziceRow({ p }: { p: PozicePreview }) {
  const mzda = formatMzda(p.mzdaOd, p.mzdaDo)
  const typArr = Array.isArray(p.typUvazku) ? p.typUvazku : p.typUvazku ? [p.typUvazku] : []
  const typLabels = typArr.map((t) => TYP_UVAZKU[t] ?? t).join(', ')

  return (
    <Link
      href={`/pozice/${p.slug.current}`}
      className="group flex flex-col sm:flex-row sm:items-center gap-4
                 bg-white rounded-2xl border border-gray-100 p-6
                 hover:border-brand-blue/25 hover:shadow-md
                 transition-all duration-300"
    >
      {/* Levá část — název + perex */}
      <div className="flex-1 min-w-0">
        <h2
          className="font-black text-gray-900 text-lg leading-tight mb-1.5
                     group-hover:text-brand-blue transition-colors duration-200 truncate"
          style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}
        >
          {p.nazev}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">{p.perex}</p>
      </div>

      {/* Tagy */}
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:shrink-0">
        <span className="inline-flex items-center gap-1 text-xs font-semibold
                         text-brand-blue bg-brand-blue/8 px-3 py-1.5 rounded-full whitespace-nowrap">
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
          </svg>
          {p.lokalita}
        </span>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap">
          {typLabels}
        </span>
        {mzda && (
          <span className="text-xs font-semibold text-brand-red bg-brand-red/8 px-3 py-1.5 rounded-full whitespace-nowrap">
            {mzda}
          </span>
        )}
      </div>

      {/* Šipka */}
      <svg
        className="w-5 h-5 text-gray-300 group-hover:text-brand-blue shrink-0
                   transition-all duration-200 group-hover:translate-x-1 hidden sm:block"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
      </svg>
    </Link>
  )
}

export default async function PozicePage() {
  const pozice = await getAllPozice()

  return (
    <>
    <StructuredData schema={schemaBreadcrumb([
      { name: 'Nice Job', url: SITE_URL },
      { name: 'Pracovní nabídky', url: `${SITE_URL}/pozice` },
    ])} />
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-white/30" />
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-white/50">
              Kariéra
            </span>
          </div>
          <h1 style={{ lineHeight: 1.1 }}>
            <span
              className="block text-white"
              style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                marginBottom: 8,
              }}
            >
              Pracovní nabídky
            </span>
            <span
              className="block"
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                color: '#1E71C9',
              }}
            >
              Najděte svou příležitost.
            </span>
          </h1>
          {pozice.length > 0 && (
            <p className="text-white/50 text-sm mt-6">
              Aktuálně {pozice.length} {pozice.length === 1 ? 'nabídka' : pozice.length < 5 ? 'nabídky' : 'nabídek'}
            </p>
          )}
        </div>
      </div>

      {/* Obsah */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">

        {/* Zpět na hlavní */}
        <Link
          href="/#pracovni-nabidky"
          className="inline-flex items-center gap-2 text-sm text-gray-400
                     hover:text-brand-dark transition-colors duration-200 mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
          </svg>
          Zpět na hlavní stránku
        </Link>

        {pozice.length > 0 ? (
          <div className="flex flex-col gap-4">
            {pozice.map((p) => (
              <PoziceRow key={p._id} p={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-blue/8 flex items-center justify-center">
              <svg className="w-7 h-7 text-brand-blue/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
            <h2 className="text-gray-700 font-bold text-lg" style={{ fontFamily: 'Roboto, system-ui, sans-serif' }}>
              Momentálně nemáme otevřené pozice
            </h2>
            <p className="text-gray-400 text-sm max-w-sm">
              Pošlete nám svůj životopis a my vás kontaktujeme, jakmile se otevře vhodná příležitost.
            </p>
            <Link
              href="/#pracovni-nabidky"
              className="mt-2 inline-flex items-center gap-2 bg-brand-dark text-white
                         px-6 py-3 rounded-full text-sm font-semibold
                         hover:bg-brand-mid transition-all duration-300"
            >
              Napsat nám →
            </Link>
          </div>
        )}
      </div>
    </main>
    <Footer />
    <ContactDrawer />
    </>
  )
}
