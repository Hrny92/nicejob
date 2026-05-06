import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů | Nice Job',
  description: 'Informace o zpracování osobních údajů společností Nice Job dle GDPR.',
}

export default function GdprPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hlavička */}
      <div style={{ background: 'linear-gradient(160deg, #050e1d 0%, #0B294A 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zpět na web
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622' }} />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Právní dokumenty
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            Ochrana osobních údajů
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.9rem', marginTop: 12 }}>
            Platné od 1. 1. 2025
          </p>
        </div>
      </div>

      {/* Obsah */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div style={{ color: '#374151', fontSize: '0.95rem', lineHeight: 1.85 }}
          className="flex flex-col gap-10">

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              1. Správce osobních údajů
            </h2>
            <p>
              Správcem vašich osobních údajů je <strong>Mgr. Zdeňka Kocandová</strong>,
              ředitelka společnosti Nice Job, se sídlem Strančická 3339/43, 100 00 Praha 4
              (dále jen „Správce"). IČ: 24192279, DIČ: CZ24192279.
              Správce zpracovává osobní údaje v souladu s Nařízením Evropského parlamentu a Rady (EU)
              2016/679 (GDPR) a zákonem č. 110/2019 Sb., o zpracování osobních údajů.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              2. Jaké údaje zpracováváme
            </h2>
            <p className="mb-4">V závislosti na způsobu kontaktu zpracováváme tyto kategorie údajů:</p>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Identifikační údaje — jméno, příjmení',
                'Kontaktní údaje — e-mail, telefonní číslo',
                'Profesní údaje — životopis, pracovní zkušenosti, reference (u kandidátů)',
                'Technické údaje — IP adresa, cookies, chování na webu (analytika)',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E71C9', flexShrink: 0, marginTop: 8 }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              3. Účel a právní základ zpracování
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { ucel: 'Zprostředkování pracovního místa', zaklad: 'Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)' },
                { ucel: 'Odpověď na poptávku / dotaz', zaklad: 'Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)' },
                { ucel: 'Zasílání obchodních sdělení', zaklad: 'Souhlas (čl. 6 odst. 1 písm. a) GDPR)' },
                { ucel: 'Analytika a zlepšování webu', zaklad: 'Souhlas (čl. 6 odst. 1 písm. a) GDPR)' },
              ].map(({ ucel, zaklad }, i) => (
                <div key={i} style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: 10, borderLeft: '3px solid #1E71C9' }}>
                  <p style={{ fontWeight: 600, color: '#0B294A', marginBottom: 4 }}>{ucel}</p>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{zaklad}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              4. Doba uchovávání údajů
            </h2>
            <p>
              Osobní údaje uchováváme po dobu nezbytně nutnou k naplnění účelu zpracování,
              nejdéle však po dobu <strong>3 let</strong> od posledního kontaktu.
              Po uplynutí této doby jsou údaje bezpečně smazány, pokud nám jejich delší uchování
              neukládá zákon (např. účetní předpisy).
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              5. Vaše práva
            </h2>
            <p className="mb-4">Jako subjekt údajů máte tato práva:</p>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Právo na přístup k osobním údajům',
                'Právo na opravu nepřesných údajů',
                'Právo na výmaz („právo být zapomenut")',
                'Právo na omezení zpracování',
                'Právo na přenositelnost údajů',
                'Právo vznést námitku proti zpracování',
                'Právo odvolat souhlas (kdykoli, bez újmy na zákonnosti předchozího zpracování)',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E71C9', flexShrink: 0, marginTop: 8 }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Svá práva uplatněte e-mailem na{' '}
              <a href="mailto:kocandova@mztraining.cz" className="font-medium hover:underline" style={{ color: '#1E71C9' }}>
                kocandova@mztraining.cz
              </a>.
              Máte také právo podat stížnost u dozorového orgánu —{' '}
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer"
                className="hover:underline font-medium" style={{ color: '#1E71C9' }}>
                Úřad pro ochranu osobních údajů (ÚOOÚ)
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              6. Cookies
            </h2>
            <p>
              Náš web používá soubory cookies. Podrobnosti o tom, jaké cookies používáme
              a jak je spravovat, najdete v{' '}
              <Link href="/cookies" className="font-medium hover:underline" style={{ color: '#1E71C9' }}>
                nastavení cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#050e1d', marginBottom: 12 }}>
              7. Kontakt na správce
            </h2>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p><strong>Mgr. Zdeňka Kocandová</strong> — ředitelka společnosti</p>
              <p>
                E-mail:{' '}
                <a href="mailto:kocandova@mztraining.cz" className="font-medium hover:underline" style={{ color: '#1E71C9' }}>
                  kocandova@mztraining.cz
                </a>
              </p>
              <p>
                Tel.:{' '}
                <a href="tel:+420737266272" className="font-medium hover:underline" style={{ color: '#1E71C9' }}>
                  +420 737 266 272
                </a>
              </p>
              <p style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
                Sídlo: Strančická 3339/43, 100 00 Praha 4<br />
                Pobočka: K Písnici 611, 252 41 Dolní Břežany<br />
                IČ: 24192279 &nbsp;·&nbsp; DIČ: CZ24192279<br />
                Bankovní spojení: 2401021485/2010<br />
                Datová schránka: hzm73z6<br />
                Otevírací doba: dle dohody
              </p>
            </div>
          </section>

        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid #e2e8f0' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: '#1E71C9' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  )
}
