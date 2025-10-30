'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info, TrendingDown } from 'lucide-react';

interface Notification {
  id: number;
  type: 'payment_received' | 'payment_due' | 'overdue' | 'low_balance' | 'large_expense' | 'monthly_summary';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function NotificationsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadNotifications();
    }
  }, [router]);

  const loadNotifications = () => {
    // Sample notifications - in production, fetch from API
    const sampleNotifications: Notification[] = [
      {
        id: 1,
        type: 'payment_received',
        title: 'Payment Received',
        message: 'Payment of ₹50,000 received from Client ABC',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'medium',
      },
      {
        id: 2,
        type: 'payment_due',
        title: 'Payment Due Reminder',
        message: 'Invoice #INV-2025-001 payment due in 3 days',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false,
        priority: 'medium',
      },
      {
        id: 3,
        type: 'overdue',
        title: 'Overdue Payment Alert',
        message: 'Invoice #INV-2025-002 is overdue by 5 days',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
        priority: 'high',
      },
      {
        id: 4,
        type: 'low_balance',
        title: 'Low Bank Balance Alert',
        message: 'HDFC Current Account balance below ₹50,000',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        read: true,
        priority: 'high',
      },
      {
        id: 5,
        type: 'large_expense',
        title: 'Large Expense Alert',
        message: 'Expense of ₹1,50,000 recorded - Vendor Payment',
        timestamp: new Date(Date.now() - 345600000).toISOString(),
        read: true,
        priority: 'medium',
      },
      {
        id: 6,
        type: 'monthly_summary',
        title: 'Monthly Financial Summary',
        message: 'Your financial summary for January 2025 is ready',
        timestamp: new Date(Date.now() - 432000000).toISOString(),
        read: true,
        priority: 'low',
      },
    ];

    setNotifications(sampleNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment_received':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'payment_due':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'low_balance':
        return <TrendingDown className="w-5 h-5 text-amber-500" />;
      case 'large_expense':
        return <AlertCircle className="w-5 h-5 text-purple-500" />;
      case 'monthly_summary':
        return <Bell className="w-5 h-5 text-cyan-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-amber-500';
      case 'low':
        return 'border-l-4 border-blue-500';
      default:
        return 'border-l-4 border-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/payments')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Bell className="w-7 h-7" />
                Notifications
              </h1>
              <p className="text-gray-400">Payment and financial alerts</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Total Notifications</div>
            <div className="text-2xl font-bold text-white">{notifications.length}</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Unread</div>
            <div className="text-2xl font-bold text-emerald-400">{unreadCount}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No notifications to display</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-750 transition-colors cursor-pointer ${
                  getPriorityColor(notification.priority)
                } ${!notification.read ? 'bg-gray-800/80' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-semibold mb-1">Notification System</p>
              <p className="text-blue-400">
                This is a notification log showing payment and financial alerts. In production, 
                these notifications would be sent via email and displayed in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
