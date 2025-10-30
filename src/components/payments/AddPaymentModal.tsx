'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Calendar as CalendarIcon } from 'lucide-react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  type: 'received' | 'made';
}

export default function AddPaymentModal({ isOpen, onClose, onSuccess, type }: AddPaymentModalProps) {
  const [formData, setFormData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    clientName: '',
    clientId: '',
    orderId: '',
    orderNumber: '',
    paymentType: 'Advance',
    expenseCategory: 'Vendor Payments',
    expenseType: 'Official',
    payeeName: '',
    vendorId: '',
    amount: '',
    currency: type === 'received' ? 'USD' : 'INR',
    exchangeRate: '83',
    paymentMethod: type === 'received' ? 'Wire Transfer' : 'Bank Transfer',
    referenceNumber: '',
    bankAccount: '',
    invoiceNumber: '',
    taxDeductible: false,
    gstAmount: '',
    tdsAmount: '',
    notes: '',
    status: type === 'received' ? 'Received' : 'Paid',
  });

  const [clients, setClients] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadClients();
      loadBankAccounts();
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.clientId) {
      loadOrders(formData.clientId);
    }
  }, [formData.clientId]);

  useEffect(() => {
    // Filter clients based on search
    if (formData.clientName) {
      const filtered = clients.filter(client =>
        client.companyName.toLowerCase().includes(formData.clientName.toLowerCase()) ||
        client.clientCode.toLowerCase().includes(formData.clientName.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [formData.clientName, clients]);

  const loadClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClients(data.clients || []);
      setFilteredClients(data.clients || []);
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const loadOrders = async (clientId: string) => {
    try {
      const res = await fetch(`/api/orders?clientId=${clientId}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const loadBankAccounts = async () => {
    try {
      const res = await fetch('/api/payments/bank-accounts?status=Active');
      const data = await res.json();
      setBankAccounts(data.accounts || []);
    } catch (error) {
      console.error('Error loading bank accounts:', error);
    }
  };

  const handleClientSelect = (client: any) => {
    setFormData({
      ...formData,
      clientName: client.companyName,
      clientId: client.id.toString(),
    });
    setShowClientDropdown(false);
  };

  const handleOrderSelect = (orderId: string) => {
    const order = orders.find(o => o.id.toString() === orderId);
    if (order) {
      setFormData({
        ...formData,
        orderId,
        orderNumber: order.orderNumber,
      });
    }
  };

  const calculateAmountInINR = () => {
    const amount = parseFloat(formData.amount) || 0;
    const rate = parseFloat(formData.exchangeRate) || 1;
    return formData.currency === 'INR' ? amount : amount * rate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload: any = {
        amount: parseFloat(formData.amount),
        exchangeRate: parseFloat(formData.exchangeRate),
        amountInInr: calculateAmountInINR(),
        paymentMethod: formData.paymentMethod,
        referenceNumber: formData.referenceNumber,
        bankAccount: formData.bankAccount,
        notes: formData.notes,
        status: formData.status,
      };

      if (type === 'received') {
        payload = {
          ...payload,
          paymentDate: formData.paymentDate,
          clientName: formData.clientName,
          clientId: formData.clientId ? parseInt(formData.clientId) : null,
          orderId: formData.orderId ? parseInt(formData.orderId) : null,
          orderNumber: formData.orderNumber,
          paymentType: formData.paymentType,
          currency: formData.currency,
          receivedBy: 'Admin', // In production, get from auth context
        };
      } else {
        payload = {
          ...payload,
          expenseDate: formData.paymentDate,
          expenseCategory: formData.expenseCategory,
          expenseType: formData.expenseType,
          payeeName: formData.payeeName || formData.clientName,
          vendorId: formData.vendorId ? parseInt(formData.vendorId) : null,
          orderId: formData.orderId ? parseInt(formData.orderId) : null,
          currency: formData.currency,
          invoiceNumber: formData.invoiceNumber,
          taxDeductible: formData.taxDeductible,
          gstAmount: formData.gstAmount ? parseFloat(formData.gstAmount) : 0,
          tdsAmount: formData.tdsAmount ? parseFloat(formData.tdsAmount) : 0,
          paidBy: 'Admin', // In production, get from auth context
        };
      }

      const endpoint = type === 'received' ? '/api/payments/received' : '/api/payments/made';
      const res = await fetch(endpoint, {
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
        alert(`Error: ${error.error || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      paymentDate: new Date().toISOString().split('T')[0],
      clientName: '',
      clientId: '',
      orderId: '',
      orderNumber: '',
      paymentType: 'Advance',
      expenseCategory: 'Vendor Payments',
      expenseType: 'Official',
      payeeName: '',
      vendorId: '',
      amount: '',
      currency: type === 'received' ? 'USD' : 'INR',
      exchangeRate: '83',
      paymentMethod: type === 'received' ? 'Wire Transfer' : 'Bank Transfer',
      referenceNumber: '',
      bankAccount: '',
      invoiceNumber: '',
      taxDeductible: false,
      gstAmount: '',
      tdsAmount: '',
      notes: '',
      status: type === 'received' ? 'Received' : 'Paid',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {type === 'received' ? 'Record Payment Received' : 'Record Expense'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Date *
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.paymentDate}
                onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                required
              />
              <CalendarIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Conditional: Payment Received Fields */}
          {type === 'received' && (
            <>
              {/* Client (Searchable) */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => {
                    setFormData({ ...formData, clientName: e.target.value, clientId: '' });
                    setShowClientDropdown(true);
                  }}
                  onFocus={() => setShowClientDropdown(true)}
                  placeholder="Search client by name or code..."
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  required
                />
                {showClientDropdown && filteredClients.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg max-h-48 overflow-y-auto">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        type="button"
                        onClick={() => handleClientSelect(client)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-600 text-white"
                      >
                        <div className="font-medium">{client.companyName}</div>
                        <div className="text-sm text-gray-400">{client.clientCode}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order (Filtered by Client) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Order (Optional)
                </label>
                <select
                  value={formData.orderId}
                  onChange={(e) => handleOrderSelect(e.target.value)}
                  disabled={!formData.clientId}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="">Select order...</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.orderNumber} - {order.totalAmount} {order.currency}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Type *
                </label>
                <select
                  value={formData.paymentType}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  required
                >
                  <option value="Advance">Advance</option>
                  <option value="Balance">Balance</option>
                  <option value="Full Payment">Full Payment</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>
            </>
          )}

          {/* Conditional: Expense Fields */}
          {type === 'made' && (
            <>
              {/* Expense Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expense Category *
                </label>
                <select
                  value={formData.expenseCategory}
                  onChange={(e) => setFormData({ ...formData, expenseCategory: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  required
                >
                  <option value="Vendor Payments">Vendor Payments</option>
                  <option value="Salaries & Wages">Salaries & Wages</option>
                  <option value="Rent & Utilities">Rent & Utilities</option>
                  <option value="Transport & Logistics">Transport & Logistics</option>
                  <option value="Marketing & Advertising">Marketing & Advertising</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Professional Fees">Professional Fees</option>
                  <option value="Taxes">Taxes</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Payee Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payee Name *
                </label>
                <input
                  type="text"
                  value={formData.payeeName}
                  onChange={(e) => setFormData({ ...formData, payeeName: e.target.value })}
                  placeholder="Who received the payment?"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Invoice Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  placeholder="Vendor invoice number"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </>
          )}

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
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
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
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="AED">AED</option>
              </select>
            </div>
          </div>

          {/* Exchange Rate */}
          {formData.currency !== 'INR' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Exchange Rate (to INR) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.exchangeRate}
                onChange={(e) => setFormData({ ...formData, exchangeRate: e.target.value })}
                placeholder="83.00"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                required
              />
              <p className="text-sm text-gray-400 mt-1">
                Amount in INR: ₹{calculateAmountInINR().toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Payment Method *
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
              required
            >
              <option value="Wire Transfer">Wire Transfer</option>
              <option value="LC">Letter of Credit (LC)</option>
              <option value="PayPal">PayPal</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>

          {/* Reference Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reference Number
            </label>
            <input
              type="text"
              value={formData.referenceNumber}
              onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
              placeholder="Transaction ID, Cheque number, etc."
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {type === 'received' ? 'Bank Account (Where Received)' : 'Bank Account (Paid From)'}
            </label>
            <select
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
            >
              <option value="">Select bank account...</option>
              {bankAccounts.map((account) => (
                <option key={account.id} value={account.accountName}>
                  {account.accountName} - {account.bankName}
                </option>
              ))}
            </select>
          </div>

          {/* Tax Fields (Expenses Only) */}
          {type === 'made' && (
            <>
              {/* Tax Deductible Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg">
                <input
                  type="checkbox"
                  id="taxDeductible"
                  checked={formData.taxDeductible}
                  onChange={(e) => setFormData({ ...formData, taxDeductible: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="taxDeductible" className="text-sm font-medium text-gray-300">
                  Tax Deductible Expense
                </label>
              </div>

              {/* GST and TDS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GST Amount (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.gstAmount}
                    onChange={(e) => setFormData({ ...formData, gstAmount: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    TDS Amount (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tdsAmount}
                    onChange={(e) => setFormData({ ...formData, tdsAmount: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Upload Receipt/Proof */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Receipt/Proof
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</p>
              <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Additional notes or comments..."
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none resize-none"
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
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
