import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aromatic Effluences – Essential Oils & Natural Fragrances | The Export Express',
  description: 'Export premium Indian essential oils: Sandalwood, Jasmine, Rose, Vetiver. Cold-pressed, steam-distilled, 100% pure. COA & GC-MS analysis provided. HS Codes 3301, 3302.',
  keywords: 'essential oils export India, sandalwood oil, jasmine oil, rose oil, natural fragrances, aromatherapy oils, therapeutic grade oils',
  openGraph: {
    title: 'Aromatic Effluences – Essential Oils & Natural Fragrances',
    description: 'Export premium Indian essential oils. Cold-pressed, steam-distilled, 100% pure with COA & GC-MS analysis.',
    url: 'https://theexportexpress.com/products/aromatics',
    siteName: 'The Export Express',
    type: 'website',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/aromatics',
  },
};

export default function Aromatics() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCategory",
    "name": "Aromatic Effluences",
    "description": "Premium essential oils and natural fragrances from India including sandalwood, jasmine, rose, and vetiver",
    "url": "https://theexportexpress.com/products/aromatics",
    "provider": {
      "@type": "Organization",
      "name": "The Export Express"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Essential Oils Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Sandalwood Essential Oil",
            "category": "Essential Oils"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Jasmine Essential Oil",
            "category": "Essential Oils"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Rose Essential Oil",
            "category": "Essential Oils"
          }
        }
      ]
    }
  };
  const oils = ['Sandalwood', 'Jasmine', 'Rose', 'Vetiver', 'Lemongrass', 'Patchouli', 'Eucalyptus', 'Lavender', 'Frankincense', 'Myrrh'];

  return (
    <>
      {/* Product Category Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-purple-900/60 to-pink-700/60">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Aromatic Effluences
            </h1>
            <p className="text-2xl text-gray-200 drop-shadow-md">Essential Oils & Natural Fragrances from India</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="py-16 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Intro Text */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <p className="text-gray-300 leading-relaxed text-lg">
                From the sandalwood forests of Karnataka to the jasmine fields of Tamil Nadu, India has been the world's 
                treasure trove of aromatic botanicals for millennia. Our essential oils capture the essence of India's rich 
                aromatic heritage through traditional and modern extraction methods. Each oil is carefully sourced from 
                sustainable farms and wild-harvested regions, ensuring authenticity and therapeutic potency. We offer 100% 
                pure essential oils—cold-pressed or steam-distilled—free from synthetic additives, carriers, or dilutions. 
                Every batch comes with a Certificate of Analysis (COA) and GC-MS chromatography report, guaranteeing purity, 
                composition, and compliance with international aromatherapy standards. Our portfolio includes rare and precious 
                oils like Indian sandalwood, jasmine absolute, and rose otto, alongside popular varieties such as vetiver, 
                lemongrass, and patchouli. Whether you're formulating perfumes, cosmetics, aromatherapy products, or natural 
                wellness solutions, we provide the finest aromatic ingredients backed by rigorous quality control and global 
                export expertise.
              </p>
            </div>
            
            {/* Sub-categories Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Product Categories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Essential Oils</h3>
                  <p className="text-gray-400 text-sm">Pure, therapeutic-grade</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Hydrosols & Floral Waters</h3>
                  <p className="text-gray-400 text-sm">Gentle, water-based</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Natural Fragrance Bases</h3>
                  <p className="text-gray-400 text-sm">Custom perfumery blends</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all text-center">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Aromatic Resins & Balsams</h3>
                  <p className="text-gray-400 text-sm">Frankincense, Myrrh</p>
                </div>
              </div>
            </div>

            {/* Popular Oils */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Popular Essential Oils</h2>
              <div className="grid md:grid-cols-5 gap-3">
                {oils.map((oil) => (
                  <div key={oil} className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-all">
                    <p className="text-gray-300 text-sm">{oil}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Benefits</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">Cold-Pressed & Steam-Distilled</h3>
                  <p className="text-gray-400">Traditional extraction methods preserving natural therapeutic properties</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">COA & GC-MS Provided</h3>
                  <p className="text-gray-400">Complete Certificate of Analysis and chromatography reports for every batch</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">100% Pure & Natural</h3>
                  <p className="text-gray-400">No synthetic additives, carriers, or dilutions—therapeutic grade quality</p>
                </div>
              </div>
            </div>

            {/* Export Highlights */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-700/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Export Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">HS Codes</h3>
                  <p className="text-gray-300 text-sm">3301 (Essential oils), 3302 (Mixtures of odoriferous substances)</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Key Markets</h3>
                  <p className="text-gray-300 text-sm">EU, USA, South Korea, UAE, Japan, Australia</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Certifications</h3>
                  <p className="text-gray-300 text-sm">ISO 9001, GMP, USDA Organic (select oils), IFRA Compliant</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">MOQ</h3>
                  <p className="text-gray-300 text-sm">1 kg for rare oils, 5 kg for common varieties (negotiable)</p>
                </div>
              </div>
            </div>

            {/* Sample Request CTA */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Request a Sample Oil Kit</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the purity and potency of our essential oils. Request a sample kit with COA and GC-MS reports to evaluate quality before ordering.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                  Request Sample Kit
                </a>
                <a href="/resources/reports" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                  Download Oil Catalog
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
