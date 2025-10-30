import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tea & Coffee – Premium Indian Tea & Arabica Coffee | The Export Express',
  description: 'Export premium Indian tea and coffee: Assam, Darjeeling, Nilgiri tea, Coorg Arabica coffee. Organic, Fair-Trade certified. Black, green, white tea. HS Codes 0902, 0901.',
  keywords: 'Indian tea export, Darjeeling tea, Assam tea, Arabica coffee export, organic tea, fair trade coffee, tea exporter India, coffee beans export',
  openGraph: {
    title: 'Tea & Coffee – Premium Indian Tea & Arabica Coffee',
    description: 'Export premium Indian tea and coffee. Organic, Fair-Trade certified from Assam, Darjeeling, and Coorg regions.',
    url: 'https://theexportexpress.com/products/tea-coffee',
    siteName: 'The Export Express',
    type: 'website',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/tea-coffee',
  },
};

export default function TeaCoffee() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "Tea & Coffee",
    "description": "Premium Indian tea and coffee from Assam, Darjeeling, Nilgiri, and Coorg regions",
    "url": "https://theexportexpress.com/products/tea-coffee",
    "provider": {
      "@type": "Organization",
      "name": "The Export Express"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tea & Coffee Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Darjeeling Black Tea",
            "category": "Tea"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Assam Black Tea",
            "category": "Tea"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Coorg Arabica Coffee",
            "category": "Coffee"
          }
        }
      ]
    }
  };
  return (
    <>
      {/* Product Category Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-amber-900/60 to-green-700/60">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Tea & Coffee
            </h1>
            <p className="text-2xl text-gray-200 drop-shadow-md">From India's Legendary Tea Gardens & Coffee Estates</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Intro Text */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <p className="text-gray-300 leading-relaxed text-lg">
                India's tea belts—Assam, Darjeeling, and Nilgiri—are legendary for producing some of the world's finest 
                teas. From the robust, malty character of Assam CTC to the delicate, muscatel notes of Darjeeling orthodox, 
                Indian tea offers unparalleled diversity and quality. Our tea portfolio spans black, green, white, and 
                flavored varieties, sourced directly from certified estates and small-holder farms. Each batch is carefully 
                processed, graded, and tested to meet international standards. We also offer premium Arabica coffee from 
                Karnataka's Coorg region, known for its smooth, balanced flavor profile and rich aroma. Whether you need 
                bulk loose leaf, tea bags, or ready-to-brew sachets, or whole bean, roasted, or ground coffee, we provide 
                flexible packaging and custom blending services. All our tea and coffee products are available with organic, 
                Fair-Trade, and Rainforest Alliance certifications, ensuring ethical sourcing and environmental sustainability. 
                With decades of export expertise, we deliver consistent quality, competitive pricing, and full compliance with 
                global food safety regulations, making us your trusted partner for premium Indian tea and coffee.
              </p>
            </div>
            
            {/* Sub-categories Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Categories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Black Tea</h3>
                  <p className="text-gray-400 text-sm">Assam, Darjeeling, Nilgiri</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Green & White Tea</h3>
                  <p className="text-gray-400 text-sm">Premium orthodox</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Flavored Tea Blends</h3>
                  <p className="text-gray-400 text-sm">Custom blending</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-brown-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Arabica Coffee Beans</h3>
                  <p className="text-gray-400 text-sm">Coorg specialty</p>
                </div>
              </div>
            </div>

            {/* Featured Products */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Tea & Coffee Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Assam Black Tea */}
                <a href="/products/tea-coffee/assam-black-tea" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Assam Black Tea</h3>
                  <p className="text-gray-400 text-sm mb-3">Camellia sinensis var. assamica - CTC & Orthodox</p>
                  <p className="text-gray-300 text-sm mb-4">Premium Flush-1/2 grades. CTC (BOP, BP, PF) & Orthodox varieties. Robust, malty character. 2,000-2,500 kg/ha yield. NPOP certified, ISO 22000. Fair-Trade & Rainforest Alliance options.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">NPOP Certified</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Organic Option</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Fair-Trade</span>
                  </div>
                  <p className="text-amber-400 text-sm font-semibold">FOB: $2.80-4.00/kg</p>
                </a>

                {/* Darjeeling First Flush */}
                <a href="/products/tea-coffee/darjeeling-tea" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-green-500/50 transition-all">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Darjeeling First Flush</h3>
                  <p className="text-gray-400 text-sm mb-3">Whole-Leaf Black & Oolong - Champagne of Teas</p>
                  <p className="text-gray-300 text-sm mb-4">Premium orthodox processing. Delicate muscatel notes. Altitude 950-2,150m. SFTGFOP1 grade. GI-tagged \"Darjeeling Tea\". March-April harvest. High polyphenol content.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">GI Tagged</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Organic</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">SFTGFOP1</span>
                  </div>
                  <p className="text-green-400 text-sm font-semibold">FOB: Premium pricing</p>
                </a>

                {/* Arabica Coffee */}
                <a href="/products/tea-coffee/arabica-coffee" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-yellow-600/50 transition-all">
                  <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-600 transition-colors">Indian Specialty Arabica</h3>
                  <p className="text-gray-400 text-sm mb-3">Coffea arabica - Single-Estate Green Beans</p>
                  <p className="text-gray-300 text-sm mb-4">Coorg, Chikmagalur, Araku estates. Smooth, balanced flavor. Altitude 900-1,600m. Washed/natural processing. Caffeine 1.0-1.5%. Specialty Coffee Association (SCA) graded. Organic & Fair-Trade certified.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">SCA Graded</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Organic</span>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">Fair-Trade</span>
                  </div>
                  <p className="text-yellow-600 text-sm font-semibold">FOB: Contact for pricing</p>
                </a>

                {/* Robusta Coffee */}
                <a href="/products/tea-coffee/robusta-coffee" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-orange-600/50 transition-all">
                  <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-600 transition-colors">Indian Robusta Coffee</h3>
                  <p className="text-gray-400 text-sm mb-3">Coffea canephora - Shade-Grown, Low-Acidity</p>
                  <p className="text-gray-300 text-sm mb-4">Kerala & Andhra estates. Bold, full-bodied. Caffeine 2.0-2.5%. Shade-grown for lower acidity. Cherry AB grade. Moisture 11-12%. Aflatoxin &lt;2 µg/kg. Ideal for espresso blends.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-orange-600/20 text-orange-300 px-2 py-1 rounded">Shade-Grown</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Low Acidity</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Cherry AB</span>
                  </div>
                  <p className="text-orange-600 text-sm font-semibold">FOB: Contact for pricing</p>
                </a>

                {/* Tea & Coffee Extract Concentrates */}
                <a href="/products/tea-coffee/extract-concentrates" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all">
                  <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">Tea & Coffee Extract Concentrates</h3>
                  <p className="text-gray-400 text-sm mb-3">Flavor-Ready Ingredients</p>
                  <p className="text-gray-300 text-sm mb-4">Liquid & powder concentrates. Supercritical CO₂ or ethanol extraction. Total polyphenols ≥70%. Caffeine 2-4%. Instant tea/coffee, RTD beverages, nutraceuticals. GRAS status. ISO 22000 certified.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded">GRAS</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">ISO 22000</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">SC-CO₂</span>
                  </div>
                  <p className="text-teal-400 text-sm font-semibold">FOB: Contact for pricing</p>
                </a>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Benefits</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Organic Certified</h3>
                  <p className="text-gray-400">USDA Organic, EU Organic certified options from verified estates</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Fair-Trade Sourcing</h3>
                  <p className="text-gray-400">Ethical sourcing with Fair-Trade and Rainforest Alliance certifications</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Custom Blending</h3>
                  <p className="text-gray-400">Tailored blends, private-label packaging, and flexible formats</p>
                </div>
              </div>
            </div>

            {/* Export Highlights */}
            <div className="bg-gradient-to-br from-amber-900/20 to-green-700/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Export Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">HS Codes</h3>
                  <p className="text-gray-300 text-sm">0902 (Tea), 0901 (Coffee)</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Key Markets</h3>
                  <p className="text-gray-300 text-sm">UK, USA, Germany, Japan, Saudi Arabia, UAE, Russia</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Certifications</h3>
                  <p className="text-gray-300 text-sm">Organic, Fair-Trade, Rainforest Alliance, ISO 22000, FSSAI</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">MOQ</h3>
                  <p className="text-gray-300 text-sm">100 kg for tea, 50 kg for coffee (negotiable for specialty grades)</p>
                </div>
              </div>
            </div>

            {/* Sample Request CTA */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Download Tea & Coffee Catalog</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore our complete range of teas and coffees. Download our detailed catalog with specifications, grades, and pricing information.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/resources/reports" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                  Download Catalog
                </a>
                <a href="/contact" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                  Request Samples
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
