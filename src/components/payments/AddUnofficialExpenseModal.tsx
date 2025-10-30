'use client';

import { useState } from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';

interface AddUnofficialExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  password: string;
}

export default function AddUnofficialExpenseModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  password 
}: AddUnofficialExpenseModalProps) {
  const [formData, setFormData] = useState({
    expenseDate: new Date().toISOString().split('T')[0],
    category: 'Customs',
    amount: '',
    currency: 'INR',
    paymentMethod: 'Cash',
    purpose: '',
    recipientCode: '',
    location: '',
    relatedOrderId: '',
    relatedShipment: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmAndSave = async () => {
    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        amountInInr: formData.currency === 'INR' 
          ? parseFloat(formData.amount) 
          : parseFloat(formData.amount) * 83, // Simple conversion, adjust as needed
        relatedOrderId: formData.relatedOrderId ? parseInt(formData.relatedOrderId) : null,
        password,
      };

      const res = await fetch('/api/payments/unofficial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
        onClose();
        resetForm();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to save unofficial expense'}`);
      }
    } catch (error) {
      console.error('Error saving unofficial expense:', error);
      alert('Failed to save unofficial expense');
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  const resetForm = () => {
    setFormData({
      expenseDate: new Date().toISOString().split('T')[0],
      category: 'Customs',
      amount: '',
      currency: 'INR',
      paymentMethod: 'Cash',
      purpose: '',
      recipientCode: '',
      location: '',
      relatedOrderId: '',
      relatedShipment: '',
      notes: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-amber-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-700 bg-amber-900/20">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-xl font-bold text-white">Record Unofficial Expense</h2>
              <p className="text-xs text-amber-400">🔒 Encrypted & Secure</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Warning */}
        <div className="p-4 bg-amber-900/30 border-b border-amber-700">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-300">
              <p className="font-semibold mb-1">Security Notice:</p>
              <p>All sensitive fields will be encrypted before storage. Access is logged.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Expense Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Expense Date *
            </label>
            <input
              type="date"
              value={formData.expenseDate}
              onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              required
            >
              <option value="Customs">Customs</option>
              <option value="Police">Police</option>
              <option value="Government Official">Government Official</option>
              <option value="Inspector">Inspector</option>
              <option value="License">License</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Amount *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Currency *
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                required
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Method *
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Purpose (Encrypted) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              Purpose * <Lock className="w-3 h-3 text-amber-500" />
            </label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              rows={3}
              placeholder="Why was this payment made? (Will be encrypted)"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Recipient Code (Encrypted) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              Recipient Code Name * <Lock className="w-3 h-3 text-amber-500" />
            </label>
            <input
              type="text"
              value={formData.recipientCode}
              onChange={(e) => setFormData({ ...formData, recipientCode: e.target.value })}
              placeholder="Code name for recipient (Will be encrypted)"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Use a code name, not real name</p>
          </div>

          {/* Location (Encrypted) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              Location <Lock className="w-3 h-3 text-amber-500" />
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Where payment was made (Will be encrypted)"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Related Order (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Related Order ID (Optional)
            </label>
            <input
              type="number"
              value={formData.relatedOrderId}
              onChange={(e) => setFormData({ ...formData, relatedOrderId: e.target.value })}
              placeholder="Link to specific order"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Related Shipment (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Related Shipment (Optional)
            </label>
            <input
              type="text"
              value={formData.relatedShipment}
              onChange={(e) => setFormData({ ...formData, relatedShipment: e.target.value })}
              placeholder="Shipment reference or tracking number"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Notes (Encrypted) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              Additional Notes <Lock className="w-3 h-3 text-amber-500" />
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              placeholder="Any additional information (Will be encrypted)"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Securely'}
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-gray-800 border-2 border-amber-600 rounded-lg p-6 max-w-md">
              <div className="text-center mb-4">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Confirm Save</h3>
                <p className="text-sm text-gray-400">
                  Are you sure you want to save this unofficial expense? This action will be logged.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAndSave}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
