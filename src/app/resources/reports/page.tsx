'use client';

import { useState } from 'react';
import { Download, TrendingUp, FileText, Calendar, Mail, Lock, ChevronRight, BarChart3, Globe2, DollarSign, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface MarketReport {
  id: string;
  title: string;
  quarter: string;
  year: number;
  category: string;
  description: string;
  highlights: string[];
  pages: number;
  publishDate: string;
  isPremium: boolean;
  coverImage: string;
  downloadUrl?: string;
}

export default function MarketReports() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const reports: MarketReport[] = [
    {
      id: 'q4-2024-ayurvedic',
      title: 'Ayurvedic Herbs Market Analysis',
      quarter: 'Q4',
      year: 2024,
      category: 'Herbal & Ayurvedic',
      description: 'Comprehensive analysis of global Ayurvedic herbs market including demand trends, pricing dynamics, major importing countries, and growth forecasts for 2025.',
      highlights: [
        'US market grew 34% YoY with Ashwagandha leading demand',
        'EU organic certification requirements tightened in Q3',
        'Price trends: Ashwagandha +12%, Turmeric +8%, Brahmi +15%',
        'New market opportunities in Southeast Asia and Latin America',
        'Supply chain challenges: Monsoon impact on Rajasthan crops'
      ],
      pages: 28,
      publishDate: 'October 15, 2024',
      isPremium: false,
      coverImage: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=400&fit=crop'
    },
    {
      id: 'q4-2024-spices',
      title: 'Indian Spice Export Outlook 2025',
      quarter: 'Q4',
      year: 2024,
      category: 'Herbs & Spices',
      description: 'Forward-looking analysis of Indian spice exports with market forecasts, competitive landscape, regulatory updates, and strategic recommendations for exporters.',
      highlights: [
        'Global spice market projected to reach $19.3B by 2026',
        'India maintains 45% global market share in spice exports',
        'Turmeric exports up 18% driven by wellness trends',
        'Middle East remains largest importer (32% of total exports)',
        'Organic spice premium pricing: 25-40% above conventional'
      ],
      pages: 35,
      publishDate: 'October 20, 2024',
      isPremium: false,
      coverImage: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=600&h=400&fit=crop'
    },
    {
      id: 'q3-2024-essential-oils',
      title: 'Essential Oils Market Brief',
      quarter: 'Q3',
      year: 2024,
      category: 'Aromatic Effluents',
      description: 'Quarterly update on Indian essential oils market covering pricing benchmarks, quality standards, demand patterns, and competitive analysis across major export markets.',
      highlights: [
        'Sandalwood oil prices stabilized at $2,800-3,200/kg',
        'Jasmine absolute demand surged 28% in European perfumery',
        'GC-MS certification now mandatory for US imports',
        'Sustainable sourcing becoming key differentiator',
        'New extraction technologies improving yield by 15-20%'
      ],
      pages: 22,
      publishDate: 'September 10, 2024',
      isPremium: true,
      coverImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop'
    },
    {
      id: 'q3-2024-tea-coffee',
      title: 'Tea & Coffee Export Guide',
      quarter: 'Q3',
      year: 2024,
      category: 'Tea & Coffee',
      description: 'Regional demand analysis, certification requirements, pricing trends, and market entry strategies for Indian tea and coffee exporters targeting global markets.',
      highlights: [
        'Darjeeling tea exports to EU up 22% with premium positioning',
        'Organic tea premium: 30-45% above conventional grades',
        'Coffee exports reached 4.2 lakh tonnes (up 12% YoY)',
        'Fair Trade certification driving 15% price premium',
        'Emerging markets: Japan, South Korea, Australia showing strong growth'
      ],
      pages: 31,
      publishDate: 'September 25, 2024',
      isPremium: false,
      coverImage: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop'
    },
    {
      id: 'q2-2024-jute-products',
      title: 'Eco-Friendly Products Market Trends',
      quarter: 'Q2',
      year: 2024,
      category: 'Jute & Eco Products',
      description: 'Analysis of global demand for eco-friendly products including jute, natural fibers, and sustainable daily essentials with focus on export opportunities.',
      highlights: [
        'Jute bag exports grew 42% driven by plastic ban regulations',
        'EU single-use plastic directive creating $2.8B opportunity',
        'Customized jute products commanding 35% premium',
        'Bamboo products exports up 56% in US and European markets',
        'Biodegradable packaging market growing at 18% CAGR'
      ],
      pages: 26,
      publishDate: 'June 15, 2024',
      isPremium: true,
      coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop'
    },
    {
      id: 'q2-2024-luxury-fabrics',
      title: 'Luxury Fabric Sourcing Report',
      quarter: 'Q2',
      year: 2024,
      category: 'Luxury Fabrics',
      description: 'Market intelligence on Indian luxury fabrics including silk, handloom, and heritage weaves with focus on international fashion and home décor markets.',
      highlights: [
        'Banarasi silk exports to fashion houses up 31%',
        'Handloom certification adding 40% value premium',
        'Sustainable luxury trend driving heritage fabric demand',
        'Designer collaborations opening new market segments',
        'Online B2B platforms facilitating direct buyer connections'
      ],
      pages: 24,
      publishDate: 'June 28, 2024',
      isPremium: true,
      coverImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop'
    }
  ];

  const handleDownload = (report: MarketReport) => {
    if (report.isPremium) {
      setSelectedReport(report.id);
      setShowEmailModal(true);
    } else {
      // Direct download for free reports
      alert(`Downloading ${report.title}...`);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send email to backend
    setEmailSubmitted(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSubmitted(false);
      setEmail('');
      alert('Report download link sent to your email!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Market Reports & Intelligence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Quarterly market insights, pricing trends, demand forecasts, and competitive analysis 
              for Indian export products
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">24+</div>
              <div className="text-sm text-gray-400">Reports Published</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">6</div>
              <div className="text-sm text-gray-400">Product Categories</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <Globe2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">45+</div>
              <div className="text-sm text-gray-400">Markets Covered</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">Quarterly</div>
              <div className="text-sm text-gray-400">Update Frequency</div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">What's Included in Our Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Market Trends & Forecasts</h3>
                  <p className="text-gray-400 text-sm">Demand patterns, growth projections, and emerging opportunities</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Pricing Analysis</h3>
                  <p className="text-gray-400 text-sm">Historical trends, current benchmarks, and price forecasts</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Regional Insights</h3>
                  <p className="text-gray-400 text-sm">Market-specific analysis for US, EU, Middle East, and Asia-Pacific</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Regulatory Updates</h3>
                  <p className="text-gray-400 text-sm">Certification changes, compliance requirements, and trade policies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all group"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={report.coverImage}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    {report.isPremium ? (
                      <div className="flex items-center gap-1 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-semibold">
                        <Lock className="w-3 h-3" />
                        Premium
                      </div>
                    ) : (
                      <div className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Free
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-sm text-gray-300 mb-1">{report.category}</div>
                    <h3 className="text-xl font-bold text-white">{report.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.quarter} {report.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {report.pages} pages
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {report.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Key Highlights
                    </h4>
                    <ul className="space-y-1">
                      {report.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(report)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    {report.isPremium ? 'Get Premium Report' : 'Download Free Report'}
                  </button>

                  <div className="text-xs text-gray-500 text-center mt-2">
                    Published {report.publishDate}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl p-12 border border-green-500/20 text-center">
            <Mail className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Get Reports Delivered to Your Inbox
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to receive quarterly market reports, pricing updates, and exclusive industry insights
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/25"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </main>

      {/* Email Modal for Premium Reports */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-white/10">
            {!emailSubmitted ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mx-auto mb-6">
                  <Lock className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  Premium Report Access
                </h3>
                <p className="text-gray-300 text-center mb-6">
                  Enter your email to receive the download link for this premium market report
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                    >
                      Get Report
                    </button>
                  </div>
                </form>
                <p className="text-xs text-gray-500 text-center mt-4">
                  We'll send you the download link and occasional market updates. No spam.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-6">
                  <ChevronRight className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Check Your Email!</h3>
                <p className="text-gray-300">
                  We've sent the download link to <span className="text-green-400 font-semibold">{email}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
