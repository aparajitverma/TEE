'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Loader2,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: string;
  price: number;
  stockStatus: string;
  status: string;
  syncStatus: string;
  lastSynced: string | null;
  websiteProductId: string | null;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function WebsiteProductsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSyncStatus, setFilterSyncStatus] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, [router, page, searchTerm, filterStatus, filterSyncStatus]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(filterStatus && { status: filterStatus }),
        ...(filterSyncStatus && { syncStatus: filterSyncStatus }),
      });

      const response = await fetch(`/api/website/products?${params}`);
      const data = await response.json();

      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!confirm('Import all products from website? This will scan your website and add all products to the admin system.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/website/products/import', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Import completed! ${data.productsCount} products and ${data.categoriesCount} categories imported.`);
        loadProducts();
      } else {
        alert('Import failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error importing products:', error);
      alert('Failed to import products');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (productIds?: number[]) => {
    try {
      setSyncing(true);
      const response = await fetch('/api/website/products/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productIds: productIds || selectedProducts,
          syncAll: !productIds && selectedProducts.length === 0,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Sync completed! ${data.synced} products synced successfully.`);
        loadProducts();
        setSelectedProducts([]);
      } else {
        alert('Sync failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error syncing products:', error);
      alert('Failed to sync products');
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/website/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully');
        loadProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const toggleSelectProduct = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const getSyncStatusBadge = (syncStatus: string) => {
    switch (syncStatus) {
      case 'synced':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded">
            <CheckCircle className="w-3 h-3" />
            Synced
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-900/30 text-amber-400 rounded">
            <AlertCircle className="w-3 h-3" />
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return (
          <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">
            Not Synced
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="text-xs px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded">Published</span>;
      case 'draft':
        return <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Draft</span>;
      case 'archived':
        return <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded">Archived</span>;
      default:
        return <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/website')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Package className="w-7 h-7 text-emerald-500" />
                Website Products Management
              </h1>
              <p className="text-gray-400">Manage products displayed on your website</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleImport}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Package className="w-5 h-5" />
              )}
              Import from Website
            </button>
            <button
              onClick={() => handleSync()}
              disabled={syncing}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {syncing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
              Sync All
            </button>
            <button
              onClick={() => router.push('/admin/website/products/new')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            {/* Sync Status Filter */}
            <select
              value={filterSyncStatus}
              onChange={(e) => setFilterSyncStatus(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
            >
              <option value="">All Sync Status</option>
              <option value="synced">Synced</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="not_synced">Not Synced</option>
            </select>

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <button
                onClick={() => handleSync(selectedProducts)}
                disabled={syncing}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4" />
                Sync Selected ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center p-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No products found</p>
              <button
                onClick={() => router.push('/admin/website/products/new')}
                className="mt-4 text-emerald-400 hover:text-emerald-300"
              >
                Add your first product
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-750 border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedProducts.length === products.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-emerald-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        SKU
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Sync Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Last Synced
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleSelectProduct(product.id)}
                            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-emerald-600"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || '/placeholder-product.png'}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium text-white">{product.name}</div>
                              <div className="text-xs text-gray-400">{product.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">{product.sku}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{product.category}</td>
                        <td className="px-4 py-3 text-sm text-white font-medium">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(product.status)}</td>
                        <td className="px-4 py-3">{getSyncStatusBadge(product.syncStatus)}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {product.lastSynced
                            ? new Date(product.lastSynced).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/website/products/${product.id}`)}
                              className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSync([product.id])}
                              disabled={syncing}
                              className="p-2 text-emerald-400 hover:bg-emerald-900/20 rounded transition-colors disabled:opacity-50"
                              title="Sync to Website"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-red-400 hover:bg-red-900/20 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
