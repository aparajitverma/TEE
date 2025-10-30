'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit, Trash2, Phone, Mail, Star, Download } from 'lucide-react';

interface Vendor {
  id: number;
  vendorCode: string;
  vendorName: string;
  vendorType: string;
  status: string;
  rating: number;
  contactPerson: string;
  phonePrimary: string;
  email: string | null;
  city: string | null;
  state: string | null;
  productsSupplied: string | null;
  lastOrderDate: string | null;
  totalOrders: number;
  totalValue: number;
  outstandingAmount: number;
}

export default function VendorList() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'code' | 'rating' | 'orders' | 'value'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const fetchVendors = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterType !== 'all') params.append('type', filterType);
      if (filterStatus !== 'all') params.append('status', filterStatus);

      const response = await fetch(`/api/vendors?${params.toString()}`);
      const data = await response.json();
      
      let sortedVendors = data.vendors || [];
      
      // Client-side sorting
      sortedVendors.sort((a: Vendor, b: Vendor) => {
        let comparison = 0;
        switch (sortBy) {
          case 'name':
            comparison = a.vendorName.localeCompare(b.vendorName);
            break;
          case 'code':
            comparison = a.vendorCode.localeCompare(b.vendorCode);
            break;
          case 'rating':
            comparison = a.rating - b.rating;
            break;
          case 'orders':
            comparison = a.totalOrders - b.totalOrders;
            break;
          case 'value':
            comparison = a.totalValue - b.totalValue;
            break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
      
      setVendors(sortedVendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: 'name' | 'code' | 'rating' | 'orders' | 'value') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterStatus('all');
  };

  const exportToCSV = () => {
    const headers = ['Vendor Code', 'Vendor Name', 'Type', 'Status', 'Contact Person', 'Phone', 'Email', 'City', 'State', 'Total Orders', 'Total Value', 'Outstanding'];
    const csvData = vendors.map(v => [
      v.vendorCode,
      v.vendorName,
      v.vendorType,
      v.status,
      v.contactPerson,
      v.phonePrimary,
      v.email || '',
      v.city || '',
      v.state || '',
      v.totalOrders,
      v.totalValue,
      v.outstandingAmount
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `vendors_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchVendors();
  }, [searchTerm, filterType, filterStatus, sortBy, sortOrder]);

  const deleteVendor = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await fetch(`/api/vendors/${id}`, { method: 'DELETE' });
      fetchVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      Active: 'bg-green-500/20 text-green-400',
      Inactive: 'bg-gray-500/20 text-gray-400',
      Blacklisted: 'bg-red-500/20 text-red-400',
    };
    return colors[status as keyof typeof colors] || colors.Active;
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Farmer: 'bg-emerald-500/20 text-emerald-400',
      Processor: 'bg-blue-500/20 text-blue-400',
      Wholesaler: 'bg-purple-500/20 text-purple-400',
      'Service Provider': 'bg-orange-500/20 text-orange-400',
    };
    return colors[type as keyof typeof colors] || colors.Farmer;
  };

  // Pagination logic
  const totalPages = Math.ceil(vendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVendors = vendors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading vendors...</div>;
  }

  if (vendors.length === 0 && !searchTerm && filterType === 'all' && filterStatus === 'all') {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Vendors Yet</h3>
          <p className="text-gray-400 mb-4">
            Start by adding your first vendor to track suppliers and manage relationships
          </p>
          <button
            onClick={() => router.push('/admin/vendors/new')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5" />
            Add Your First Vendor
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="Farmer">Farmer</option>
            <option value="Processor">Processor</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Service Provider">Service Provider</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
          {(searchTerm || filterType !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        {vendors.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {vendors.length} vendor{vendors.length !== 1 ? 's' : ''}
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Vendor
                    {sortBy === 'name' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase cursor-pointer hover:text-white"
                  onClick={() => handleSort('orders')}
                >
                  <div className="flex items-center gap-1">
                    Orders
                    {sortBy === 'orders' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{vendor.vendorName}</div>
                      <div className="text-sm text-gray-400">{vendor.vendorCode}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(vendor.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(vendor.vendorType)}`}>
                      {vendor.vendorType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-white">{vendor.contactPerson}</div>
                      <div className="text-gray-400 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {vendor.phonePrimary}
                      </div>
                      {vendor.email && (
                        <div className="text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {vendor.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-400">
                      {vendor.productsSupplied ? (
                        <div className="flex flex-wrap gap-1">
                          {JSON.parse(vendor.productsSupplied).slice(0, 2).map((product: string, idx: number) => (
                            <span key={idx} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">
                              {product}
                            </span>
                          ))}
                          {JSON.parse(vendor.productsSupplied).length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{JSON.parse(vendor.productsSupplied).length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        '-'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-white">{vendor.totalOrders} orders</div>
                      <div className="text-gray-400">₹{vendor.totalValue.toLocaleString()}</div>
                      {vendor.lastOrderDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Last: {new Date(vendor.lastOrderDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/vendors/${vendor.id}/view`)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-emerald-400 hover:text-emerald-300"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => router.push(`/admin/vendors/${vendor.id}`)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVendor(vendor.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-red-400 hover:text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Showing {startIndex + 1}-{Math.min(endIndex, vendors.length)} of {vendors.length}
              </div>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        currentPage === pageNum
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
