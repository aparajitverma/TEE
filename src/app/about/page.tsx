import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – Trusted Indian Export Merchant | The Export Express',
  description: 'Founded in 2015, we connect 150+ Indian farms with global buyers. ISO certified, fair-trade practices, serving 120+ clients across 30 countries. Premium herbs, spices, tea & more.',
  keywords: 'Indian export company, export merchant India, Ayurvedic herbs exporter, spice exporter India, tea exporter, organic exports, ISO certified exporter',
  openGraph: {
    title: 'About Us – Trusted Indian Export Merchant',
    description: 'Founded in 2015, we connect 150+ Indian farms with global buyers. ISO certified, fair-trade practices, serving 120+ clients worldwide.',
    url: 'https://theexportexpress.com/about',
    siteName: 'The Export Express',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Us – Trusted Indian Export Merchant',
    description: 'Founded in 2015, we connect 150+ Indian farms with global buyers. ISO certified, fair-trade practices.',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/about',
  },
};

export default function About() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://theexportexpress.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://theexportexpress.com/about"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Export Express",
    "url": "https://theexportexpress.com",
    "logo": "https://theexportexpress.com/logo.png",
    "foundingDate": "2015",
    "description": "Trusted Indian export merchant connecting premium agricultural products from 150+ farms to global markets.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "areaServed": [
      "North America",
      "Europe",
      "Middle East",
      "Asia Pacific",
      "Africa",
      "South America"
    ],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "50"
    },
    "award": [
      "ISO 9001 Certified",
      "HACCP Certified",
      "USDA Organic Certified"
    ]
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden bg-gradient-to-br from-green-900/40 to-green-700/40">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              From Indian Soil to Global Shelves
            </h1>
            <p className="text-2xl text-gray-200 drop-shadow-md">
              Our Story
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="py-16 px-8">
          <div className="max-w-6xl mx-auto">

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Vision */}
            <section className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">The Merchant's Vision</h2>
                  <p className="text-sm text-green-400 font-semibold">Founded in 2015</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded in 2015, we recognised the price-gap between Indian producers and global buyers. 
                Our mission is to bridge that gap, delivering superior value to both sides. We saw an opportunity 
                to connect India's rich agricultural heritage with international markets seeking authentic, 
                high-quality products.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we serve more than 120 international clients across North America, Europe, the Middle East, 
                and Asia. Our commitment remains unchanged: to be the most trusted partner for premium Indian exports.
              </p>
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white font-semibold mb-2">Our Mission Statement</p>
                <p className="text-gray-400 italic">
                  "To empower Indian farmers and deliver world-class products to global markets through 
                  transparency, quality, and sustainable practices."
                </p>
              </div>
            </section>

            {/* Partnership Model */}
            <section className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">Partnership Model</h2>
              <p className="text-gray-300 leading-relaxed">
                We partner with over 150 small-holder farms across Kerala, Karnataka, Assam, Tamil Nadu, 
                and Gujarat. Each farmer is audited, trained, and empowered to meet export standards. 
                By aggregating the output of verified growers, we offer competitive pricing, consistent 
                quality, and full-service export support.
              </p>
            </section>

            {/* Global Reach */}
            <section className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Global Reach</h2>
              
              {/* Export Statistics */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">30+</div>
                  <p className="text-gray-400">Countries Served</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">120+</div>
                  <p className="text-gray-400">Active Clients</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                  <p className="text-gray-400">Tons Exported/Year</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">9</div>
                  <p className="text-gray-400">Years Experience</p>
                </div>
              </div>

              {/* World Map Representation */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Export Destinations</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* North America */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <h4 className="text-white font-semibold">North America</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• United States</li>
                      <li>• Canada</li>
                    </ul>
                  </div>

                  {/* Europe */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <h4 className="text-white font-semibold">Europe</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• United Kingdom</li>
                      <li>• Germany</li>
                      <li>• France</li>
                      <li>• Netherlands</li>
                      <li>• Italy</li>
                    </ul>
                  </div>

                  {/* Middle East */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <h4 className="text-white font-semibold">Middle East</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• UAE</li>
                      <li>• Saudi Arabia</li>
                      <li>• Qatar</li>
                      <li>• Kuwait</li>
                    </ul>
                  </div>

                  {/* Asia Pacific */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <h4 className="text-white font-semibold">Asia Pacific</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Japan</li>
                      <li>• South Korea</li>
                      <li>• Singapore</li>
                      <li>• Australia</li>
                    </ul>
                  </div>

                  {/* Africa */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <h4 className="text-white font-semibold">Africa</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• South Africa</li>
                      <li>• Kenya</li>
                      <li>• Nigeria</li>
                    </ul>
                  </div>

                  {/* South America */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <h4 className="text-white font-semibold">South America</h4>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Brazil</li>
                      <li>• Argentina</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Promise */}
            <section className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">Our Promise</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Best-value sourcing</h3>
                  <p className="text-gray-400">Direct farmer links eliminate middle-men</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Quality first</h3>
                  <p className="text-gray-400">ISO-9001, HACCP, and product-specific certifications</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Transparency</h3>
                  <p className="text-gray-400">Real-time tracking, lab reports, and traceability</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Sustainability</h3>
                  <p className="text-gray-400">Organic conversion and fair-trade premiums</p>
                </div>
              </div>
            </section>

            {/* CTAs & Downloads */}
            <section className="bg-gradient-to-br from-green-900/20 to-green-700/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner With Us?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore our partnerships, download our portfolio, or get in touch to discuss your export needs.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {/* Meet Our Partners Button */}
                <a 
                  href="/about/partnerships" 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30 shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Meet Our Partners
                </a>

                {/* Download Portfolio Button */}
                <a 
                  href="/partner-portfolio.pdf" 
                  download
                  className="inline-flex items-center gap-2 bg-green-600/80 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Partner Portfolio
                </a>

                {/* Get in Touch Button */}
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30 shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get in Touch
                </a>
              </div>
            </section>
          </div>
          </div>
        </main>
      </div>
    </>
  );
}
