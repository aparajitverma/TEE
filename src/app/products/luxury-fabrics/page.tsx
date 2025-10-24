import type { Metadata } from 'next';
import { Sparkles, Shirt, Scissors, Palette } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Luxury Fabric Sourcing - Premium Indian Textiles | The Export Express',
  description: 'Source authentic luxury fabrics from India including pure silk (Banarasi, Kanjivaram), premium cotton, handloom heritage weaves, and designer fabric collections for global fashion markets.',
  keywords: 'luxury fabric India, silk fabric export, Banarasi silk, Kanjivaram silk, premium cotton fabric, handloom textiles, designer fabrics, Indian silk sourcing, heritage weaves, textile export India',
  openGraph: {
    title: 'Luxury Fabric Sourcing - Premium Indian Textiles',
    description: 'Source authentic luxury fabrics from India including pure silk, premium cotton, handloom heritage weaves, and designer fabric collections.',
    type: 'website',
    url: 'https://theexportexpress.com/products/luxury-fabrics',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/luxury-fabrics',
  },
};

export default function LuxuryFabricsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProductCategory',
            name: 'Luxury Fabric Sourcing',
            description: 'Premium Indian luxury fabrics including pure silk, premium cotton, handloom heritage weaves, and designer fabric collections',
            url: 'https://theexportexpress.com/products/luxury-fabrics',
            image: 'https://theexportexpress.com/images/luxury-fabrics.jpg',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Luxury Fabric Catalog',
              itemListElement: [
                {
                  '@type': 'Product',
                  name: 'Banarasi Silk Fabric',
                  category: 'Pure Silk Fabrics',
                },
                {
                  '@type': 'Product',
                  name: 'Kanjivaram Silk Fabric',
                  category: 'Pure Silk Fabrics',
                },
                {
                  '@type': 'Product',
                  name: 'Premium Egyptian Cotton',
                  category: 'Premium Cotton & Linen',
                },
                {
                  '@type': 'Product',
                  name: 'Handloom Khadi Fabric',
                  category: 'Handloom & Heritage Weaves',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-purple-800 via-pink-700 to-amber-700 text-white rounded-3xl p-12 mb-16 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Luxury Fabric Sourcing
              </h1>
              <p className="text-2xl md:text-3xl text-purple-100 font-light">
                India's Heritage Luxury Fabrics - Timeless Elegance & Craftsmanship
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              The Legacy of Indian Luxury Textiles
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-4">
              <p>
                India's textile heritage spans over 5,000 years, establishing the country as one of the world's most renowned sources of luxury fabrics. From the legendary Banarasi silks woven in the ancient city of Varanasi to the opulent Kanjivaram silks of Tamil Nadu, Indian luxury fabrics represent the pinnacle of craftsmanship, artistry, and cultural heritage. These textiles have adorned royalty, graced international fashion runways, and continue to be sought after by designers and connoisseurs worldwide for their unmatched quality, intricate designs, and timeless appeal.
              </p>
              <p>
                Our luxury fabric sourcing service connects you directly with India's finest textile artisans, weavers, and manufacturers. We specialize in authentic, high-quality fabrics that meet international standards while preserving traditional techniques passed down through generations. Whether you're sourcing pure silk fabrics with intricate zari work, premium long-staple cotton for haute couture, handloom heritage weaves that tell stories of regional craftsmanship, or contemporary designer fabric collections that blend tradition with modern aesthetics, we provide comprehensive sourcing solutions tailored to your specific requirements.
              </p>
              <p>
                We work with certified weavers and textile clusters across India, ensuring authenticity, quality control, and ethical sourcing practices. Each fabric undergoes rigorous quality checks for weave density, color fastness, fabric strength, and finish. Our services include fabric sampling, custom color matching, bulk production coordination, quality inspection, and export documentation. With flexible order quantities, competitive pricing, and reliable logistics, we make it easy for fashion houses, designers, retailers, and textile importers to access India's luxury fabric heritage. All fabrics can be certified for origin, quality standards, and sustainable production practices as required by your market.
              </p>
            </div>
          </div>

          {/* Sub-categories Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Luxury Fabric Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pure Silk */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Pure Silk Fabrics</h3>
                <p className="text-purple-50">
                  Banarasi, Kanjivaram, Tussar, Muga silk with intricate zari work and traditional motifs
                </p>
              </div>

              {/* Premium Cotton */}
              <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Shirt className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Premium Cotton & Linen</h3>
                <p className="text-pink-50">
                  Long-staple cotton, organic cotton, linen blends, and luxury cotton fabrics
                </p>
              </div>

              {/* Handloom */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Scissors className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Handloom & Heritage Weaves</h3>
                <p className="text-amber-50">
                  Khadi, Chanderi, Maheshwari, Pochampally, and regional handloom textiles
                </p>
              </div>

              {/* Designer */}
              <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Palette className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Designer Fabric Collections</h3>
                <p className="text-rose-50">
                  Contemporary prints, embroidered fabrics, jacquards, and custom designer textiles
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Product Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Luxury Fabric Categories
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                  Pure Silk Fabrics (Banarasi, Kanjivaram)
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Indian silk fabrics represent the epitome of luxury and craftsmanship. Banarasi silk from Varanasi features intricate brocade work with gold and silver zari threads, creating elaborate floral and foliate motifs inspired by Mughal art. Kanjivaram silk from Tamil Nadu is renowned for its durability, vibrant colors, and contrasting borders with temple-inspired designs. We also source Tussar silk with its natural golden sheen, Muga silk from Assam known for its durability and luster, and Eri silk for its soft texture. Available in various weights from lightweight for sarees and scarves to heavier fabrics for upholstery and home furnishings. Each piece is authenticated and sourced directly from master weavers, ensuring genuine quality and supporting traditional artisan communities.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-pink-700 mb-3">
                  Premium Cotton & Linen
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our premium cotton collection features long-staple varieties known for their superior softness, strength, and luster. We source organic cotton certified by GOTS, Egyptian cotton-quality Indian varieties with extra-long fibers, Supima-equivalent cotton for luxury garments, and specialty cotton blends. Our linen offerings include pure linen fabrics with natural slub texture, linen-cotton blends for enhanced drape and comfort, and dyed linen in contemporary colors. These fabrics are ideal for haute couture, luxury home textiles, resort wear, and premium fashion collections. Available in various thread counts, weaves (plain, twill, sateen), and finishes (mercerized, sanforized, pre-shrunk). All fabrics undergo quality testing for thread count, tensile strength, and color fastness to ensure they meet international luxury standards.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-amber-700 mb-3">
                  Handloom & Heritage Weaves
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  India's handloom heritage represents centuries of weaving traditions unique to different regions. Khadi, the hand-spun and hand-woven fabric championed by Mahatma Gandhi, offers natural texture and breathability. Chanderi from Madhya Pradesh combines silk and cotton with distinctive sheer texture and lightweight feel. Maheshwari fabrics feature reversible borders and checks in vibrant colors. Pochampally ikat from Telangana showcases geometric patterns created through resist-dyeing techniques. We also source Patola double ikat from Gujarat, Jamdani from West Bengal with intricate supplementary weft patterns, and regional weaves like Kota Doria, Bhagalpuri silk, and Sambalpuri ikat. Each handloom fabric carries a geographical indication (GI) tag when applicable, certifying its authentic origin and supporting sustainable livelihoods for weaving communities.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-rose-700 mb-3">
                  Designer Fabric Collections
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our designer fabric collections bridge traditional craftsmanship with contemporary aesthetics. This range includes digitally printed fabrics with custom designs, hand-block printed textiles using natural dyes, embroidered fabrics featuring zardozi, chikankari, and aari work, jacquard fabrics with intricate woven patterns, sequined and embellished fabrics for evening wear, and fusion textiles combining multiple techniques. We collaborate with textile designers and fashion houses to create exclusive fabric collections, offering custom color palettes, pattern development, and limited-edition runs. These fabrics cater to high-end fashion designers, luxury brands, and boutique retailers seeking unique textiles that stand out in the market. Services include trend forecasting, seasonal collections, and rapid sampling to meet fashion industry timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why Source Luxury Fabrics From Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                  Authentic Sourcing
                </h3>
                <p className="text-gray-300">
                  Direct partnerships with certified weavers and artisans ensure genuine, high-quality fabrics with verified origin and traditional craftsmanship.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30">
                <h3 className="text-2xl font-bold text-pink-400 mb-4">
                  Quality Certification
                </h3>
                <p className="text-gray-300">
                  Rigorous quality control with international testing standards. All fabrics certified for weave quality, color fastness, and durability.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30">
                <h3 className="text-2xl font-bold text-amber-400 mb-4">
                  Custom Orders
                </h3>
                <p className="text-gray-300">
                  Flexible customization options including color matching, pattern development, and exclusive designs tailored to your brand requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Export Information */}
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 text-white rounded-2xl p-8 md:p-12 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Export Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-200 mb-3">HS Codes</h3>
                <ul className="space-y-2 text-purple-50">
                  <li>• <strong>5007</strong> - Woven Silk Fabrics</li>
                  <li>• <strong>5208</strong> - Woven Cotton Fabrics</li>
                  <li>• <strong>5309</strong> - Woven Linen Fabrics</li>
                  <li>• <strong>5801</strong> - Woven Pile & Chenille Fabrics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-200 mb-3">Key Export Markets</h3>
                <ul className="space-y-2 text-purple-50">
                  <li>• United States</li>
                  <li>• European Union (Italy, France, UK, Germany)</li>
                  <li>• United Arab Emirates</li>
                  <li>• Japan & South Korea</li>
                  <li>• Australia</li>
                  <li>• Canada</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-200 mb-3">Certifications</h3>
                <ul className="space-y-2 text-purple-50">
                  <li>• Silk Mark Certification (Pure Silk)</li>
                  <li>• GOTS (Global Organic Textile Standard)</li>
                  <li>• GI Tag (Geographical Indication)</li>
                  <li>• ISO 9001:2015 (Quality Management)</li>
                  <li>• Oeko-Tex Standard 100</li>
                  <li>• Handloom Mark (Authentic Handloom)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-200 mb-3">Order Details</h3>
                <ul className="space-y-2 text-purple-50">
                  <li>• <strong>MOQ:</strong> Varies by fabric (50-500 meters)</li>
                  <li>• <strong>Sampling:</strong> Available before bulk orders</li>
                  <li>• <strong>Lead Time:</strong> 30-60 days (handloom varies)</li>
                  <li>• <strong>Payment:</strong> LC, T/T, or as negotiated</li>
                  <li>• <strong>Customization:</strong> Colors, patterns, exclusive designs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 text-white rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Source Luxury Fabrics?
            </h2>
            <p className="text-xl mb-8 text-purple-50">
              Connect with India's finest textile heritage and elevate your collections with authentic luxury fabrics
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="bg-white hover:bg-purple-50 text-purple-700 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                Request Fabric Samples
              </a>
              <a href="/resources/reports" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                Download Fabric Catalog
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
