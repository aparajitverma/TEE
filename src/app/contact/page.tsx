'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageCircle, Clock, Globe, Building2, Navigation, Linkedin, Facebook, Instagram, Twitter, Youtube, Calendar } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  products: string[];
  quantity: string;
  incoterm: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

// LocalBusiness Schema for SEO
const addLocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://theexportexpress.com/#organization",
    "name": "The Export Express",
    "description": "Premium Indian export company specializing in herbs, spices, tea, coffee, essential oils, jute products, luxury fabrics, and eco-friendly products. Trusted global supplier with ISO certifications.",
    "url": "https://theexportexpress.com",
    "logo": "https://theexportexpress.com/logo.png",
    "image": "https://theexportexpress.com/og-image.jpg",
    "telephone": "+91-22-2288-1234",
    "email": "export@theexportexpress.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Export House, 123 Marine Drive, Nariman Point",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.9220",
      "longitude": "72.8347"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/theexportexpress",
      "https://www.facebook.com/theexportexpress",
      "https://www.instagram.com/theexportexpress",
      "https://twitter.com/exportexpress",
      "https://www.youtube.com/@theexportexpress"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-22-2288-1234",
        "contactType": "customer service",
        "email": "support@theexportexpress.com",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-22-2288-1234",
        "contactType": "sales",
        "email": "sales@theexportexpress.com",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "18.9220",
        "longitude": "72.8347"
      },
      "geoRadius": "20000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Export Products",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Herbs & Spices",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Premium Indian Spices"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Essential Oils",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Aromatic Essential Oils"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Tea & Coffee",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Premium Indian Tea & Coffee"
              }
            }
          ]
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };
  return schema;
};

