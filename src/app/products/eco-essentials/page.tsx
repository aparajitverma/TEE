import type { Metadata } from 'next';
import { Leaf, Utensils, Sparkles, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eco-Friendly Daily Essentials - Sustainable Organic Products | The Export Express',
  description: 'Export organic personal care products, bamboo utensils, natural cleaning products, and biodegradable packaging from India. Eco-certified, plastic-free solutions with profitable margins.',
  keywords: 'eco-friendly products India, organic personal care export, bamboo utensils, natural cleaning products, biodegradable packaging, sustainable daily essentials, plastic-free products, green products India',
  openGraph: {
    title: 'Eco-Friendly Daily Essentials - Sustainable Organic Products',
    description: 'Export organic personal care products, bamboo utensils, natural cleaning products, and biodegradable packaging from India. Eco-certified and plastic-free.',
    type: 'website',
    url: 'https://theexportexpress.com/products/eco-essentials',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/products/eco-essentials',
  },
};

export default function EcoEssentialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProductCategory',
            name: 'Eco-Friendly Daily Essentials',
            description: 'Sustainable organic products including personal care, bamboo utensils, natural cleaning products, and biodegradable packaging from India',
            url: 'https://theexportexpress.com/products/eco-essentials',
            image: 'https://theexportexpress.com/images/eco-essentials.jpg',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Eco-Friendly Products Catalog',
              itemListElement: [
                {
                  '@type': 'Product',
                  name: 'Organic Soap Bars',
                  category: 'Organic Personal Care Products',
                },
                {
                  '@type': 'Product',
                  name: 'Bamboo Toothbrushes',
                  category: 'Bamboo & Wooden Utensils',
                },
                {
                  '@type': 'Product',
                  name: 'Natural Dish Soap',
                  category: 'Natural Cleaning Products',
                },
                {
                  '@type': 'Product',
                  name: 'Compostable Food Containers',
                  category: 'Biodegradable Packaging Solutions',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 text-white rounded-3xl p-12 mb-16 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Eco-Friendly Daily Essentials
              </h1>
              <p className="text-2xl md:text-3xl text-green-100 font-light">
                Sustainable Living with India's Organic Daily Essentials
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              The Future of Sustainable Living
            </h2>
            <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed space-y-4">
              <p>
                As global consciousness shifts toward environmental sustainability, the demand for eco-friendly daily essentials has surged dramatically. India, with its rich tradition of natural and organic products, stands at the forefront of this green revolution. Our comprehensive range of eco-friendly daily essentials combines ancient wisdom with modern innovation, offering sustainable alternatives to conventional products that harm our planet. From organic personal care products free from harmful chemicals to biodegradable packaging that reduces plastic waste, we provide complete solutions for businesses and consumers committed to environmental responsibility.
              </p>
              <p>
                Our product portfolio spans across multiple categories of daily use items, each carefully curated to meet international eco-certification standards while maintaining competitive pricing and profitable margins for exporters. We source from certified organic manufacturers, sustainable bamboo plantations, and eco-conscious production facilities across India. Every product undergoes rigorous quality testing to ensure it meets both environmental standards and functional performance expectations. Whether you're a retailer looking to stock sustainable products, a distributor expanding into the green market, or a brand seeking private label eco-friendly solutions, we offer flexible order quantities and customization options.
              </p>
              <p>
                The global market for eco-friendly products is experiencing exponential growth, with consumers increasingly willing to pay premium prices for sustainable alternatives. Our products cater to this growing demand while supporting local communities, promoting fair-trade practices, and reducing environmental impact. All items are plastic-free or use minimal, recyclable packaging. We provide complete export documentation, certifications for organic and eco-friendly claims, and logistics support to ensure smooth international trade. With competitive wholesale pricing, attractive profit margins, and growing market demand, eco-friendly daily essentials represent one of the most profitable export opportunities from India today.
              </p>
            </div>
          </div>

          {/* Sub-categories Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Eco-Friendly Product Range
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Personal Care */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Organic Personal Care Products</h3>
                <p className="text-green-50">
                  Natural soaps, shampoos, skincare, dental care, and wellness products
                </p>
              </div>

              {/* Bamboo Utensils */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Utensils className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Bamboo & Wooden Utensils</h3>
                <p className="text-emerald-50">
                  Bamboo toothbrushes, cutlery, kitchen tools, and wooden home essentials
                </p>
              </div>

              {/* Cleaning Products */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Natural Cleaning Products</h3>
                <p className="text-teal-50">
                  Plant-based cleaners, detergents, dishwashing liquids, and eco-friendly solutions
                </p>
              </div>

              {/* Packaging */}
              <div className="bg-gradient-to-br from-lime-600 to-lime-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Biodegradable Packaging Solutions</h3>
                <p className="text-lime-50">
                  Compostable containers, eco-friendly bags, and sustainable packaging materials
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Product Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Eco-Friendly Product Categories
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-3">
                  Organic Personal Care Products
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our organic personal care range includes handmade natural soaps crafted with essential oils, herbs, and plant-based ingredients; organic shampoo bars and liquid shampoos free from sulfates and parabens; natural skincare products including face creams, body lotions, and serums with ayurvedic formulations; bamboo toothbrushes and natural toothpaste made with neem and activated charcoal; organic hair oils using coconut, argan, and herbal infusions; natural deodorants with aluminum-free formulas; and wellness products like essential oils, aromatherapy items, and herbal supplements. All products are cruelty-free, vegan-friendly (where applicable), and certified organic by recognized international bodies. They cater to the growing consumer demand for chemical-free, sustainable personal care alternatives with attractive packaging suitable for retail markets.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
                  Bamboo & Wooden Utensils
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Bamboo products represent one of the fastest-growing segments in eco-friendly essentials due to bamboo's rapid renewability and natural antibacterial properties. Our collection includes bamboo toothbrushes with biodegradable handles and BPA-free nylon bristles, bamboo cutlery sets (forks, spoons, knives) perfect for travel and daily use, bamboo straws as sustainable alternatives to plastic, bamboo kitchen utensils including spatulas, spoons, and cutting boards, wooden combs and hairbrushes, coconut shell bowls and serving items, and wooden storage containers. We also offer bamboo fiber products like towels and cloths. All bamboo is sustainably harvested from certified plantations, ensuring environmental responsibility. These products appeal to eco-conscious consumers and are popular in zero-waste stores, organic shops, and sustainable lifestyle brands.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-teal-700 mb-3">
                  Natural Cleaning Products
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Transform cleaning routines with our plant-based, biodegradable cleaning solutions that are tough on dirt but gentle on the environment. Our range includes natural dish soap made from coconut and plant-derived surfactants, eco-friendly laundry detergents in powder and liquid forms free from phosphates and optical brighteners, all-purpose cleaners using essential oils and natural ingredients, floor cleaners suitable for various surfaces, bathroom cleaners with natural disinfectants like tea tree oil, natural fabric softeners and stain removers, and cleaning brushes made from coconut coir and sustainable materials. These products are non-toxic, safe for septic systems, and come in recyclable or refillable packaging. They meet international standards for biodegradability and environmental safety, making them ideal for green-conscious markets in Europe, North America, and Australia.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-lime-700 mb-3">
                  Biodegradable Packaging Solutions
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Address the global plastic crisis with our innovative biodegradable packaging solutions. We offer compostable food containers made from bagasse (sugarcane fiber), cornstarch, and palm leaf; biodegradable plates, bowls, and cutlery for food service and events; eco-friendly shopping bags from jute, cotton, and biodegradable plastics; compostable garbage bags and bin liners; paper-based packaging materials including boxes, wraps, and cushioning; plant-based cling films and food wraps; and seed paper products that can be planted after use. All packaging materials are certified compostable according to international standards (ASTM D6400, EN 13432) and break down naturally without leaving harmful residues. These solutions cater to restaurants, food delivery services, retailers, and businesses committed to reducing their environmental footprint while maintaining functionality and cost-effectiveness.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Why Choose Our Eco-Friendly Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  Eco-Certified
                </h3>
                <p className="text-gray-300">
                  All products certified by recognized international bodies for organic, eco-friendly, and sustainable standards. Complete documentation provided.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">
                  100% Plastic-Free
                </h3>
                <p className="text-gray-300">
                  Completely plastic-free products and minimal, recyclable packaging. Help your customers reduce their environmental impact.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-teal-500/30">
                <h3 className="text-2xl font-bold text-teal-400 mb-4">
                  Profitable Margins
                </h3>
                <p className="text-gray-300">
                  Competitive wholesale pricing with attractive profit margins. Growing market demand ensures strong sales potential.
                </p>
              </div>
            </div>
          </div>

          {/* Export Information */}
          <div className="bg-gradient-to-br from-green-900 to-teal-900 text-white rounded-2xl p-8 md:p-12 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Export Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-200 mb-3">HS Codes</h3>
                <ul className="space-y-2 text-green-50">
                  <li>• <strong>3401</strong> - Soap & Organic Surface-Active Products</li>
                  <li>• <strong>4419</strong> - Bamboo & Wooden Tableware & Kitchenware</li>
                  <li>• <strong>3307</strong> - Personal Care & Cosmetic Preparations</li>
                  <li>• <strong>4823</strong> - Paper & Biodegradable Packaging Products</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-200 mb-3">Key Export Markets</h3>
                <ul className="space-y-2 text-green-50">
                  <li>• United States</li>
                  <li>• European Union (Germany, UK, Netherlands, France)</li>
                  <li>• Australia & New Zealand</li>
                  <li>• Canada</li>
                  <li>• United Arab Emirates</li>
                  <li>• Japan & South Korea</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-200 mb-3">Certifications</h3>
                <ul className="space-y-2 text-green-50">
                  <li>• USDA Organic / EU Organic Certification</li>
                  <li>• Ecocert / COSMOS Certified</li>
                  <li>• Cruelty-Free & Vegan Certified</li>
                  <li>• FSC (Forest Stewardship Council)</li>
                  <li>• Compostable Certification (ASTM D6400, EN 13432)</li>
                  <li>• ISO 14001 (Environmental Management)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-200 mb-3">Order Details</h3>
                <ul className="space-y-2 text-green-50">
                  <li>• <strong>MOQ:</strong> Varies by product (500-5000 units)</li>
                  <li>• <strong>Packaging:</strong> Eco-friendly, recyclable materials</li>
                  <li>• <strong>Lead Time:</strong> 20-45 days</li>
                  <li>• <strong>Payment:</strong> LC, T/T, or as negotiated</li>
                  <li>• <strong>Private Label:</strong> Custom branding available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Go Green?
            </h2>
            <p className="text-xl mb-8 text-green-50">
              Explore our complete range of eco-friendly daily essentials and join the sustainable living revolution
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/resources/reports" className="bg-white hover:bg-green-50 text-green-700 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg">
                Explore Eco Product Range
              </a>
              <a href="/contact" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/30">
                Request Product Samples
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
