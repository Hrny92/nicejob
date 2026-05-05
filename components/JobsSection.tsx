import Link from 'next/link'
import { PozicePreview, TYP_UVAZKU, formatMzda } from '@/lib/queries'

function PoziceCard({ p }: { p: PozicePreview }) {
  const mzda = formatMzda(p.mzdaOd, p.mzdaDo)
  const typArr = Array.isArray(p.typUvazku) ? p.typUvazku : p.typUvazku ? [p.typUvazku] : []
  const typLabels = typArr.map((t) => TYP_UVAZKU[t] ?? t)

  return (
    <Link
      href={`/pozice/${p.slug.current}`}
      className="group flex flex-col gap-4 rounded-2xl border border-gray-100
                 bg-white p-7 shadow-sm hover:shadow-md hover:border-brand-blue/20
                 transition-all duration-300"
    >
      {/* Datum */}
      {p.zverejneno && (
        <span className="text-xs text-gray-400">
          {new Date(p.zverejneno).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      )}

      {/* Název */}
      <h3
        className="font-black text-gray-900 leading-tight
                   group-hover:text-brand-blue transition-colors duration-200"
        style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '1.2rem' }}
      >
        {p.nazev}
      </h3>

      {/* Perex */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
        {p.perex}
      </p>

      {/* Meta řádek — zarovnaný s textem výše */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 flex flex-wrap items-center gap-x-2">
          <span className="text-brand-blue font-semibold">{p.lokalita}</span>
          {typLabels.map((label) => (
            <>
              <span key={label + '-dot'} aria-hidden>·</span>
              <span key={label}>{label}</span>
            </>
          ))}
          {mzda && (
            <>
              <span aria-hidden>·</span>
              <span className="text-brand-red font-semibold">{mzda}</span>
            </>
          )}
        </p>

        {/* Šipka vpravo */}
        <svg
          className="w-4 h-4 text-gray-300 group-hover:text-brand-blue shrink-0 ml-3
                     transition-all duration-200 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
        </svg>
      </div>
    </Link>
  )
}

export default function JobsSection({ pozice }: { pozice: PozicePreview[] }) {
  return (
    <section
      id="pracovni-nabidky"
      className="w-full py-24 lg:py-32 px-8 lg:px-16"
      style={{ background: '#f8f9fb' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Záhlaví sekce */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col gap-5">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-px bg-brand-dark" />
              <span className="text-xs font-semibold tracking-[0.22em] uppercase text-brand-dark">
                Kariéra
              </span>
            </div>

            {/* Nadpis */}
            <h2 style={{ lineHeight: 1.1 }}>
              <span
                className="block"
                style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  color: '#050e1d',
                  marginBottom: 6,
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
                pro ty správné lidi.
              </span>
            </h2>
          </div>

          {/* Tlačítko — desktop */}
          <Link
            href="/pozice"
            className="hidden md:inline-flex items-center gap-2 self-end
                       border-2 border-brand-dark text-brand-dark
                       px-6 py-3 rounded-full text-sm font-semibold
                       hover:bg-brand-dark hover:text-white
                       transition-all duration-300 hover:gap-3 whitespace-nowrap"
          >
            Všechny nabídky
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
        </div>

        {/* Mřížka karet */}
        {pozice.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pozice.map((p) => (
              <PoziceCard key={p._id} p={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-blue/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Momentálně nemáme žádné aktivní nabídky.</p>
            <p className="text-gray-400 text-sm">Pošlete nám životopis a ozveme se, až budeme hledat.</p>
          </div>
        )}

        {/* Tlačítko — mobile */}
        <div className="flex justify-center mt-10 md:hidden">
          <Link
            href="/pozice"
            className="inline-flex items-center gap-2
                       border-2 border-brand-dark text-brand-dark
                       px-6 py-3 rounded-full text-sm font-semibold
                       hover:bg-brand-dark hover:text-white
                       transition-all duration-300"
          >
            Všechny nabídky →
          </Link>
        </div>

      </div>
    </section>
  )
}
