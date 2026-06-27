import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import FeaturedHomestays from '@/components/featured-homestays'
import WhyChooseTrishul from '@/components/why-choose-trishul'
import Testimonials from '@/components/testimonials'
import { PopularDestinations, TravelBlog, FAQSection, Newsletter } from '@/components/landing-sections'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <PopularDestinations />
        <FeaturedHomestays />
        <WhyChooseTrishul />
        <Testimonials />
        <TravelBlog />
        <FAQSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
