'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Package, DollarSign, TrendingUp, Clock, LayoutGrid, List } from 'lucide-react';
import OrderList from '@/components/OrderList';
import OrderPipeline from '@/components/OrderPipeline';

export default function OrdersPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline');
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingQuotes: 0,
    inTransit: 0,
    monthRevenue: 0,
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
      const response = await fetch('/api/orders');
      const data = await response.json();
      const orders = data.orders || [];
      
      setStats({
        totalOrders: orders.filter((o: any) => o.orderStatus !== 'Cancelled').length,
        pendingQuotes: orders.filter((o: any) => o.orderStatus === 'Quoted').length,
        inTransit: orders.filter((o: any) => o.orderStatus === 'Shipped').length,
        monthRevenue: orders
          .filter((o: any) => {
            const orderDate = new Date(o.orderDate);
            const now = new Date();
            return orderDate.getMonth() === now.getMonth() && 
                   orderDate.getFullYear() === now.getFullYear();
          })
          .reduce((sum: number, o: any) => sum + o.totalAmount, 0),
      });
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Order Management</h1>
              <p className="text-gray-400">Track orders from inquiry to delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg p-1">
              <button
                onClick={() => setView('pipeline')}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  view === 'pipeline'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Pipeline
              </button>
              <button
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                  view === 'list'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
            <button
              onClick={() => router.push('/admin/orders/new')}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              <Plus className="w-5 h-5" />
              New Order
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Active Orders</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Quotes</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.pendingQuotes}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Transit</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.inTransit}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month's Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ${stats.monthRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders View */}
        {view === 'pipeline' ? (
          <OrderPipeline onRefresh={fetchStats} />
        ) : (
          <OrderList onRefresh={fetchStats} />
        )}
      </div>
    </div>
  );
}
