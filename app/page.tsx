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
import { getLatestPozice, getReference, getKlienti, getSluzby } from '@/lib/queries'

export const revalidate = 30

export default async function Home() {
  const [pozice, reference, klienti, sluzby] = await Promise.all([
    getLatestPozice(),
    getReference(),
    getKlienti(),
    getSluzby(),
  ])

  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection sluzby={sluzby} />
      <WhyUsSection />
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
