import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nice Job | HR agentura Praha',
  description:
    'Moderní personální agentura s lidským přístupem. Najdeme talent, který vaší firmu posune dál.',
  keywords: 'HR agentura, personální agentura, Praha, headhunting, nábor',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <head>
        {/* Preconnect for fast Google Fonts load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
