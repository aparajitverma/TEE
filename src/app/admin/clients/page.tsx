'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Users, TrendingUp, Flame, DollarSign, LayoutGrid } from 'lucide-react';
import ClientList from '@/components/ClientList';

export default function ClientsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('all');
  const [stats, setStats] = useState({
    totalClients: 0,
    newLeads: 0,
    hotLeads: 0,
    lifetimeValue: 0,
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
      const response = await fetch('/api/clients');
      const data = await response.json();
      const clients = data.clients || [];
      
      const now = new Date();
      const thisMonth = clients.filter((c: any) => {
        const added = new Date(c.dateAdded);
        return added.getMonth() === now.getMonth() && 
               added.getFullYear() === now.getFullYear();
      });

      setStats({
        totalClients: clients.filter((c: any) => c.clientType === 'Active Client').length,
        newLeads: thisMonth.filter((c: any) => c.clientType === 'Lead').length,
        hotLeads: clients.filter((c: any) => c.leadTemperature === 'Hot').length,
        lifetimeValue: clients.reduce((sum: number, c: any) => sum + (c.totalRevenue || 0), 0),
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
              <h1 className="text-2xl font-bold text-white">Client Management</h1>
              <p className="text-gray-400">Manage clients and leads</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/clients/pipeline')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <LayoutGrid className="w-5 h-5" />
              Pipeline View
            </button>
            <button
              onClick={() => router.push('/admin/clients/new')}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              <Plus className="w-5 h-5" />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Active Clients</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Leads This Month</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.newLeads}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hot Leads</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.hotLeads}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Lifetime Value</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ${stats.lifetimeValue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex items-center gap-2 mb-6 bg-gray-800 border border-gray-700 rounded-xl p-2">
          <button
            onClick={() => setActiveView('all')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'all'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            All Clients
          </button>
          <button
            onClick={() => setActiveView('active')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'active'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Active Clients
          </button>
          <button
            onClick={() => setActiveView('leads')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'leads'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Leads/Prospects
          </button>
          <button
            onClick={() => setActiveView('inactive')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'inactive'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Inactive
          </button>
        </div>

        {/* Client List */}
        <ClientList onRefresh={fetchStats} viewFilter={activeView} />
      </div>
    </div>
  );
}
