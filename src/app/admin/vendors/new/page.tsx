'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewVendorPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorType: 'Farmer',
    contactPerson: '',
    phonePrimary: '',
    phoneSecondary: '',
    email: '',
    whatsapp: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
    pan: '',
    paymentTerms: 'Net 30',
    creditLimit: '',
    productsSupplied: '',
    monthlyCapacity: '',
    minimumOrderQty: '',
    leadTimeDays: '',
    certifications: '',
    bankName: '',
    bankAccountNumber: '',
    bankIfsc: '',
    bankBranch: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : 0,
        leadTimeDays: formData.leadTimeDays ? parseInt(formData.leadTimeDays) : 0,
        productsSupplied: formData.productsSupplied
          ? formData.productsSupplied.split(',').map((p) => p.trim())
          : [],
        certifications: formData.certifications
          ? formData.certifications.split(',').map((c) => c.trim())
          : [],
      };

      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/admin/vendors');
      } else {
        const error = await response.json();
        alert('Failed to add vendor: ' + (error.details || error.error));
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
      alert('Error adding vendor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/vendors')}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Vendor</h1>
            <p className="text-gray-400">Fill in the vendor details below</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Vendor Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter vendor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Vendor Type <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.vendorType}
                  onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Processor">Processor</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Service Provider">Service Provider</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Primary Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phonePrimary}
                  onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+91-9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Secondary Phone</label>
                <input
                  type="tel"
                  value={formData.phoneSecondary}
                  onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="vendor@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+91-9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="City name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="State name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="123456"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Address Line 1</label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="Street address"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Address Line 2</label>
              <input
                type="text"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                placeholder="Apartment, suite, etc."
              />
            </div>
          </div>

          {/* Business Details */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Business Details (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">GSTIN</label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">PAN</label>
                <input
                  type="text"
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="AAAAA0000A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Payment Terms</label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Net 30">Net 30</option>
                  <option value="Net 60">Net 60</option>
                  <option value="Advance">Advance</option>
                  <option value="COD">COD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Credit Limit (₹)</label>
                <input
                  type="number"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="500000"
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bank Details (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="State Bank of India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Account Number</label>
                <input
                  type="text"
                  value={formData.bankAccountNumber}
                  onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">IFSC Code</label>
                <input
                  type="text"
                  value={formData.bankIfsc}
                  onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="SBIN0001234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Branch Name</label>
                <input
                  type="text"
                  value={formData.bankBranch}
                  onChange={(e) => setFormData({ ...formData, bankBranch: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Main Branch"
                />
              </div>
            </div>
          </div>

          {/* Products & Capacity */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products & Capacity (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Products Supplied (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Cumin, Fennel, Coriander"
                  value={formData.productsSupplied}
                  onChange={(e) => setFormData({ ...formData, productsSupplied: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Monthly Capacity</label>
                <input
                  type="text"
                  placeholder="50 MT"
                  value={formData.monthlyCapacity}
                  onChange={(e) => setFormData({ ...formData, monthlyCapacity: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Minimum Order Quantity</label>
                <input
                  type="text"
                  placeholder="10 MT"
                  value={formData.minimumOrderQty}
                  onChange={(e) => setFormData({ ...formData, minimumOrderQty: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Lead Time (days)</label>
                <input
                  type="number"
                  placeholder="7"
                  value={formData.leadTimeDays}
                  onChange={(e) => setFormData({ ...formData, leadTimeDays: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Certifications (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="India Organic, USDA Organic, ISO 22000"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={() => router.push('/admin/vendors')}
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
              {submitting ? 'Saving...' : 'Save Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
