'use client';

import { useState, useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  DollarSign, 
  Package,
  TrendingUp,
  Users,
  RefreshCw
} from 'lucide-react';

interface AlertData {
  deliveryApproaching: number;
  overdueOrders: number;
  documentsPending: number;
  pendingPayments: number;
}

export default function DashboardAlerts() {
  const [alerts, setAlerts] = useState<AlertData>({
    deliveryApproaching: 0,
    overdueOrders: 0,
    documentsPending: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      // Fetch all alert types in parallel
      const [deliveryRes, overdueRes, documentsRes] = await Promise.all([
        fetch('/api/orders/alerts/delivery-approaching?days=7'),
        fetch('/api/orders/alerts/overdue'),
        fetch('/api/orders/alerts/documents-pending'),
      ]);

      const [deliveryData, overdueData, documentsData] = await Promise.all([
        deliveryRes.json(),
        overdueRes.json(),
        documentsRes.json(),
      ]);

      const newAlerts = {
        deliveryApproaching: deliveryData.count || 0,
        overdueOrders: overdueData.count || 0,
        documentsPending: documentsData.count || 0,
        pendingPayments: 0, // This would come from a payment status query
      };

      setAlerts(newAlerts);

      // Show notifications for critical alerts
      if (newAlerts.overdueOrders > 0) {
        addNotification({
          type: 'warning',
          title: 'Overdue Orders',
          message: `You have ${newAlerts.overdueOrders} overdue order(s) that need attention.`,
          actionUrl: '/admin/orders?filter=overdue',
          actionLabel: 'View Orders',
        });
      }

      if (newAlerts.documentsPending > 0) {
        addNotification({
          type: 'info',
          title: 'Documents Pending',
          message: `${newAlerts.documentsPending} order(s) have missing documents.`,
          actionUrl: '/admin/orders?filter=documents-pending',
          actionLabel: 'View Orders',
        });
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Refresh alerts every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const alertCards = [
    {
      title: 'Delivery Approaching',
      count: alerts.deliveryApproaching,
      icon: Clock,
      color: 'blue',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700',
      iconColor: 'text-blue-400',
      description: 'Orders due within 7 days',
      link: '/admin/orders?filter=delivery-approaching',
    },
    {
      title: 'Overdue Orders',
      count: alerts.overdueOrders,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700',
      iconColor: 'text-red-400',
      description: 'Past expected delivery date',
      link: '/admin/orders?filter=overdue',
    },
    {
      title: 'Documents Pending',
      count: alerts.documentsPending,
      icon: FileText,
      color: 'yellow',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-700',
      iconColor: 'text-yellow-400',
      description: 'Missing required documents',
      link: '/admin/orders?filter=documents-pending',
    },
    {
      title: 'Pending Payments',
      count: alerts.pendingPayments,
      icon: DollarSign,
      color: 'orange',
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-700',
      iconColor: 'text-orange-400',
      description: 'Awaiting payment',
      link: '/admin/orders?filter=pending-payment',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard Alerts</h2>
          <p className="text-gray-400 text-sm mt-1">Real-time order status monitoring</p>
        </div>
        <button
          onClick={fetchAlerts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alertCards.map((alert) => {
          const Icon = alert.icon;
          return (
            <a
              key={alert.title}
              href={alert.link}
              className={`${alert.bgColor} border ${alert.borderColor} rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${alert.bgColor}`}>
                  <Icon className={`w-6 h-6 ${alert.iconColor}`} />
                </div>
                {alert.count > 0 && (
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${alert.iconColor} ${alert.bgColor}`}>
                    {alert.count}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{alert.title}</h3>
              <p className="text-gray-400 text-sm">{alert.description}</p>
              {alert.count > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className={`text-sm font-medium ${alert.iconColor}`}>
                    {alert.count} {alert.count === 1 ? 'order' : 'orders'} →
                  </span>
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-400 text-sm">Active Orders</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {loading ? '...' : alerts.deliveryApproaching + alerts.overdueOrders}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-400 text-sm">Completion Rate</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {loading ? '...' : '--'}
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-400 text-sm">Active Clients</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {loading ? '...' : '--'}
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {(alerts.overdueOrders > 0 || alerts.documentsPending > 5) && (
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Action Required</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {alerts.overdueOrders > 0 && (
                  <li>
                    • <strong>{alerts.overdueOrders}</strong> order(s) are overdue and need immediate attention
                  </li>
                )}
                {alerts.documentsPending > 5 && (
                  <li>
                    • <strong>{alerts.documentsPending}</strong> order(s) have missing documents
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
