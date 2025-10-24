import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'India Exporters of Herbal, Aromatic, Tea, Coffee, Spices & Cash Crops | The Export Express',
  description: 'Premium Indian exports: Ayurvedic herbs, essential oils, tea, coffee, spices & seasonal crops. ISO certified, direct from 200+ farms. Global shipping with full compliance.',
  keywords: 'India exports, Ayurvedic herbs, essential oils, Indian spices, tea exporters, coffee exporters, herbal products, organic exports, USDA organic, ISO certified',
  openGraph: {
    title: 'India Exporters of Herbal, Aromatic, Tea, Coffee, Spices & Cash Crops',
    description: 'Premium Indian exports: Ayurvedic herbs, essential oils, tea, coffee, spices & seasonal crops. ISO certified, direct from 200+ farms.',
    url: 'https://theexportexpress.com',
    siteName: 'The Export Express',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Export Express - Premium Indian Exports',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Exporters of Herbal, Aromatic, Tea, Coffee, Spices & Cash Crops',
    description: 'Premium Indian exports: Ayurvedic herbs, essential oils, tea, coffee, spices & seasonal crops. ISO certified, direct from 200+ farms.',
    images: ['/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://theexportexpress.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Export Express",
    "url": "https://theexportexpress.com",
    "logo": "https://theexportexpress.com/logo.png",
    "description": "Premium Indian exports: Ayurvedic herbs, essential oils, tea, coffee, spices & seasonal crops. ISO certified, direct from 200+ farms.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "email": "info@theexportexpress.com"
    },
    "sameAs": [
      "https://linkedin.com/company/theexportexpress",
      "https://twitter.com/exportexpress",
      "https://facebook.com/theexportexpress"
    ],
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Indian Export Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Herbal & Ayurvedic Products"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Essential Oils & Aromatics"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Tea & Coffee"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Herbs & Spices"
          }
        }
      ]
    }
  };

  return (
    <>
      {/* Schema.org Organization Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Full-screen video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Value Propositions Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Direct Farmer Partnerships */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-all">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Direct Farmer Partnerships</h3>
              <p className="text-gray-400">
                We partner with over 200 verified farms across India, eliminating intermediaries for better prices and quality control.
              </p>
            </div>

            {/* All-Stage Flexibility */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">All-Stage Flexibility</h3>
              <p className="text-gray-400">
                From raw materials to retail-ready packages, we handle sourcing, processing, packaging, and labeling to your specifications.
              </p>
            </div>

            {/* International Quality Certifications */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-all">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">International Quality Certifications</h3>
              <p className="text-gray-400">
                ISO 22000, HACCP, USDA Organic, EU Organic, GMP, and Fair-Trade certified products with full documentation.
              </p>
            </div>

            {/* Fast, Door-to-Door Logistics */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-all">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fast, Door-to-Door Logistics</h3>
              <p className="text-gray-400">
                Air and sea freight coordination with full customs clearance, documentation, and real-time tracking to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-xl text-gray-400">Discover our bestselling premium export products</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {/* Ashwagandha */}
            <a href="/products/herbal-ayurvedic/ashwagandha" className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop"
                  alt="Organic Ashwagandha"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Bestseller
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">Herbal & Ayurvedic</p>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-green-400 transition-colors">
                  Organic Ashwagandha Powder
                </h3>
                <p className="text-green-400 font-semibold text-sm">From $12/kg</p>
              </div>
            </a>

            {/* Turmeric */}
            <a href="/products/herbal-ayurvedic/turmeric" className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop"
                  alt="Organic Turmeric"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  High Curcumin
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">Herbal & Ayurvedic</p>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-green-400 transition-colors">
                  Organic Turmeric Powder
                </h3>
                <p className="text-green-400 font-semibold text-sm">From $8/kg</p>
              </div>
            </a>

            {/* Sandalwood Oil */}
            <a href="/products/aromatics/sandalwood-oil" className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop"
                  alt="Sandalwood Oil"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Premium
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">Aromatic Effluences</p>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-green-400 transition-colors">
                  Sandalwood Essential Oil
                </h3>
                <p className="text-green-400 font-semibold text-sm">From $180/10ml</p>
              </div>
            </a>

            {/* Darjeeling Tea */}
            <a href="/products/tea-coffee/darjeeling-tea" className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop"
                  alt="Darjeeling Tea"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Organic
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">Tea & Coffee</p>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-green-400 transition-colors">
                  Darjeeling First Flush Tea
                </h3>
                <p className="text-green-400 font-semibold text-sm">From $25/kg</p>
              </div>
            </a>

            {/* Jute Bags */}
            <a href="/products/jute-products/jute-tote-bags" className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop"
                  alt="Jute Tote Bags"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Eco-Friendly
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1">Jute Products</p>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-green-400 transition-colors">
                  Customizable Jute Tote Bags
                </h3>
                <p className="text-green-400 font-semibold text-sm">From $2/piece</p>
              </div>
            </a>
          </div>

          <div className="text-center">
            <a href="/products" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-all font-semibold text-lg">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Product Categories Highlight */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-white text-center mb-16">Explore Our Ranges</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Herbal & Ayurvedic */}
            <a href="/products/herbal-ayurvedic" className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-green-900/40 to-green-700/40 border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Herbal & Ayurvedic</h3>
                <p className="text-sm text-gray-300">150+ herbs & extracts</p>
              </div>
            </a>

            {/* Aromatics */}
            <a href="/products/aromatics" className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-purple-900/40 to-purple-700/40 border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aromatics</h3>
                <p className="text-sm text-gray-300">Essential oils & resins</p>
              </div>
            </a>

            {/* Tea & Coffee */}
            <a href="/products/tea-coffee" className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-amber-900/40 to-amber-700/40 border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tea & Coffee</h3>
                <p className="text-sm text-gray-300">Premium blends</p>
              </div>
            </a>

            {/* Seasonal & Cash Crops */}
            <a href="/products/seasonal-crops" className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-orange-900/40 to-orange-700/40 border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <svg className="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Seasonal Crops</h3>
                <p className="text-sm text-gray-300">Mango, cashew & more</p>
              </div>
            </a>

            {/* Herbs & Spices */}
            <a href="/products/herbs-spices" className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-red-900/40 to-red-700/40 border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Herbs & Spices</h3>
                <p className="text-sm text-gray-300">Pepper, turmeric & blends</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Certification Logos Strip */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Certified & Trusted</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* ISO-9001 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all">
                <div className="w-20 h-20 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-center">ISO 9001</p>
                <p className="text-gray-400 text-xs text-center mt-1">Quality Management</p>
              </div>

              {/* HACCP */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all">
                <div className="w-20 h-20 bg-green-500/20 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-center">HACCP</p>
                <p className="text-gray-400 text-xs text-center mt-1">Food Safety</p>
              </div>

              {/* USDA Organic */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all">
                <div className="w-20 h-20 bg-green-600/20 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-center">USDA Organic</p>
                <p className="text-gray-400 text-xs text-center mt-1">Certified Organic</p>
              </div>

              {/* FSSAI */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 transition-all">
                <div className="w-20 h-20 bg-orange-500/20 rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-center">FSSAI</p>
                <p className="text-gray-400 text-xs text-center mt-1">India Food Safety</p>
              </div>
            </div>
          </div>

          {/* Suppliers to... Client Badges */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Trusted by Global Brands</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/10">
                <p className="text-gray-300 text-sm">Fortune 500 Nutraceutical Companies</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/10">
                <p className="text-gray-300 text-sm">European Tea Retailers</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/10">
                <p className="text-gray-300 text-sm">Middle East Food Processors</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/10">
                <p className="text-gray-300 text-sm">Australian Wellness Brands</p>
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div>
            <h3 className="text-2xl font-bold text-white text-center mb-8">What Our Clients Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Exceptional quality and reliability. The Export Express has been our trusted partner for organic Ashwagandha for 3 years. Their traceability is unmatched."
                </p>
                <p className="text-white font-semibold">Sarah Johnson</p>
                <p className="text-gray-400 text-sm">Procurement Manager, US Nutraceuticals</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Their custom packaging and private-label services helped us launch our premium tea line in record time. Professional and responsive team."
                </p>
                <p className="text-white font-semibold">Michael Chen</p>
                <p className="text-gray-400 text-sm">CEO, European Tea Co.</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Fast logistics and complete documentation made our first import from India seamless. We've now expanded to 5 product lines with them."
                </p>
                <p className="text-white font-semibold">Ahmed Al-Rashid</p>
                <p className="text-gray-400 text-sm">Director, UAE Food Trading</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8">Why Choose Us?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            We are not a manufacturer – we are your <span className="text-white font-semibold">global sourcing partner</span> in India. 
            Whether you need raw herbs, finished spice blends, or private-label tea, we handle everything from farm audits 
            to final shipment. Our network of 200+ certified farms, in-house quality labs, and experienced logistics team 
            ensure you receive premium Indian products with complete transparency and compliance.
          </p>
          <a 
            href="/about" 
            className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-10 rounded-xl transition-all border border-white/30 shadow-lg hover:scale-105"
          >
            Learn More About Us
          </a>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-white text-center mb-16">Latest Insights</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Blog Post 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group">
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-green-900/40 to-green-700/40 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-green-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  Top 10 Ayurvedic Herbs Driving Global Demand in 2024
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Discover which Indian herbs are seeing explosive growth in international markets and why buyers are...
                </p>
                <a href="/resources/blog" className="text-green-400 hover:text-green-300 text-sm font-semibold inline-flex items-center gap-2">
                  Read More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group">
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-amber-900/40 to-amber-700/40 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  Understanding Incoterms: FOB vs CIF for Indian Exporters
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  A practical guide to choosing the right shipping terms for your import needs and understanding cost...
                </p>
                <a href="/resources/blog" className="text-amber-400 hover:text-amber-300 text-sm font-semibold inline-flex items-center gap-2">
                  Read More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group">
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-blue-900/40 to-blue-700/40 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  Organic Tea from Darjeeling – Certification Process Explained
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Learn how Darjeeling tea estates achieve USDA and EU organic certification and what it means for...
                </p>
                <a href="/resources/blog" className="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center gap-2">
                  Read More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* View All Posts Button */}
          <div className="text-center">
            <a 
              href="/resources/blog" 
              className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-10 rounded-xl transition-all border border-white/30 shadow-lg hover:scale-105"
            >
              View All Posts
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
