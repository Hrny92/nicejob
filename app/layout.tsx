import type { Metadata } from 'next'
import './globals.css'
import { ContactModalProvider } from '@/context/ContactModalContext'
import ContactModal from '@/components/ContactModal'
import StructuredData from '@/components/StructuredData'
import { COMPANY, PERSON, SITE_URL, schemaOrganization, schemaWebSite } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  'Nice Job | HR agentura Praha — Nábor & Headhunting',
    template: '%s | Nice Job',
  },
  description:
    'Moderní HR agentura s lidským přístupem. Komplexní nábor, headhunting a HR poradenství pro firmy v Praze. 200+ obsazených pozic, průměrně za 14 dní.',
  keywords:  COMPANY.keywords,
  authors:   [{ name: PERSON.name }],
  creator:   COMPANY.brandName,
  publisher: COMPANY.brandName,

  // Google Search Console — přidejte svůj verification kód do .env.local:
  // NEXT_PUBLIC_GSC_VERIFICATION=váš-kód
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),

  alternates: {
    canonical: SITE_URL,
    languages: { 'cs-CZ': SITE_URL },
  },

  openGraph: {
    type:        'website',
    url:         SITE_URL,
    siteName:    COMPANY.brandName,
    title:       'Nice Job | HR agentura Praha — Nábor & Headhunting',
    description: 'Moderní HR agentura s lidským přístupem. Komplexní nábor, headhunting a HR poradenství pro firmy v Praze.',
    locale:      'cs_CZ',
    images: [{
      url:    `${SITE_URL}/og-default.png`,
      width:  1200,
      height: 630,
      alt:    'Nice Job — HR agentura Praha',
    }],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Nice Job | HR agentura Praha',
    description: 'Moderní HR agentura s lidským přístupem. 200+ obsazených pozic.',
    images:      [`${SITE_URL}/og-default.png`],
  },

  robots: {
    index:            true,
    follow:           true,
    googleBot: {
      index:          true,
      follow:         true,
      'max-image-preview':   'large',
      'max-snippet':         -1,
      'max-video-preview':   -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <head>
        {/* Preconnect for fast Google Fonts load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Globální JSON-LD — WebSite + Organization */}
        <StructuredData schema={[schemaWebSite(), schemaOrganization()]} />
      </head>
      <body className="antialiased">
        <ContactModalProvider>
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  )
}
