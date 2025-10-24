import type { Metadata } from 'next';
import { Flame, Droplet, Blend, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Herbs & Spices - India\'s Spice Heritage Export | The Export Express',
  description: 'Premium Indian spices export including whole spices, ground powders, spice blends, and organic varieties. Lab-tested quality with private-label options for global markets.',
  keywords: 'Indian spices export, whole spices, ground spices, spice blends, organic spices, turmeric, black pepper, cardamom, cumin, coriander, spice powder export India',
  openGraph: {
    title: 'Herbs & Spices - India\'s Spice Heritage Export',
    description: 'Premium Indian spices export including whole spices, ground powders, spice blends, and organic varieties. Lab-tested quality with private-label options.',
    type: 'website',
    url: 'https://theexportexpress.com/products/herbs-spices',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/herbs-spices',
  },
};

export default function HerbsSpicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProductCategory',
            name: 'Herbs & Spices',
            description: 'Premium Indian herbs and spices including whole spices, ground powders, spice blends, and organic varieties',
            url: 'https://theexportexpress.com/products/herbs-spices',
            image: 'https://theexportexpress.com/images/herbs-spices.jpg',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Spices Catalog',
              itemListElement: [
                {
                  '@type': 'Product',
                  name: 'Black Pepper',
                  category: 'Whole Spices',
                },
                {
                  '@type': 'Product',
                  name: 'Turmeric Powder',
                  category: 'Ground Spices & Powders',
                },
                {
                  '@type': 'Product',
                  name: 'Garam Masala',
                  category: 'Spice Blends',
                },
                {
                  '@type': 'Product',
                  name: 'Organic Cardamom',
                  category: 'Organic Spices',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-red-700 via-orange-600 to-yellow-600 text-white rounded-3xl p-12 mb-16 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Herbs & Spices
              </h1>
              <p className="text-2xl md:text-3xl text-orange-100 font-light">
                India's Spice Heritage - Aromatic Excellence Since Ancient Times
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              The Land of Spices
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-4">
              <p>
                India has been the world's spice capital for over 5,000 years, earning the title "Land of Spices" through its unparalleled variety, quality, and export heritage. From the pungent black pepper of Kerala's Malabar Coast to the golden turmeric of Tamil Nadu, from the aromatic cardamom of the Western Ghats to the fiery red chilies of Andhra Pradesh, Indian spices have shaped global cuisines, trade routes, and culinary traditions. Our diverse climate zones and rich soil conditions allow cultivation of virtually every spice variety, making India the largest producer, consumer, and exporter of spices worldwide.
              </p>
              <p>
                Our comprehensive spice portfolio encompasses the entire spectrum from farm to export. We source directly from certified farmers and spice estates across India's major spice-growing regions, ensuring authenticity, traceability, and consistent quality. Each spice undergoes rigorous cleaning, sorting, and processing using state-of-the-art facilities that maintain natural flavor, aroma, and color while meeting international food safety standards. Whether you need whole spices for industrial processing, finely ground powders for retail packaging, custom spice blends for food service, or organic certified varieties for premium markets, we provide complete solutions tailored to your specifications.
              </p>
              <p>
                Quality assurance is paramount in our operations. All spices undergo third-party laboratory testing for aflatoxin levels, pesticide residues, microbial contamination, and heavy metals to ensure compliance with FDA, EU, and other international regulations. We offer flexible packaging options from bulk containers to consumer-ready pouches, with private-label services including custom blending, grinding specifications, and branded packaging design. Our export documentation, certifications, and logistics support ensure smooth customs clearance and timely delivery to destinations worldwide. With competitive pricing, reliable supply chains, and unwavering commitment to quality, we serve food manufacturers, spice importers, retailers, and food service companies across global markets.
              </p>
            </div>
          </div>

          {/* Sub-categories Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Spice Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Whole Spices */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Flame className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Whole Spices</h3>
                <p className="text-red-50">
                  Black pepper, cardamom, cloves, cinnamon, cumin, coriander seeds, and more
                </p>
              </div>

              {/* Ground Spices */}
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Droplet className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Ground Spices & Powders</h3>
                <p className="text-orange-50">
                  Turmeric powder, chili powder, cumin powder, coriander powder, custom mesh sizes
                </p>
              </div>

              {/* Spice Blends */}
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Blend className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Spice Blends</h3>
                <p className="text-yellow-50">
                  Garam masala, curry powder, tandoori masala, chaat masala, custom blends
                </p>
              </div>

              {/* Organic */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Organic & Non-Organic</h3>
                <p className="text-green-50">
                  Certified organic spices and conventional varieties to suit all market needs
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Product Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Spice Varieties & Specifications
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-red-700 mb-3">
                  Whole Spices
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our whole spices retain maximum flavor, aroma, and shelf life, making them ideal for industrial processing, grinding operations, and culinary applications. The range includes Black Pepper (Tellicherry, Malabar, Muntok grades), Green and White Cardamom with high volatile oil content, premium Cloves from Kerala and Tamil Nadu, Ceylon and Cassia Cinnamon in various grades, Cumin Seeds (Jeera) in bold and regular varieties, Coriander Seeds with consistent oil content, Star Anise, Nutmeg and Mace, Fenugreek Seeds, Mustard Seeds (yellow, brown, black), Fennel Seeds, and Ajwain (Carom Seeds). All whole spices are mechanically cleaned, sorted by size, and free from foreign matter, stems, and damaged kernels. Available in moisture-controlled packaging to preserve freshness during transit and storage.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                  Ground Spices & Powders
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our grinding facilities produce consistent, fine-mesh spice powders that meet exact specifications for color, flavor intensity, and particle size. Popular ground spices include Turmeric Powder (Curcumin content 2-5%), Red Chili Powder in various heat levels (measured in Scoville units), Cumin Powder, Coriander Powder, Black Pepper Powder in different mesh sizes, Ginger Powder, Garlic Powder, Onion Powder, Cinnamon Powder, and Cardamom Powder. We offer custom grinding to your specified mesh size (40 mesh, 60 mesh, 80 mesh, etc.) and can blend multiple spices to create proprietary formulations. All powders are tested for moisture content, volatile oil percentage, and microbial load. Steam sterilization available for markets requiring additional safety measures. Packaging options include bulk bags, retail pouches, and food-grade containers with nitrogen flushing for extended shelf life.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-yellow-700 mb-3">
                  Spice Blends
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our spice blending expertise allows us to create authentic Indian masalas and custom blends for international cuisines. Traditional blends include Garam Masala (warming spice mix), Curry Powder in mild, medium, and hot variants, Tandoori Masala for grilled dishes, Chaat Masala (tangy street food seasoning), Sambar Powder, Rasam Powder, Biryani Masala, Pav Bhaji Masala, and regional specialty blends. We also develop custom blends for specific applications like BBQ rubs, taco seasonings, Italian herb mixes, Middle Eastern za'atar, and proprietary restaurant formulations. Each blend is carefully crafted to balance flavors, maintain consistency across batches, and meet your exact taste profile. We provide recipe development support, sensory evaluation, and shelf-life testing. Private-label packaging with your brand design, nutritional labeling, and ingredient declarations included.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-3">
                  Organic & Non-Organic Options
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We offer both organic certified and conventional spices to serve diverse market segments. Our organic spices are sourced from certified organic farms following USDA NOP, EU Organic, and India Organic standards. These spices are grown without synthetic pesticides, chemical fertilizers, or GMOs, with complete traceability from farm to export. Organic certification documents provided with each shipment. Popular organic varieties include turmeric, black pepper, cardamom, ginger, cumin, coriander, and chili. Conventional (non-organic) spices offer cost-effective options while still maintaining high quality and safety standards through IPM (Integrated Pest Management) practices. Both categories undergo the same rigorous testing for contaminants and quality parameters. We can supply mixed containers with both organic and conventional products to optimize your inventory and meet different customer preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why Choose Our Spices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  Lab Testing
                </h3>
                <p className="text-gray-300">
                  Third-party laboratory testing for aflatoxin, pesticide residues, heavy metals, and microbial contamination. Full compliance with FDA and EU regulations.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">
                  Private-Label Ready
                </h3>
                <p className="text-gray-300">
                  Custom blending, grinding specifications, and branded packaging design. Create your own spice brand with our manufacturing expertise.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  Direct Sourcing
                </h3>
                <p className="text-gray-300">
                  Direct relationships with spice farmers and estates ensure authentic quality, competitive pricing, and consistent supply throughout the year.
                </p>
              </div>
            </div>
          </div>

          {/* Export Information */}
          <div className="bg-gradient-to-br from-red-900 to-orange-900 text-white rounded-2xl p-8 md:p-12 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Export Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">HS Codes</h3>
                <ul className="space-y-2 text-orange-50">
                  <li>• <strong>0904</strong> - Pepper (Black, White, Long)</li>
                  <li>• <strong>0905</strong> - Vanilla</li>
                  <li>• <strong>0906</strong> - Cinnamon & Cassia</li>
                  <li>• <strong>0907</strong> - Cloves</li>
                  <li>• <strong>0908</strong> - Nutmeg, Mace & Cardamom</li>
                  <li>• <strong>0909</strong> - Seeds of Anise, Coriander, Cumin</li>
                  <li>• <strong>0910</strong> - Ginger, Turmeric, Other Spices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">Key Export Markets</h3>
                <ul className="space-y-2 text-orange-50">
                  <li>• United States</li>
                  <li>• European Union (Germany, UK, Netherlands)</li>
                  <li>• Middle East (UAE, Saudi Arabia, Kuwait)</li>
                  <li>• Southeast Asia (Malaysia, Singapore)</li>
                  <li>• Australia & New Zealand</li>
                  <li>• Canada</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">Certifications</h3>
                <ul className="space-y-2 text-orange-50">
                  <li>• USDA Organic / EU Organic (for organic range)</li>
                  <li>• Spices Board India Certification</li>
                  <li>• ISO 22000 (Food Safety Management)</li>
                  <li>• HACCP Certified Processing</li>
                  <li>• Kosher & Halal Certified</li>
                  <li>• FSSAI Licensed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-orange-200 mb-3">Order Details</h3>
                <ul className="space-y-2 text-orange-50">
                  <li>• <strong>MOQ:</strong> 100-1000 kg (varies by spice)</li>
                  <li>• <strong>Packaging:</strong> Bulk bags, retail pouches, custom</li>
                  <li>• <strong>Lead Time:</strong> 15-30 days</li>
                  <li>• <strong>Payment:</strong> LC, T/T, or as negotiated</li>
                  <li>• <strong>Customization:</strong> Blending, grinding, private-label</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Spice Up Your Business?
            </h2>
            <p className="text-xl mb-8 text-orange-50">
              Get a custom quote for private-label spices or explore our complete spice portfolio
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="bg-white hover:bg-orange-50 text-orange-700 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                Get a Private-Label Quote
              </a>
              <a href="/resources/reports" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                Download Spice Catalog
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
