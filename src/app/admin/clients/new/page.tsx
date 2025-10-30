'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewClientPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientType: 'Lead',
    companyName: '',
    contactPerson: '',
    designation: '',
    status: 'Active',
    emailPrimary: '',
    emailSecondary: '',
    phonePrimary: '',
    phoneSecondary: '',
    whatsapp: '',
    website: '',
    linkedin: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
    industry: '',
    companySize: '',
    taxId: '',
    paymentTermsPreferred: '',
    creditLimit: 0,
    currencyPreferred: 'USD',
    leadSource: '',
    leadStatus: 'New',
    leadTemperature: 'Warm',
    probabilityToClose: 50,
    expectedOrderValue: 0,
    productsInterestedIn: '',
    certificationsRequired: '',
    typicalOrderQuantity: '',
    orderFrequency: '',
    preferredPackaging: '',
    notes: '',
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/clients');
      } else {
        const error = await response.json();
        alert('Failed to create client: ' + (error.details || error.error));
      }
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Error creating client');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/clients')}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Client</h1>
            <p className="text-gray-400">Create a new client or lead</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Client Type <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.clientType}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Lead">Lead</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Active Client">Active Client</option>
                  <option value="Inactive Client">Inactive Client</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blacklisted">Blacklisted</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Contact Person <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Contact person name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Job title"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Primary Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.emailPrimary}
                  onChange={(e) => setFormData({ ...formData, emailPrimary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="email@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Email</label>
                <input
                  type="email"
                  value={formData.emailSecondary}
                  onChange={(e) => setFormData({ ...formData, emailSecondary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Primary Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phonePrimary}
                  onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+1-234-567-8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Phone</label>
                <input
                  type="tel"
                  value={formData.phoneSecondary}
                  onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="https://company.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Address Line 1</label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Address Line 2</label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">State/Province</label>
                <input
                  type="text"
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Retail, Manufacturing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Company Size</label>
                <input
                  type="text"
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., 50-100 employees"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tax ID</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Payment Terms</label>
                <input
                  type="text"
                  value={formData.paymentTermsPreferred}
                  onChange={(e) => setFormData({ ...formData, paymentTermsPreferred: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Net 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Credit Limit</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Currency</label>
                <select
                  value={formData.currencyPreferred}
                  onChange={(e) => setFormData({ ...formData, currencyPreferred: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lead Information (if Lead/Prospect) */}
          {(formData.clientType === 'Lead' || formData.clientType === 'Prospect') && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Lead Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Lead Source</label>
                  <input
                    type="text"
                    value={formData.leadSource}
                    onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Website, Referral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Lead Status</label>
                  <select
                    value={formData.leadStatus}
                    onChange={(e) => setFormData({ ...formData, leadStatus: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Temperature</label>
                  <select
                    value={formData.leadTemperature}
                    onChange={(e) => setFormData({ ...formData, leadTemperature: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Probability to Close (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.probabilityToClose}
                    onChange={(e) => setFormData({ ...formData, probabilityToClose: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Expected Order Value</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.expectedOrderValue}
                    onChange={(e) => setFormData({ ...formData, expectedOrderValue: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products & Preferences */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Products & Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Products Interested In</label>
                <input
                  type="text"
                  value={formData.productsInterestedIn}
                  onChange={(e) => setFormData({ ...formData, productsInterestedIn: e.target.value })}
                  placeholder="e.g., Basmati Rice, Organic Spices, Premium Tea"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of products</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Certifications Required</label>
                <input
                  type="text"
                  value={formData.certificationsRequired}
                  onChange={(e) => setFormData({ ...formData, certificationsRequired: e.target.value })}
                  placeholder="e.g., Organic, Halal, ISO 22000"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Typical Order Quantity</label>
                <input
                  type="text"
                  value={formData.typicalOrderQuantity}
                  onChange={(e) => setFormData({ ...formData, typicalOrderQuantity: e.target.value })}
                  placeholder="e.g., 5000 kg, 100 units"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Order Frequency</label>
                <select
                  value={formData.orderFrequency}
                  onChange={(e) => setFormData({ ...formData, orderFrequency: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select frequency</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-annually">Semi-annually</option>
                  <option value="Annually">Annually</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Packaging</label>
                <input
                  type="text"
                  value={formData.preferredPackaging}
                  onChange={(e) => setFormData({ ...formData, preferredPackaging: e.target.value })}
                  placeholder="e.g., Vacuum-sealed bags, 25kg units"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/clients')}
              className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {submitting ? 'Creating...' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
