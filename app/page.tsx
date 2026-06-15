import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import FeaturedHomestays from '@/components/featured-homestays'
import WhyChooseTrishul from '@/components/why-choose-trishul'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedHomestays />
        <WhyChooseTrishul />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
