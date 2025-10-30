'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Edit, Trash2, Eye, Package, AlertTriangle, Download, Filter, ArrowUpDown, CheckSquare, Square } from 'lucide-react';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  category: string;
  status: string;
  currentStock: number;
  stockUnit: string;
  reorderLevel: number | null;
  costPrice: number;
  sellingPrice: number;
  currency: string;
  marginPercentage: number | null;
  publishedOnWebsite?: boolean;
  primaryVendorId?: number | null;
}

interface ProductListProps {
  onRefresh?: () => void;
}

export default function ProductList({ onRefresh }: ProductListProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterStockStatus, setFilterStockStatus] = useState('all');
  const [filterPublished, setFilterPublished] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterCategory !== 'all') params.append('category', filterCategory);
      if (filterStatus !== 'all') params.append('status', filterStatus);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, filterCategory, filterStatus]);

  // Apply advanced filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Stock status filter
    if (filterStockStatus !== 'all') {
      filtered = filtered.filter(p => {
        if (filterStockStatus === 'in-stock') return p.currentStock > (p.reorderLevel || 0);
        if (filterStockStatus === 'low-stock') return p.reorderLevel && p.currentStock <= p.reorderLevel && p.currentStock > 0;
        if (filterStockStatus === 'out-of-stock') return p.currentStock === 0;
        return true;
      });
    }

    // Published filter
    if (filterPublished !== 'all') {
      filtered = filtered.filter(p => {
        if (filterPublished === 'published') return p.publishedOnWebsite === true;
        if (filterPublished === 'unpublished') return p.publishedOnWebsite === false;
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.productName.localeCompare(b.productName);
          break;
        case 'price':
          comparison = a.sellingPrice - b.sellingPrice;
          break;
        case 'stock':
          comparison = a.currentStock - b.currentStock;
          break;
        case 'margin':
          comparison = (a.marginPercentage || 0) - (b.marginPercentage || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  }, [products, filterStockStatus, filterPublished, sortBy, sortOrder]);

  const deleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting product:', error);
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

  const isLowStock = (product: Product) => {
    return product.reorderLevel && product.currentStock <= product.reorderLevel;
  };

  const getStockStatus = (product: Product) => {
    if (product.currentStock === 0) return 'Out of Stock';
    if (product.reorderLevel && product.currentStock <= product.reorderLevel) return 'Low Stock';
    return 'In Stock';
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const toggleSelectProduct = (id: number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedProducts.size} selected products?`)) return;
    try {
      await Promise.all(
        Array.from(selectedProducts).map(id => 
          fetch(`/api/products/${id}`, { method: 'DELETE' })
        )
      );
      setSelectedProducts(new Set());
      fetchProducts();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    try {
      await Promise.all(
        Array.from(selectedProducts).map(id => 
          fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          })
        )
      );
      setSelectedProducts(new Set());
      fetchProducts();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };

  const handleBulkPublish = async (publish: boolean) => {
    try {
      await Promise.all(
        Array.from(selectedProducts).map(id => 
          fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publishedOnWebsite: publish })
          })
        )
      );
      setSelectedProducts(new Set());
      fetchProducts();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };

  const exportToCSV = () => {
    const productsToExport = selectedProducts.size > 0 
      ? filteredProducts.filter(p => selectedProducts.has(p.id))
      : filteredProducts;
    const headers = ['Product Code', 'Product Name', 'Category', 'Status', 'Stock', 'Cost Price', 'Selling Price', 'Margin %'];
    const csvData = productsToExport.map(p => [
      p.productCode,
      p.productName,
      p.category,
      p.status,
      `${p.currentStock} ${p.stockUnit}`,
      `${p.currency} ${p.costPrice}`,
      `${p.currency} ${p.sellingPrice}`,
      p.marginPercentage?.toFixed(2) || '0'
    ]);

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `products_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    if (selectedProducts.size > 0) {
      setSelectedProducts(new Set());
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading products...</div>;
  }

  const displayProducts = filteredProducts;

  if (products.length === 0 && !searchTerm && filterCategory === 'all' && filterStatus === 'all') {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Products Yet</h3>
          <p className="text-gray-400 mb-4">
            Start by adding your first product to the catalog
          </p>
          <button
            onClick={() => router.push('/admin/products/new')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add First Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="Spices">Spices</option>
            <option value="Herbs">Herbs</option>
            <option value="Essential Oils">Essential Oils</option>
            <option value="Seeds">Seeds</option>
            <option value="Powders">Powders</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          >
            <Filter className="w-4 h-4" />
            {showAdvancedFilters ? 'Hide' : 'More'} Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <select
              value={filterStockStatus}
              onChange={(e) => setFilterStockStatus(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Published Status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="margin">Sort by Margin</option>
            </select>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.size > 0 && (
        <div className="bg-emerald-600 border border-emerald-500 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="text-white font-medium">
            {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm"
            >
              Bulk Actions
            </button>
            <button
              onClick={() => setSelectedProducts(new Set())}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Bulk Actions Menu */}
      {showBulkActions && selectedProducts.size > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <h3 className="text-white font-medium mb-3">Bulk Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handleBulkStatusUpdate('Active')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
            >
              Set Active
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Inactive')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm"
            >
              Set Inactive
            </button>
            <button
              onClick={() => handleBulkPublish(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkPublish(false)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm"
            >
              Unpublish
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
            >
              Export Selected
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        {displayProducts.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSelectAll}
                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                title={selectedProducts.size === displayProducts.length ? 'Deselect All' : 'Select All'}
              >
                {selectedProducts.size === displayProducts.length ? (
                  <CheckSquare className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
              <div className="text-sm text-gray-400">
                Showing {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
                {displayProducts.length !== products.length && ` (filtered from ${products.length})`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="w-4 h-4" />
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase w-12">
                  <input
                    type="checkbox"
                    checked={selectedProducts.size === displayProducts.length && displayProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded focus:ring-emerald-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Pricing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Margin</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {displayProducts.map((product) => (
                <tr key={product.id} className={`hover:bg-gray-750 ${selectedProducts.has(product.id) ? 'bg-emerald-900/20' : ''}`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                      className="w-4 h-4 text-emerald-600 bg-gray-800 border-gray-700 rounded focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{product.productName}</div>
                      <div className="text-sm text-gray-400">{product.productCode}</div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white">{product.currentStock} {product.stockUnit}</span>
                      {isLowStock(product) && (
                        <div title="Low Stock">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-400">Cost: {product.currency} {product.costPrice}</div>
                      <div className="text-white font-medium">Sell: {product.currency} {product.sellingPrice}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      (product.marginPercentage || 0) > 30 ? 'text-green-400' :
                      (product.marginPercentage || 0) > 15 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {product.marginPercentage?.toFixed(1) || '0'}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/products/${product.id}`)}
                        className="p-2 hover:bg-gray-700 rounded text-blue-400 hover:text-blue-300"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        className="p-2 hover:bg-gray-700 rounded text-emerald-400 hover:text-emerald-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
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
      </div>
    </>
  );
}
