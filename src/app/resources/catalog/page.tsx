'use client';

import { useState } from 'react';
import { Download, FileText, CheckCircle, Mail, Lock, ChevronRight, BookOpen, Package, Award, Globe2 } from 'lucide-react';
import Link from 'next/link';

export default function DownloadableCatalog() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send email to backend
    setEmailSubmitted(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSubmitted(false);
      setEmail('');
      setCompany('');
      alert('Catalog download link sent to your email!');
    }, 2000);
  };

  const catalogFeatures = [
    {
      icon: Package,
      title: '200+ Products',
      description: 'Complete range of herbs, spices, tea, coffee, aromatics, and eco-products'
    },
    {
      icon: FileText,
      title: 'Detailed Specifications',
      description: 'Technical specs, HS codes, packaging options, and MOQ for each product'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Quality certifications, organic standards, and compliance information'
    },
    {
      icon: Globe2,
      title: 'Export Information',
      description: 'Shipping terms, lead times, and market-specific requirements'
    }
  ];

  const catalogSections = [
    {
      title: 'Herbal & Ayurvedic Products',
      items: ['Raw roots & whole herbs', 'Dried & powdered herbs', 'Standardized extracts', 'Herbal oils & tinctures'],
      pages: '12-28'
    },
    {
      title: 'Aromatic Effluents',
      items: ['Essential oils', 'Hydrosols & floral waters', 'Natural fragrance bases', 'Aromatic resins'],
      pages: '29-42'
    },
    {
      title: 'Tea & Coffee',
      items: ['Black, green & white tea', 'Flavored tea blends', 'Arabica coffee beans', 'Custom blending options'],
      pages: '43-58'
    },
    {
      title: 'Herbs & Spices',
      items: ['Whole spices', 'Ground spices & powders', 'Spice blends', 'Organic & conventional grades'],
      pages: '59-76'
    },
    {
      title: 'Jute & Natural Fiber Products',
      items: ['Jute bags & totes', 'Home decor & furnishings', 'Handicrafts & gift items', 'Industrial jute products'],
      pages: '77-88'
    },
    {
      title: 'Luxury Fabrics',
      items: ['Pure silk fabrics', 'Premium cotton & linen', 'Handloom & heritage weaves', 'Designer collections'],
      pages: '89-98'
    },
    {
      title: 'Eco-Friendly Daily Essentials',
      items: ['Organic personal care', 'Bamboo & wooden utensils', 'Natural cleaning products', 'Biodegradable packaging'],
      pages: '99-112'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Product Catalog 2024-25
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Download our comprehensive catalog featuring 200+ premium Indian export products 
              with detailed specifications, pricing guides, and export information
            </p>
            <button
              onClick={() => setShowEmailModal(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-2xl hover:shadow-green-500/50 transform hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Free Catalog
            </button>
            <p className="text-sm text-gray-400 mt-4">
              PDF Format • 112 Pages • Updated October 2024
            </p>
          </div>

          {/* Catalog Preview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 backdrop-blur-sm">
                <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-green-400 font-bold text-2xl mb-2">THE EXPORT EXPRESS</div>
                      <div className="text-white text-4xl font-bold mb-4">Product Catalog</div>
                      <div className="text-gray-400 text-lg">2024-25 Edition</div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-32 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/5 rounded-lg border border-white/10" />
                        <div className="h-24 bg-white/5 rounded-lg border border-white/10" />
                      </div>
                      <div className="h-16 bg-white/5 rounded-lg border border-white/10" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              </div>
            </div>

            {/* Right: Features */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">What's Inside</h2>
              <div className="space-y-6">
                {catalogFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-500/30">
                        <feature.icon className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Catalog Contents</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {catalogSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg flex-1">{section.title}</h3>
                    <span className="text-green-400 text-sm font-semibold bg-green-500/10 px-3 py-1 rounded-full">
                      Pages {section.pages}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl p-12 border border-green-500/20 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Download Our Catalog?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Comprehensive Information</h3>
                <p className="text-gray-400">
                  All product details, specifications, and export requirements in one place
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Easy Reference</h3>
                <p className="text-gray-400">
                  Download once and access offline anytime for quick product lookups
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Professional Tool</h3>
                <p className="text-gray-400">
                  Perfect for sharing with your team, clients, or procurement department
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border border-white/10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Explore Our Products?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get instant access to our complete product catalog with detailed specifications and pricing information
            </p>
            <button
              onClick={() => setShowEmailModal(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-2xl hover:shadow-green-500/50"
            >
              <Download className="w-6 h-6" />
              Download Now - It's Free
            </button>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required • Instant download • Updated quarterly
            </p>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Link
              href="/products"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-center"
            >
              <Package className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Browse Products Online</h3>
              <p className="text-gray-400 text-sm">Explore our complete product range on the website</p>
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-center"
            >
              <Mail className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Request Custom Quote</h3>
              <p className="text-gray-400 text-sm">Get personalized pricing for your requirements</p>
            </Link>
            <Link
              href="/resources/faqs"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-center"
            >
              <FileText className="w-10 h-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">FAQs</h3>
              <p className="text-gray-400 text-sm">Find answers to common questions</p>
            </Link>
          </div>
        </div>
      </main>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-white/10">
            {!emailSubmitted ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-6">
                  <Lock className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  Download Product Catalog
                </h3>
                <p className="text-gray-300 text-center mb-6">
                  Enter your details to receive the download link instantly
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name (optional)"
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
                      Get Catalog
                    </button>
                  </div>
                </form>
                <p className="text-xs text-gray-500 text-center mt-4">
                  We respect your privacy. No spam, unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Check Your Email!</h3>
                <p className="text-gray-300">
                  We've sent the catalog download link to{' '}
                  <span className="text-green-400 font-semibold">{email}</span>
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  Didn't receive it? Check your spam folder or contact us.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
