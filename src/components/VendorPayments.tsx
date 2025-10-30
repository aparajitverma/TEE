'use client';

import { useState, useEffect } from 'react';
import {
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  RefreshCw,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  TrendingDown,
} from 'lucide-react';

interface VendorPayment {
  id: number;
  paymentDate: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  referenceNumber?: string;
  invoiceNumber?: string;
  orderNumber?: string;
  notes?: string;
  balanceAfter: number;
  paymentStatus: string;
  recordedBy: string;
}

interface VendorPaymentsProps {
  vendorId: number;
  vendorName: string;
}

export default function VendorPayments({ vendorId, vendorName }: VendorPaymentsProps) {
  const [payments, setPayments] = useState<VendorPayment[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    amount: '',
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    referenceNumber: '',
    invoiceNumber: '',
    orderNumber: '',
    notes: '',
    recordedBy: 'Admin',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}/payments`);
      const data = await response.json();

      if (data.success) {
        setPayments(data.payments);
        setSummary(data.summary);
        setVendor(data.vendor);
      }
    } catch (error) {
      console.error('Error fetching vendor payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [vendorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/vendors/${vendorId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddForm(false);
        setFormData({
          paymentDate: new Date().toISOString().split('T')[0],
          amount: '',
          currency: 'USD',
          paymentMethod: 'Bank Transfer',
          referenceNumber: '',
          invoiceNumber: '',
          orderNumber: '',
          notes: '',
          recordedBy: 'Admin',
        });
        fetchPayments();
      } else {
        alert(data.error || 'Failed to add payment');
      }
    } catch (error) {
      console.error('Error adding payment:', error);
      alert('Failed to add payment');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Completed: 'text-green-400',
      Pending: 'text-yellow-400',
      Failed: 'text-red-400',
      Cancelled: 'text-gray-400',
    };
    return colors[status] || 'text-gray-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Failed':
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Payment History - {vendorName}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {summary?.totalPayments || 0} total payments
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchPayments}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && vendor && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Total Paid</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${summary.totalPaid.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-gray-400 text-sm">Outstanding</span>
            </div>
            <div className="text-2xl font-bold text-red-400">
              ${vendor.outstandingAmount.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Total Payments</span>
            </div>
            <div className="text-2xl font-bold text-white">{summary.totalPayments}</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Last Payment</span>
            </div>
            <div className="text-sm font-medium text-white">
              {summary.lastPaymentDate
                ? new Date(summary.lastPaymentDate).toLocaleDateString()
                : 'N/A'}
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Form */}
      {showAddForm && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Add New Payment</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Date *
                </label>
                <input
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Method *
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={formData.referenceNumber}
                  onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="TXN123456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="INV-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="ORD-2024-001"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Payment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payments Table */}
      {payments.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Payments Found</h3>
          <p className="text-gray-400 mb-6">No payment history for this vendor yet.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Payment
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Payment Date
                  </th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Payment Method
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Reference
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Invoice
                  </th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                    Balance After
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 text-sm font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-750 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-emerald-400 font-medium">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        {payment.paymentMethod}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {payment.referenceNumber || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-300">
                        {payment.invoiceNumber || '-'}
                        {payment.orderNumber && (
                          <div className="text-xs text-gray-500 mt-1">
                            Order: {payment.orderNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-gray-300 font-medium">
                        ${payment.balanceAfter.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className={`flex items-center justify-center gap-1 ${getStatusColor(
                          payment.paymentStatus
                        )}`}
                      >
                        {getStatusIcon(payment.paymentStatus)}
                        <span className="text-sm font-medium">{payment.paymentStatus}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
