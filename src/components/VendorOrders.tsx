'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Calendar,
  Package,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Plus,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

interface VendorOrder {
  id: number;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  paymentStatus: string;
  clientName: string;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  currency: string;
  vendorTotal: number;
  vendorCost: number;
  totalQuantity: number;
  itemCount: number;
  products: Array<{
    productName: string;
    productCode: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
    vendorCost?: number;
  }>;
}

interface VendorOrdersProps {
  vendorId: number;
  vendorName: string;
}

export default function VendorOrders({ vendorId, vendorName }: VendorOrdersProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}/orders`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [vendorId]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Inquiry: 'bg-blue-900/20 text-blue-400 border-blue-700',
      Quoted: 'bg-purple-900/20 text-purple-400 border-purple-700',
      Confirmed: 'bg-green-900/20 text-green-400 border-green-700',
      Processing: 'bg-yellow-900/20 text-yellow-400 border-yellow-700',
      Shipped: 'bg-cyan-900/20 text-cyan-400 border-cyan-700',
      Delivered: 'bg-emerald-900/20 text-emerald-400 border-emerald-700',
      Cancelled: 'bg-red-900/20 text-red-400 border-red-700',
    };
    return colors[status] || 'bg-gray-900/20 text-gray-400 border-gray-700';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Paid: 'text-green-400',
      Partial: 'text-yellow-400',
      Pending: 'text-orange-400',
      Overdue: 'text-red-400',
    };
    return colors[status] || 'text-gray-400';
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'Partial':
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Overdue':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'active')
      return ['Confirmed', 'Processing', 'Shipped'].includes(order.orderStatus);
    if (filter === 'delivered') return order.orderStatus === 'Delivered';
    if (filter === 'pending-payment')
      return ['Pending', 'Partial', 'Overdue'].includes(order.paymentStatus);
    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Orders from {vendorName}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {summary?.totalOrders || 0} total orders
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => router.push('/admin/orders/new')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Total Orders</span>
            </div>
            <div className="text-2xl font-bold text-white">{summary.totalOrders}</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Total Value</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${summary.totalValue.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Avg Order Value</span>
            </div>
            <div className="text-2xl font-bold text-white">
              ${Math.round(summary.averageOrderValue).toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400 text-sm">Active Orders</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {summary.ordersByStatus.confirmed +
                summary.ordersByStatus.processing +
                summary.ordersByStatus.shipped}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'active'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('delivered')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'delivered'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Delivered
        </button>
        <button
          onClick={() => setFilter('pending-payment')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'pending-payment'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Pending Payment
        </button>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Orders Found</h3>
          <p className="text-gray-400 mb-6">
            {filter === 'all'
              ? 'No orders from this vendor yet.'
              : 'No orders match the selected filter.'}
          </p>
          <button
            onClick={() => router.push('/admin/orders/new')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create First Order
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Order Number
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Order Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Client
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                    Products
                  </th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-4 text-gray-400 text-sm font-medium">
                    Amount
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 text-sm font-medium">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 text-sm font-medium">
                    Payment
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-750 transition-colors">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                        className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                      >
                        {order.orderNumber}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{order.clientName}</td>
                    <td className="py-3 px-4">
                      <div className="text-gray-300">
                        {order.itemCount} {order.itemCount === 1 ? 'product' : 'products'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.products.slice(0, 2).map((p) => p.productName).join(', ')}
                        {order.products.length > 2 && ` +${order.products.length - 2} more`}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-300">
                      {order.totalQuantity.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="text-emerald-400 font-medium">
                        {order.currency} {order.vendorTotal.toLocaleString()}
                      </div>
                      {order.vendorCost > 0 && (
                        <div className="text-xs text-gray-500">
                          Cost: {order.currency} {order.vendorCost.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className={`flex items-center justify-center gap-1 ${getPaymentStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {getPaymentStatusIcon(order.paymentStatus)}
                        <span className="text-sm font-medium">{order.paymentStatus}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => router.push(`/admin/orders/${order.id}`)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="View Order"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
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
