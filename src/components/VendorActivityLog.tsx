'use client';

import { useState, useEffect } from 'react';
import {
  Activity,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  User,
  FileText,
  DollarSign,
  ShoppingCart,
  Upload,
  StickyNote,
  Edit,
  Plus,
  Trash2,
} from 'lucide-react';

interface ActivityLog {
  id: number;
  actionType: string;
  actionBy: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

interface VendorActivityLogProps {
  vendorId: number;
  vendorName: string;
}

export default function VendorActivityLog({ vendorId, vendorName }: VendorActivityLogProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const url = `/api/vendors/${vendorId}/activity-log${
        filter !== 'all' ? `?actionType=${filter}` : ''
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setLogs(data.logs);
        setStats(data.actionTypeStats || {});
      }
    } catch (error) {
      console.error('Error fetching activity log:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [vendorId, filter]);

  const exportLog = () => {
    const csvHeader = 'Date/Time,Action Type,User,Details\n';
    const csvRows = logs
      .map((log) => {
        const date = new Date(log.createdAt).toLocaleString();
        const details = log.details ? JSON.parse(log.details) : {};
        const detailsStr = Object.entries(details)
          .map(([k, v]) => `${k}: ${v}`)
          .join('; ');
        return `"${date}","${log.actionType}","${log.actionBy}","${detailsStr}"`;
      })
      .join('\n');

    const csv = csvHeader + csvRows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vendor-${vendorId}-activity-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getActionIcon = (actionType: string) => {
    const iconMap: Record<string, any> = {
      Created: Plus,
      Updated: Edit,
      'Order Placed': ShoppingCart,
      'Payment Received': DollarSign,
      'Document Uploaded': Upload,
      'Note Added': StickyNote,
      'Note Updated': Edit,
      'Note Deleted': Trash2,
      'Document Deleted': Trash2,
    };

    const Icon = iconMap[actionType] || Activity;
    return <Icon className="w-4 h-4" />;
  };

  const getActionColor = (actionType: string) => {
    const colorMap: Record<string, string> = {
      Created: 'text-green-400 bg-green-900/20',
      Updated: 'text-blue-400 bg-blue-900/20',
      'Order Placed': 'text-purple-400 bg-purple-900/20',
      'Payment Received': 'text-emerald-400 bg-emerald-900/20',
      'Document Uploaded': 'text-cyan-400 bg-cyan-900/20',
      'Note Added': 'text-yellow-400 bg-yellow-900/20',
      'Note Updated': 'text-blue-400 bg-blue-900/20',
      'Note Deleted': 'text-red-400 bg-red-900/20',
      'Document Deleted': 'text-red-400 bg-red-900/20',
    };

    return colorMap[actionType] || 'text-gray-400 bg-gray-900/20';
  };

  const formatDetails = (detailsStr?: string) => {
    if (!detailsStr) return null;

    try {
      const details = JSON.parse(detailsStr);
      return (
        <div className="mt-2 text-sm text-gray-400">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <span className="text-gray-500">{key}:</span>
              <span className="text-gray-300">{String(value)}</span>
            </div>
          ))}
        </div>
      );
    } catch {
      return <div className="mt-2 text-sm text-gray-400">{detailsStr}</div>;
    }
  };

  const actionTypes = [
    { value: 'all', label: 'All Actions', count: logs.length },
    { value: 'Created', label: 'Created', count: stats['Created'] || 0 },
    { value: 'Updated', label: 'Updated', count: stats['Updated'] || 0 },
    { value: 'Order Placed', label: 'Orders', count: stats['Order Placed'] || 0 },
    { value: 'Payment Received', label: 'Payments', count: stats['Payment Received'] || 0 },
    { value: 'Document Uploaded', label: 'Documents', count: stats['Document Uploaded'] || 0 },
    { value: 'Note Added', label: 'Notes', count: stats['Note Added'] || 0 },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading activity log...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Activity Log - {vendorName}</h3>
          <p className="text-gray-400 text-sm mt-1">{logs.length} activities recorded</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={exportLog}
            disabled={logs.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filter by Action Type</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {actionTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === type.value
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type.label}
              {type.count > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-gray-900 rounded-full text-xs">
                  {type.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      {logs.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Activity Found</h3>
          <p className="text-gray-400">
            {filter === 'all'
              ? 'No activities recorded for this vendor yet.'
              : `No activities of type "${filter}" found.`}
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={log.id} className="relative">
                {/* Timeline Line */}
                {index < logs.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-700" />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getActionColor(
                      log.actionType
                    )}`}
                  >
                    {getActionIcon(log.actionType)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-900 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium">{log.actionType}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {log.actionBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(log.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    {formatDetails(log.details)}

                    {/* Technical Info (collapsed by default) */}
                    {(log.ipAddress || log.userAgent) && (
                      <details className="mt-3">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                          Technical Details
                        </summary>
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                          {log.ipAddress && <div>IP: {log.ipAddress}</div>}
                          {log.userAgent && (
                            <div className="truncate">User Agent: {log.userAgent}</div>
                          )}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
