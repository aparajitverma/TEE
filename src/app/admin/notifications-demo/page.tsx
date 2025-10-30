'use client';

import { useNotifications } from '@/contexts/NotificationContext';
import { Bell, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export default function NotificationsDemoPage() {
  const { showToast, addNotification } = useNotifications();

  const demoNotifications = [
    {
      type: 'success' as const,
      title: 'Order Confirmed',
      message: 'Order #ORD-2024-001 has been successfully confirmed.',
    },
    {
      type: 'error' as const,
      title: 'Payment Failed',
      message: 'Payment processing failed for Order #ORD-2024-002.',
    },
    {
      type: 'warning' as const,
      title: 'Delivery Delayed',
      message: 'Order #ORD-2024-003 delivery may be delayed by 2 days.',
    },
    {
      type: 'info' as const,
      title: 'New Inquiry',
      message: 'You have received a new inquiry from ABC Corp.',
    },
  ];

  const sendToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const notif = demoNotifications.find((n) => n.type === type);
    if (notif) {
      showToast(notif.type, notif.title, notif.message);
    }
  };

  const sendPersistentNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    const notif = demoNotifications.find((n) => n.type === type);
    if (notif) {
      addNotification({
        type: notif.type,
        title: notif.title,
        message: notif.message,
        actionUrl: '/admin/orders',
        actionLabel: 'View Order',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Notification System Demo</h1>
              <p className="text-gray-400 mt-1">
                Test the in-app notification system with toast and persistent notifications
              </p>
            </div>
          </div>

          {/* Toast Notifications Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Toast Notifications</h2>
            <p className="text-gray-400 text-sm mb-4">
              Toast notifications appear briefly and auto-dismiss after 5 seconds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => sendToast('success')}
                className="flex items-center gap-3 bg-green-900/20 border border-green-700 hover:bg-green-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <div className="font-medium">Success Toast</div>
                  <div className="text-sm text-gray-400">Show success message</div>
                </div>
              </button>

              <button
                onClick={() => sendToast('error')}
                className="flex items-center gap-3 bg-red-900/20 border border-red-700 hover:bg-red-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="font-medium">Error Toast</div>
                  <div className="text-sm text-gray-400">Show error message</div>
                </div>
              </button>

              <button
                onClick={() => sendToast('warning')}
                className="flex items-center gap-3 bg-yellow-900/20 border border-yellow-700 hover:bg-yellow-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div className="text-left">
                  <div className="font-medium">Warning Toast</div>
                  <div className="text-sm text-gray-400">Show warning message</div>
                </div>
              </button>

              <button
                onClick={() => sendToast('info')}
                className="flex items-center gap-3 bg-blue-900/20 border border-blue-700 hover:bg-blue-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <Info className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium">Info Toast</div>
                  <div className="text-sm text-gray-400">Show info message</div>
                </div>
              </button>
            </div>
          </div>

          {/* Persistent Notifications Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Persistent Notifications</h2>
            <p className="text-gray-400 text-sm mb-4">
              Persistent notifications appear in the notification center (bell icon) and remain until
              dismissed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => sendPersistentNotification('success')}
                className="flex items-center gap-3 bg-green-900/20 border border-green-700 hover:bg-green-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <div className="font-medium">Success Notification</div>
                  <div className="text-sm text-gray-400">Add to notification center</div>
                </div>
              </button>

              <button
                onClick={() => sendPersistentNotification('error')}
                className="flex items-center gap-3 bg-red-900/20 border border-red-700 hover:bg-red-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="font-medium">Error Notification</div>
                  <div className="text-sm text-gray-400">Add to notification center</div>
                </div>
              </button>

              <button
                onClick={() => sendPersistentNotification('warning')}
                className="flex items-center gap-3 bg-yellow-900/20 border border-yellow-700 hover:bg-yellow-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div className="text-left">
                  <div className="font-medium">Warning Notification</div>
                  <div className="text-sm text-gray-400">Add to notification center</div>
                </div>
              </button>

              <button
                onClick={() => sendPersistentNotification('info')}
                className="flex items-center gap-3 bg-blue-900/20 border border-blue-700 hover:bg-blue-900/30 text-white p-4 rounded-lg transition-colors"
              >
                <Info className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium">Info Notification</div>
                  <div className="text-sm text-gray-400">Add to notification center</div>
                </div>
              </button>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">How to Use</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <strong className="text-emerald-400">Toast Notifications:</strong>
                <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto">
{`import { useNotifications } from '@/contexts/NotificationContext';

const { showToast } = useNotifications();

// Show a toast
showToast('success', 'Title', 'Message');`}
                </pre>
              </div>
              <div>
                <strong className="text-emerald-400">Persistent Notifications:</strong>
                <pre className="bg-gray-800 p-3 rounded mt-2 overflow-x-auto">
{`import { useNotifications } from '@/contexts/NotificationContext';

const { addNotification } = useNotifications();

// Add a notification
addNotification({
  type: 'info',
  title: 'New Order',
  message: 'Order #123 received',
  actionUrl: '/admin/orders/123',
  actionLabel: 'View Order'
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
