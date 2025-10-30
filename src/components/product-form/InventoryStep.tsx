import { Package2 } from 'lucide-react';

interface InventoryStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function InventoryStep({ formData, updateFormData }: InventoryStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
          <Package2 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Inventory</h2>
          <p className="text-sm text-gray-400">Manage stock levels and warehouse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Stock <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.currentStock}
            onChange={(e) => updateFormData({ currentStock: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stock Unit
          </label>
          <select
            value={formData.stockUnit}
            onChange={(e) => updateFormData({ stockUnit: e.target.value })}
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
            Reorder Level
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.reorderLevel}
            onChange={(e) => updateFormData({ reorderLevel: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="Alert when stock falls below this level"
          />
          <p className="text-xs text-gray-500 mt-1">Alert when stock falls below this level</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Maximum Stock Level
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.maxStockLevel}
            onChange={(e) => updateFormData({ maxStockLevel: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="Maximum capacity"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Warehouse Location
          </label>
          <input
            type="text"
            value={formData.warehouseLocation}
            onChange={(e) => updateFormData({ warehouseLocation: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Warehouse A, Section B3"
          />
        </div>

        {/* Stock Status Indicator */}
        <div className="md:col-span-2 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Stock Status</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400">Current Stock</p>
              <p className="text-lg font-semibold text-white">
                {formData.currentStock} {formData.stockUnit}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-lg font-semibold">
                {formData.currentStock === 0 ? (
                  <span className="text-red-400">Out of Stock</span>
                ) : formData.reorderLevel && formData.currentStock <= formData.reorderLevel ? (
                  <span className="text-yellow-400">Low Stock</span>
                ) : (
                  <span className="text-green-400">In Stock</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Stock Value</p>
              <p className="text-lg font-semibold text-white">
                {formData.currency} {(formData.currentStock * formData.costPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
