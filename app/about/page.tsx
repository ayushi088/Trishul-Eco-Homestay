import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Heart, MapPin, Users, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Trishul Eco Homestays</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Connecting travelers with authentic Himalayan hospitality and unforgettable mountain experiences.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  At Trishul Eco Homestays, our mission is to revolutionize travel by connecting curious explorers with genuine local families in the heart of the Himalayas. We believe in creating meaningful cultural exchanges that benefit both travelers and host communities.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  We're committed to sustainable tourism practices that preserve the natural beauty and cultural heritage of mountain regions while providing authentic experiences that cannot be found in traditional hotels.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">Our Vision</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  We envision a world where travel is personal, sustainable, and transformative. A world where families in remote mountain villages can thrive by sharing their culture and hospitality with the world.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Through Trishul, we're building a global community that values authentic connections, respects local traditions, and creates economic opportunities for rural Himalayan communities.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-background border border-border rounded-lg p-12 mb-16">
              <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Core Values</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    icon: Heart,
                    title: 'Authenticity',
                    description: 'Real experiences with real people in real homes',
                  },
                  {
                    icon: MapPin,
                    title: 'Sustainability',
                    description: 'Preserving nature and culture for future generations',
                  },
                  {
                    icon: Users,
                    title: 'Community',
                    description: 'Building meaningful connections between people',
                  },
                  {
                    icon: Award,
                    title: 'Excellence',
                    description: 'Delivering exceptional service and experiences',
                  },
                ].map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-primary">{value.title}</h3>
                      <p className="text-text-secondary">{value.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { number: '500+', label: 'Happy Guests' },
                { number: '50+', label: 'Verified Homestays' },
                { number: '10+', label: 'Mountain Regions' },
              ].map((stat, index) => (
                <div key={index} className="bg-primary text-white rounded-lg p-8 text-center">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Story */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-12 border border-accent/20">
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-4">
                Trishul Eco Homestays was born from a simple passion: the desire to experience mountains not from a luxury resort, but from within a warm family home. Our founders spent years exploring the Himalayas, discovering hidden gems and forming deep connections with local families.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed mb-4">
                They realized that these authentic experiences were difficult to find through traditional booking platforms. Hotel chains dominated the market, and local families had no platform to share their hospitality with the world. This inspired us to create Trishul.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                Today, Trishul is a thriving community of travelers and host families united by a shared love of mountains, culture, and genuine human connection. Every booking helps support local families while providing travelers with memories that last a lifetime.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-background border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-primary">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rajesh Kumar',
                  role: 'Founder & CEO',
                  bio: 'Mountain enthusiast with 15 years of experience in tourism and hospitality.',
                },
                {
                  name: 'Priya Singh',
                  role: 'Head of Operations',
                  bio: 'Dedicated to ensuring excellent service and guest satisfaction across all properties.',
                },
                {
                  name: 'Amit Patel',
                  role: 'Technology Lead',
                  bio: 'Building the digital infrastructure that connects travelers with local families.',
                },
              ].map((member, index) => (
                <div key={index} className="bg-card rounded-lg shadow-md p-8 text-center border border-border hover:shadow-lg transition-shadow duration-300">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">{member.name}</h3>
                  <p className="text-accent font-semibold mb-4">{member.role}</p>
                  <p className="text-text-secondary">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Mountain Magic?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers discovering authentic Himalayan hospitality with Trishul Eco Homestays.
            </p>
            <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-white/90 transition-colors">
              Explore Homestays
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
