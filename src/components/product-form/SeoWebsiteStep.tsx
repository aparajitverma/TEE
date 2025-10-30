import { Globe, Search } from 'lucide-react';

interface SeoWebsiteStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function SeoWebsiteStep({ formData, updateFormData }: SeoWebsiteStepProps) {
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-600/20 rounded-lg flex items-center justify-center">
          <Globe className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">SEO & Website</h2>
          <p className="text-sm text-gray-400">Search engine optimization and publishing</p>
        </div>
      </div>

      {/* Website Publishing */}
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.publishedOnWebsite}
            onChange={(e) => updateFormData({ publishedOnWebsite: e.target.checked })}
            className="w-5 h-5 text-emerald-600 bg-gray-800 border-gray-700 rounded focus:ring-emerald-500"
          />
          <div>
            <span className="text-white font-medium">Publish on Website</span>
            <p className="text-xs text-gray-400">Make this product visible on your website</p>
          </div>
        </label>
      </div>

      {/* SEO Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            SEO Title
          </label>
          <input
            type="text"
            value={formData.seoTitle}
            onChange={(e) => updateFormData({ seoTitle: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder={formData.productName || "Enter SEO title"}
            maxLength={60}
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">Optimal: 50-60 characters</p>
            <p className={`text-xs ${formData.seoTitle.length > 60 ? 'text-red-400' : 'text-gray-500'}`}>
              {formData.seoTitle.length}/60
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meta Description
          </label>
          <textarea
            value={formData.metaDescription}
            onChange={(e) => updateFormData({ metaDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="Brief description for search engines"
            maxLength={160}
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-500">Optimal: 150-160 characters</p>
            <p className={`text-xs ${formData.metaDescription.length > 160 ? 'text-red-400' : 'text-gray-500'}`}>
              {formData.metaDescription.length}/160
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meta Keywords
          </label>
          <input
            type="text"
            value={formData.metaKeywords}
            onChange={(e) => updateFormData({ metaKeywords: e.target.value })}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            URL Slug
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => updateFormData({ slug: e.target.value })}
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              placeholder="product-url-slug"
            />
            <button
              type="button"
              onClick={() => updateFormData({ slug: generateSlug(formData.productName) })}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Generate
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            URL: /products/{formData.slug || 'product-slug'}
          </p>
        </div>
      </div>

      {/* SEO Preview */}
      <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-300">Search Engine Preview</h3>
        </div>
        <div className="space-y-1">
          <div className="text-blue-500 text-lg">
            {formData.seoTitle || formData.productName || 'Product Title'}
          </div>
          <div className="text-green-600 text-sm">
            https://yoursite.com/products/{formData.slug || 'product-slug'}
          </div>
          <div className="text-gray-400 text-sm">
            {formData.metaDescription || formData.shortDescription || 'Product description will appear here...'}
          </div>
        </div>
      </div>

      {/* SEO Score */}
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">SEO Checklist</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.seoTitle ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className={`text-sm ${formData.seoTitle ? 'text-gray-300' : 'text-gray-500'}`}>
              SEO Title set
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.metaDescription ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className={`text-sm ${formData.metaDescription ? 'text-gray-300' : 'text-gray-500'}`}>
              Meta Description set
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.slug ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className={`text-sm ${formData.slug ? 'text-gray-300' : 'text-gray-500'}`}>
              URL Slug set
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.images.length > 0 ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className={`text-sm ${formData.images.length > 0 ? 'text-gray-300' : 'text-gray-500'}`}>
              Product images added
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
