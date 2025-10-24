'use client';

import { useState } from 'react';
import { Search, Calendar, Clock, Tag, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = ['All', 'Market Trends', 'Buyer Guide', 'Quality Standards', 'Export Guide', 'Sustainability', 'Product Insights'];

  const allPosts: BlogPost[] = [
    {
      id: 'ayurvedic-herbs-2024',
      title: 'Top 10 Ayurvedic Herbs Driving Global Demand in 2024',
      excerpt: 'Discover the most sought-after Ayurvedic herbs in international markets, their health benefits, and export opportunities for Indian suppliers.',
      category: 'Market Trends',
      author: 'Priya Sharma',
      date: '2024-10-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=500&fit=crop',
      tags: ['Ayurveda', 'Herbs', 'Market Analysis', 'Export Trends']
    },
    {
      id: 'choosing-indian-spices',
      title: 'How to Choose the Right Indian Spice for Your Food-Processing Line',
      excerpt: 'A comprehensive guide for food manufacturers on selecting premium Indian spices, quality parameters, and supplier evaluation criteria.',
      category: 'Buyer Guide',
      author: 'Rajesh Kumar',
      date: '2024-10-10',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&h=500&fit=crop',
      tags: ['Spices', 'Quality Control', 'Sourcing', 'Food Processing']
    },
    {
      id: 'darjeeling-tea-certification',
      title: 'Organic Tea from Darjeeling – Certification Process Explained',
      excerpt: 'Understanding the rigorous organic certification process for Darjeeling tea, from farm practices to international compliance standards.',
      category: 'Quality Standards',
      author: 'Anita Desai',
      date: '2024-10-05',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=500&fit=crop',
      tags: ['Tea', 'Organic', 'Certification', 'Darjeeling']
    },
    {
      id: 'seasonal-cash-crops',
      title: 'Seasonal Cash Crops: Managing Supply-Chain Risk',
      excerpt: 'Strategies for managing supply chain volatility in seasonal crops like mango, cashew, and turmeric with practical risk mitigation techniques.',
      category: 'Export Guide',
      author: 'Vikram Singh',
      date: '2024-09-28',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&h=500&fit=crop',
      tags: ['Supply Chain', 'Risk Management', 'Seasonal Crops', 'Logistics']
    },
    {
      id: 'essential-oils-journey',
      title: 'Essential Oils from India – From Farm to Fragrance Lab',
      excerpt: 'Follow the journey of Indian essential oils from cultivation and extraction to quality testing and international fragrance applications.',
      category: 'Product Insights',
      author: 'Meera Patel',
      date: '2024-09-20',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=500&fit=crop',
      tags: ['Essential Oils', 'Aromatics', 'Production', 'Quality']
    },
    {
      id: 'incoterms-explained',
      title: 'Understanding Incoterms: FOB vs CIF for Indian Exporters',
      excerpt: 'A detailed breakdown of FOB and CIF terms, cost implications, risk transfer points, and which option works best for different scenarios.',
      category: 'Export Guide',
      author: 'Amit Verma',
      date: '2024-09-15',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop',
      tags: ['Incoterms', 'Shipping', 'Export Documentation', 'Trade']
    },
    {
      id: 'sustainability-case-studies',
      title: 'Sustainability Initiatives – Case Studies from Indian Farms',
      excerpt: 'Real-world examples of sustainable farming practices, fair trade partnerships, and environmental conservation in Indian agriculture.',
      category: 'Sustainability',
      author: 'Kavita Reddy',
      date: '2024-09-10',
      readTime: '13 min read',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop',
      tags: ['Sustainability', 'Fair Trade', 'Environment', 'Case Studies']
    },
    {
      id: 'export-documentation-checklist',
      title: 'Export Documentation Checklist: Complete Guide for First-Time Exporters',
      excerpt: 'Step-by-step documentation requirements for exporting from India, including certificates, permits, and compliance paperwork.',
      category: 'Export Guide',
      author: 'Suresh Iyer',
      date: '2024-09-05',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
      tags: ['Documentation', 'Export Process', 'Compliance', 'Beginners Guide']
    },
  ];

  // Filter posts by search and category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Export Insights Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Latest insights on Indian exports, market trends, and industry best practices
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-400 text-center">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/resources/blog/${post.id}`}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
