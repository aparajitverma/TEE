'use client';

import { useState } from 'react';
import { Check, Mail, Tag, Trash2, UserCheck, X } from 'lucide-react';

interface ClientBulkActionsProps {
  selectedIds: number[];
  onComplete: () => void;
  onCancel: () => void;
}

export default function ClientBulkActions({ selectedIds, onComplete, onCancel }: ClientBulkActionsProps) {
  const [operation, setOperation] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Bulk status update
  const [newStatus, setNewStatus] = useState('Active');

  // Bulk assignment
  const [assignTo, setAssignTo] = useState('');

  // Bulk tags
  const [newTags, setNewTags] = useState('');

  // Bulk email
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const handleBulkOperation = async (op: string) => {
    setLoading(true);
    try {
      let data: any = {};

      switch (op) {
        case 'update-status':
          data = { status: newStatus };
          break;
        case 'update-assignment':
          data = { assignedTo: assignTo };
          break;
        case 'add-tags':
          data = { tags: newTags.split(',').map(t => t.trim()) };
          break;
      }

      const response = await fetch('/api/clients/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
        body: JSON.stringify({
          operation: op,
          clientIds: selectedIds,
          data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        onComplete();
      } else {
        alert(result.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Bulk operation error:', error);
      alert('Operation failed');
    }
    setLoading(false);
  };

  const handleBulkEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clients/bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
        body: JSON.stringify({
          clientIds: selectedIds,
          subject: emailSubject,
          message: emailMessage,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setShowEmailModal(false);
        onComplete();
      } else {
        alert(result.error || 'Failed to send emails');
      }
    } catch (error) {
      console.error('Bulk email error:', error);
      alert('Failed to send emails');
    }
    setLoading(false);
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} clients? This cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/clients/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
        body: JSON.stringify({
          operation: 'delete',
          clientIds: selectedIds,
          data: {},
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        onComplete();
      } else {
        alert(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
      alert('Delete failed');
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white">
          <span className="font-bold">{selectedIds.length}</span> clients selected
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <button
          onClick={() => setOperation('status')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Check className="w-4 h-4" />
          Status
        </button>

        <button
          onClick={() => setOperation('assign')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <UserCheck className="w-4 h-4" />
          Assign
        </button>

        <button
          onClick={() => setOperation('tags')}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Tag className="w-4 h-4" />
          Tags
        </button>

        <button
          onClick={() => setShowEmailModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>

        <button
          onClick={handleBulkDelete}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {operation === 'status' && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg">
          <label className="block text-sm font-medium text-gray-300 mb-2">New Status</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg mb-3"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
          <button
            onClick={() => handleBulkOperation('update-status')}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      )}

      {operation === 'assign' && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg">
          <label className="block text-sm font-medium text-gray-300 mb-2">Assign To</label>
          <input
            type="text"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            placeholder="Enter user email"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg mb-3"
          />
          <button
            onClick={() => handleBulkOperation('update-assignment')}
            disabled={loading || !assignTo}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Assigning...' : 'Assign Clients'}
          </button>
        </div>
      )}

      {operation === 'tags' && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg">
          <label className="block text-sm font-medium text-gray-300 mb-2">Add Tags (comma-separated)</label>
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            placeholder="e.g., VIP, High Priority, Follow-up"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg mb-3"
          />
          <button
            onClick={() => handleBulkOperation('add-tags')}
            disabled={loading || !newTags}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Tags'}
          </button>
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Send Bulk Email</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                placeholder="Use {name}, {company}, {email} for personalization"
                rows={8}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg"
              />
            </div>

            <div className="text-xs text-gray-400 mb-4">
              Personalization tokens: {'{name}'}, {'{company}'}, {'{email}'}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBulkEmail}
                disabled={loading || !emailSubject || !emailMessage}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : `Send to ${selectedIds.length} clients`}
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
