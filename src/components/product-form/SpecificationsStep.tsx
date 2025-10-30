import { Beaker } from 'lucide-react';

interface SpecificationsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function SpecificationsStep({ formData, updateFormData }: SpecificationsStepProps) {
  const updateSpec = (field: string, value: string) => {
    updateFormData({
      specifications: {
        ...formData.specifications,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
          <Beaker className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Specifications</h2>
          <p className="text-sm text-gray-400">Technical and quality specifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Botanical Name
          </label>
          <input
            type="text"
            value={formData.specifications.botanicalName}
            onChange={(e) => updateSpec('botanicalName', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Curcuma longa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Part Used
          </label>
          <select
            value={formData.specifications.partUsed}
            onChange={(e) => updateSpec('partUsed', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">Select Part</option>
            <option value="Root">Root</option>
            <option value="Leaf">Leaf</option>
            <option value="Seed">Seed</option>
            <option value="Flower">Flower</option>
            <option value="Bark">Bark</option>
            <option value="Fruit">Fruit</option>
            <option value="Whole">Whole</option>
            <option value="Rhizome">Rhizome</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Form
          </label>
          <select
            value={formData.specifications.form}
            onChange={(e) => updateSpec('form', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">Select Form</option>
            <option value="Powder">Powder</option>
            <option value="Whole">Whole</option>
            <option value="Extract">Extract</option>
            <option value="Oil">Oil</option>
            <option value="Crushed">Crushed</option>
            <option value="Ground">Ground</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Color
          </label>
          <input
            type="text"
            value={formData.specifications.color}
            onChange={(e) => updateSpec('color', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Golden Yellow"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Aroma
          </label>
          <input
            type="text"
            value={formData.specifications.aroma}
            onChange={(e) => updateSpec('aroma', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Strong, Earthy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Moisture Content (%)
          </label>
          <input
            type="text"
            value={formData.specifications.moistureContent}
            onChange={(e) => updateSpec('moistureContent', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 10%"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Purity (%)
          </label>
          <input
            type="text"
            value={formData.specifications.purity}
            onChange={(e) => updateSpec('purity', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 99%"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Mesh Size
          </label>
          <input
            type="text"
            value={formData.specifications.meshSize}
            onChange={(e) => updateSpec('meshSize', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 60-80 mesh"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Origin Region
          </label>
          <input
            type="text"
            value={formData.specifications.originRegion}
            onChange={(e) => updateSpec('originRegion', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Kerala, India"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Harvest Season
          </label>
          <input
            type="text"
            value={formData.specifications.harvestSeason}
            onChange={(e) => updateSpec('harvestSeason', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., January-March"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Shelf Life (months)
          </label>
          <input
            type="text"
            value={formData.specifications.shelfLife}
            onChange={(e) => updateSpec('shelfLife', e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 24"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Storage Conditions
          </label>
          <textarea
            value={formData.specifications.storageConditions}
            onChange={(e) => updateSpec('storageConditions', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="e.g., Store in cool, dry place away from direct sunlight"
          />
        </div>
      </div>
    </div>
  );
}
