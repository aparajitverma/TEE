import { DollarSign, Plus, Trash2 } from 'lucide-react';

interface PricingStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function PricingStep({ formData, updateFormData }: PricingStepProps) {
  const calculateMargin = () => {
    if (formData.sellingPrice > 0) {
      const margin = ((formData.sellingPrice - formData.costPrice) / formData.sellingPrice) * 100;
      return margin.toFixed(2);
    }
    return '0.00';
  };

  const addBulkPricingTier = () => {
    updateFormData({
      bulkPricing: [
        ...formData.bulkPricing,
        { qtyFrom: 0, qtyTo: 0, price: 0 },
      ],
    });
  };

  const removeBulkPricingTier = (index: number) => {
    updateFormData({
      bulkPricing: formData.bulkPricing.filter((_: any, i: number) => i !== index),
    });
  };

  const updateBulkPricingTier = (index: number, field: string, value: number) => {
    const updated = [...formData.bulkPricing];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({ bulkPricing: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Pricing</h2>
          <p className="text-sm text-gray-400">Set product pricing and margins</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cost Price <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) => updateFormData({ costPrice: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Selling Price <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) => updateFormData({ sellingPrice: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => updateFormData({ currency: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Unit
          </label>
          <select
            value={formData.unit}
            onChange={(e) => updateFormData({ unit: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="kg">kg</option>
            <option value="MT">MT (Metric Ton)</option>
            <option value="liter">Liter</option>
            <option value="piece">Piece</option>
            <option value="gram">Gram</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Order Quantity (MOQ)
          </label>
          <input
            type="number"
            value={formData.moq}
            onChange={(e) => updateFormData({ moq: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Margin Percentage
          </label>
          <div className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg">
            <span className={`text-lg font-semibold ${
              parseFloat(calculateMargin()) > 30 ? 'text-green-400' :
              parseFloat(calculateMargin()) > 15 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {calculateMargin()}%
            </span>
          </div>
        </div>
      </div>

      {/* Bulk Pricing */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Bulk Pricing Tiers</h3>
            <p className="text-sm text-gray-400">Optional volume-based pricing</p>
          </div>
          <button
            type="button"
            onClick={addBulkPricingTier}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add Tier
          </button>
        </div>

        {formData.bulkPricing.length > 0 && (
          <div className="space-y-3">
            {formData.bulkPricing.map((tier: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
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
                  type="button"
                  onClick={() => removeBulkPricingTier(index)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
