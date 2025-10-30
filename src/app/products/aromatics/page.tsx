import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aromatic Effluences – Essential Oils & Natural Fragrances | The Export Express',
  description: 'Export premium Indian essential oils: Sandalwood, Jasmine Absolute, Rose Absolute, Vetiver, Lemongrass. Steam-distilled, 100% pure. COA & GC-MS analysis. CITES compliant. HS Codes 3301, 3302.',
  keywords: 'essential oils export India, sandalwood oil, jasmine absolute, rose absolute, vetiver oil, lemongrass oil, natural fragrances, aromatherapy oils, therapeutic grade oils, CITES compliant',
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
            "description": "Premium Kashmir sandalwood oil, 70-90% α-santalol, CITES compliant",
            "category": "Essential Oils"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Jasmine Absolute",
            "description": "Luxurious jasmine absolute from hand-picked pre-dawn blossoms",
            "category": "Essential Oils"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Rose Absolute",
            "description": "Exquisite rose absolute from Rosa damascena, Kashmir origin",
            "category": "Essential Oils"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Vetiver Essential Oil",
            "description": "Earthy vetiver oil from 12-18 month roots, 30%+ vetiverol",
            "category": "Essential Oils"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Lemongrass Essential Oil",
            "description": "Bright citrusy lemongrass oil with 75%+ citral content",
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

            {/* Featured Products */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Essential Oils & Absolutes</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sandalwood Essential Oil */}
                <a href="/products/aromatics/sandalwood-oil" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Sandalwood Essential Oil</h3>
                  <p className="text-gray-400 text-sm mb-3">Santalum album - 70-90% α-santalol</p>
                  <p className="text-gray-300 text-sm mb-4">Premium Kashmir sandalwood oil with GI certification. Steam-distilled from 15+ year old heartwood. CITES compliant, organic & fair-trade certified.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">GMP Certified</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">USDA Organic</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">CITES</span>
                  </div>
                  <p className="text-purple-400 text-sm font-semibold">FOB: $1,200-$2,500/kg</p>
                </a>

                {/* Jasmine Absolute */}
                <a href="/products/aromatics/jasmine-absolute" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all">
                  <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Jasmine Absolute</h3>
                  <p className="text-gray-400 text-sm mb-3">Jasminum grandiflorum - Solvent extracted</p>
                  <p className="text-gray-300 text-sm mb-4">Luxurious jasmine absolute from hand-picked pre-dawn blossoms. High linalool & benzyl acetate content. Hexane residue &lt;10ppm. NABL lab certified.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">ISO 9001</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Organic Option</span>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">IFRA Compliant</span>
                  </div>
                  <p className="text-pink-400 text-sm font-semibold">FOB: Contact for pricing</p>
                </a>

                {/* Rose Absolute */}
                <a href="/products/aromatics/rose-absolute" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-rose-500/50 transition-all">
                  <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">Rose Absolute</h3>
                  <p className="text-gray-400 text-sm mb-3">Rosa damascena - Kashmir origin</p>
                  <p className="text-gray-300 text-sm mb-4">Exquisite rose absolute with 30%+ phenylethyl alcohol, 20%+ geraniol. Solvent-extracted from fresh petals. GC-MS certified, batch traceability via QR code.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">GMP</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Fair Trade</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">COSMOS</span>
                  </div>
                  <p className="text-rose-400 text-sm font-semibold">FOB: Premium pricing</p>
                </a>

                {/* Vetiver Essential Oil */}
                <a href="/products/aromatics/vetiver-oil" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Vetiver Essential Oil</h3>
                  <p className="text-gray-400 text-sm mb-3">Chrysopogon zizanioides - Root distilled</p>
                  <p className="text-gray-300 text-sm mb-4">Earthy, grounding vetiver oil from 12-18 month roots. 30%+ vetiverol, rich sesquiterpene profile. Steam distilled, nitrogen-sealed packaging. APEDA registered.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">ISO 9001</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Sustainable</span>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">REACH</span>
                  </div>
                  <p className="text-emerald-400 text-sm font-semibold">FOB: Contact for pricing</p>
                </a>

                {/* Lemongrass Essential Oil */}
                <a href="/products/aromatics/lemongrass-oil" className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Lemongrass Essential Oil</h3>
                  <p className="text-gray-400 text-sm mb-3">Cymbopogon flexuosus - Fresh citrus aroma</p>
                  <p className="text-gray-300 text-sm mb-4">Bright, citrusy lemongrass oil with 75%+ citral content. Steam-distilled from fresh stalks harvested at peak morning hours. Pesticide-free, IPM cultivated.</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">GMP</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Organic Option</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Halal</span>
                  </div>
                  <p className="text-yellow-400 text-sm font-semibold">FOB: Contact for pricing</p>
                </a>
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
