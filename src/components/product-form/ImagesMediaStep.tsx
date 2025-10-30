import { Image, Video, FileText, X, Plus } from 'lucide-react';
import { useState } from 'react';

interface ImagesMediaStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function ImagesMediaStep({ formData, updateFormData }: ImagesMediaStepProps) {
  const [imageUrl, setImageUrl] = useState('');

  const addImageUrl = () => {
    if (imageUrl.trim()) {
      updateFormData({ images: [...formData.images, imageUrl.trim()] });
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    updateFormData({ images: formData.images.filter((_: string, i: number) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center">
          <Image className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Images & Media</h2>
          <p className="text-sm text-gray-400">Product images, videos, and documents</p>
        </div>
      </div>

      {/* Product Images */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Product Images</h3>
        <p className="text-xs text-gray-500 mb-4">
          Add image URLs. The first image will be used as the main product image.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addImageUrl()}
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="https://example.com/image.jpg"
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* Image Gallery */}
        {formData.images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((img: string, index: number) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23374151" width="200" height="200"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-emerald-600 text-white text-xs rounded">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <Image className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No images added yet</p>
            <p className="text-gray-500 text-xs mt-1">Add image URLs above</p>
          </div>
        )}
      </div>

      {/* Video URL */}
      <div className="mt-8">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Video className="w-4 h-4" />
          Product Video URL
        </label>
        <input
          type="url"
          value={formData.videoUrl}
          onChange={(e) => updateFormData({ videoUrl: e.target.value })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo, or direct video link</p>
      </div>

      {/* Brochure URL */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <FileText className="w-4 h-4" />
          Product Brochure URL
        </label>
        <input
          type="url"
          value={formData.brochureUrl}
          onChange={(e) => updateFormData({ brochureUrl: e.target.value })}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          placeholder="https://example.com/brochure.pdf"
        />
        <p className="text-xs text-gray-500 mt-1">PDF brochure or product catalog</p>
      </div>

      {/* Media Summary */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Media Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{formData.images.length}</p>
            <p className="text-xs text-gray-400">Images</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{formData.videoUrl ? '1' : '0'}</p>
            <p className="text-xs text-gray-400">Video</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{formData.brochureUrl ? '1' : '0'}</p>
            <p className="text-xs text-gray-400">Brochure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
