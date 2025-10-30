import { Package } from 'lucide-react';

interface BasicInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  const generateProductCode = () => {
    const prefix = 'PROD';
    const categoryCode = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'XXX';
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${categoryCode}-${random}`;
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
          <Package className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Basic Information</h2>
          <p className="text-sm text-gray-400">Enter the core product details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => {
              updateFormData({ 
                productName: e.target.value,
                slug: generateSlug(e.target.value)
              });
            }}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Organic Turmeric Powder"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scientific Name
          </label>
          <input
            type="text"
            value={formData.productNameScientific}
            onChange={(e) => updateFormData({ productNameScientific: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Curcuma longa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Code <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.productCode}
              onChange={(e) => updateFormData({ productCode: e.target.value })}
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="PROD-XXX-001"
              required
            />
            <button
              type="button"
              onClick={() => updateFormData({ productCode: generateProductCode() })}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.category}
            onChange={(e) => updateFormData({ category: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Spices">Spices</option>
            <option value="Herbs">Herbs</option>
            <option value="Essential Oils">Essential Oils</option>
            <option value="Seeds">Seeds</option>
            <option value="Powders">Powders</option>
            <option value="Extracts">Extracts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Subcategory
          </label>
          <input
            type="text"
            value={formData.subcategory}
            onChange={(e) => updateFormData({ subcategory: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Ayurvedic Herbs"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => updateFormData({ status: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => updateFormData({ featured: e.target.checked })}
              className="w-4 h-4 text-emerald-600 bg-gray-900 border-gray-700 rounded focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-300">Featured Product</span>
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Short Description
          </label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => updateFormData({ shortDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="Brief description (50-100 words)"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Long Description
          </label>
          <textarea
            value={formData.longDescription}
            onChange={(e) => updateFormData({ longDescription: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="Detailed description (200-500 words)"
          />
        </div>
      </div>
    </div>
  );
}
