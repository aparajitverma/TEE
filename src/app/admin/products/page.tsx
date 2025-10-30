'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Package, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';
import ProductList from '@/components/ProductList';

export default function ProductsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, [router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Product Management</h1>
              <p className="text-gray-400">Manage products and inventory</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/admin/products/new')}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Products</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.activeProducts}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Low Stock</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.lowStock}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Out of Stock</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.outOfStock}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <ProductList onRefresh={fetchStats} />
      </div>
    </div>
  );
}
