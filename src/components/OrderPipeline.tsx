'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Eye, AlertCircle, Package, Truck, CheckCircle, 
  FileText, DollarSign, Calendar, Flag, ChevronRight 
} from 'lucide-react';

interface Order {
  id: number;
  orderNumber: string;
  orderStatus: string;
  clientId: number;
  clientName?: string;
  totalAmount: number;
  currency: string;
  expectedDeliveryDate: string | null;
  priority: string | null;
  orderDate: string;
}

interface OrderPipelineProps {
  onRefresh?: () => void;
}

const STATUSES = [
  { key: 'Inquiry', label: 'Inquiry', icon: AlertCircle, color: 'bg-gray-500' },
  { key: 'Quoted', label: 'Quoted', icon: FileText, color: 'bg-blue-500' },
  { key: 'Confirmed', label: 'Confirmed', icon: CheckCircle, color: 'bg-green-500' },
  { key: 'Processing', label: 'Processing', icon: Package, color: 'bg-yellow-500' },
  { key: 'Shipped', label: 'Shipped', icon: Truck, color: 'bg-purple-500' },
  { key: 'Delivered', label: 'Delivered', icon: CheckCircle, color: 'bg-emerald-500' },
];

export default function OrderPipeline({ onRefresh }: OrderPipelineProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedOrder, setDraggedOrder] = useState<Order | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.orderStatus === status);
  };

  const handleDragStart = (e: React.DragEvent, order: Order) => {
    setDraggedOrder(order);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedOrder || draggedOrder.orderStatus === newStatus) {
      setDraggedOrder(null);
      return;
    }

    // Optimistically update UI
    const updatedOrders = orders.map(order =>
      order.id === draggedOrder.id
        ? { ...order, orderStatus: newStatus }
        : order
    );
    setOrders(updatedOrders);

    // Update on server
    try {
      const response = await fetch(`/api/orders/${draggedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });

      if (!response.ok) {
        // Revert on error
        setOrders(orders);
        alert('Failed to update order status');
      } else {
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setOrders(orders);
      alert('Failed to update order status');
    }

    setDraggedOrder(null);
  };

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string | null) => {
    switch (priority) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading pipeline...</div>;
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {STATUSES.map((status) => {
          const statusOrders = getOrdersByStatus(status.key);
          const Icon = status.icon;
          const isDragOver = dragOverColumn === status.key;

          return (
            <div
              key={status.key}
              className="flex-shrink-0 w-80"
              onDragOver={(e) => handleDragOver(e, status.key)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status.key)}
            >
              {/* Column Header */}
              <div className={`bg-gray-800 border border-gray-700 rounded-t-xl p-4 ${
                isDragOver ? 'ring-2 ring-emerald-500' : ''
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-gray-400" />
                    <h3 className="font-semibold text-white">{status.label}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color} text-white`}>
                    {statusOrders.length}
                  </span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${status.color}`} style={{ width: '100%' }} />
                </div>
              </div>

              {/* Column Content */}
              <div className={`bg-gray-800/50 border-x border-b border-gray-700 rounded-b-xl p-3 min-h-[500px] space-y-3 ${
                isDragOver ? 'bg-emerald-500/10 ring-2 ring-emerald-500' : ''
              }`}>
                {statusOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No orders
                  </div>
                ) : (
                  statusOrders.map((order) => (
                    <div
                      key={order.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, order)}
                      className={`bg-gray-800 border border-gray-700 rounded-lg p-4 cursor-move hover:border-emerald-500 transition-all ${
                        draggedOrder?.id === order.id ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Order Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-medium text-sm">
                              {order.orderNumber}
                            </h4>
                            {order.priority && (
                              <span className={`text-xs ${getPriorityColor(order.priority)}`} title={`${order.priority} Priority`}>
                                {getPriorityIcon(order.priority)}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-xs">{order.clientName || `Client #${order.clientId}`}</p>
                        </div>
                      </div>

                      {/* Order Amount */}
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-700">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-white font-semibold">
                          {order.currency} {order.totalAmount.toLocaleString()}
                        </span>
                      </div>

                      {/* Expected Delivery */}
                      {order.expectedDeliveryDate && (
                        <div className="flex items-center gap-2 mb-3 text-xs">
                          <Calendar className="w-3 h-3 text-blue-400" />
                          <span className="text-gray-400">
                            {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {/* Quick View Button */}
                      <button
                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Quick View
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Drag Instructions */}
      {draggedOrder && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-emerald-500 rounded-lg px-4 py-2 shadow-lg">
          <p className="text-emerald-400 text-sm flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            Drag to a column to change status
          </p>
        </div>
      )}
    </div>
  );
}
