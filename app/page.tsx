import Navbar             from '@/components/Navbar'
import HeroSection        from '@/components/HeroSection'
import AboutSection       from '@/components/AboutSection'
import ServicesSection    from '@/components/ServicesSection'
import WhyUsSection       from '@/components/WhyUsSection'
import ReferencesSection  from '@/components/ReferencesSection'
import Footer             from '@/components/Footer'
import ContactDrawer      from '@/components/ContactDrawer'
import CookieBanner       from '@/components/CookieBanner'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <ReferencesSection />
      <Footer />

      {/* Globální plovoucí kontakt */}
      <ContactDrawer />

      {/* Cookie lišta */}
      <CookieBanner />
    </main>
  )
}
