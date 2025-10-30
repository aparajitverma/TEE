import { Truck, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VendorPackagingStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function VendorPackagingStep({ formData, updateFormData }: VendorPackagingStepProps) {
  const [vendors, setVendors] = useState<any[]>([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors');
      const data = await response.json();
      setVendors(data.vendors || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const addPackagingOption = () => {
    updateFormData({
      packagingOptions: [
        ...formData.packagingOptions,
        { type: '', size: '', packagesPerContainer: '' },
      ],
    });
  };

  const removePackagingOption = (index: number) => {
    updateFormData({
      packagingOptions: formData.packagingOptions.filter((_: any, i: number) => i !== index),
    });
  };

  const updatePackagingOption = (index: number, field: string, value: string) => {
    const updated = [...formData.packagingOptions];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({ packagingOptions: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
          <Truck className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Vendor & Packaging</h2>
          <p className="text-sm text-gray-400">Supplier and packaging details</p>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Vendor Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Primary Vendor
            </label>
            <select
              value={formData.primaryVendorId || ''}
              onChange={(e) => updateFormData({ primaryVendorId: e.target.value ? parseInt(e.target.value) : null })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="">Select Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.vendorName} ({vendor.vendorCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vendor Product Code
            </label>
            <input
              type="text"
              value={formData.vendorProductCode}
              onChange={(e) => updateFormData({ vendorProductCode: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="Vendor's SKU"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lead Time (Days)
            </label>
            <input
              type="number"
              value={formData.vendorLeadTimeDays}
              onChange={(e) => updateFormData({ vendorLeadTimeDays: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="7"
            />
          </div>
        </div>
      </div>

      {/* Packaging Options */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Packaging Options</h3>
            <p className="text-sm text-gray-400">Available packaging configurations</p>
          </div>
          <button
            type="button"
            onClick={addPackagingOption}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        </div>

        {formData.packagingOptions.length > 0 && (
          <div className="space-y-3">
            {formData.packagingOptions.map((option: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Package Type</label>
                    <input
                      type="text"
                      value={option.type}
                      onChange={(e) => updatePackagingOption(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
                      placeholder="e.g., PP Bag, Carton"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Package Size</label>
                    <input
                      type="text"
                      value={option.size}
                      onChange={(e) => updatePackagingOption(index, 'size', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
                      placeholder="e.g., 25kg, 50kg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Per Container</label>
                    <input
                      type="text"
                      value={option.packagesPerContainer}
                      onChange={(e) => updatePackagingOption(index, 'packagesPerContainer', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
                      placeholder="e.g., 20ft: 800"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removePackagingOption(index)}
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
