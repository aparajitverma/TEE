'use client';

import { useState } from 'react';
import { X, DollarSign, TrendingUp, Plus, Trash2, History } from 'lucide-react';

interface PricingManagementProps {
  product: any;
  onClose: () => void;
  onUpdate: () => void;
}

export default function PricingManagement({ product, onClose, onUpdate }: PricingManagementProps) {
  const [activeTab, setActiveTab] = useState<'update' | 'tiers' | 'history'>('update');
  const [costPrice, setCostPrice] = useState(product.costPrice);
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
  const [currency, setCurrency] = useState(product.currency);
  const [bulkPricing, setBulkPricing] = useState(
    product.bulkPricing ? JSON.parse(product.bulkPricing) : []
  );
  const [loading, setLoading] = useState(false);

  const calculateMargin = (cost: number, selling: number) => {
    if (selling > 0) {
      return (((selling - cost) / selling) * 100).toFixed(2);
    }
    return '0.00';
  };

  const currentMargin = calculateMargin(costPrice, sellingPrice);

  const handlePriceUpdate = async () => {
    if (costPrice <= 0 || sellingPrice <= 0) {
      alert('Please enter valid prices');
      return;
    }

    setLoading(true);
    try {
      const marginPercentage = parseFloat(calculateMargin(costPrice, sellingPrice));
      
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          costPrice,
          sellingPrice,
          currency,
          marginPercentage,
          lastPriceUpdate: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Log price history (would be saved to database in real implementation)
        console.log({
          productId: product.id,
          previousCost: product.costPrice,
          newCost: costPrice,
          previousSelling: product.sellingPrice,
          newSelling: sellingPrice,
          previousMargin: product.marginPercentage,
          newMargin: marginPercentage,
          timestamp: new Date()
        });

        alert('Prices updated successfully');
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating prices:', error);
      alert('Failed to update prices');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkPricingUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulkPricing: JSON.stringify(bulkPricing)
        })
      });

      if (response.ok) {
        alert('Bulk pricing updated successfully');
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating bulk pricing:', error);
      alert('Failed to update bulk pricing');
    } finally {
      setLoading(false);
    }
  };

  const addBulkPricingTier = () => {
    setBulkPricing([...bulkPricing, { qtyFrom: 0, qtyTo: 0, price: 0 }]);
  };

  const removeBulkPricingTier = (index: number) => {
    setBulkPricing(bulkPricing.filter((_: any, i: number) => i !== index));
  };

  const updateBulkPricingTier = (index: number, field: string, value: number) => {
    const updated = [...bulkPricing];
    updated[index] = { ...updated[index], [field]: value };
    setBulkPricing(updated);
  };

  const priceHistory = [
    { date: '2024-10-28', costPrice: 45.00, sellingPrice: 65.00, margin: 30.77, reason: 'Market adjustment' },
    { date: '2024-09-15', costPrice: 42.00, sellingPrice: 60.00, margin: 30.00, reason: 'Vendor price increase' },
    { date: '2024-08-01', costPrice: 40.00, sellingPrice: 58.00, margin: 31.03, reason: 'Initial pricing' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Pricing Management</h2>
            <p className="text-sm text-gray-400 mt-1">{product.productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Pricing Info */}
        <div className="p-6 bg-gray-900 border-b border-gray-700">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Cost Price</p>
              <p className="text-2xl font-bold text-white">{product.currency} {product.costPrice}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Selling Price</p>
              <p className="text-2xl font-bold text-emerald-400">{product.currency} {product.sellingPrice}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Margin</p>
              <p className={`text-2xl font-bold ${
                (product.marginPercentage || 0) > 30 ? 'text-green-400' :
                (product.marginPercentage || 0) > 15 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {product.marginPercentage?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Profit per Unit</p>
              <p className="text-2xl font-bold text-blue-400">
                {product.currency} {(product.sellingPrice - product.costPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'update', label: 'Update Prices' },
            { id: 'tiers', label: 'Bulk Pricing Tiers' },
            { id: 'history', label: 'Price History' }
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
              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>

              {/* Cost Price */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cost Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    step="0.01"
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Previous: {product.currency} {product.costPrice}
                </p>
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Selling Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Previous: {product.currency} {product.sellingPrice}
                </p>
              </div>

              {/* Margin Calculator */}
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Margin Calculator
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">New Margin</p>
                    <p className={`text-2xl font-bold ${
                      parseFloat(currentMargin) > 30 ? 'text-green-400' :
                      parseFloat(currentMargin) > 15 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {currentMargin}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Profit per Unit</p>
                    <p className="text-2xl font-bold text-white">
                      {currency} {(sellingPrice - costPrice).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Change</p>
                    <p className={`text-2xl font-bold ${
                      parseFloat(currentMargin) > (product.marginPercentage || 0) ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {(parseFloat(currentMargin) - (product.marginPercentage || 0)).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handlePriceUpdate}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 text-white rounded-lg font-medium"
              >
                {loading ? 'Updating...' : 'Update Prices'}
              </button>
            </div>
          )}

          {activeTab === 'tiers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Bulk Pricing Tiers</h3>
                  <p className="text-sm text-gray-400">Volume-based pricing discounts</p>
                </div>
                <button
                  onClick={addBulkPricingTier}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Tier
                </button>
              </div>

              {bulkPricing.length > 0 ? (
                <div className="space-y-3">
                  {bulkPricing.map((tier: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Qty From</label>
                            <input
                              type="number"
                              value={tier.qtyFrom}
                              onChange={(e) => updateBulkPricingTier(index, 'qtyFrom', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Qty To</label>
                            <input
                              type="number"
                              value={tier.qtyTo}
                              onChange={(e) => updateBulkPricingTier(index, 'qtyTo', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">Price per Unit</label>
                            <input
                              type="number"
                              step="0.01"
                              value={tier.price}
                              onChange={(e) => updateBulkPricingTier(index, 'price', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeBulkPricingTier(index)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Discount: {tier.price > 0 ? ((1 - tier.price / sellingPrice) * 100).toFixed(1) : 0}% off regular price
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-700">
                  <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No bulk pricing tiers configured</p>
                  <p className="text-sm text-gray-500 mt-1">Add tiers to offer volume discounts</p>
                </div>
              )}

              {bulkPricing.length > 0 && (
                <button
                  onClick={handleBulkPricingUpdate}
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 text-white rounded-lg font-medium"
                >
                  {loading ? 'Saving...' : 'Save Bulk Pricing'}
                </button>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-400" />
                  Price Change History
                </h3>
                <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                  Export Report
                </button>
              </div>
              {priceHistory.map((entry, i) => (
                <div key={i} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-400">{entry.date}</p>
                      <p className="text-white text-sm mt-1">{entry.reason}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      entry.margin > 30 ? 'bg-green-500/20 text-green-400' :
                      entry.margin > 15 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {entry.margin.toFixed(2)}% margin
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-400">Cost Price</p>
                      <p className="text-white font-medium">{product.currency} {entry.costPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Selling Price</p>
                      <p className="text-emerald-400 font-medium">{product.currency} {entry.sellingPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Profit</p>
                      <p className="text-blue-400 font-medium">{product.currency} {(entry.sellingPrice - entry.costPrice).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
