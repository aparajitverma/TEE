'use client';

import { useState } from 'react';
import { X, Building2 } from 'lucide-react';

interface AddBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBankAccountModal({ isOpen, onClose, onSuccess }: AddBankAccountModalProps) {
  const [formData, setFormData] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
    accountType: 'Current',
    currency: 'INR',
    openingBalance: '',
    status: 'Active',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        openingBalance: parseFloat(formData.openingBalance) || 0,
        currentBalance: parseFloat(formData.openingBalance) || 0, // Initialize current balance to opening balance
      };

      const res = await fetch('/api/payments/bank-accounts', {
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
        alert(`Error: ${error.error || 'Failed to add bank account'}`);
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
      alert('Failed to add bank account');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      accountName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      branch: '',
      accountType: 'Current',
      currency: 'INR',
      openingBalance: '',
      status: 'Active',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-purple-500" />
            <div>
              <h2 className="text-xl font-bold text-white">Add Bank Account</h2>
              <p className="text-sm text-gray-400">Add a new bank account to track transactions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Account Name *
            </label>
            <input
              type="text"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="e.g., HDFC Current Account"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">A friendly name to identify this account</p>
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bank Name *
            </label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              placeholder="e.g., HDFC Bank, ICICI Bank, State Bank of India"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Account Number *
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="Enter account number"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none font-mono"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Will be encrypted for security</p>
          </div>

          {/* IFSC Code and Branch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                placeholder="e.g., HDFC0001234"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none uppercase"
                maxLength={11}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Branch
              </label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                placeholder="e.g., Mumbai Main Branch"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Account Type and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Type *
              </label>
              <select
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                required
              >
                <option value="Current">Current</option>
                <option value="Savings">Savings</option>
                <option value="Foreign Currency">Foreign Currency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Currency *
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                required
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>
          </div>

          {/* Opening Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Opening Balance *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.openingBalance}
              onChange={(e) => setFormData({ ...formData, openingBalance: e.target.value })}
              placeholder="0.00"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Current balance in the account</p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Add Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
