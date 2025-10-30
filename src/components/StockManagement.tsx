'use client';

import { useState } from 'react';
import { X, Plus, Minus, RefreshCw, AlertTriangle, TrendingUp, Package } from 'lucide-react';

interface StockManagementProps {
  product: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function StockManagement({ product, onClose, onUpdate }: StockManagementProps) {
  const [activeTab, setActiveTab] = useState<'update' | 'history' | 'alerts'>('update');
  const [transactionType, setTransactionType] = useState<'in' | 'out' | 'adjustment'>('in');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStockUpdate = async () => {
    if (quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    setLoading(true);
    try {
      let newStock = product.currentStock;
      
      if (transactionType === 'in') {
        newStock += quantity;
      } else if (transactionType === 'out') {
        newStock -= quantity;
        if (newStock < 0) {
          alert('Insufficient stock');
          setLoading(false);
          return;
        }
      } else {
        newStock = quantity;
      }

      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          currentStock: newStock,
          lastStockUpdate: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Log stock movement (would be saved to database in real implementation)
        console.log({
          productId: product.id,
          type: transactionType,
          quantity,
          previousStock: product.currentStock,
          newStock,
          reason,
          reference,
          timestamp: new Date()
        });

        alert('Stock updated successfully');
        setQuantity(0);
        setReason('');
        setReference('');
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    } finally {
      setLoading(false);
    }
  };

  const stockMovements = [
    { date: '2024-10-28', type: 'in', quantity: 500, reference: 'PO-2024-001', reason: 'Purchase from vendor', balance: 1500 },
    { date: '2024-10-25', type: 'out', quantity: 200, reference: 'SO-2024-045', reason: 'Order fulfillment', balance: 1000 },
    { date: '2024-10-20', type: 'adjustment', quantity: 1200, reference: 'ADJ-001', reason: 'Stock count correction', balance: 1200 },
  ];

  const getStockStatus = () => {
    if (product.currentStock === 0) return { text: 'Out of Stock', color: 'text-red-400', bg: 'bg-red-500/20' };
    if (product.reorderLevel && product.currentStock <= product.reorderLevel) 
      return { text: 'Low Stock', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { text: 'In Stock', color: 'text-green-400', bg: 'bg-green-500/20' };
  };

  const status = getStockStatus();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Stock Management</h2>
            <p className="text-sm text-gray-400 mt-1">{product.productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Stock Info */}
        <div className="p-6 bg-gray-900 border-b border-gray-700">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Current Stock</p>
              <p className="text-2xl font-bold text-white">{product.currentStock} {product.stockUnit}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                {status.text}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Reorder Level</p>
              <p className="text-lg font-semibold text-white">{product.reorderLevel || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Stock Value</p>
              <p className="text-lg font-semibold text-emerald-400">
                {product.currency} {(product.currentStock * product.costPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'update', label: 'Update Stock' },
            { id: 'history', label: 'Movement History' },
            { id: 'alerts', label: 'Alerts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'update' && (
            <div className="space-y-6">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Transaction Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setTransactionType('in')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      transactionType === 'in'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Plus className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                    <p className="text-white font-medium">Stock In</p>
                    <p className="text-xs text-gray-400 mt-1">Receive from vendor</p>
                  </button>
                  <button
                    onClick={() => setTransactionType('out')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      transactionType === 'out'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <Minus className="w-6 h-6 mx-auto mb-2 text-red-400" />
                    <p className="text-white font-medium">Stock Out</p>
                    <p className="text-xs text-gray-400 mt-1">Order fulfillment</p>
                  </button>
                  <button
                    onClick={() => setTransactionType('adjustment')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      transactionType === 'adjustment'
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <RefreshCw className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <p className="text-white font-medium">Adjustment</p>
                    <p className="text-xs text-gray-400 mt-1">Stock correction</p>
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {transactionType === 'adjustment' ? 'New Stock Quantity' : 'Quantity'}
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter quantity"
                />
                {transactionType !== 'adjustment' && (
                  <p className="text-xs text-gray-400 mt-1">
                    New stock will be: {transactionType === 'in' ? product.currentStock + quantity : product.currentStock - quantity} {product.stockUnit}
                  </p>
                )}
              </div>

              {/* Reference */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reference Number</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="PO number, SO number, etc."
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Enter reason for stock movement"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleStockUpdate}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 text-white rounded-lg font-medium"
              >
                {loading ? 'Updating...' : 'Update Stock'}
              </button>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Stock Movement History</h3>
                <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                  Export Report
                </button>
              </div>
              {stockMovements.map((movement, i) => (
                <div key={i} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          movement.type === 'in' ? 'bg-emerald-500/20 text-emerald-400' :
                          movement.type === 'out' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {movement.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-400">{movement.date}</span>
                        <span className="text-sm text-gray-500">Ref: {movement.reference}</span>
                      </div>
                      <p className="text-white text-sm">{movement.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : ''}{movement.quantity}
                      </p>
                      <p className="text-xs text-gray-400">Balance: {movement.balance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {/* Low Stock Alert */}
              {product.reorderLevel && product.currentStock <= product.reorderLevel && (
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="text-yellow-300 font-semibold mb-1">Low Stock Alert</h4>
                      <p className="text-sm text-gray-300">
                        Current stock ({product.currentStock} {product.stockUnit}) is at or below reorder level ({product.reorderLevel} {product.stockUnit}).
                        Consider placing a new order.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Out of Stock Alert */}
              {product.currentStock === 0 && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <Package className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-red-300 font-semibold mb-1">Out of Stock</h4>
                      <p className="text-sm text-gray-300">
                        This product is currently out of stock. Immediate action required.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stock Valuation */}
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Stock Valuation Report
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Current Stock Value</p>
                    <p className="text-xl font-bold text-white">
                      {product.currency} {(product.currentStock * product.costPrice).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Potential Revenue</p>
                    <p className="text-xl font-bold text-emerald-400">
                      {product.currency} {(product.currentStock * product.sellingPrice).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Potential Profit</p>
                    <p className="text-xl font-bold text-green-400">
                      {product.currency} {(product.currentStock * (product.sellingPrice - product.costPrice)).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Margin</p>
                    <p className="text-xl font-bold text-blue-400">
                      {product.marginPercentage?.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Good Stock Status */}
              {product.currentStock > (product.reorderLevel || 0) && product.currentStock > 0 && (
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <Package className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-green-300 font-semibold mb-1">Stock Status: Good</h4>
                      <p className="text-sm text-gray-300">
                        Stock levels are healthy. Current stock is above reorder level.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
