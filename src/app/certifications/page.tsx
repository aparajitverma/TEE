'use client';

import { Download, CheckCircle, Shield, Award, Leaf, Globe, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Quality', 'Food Safety', 'Organic', 'Social & Environmental'];

  const certifications = [
    {
      name: 'ISO 9001:2015',
      fullName: 'Quality Management System',
      description: 'International standard for quality management systems, ensuring consistent quality in our sourcing, processing, and export operations. Demonstrates our commitment to customer satisfaction and continuous improvement.',
      category: 'Quality',
      icon: Shield,
      color: 'blue',
      pdfLink: '/downloads/iso-9001-certificate.pdf',
      validUntil: '2025-12-31',
      applicableTo: ['All Products']
    },
    {
      name: 'ISO 22000 / HACCP',
      fullName: 'Food Safety Management System',
      description: 'Comprehensive food safety management system covering the entire supply chain. HACCP principles ensure hazard analysis and critical control points are monitored at every stage from farm to export.',
      category: 'Food Safety',
      icon: Shield,
      color: 'green',
      pdfLink: '/downloads/iso-22000-certificate.pdf',
      validUntil: '2025-10-15',
      applicableTo: ['Herbal & Ayurvedic', 'Tea & Coffee', 'Herbs & Spices', 'Eco-Friendly Essentials']
    },
    {
      name: 'FSSAI License',
      fullName: 'Food Safety and Standards Authority of India',
      description: 'Mandatory license from India\'s apex food regulatory body. Ensures compliance with Indian food safety standards, proper hygiene practices, and regular inspections of our facilities.',
      category: 'Food Safety',
      icon: CheckCircle,
      color: 'orange',
      pdfLink: '/downloads/fssai-license.pdf',
      validUntil: '2026-03-20',
      applicableTo: ['All Food Products']
    },
    {
      name: 'USDA Organic',
      fullName: 'United States Department of Agriculture Organic Certification',
      description: 'Certified organic by USDA standards, ensuring products are grown without synthetic pesticides, GMOs, or prohibited substances. Annual inspections verify compliance with National Organic Program standards.',
      category: 'Organic',
      icon: Leaf,
      color: 'green',
      pdfLink: '/downloads/usda-organic-certificate.pdf',
      validUntil: '2025-08-30',
      applicableTo: ['Organic Herbal Products', 'Organic Tea & Coffee', 'Organic Spices']
    },
    {
      name: 'EU Organic Certification',
      fullName: 'European Union Organic Regulation (EC) 834/2007',
      description: 'Compliance with strict EU organic farming regulations. Products certified under this standard meet European consumer expectations for organic integrity, traceability, and sustainability.',
      category: 'Organic',
      icon: Leaf,
      color: 'blue',
      pdfLink: '/downloads/eu-organic-certificate.pdf',
      validUntil: '2025-11-15',
      applicableTo: ['Organic Products for EU Markets']
    },
    {
      name: 'Fair Trade Certified',
      fullName: 'Fair Trade International Standards',
      description: 'Ensures fair prices for farmers, safe working conditions, and environmental sustainability. Fair Trade premium supports community development projects and empowers farming communities.',
      category: 'Social & Environmental',
      icon: Globe,
      color: 'purple',
      pdfLink: '/downloads/fair-trade-certificate.pdf',
      validUntil: '2026-01-10',
      applicableTo: ['Tea & Coffee', 'Spices', 'Jute Products']
    },
    {
      name: 'GMP Certified',
      fullName: 'Good Manufacturing Practices',
      description: 'WHO-recognized GMP certification ensures pharmaceutical-grade quality control in processing facilities. Covers hygiene, equipment maintenance, personnel training, and documentation practices.',
      category: 'Quality',
      icon: Award,
      color: 'yellow',
      pdfLink: '/downloads/gmp-certificate.pdf',
      validUntil: '2025-09-25',
      applicableTo: ['Herbal Extracts', 'Essential Oils', 'Ayurvedic Products']
    },
    {
      name: 'Phytosanitary Certificate',
      fullName: 'International Plant Protection Convention (IPPC)',
      description: 'Official certificate issued by plant protection authorities confirming products are free from quarantine pests and meet importing country requirements. Required for international plant product trade.',
      category: 'Quality',
      icon: CheckCircle,
      color: 'green',
      pdfLink: '/downloads/phytosanitary-certificate.pdf',
      validUntil: 'Per Shipment',
      applicableTo: ['All Plant-Based Products']
    },
  ];

  const filteredCertifications = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'bg-blue-500/20' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: 'bg-green-500/20' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', icon: 'bg-orange-500/20' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'bg-purple-500/20' },
      yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: 'bg-yellow-500/20' },
    };
    return colors[color] || colors.blue;
  };

  // Generate JSON-LD structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Export Express",
    "url": "https://theexportexpress.com",
    "description": "Premium Indian export company with international quality certifications",
    "hasCredential": certifications.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": cert.category,
      "name": cert.name,
      "description": cert.description,
      "recognizedBy": {
        "@type": "Organization",
        "name": cert.fullName
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="pt-32 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our Certifications
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                International Quality & Safety Standards
              </p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We maintain the highest standards of quality, safety, and sustainability through internationally recognized certifications. Every product we export meets or exceeds global regulatory requirements.
              </p>
            </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {filteredCertifications.map((cert) => {
              const Icon = cert.icon;
              const colors = getColorClasses(cert.color);
              
              return (
                <div
                  key={cert.name}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border ${colors.border} hover:bg-white/10 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${colors.icon} p-3 rounded-xl`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">{cert.name}</h3>
                      <p className={`text-sm ${colors.text} font-semibold`}>{cert.fullName}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400">Valid Until: <span className="text-white">{cert.validUntil}</span></span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <div>
                        <span className="text-gray-400">Applicable To: </span>
                        <span className="text-white">{cert.applicableTo.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={cert.pdfLink}
                    className={`inline-flex items-center gap-2 ${colors.bg} ${colors.text} px-4 py-2 rounded-lg hover:${colors.bg} transition-all font-semibold text-sm`}
                  >
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </a>
                </div>
              );
            })}
          </div>

          {/* Certification Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Certification Timeline</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                {certifications
                  .filter(cert => cert.validUntil !== 'Per Shipment')
                  .sort((a, b) => new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime())
                  .map((cert, index) => {
                    const colors = getColorClasses(cert.color);
                    const Icon = cert.icon;
                    return (
                      <div key={cert.name} className="flex items-start gap-4">
                        <div className={`${colors.icon} p-2 rounded-lg flex-shrink-0`}>
                          <Calendar className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-bold">{cert.name}</h3>
                            <span className={`text-sm ${colors.text} font-semibold`}>
                              Valid until {cert.validUntil}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{cert.fullName}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-green-500/30 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Specific Certification Documentation?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We can provide additional certifications, test reports, and compliance documentation specific to your market requirements. Contact us for custom certification needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-all font-semibold"
              >
                Request Documentation
                <CheckCircle className="w-5 h-5" />
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl transition-all font-semibold"
              >
                View Certified Products
                <Award className="w-5 h-5" />
              </a>
            </div>
          </div>
          </div>
        </main>
      </div>
    </>
  );
}
