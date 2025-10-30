'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastNotifications() {
  const { notifications, removeNotification } = useNotifications();

  // Only show recent unread notifications as toasts
  const toastNotifications = notifications
    .filter((n) => !n.read)
    .slice(0, 3);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {toastNotifications.map((notification) => (
        <ToastItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  notification,
  onClose,
}: {
  notification: any;
  onClose: () => void;
}) {
  useEffect(() => {
    // Auto-dismiss after 5 seconds for success and info
    if (notification.type === 'success' || notification.type === 'info') {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.type, onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-900/90 border-green-700';
      case 'error':
        return 'bg-red-900/90 border-red-700';
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-700';
      case 'info':
        return 'bg-blue-900/90 border-blue-700';
    }
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 ${getBackgroundColor()} border rounded-lg p-4 shadow-lg backdrop-blur-sm min-w-[320px] max-w-md animate-slide-in`}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{notification.title}</p>
        <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
