'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, Globe, Copy, Eye, Package, DollarSign, TrendingUp, Upload, X, Star } from 'lucide-react';
import StockManagement from '@/components/StockManagement';
import PricingManagement from '@/components/PricingManagement';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  productNameScientific: string | null;
  category: string;
  subcategory: string | null;
  status: string;
  featured: boolean;
  shortDescription: string | null;
  longDescription: string | null;
  specifications: any;
  costPrice: number;
  sellingPrice: number;
  currency: string;
  unit: string;
  moq: number;
  marginPercentage: number | null;
  bulkPricing: any;
  currentStock: number;
  stockUnit: string;
  reorderLevel: number | null;
  maxStockLevel: number | null;
  warehouseLocation: string | null;
  primaryVendorId: number | null;
  vendorProductCode: string | null;
  vendorLeadTimeDays: number | null;
  packagingOptions: any;
  certifications: any;
  hsCode: string | null;
  casNumber: string | null;
  fssaiApproved: boolean;
  fdaApproved: boolean;
  euCompliant: boolean;
  images: any;
  videoUrl: string | null;
  brochureUrl: string | null;
  publishedOnWebsite: boolean;
  seoTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  slug: string | null;
  totalQuantitySold: number;
  totalRevenue: number;
  dateAdded: string;
  lastUpdated: string;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [primaryVendor, setPrimaryVendor] = useState<any>(null);
  const [showStockManagement, setShowStockManagement] = useState(false);
  const [showPricingManagement, setShowPricingManagement] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        
        // Fetch vendor if exists
        if (data.primaryVendorId) {
          fetchVendor(data.primaryVendorId);
        }
      } else {
        alert('Product not found');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendor = async (vendorId: number) => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`);
      if (response.ok) {
        const data = await response.json();
        setPrimaryVendor(data);
      }
    } catch (error) {
      console.error('Error fetching vendor:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${params.id}`, { method: 'DELETE' });
      router.push('/admin/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDuplicate = () => {
    router.push(`/admin/products/new?duplicate=${params.id}`);
  };

  const togglePublish = async () => {
    if (!product) return;
    try {
      await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishedOnWebsite: !product.publishedOnWebsite })
      });
      fetchProduct();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim() || !product) return;
    const currentImages = product.images ? JSON.parse(product.images) : [];
    const updatedImages = [...currentImages, newImageUrl.trim()];
    
    try {
      await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: JSON.stringify(updatedImages) })
      });
      setNewImageUrl('');
      fetchProduct();
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const handleDeleteImage = async (index: number) => {
    if (!product || !confirm('Delete this image?')) return;
    const currentImages = product.images ? JSON.parse(product.images) : [];
    const updatedImages = currentImages.filter((_: string, i: number) => i !== index);
    
    try {
      await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: JSON.stringify(updatedImages) })
      });
      if (selectedImage >= updatedImages.length) {
        setSelectedImage(Math.max(0, updatedImages.length - 1));
      }
      fetchProduct();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSetMainImage = async (index: number) => {
    if (!product || index === 0) return;
    const currentImages = product.images ? JSON.parse(product.images) : [];
    const updatedImages = [...currentImages];
    const [mainImage] = updatedImages.splice(index, 1);
    updatedImages.unshift(mainImage);
    
    try {
      await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: JSON.stringify(updatedImages) })
      });
      setSelectedImage(0);
      fetchProduct();
    } catch (error) {
      console.error('Error setting main image:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Inactive': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'Out of Stock': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Discontinued': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return badges[status] || badges['Active'];
  };

  const getStockStatus = () => {
    if (!product) return { text: '', color: '' };
    if (product.currentStock === 0) return { text: 'Out of Stock', color: 'text-red-400' };
    if (product.reorderLevel && product.currentStock <= product.reorderLevel) 
      return { text: 'Low Stock', color: 'text-yellow-400' };
    return { text: 'In Stock', color: 'text-green-400' };
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Product not found</div>
    </div>;
  }

  const specs = product.specifications ? JSON.parse(product.specifications) : {};
  const images = product.images ? JSON.parse(product.images) : [];
  const certs = product.certifications ? JSON.parse(product.certifications) : [];
  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <button
              onClick={() => router.push('/admin/products')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white mt-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{product.productName}</h1>
                {product.featured && (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded border border-yellow-500/30">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-400">{product.productCode}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(product.status)}`}>
                  {product.status}
                </span>
                <span className={`text-sm font-medium ${stockStatus.color}`}>
                  {stockStatus.text}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.publishedOnWebsite && (
              <button
                onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Eye className="w-4 h-4" />
                View on Website
              </button>
            )}
            <button
              onClick={togglePublish}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                product.publishedOnWebsite 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white`}
            >
              <Globe className="w-4 h-4" />
              {product.publishedOnWebsite ? 'Unpublish' : 'Publish'}
            </button>
            <button
              onClick={handleDuplicate}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
            <button
              onClick={() => router.push(`/admin/products/${params.id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Image */}
          <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[selectedImage]}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {selectedImage === 0 && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Main Image
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No images available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 0 && (
              <div className="grid grid-cols-6 gap-2">
                {images.map((img: string, index: number) => (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-emerald-500'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3C/svg%3E';
                        }}
                      />
                    </button>
                    {index === 0 && (
                      <Star className="w-3 h-3 text-yellow-400 absolute top-1 right-1" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Management */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Image Management</h3>
            
            {/* Add New Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Add Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="https://..."
                />
                <button
                  onClick={handleAddImage}
                  className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  title="Add Image"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Actions */}
            {images.length > 0 && (
              <div className="space-y-3">
                <div className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Selected Image #{selectedImage + 1}</p>
                  <div className="flex gap-2">
                    {selectedImage !== 0 && (
                      <button
                        onClick={() => handleSetMainImage(selectedImage)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm"
                      >
                        <Star className="w-3 h-3" />
                        Set as Main
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteImage(selectedImage)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    >
                      <X className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-400">Gallery Stats</p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Images:</span>
                      <span className="text-white font-medium">{images.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Main Image:</span>
                      <span className="text-emerald-400 font-medium">Set</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {images.length === 0 && (
              <div className="text-center py-6">
                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No images yet</p>
                <p className="text-gray-500 text-xs mt-1">Add an image URL above</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-400 text-sm">Current Stock</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {product.currentStock} {product.stockUnit}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
            <button
              onClick={() => setShowStockManagement(true)}
              className="w-full mt-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium"
            >
              Manage Stock
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Selling Price</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {product.currency} {product.sellingPrice}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-400 text-sm">Margin</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {product.marginPercentage?.toFixed(1) || '0'}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <button
              onClick={() => setShowPricingManagement(true)}
              className="w-full mt-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium"
            >
              Manage Pricing
            </button>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sold</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {product.totalQuantitySold} {product.stockUnit}
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-700 overflow-x-auto">
            {['overview', 'specifications', 'pricing', 'inventory', 'packaging', 'vendors', 'orders', 'analytics', 'seo'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Product Name</p>
                      <p className="text-white">{product.productName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Scientific Name</p>
                      <p className="text-white">{product.productNameScientific || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Category</p>
                      <p className="text-white">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Subcategory</p>
                      <p className="text-white">{product.subcategory || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {product.shortDescription && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                    <p className="text-gray-300">{product.shortDescription}</p>
                  </div>
                )}

                {certs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {certs.map((cert: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-white">{value as string || 'N/A'}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Cost Price</p>
                    <p className="text-2xl font-bold text-white">{product.currency} {product.costPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Selling Price</p>
                    <p className="text-2xl font-bold text-white">{product.currency} {product.sellingPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Margin</p>
                    <p className="text-2xl font-bold text-emerald-400">{product.marginPercentage?.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Unit</p>
                    <p className="text-white">{product.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">MOQ</p>
                    <p className="text-white">{product.moq}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400">Current Stock</p>
                  <p className="text-2xl font-bold text-white">{product.currentStock} {product.stockUnit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Reorder Level</p>
                  <p className="text-white">{product.reorderLevel || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Max Stock Level</p>
                  <p className="text-white">{product.maxStockLevel || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Warehouse Location</p>
                  <p className="text-white">{product.warehouseLocation || 'Not set'}</p>
                </div>
              </div>
            )}

            {activeTab === 'packaging' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Packaging Options</h3>
                  {product.packagingOptions && JSON.parse(product.packagingOptions).length > 0 ? (
                    <div className="space-y-3">
                      {JSON.parse(product.packagingOptions).map((pkg: any, i: number) => (
                        <div key={i} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Package Type</p>
                              <p className="text-white font-medium">{pkg.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Package Size</p>
                              <p className="text-white font-medium">{pkg.size}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Per Container</p>
                              <p className="text-white font-medium">{pkg.packagesPerContainer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-700">
                      <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No packaging options configured</p>
                      <p className="text-sm text-gray-500 mt-1">Add packaging options in edit mode</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-semibold text-white mb-3">Packaging Features</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded"
                        />
                        <span className="text-gray-300">Custom packaging available</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded"
                        />
                        <span className="text-gray-300">Private labeling supported</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={false}
                          disabled
                          className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded"
                        />
                        <span className="text-gray-300">Bulk packaging only</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-semibold text-white mb-3">Labeling Options</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Custom labels:</span>
                        <span className="text-emerald-400 font-medium">Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Minimum order:</span>
                        <span className="text-white font-medium">{product.moq} {product.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lead time:</span>
                        <span className="text-white font-medium">
                          {product.vendorLeadTimeDays ? `${product.vendorLeadTimeDays} days` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <div className="flex gap-3">
                    <div className="text-blue-400 mt-1">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-300 mb-1">Packaging Information</h4>
                      <p className="text-sm text-gray-300">
                        All packaging options meet international export standards. Custom packaging and labeling 
                        services are available for bulk orders. Contact sales for specific requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vendors' && (
              <div className="space-y-6">
                {/* Primary Vendor Card */}
                {primaryVendor ? (
                  <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">{primaryVendor.vendorName}</h3>
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded border border-emerald-500/30">
                            Primary
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">Vendor Code: {primaryVendor.vendorCode}</p>
                      </div>
                      <button
                        onClick={() => router.push(`/admin/vendors/${primaryVendor.id}`)}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
                      >
                        View Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Contact Person</p>
                        <p className="text-white text-sm">{primaryVendor.contactPerson || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Email</p>
                        <p className="text-white text-sm">{primaryVendor.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Phone</p>
                        <p className="text-white text-sm">{primaryVendor.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Cost Price</p>
                        <p className="text-white text-sm font-medium">{product.currency} {product.costPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Lead Time</p>
                        <p className="text-white text-sm">{product.vendorLeadTimeDays ? `${product.vendorLeadTimeDays} days` : 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">MOQ</p>
                        <p className="text-white text-sm">{product.moq} {product.unit}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-gray-400">Vendor Product Code</p>
                          <p className="text-white text-sm font-medium">{product.vendorProductCode || 'Not assigned'}</p>
                        </div>
                        <button
                          onClick={() => router.push(`/admin/products/${params.id}/edit`)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm"
                        >
                          Change Vendor
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert('Purchase Order creation will be implemented in Purchase Order module')}
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                        >
                          Create Purchase Order
                        </button>
                        <button
                          onClick={() => router.push(`/admin/vendors/${primaryVendor.id}`)}
                          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm font-medium"
                        >
                          View Full Details
                        </button>
                      </div>
                    </div>
                  </div>
                ) : product.primaryVendorId ? (
                  <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 text-center">
                    <p className="text-gray-400">Loading vendor information...</p>
                  </div>
                ) : (
                  <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 text-center">
                    <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 mb-3">No primary vendor assigned</p>
                    <button
                      onClick={() => router.push(`/admin/products/${params.id}/edit`)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
                    >
                      Assign Vendor
                    </button>
                  </div>
                )}

                {/* Secondary Vendor Placeholder */}
                <div className="p-6 bg-gray-900 rounded-lg border border-gray-700 border-dashed">
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">Secondary Vendor</p>
                    <p className="text-sm text-gray-500 mb-3">Add a backup vendor for this product</p>
                    <button
                      onClick={() => router.push(`/admin/products/${params.id}/edit`)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
                    >
                      Add Secondary Vendor
                    </button>
                  </div>
                </div>

                {/* Vendor Performance */}
                {primaryVendor && (
                  <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Vendor Performance</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-emerald-400">
                          {primaryVendor.totalOrders || 0}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Total Orders</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">
                          {primaryVendor.onTimeDelivery || 95}%
                        </p>
                        <p className="text-xs text-gray-400 mt-1">On-Time Delivery</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-400">
                          {primaryVendor.qualityRating || 4.5}/5
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Quality Rating</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Quantity Sold</p>
                    <p className="text-2xl font-bold text-white">{product.totalQuantitySold}</p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">{product.currency} {product.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-center py-12 text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <p>Order history will be displayed here</p>
                  <p className="text-sm text-gray-500 mt-1">Integration with order management module required</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Total Sold</p>
                    <p className="text-2xl font-bold text-emerald-400">{product.totalQuantitySold} {product.stockUnit}</p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-400">{product.currency} {product.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {product.totalQuantitySold > 0 ? `${product.currency} ${(product.totalRevenue / product.totalQuantitySold).toFixed(2)}` : 'N/A'}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-1">Stock Value</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {product.currency} {(product.currentStock * product.costPrice).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Website Analytics (if published) */}
                {product.publishedOnWebsite && (
                  <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Website Analytics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-3xl font-bold text-blue-400">1,247</p>
                        <p className="text-xs text-gray-400 mt-1">Page Views</p>
                        <p className="text-xs text-emerald-400 mt-1">+12% this month</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-3xl font-bold text-yellow-400">34</p>
                        <p className="text-xs text-gray-400 mt-1">Inquiries</p>
                        <p className="text-xs text-emerald-400 mt-1">+5 this week</p>
                      </div>
                      <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="text-3xl font-bold text-emerald-400">23.5%</p>
                        <p className="text-xs text-gray-400 mt-1">Conversion Rate</p>
                        <p className="text-xs text-gray-500 mt-1">Inquiry to Order</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance Metrics */}
                <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Profit Margin</span>
                        <span className="text-white font-medium">{product.marginPercentage?.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(product.marginPercentage || 0, 100)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Stock Level</span>
                        <span className="text-white font-medium">
                          {product.maxStockLevel ? `${((product.currentStock / product.maxStockLevel) * 100).toFixed(0)}%` : 'N/A'}
                        </span>
                      </div>
                      {product.maxStockLevel && (
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((product.currentStock / product.maxStockLevel) * 100, 100)}%` }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Clients */}
                <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Clients</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Global Herbs Inc.', orders: 12, revenue: 45600, country: 'USA' },
                      { name: 'Natural Products Ltd.', orders: 8, revenue: 32400, country: 'UK' },
                      { name: 'Organic Traders', orders: 6, revenue: 24800, country: 'Germany' },
                    ].map((client, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white font-medium">{client.name}</p>
                          <p className="text-xs text-gray-400">{client.country}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{client.orders} orders</p>
                          <p className="text-xs text-emerald-400">{product.currency} {client.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Geographic Distribution</h3>
                  <div className="space-y-2">
                    {[
                      { region: 'North America', percentage: 45, color: 'bg-blue-500' },
                      { region: 'Europe', percentage: 30, color: 'bg-green-500' },
                      { region: 'Asia', percentage: 15, color: 'bg-yellow-500' },
                      { region: 'Others', percentage: 10, color: 'bg-purple-500' },
                    ].map((region, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{region.region}</span>
                          <span className="text-white font-medium">{region.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className={`${region.color} h-2 rounded-full`} style={{ width: `${region.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seasonal Demand Pattern */}
                <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Seasonal Demand Pattern</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { season: 'Q1', demand: 'High', color: 'text-emerald-400', bar: 85 },
                      { season: 'Q2', demand: 'Medium', color: 'text-yellow-400', bar: 60 },
                      { season: 'Q3', demand: 'Low', color: 'text-red-400', bar: 35 },
                      { season: 'Q4', demand: 'High', color: 'text-emerald-400', bar: 90 },
                    ].map((quarter, i) => (
                      <div key={i} className="text-center">
                        <div className="h-24 flex items-end justify-center mb-2">
                          <div className="w-full bg-gray-700 rounded-t" style={{ height: `${quarter.bar}%` }}>
                            <div className="w-full bg-emerald-500 rounded-t h-full"></div>
                          </div>
                        </div>
                        <p className="text-white font-medium text-sm">{quarter.season}</p>
                        <p className={`text-xs ${quarter.color}`}>{quarter.demand}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">SEO Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">SEO Title</p>
                      <p className="text-white">{product.seoTitle || 'Not set'}</p>
                      <p className="text-xs text-gray-500 mt-1">{(product.seoTitle || '').length}/60 characters</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Meta Description</p>
                      <p className="text-white">{product.metaDescription || 'Not set'}</p>
                      <p className="text-xs text-gray-500 mt-1">{(product.metaDescription || '').length}/160 characters</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Meta Keywords</p>
                      <p className="text-white">{product.metaKeywords || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">URL Slug</p>
                      <p className="text-white">{product.slug || 'Not set'}</p>
                      <p className="text-xs text-gray-500 mt-1">/products/{product.slug || 'product-slug'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-sm font-semibold text-white mb-3">Publishing Status</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Published on Website</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.publishedOnWebsite 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {product.publishedOnWebsite ? 'Published' : 'Unpublished'}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-sm font-semibold text-white mb-3">Search Engine Preview</h3>
                  <div className="space-y-1">
                    <div className="text-blue-500 text-lg">{product.seoTitle || product.productName}</div>
                    <div className="text-green-600 text-sm">https://yoursite.com/products/{product.slug || 'product-slug'}</div>
                    <div className="text-gray-400 text-sm">{product.metaDescription || product.shortDescription || 'Product description will appear here...'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stock Management Modal */}
        {showStockManagement && (
          <StockManagement
            product={product}
            onClose={() => setShowStockManagement(false)}
            onUpdate={fetchProduct}
          />
        )}

        {/* Pricing Management Modal */}
        {showPricingManagement && (
          <PricingManagement
            product={product}
            onClose={() => setShowPricingManagement(false)}
            onUpdate={fetchProduct}
          />
        )}
      </div>
    </div>
  );
}
