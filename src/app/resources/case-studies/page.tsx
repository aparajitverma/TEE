'use client';

import { useState } from 'react';
import { TrendingUp, Award, Globe, Users, Download, ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  products: string[];
  duration: string;
  image: string;
}

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'us-nutraceutical',
      title: 'Scaling Organic Ashwagandha Supply for US Market',
      client: 'NutriVita Wellness',
      location: 'California, USA',
      industry: 'Nutraceuticals & Dietary Supplements',
      challenge: 'A rapidly growing US-based nutraceutical company needed a reliable supplier of USDA Organic certified Ashwagandha root powder to meet increasing demand. Their previous supplier faced quality inconsistencies and couldn\'t scale production, resulting in stockouts and lost sales.',
      solution: 'We partnered with 12 certified organic farms in Rajasthan and Madhya Pradesh, implementing a quality control system with batch testing at our in-house lab. We established a 90-day rolling forecast system and maintained buffer stock to ensure uninterrupted supply. Custom packaging with their private label was delivered FOB Mumbai with complete documentation.',
      results: [
        {
          metric: 'Cost Reduction',
          value: '32%',
          description: 'Lower per-unit costs through direct farm partnerships'
        },
        {
          metric: 'Quality Consistency',
          value: '99.8%',
          description: 'Batch acceptance rate with zero rejections in 18 months'
        },
        {
          metric: 'Supply Reliability',
          value: '100%',
          description: 'On-time delivery rate with no stockouts'
        },
        {
          metric: 'Volume Growth',
          value: '3.5x',
          description: 'Increased order volume from 5 MT to 17.5 MT annually'
        }
      ],
      testimonial: {
        quote: 'The Export Express transformed our supply chain. Their quality consistency and reliability allowed us to scale our Ashwagandha product line with confidence. The cost savings were a bonus – we\'ve reinvested them into marketing.',
        author: 'Sarah Mitchell',
        position: 'VP of Operations, NutriVita Wellness'
      },
      products: ['Organic Ashwagandha Root Powder', 'Organic Turmeric Powder'],
      duration: '18 months (ongoing)',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=500&fit=crop'
    },
    {
      id: 'european-tea',
      title: 'Private Label Darjeeling Tea for European Retail Chain',
      client: 'TeaHaus Premium',
      location: 'Berlin, Germany',
      industry: 'Specialty Tea Retail',
      challenge: 'A premium European tea retailer wanted to launch a private-label Darjeeling tea line but lacked direct connections to certified tea estates. They needed consistent quality, custom packaging, and EU Organic certification to meet their brand standards and regulatory requirements.',
      solution: 'We connected them with three heritage Darjeeling tea estates holding EU Organic and Fair Trade certifications. We managed the entire process: tea tasting sessions, custom blend development, packaging design, labeling compliance, and logistics. We established quarterly shipments with quality pre-approval samples.',
      results: [
        {
          metric: 'Market Success',
          value: '€450K',
          description: 'First-year revenue from the private label line'
        },
        {
          metric: 'Customer Satisfaction',
          value: '4.8/5',
          description: 'Average customer rating across 2,300+ reviews'
        },
        {
          metric: 'Repeat Orders',
          value: '94%',
          description: 'Customer repurchase rate within 6 months'
        },
        {
          metric: 'Time to Market',
          value: '8 weeks',
          description: 'From concept to first shipment arrival'
        }
      ],
      testimonial: {
        quote: 'Working with The Export Express was seamless. They understood our brand vision and delivered a product that exceeded expectations. Our customers love the tea, and we\'ve already expanded to three more varieties.',
        author: 'Klaus Weber',
        position: 'Founder & CEO, TeaHaus Premium'
      },
      products: ['Darjeeling First Flush Black Tea', 'Darjeeling Green Tea', 'Flavored Tea Blends'],
      duration: '24 months (ongoing)',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=500&fit=crop'
    },
    {
      id: 'middle-east-spices',
      title: 'Bulk Spice Sourcing for Middle East Food Processor',
      client: 'Al-Noor Food Industries',
      location: 'Dubai, UAE',
      industry: 'Food Processing & Manufacturing',
      challenge: 'A large food processing company in Dubai needed a consistent supply of multiple spices (turmeric, cumin, coriander, chili) for their spice blend production. They faced challenges with multiple suppliers, inconsistent quality, and complex logistics coordination.',
      solution: 'We consolidated their spice sourcing into a single-supplier solution, providing 8 different spices from our network of 40+ farms across India. We implemented a vendor-managed inventory system, automated reordering based on their production schedule, and provided FOB Mumbai shipping with consolidated containers to reduce freight costs.',
      results: [
        {
          metric: 'Logistics Efficiency',
          value: '45%',
          description: 'Reduction in freight costs through container consolidation'
        },
        {
          metric: 'Supplier Simplification',
          value: '7 to 1',
          description: 'Reduced from 7 suppliers to single-source partner'
        },
        {
          metric: 'Inventory Optimization',
          value: '28%',
          description: 'Lower inventory holding costs with JIT delivery'
        },
        {
          metric: 'Quality Improvement',
          value: '99.5%',
          description: 'Batch acceptance rate with standardized specs'
        }
      ],
      testimonial: {
        quote: 'The Export Express simplified our entire spice procurement process. Having one reliable partner for all our spice needs has saved us time, money, and countless headaches. Their quality is consistently excellent.',
        author: 'Ahmed Al-Mansouri',
        position: 'Procurement Director, Al-Noor Food Industries'
      },
      products: ['Turmeric Powder', 'Cumin Seeds', 'Coriander Powder', 'Red Chili Powder', 'Black Pepper', 'Cardamom', 'Cinnamon', 'Cloves'],
      duration: '36 months (ongoing)',
      image: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&h=500&fit=crop'
    },
    {
      id: 'australian-aromatherapy',
      title: 'Essential Oil Portfolio for Australian Aromatherapy Brand',
      client: 'Pure Essence Aromatics',
      location: 'Sydney, Australia',
      industry: 'Aromatherapy & Natural Wellness',
      challenge: 'An Australian aromatherapy brand needed a diverse portfolio of Indian essential oils (sandalwood, jasmine, vetiver, rose) with complete traceability and GC-MS certification. They required small initial quantities for product development with the ability to scale as their business grew.',
      solution: 'We provided sample kits of 15 different essential oils with complete GC-MS reports and traceability documentation. After their selection, we established quarterly shipments starting at 5kg per oil, with flexible scaling options. We provided COAs, MSDS, and allergen declarations for each batch, meeting Australian TGA requirements.',
      results: [
        {
          metric: 'Product Range',
          value: '8 oils',
          description: 'Successfully launched 8 aromatherapy products'
        },
        {
          metric: 'Quality Certification',
          value: '100%',
          description: 'All batches passed TGA compliance testing'
        },
        {
          metric: 'Business Growth',
          value: '220%',
          description: 'Year-over-year revenue growth in oil-based products'
        },
        {
          metric: 'Order Frequency',
          value: 'Monthly',
          description: 'Scaled from quarterly to monthly shipments'
        }
      ],
      testimonial: {
        quote: 'The quality and purity of The Export Express essential oils are unmatched. Their transparency with testing and documentation gave us complete confidence in our product claims. They\'ve been instrumental in our brand\'s growth.',
        author: 'Emma Thompson',
        position: 'Founder, Pure Essence Aromatics'
      },
      products: ['Sandalwood Essential Oil', 'Jasmine Absolute', 'Vetiver Oil', 'Rose Otto', 'Patchouli Oil', 'Lemongrass Oil'],
      duration: '20 months (ongoing)',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=500&fit=crop'
    },
    {
      id: 'uk-organic-retailer',
      title: 'Organic Spice Range for UK Supermarket Chain',
      client: 'GreenGrocer Organic Markets',
      location: 'London, UK',
      industry: 'Organic Retail & Supermarkets',
      challenge: 'A UK supermarket chain wanted to launch an organic spice range under their private label but needed Soil Association certification, retail-ready packaging, and competitive pricing to compete with established brands. They required 12 different spices with consistent availability.',
      solution: 'We sourced certified organic spices from our network of Soil Association certified farms and processing units. We designed retail-ready packaging with their branding, managed all certification documentation, and established a vendor-managed inventory system with their distribution center. We provided quarterly forecasting and maintained safety stock in the UK.',
      results: [
        {
          metric: 'Product Launch',
          value: '12 SKUs',
          description: 'Successfully launched complete organic spice range'
        },
        {
          metric: 'Market Performance',
          value: '£780K',
          description: 'First-year sales across 85 store locations'
        },
        {
          metric: 'Margin Improvement',
          value: '38%',
          description: 'Higher margins vs. third-party branded spices'
        },
        {
          metric: 'Stock Availability',
          value: '98.5%',
          description: 'In-stock rate across all SKUs and locations'
        }
      ],
      testimonial: {
        quote: 'The Export Express made our private label organic spice launch incredibly smooth. Their understanding of UK certification requirements and retail packaging standards was exceptional. The range has become one of our best-performing private label categories.',
        author: 'James Patterson',
        position: 'Category Manager, GreenGrocer Organic Markets'
      },
      products: ['Organic Turmeric', 'Organic Cumin', 'Organic Coriander', 'Organic Garam Masala', 'Organic Black Pepper', 'Organic Cardamom', 'Organic Cinnamon', 'Organic Chili Powder', 'Organic Ginger', 'Organic Fennel', 'Organic Mustard Seeds', 'Organic Fenugreek'],
      duration: '28 months (ongoing)',
      image: 'https://images.unsplash.com/photo-1596040033229-a0b3b7e0f9e7?w=800&h=500&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Client Success Stories
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world examples of how we've helped international buyers build successful, 
              sustainable supply chains for premium Indian products
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <Globe className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">120+</div>
              <div className="text-sm text-gray-400">Global Clients</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$12M+</div>
              <div className="text-sm text-gray-400">Annual Export Value</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">98.5%</div>
              <div className="text-sm text-gray-400">Client Retention</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">150+</div>
              <div className="text-sm text-gray-400">Partner Farms</div>
            </div>
          </div>

          {/* Case Studies */}
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-400">{study.location}</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-sm text-gray-400">{study.industry}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">{study.title}</h2>
                        <p className="text-lg text-green-400 font-semibold">{study.client}</p>
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Challenge
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Solution
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-2xl font-bold text-green-400 mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm font-semibold text-white mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-gray-400">{result.description}</div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20 mb-6">
                      <Quote className="w-8 h-8 text-green-400 mb-3" />
                      <p className="text-gray-200 italic mb-4 leading-relaxed">
                        "{study.testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white font-bold">
                          {study.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{study.testimonial.author}</div>
                          <div className="text-sm text-gray-400">{study.testimonial.position}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Products Supplied</div>
                        <div className="text-sm text-gray-300">
                          {study.products.slice(0, 3).join(', ')}
                          {study.products.length > 3 && ` +${study.products.length - 3} more`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Partnership Duration</div>
                        <div className="text-sm text-gray-300">{study.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl p-12 border border-green-500/20 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 120+ satisfied clients who trust us for their Indian product sourcing needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/25"
              >
                Start Your Partnership
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
                <Download className="w-5 h-5" />
                Download Case Studies PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