export default function Contact() {
  useEffect(() => {
    // Add schema to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(addLocalBusinessSchema());
    document.head.appendChild(script);

    // Add meta tags dynamically
    document.title = 'Contact Us - Get Export Quote | The Export Express';
    
    const metaDescription = document.querySelector('meta[name=\"description\"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact The Export Express for premium Indian export products. Get instant quotes for herbs, spices, tea, coffee, essential oils & more. 24-hour response time. Offices in Mumbai, Delhi & Dubai.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Contact The Export Express for premium Indian export products. Get instant quotes for herbs, spices, tea, coffee, essential oils & more. 24-hour response time. Offices in Mumbai, Delhi & Dubai.';
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Contact The Export Express - Premium Indian Export Company' },
      { property: 'og:description', content: 'Get your export quote today. Trusted supplier of herbs, spices, tea, coffee, essential oils, jute products & eco-friendly items. ISO certified with global reach.' },
      { property: 'og:url', content: 'https://theexportexpress.com/contact' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://theexportexpress.com/og-contact.jpg' },
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property=\"${tag.property}\"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Contact The Export Express - Get Your Export Quote' },
      { name: 'twitter:description', content: 'Premium Indian export products. Instant quotes for herbs, spices, tea, coffee & more. 24-hour response time.' },
      { name: 'twitter:image', content: 'https://theexportexpress.com/og-contact.jpg' },
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name=\"${tag.name}\"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    return () => {
      // Cleanup schema
      const existingScript = document.querySelector('script[type=\"application/ld+json\"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    products: [],
    quantity: '',
    incoterm: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const countries = [
    'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia',
    'United Arab Emirates', 'Saudi Arabia', 'Japan', 'South Korea', 'Singapore',
    'Malaysia', 'Netherlands', 'Italy', 'Spain', 'Belgium', 'Switzerland',
    'Sweden', 'Norway', 'Denmark', 'Other'
  ];

  const productCategories = [
    'Herbal & Ayurvedic Products',
    'Aromatic Effluents (Essential Oils)',
    'Tea & Coffee',
    'Herbs & Spices',
    'Jute & Natural Fiber Products',
    'Luxury Fabrics',
    'Eco-Friendly Daily Essentials'
  ];

  const incoterms = [
    'FOB (Free on Board)',
    'CIF (Cost, Insurance & Freight)',
    'CFR (Cost & Freight)',
    'EXW (Ex Works)',
    'FCA (Free Carrier)',
    'DAP (Delivered at Place)',
    'DDP (Delivered Duty Paid)'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be an actual API call:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          country: '',
          products: [],
          quantity: '',
          incoterm: '',
          message: ''
        });
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Get Your Export Quote
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Fill out the form below and our export team will get back to you within 24 hours 
              with a detailed quotation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Request a Quote</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Company */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.name ? 'border-red-500' : 'border-white/20'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="Your Company Ltd."
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.email ? 'border-red-500' : 'border-white/20'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all"
                    >
                      <option value="" className="bg-gray-800">Select your country</option>
                      {countries.map(country => (
                        <option key={country} value={country} className="bg-gray-800">
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Products of Interest */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Product(s) of Interest
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {productCategories.map(product => (
                        <label
                          key={product}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-green-500/50 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={formData.products.includes(product)}
                            onChange={() => handleProductToggle(product)}
                            className="w-4 h-4 rounded border-white/20 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                          />
                          <span className="text-gray-300 text-sm">{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Incoterm */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Estimated Quantity
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="e.g., 500 kg, 1 MT, 5 containers"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Incoterm
                      </label>
                      <select
                        value={formData.incoterm}
                        onChange={(e) => handleInputChange('incoterm', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all"
                      >
                        <option value="" className="bg-gray-800">Select Incoterm</option>
                        {incoterms.map(term => (
                          <option key={term} value={term} className="bg-gray-800">
                            {term}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Requirements <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border ${
                        errors.message ? 'border-red-500' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all resize-none`}
                      placeholder="Please provide details about your requirements, certifications needed, packaging preferences, delivery timeline, etc."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      {formData.message.length} / 500 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get My Quote
                      </>
                    )}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-green-400 font-semibold">Quote request sent successfully!</p>
                        <p className="text-green-300/80 text-sm">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-red-400 font-semibold">Failed to send request</p>
                        <p className="text-red-300/80 text-sm">Please try again or contact us directly.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <p className="text-white font-semibold">export@theexportexpress.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Phone</p>
                      <p className="text-white font-semibold">+91 (0) 123-456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                      <p className="text-white font-semibold">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Office</p>
                      <p className="text-white font-semibold">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white font-semibold">9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white font-semibold">9:00 AM - 2:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              {/* Export Markets */}
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl p-6 border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold text-white">We Export To</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  45+ countries across North America, Europe, Middle East, Asia-Pacific, and Africa. 
                  Wherever you are, we can deliver.
                </p>
              </div>
            </div>
          </div>

          {/* Office Locations Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Our Office Locations</h2>
              <p className="text-gray-300 text-lg">Visit us at any of our offices worldwide</p>
            </div>

            {/* Interactive Map */}
            <div className="mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 overflow-hidden">
                <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                  {/* Map Placeholder with Embedded Google Maps */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709658!3d19.082177513865436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm font-semibold">Interactive Map</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Head Office - Mumbai */}
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Head Office</h3>
                    <p className="text-green-400 text-sm font-semibold">Mumbai, India</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Address</p>
                      <p className="text-gray-300 text-sm">
                        Export House, 123 Marine Drive<br />
                        Nariman Point, Mumbai 400021<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Phone</p>
                      <p className="text-gray-300 text-sm">+91 (22) 2288-1234</p>
                      <p className="text-gray-300 text-sm">+91 (22) 2288-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Email</p>
                      <p className="text-gray-300 text-sm">mumbai@theexportexpress.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Office Hours</p>
                      <p className="text-gray-300 text-sm">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                      <p className="text-gray-300 text-sm">Sat: 9:00 AM - 2:00 PM IST</p>
                      <p className="text-gray-300 text-sm">Sun: Closed</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold py-3 px-4 rounded-xl transition-all border border-green-500/30 hover:border-green-500/50 flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>

              {/* Regional Office - Delhi */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Regional Office</h3>
                    <p className="text-blue-400 text-sm font-semibold">New Delhi, India</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Address</p>
                      <p className="text-gray-300 text-sm">
                        Trade Center, Plot 45, Sector 18<br />
                        Connaught Place, New Delhi 110001<br />
                        Delhi, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Phone</p>
                      <p className="text-gray-300 text-sm">+91 (11) 4567-8901</p>
                      <p className="text-gray-300 text-sm">+91 (11) 4567-8902</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Email</p>
                      <p className="text-gray-300 text-sm">delhi@theexportexpress.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Office Hours</p>
                      <p className="text-gray-300 text-sm">Mon-Fri: 9:30 AM - 6:30 PM IST</p>
                      <p className="text-gray-300 text-sm">Sat: 10:00 AM - 2:00 PM IST</p>
                      <p className="text-gray-300 text-sm">Sun: Closed</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all border border-white/20 hover:border-white/30 flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>

              {/* International Office - Dubai */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">International Office</h3>
                    <p className="text-purple-400 text-sm font-semibold">Dubai, UAE</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Address</p>
                      <p className="text-gray-300 text-sm">
                        Office 2401, Business Tower<br />
                        Dubai International Financial Centre<br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Phone</p>
                      <p className="text-gray-300 text-sm">+971 (4) 123-4567</p>
                      <p className="text-gray-300 text-sm">+971 (4) 123-4568</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Email</p>
                      <p className="text-gray-300 text-sm">dubai@theexportexpress.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">Office Hours</p>
                      <p className="text-gray-300 text-sm">Sun-Thu: 9:00 AM - 6:00 PM GST</p>
                      <p className="text-gray-300 text-sm">Fri-Sat: Closed</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all border border-white/20 hover:border-white/30 flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-blue-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Planning to Visit?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  We recommend scheduling an appointment in advance to ensure our team is available to meet with you. 
                  Walk-ins are welcome during business hours, but appointments receive priority service.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:export@theexportexpress.com"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20 hover:border-white/30"
                  >
                    <Mail className="w-5 h-5" />
                    Schedule Appointment
                  </a>
                  <a
                    href="tel:+912222881234"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20 hover:border-white/30"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Additional Contact Methods */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Connect With Us</h2>
              <p className="text-gray-300 text-lg">Follow us on social media and stay updated</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Social Media Links */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.linkedin.com/company/theexportexpress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                      <Linkedin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">LinkedIn</p>
                      <p className="text-gray-400 text-xs">Follow us</p>
                    </div>
                  </a>

                  <a
                    href="https://www.facebook.com/theexportexpress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-blue-600/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-all">
                      <Facebook className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Facebook</p>
                      <p className="text-gray-400 text-xs">Like our page</p>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/theexportexpress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-pink-500/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                      <Instagram className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Instagram</p>
                      <p className="text-gray-400 text-xs">Follow us</p>
                    </div>
                  </a>

                  <a
                    href="https://twitter.com/exportexpress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-sky-500/50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500/30 transition-all">
                      <Twitter className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Twitter</p>
                      <p className="text-gray-400 text-xs">Follow us</p>
                    </div>
                  </a>

                  <a
                    href="https://www.youtube.com/@theexportexpress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-red-500/50 transition-all group col-span-2"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                      <Youtube className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">YouTube</p>
                      <p className="text-gray-400 text-xs">Subscribe to our channel</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Meeting Scheduler */}
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Schedule a Meeting</h3>
                <p className="text-gray-300 mb-6">
                  Book a 30-minute consultation with our export specialists to discuss your requirements in detail.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Product recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Pricing & MOQ discussion</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Logistics & shipping guidance</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">Certification & compliance help</span>
                  </div>
                </div>

                {/* Calendly Integration */}
                <a
                  href="https://calendly.com/theexportexpress/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Free Consultation
                </a>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Available Mon-Fri, 9 AM - 6 PM IST
                </p>
              </div>
            </div>

            {/* Corporate Email Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Corporate Email Addresses</h3>
                <p className="text-gray-300 mb-8">
                  Reach out to the right department for faster assistance
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">General Inquiries</p>
                    <a href="mailto:info@theexportexpress.com" className="text-white font-semibold hover:text-green-400 transition-all">
                      info@theexportexpress.com
                    </a>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Sales & Quotations</p>
                    <a href="mailto:sales@theexportexpress.com" className="text-white font-semibold hover:text-green-400 transition-all">
                      sales@theexportexpress.com
                    </a>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Customer Support</p>
                    <a href="mailto:support@theexportexpress.com" className="text-white font-semibold hover:text-green-400 transition-all">
                      support@theexportexpress.com
                    </a>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Quality & Compliance</p>
                    <a href="mailto:quality@theexportexpress.com" className="text-white font-semibold hover:text-green-400 transition-all">
                      quality@theexportexpress.com
                    </a>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Logistics & Shipping</p>
                    <a href="mailto:logistics@theexportexpress.com" className="text-white font-semibold hover:text-green-400 transition-all">
                      logistics@theexportexpress.com
                    </a>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Partnerships</p>
                    <a href="mailto:partnerships@theexportexpress.com" className="text-white font-semibold hover:text-green-400 transition-all">
                      partnerships@theexportexpress.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
