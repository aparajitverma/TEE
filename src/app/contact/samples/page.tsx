'use client';

import { useState } from 'react';
import { Package, Send, CheckCircle, AlertCircle, MapPin, User, Mail, Phone, Globe } from 'lucide-react';
import Link from 'next/link';

interface SampleFormData {
  // Personal Information
  name: string;
  company: string;
  email: string;
  phone: string;
  
  // Shipping Address
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  
  // Product Selection
  selectedProducts: {
    category: string;
    product: string;
    quantity: string;
  }[];
  
  // Additional Info
  purpose: string;
  additionalNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SampleRequest() {
  const [formData, setFormData] = useState<SampleFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    country: '',
    selectedProducts: [{ category: '', product: '', quantity: '50g' }],
    purpose: '',
    additionalNotes: ''
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

  const productsByCategory: { [key: string]: string[] } = {
    'Herbal & Ayurvedic': [
      'Ashwagandha Root Powder',
      'Turmeric Powder',
      'Brahmi Powder',
      'Neem Powder',
      'Tulsi (Holy Basil)',
      'Moringa Powder',
      'Amla Powder',
      'Triphala Powder'
    ],
    'Essential Oils': [
      'Sandalwood Oil',
      'Jasmine Absolute',
      'Vetiver Oil',
      'Rose Otto',
      'Patchouli Oil',
      'Lemongrass Oil',
      'Eucalyptus Oil',
      'Tea Tree Oil'
    ],
    'Tea & Coffee': [
      'Darjeeling Black Tea',
      'Assam Black Tea',
      'Green Tea',
      'White Tea',
      'Masala Chai',
      'Arabica Coffee Beans',
      'Robusta Coffee Beans'
    ],
    'Herbs & Spices': [
      'Cumin Seeds',
      'Coriander Powder',
      'Red Chili Powder',
      'Black Pepper',
      'Cardamom',
      'Cinnamon',
      'Cloves',
      'Turmeric',
      'Ginger Powder',
      'Fenugreek'
    ],
    'Jute Products': [
      'Jute Tote Bags',
      'Jute Shopping Bags',
      'Jute Pouches',
      'Jute Coasters',
      'Jute Placemats'
    ],
    'Luxury Fabrics': [
      'Banarasi Silk',
      'Kanjivaram Silk',
      'Pashmina',
      'Organic Cotton',
      'Handloom Linen'
    ],
    'Eco-Friendly Products': [
      'Bamboo Toothbrush',
      'Organic Soap',
      'Natural Cleaning Products',
      'Biodegradable Bags'
    ]
  };

  const sampleQuantities = {
    'Herbal & Ayurvedic': ['50g', '100g', '250g'],
    'Essential Oils': ['10ml', '20ml', '50ml'],
    'Tea & Coffee': ['50g', '100g', '250g'],
    'Herbs & Spices': ['50g', '100g', '250g'],
    'Jute Products': ['1 piece', '2 pieces', '5 pieces'],
    'Luxury Fabrics': ['1 meter', '2 meters', '5 meters'],
    'Eco-Friendly Products': ['1 piece', '2 pieces', '5 pieces']
  };

  const purposeOptions = [
    'Product evaluation for bulk purchase',
    'Quality testing in our lab',
    'Product development/R&D',
    'Market research',
    'Trade show/exhibition',
    'Customer presentation',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required personal fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Required shipping fields
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    // Product selection validation
    const hasValidProduct = formData.selectedProducts.some(
      p => p.category && p.product && p.quantity
    );
    if (!hasValidProduct) {
      newErrors.products = 'Please select at least one product';
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

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          stateProvince: '',
          postalCode: '',
          country: '',
          selectedProducts: [{ category: '', product: '', quantity: '50g' }],
          purpose: '',
          additionalNotes: ''
        });
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof SampleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addProductRow = () => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, { category: '', product: '', quantity: '50g' }]
    }));
  };

  const removeProductRow = (index: number) => {
    if (formData.selectedProducts.length > 1) {
      setFormData(prev => ({
        ...prev,
        selectedProducts: prev.selectedProducts.filter((_, i) => i !== index)
      }));
    }
  };

  const updateProductRow = (index: number, field: string, value: string) => {
    const updated = [...formData.selectedProducts];
    updated[index] = { ...updated[index], [field]: value };
    
    // Reset product and quantity when category changes
    if (field === 'category') {
      updated[index].product = '';
      updated[index].quantity = sampleQuantities[value as keyof typeof sampleQuantities]?.[0] || '50g';
    }
    
    setFormData(prev => ({ ...prev, selectedProducts: updated }));
    if (errors.products) {
      setErrors(prev => ({ ...prev, products: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Request Product Samples
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get free samples delivered to your location. Evaluate our products before placing a bulk order.
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20 mb-8">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">Sample Policy</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Samples are complimentary for most products</li>
                  <li>• Shipping costs apply (calculated at checkout)</li>
                  <li>• Maximum 5 samples per request</li>
                  <li>• Processing time: 2-3 business days</li>
                  <li>• Includes COA and product specifications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-green-400" />
                  Contact Information
                </h2>
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
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
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
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
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
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address Line 1 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/10 border ${
                        errors.addressLine1 ? 'border-red-500' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all`}
                      placeholder="Street address, P.O. box, company name"
                    />
                    {errors.addressLine1 && <p className="mt-1 text-sm text-red-400">{errors.addressLine1}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.city ? 'border-red-500' : 'border-white/20'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all`}
                        placeholder="City"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={formData.stateProvince}
                        onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="State / Province"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Postal / ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all"
                        placeholder="Postal / ZIP Code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Country <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/10 border ${
                          errors.country ? 'border-red-500' : 'border-white/20'
                        } rounded-xl text-white focus:outline-none focus:border-green-500 transition-all`}
                      >
                        <option value="" className="bg-gray-800">Select country</option>
                        {countries.map(country => (
                          <option key={country} value={country} className="bg-gray-800">
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6 text-purple-400" />
                  Product Selection
                </h2>
                <div className="space-y-4">
                  {formData.selectedProducts.map((product, index) => (
                    <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-white font-semibold">Sample #{index + 1}</h3>
                        {formData.selectedProducts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProductRow(index)}
                            className="text-red-400 hover:text-red-300 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Category
                          </label>
                          <select
                            value={product.category}
                            onChange={(e) => updateProductRow(index, 'category', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all"
                          >
                            <option value="" className="bg-gray-800">Select category</option>
                            {Object.keys(productsByCategory).map(cat => (
                              <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Product
                          </label>
                          <select
                            value={product.product}
                            onChange={(e) => updateProductRow(index, 'product', e.target.value)}
                            disabled={!product.category}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="" className="bg-gray-800">Select product</option>
                            {product.category && productsByCategory[product.category]?.map(prod => (
                              <option key={prod} value={prod} className="bg-gray-800">{prod}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Quantity
                          </label>
                          <select
                            value={product.quantity}
                            onChange={(e) => updateProductRow(index, 'quantity', e.target.value)}
                            disabled={!product.category}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {product.category && sampleQuantities[product.category as keyof typeof sampleQuantities]?.map(qty => (
                              <option key={qty} value={qty} className="bg-gray-800">{qty}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {errors.products && <p className="text-sm text-red-400">{errors.products}</p>}
                  
                  {formData.selectedProducts.length < 5 && (
                    <button
                      type="button"
                      onClick={addProductRow}
                      className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-all font-semibold"
                    >
                      + Add Another Sample (Max 5)
                    </button>
                  )}
                </div>
              </div>

              {/* Purpose & Notes */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Purpose of Sample Request
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all"
                  >
                    <option value="" className="bg-gray-800">Select purpose</option>
                    {purposeOptions.map(purpose => (
                      <option key={purpose} value={purpose} className="bg-gray-800">
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all resize-none"
                    placeholder="Any specific requirements or questions about the samples..."
                  />
                </div>
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
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Request Samples
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-semibold">Sample request submitted successfully!</p>
                    <p className="text-green-300/80 text-sm">We'll process your request and contact you within 24 hours with shipping details.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-semibold">Failed to submit request</p>
                    <p className="text-red-300/80 text-sm">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-400" />
                Questions About Samples?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Contact our sample coordinator for assistance
              </p>
              <p className="text-white font-semibold">samples@theexportexpress.com</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Need a Full Quote?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Ready to place a bulk order? Get a detailed quotation
              </p>
              <Link
                href="/contact"
                className="inline-block text-blue-400 font-semibold hover:text-blue-300 transition-all"
              >
                Request Quote →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
