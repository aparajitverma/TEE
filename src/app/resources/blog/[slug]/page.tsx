'use client';

import { useParams } from 'next/navigation';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  // Blog post data (in a real app, this would come from a CMS or database)
  const blogPosts: Record<string, any> = {
    'ayurvedic-herbs-2024': {
      title: 'Top 10 Ayurvedic Herbs Driving Global Demand in 2024',
      category: 'Market Trends',
      author: 'Priya Sharma',
      date: '2024-10-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&h=600&fit=crop',
      tags: ['Ayurveda', 'Herbs', 'Market Analysis', 'Export Trends'],
      content: `
        <p>The global wellness industry is experiencing unprecedented growth, with Ayurvedic herbs at the forefront of this revolution. As consumers worldwide seek natural alternatives to synthetic medicines, Indian exporters are witnessing a surge in demand for traditional herbs backed by modern scientific validation.</p>

        <h2>1. Ashwagandha (Withania somnifera)</h2>
        <p>Leading the pack is Ashwagandha, with global market value projected to reach $950 million by 2025. This adaptogenic herb has gained massive popularity in North America and Europe for stress management and athletic performance enhancement.</p>
        <ul>
          <li><strong>Key Markets:</strong> USA, Germany, UK, Australia</li>
          <li><strong>Primary Applications:</strong> Dietary supplements, functional beverages, sports nutrition</li>
          <li><strong>Export Growth:</strong> 45% YoY increase</li>
        </ul>

        <h2>2. Turmeric (Curcuma longa)</h2>
        <p>Turmeric's curcumin content continues to drive pharmaceutical and nutraceutical demand. High-curcumin varieties (8-10%) command premium prices in international markets.</p>

        <h2>3. Brahmi (Bacopa monnieri)</h2>
        <p>Cognitive health supplements featuring Brahmi are experiencing 38% annual growth, particularly in aging populations seeking natural nootropics.</p>

        <h2>4. Tulsi (Ocimum sanctum)</h2>
        <p>Holy Basil's adaptogenic properties have made it a staple in stress-relief formulations and herbal teas across Western markets.</p>

        <h2>5. Triphala</h2>
        <p>This traditional Ayurvedic formulation of three fruits is gaining traction in digestive health and detox markets, with organic certified Triphala seeing 52% price premiums.</p>

        <h2>6. Shatavari (Asparagus racemosus)</h2>
        <p>Women's health supplements featuring Shatavari are expanding rapidly, with particular strength in European and Australian markets.</p>

        <h2>7. Guggul (Commiphora wightii)</h2>
        <p>Cholesterol management applications drive demand for standardized Guggul extracts in pharmaceutical formulations.</p>

        <h2>8. Neem (Azadirachta indica)</h2>
        <p>Beyond traditional uses, Neem is finding applications in organic agriculture, natural cosmetics, and pharmaceutical preparations.</p>

        <h2>9. Moringa (Moringa oleifera)</h2>
        <p>Superfood status has propelled Moringa into mainstream wellness products, with leaf powder exports growing 67% annually.</p>

        <h2>10. Amla (Phyllanthus emblica)</h2>
        <p>High vitamin C content and antioxidant properties make Amla essential in immunity-boosting formulations and natural beauty products.</p>

        <h2>Export Opportunities and Quality Standards</h2>
        <p>To capitalize on this growing demand, Indian exporters must focus on:</p>
        <ul>
          <li><strong>Organic Certification:</strong> USDA and EU organic certifications can increase product value by 40-60%</li>
          <li><strong>Standardization:</strong> Consistent active compound levels through proper cultivation and processing</li>
          <li><strong>Traceability:</strong> Complete supply chain documentation from farm to export</li>
          <li><strong>Quality Testing:</strong> Heavy metal testing, pesticide residue analysis, and microbial testing</li>
          <li><strong>Sustainable Sourcing:</strong> Fair trade practices and environmental conservation</li>
        </ul>

        <h2>Market Trends to Watch</h2>
        <p>The Ayurvedic herbs market is evolving with several key trends:</p>
        <ul>
          <li><strong>Clinical Validation:</strong> Increasing demand for herbs with published clinical studies</li>
          <li><strong>Standardized Extracts:</strong> Shift from raw herbs to concentrated, standardized extracts</li>
          <li><strong>Combination Formulas:</strong> Synergistic blends targeting specific health concerns</li>
          <li><strong>Sustainable Packaging:</strong> Eco-friendly packaging becoming a purchasing criterion</li>
        </ul>

        <h2>Conclusion</h2>
        <p>The global Ayurvedic herbs market presents significant opportunities for Indian exporters who can meet international quality standards and maintain consistent supply. With proper certifications, quality control, and market understanding, exporters can command premium prices while contributing to the global wellness revolution.</p>

        <p>For exporters looking to enter or expand in this market, partnering with experienced export houses that understand both traditional Ayurvedic knowledge and modern quality requirements is essential for success.</p>
      `
    },
    // Add more blog posts as needed
  };

  const post = blogPosts[slug] || {
    title: 'Blog Post Not Found',
    content: '<p>This blog post is coming soon. Check back later for more insights on Indian exports and market trends.</p>',
    category: 'General',
    author: 'The Export Express Team',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop',
    tags: ['Export', 'India', 'Trade']
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Market Trends': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Buyer Guide': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Quality Standards': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Export Guide': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Sustainability': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'Product Insights': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border ${getCategoryColor(post.category)} mb-6`}>
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12 bg-gray-800">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-invert prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: '#d1d5db',
            }}
          />

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-white/10">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm hover:bg-white/10 transition-all"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Share this article</h3>
                <p className="text-gray-400 text-sm">Help others discover this content</p>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
                  <Facebook className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 bg-sky-500 hover:bg-sky-600 rounded-lg transition-all">
                  <Twitter className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 bg-blue-700 hover:bg-blue-800 rounded-lg transition-all">
                  <Linkedin className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Export Premium Indian Products?
            </h3>
            <p className="text-gray-300 mb-6">
              Partner with us for quality sourcing, certifications, and reliable logistics
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-all font-semibold"
              >
                Get Started
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl transition-all font-semibold"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
