'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, Building2, 
  CreditCard, Package, Star, TrendingUp, Calendar, FileText 
} from 'lucide-react';

interface Vendor {
  id: number;
  vendorCode: string;
  vendorName: string;
  vendorType: string;
  status: string;
  rating: number;
  contactPerson: string;
  phonePrimary: string;
  phoneSecondary: string | null;
  email: string | null;
  whatsapp: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  country: string | null;
  gstin: string | null;
  pan: string | null;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankIfsc: string | null;
  bankBranch: string | null;
  paymentTerms: string | null;
  creditLimit: number;
  productsSupplied: string[];
  monthlyCapacity: string | null;
  minimumOrderQty: string | null;
  leadTimeDays: number;
  certifications: string[];
  totalOrders: number;
  totalValue: number;
  qualityRating: number;
  deliveryRating: number;
  communicationRating: number;
  outstandingAmount: number;
  notes: string | null;
  dateAdded: string;
}

export default function VendorViewPage() {
  const router = useRouter();
  const params = useParams();
  const vendorId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    fetchVendor();
  }, [vendorId]);

  const fetchVendor = async () => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`);
      const data = await response.json();
      
      if (data.vendor) {
        setVendor(data.vendor);
      }
    } catch (error) {
      console.error('Error fetching vendor:', error);
      alert('Failed to load vendor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this vendor? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/vendors');
      } else {
        alert('Failed to delete vendor');
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
      alert('Error deleting vendor');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      Active: 'bg-green-500/20 text-green-400 border-green-500/30',
      Inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      Blacklisted: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status as keyof typeof colors] || colors.Active;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Farmer: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      Processor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Wholesaler: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Service Provider': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return colors[type as keyof typeof colors] || colors.Farmer;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading vendor...</div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Vendor not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/vendors')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{vendor.vendorName}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(vendor.status)}`}>
                  {vendor.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeBadge(vendor.vendorType)}`}>
                  {vendor.vendorType}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-400">{vendor.vendorCode}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(vendor.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-gray-400 text-sm ml-1">({vendor.rating.toFixed(1)})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/admin/vendors/${vendorId}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Contact Person</label>
                  <p className="text-white font-medium">{vendor.contactPerson}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Primary Phone</label>
                  <a href={`tel:${vendor.phonePrimary}`} className="text-emerald-400 hover:text-emerald-300 font-medium">
                    {vendor.phonePrimary}
                  </a>
                </div>
                {vendor.phoneSecondary && (
                  <div>
                    <label className="text-sm text-gray-400">Secondary Phone</label>
                    <a href={`tel:${vendor.phoneSecondary}`} className="text-emerald-400 hover:text-emerald-300 font-medium">
                      {vendor.phoneSecondary}
                    </a>
                  </div>
                )}
                {vendor.email && (
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <a href={`mailto:${vendor.email}`} className="text-emerald-400 hover:text-emerald-300 font-medium">
                      {vendor.email}
                    </a>
                  </div>
                )}
                {vendor.whatsapp && (
                  <div>
                    <label className="text-sm text-gray-400">WhatsApp</label>
                    <a href={`https://wa.me/${vendor.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-medium">
                      {vendor.whatsapp}
                    </a>
                  </div>
                )}
                {(vendor.addressLine1 || vendor.city) && (
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Address
                    </label>
                    <p className="text-white">
                      {vendor.addressLine1}
                      {vendor.addressLine2 && `, ${vendor.addressLine2}`}
                      {vendor.city && `, ${vendor.city}`}
                      {vendor.state && `, ${vendor.state}`}
                      {vendor.pincode && ` - ${vendor.pincode}`}
                      {vendor.country && `, ${vendor.country}`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Business Details Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Business Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendor.gstin && (
                  <div>
                    <label className="text-sm text-gray-400">GSTIN</label>
                    <p className="text-white font-mono">{vendor.gstin}</p>
                  </div>
                )}
                {vendor.pan && (
                  <div>
                    <label className="text-sm text-gray-400">PAN</label>
                    <p className="text-white font-mono">{vendor.pan}</p>
                  </div>
                )}
                {vendor.paymentTerms && (
                  <div>
                    <label className="text-sm text-gray-400">Payment Terms</label>
                    <p className="text-white">{vendor.paymentTerms}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-400">Credit Limit</label>
                  <p className="text-white font-medium">₹{vendor.creditLimit.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Bank Details Card */}
            {(vendor.bankName || vendor.bankAccountNumber) && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-semibold text-white">Bank Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vendor.bankName && (
                    <div>
                      <label className="text-sm text-gray-400">Bank Name</label>
                      <p className="text-white">{vendor.bankName}</p>
                    </div>
                  )}
                  {vendor.bankAccountNumber && (
                    <div>
                      <label className="text-sm text-gray-400">Account Number</label>
                      <p className="text-white font-mono">{vendor.bankAccountNumber}</p>
                    </div>
                  )}
                  {vendor.bankIfsc && (
                    <div>
                      <label className="text-sm text-gray-400">IFSC Code</label>
                      <p className="text-white font-mono">{vendor.bankIfsc}</p>
                    </div>
                  )}
                  {vendor.bankBranch && (
                    <div>
                      <label className="text-sm text-gray-400">Branch</label>
                      <p className="text-white">{vendor.bankBranch}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Products & Capacity Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-white">Products & Capacity</h2>
              </div>
              <div className="space-y-4">
                {vendor.productsSupplied && vendor.productsSupplied.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-400">Products Supplied</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {vendor.productsSupplied.map((product, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vendor.monthlyCapacity && (
                    <div>
                      <label className="text-sm text-gray-400">Monthly Capacity</label>
                      <p className="text-white font-medium">{vendor.monthlyCapacity}</p>
                    </div>
                  )}
                  {vendor.minimumOrderQty && (
                    <div>
                      <label className="text-sm text-gray-400">Min Order Qty</label>
                      <p className="text-white font-medium">{vendor.minimumOrderQty}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-400">Lead Time</label>
                    <p className="text-white font-medium">{vendor.leadTimeDays} days</p>
                  </div>
                </div>
                {vendor.certifications && vendor.certifications.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-400">Certifications</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {vendor.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes Card */}
            {vendor.notes && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <h2 className="text-lg font-semibold text-white">Notes</h2>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{vendor.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Performance Metrics Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Performance</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Total Orders</label>
                  <p className="text-2xl font-bold text-white">{vendor.totalOrders}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Total Purchase Value</label>
                  <p className="text-2xl font-bold text-emerald-400">₹{vendor.totalValue.toLocaleString()}</p>
                </div>
                {vendor.totalOrders > 0 && (
                  <div>
                    <label className="text-sm text-gray-400">Average Order Value</label>
                    <p className="text-xl font-semibold text-white">
                      ₹{(vendor.totalValue / vendor.totalOrders).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-700">
                  <label className="text-sm text-gray-400 mb-2 block">Ratings</label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Quality</span>
                        <span className="text-sm text-white">{vendor.qualityRating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(vendor.qualityRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Delivery</span>
                        <span className="text-sm text-white">{vendor.deliveryRating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(vendor.deliveryRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Communication</span>
                        <span className="text-sm text-white">{vendor.communicationRating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(vendor.communicationRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {vendor.outstandingAmount > 0 && (
                  <div className="pt-4 border-t border-gray-700">
                    <label className="text-sm text-gray-400">Outstanding Amount</label>
                    <p className="text-xl font-bold text-red-400">₹{vendor.outstandingAmount.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-white">Quick Info</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Added On</label>
                  <p className="text-white">{new Date(vendor.dateAdded).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Vendor Type</label>
                  <p className="text-white">{vendor.vendorType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(vendor.status)}`}>
                    {vendor.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
