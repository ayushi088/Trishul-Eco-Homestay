import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-white/90">We&apos;d love to hear from you. Reach out anytime!</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-primary">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: 'Phone',
                      content: '+91 (0) 98765 43210',
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      content: 'hello@trishulechomestays.com',
                    },
                    {
                      icon: MapPin,
                      title: 'Office Address',
                      content: 'Chopta, Uttarakhand, India 263687',
                    },
                    {
                      icon: Clock,
                      title: 'Business Hours',
                      content: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
                    },
                  ].map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                          <p className="text-text-secondary">{item.content}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-primary">Send Us a Message</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="Inquiry about homestays"
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-all duration-200 shadow hover:shadow-md active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
              <h2 className="text-3xl font-bold mb-8 text-primary">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'How do I book a homestay?',
                    a: 'Browse our listings, select your preferred homestay, choose your dates, and complete the booking process. You&apos;ll receive confirmation via email.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept credit/debit cards through Razorpay and also offer Cash on Delivery for select properties.',
                  },
                  {
                    q: 'Can I cancel my booking?',
                    a: 'Yes, cancellations are allowed up to 7 days before your check-in date for a full refund.',
                  },
                  {
                    q: 'Are the homestays verified?',
                    a: 'Absolutely! All our properties are carefully verified and inspected to ensure quality and safety.',
                  },
                  {
                    q: 'Do you offer group bookings?',
                    a: 'Yes! Contact our team at hello@trishulechomestays.com for special group rates and arrangements.',
                  },
                  {
                    q: 'What if I need help during my stay?',
                    a: 'Our 24/7 support team is always available. Call, email, or use the in-app chat for instant assistance.',
                  },
                ].map((faq, index) => (
                  <details key={index} className="group border-b border-border pb-6">
                    <summary className="cursor-pointer font-bold text-primary text-lg flex justify-between items-center">
                      <span>{faq.q}</span>
                      <span className="group-open:rotate-180 transition-transform">▶</span>
                    </summary>
                    <p className="text-text-secondary mt-4">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
