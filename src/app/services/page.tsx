import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Export Services – Sourcing, QA, Packaging & Logistics | The Export Express',
  description: 'Complete export solutions: Direct farmer sourcing, ISO/HACCP quality assurance, custom packaging, door-to-door logistics, and trade finance. Serving global markets from India.',
  keywords: 'export services India, sourcing services, quality assurance, custom packaging, logistics services, trade finance, export documentation, HACCP certified',
  openGraph: {
    title: 'Export Services – Sourcing, QA, Packaging & Logistics',
    description: 'Complete export solutions from India: Sourcing, quality assurance, packaging, logistics, and trade finance.',
    url: 'https://theexportexpress.com/services',
    siteName: 'The Export Express',
    type: 'website',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/services',
  },
};

export default function Services() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Export Services",
    "provider": {
      "@type": "Organization",
      "name": "The Export Express"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Export Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Direct Farmer Sourcing",
            "description": "Access to over 200 farms, customized crop selection, and seasonal planning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quality Assurance",
            "description": "ISO, HACCP, organic standards with in-house labs and certifications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Packaging",
            "description": "Bulk to retail-ready packaging with private-label options"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Logistics & Documentation",
            "description": "Door-to-door shipping with air/sea freight and customs clearance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Trade Finance",
            "description": "Flexible payment terms including L/C and documentary collections"
          }
        }
      ]
    }
  };

  const services = [
    {
      title: 'Direct Farmer Sourcing',
      oneLiner: 'Connect directly with verified Indian farms',
      details: 'Access to over 200 farms, customized crop selection, and seasonal planning',
      link: '/services/sourcing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'ISO, HACCP, Organic Standards',
      oneLiner: 'International quality certifications',
      details: 'In-house labs, third-party certifications, and batch-wise testing reports',
      link: '/services/quality',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Bulk to Retail-Ready',
      oneLiner: 'Custom packaging solutions',
      details: 'Label design, private-label, and eco-friendly packaging options',
      link: '/services/packaging',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'purple'
    },
    {
      title: 'Door-to-Door Shipping',
      oneLiner: 'Complete logistics & documentation',
      details: 'Air & sea freight coordination, Incoterms (FOB, CIF, DAP) flexibility, customs clearance',
      link: '/services/logistics',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'yellow'
    },
    {
      title: 'Trade Finance',
      oneLiner: 'Flexible payment terms',
      details: 'Letters of credit, documentary collections, support for new buyers and risk mitigation',
      link: '/services/finance',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'orange'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30',
      blue: 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30',
      orange: 'bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">
              Full-Service Export Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From farm to final delivery, we handle every step of the export process. 
              Our comprehensive services ensure quality, compliance, and timely delivery to global markets.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <a
                key={service.title}
                href={service.link}
                className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${getColorClasses(service.color)} rounded-2xl flex items-center justify-center mb-6 transition-all`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h2>

                {/* One-liner */}
                <p className="text-gray-300 mb-3 font-medium">{service.oneLiner}</p>

                {/* Details */}
                <p className="text-gray-400 text-sm leading-relaxed">{service.details}</p>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-gray-500 group-hover:text-white transition-colors">
                  <span className="text-sm font-semibold">Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Request a Service Quote Form */}
          <section className="mt-16 bg-gradient-to-br from-blue-900/20 to-blue-700/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Request a Service Quote</h2>
            <p className="text-gray-300 text-center mb-8">Tell us about your export needs and we'll get back to you within 24 hours</p>
            
            <form className="max-w-2xl mx-auto space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                />
              </div>
              <select className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40">
                <option value="">Select Service</option>
                <option value="sourcing">Direct Farmer Sourcing</option>
                <option value="quality">Quality Assurance</option>
                <option value="packaging">Custom Packaging</option>
                <option value="logistics">Logistics & Documentation</option>
                <option value="finance">Trade Finance</option>
              </select>
              <textarea
                placeholder="Tell us about your requirements..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg"
              >
                Submit Request
              </button>
            </form>
          </section>

          {/* Process Flowchart */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Export Process</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-green-400">1</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Sourcing</h3>
                  <p className="text-gray-400 text-sm">Direct from verified farms</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-400">2</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Quality Check</h3>
                  <p className="text-gray-400 text-sm">Lab testing & certification</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-purple-400">3</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Packaging</h3>
                  <p className="text-gray-400 text-sm">Custom branding</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-yellow-400">4</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Documentation</h3>
                  <p className="text-gray-400 text-sm">Customs & certificates</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-orange-400">5</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Delivery</h3>
                  <p className="text-gray-400 text-sm">Door-to-door shipping</p>
                </div>
              </div>
            </div>
          </section>

          {/* Client Success Stories */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Client Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">US Nutraceuticals</h3>
                    <p className="text-gray-400 text-sm">Organic Ashwagandha</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "Reduced sourcing costs by 30% while maintaining USDA Organic certification. The Export Express handles everything seamlessly."
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">European Tea Co.</h3>
                    <p className="text-gray-400 text-sm">Private Label Tea</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "Custom packaging and private-label services helped us launch our premium tea line in record time. Professional team!"
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">UAE Food Trading</h3>
                    <p className="text-gray-400 text-sm">Bulk Spices</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "Fast logistics and complete documentation made our first import from India seamless. Now expanded to 5 product lines."
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
