import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Herbal & Ayurvedic Products – Premium Indian Herbs | The Export Express',
  description: 'Export premium Ayurvedic herbs from India: Ashwagandha, Turmeric, Brahmi, Tulsi. Available as raw roots, powders, extracts. USDA Organic, ISO certified. 150+ herbs in stock.',
  keywords: 'Ayurvedic herbs export, Indian herbal products, Ashwagandha exporter, Turmeric export, herbal extracts, organic herbs India, GMP certified herbs',
  openGraph: {
    title: 'Herbal & Ayurvedic Products – Premium Indian Herbs',
    description: 'Export premium Ayurvedic herbs from India. 150+ herbs available as raw roots, powders, and standardized extracts.',
    url: 'https://theexportexpress.com/products/herbal-ayurvedic',
    siteName: 'The Export Express',
    type: 'website',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/herbal-ayurvedic',
  },
};

export default function HerbalAyurvedic() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "Herbal & Ayurvedic Products",
    "description": "Premium Ayurvedic herbs from India available in various forms including raw roots, powders, and standardized extracts",
    "url": "https://theexportexpress.com/products/herbal-ayurvedic",
    "provider": {
      "@type": "Organization",
      "name": "The Export Express"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Ayurvedic Herbs Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Ashwagandha",
            "category": "Ayurvedic Herbs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Turmeric",
            "category": "Ayurvedic Herbs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Brahmi",
            "category": "Ayurvedic Herbs"
          }
        }
      ]
    }
  };

  const products = [
    'Ashwagandha', 'Turmeric (Curcuma longa)', 'Brahmi', 'Giloy', 'Tulsi (Holy Basil)',
    'Neem', 'Amla (Indian Gooseberry)', 'Triphala', 'Shatavari', 'Moringa',
    'Guggul', 'Boswellia', 'Bacopa Monnieri', 'Gymnema Sylvestre'
  ];

  return (
    <>
      {/* Product Category Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-green-900/60 to-green-700/60">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Herbal & Ayurvedic Products
            </h1>
            <p className="text-2xl text-gray-200 drop-shadow-md">India's Ancient Wellness Tradition</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Intro Text */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <p className="text-gray-300 leading-relaxed text-lg">
                India is the birthplace of Ayurveda, the ancient science of life and holistic wellness. For over 5,000 years, 
                Ayurvedic herbs have been used to promote health, vitality, and balance. Today, these time-tested botanicals 
                are in high demand globally, powering the nutraceutical, pharmaceutical, and wellness industries. We source 
                premium Ayurvedic herbs directly from certified organic farms and traditional growers across India, ensuring 
                authenticity, potency, and purity. Our portfolio includes over 150 herbs available in various forms—raw roots, 
                dried slices, fine powders, standardized extracts, and ready-to-use capsules. All products are harvested 
                sustainably, processed in GMP-certified facilities, and backed by rigorous quality testing. Whether you need 
                bulk raw materials or finished formulations, we deliver Ayurvedic excellence to markets worldwide.
              </p>
            </div>
            
            {/* Sub-categories Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Forms Available</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Raw Roots & Whole Herbs</h3>
                  <p className="text-gray-400 text-sm">Dried, cleaned, sorted</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Dried & Powdered Herbs</h3>
                  <p className="text-gray-400 text-sm">Fine mesh powders</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Standardized Extracts</h3>
                  <p className="text-gray-400 text-sm">5-30% w/w actives</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Herbal Oils & Tinctures</h3>
                  <p className="text-gray-400 text-sm">Liquid extracts</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Ayurvedic Formulations</h3>
                  <p className="text-gray-400 text-sm">Ready-to-use blends</p>
                </div>
              </div>
            </div>

            {/* Popular Products */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Popular Ayurvedic Herbs</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product} className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-all">
                    <p className="text-gray-300 text-sm">{product}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Benefits</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Authentic Sourcing</h3>
                  <p className="text-gray-400">Direct from traditional growers and certified organic farms across India</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Quality Assured</h3>
                  <p className="text-gray-400">GMP-certified processing with rigorous lab testing for purity and potency</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Global Compliance</h3>
                  <p className="text-gray-400">USDA Organic, EU Organic, ISO-9001, and FDA-registered facilities</p>
                </div>
              </div>
            </div>

            {/* Export Highlights */}
            <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Export Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Certifications</h3>
                  <p className="text-gray-300 text-sm">ISO-9001, GMP, US-FDA, USDA Organic, EU Organic, FSSAI</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">HS Codes</h3>
                  <p className="text-gray-300 text-sm">1211 (Plants & parts), 1302 (Vegetable extracts), 1303 (Pectins), 2106 (Food preparations)</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Key Markets</h3>
                  <p className="text-gray-300 text-sm">USA, EU, Japan, South Korea, Australia, Middle East</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">MOQ</h3>
                  <p className="text-gray-300 text-sm">500 kg for raw herbs, 100 kg for extracts (negotiable)</p>
                </div>
              </div>
            </div>

            {/* Sample Request CTA */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Request Product Samples</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Interested in our Ayurvedic herbs? Request free samples and detailed specifications to evaluate quality before placing your order.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                  Request Samples
                </a>
                <a href="/resources/reports" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                  Download Product Catalog
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
