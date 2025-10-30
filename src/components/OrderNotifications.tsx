'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface OrderNotificationsProps {
  orderId: number;
  orderNumber: string;
  clientEmail: string;
  orderStatus: string;
}

export default function OrderNotifications({
  orderId,
  orderNumber,
  clientEmail,
  orderStatus,
}: OrderNotificationsProps) {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sendNotification = async (notificationType: string) => {
    if (!clientEmail) {
      setMessage({ type: 'error', text: 'No client email address available' });
      return;
    }

    setSending(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/orders/${orderId}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationType }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send notification' });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      setMessage({ type: 'error', text: 'Failed to send notification' });
    } finally {
      setSending(false);
    }
  };

  const notifications = [
    {
      type: 'new-inquiry',
      label: 'New Inquiry Received',
      description: 'Acknowledge receipt of inquiry',
      icon: Mail,
      color: 'blue',
      availableFor: ['Inquiry'],
    },
    {
      type: 'quote-sent',
      label: 'Quote Sent',
      description: 'Send quote to client',
      icon: Send,
      color: 'purple',
      availableFor: ['Inquiry', 'Quoted'],
    },
    {
      type: 'order-confirmed',
      label: 'Order Confirmed',
      description: 'Confirm order receipt',
      icon: CheckCircle,
      color: 'green',
      availableFor: ['Confirmed', 'Processing'],
    },
    {
      type: 'payment-received',
      label: 'Payment Received',
      description: 'Acknowledge payment',
      icon: CheckCircle,
      color: 'green',
      availableFor: ['Confirmed', 'Processing', 'Shipped'],
    },
    {
      type: 'order-shipped',
      label: 'Order Shipped',
      description: 'Notify shipment with tracking',
      icon: Send,
      color: 'blue',
      availableFor: ['Shipped'],
    },
    {
      type: 'order-delivered',
      label: 'Order Delivered',
      description: 'Confirm delivery',
      icon: CheckCircle,
      color: 'green',
      availableFor: ['Delivered'],
    },
    {
      type: 'follow-up',
      label: 'Follow-up Reminder',
      description: 'Send follow-up message',
      icon: Mail,
      color: 'gray',
      availableFor: ['Inquiry', 'Quoted', 'Confirmed', 'Processing', 'Shipped', 'Delivered'],
    },
    {
      type: 'payment-reminder',
      label: 'Payment Reminder',
      description: 'Remind about pending payment',
      icon: AlertCircle,
      color: 'yellow',
      availableFor: ['Inquiry', 'Quoted', 'Confirmed', 'Processing'],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      yellow: 'bg-yellow-600 hover:bg-yellow-700',
      gray: 'bg-gray-600 hover:bg-gray-700',
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
      </div>

      {!clientEmail && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">
            No client email address available. Please add an email address to send notifications.
          </p>
        </div>
      )}

      {message && (
        <div
          className={`border rounded-lg p-4 mb-4 ${
            message.type === 'success'
              ? 'bg-green-900/20 border-green-700'
              : 'bg-red-900/20 border-red-700'
          }`}
        >
          <p
            className={`text-sm ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {notifications
          .filter((notif) => notif.availableFor.includes(orderStatus))
          .map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.type}
                className="flex items-center justify-between bg-gray-900 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(notif.color)}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{notif.label}</div>
                    <div className="text-gray-400 text-sm">{notif.description}</div>
                  </div>
                </div>
                <button
                  onClick={() => sendNotification(notif.type)}
                  disabled={sending || !clientEmail}
                  className={`px-4 py-2 ${getColorClasses(
                    notif.color
                  )} text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
            );
          })}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>
          <strong>Note:</strong> Email notifications are currently logged but not sent to actual
          email addresses. Integrate with an email service provider (SendGrid, AWS SES, etc.) to
          enable actual email delivery.
        </p>
      </div>
    </div>
  );
}
