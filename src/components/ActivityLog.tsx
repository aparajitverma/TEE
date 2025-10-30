'use client';

import { useState } from 'react';
import { 
  Activity, UserPlus, Edit, RefreshCw, ShoppingCart, DollarSign, 
  MessageSquare, FileText, StickyNote, Download, Filter 
} from 'lucide-react';

interface LogEntry {
  id: number;
  actionType: string;
  description: string;
  performedBy: string;
  timestamp: string;
}

interface ActivityLogProps {
  clientId: number;
  clientName: string;
}

const ACTION_TYPES = [
  { value: 'All', label: 'All Actions', icon: Activity },
  { value: 'Client created', label: 'Client Created', icon: UserPlus },
  { value: 'Details updated', label: 'Details Updated', icon: Edit },
  { value: 'Status changed', label: 'Status Changed', icon: RefreshCw },
  { value: 'Order placed', label: 'Order Placed', icon: ShoppingCart },
  { value: 'Payment received', label: 'Payment Received', icon: DollarSign },
  { value: 'Communication logged', label: 'Communication', icon: MessageSquare },
  { value: 'Document uploaded', label: 'Document Uploaded', icon: FileText },
  { value: 'Note added', label: 'Note Added', icon: StickyNote },
];

export default function ActivityLog({ clientId, clientName }: ActivityLogProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      actionType: 'Client created',
      description: `Client "${clientName}" was created in the system`,
      performedBy: 'Admin',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [filterType, setFilterType] = useState('All');

  const getActionIcon = (actionType: string) => {
    const action = ACTION_TYPES.find(a => a.value === actionType);
    return action ? action.icon : Activity;
  };

  const getActionColor = (actionType: string) => {
    const colors: Record<string, string> = {
      'Client created': 'text-green-400',
      'Details updated': 'text-blue-400',
      'Status changed': 'text-purple-400',
      'Order placed': 'text-emerald-400',
      'Payment received': 'text-yellow-400',
      'Communication logged': 'text-cyan-400',
      'Document uploaded': 'text-orange-400',
      'Note added': 'text-pink-400',
    };
    return colors[actionType] || 'text-gray-400';
  };

  const filteredLogs = filterType === 'All' 
    ? logs 
    : logs.filter(log => log.actionType === filterType);

  const exportLog = () => {
    const csv = [
      ['Timestamp', 'Action Type', 'Description', 'Performed By'],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.actionType,
        log.description,
        log.performedBy,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity_log_${clientName}_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">Activity Log</h2>
        </div>
        <button
          onClick={exportLog}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
        >
          <Download className="w-4 h-4" />
          Export Log
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <label className="text-sm text-gray-400">Filter by Action Type</label>
        </div>
        <div className="flex flex-wrap gap-2">
          {ACTION_TYPES.map((action) => {
            const Icon = action.icon;
            const count = action.value === 'All' 
              ? logs.length 
              : logs.filter(l => l.actionType === action.value).length;
            
            return (
              <button
                key={action.value}
                onClick={() => setFilterType(action.value)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filterType === action.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
                <span className="px-1.5 py-0.5 bg-gray-900/50 rounded text-xs">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Timeline */}
      {filteredLogs.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No activities found for this filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log, index) => {
            const Icon = getActionIcon(log.actionType);
            const colorClass = getActionColor(log.actionType);
            
            return (
              <div key={log.id} className="relative">
                {/* Timeline line */}
                {index < filteredLogs.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-700"></div>
                )}
                
                {/* Activity card */}
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className={`font-medium ${colorClass}`}>{log.actionType}</h4>
                          <p className="text-white text-sm mt-1">{log.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                        <span>By {log.performedBy}</span>
                        <span>•</span>
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-400 text-sm">
          💡 <strong>Note:</strong> Activity log automatically tracks all actions performed on this client. 
          In production, this would be integrated with all CRUD operations.
        </p>
      </div>
    </div>
  );
}
