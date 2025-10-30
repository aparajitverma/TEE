'use client';

import { useState } from 'react';
import {
  CheckSquare,
  Square,
  Trash2,
  Download,
  Mail,
  Power,
  PowerOff,
  MessageSquare,
  X,
  Send,
  AlertTriangle,
} from 'lucide-react';

interface VendorBulkActionsProps {
  selectedVendors: number[];
  onSelectionChange: (ids: number[]) => void;
  onActionComplete: () => void;
  totalVendors: number;
  allVendorIds: number[];
}

export default function VendorBulkActions({
  selectedVendors,
  onSelectionChange,
  onActionComplete,
  totalVendors,
  allVendorIds,
}: VendorBulkActionsProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string>('');
  const [messageForm, setMessageForm] = useState({
    method: 'email',
    subject: '',
    message: '',
  });
  const [processing, setProcessing] = useState(false);

  const isAllSelected = selectedVendors.length === totalVendors && totalVendors > 0;
  const isSomeSelected = selectedVendors.length > 0 && selectedVendors.length < totalVendors;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(allVendorIds);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedVendors.length === 0) {
      alert('Please select vendors first');
      return;
    }

    setProcessing(true);

    try {
      if (action === 'export') {
        // Export selected vendors
        const response = await fetch('/api/vendors/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vendorIds: selectedVendors }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `vendors-export-${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } else {
          alert('Failed to export vendors');
        }
      } else {
        // Other bulk actions
        const response = await fetch('/api/vendors/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            vendorIds: selectedVendors,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message);
          onSelectionChange([]);
          onActionComplete();
        } else {
          alert(data.error || 'Failed to perform action');
        }
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform action');
    } finally {
      setProcessing(false);
      setShowConfirmModal(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageForm.subject || !messageForm.message) {
      alert('Please fill in all fields');
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch('/api/vendors/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorIds: selectedVendors,
          subject: messageForm.subject,
          message: messageForm.message,
          method: messageForm.method,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setShowMessageModal(false);
        setMessageForm({ method: 'email', subject: '', message: '' });
      } else {
        alert(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setProcessing(false);
    }
  };

  const confirmAndExecute = (action: string) => {
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      activate: 'Activate',
      deactivate: 'Deactivate',
      delete: 'Delete',
    };
    return labels[action] || action;
  };

  if (selectedVendors.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Square className="w-5 h-5" />
            <span className="text-sm">Select All</span>
          </button>
          <span className="text-gray-500 text-sm">
            Select vendors to perform bulk actions
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {isAllSelected ? (
                <CheckSquare className="w-5 h-5" />
              ) : isSomeSelected ? (
                <CheckSquare className="w-5 h-5 opacity-50" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                {selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''} selected
              </span>
            </button>
            <button
              onClick={() => onSelectionChange([])}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear Selection
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => confirmAndExecute('activate')}
              disabled={processing}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <Power className="w-4 h-4" />
              Activate
            </button>

            <button
              onClick={() => confirmAndExecute('deactivate')}
              disabled={processing}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <PowerOff className="w-4 h-4" />
              Deactivate
            </button>

            <button
              onClick={() => handleBulkAction('export')}
              disabled={processing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <button
              onClick={() => setShowMessageModal(true)}
              disabled={processing}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <Mail className="w-4 h-4" />
              Message
            </button>

            <button
              onClick={() => confirmAndExecute('delete')}
              disabled={processing}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Confirm {getActionLabel(confirmAction)}
                </h3>
                <p className="text-gray-400">
                  Are you sure you want to {confirmAction} {selectedVendors.length} vendor
                  {selectedVendors.length !== 1 ? 's' : ''}? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={processing}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBulkAction(confirmAction)}
                disabled={processing}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Send Message to {selectedVendors.length} Vendor{selectedVendors.length !== 1 ? 's' : ''}
              </h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Method
                </label>
                <select
                  value={messageForm.method}
                  onChange={(e) => setMessageForm({ ...messageForm, method: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  rows={6}
                  placeholder="Enter your message"
                />
              </div>

              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  <strong>Note:</strong> This is a simulated feature. In production, integrate with email/SMS/WhatsApp services.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowMessageModal(false)}
                disabled={processing}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={processing}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {processing ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
