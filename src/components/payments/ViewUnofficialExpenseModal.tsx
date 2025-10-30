'use client';

import { useState } from 'react';
import { X, Lock, Edit, Trash2, AlertTriangle, Eye } from 'lucide-react';

interface ViewUnofficialExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: any;
  password: string;
  onSuccess: () => void;
}

export default function ViewUnofficialExpenseModal({ 
  isOpen, 
  onClose, 
  expense,
  password,
  onSuccess 
}: ViewUnofficialExpenseModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    expenseDate: '',
    category: '',
    amount: '',
    currency: '',
    paymentMethod: '',
    purpose: '',
    recipientCode: '',
    location: '',
    relatedOrderId: '',
    relatedShipment: '',
    notes: '',
  });

  useState(() => {
    if (expense && isOpen) {
      setFormData({
        expenseDate: expense.expenseDate?.split('T')[0] || '',
        category: expense.category || '',
        amount: expense.amount?.toString() || '',
        currency: expense.currency || 'INR',
        paymentMethod: expense.paymentMethod || 'Cash',
        purpose: expense.purpose || '',
        recipientCode: expense.recipientCode || '',
        location: expense.location || '',
        relatedOrderId: expense.relatedOrderId?.toString() || '',
        relatedShipment: expense.relatedShipment || '',
        notes: expense.notes || '',
      });
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        amountInInr: formData.currency === 'INR' 
          ? parseFloat(formData.amount) 
          : parseFloat(formData.amount) * 83,
        relatedOrderId: formData.relatedOrderId ? parseInt(formData.relatedOrderId) : null,
        password,
      };

      const res = await fetch(`/api/payments/unofficial/${expense.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
        setIsEditing(false);
      } else {
        alert('Failed to update expense');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deletePassword !== password) {
      alert('Incorrect password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/payments/unofficial/${expense.id}?password=${encodeURIComponent(password)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        alert('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!isOpen || !expense) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-amber-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-700 bg-amber-900/20">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-xl font-bold text-white">Unofficial Expense Details</h2>
              <p className="text-xs text-amber-400">Code: {expense.expenseCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isEditing ? (
            /* View Mode */
            <div className="space-y-4">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Date</div>
                  <div className="text-white font-medium">{formatDate(expense.expenseDate)}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Category</div>
                  <div className="text-white font-medium">{expense.category}</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Amount</div>
                  <div className="text-amber-400 font-bold text-lg">
                    {formatCurrency(expense.amountInInr)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {expense.amount} {expense.currency}
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Payment Method</div>
                  <div className="text-white font-medium">{expense.paymentMethod}</div>
                </div>
              </div>

              {/* Encrypted Fields */}
              <div className="bg-gray-700/50 border border-amber-700/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-2">
                  <Lock className="w-4 h-4" />
                  Decrypted Information
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-1">Purpose</div>
                  <div className="text-white bg-gray-800 p-3 rounded">{expense.purpose}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-1">Recipient Code Name</div>
                  <div className="text-white bg-gray-800 p-3 rounded font-mono">{expense.recipientCode}</div>
                </div>

                {expense.location && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Location</div>
                    <div className="text-white bg-gray-800 p-3 rounded">{expense.location}</div>
                  </div>
                )}

                {expense.notes && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Additional Notes</div>
                    <div className="text-white bg-gray-800 p-3 rounded">{expense.notes}</div>
                  </div>
                )}
              </div>

              {/* Related Info */}
              {(expense.relatedOrderId || expense.relatedShipment) && (
                <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="text-sm text-gray-400 font-semibold mb-2">Related Information</div>
                  {expense.relatedOrderId && (
                    <div>
                      <span className="text-xs text-gray-400">Order ID: </span>
                      <span className="text-white">{expense.relatedOrderId}</span>
                    </div>
                  )}
                  {expense.relatedShipment && (
                    <div>
                      <span className="text-xs text-gray-400">Shipment: </span>
                      <span className="text-white">{expense.relatedShipment}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="bg-gray-700/30 rounded-lg p-3 text-xs text-gray-400 space-y-1">
                <div>Created: {formatDate(expense.createdAt)}</div>
                <div>Last Accessed: {formatDate(expense.lastAccessed)}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.expenseDate}
                    onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Customs">Customs</option>
                    <option value="Police">Police</option>
                    <option value="Government Official">Government Official</option>
                    <option value="Inspector">Inspector</option>
                    <option value="License">License</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  Purpose <Lock className="w-3 h-3 text-amber-500" />
                </label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  rows={3}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  Recipient Code <Lock className="w-3 h-3 text-amber-500" />
                </label>
                <input
                  type="text"
                  value={formData.recipientCode}
                  onChange={(e) => setFormData({ ...formData, recipientCode: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  Location <Lock className="w-3 h-3 text-amber-500" />
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  Notes <Lock className="w-3 h-3 text-amber-500" />
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-4">
            <div className="bg-gray-800 border-2 border-red-600 rounded-lg p-6 max-w-md">
              <div className="text-center mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Confirm Deletion</h3>
                <p className="text-sm text-gray-400 mb-4">
                  This action cannot be undone. Enter your password to confirm deletion.
                </p>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none mb-4"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletePassword('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading || !deletePassword}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
