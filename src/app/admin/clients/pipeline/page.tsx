'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Flame, DollarSign, TrendingUp, Eye } from 'lucide-react';

interface Lead {
  id: number;
  clientCode: string;
  companyName: string;
  contactPerson: string;
  emailPrimary: string;
  phonePrimary: string;
  leadStatus: string;
  leadTemperature: string | null;
  probabilityToClose: number | null;
  expectedOrderValue: number | null;
  lastContactDate: string | null;
}

const LEAD_STAGES = [
  { id: 'New', label: 'New Leads', color: 'bg-gray-500' },
  { id: 'Contacted', label: 'Contacted', color: 'bg-blue-500' },
  { id: 'Qualified', label: 'Qualified', color: 'bg-purple-500' },
  { id: 'Proposal Sent', label: 'Proposal Sent', color: 'bg-yellow-500' },
  { id: 'Negotiation', label: 'Negotiation', color: 'bg-orange-500' },
  { id: 'Won', label: 'Won', color: 'bg-green-500' },
  { id: 'Lost', label: 'Lost', color: 'bg-red-500' },
];

export default function LeadPipelinePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchLeads();
    }
  }, [router]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/clients?type=Lead');
      const data = await response.json();
      setLeads(data.clients || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.leadStatus === stage);
  };

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (stage: string) => {
    if (!draggedLead) return;

    try {
      const response = await fetch(`/api/clients/${draggedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadStatus: stage }),
      });

      if (response.ok) {
        // Update local state
        setLeads(leads.map(lead => 
          lead.id === draggedLead.id 
            ? { ...lead, leadStatus: stage }
            : lead
        ));
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    } finally {
      setDraggedLead(null);
    }
  };

  const getTemperatureColor = (temp: string | null) => {
    if (!temp) return 'text-gray-400';
    const colors: Record<string, string> = {
      'Hot': 'text-red-400',
      'Warm': 'text-orange-400',
      'Cold': 'text-blue-400',
    };
    return colors[temp] || 'text-gray-400';
  };

  const calculateStats = () => {
    const totalValue = leads.reduce((sum, lead) => sum + (lead.expectedOrderValue || 0), 0);
    const weightedValue = leads.reduce((sum, lead) => 
      sum + ((lead.expectedOrderValue || 0) * (lead.probabilityToClose || 0) / 100), 0
    );
    return {
      totalLeads: leads.length,
      totalValue,
      weightedValue,
      hotLeads: leads.filter(l => l.leadTemperature === 'Hot').length,
    };
  };

  const stats = calculateStats();

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/clients')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Lead Pipeline</h1>
              <p className="text-gray-400">Manage leads through sales stages</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/admin/clients/new')}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5" />
            Add Lead
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Leads</p>
                <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hot Leads</p>
                <p className="text-2xl font-bold text-white">{stats.hotLeads}</p>
              </div>
              <Flame className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pipeline Value</p>
                <p className="text-2xl font-bold text-white">${stats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Weighted Value</p>
                <p className="text-2xl font-bold text-white">${stats.weightedValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {LEAD_STAGES.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = stageLeads.reduce((sum, lead) => sum + (lead.expectedOrderValue || 0), 0);

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80 bg-gray-800 border border-gray-700 rounded-xl"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <h3 className="font-semibold text-white">{stage.label}</h3>
                    </div>
                    <span className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300">
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    ${stageValue.toLocaleString()}
                  </p>
                </div>

                {/* Lead Cards */}
                <div className="p-3 space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {stageLeads.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No leads in this stage
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={() => handleDragStart(lead)}
                        className="bg-gray-900 border border-gray-700 rounded-lg p-4 cursor-move hover:border-emerald-500 transition-colors"
                      >
                        {/* Lead Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-white mb-1">{lead.companyName}</h4>
                            <p className="text-sm text-gray-400">{lead.contactPerson}</p>
                          </div>
                          {lead.leadTemperature && (
                            <Flame className={`w-4 h-4 ${getTemperatureColor(lead.leadTemperature)}`} />
                          )}
                        </div>

                        {/* Lead Details */}
                        <div className="space-y-1 mb-3">
                          <p className="text-xs text-gray-500">{lead.emailPrimary}</p>
                          <p className="text-xs text-gray-500">{lead.phonePrimary}</p>
                        </div>

                        {/* Lead Metrics */}
                        <div className="flex items-center justify-between mb-3">
                          {lead.expectedOrderValue !== null && lead.expectedOrderValue > 0 && (
                            <div>
                              <p className="text-xs text-gray-400">Expected Value</p>
                              <p className="text-sm font-medium text-emerald-400">
                                ${lead.expectedOrderValue.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {lead.probabilityToClose !== null && (
                            <div>
                              <p className="text-xs text-gray-400">Probability</p>
                              <p className="text-sm font-medium text-white">
                                {lead.probabilityToClose}%
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Last Contact */}
                        {lead.lastContactDate && (
                          <p className="text-xs text-gray-500 mb-3">
                            Last contact: {new Date(lead.lastContactDate).toLocaleDateString()}
                          </p>
                        )}

                        {/* Actions */}
                        <button
                          onClick={() => router.push(`/admin/clients/${lead.id}`)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-400 text-sm">
            💡 <strong>Tip:</strong> Drag and drop lead cards between columns to update their status. 
            Click "View Details" to see complete lead information.
          </p>
        </div>
      </div>
    </div>
  );
}
