import type { Metadata } from 'next';
import { Leaf, Droplet, Coffee, Package, Flame, ShoppingBag, Sparkles, Recycle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Products - Premium Indian Export Products | The Export Express',
  description: 'Explore our range of premium Indian export products including herbal & ayurvedic, aromatic effluences, tea & coffee, and herbs & spices.',
  keywords: 'Indian export products, herbal products, essential oils, tea export, spices export, ayurvedic herbs, aromatics, coffee beans',
};

export default function Products() {
  const categories = [
    {
      title: 'Herbal & Ayurvedic',
      description: 'Ashwagandha, Curcumin Extract, Triphala, Neem Oil, Kashmir Saffron',
      link: '/products/herbal-ayurvedic',
      icon: Leaf,
      color: 'from-green-600 to-green-700',
      productCount: '5 Featured'
    },
    {
      title: 'Aromatic Effluences',
      description: 'Sandalwood, Jasmine, Rose, Vetiver, Lemongrass essential oils & absolutes',
      link: '/products/aromatics',
      icon: Droplet,
      color: 'from-purple-600 to-purple-700',
      productCount: '5 Featured'
    },
    {
      title: 'Tea & Coffee',
      description: 'Assam, Darjeeling tea, Arabica & Robusta coffee, Extract concentrates',
      link: '/products/tea-coffee',
      icon: Coffee,
      color: 'from-amber-600 to-amber-700',
      productCount: '5 Featured'
    },
    {
      title: 'Herbs & Spices',
      description: 'Black Pepper, Turmeric, Green Cardamom, Cumin, Dry Ginger',
      link: '/products/herbs-spices',
      icon: Flame,
      color: 'from-red-600 to-red-700',
      productCount: '5 Featured'
    },
  ];

  const featuredProducts = [
    {
      name: 'Ashwagandha Root Extract',
      category: 'Herbal & Ayurvedic',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop',
      price: 'FOB $45-80/kg',
      link: '/products/herbal-ayurvedic/ashwagandha',
      badge: '5-10% Withanolides'
    },
    {
      name: 'Curcumin Extract 95%',
      category: 'Herbal & Ayurvedic',
      image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=600&fit=crop',
      price: 'FOB $120-200/kg',
      link: '/products/herbal-ayurvedic/curcumin-extract',
      badge: 'Bio-Available'
    },
    {
      name: 'Sandalwood Essential Oil',
      category: 'Aromatic Effluences',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
      price: 'FOB $1,200-2,500/kg',
      link: '/products/aromatics/sandalwood-oil',
      badge: 'CITES Compliant'
    },
    {
      name: 'Jasmine Absolute',
      category: 'Aromatic Effluences',
      image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&h=600&fit=crop',
      price: 'Premium Pricing',
      link: '/products/aromatics/jasmine-absolute',
      badge: 'Solvent Extracted'
    },
    {
      name: 'Darjeeling First Flush',
      category: 'Tea & Coffee',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=600&fit=crop',
      price: 'Premium Pricing',
      link: '/products/tea-coffee/darjeeling-tea',
      badge: 'GI Tagged'
    },
    {
      name: 'Assam Black Tea',
      category: 'Tea & Coffee',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop',
      price: 'FOB $2.80-4.00/kg',
      link: '/products/tea-coffee/assam-black-tea',
      badge: 'CTC & Orthodox'
    },
    {
      name: 'Black Pepper',
      category: 'Herbs & Spices',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=600&h=600&fit=crop',
      price: 'Contact for Pricing',
      link: '/products/herbs-spices/black-pepper',
      badge: 'Tellicherry Grade'
    },
    {
      name: 'Kashmir Saffron',
      category: 'Herbal & Ayurvedic',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop',
      price: 'FOB $12-24/g',
      link: '/products/herbal-ayurvedic/saffron',
      badge: 'GI Certified'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Explore Our Range of Premium Indian Export Products
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From traditional Ayurvedic herbs to luxury fabrics, discover over 700+ premium products sourced directly from India's finest manufacturers
            </p>
          </div>

          {/* Categories Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <a
                    key={category.title}
                    href={category.link}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br ${category.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">{category.productCount}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{category.description}</p>
                    <div className="flex items-center text-green-400 text-sm font-semibold">
                      <span>View Products</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Featured Products Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
                <p className="text-gray-400">Handpicked bestsellers from our premium collection</p>
              </div>
              <a href="/contact" className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all font-semibold">
                Request Catalog
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.link}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-gray-800 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.badge}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-400 text-xs mb-2">{product.category}</p>
                    <h3 className="text-white font-bold mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">{product.price}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Browse all products by category above or contact us for a complete catalog</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/contact" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-all font-semibold">
                  Request Full Catalog
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl transition-all font-semibold">
                  Get Custom Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
