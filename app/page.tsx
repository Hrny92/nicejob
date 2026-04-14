import Navbar          from '@/components/Navbar'
import HeroSection     from '@/components/HeroSection'
import AboutSection    from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ContactDrawer   from '@/components/ContactDrawer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />

      {/* Placeholder — další sekce přijdou */}
      <section className="min-h-[30vh] flex items-center justify-center bg-white">
        <p className="text-gray-200 text-sm tracking-widest uppercase">
          Další sekce brzy…
        </p>
      </section>

      {/* Globální plovoucí kontakt */}
      <ContactDrawer />
    </main>
  )
}
