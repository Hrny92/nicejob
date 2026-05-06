import Navbar             from '@/components/Navbar'
import HeroSection        from '@/components/HeroSection'
import AboutSection       from '@/components/AboutSection'
import ServicesSection    from '@/components/ServicesSection'
import WhyUsSection       from '@/components/WhyUsSection'
import ReferencesSection  from '@/components/ReferencesSection'
import JobsSection        from '@/components/JobsSection'
import Footer             from '@/components/Footer'
import ContactDrawer      from '@/components/ContactDrawer'
import CookieBanner       from '@/components/CookieBanner'
import { getLatestPozice, getReference, getKlienti, getSluzby, getONas, getProcMy } from '@/lib/queries'

export const revalidate = 30

export default async function Home() {
  const [pozice, reference, klienti, sluzby, oNas, procMy] = await Promise.all([
    getLatestPozice(),
    getReference(),
    getKlienti(),
    getSluzby(),
    getONas(),
    getProcMy(),
  ])

  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection data={oNas} />
      <ServicesSection sluzby={sluzby} />
      <WhyUsSection data={procMy} />
      <JobsSection pozice={pozice} />
      <ReferencesSection reference={reference} klienti={klienti} />
      <Footer />

      {/* Globální plovoucí kontakt */}
      <ContactDrawer />

      {/* Cookie lišta */}
      <CookieBanner />
    </main>
  )
}
