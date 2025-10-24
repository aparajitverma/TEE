'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Orders & MOQ', 'Products & Quality', 'Shipping & Logistics', 'Payments & Terms', 'Certifications'];

  const faqs: FAQ[] = [
    {
      id: 'moq',
      question: 'What is the minimum order quantity (MOQ)?',
      answer: 'Our MOQ varies by product type and form. For raw, unprocessed materials (herbs, spices, tea leaves), we can accommodate orders as low as 500 kg. For processed and packaged products (powders, extracts, retail-ready items), the minimum is typically 5-10 kg per SKU. For essential oils and specialty items, we can work with smaller quantities starting from 1-2 kg. Custom MOQs are negotiable based on your specific requirements and long-term partnership potential. We understand that startups and small businesses need flexibility, so we\'re happy to discuss tailored solutions.',
      category: 'Orders & MOQ'
    },
    {
      id: 'samples',
      question: 'Do you provide product samples?',
      answer: 'Yes, we provide free samples for most of our products to help you evaluate quality before placing a bulk order. Sample quantities are typically 50-100 grams for herbs and spices, 10-20 ml for essential oils, and 100-200 grams for tea and coffee. While the samples themselves are complimentary, shipping costs are charged on an actual cost-plus basis. For high-value items like sandalwood oil or rare herbs, we may charge a nominal fee that\'s refundable against your first order. Sample requests are processed within 2-3 business days, and we include complete documentation (COA, specifications, MSDS where applicable).',
      category: 'Products & Quality'
    },
    {
      id: 'certifications',
      question: 'Which certifications do you have?',
      answer: 'We hold comprehensive certifications to meet international quality and compliance standards. Our certifications include: ISO 9001:2015 (Quality Management), ISO 22000 (Food Safety Management), HACCP (Hazard Analysis Critical Control Points), FSSAI (Food Safety and Standards Authority of India), GMP (Good Manufacturing Practices), USDA Organic, EU Organic (Regulation EC 834/2007), Fair Trade Certified, Kosher and Halal certifications (for applicable products), and Phytosanitary Certificates (IPPC compliant). We can also arrange for additional certifications based on your market requirements. All certificates are renewed annually and available for download on our certifications page.',
      category: 'Certifications'
    },
    {
      id: 'payment-terms',
      question: 'What payment terms are accepted?',
      answer: 'We offer flexible payment terms to accommodate different business needs and risk profiles. Our standard options include: Letter of Credit (L/C) at sight or usance (preferred for first-time buyers), Telegraphic Transfer (T/T) with 30% advance payment and 70% before shipment, Documentary Collection (D/P or D/A) for established clients, and for long-term partners with proven track records, we can discuss open account terms with Net 30-60 days. We accept payments in USD, EUR, and GBP. All banking charges are typically shared (SHA), but we can discuss other arrangements. For orders above $50,000, we can explore trade finance solutions through our banking partners.',
      category: 'Payments & Terms'
    },
    {
      id: 'customs',
      question: 'How do you handle customs clearance?',
      answer: 'We provide comprehensive export documentation and can assist with customs clearance at both origin and destination. Our standard documentation package includes: Commercial Invoice, Packing List, Bill of Lading (B/L) or Airway Bill (AWB), Certificate of Origin (preferential or non-preferential), Phytosanitary Certificate (IPPC compliant), Health Certificate (where required), Product-specific certificates (Organic, Fair Trade, etc.), and MSDS (Material Safety Data Sheet) for essential oils and chemicals. We work with experienced freight forwarders and customs brokers who can handle destination customs clearance, duty calculations, and compliance with local regulations. We\'re familiar with import requirements for US, EU, Middle East, and Asia-Pacific markets. Our team can also advise on HS codes, duty rates, and any special permits required for your market.',
      category: 'Shipping & Logistics'
    },
    {
      id: 'packaging',
      question: 'Can you customise packaging?',
      answer: 'Absolutely! We offer comprehensive packaging customization to meet your brand and market requirements. Our capabilities include: Private labeling with your brand name, logo, and design; Multilingual labels (English, Spanish, French, German, Arabic, Japanese, etc.); Multiple packaging formats - bulk bags (25kg PP/HDPE bags), retail-ready pouches (stand-up pouches, flat pouches), glass jars and bottles, PET containers, aluminum tins, and corrugated boxes with custom printing. We can handle FDA-compliant labeling for US markets, EU labeling requirements (including allergen declarations), and organic certification logos. Our design team can assist with artwork creation, or you can provide your own print-ready files. Minimum order quantities for custom packaging vary by format (typically 1,000-5,000 units). Lead time for custom packaging is 3-4 weeks after artwork approval.',
      category: 'Products & Quality'
    },
    {
      id: 'lead-times',
      question: 'What are your lead times?',
      answer: 'Lead times vary based on product type, processing requirements, and order size. For raw, unprocessed goods (whole spices, dried herbs, tea leaves): 7-10 days after purchase order confirmation and advance payment. For processed products (powders, extracts, blends): 12-21 days depending on processing complexity. For custom packaged/private label products: 3-4 weeks including packaging production and labeling. For essential oils and distilled products: 10-14 days (subject to seasonal availability). Shipping time is additional: Air freight: 5-7 days to most destinations; Sea freight: 15-45 days depending on destination port. We maintain buffer stock of popular items to expedite orders. For urgent requirements, we can arrange express processing and air freight at additional cost. We provide regular updates throughout the production and shipping process.',
      category: 'Shipping & Logistics'
    },
    {
      id: 'shipping-worldwide',
      question: 'Do you ship worldwide?',
      answer: 'Yes, we ship to over 45 countries worldwide. Our primary export markets include: North America (USA, Canada, Mexico), Europe (UK, Germany, France, Netherlands, Italy, Spain, Belgium), Middle East (UAE, Saudi Arabia, Qatar, Kuwait, Oman), Asia-Pacific (Australia, Japan, South Korea, Singapore, Malaysia, Thailand), and Africa (South Africa, Kenya, Nigeria). We work with leading freight forwarders and shipping lines to ensure reliable, cost-effective delivery. We offer both FOB (Free on Board) and CIF (Cost, Insurance, and Freight) terms. For countries with specific import restrictions or complex regulations, we can advise on compliance requirements and documentation. If your destination isn\'t listed, please contact us – we can likely arrange shipping through our logistics network.',
      category: 'Shipping & Logistics'
    },
    {
      id: 'tracking',
      question: 'How do I track my order?',
      answer: 'We provide complete order visibility from production to delivery. Once your order is confirmed, you\'ll receive: Order confirmation with production timeline; Production updates at key milestones (processing started, quality testing, packaging); Pre-shipment notification with photos and documents; Shipping confirmation with Bill of Lading/Airway Bill number; Container/tracking number for real-time shipment tracking; Estimated arrival date at destination port; and Delivery confirmation. You can track your shipment through our logistics partner\'s online portal or directly through the shipping line\'s website. For air freight, we provide AWB tracking through the airline\'s system. Our team is available via email and WhatsApp for real-time updates and to address any concerns during transit. We also provide proactive alerts for any delays or issues.',
      category: 'Shipping & Logistics'
    },
    {
      id: 'return-policy',
      question: 'What is your return policy?',
      answer: 'We stand behind the quality of our products and offer a fair return policy. Returns are accepted under the following conditions: Quality issues - If the product doesn\'t meet agreed specifications or has quality defects, we\'ll arrange for replacement or full refund; Documentation errors - If there are errors in our documentation that cause customs issues, we\'ll rectify at our cost; Shipping damage - If the product is damaged during transit (and properly documented), we\'ll file an insurance claim and arrange replacement. Returns must be reported within 7 days of receipt with photographic evidence and third-party quality test reports (if applicable). We don\'t accept returns for: Change of mind or business reasons; Products that have been opened, used, or repackaged; Orders where specifications were met but buyer expectations differed. For quality disputes, we prefer to resolve through third-party testing at a mutually agreed laboratory. Our goal is 100% customer satisfaction, and we work collaboratively to resolve any issues.',
      category: 'Orders & MOQ'
    },
    {
      id: 'quality-testing',
      question: 'How do you ensure product quality?',
      answer: 'Quality assurance is at the core of our operations. Our quality control process includes: Supplier verification - We audit and certify all our partner farms and processing units; Raw material inspection - Visual inspection, moisture content, foreign matter, and contamination checks; Laboratory testing - In-house and third-party lab testing for pesticide residues, heavy metals, microbial contamination, and active compounds; Batch testing - Every batch is tested and comes with a Certificate of Analysis (COA); Processing controls - GMP-compliant processing facilities with HACCP protocols; Packaging inspection - Final product inspection before packaging; Pre-shipment inspection - Final quality check before dispatch; and Traceability - Complete farm-to-shipment traceability for every batch. We maintain detailed quality records for 3 years and can provide test reports, COAs, and inspection certificates with every shipment. For sensitive markets like USA and EU, we ensure compliance with FDA and EFSA regulations.',
      category: 'Products & Quality'
    },
    {
      id: 'organic-certification',
      question: 'Are your products organic certified?',
      answer: 'We offer both organic and conventional products to meet diverse market needs. Our organic products are certified by: USDA Organic (NOP compliant) for US markets; EU Organic (Regulation EC 834/2007) for European markets; India Organic (NPOP) for domestic and export markets; and Fair Trade certification for select products. Organic certification covers the entire supply chain from farm to processing. Our organic partner farms follow strict protocols: No synthetic pesticides or fertilizers; No GMOs; Crop rotation and soil health management; Organic pest control methods; and Annual inspections by accredited certification bodies. Organic products command a premium of 25-40% over conventional products. We maintain complete segregation between organic and conventional products in storage and processing. All organic shipments include organic certificates and transaction certificates. If you need specific organic certifications for your market, we can arrange them.',
      category: 'Certifications'
    },
    {
      id: 'pricing',
      question: 'How is pricing determined?',
      answer: 'Our pricing is transparent and competitive, based on several factors: Raw material cost - Varies by season, crop yield, and market demand; Processing level - Raw materials are cheaper than processed/powdered forms; Certifications - Organic, Fair Trade, and specialty certifications add 20-40% premium; Packaging - Bulk packaging is more economical than retail-ready packaging; Order quantity - Larger orders benefit from volume discounts (typically 5-15% for orders above 5 MT); Shipping terms - FOB pricing is lower than CIF; and Payment terms - L/C and advance payment may qualify for better rates. We provide detailed quotations with complete cost breakdowns. Prices are typically quoted in USD per kg/MT and are valid for 30 days (subject to market fluctuations for volatile commodities). For long-term contracts, we can offer fixed pricing with quarterly reviews. We also provide market intelligence reports to help you understand pricing trends and plan your procurement strategy.',
      category: 'Payments & Terms'
    },
    {
      id: 'bulk-discounts',
      question: 'Do you offer bulk order discounts?',
      answer: 'Yes, we offer attractive volume discounts for bulk orders. Our tiered pricing structure is: 500 kg - 1 MT: Standard pricing; 1-5 MT: 5-8% discount; 5-10 MT: 8-12% discount; 10-20 MT: 12-15% discount; Above 20 MT: Custom pricing (15-20% discount). Additional benefits for bulk orders include: Free or subsidized shipping; Priority production scheduling; Flexible payment terms; Dedicated account manager; Customized packaging at reduced rates; and Buffer stock maintenance for repeat orders. For annual contracts with committed volumes, we can offer even better rates and lock in pricing for 6-12 months. We also provide vendor-managed inventory (VMI) services for large buyers, where we maintain safety stock and deliver on a just-in-time basis. Contact our sales team with your volume requirements for a customized quote.',
      category: 'Orders & MOQ'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our products, services, and export processes
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-400 text-sm">
            Showing {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                  >
                    <div className="flex-1 pr-4">
                      <div className="text-xs text-green-400 font-semibold mb-1">
                        {faq.category}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-6 pt-2">
                      <div className="text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No questions found matching your search.</p>
                <p className="text-gray-500 text-sm mt-2">Try different keywords or browse all categories.</p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl p-8 sm:p-12 border border-green-500/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our export team is here to help you with any questions about products, pricing, or logistics
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-all">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Email Us</h3>
                <p className="text-gray-400 text-sm mb-3">Get detailed answers via email</p>
                <div className="text-green-400 text-sm font-semibold">
                  info@theexportexpress.com
                </div>
              </Link>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all text-center group">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-all">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Call Us</h3>
                <p className="text-gray-400 text-sm mb-3">Speak with our export team</p>
                <div className="text-blue-400 text-sm font-semibold">
                  +91 (0) 123-456-7890
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all text-center group">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-all">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-400 text-sm mb-3">Quick responses on WhatsApp</p>
                <div className="text-purple-400 text-sm font-semibold">
                  +91 98765 43210
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/25"
              >
                Contact Our Team
                <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Link
              href="/resources/blog"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-white font-semibold mb-2">Browse Our Blog</h3>
              <p className="text-gray-400 text-sm">Industry insights and export guides</p>
            </Link>
            <Link
              href="/resources/case-studies"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-white font-semibold mb-2">Case Studies</h3>
              <p className="text-gray-400 text-sm">Success stories from our clients</p>
            </Link>
            <Link
              href="/certifications"
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-white font-semibold mb-2">Our Certifications</h3>
              <p className="text-gray-400 text-sm">Quality and compliance standards</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
