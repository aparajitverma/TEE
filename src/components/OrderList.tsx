'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Edit, Trash2, Eye, Package, Download, CheckSquare, Square, Mail, RefreshCw, Filter, Save, Star, Clock, Calendar, AlertCircle, TrendingUp } from 'lucide-react';

interface Order {
  id: number;
  orderNumber: string;
  orderType: string;
  orderStatus: string;
  priority: string;
  clientName: string;
  orderDate: string;
  expectedDeliveryDate: string | null;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
}

interface OrderListProps {
  onRefresh?: () => void;
}

export default function OrderList({ onRefresh }: OrderListProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [quickFilter, setQuickFilter] = useState<string>('all');
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [searchName, setSearchName] = useState('');

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterPaymentStatus !== 'all') params.append('paymentStatus', filterPaymentStatus);

      const response = await fetch(`/api/orders?${params.toString()}`);
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, filterStatus, filterPaymentStatus, quickFilter]);

  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const fetchSavedSearches = async () => {
    try {
      const response = await fetch('/api/orders/saved-searches?createdBy=Admin');
      const data = await response.json();
      if (data.success) {
        setSavedSearches(data.savedSearches || []);
      }
    } catch (error) {
      console.error('Error fetching saved searches:', error);
    }
  };

  const applyQuickFilter = (filter: string) => {
    setQuickFilter(filter);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    switch (filter) {
      case 'today':
        // Filter orders created today
        setSearchTerm('');
        break;
      case 'this-week':
        // Filter orders from this week
        setSearchTerm('');
        break;
      case 'overdue':
        // Filter overdue orders
        setFilterStatus('all');
        break;
      case 'urgent':
        // Filter urgent priority orders
        setSearchTerm('');
        break;
      case 'pending-payment':
        setFilterPaymentStatus('Pending');
        break;
      case 'all':
      default:
        // Reset all filters
        break;
    }
  };

  const saveCurrentSearch = async () => {
    if (!searchName.trim()) {
      alert('Please enter a name for this search');
      return;
    }

    try {
      const filters = {
        searchTerm,
        filterStatus,
        filterPaymentStatus,
        quickFilter,
      };

      const response = await fetch('/api/orders/saved-searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: searchName,
          filters,
          createdBy: 'Admin',
          isPublic: false,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Search saved successfully!');
        setShowSaveSearchModal(false);
        setSearchName('');
        fetchSavedSearches();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving search:', error);
      alert('Failed to save search');
    }
  };

  const applySavedSearch = async (savedSearchId: number) => {
    try {
      const response = await fetch(`/api/orders/saved-searches/${savedSearchId}`);
      const data = await response.json();
      
      if (data.success) {
        const filters = JSON.parse(data.savedSearch.filters);
        setSearchTerm(filters.searchTerm || '');
        setFilterStatus(filters.filterStatus || 'all');
        setFilterPaymentStatus(filters.filterPaymentStatus || 'all');
        setQuickFilter(filters.quickFilter || 'all');
      }
    } catch (error) {
      console.error('Error applying saved search:', error);
      alert('Failed to apply saved search');
    }
  };

  const deleteSavedSearch = async (id: number) => {
    if (!confirm('Delete this saved search?')) return;
    
    try {
      const response = await fetch(`/api/orders/saved-searches/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        fetchSavedSearches();
      }
    } catch (error) {
      console.error('Error deleting saved search:', error);
    }
  };

  const deleteOrder = async (id: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      fetchOrders();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Inquiry: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      Quoted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
      Processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status] || colors.Inquiry;
  };

  const getPaymentBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-red-500/20 text-red-400',
      Partial: 'bg-yellow-500/20 text-yellow-400',
      Paid: 'bg-green-500/20 text-green-400',
    };
    return colors[status] || colors.Pending;
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      Low: 'bg-gray-500/20 text-gray-400',
      Medium: 'bg-blue-500/20 text-blue-400',
      High: 'bg-orange-500/20 text-orange-400',
      Urgent: 'bg-red-500/20 text-red-400',
    };
    return colors[priority] || colors.Medium;
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => o.id));
    }
  };

  const toggleSelectOrder = (orderId: number) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedOrders.length === 0) {
      alert('Please select orders first');
      return;
    }

    if (!confirm(`Update status to "${newStatus}" for ${selectedOrders.length} order(s)?`)) {
      return;
    }

    setBulkActionLoading(true);
    try {
      const response = await fetch('/api/orders/bulk/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderIds: selectedOrders,
          newStatus,
          updatedBy: 'Admin',
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Successfully updated ${data.updatedCount} order(s)`);
        setSelectedOrders([]);
        fetchOrders();
        if (onRefresh) onRefresh();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error in bulk status update:', error);
      alert('Failed to update orders');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkExport = async (format: 'csv' | 'json') => {
    if (selectedOrders.length === 0) {
      alert('Please select orders first');
      return;
    }

    setBulkActionLoading(true);
    try {
      const response = await fetch('/api/orders/bulk/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderIds: selectedOrders,
          format,
          includeLineItems: true,
        }),
      });

      if (format === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_bulk_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_bulk_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      alert(`Successfully exported ${selectedOrders.length} order(s)`);
    } catch (error) {
      console.error('Error in bulk export:', error);
      alert('Failed to export orders');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkEmail = async (template: string) => {
    if (selectedOrders.length === 0) {
      alert('Please select orders first');
      return;
    }

    if (!confirm(`Send ${template} email to ${selectedOrders.length} order(s)?`)) {
      return;
    }

    setBulkActionLoading(true);
    try {
      const response = await fetch('/api/orders/bulk/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderIds: selectedOrders,
          emailTemplate: template,
          sentBy: 'Admin',
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`${data.message}\n\nNote: ${data.note}`);
        setSelectedOrders([]);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error in bulk email:', error);
      alert('Failed to send emails');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedOrders.length === 0) {
      alert('Please select orders first');
      return;
    }

    const confirmText = prompt(
      `⚠️ WARNING: You are about to delete ${selectedOrders.length} order(s).\n\nThis action CANNOT be undone.\n\nType "DELETE_CONFIRMED" to proceed:`
    );

    if (confirmText !== 'DELETE_CONFIRMED') {
      alert('Deletion cancelled');
      return;
    }

    setBulkActionLoading(true);
    try {
      const response = await fetch('/api/orders/bulk/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderIds: selectedOrders,
          confirmation: 'DELETE_CONFIRMED',
          deletedBy: 'Admin',
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Successfully deleted ${data.deletedCount} order(s)`);
        setSelectedOrders([]);
        fetchOrders();
        if (onRefresh) onRefresh();
      } else {
        alert(`Error: ${data.error}\n${data.message || ''}`);
      }
    } catch (error) {
      console.error('Error in bulk delete:', error);
      alert('Failed to delete orders');
    } finally {
      setBulkActionLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Order Number', 'Date', 'Client', 'Type', 'Status', 'Payment Status', 'Amount', 'Currency', 'Expected Delivery'];
    const csvData = orders.map(o => [
      o.orderNumber,
      new Date(o.orderDate).toLocaleDateString(),
      o.clientName,
      o.orderType,
      o.orderStatus,
      o.paymentStatus,
      o.totalAmount,
      o.currency,
      o.expectedDeliveryDate ? new Date(o.expectedDeliveryDate).toLocaleDateString() : 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading orders...</div>;
  }

  if (orders.length === 0 && !searchTerm && filterStatus === 'all' && filterPaymentStatus === 'all') {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Orders Yet</h3>
          <p className="text-gray-400 mb-4">
            Start by creating your first order or inquiry
          </p>
          <button
            onClick={() => router.push('/admin/orders/new')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            <Package className="w-5 h-5" />
            Create First Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Quick Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-gray-300">Quick Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyQuickFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              quickFilter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => applyQuickFilter('today')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              quickFilter === 'today'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Today
          </button>
          <button
            onClick={() => applyQuickFilter('this-week')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              quickFilter === 'this-week'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            This Week
          </button>
          <button
            onClick={() => applyQuickFilter('overdue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              quickFilter === 'overdue'
                ? 'bg-red-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Overdue
          </button>
          <button
            onClick={() => applyQuickFilter('urgent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              quickFilter === 'urgent'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Urgent
          </button>
          <button
            onClick={() => applyQuickFilter('pending-payment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              quickFilter === 'pending-payment'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pending Payment
          </button>
        </div>
      </div>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-gray-300">Saved Searches</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((search) => (
              <div key={search.id} className="flex items-center gap-1 bg-gray-700 rounded-lg">
                <button
                  onClick={() => applySavedSearch(search.id)}
                  className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
                  title={search.description || search.name}
                >
                  {search.name}
                  {search.usageCount > 0 && (
                    <span className="ml-1.5 text-xs text-gray-500">({search.usageCount})</span>
                  )}
                </button>
                <button
                  onClick={() => deleteSavedSearch(search.id)}
                  className="px-2 py-1.5 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete saved search"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Quoted">Quoted</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={filterPaymentStatus}
            onChange={(e) => setFilterPaymentStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setShowSaveSearchModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Current Search
          </button>
        </div>
      </div>

      {/* Save Search Modal */}
      {showSaveSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Save Search</h3>
            <input
              type="text"
              placeholder="Enter search name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 mb-4"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowSaveSearchModal(false);
                  setSearchName('');
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCurrentSearch}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-white font-medium">
              {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Status Update Dropdown */}
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkStatusUpdate(e.target.value);
                    e.target.value = '';
                  }
                }}
                disabled={bulkActionLoading}
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-50"
              >
                <option value="">Update Status...</option>
                <option value="Inquiry">Inquiry</option>
                <option value="Quoted">Quoted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {/* Email Template Dropdown */}
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkEmail(e.target.value);
                    e.target.value = '';
                  }
                }}
                disabled={bulkActionLoading}
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 disabled:opacity-50"
              >
                <option value="">Send Email...</option>
                <option value="order-confirmation">Order Confirmation</option>
                <option value="shipping-notification">Shipping Notification</option>
                <option value="payment-reminder">Payment Reminder</option>
                <option value="follow-up">Follow-up</option>
              </select>

              {/* Export Buttons */}
              <button
                onClick={() => handleBulkExport('csv')}
                disabled={bulkActionLoading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              <button
                onClick={() => handleBulkExport('json')}
                disabled={bulkActionLoading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>

              {/* Delete Button */}
              <button
                onClick={handleBulkDelete}
                disabled={bulkActionLoading}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>

              {/* Clear Selection */}
              <button
                onClick={() => setSelectedOrders([])}
                disabled={bulkActionLoading}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        {orders.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  <button
                    onClick={toggleSelectAll}
                    className="text-emerald-400 hover:text-emerald-300"
                    title={selectedOrders.length === orders.length ? 'Deselect All' : 'Select All'}
                  >
                    {selectedOrders.length === orders.length ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Payment</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className={`hover:bg-gray-750 ${selectedOrders.includes(order.id) ? 'bg-emerald-900/20' : ''}`}>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleSelectOrder(order.id)}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      {selectedOrders.includes(order.id) ? (
                        <CheckSquare className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{order.orderNumber}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${getPriorityBadge(order.priority)}`}>
                          {order.priority}
                        </span>
                        <span className="text-xs text-gray-400">{order.orderType}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{order.clientName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-white">{new Date(order.orderDate).toLocaleDateString()}</div>
                      {order.expectedDeliveryDate && (
                        <div className="text-xs text-gray-400">
                          Due: {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      {order.currency} {order.totalAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentBadge(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-emerald-400 hover:text-emerald-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/admin/orders/${order.id}/edit`)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
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
      </div>
    </>
  );
}
