import type { Metadata } from 'next';
import { Package, Home, Gift, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jute & Natural Fiber Products - Eco-Friendly Export Solutions | The Export Express',
  description: 'Premium jute bags, home decor, handicrafts, and industrial products from India. Biodegradable, customizable, and sustainable natural fiber solutions for global markets.',
  keywords: 'jute products export, jute bags India, eco-friendly jute, natural fiber products, biodegradable bags, jute handicrafts, jute home decor, sustainable packaging, golden fiber India',
  openGraph: {
    title: 'Jute & Natural Fiber Products - Eco-Friendly Export Solutions',
    description: 'Premium jute bags, home decor, handicrafts, and industrial products from India. Biodegradable, customizable, and sustainable natural fiber solutions.',
    type: 'website',
    url: 'https://theexportexpress.com/products/jute-products',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/jute-products',
  },
};

export default function JuteProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProductCategory',
            name: 'Jute & Natural Fiber Products',
            description: 'Premium jute bags, home decor, handicrafts, and industrial products from India',
            url: 'https://theexportexpress.com/products/jute-products',
            image: 'https://theexportexpress.com/images/jute-products.jpg',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Jute Products Catalog',
              itemListElement: [
                {
                  '@type': 'Product',
                  name: 'Jute Shopping Bags',
                  category: 'Jute Bags & Shopping Totes',
                },
                {
                  '@type': 'Product',
                  name: 'Jute Wall Hangings',
                  category: 'Jute Home Decor & Furnishings',
                },
                {
                  '@type': 'Product',
                  name: 'Jute Gift Baskets',
                  category: 'Jute Handicrafts & Gift Items',
                },
                {
                  '@type': 'Product',
                  name: 'Jute Geotextiles',
                  category: 'Industrial Jute Products',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-amber-700 via-yellow-600 to-green-700 text-white rounded-3xl p-12 mb-16 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Jute & Natural Fiber Products
              </h1>
              <p className="text-2xl md:text-3xl text-amber-100 font-light">
                India's Golden Fiber - Eco-Friendly & Sustainable Solutions
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              The Golden Fiber of India
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-4">
              <p>
                India stands as the world's largest producer of jute, often called the "Golden Fiber" for its lustrous appearance and immense economic value. Cultivated primarily in the fertile Ganges Delta region of West Bengal and neighboring states, jute has been an integral part of India's agricultural and industrial heritage for centuries. This versatile natural fiber offers an eco-friendly alternative to synthetic materials, making it increasingly popular in global markets focused on sustainability.
              </p>
              <p>
                Our comprehensive range of jute products combines traditional craftsmanship with modern design sensibilities. From biodegradable shopping bags that replace plastic to elegant home furnishings that add rustic charm, from intricate handicrafts that showcase artisan skills to industrial applications in geotextiles and packaging, we offer complete jute solutions. Each product is crafted with attention to quality, durability, and environmental responsibility.
              </p>
              <p>
                We work directly with jute farmers and skilled artisans across India's jute belt, ensuring fair-trade practices and sustainable harvesting methods. Our manufacturing facilities employ eco-friendly processing techniques that minimize water usage and chemical treatments. Whether you're looking for customized promotional bags with your brand logo, decorative items for retail, or bulk industrial jute products, we provide flexible MOQs, competitive pricing, and reliable export logistics. All products meet international quality standards and can be certified for organic and eco-friendly compliance as required by your market.
              </p>
            </div>
          </div>

          {/* Sub-categories Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Jute Product Range
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Jute Bags */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Jute Bags & Shopping Totes</h3>
                <p className="text-amber-50">
                  Eco-friendly shopping bags, promotional totes, wine bags, and customizable carry bags
                </p>
              </div>

              {/* Home Decor */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Jute Home Decor & Furnishings</h3>
                <p className="text-green-50">
                  Rugs, carpets, wall hangings, cushion covers, table runners, and decorative items
                </p>
              </div>

              {/* Handicrafts */}
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Gift className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Jute Handicrafts & Gift Items</h3>
                <p className="text-yellow-50">
                  Handcrafted baskets, planters, jewelry, accessories, and artisan gift products
                </p>
              </div>

              {/* Industrial */}
              <div className="bg-gradient-to-br from-amber-700 to-amber-800 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Wrench className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Industrial Jute Products</h3>
                <p className="text-amber-50">
                  Geotextiles, hessian cloth, jute yarn, sacks, and industrial packaging materials
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Product Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Jute Product Varieties
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-amber-700 mb-3">
                  Jute Bags & Shopping Totes
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our jute bags are the perfect eco-friendly alternative to plastic and paper bags. Available in various sizes from small gift bags to large shopping totes, these bags are durable, reusable, and fully biodegradable. We offer plain natural jute bags, laminated jute bags for added durability, printed bags with custom designs, and bags with cotton handles for comfort. Popular styles include wine bottle bags, lunch bags, beach bags, and promotional tote bags that can be customized with your brand logo through screen printing, heat transfer, or embroidery. Ideal for retail stores, corporate events, weddings, and promotional campaigns.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-3">
                  Jute Home Decor & Furnishings
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Transform living spaces with our range of jute home decor products that bring natural elegance and rustic charm. Our collection includes hand-woven jute rugs and carpets in various sizes and patterns, decorative wall hangings featuring traditional and contemporary designs, cushion covers with jute fabric combined with cotton or silk, table runners and placemats for dining aesthetics, storage baskets and organizers, and jute curtains or room dividers. These products appeal to eco-conscious consumers seeking sustainable home decor options and are popular in markets emphasizing natural, organic interiors. Each piece showcases the natural texture and golden hue of jute while providing functional utility.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-yellow-700 mb-3">
                  Jute Handicrafts & Gift Items
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our jute handicrafts represent the skilled artistry of Indian craftspeople who transform raw jute into beautiful, functional art pieces. The range includes decorative planters and flower pots, handcrafted jewelry boxes and storage containers, jute-based fashion accessories like bags and jewelry, gift baskets for hampers and presentations, decorative dolls and figurines, coasters and trivets, and seasonal decorative items. Many products combine jute with other natural materials like bamboo, wood, or cotton for enhanced aesthetic appeal. These handicrafts are perfect for gift shops, boutiques, and fair-trade retailers, offering unique products with a story of sustainable craftsmanship.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-amber-800 mb-3">
                  Industrial Jute Products
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Beyond consumer goods, jute serves crucial industrial applications. Our industrial jute range includes geotextiles for soil erosion control and road construction, hessian cloth (burlap) for packaging and agriculture, jute yarn in various counts for manufacturing, jute sacks and bags for agricultural produce storage, jute webbing and tapes for upholstery and strapping, and composite materials combining jute with polymers for automotive and construction industries. These products leverage jute's natural strength, breathability, and biodegradability, making them ideal for sustainable industrial applications. We supply to agriculture, construction, packaging, and manufacturing sectors worldwide with consistent quality and competitive pricing.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why Choose Our Jute Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  100% Biodegradable
                </h3>
                <p className="text-gray-300">
                  Completely natural and eco-friendly, jute products decompose naturally without harming the environment, making them the perfect sustainable alternative to plastic.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30">
                <h3 className="text-2xl font-bold text-amber-400 mb-4">
                  Fully Customizable
                </h3>
                <p className="text-gray-300">
                  Custom sizes, colors, prints, and designs available. Add your brand logo, choose handle styles, and select finishes to create unique products for your market.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  Flexible Bulk Orders
                </h3>
                <p className="text-gray-300">
                  Competitive pricing for bulk orders with flexible MOQs. Fast production turnaround and reliable export logistics to meet your business needs.
                </p>
              </div>
            </div>
          </div>

          {/* Export Information */}
          <div className="bg-gradient-to-br from-amber-900 to-green-900 text-white rounded-2xl p-8 md:p-12 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Export Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-amber-200 mb-3">HS Codes</h3>
                <ul className="space-y-2 text-amber-50">
                  <li>• <strong>6305</strong> - Jute Bags & Sacks</li>
                  <li>• <strong>5607</strong> - Jute Twine, Cordage & Rope</li>
                  <li>• <strong>5310</strong> - Jute Woven Fabrics</li>
                  <li>• <strong>4602</strong> - Jute Basketwork & Wickerwork</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-200 mb-3">Key Export Markets</h3>
                <ul className="space-y-2 text-amber-50">
                  <li>• United States</li>
                  <li>• European Union (Germany, UK, France)</li>
                  <li>• Australia & New Zealand</li>
                  <li>• Canada</li>
                  <li>• Japan & South Korea</li>
                  <li>• Middle East (UAE, Saudi Arabia)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-200 mb-3">Certifications</h3>
                <ul className="space-y-2 text-amber-50">
                  <li>• Eco-Friendly Certification</li>
                  <li>• ISO 9001:2015 (Quality Management)</li>
                  <li>• Fair-Trade Certified (Available)</li>
                  <li>• GOTS (Global Organic Textile Standard)</li>
                  <li>• FSC Certified (Forest Stewardship Council)</li>
                  <li>• Biodegradable & Compostable Certification</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-200 mb-3">Order Details</h3>
                <ul className="space-y-2 text-amber-50">
                  <li>• <strong>MOQ:</strong> Varies by product (500-5000 units)</li>
                  <li>• <strong>Packaging:</strong> Carton boxes or as per requirement</li>
                  <li>• <strong>Lead Time:</strong> 15-30 days</li>
                  <li>• <strong>Payment:</strong> LC, T/T, or as negotiated</li>
                  <li>• <strong>Customization:</strong> Logo printing, sizes, colors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-green-600 text-white rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Go Green with Jute?
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Explore our complete range of eco-friendly jute products and start your sustainable journey today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/resources/reports" className="bg-white hover:bg-amber-50 text-amber-700 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                Download Jute Product Catalog
              </a>
              <a href="/contact" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                Request Custom Quote
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
