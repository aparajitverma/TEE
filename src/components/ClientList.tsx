'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Edit, Trash2, Eye, Users, Download } from 'lucide-react';

interface Client {
  id: number;
  clientCode: string;
  clientType: string;
  companyName: string;
  contactPerson: string;
  emailPrimary: string;
  phonePrimary: string;
  country: string | null;
  industry: string | null;
  status: string;
  leadTemperature: string | null;
  totalOrders: number;
  totalRevenue: number;
  lastContactDate: string | null;
}

interface ClientListProps {
  onRefresh?: () => void;
  viewFilter?: string;
}

export default function ClientList({ onRefresh, viewFilter = 'all' }: ClientListProps) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const fetchClients = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterType !== 'all') params.append('type', filterType);
      if (filterStatus !== 'all') params.append('status', filterStatus);

      const response = await fetch(`/api/clients?${params.toString()}`);
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [searchTerm, filterType, filterStatus]);

  useEffect(() => {
    // Apply view filter
    let filtered = clients;
    
    switch (viewFilter) {
      case 'active':
        filtered = clients.filter(c => c.clientType === 'Active Client' && c.status === 'Active');
        break;
      case 'leads':
        filtered = clients.filter(c => c.clientType === 'Lead' || c.clientType === 'Prospect');
        break;
      case 'inactive':
        filtered = clients.filter(c => c.status === 'Inactive' || c.clientType === 'Inactive Client');
        break;
      default: // 'all'
        filtered = clients;
    }

    // Apply additional filters
    if (filterCountry !== 'all') {
      filtered = filtered.filter(c => c.country === filterCountry);
    }
    
    if (filterIndustry !== 'all') {
      filtered = filtered.filter(c => c.industry === filterIndustry);
    }
    
    setFilteredClients(filtered);
  }, [clients, viewFilter, filterCountry, filterIndustry]);

  const deleteClient = async (id: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      fetchClients();
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Lead': 'bg-yellow-500/20 text-yellow-400',
      'Prospect': 'bg-blue-500/20 text-blue-400',
      'Active Client': 'bg-green-500/20 text-green-400',
      'Inactive Client': 'bg-gray-500/20 text-gray-400',
    };
    return colors[type] || colors['Lead'];
  };

  const getTemperatureBadge = (temp: string | null) => {
    if (!temp) return '';
    const colors: Record<string, string> = {
      'Hot': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Warm': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Cold': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return colors[temp] || '';
  };

  const exportToCSV = () => {
    const headers = ['Client Code', 'Company', 'Contact Person', 'Email', 'Phone', 'Country', 'Type', 'Status', 'Total Orders', 'Total Revenue'];
    const csvData = filteredClients.map(c => [
      c.clientCode,
      c.companyName,
      c.contactPerson,
      c.emailPrimary,
      c.phonePrimary,
      c.country || '',
      c.clientType,
      c.status,
      c.totalOrders,
      c.totalRevenue
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clients_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading clients...</div>;
  }

  if (filteredClients.length === 0 && !searchTerm && filterType === 'all' && filterStatus === 'all') {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-sm">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Clients Yet</h3>
          <p className="text-gray-400 mb-4">
            Start by adding your first client or lead
          </p>
          <button
            onClick={() => router.push('/admin/clients/new')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            <Users className="w-5 h-5" />
            Add First Client
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="Lead">Lead</option>
            <option value="Prospect">Prospect</option>
            <option value="Active Client">Active Client</option>
            <option value="Inactive Client">Inactive Client</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          {showAdvancedFilters ? '− Hide' : '+ Show'} Advanced Filters
        </button>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Countries</option>
              {Array.from(new Set(clients.map(c => c.country).filter(Boolean))).sort().map(country => (
                <option key={country as string} value={country as string}>{country}</option>
              ))}
            </select>
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Industries</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Food Service">Food Service</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Technology">Technology</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>

      {/* Clients Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        {filteredClients.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{client.companyName}</div>
                      <div className="text-sm text-gray-400">{client.clientCode}</div>
                      {client.leadTemperature && (
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium border ${getTemperatureBadge(client.leadTemperature)}`}>
                          {client.leadTemperature}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-white">{client.contactPerson}</div>
                      <a href={`mailto:${client.emailPrimary}`} className="text-emerald-400 hover:text-emerald-300 text-xs">
                        {client.emailPrimary}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{client.country || '-'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(client.clientType)}`}>
                      {client.clientType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{client.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      ${client.totalRevenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/clients/${client.id}`)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-emerald-400 hover:text-emerald-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/admin/clients/${client.id}/edit`)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg text-red-400 hover:text-red-300"
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
