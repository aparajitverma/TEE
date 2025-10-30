'use client';

import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  DollarSign,
  FileText,
  Clock,
  Cake,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

interface VendorAlert {
  vendorId: number;
  vendorName: string;
  vendorCode: string;
  alertType: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  details: any;
}

interface VendorAlertsProps {
  vendorId?: number;
  compact?: boolean;
}

export default function VendorAlerts({ vendorId, compact = false }: VendorAlertsProps) {
  const [alerts, setAlerts] = useState<VendorAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [expandedAlerts, setExpandedAlerts] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState<any>(null);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (vendorId) params.append('vendorId', vendorId.toString());
      if (filterType !== 'all') params.append('alertType', filterType);

      const response = await fetch(`/api/vendors/alerts?${params}`);
      const data = await response.json();

      if (data.success) {
        let filteredAlerts = data.alerts;
        
        // Apply severity filter
        if (filterSeverity !== 'all') {
          filteredAlerts = filteredAlerts.filter(
            (alert: VendorAlert) => alert.severity === filterSeverity
          );
        }

        setAlerts(filteredAlerts);
        setStats({
          total: data.totalAlerts,
          byType: data.alertsByType,
          bySeverity: data.alertsBySeverity,
        });
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Refresh alerts every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [vendorId, filterType, filterSeverity]);

  const dismissAlert = async (alert: VendorAlert) => {
    try {
      const response = await fetch('/api/vendors/alerts/dismiss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: alert.vendorId,
          alertType: alert.alertType,
          dismissedBy: 'Admin',
        }),
      });

      if (response.ok) {
        // Remove alert from list
        setAlerts(alerts.filter((a) => !(a.vendorId === alert.vendorId && a.alertType === alert.alertType)));
      }
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const toggleExpand = (alertKey: string) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(alertKey)) {
      newExpanded.delete(alertKey);
    } else {
      newExpanded.add(alertKey);
    }
    setExpandedAlerts(newExpanded);
  };

  const getAlertIcon = (alertType: string) => {
    const iconMap: Record<string, any> = {
      credit_limit: DollarSign,
      contract_renewal: FileText,
      contract_expired: FileText,
      inactive_vendor: Clock,
      birthday: Cake,
    };
    return iconMap[alertType] || AlertCircle;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-900/20 border-red-700 text-red-400';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-700 text-yellow-400';
      case 'info':
        return 'bg-blue-900/20 border-blue-700 text-blue-400';
      default:
        return 'bg-gray-900/20 border-gray-700 text-gray-400';
    }
  };

  const getAlertTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      credit_limit: 'Credit Limit Exceeded',
      contract_renewal: 'Contract Renewal',
      contract_expired: 'Contract Expired',
      inactive_vendor: 'Inactive Vendor',
      birthday: 'Birthday/Anniversary',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto mb-2" />
        <p className="text-gray-400 text-sm">Loading alerts...</p>
      </div>
    );
  }

  if (compact) {
    // Compact view for dashboard
    return (
      <div className="space-y-2">
        {alerts.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-sm">No alerts</div>
        ) : (
          alerts.slice(0, 5).map((alert, index) => {
            const Icon = getAlertIcon(alert.alertType);
            return (
              <Link
                key={`${alert.vendorId}-${alert.alertType}-${index}`}
                href={`/admin/vendors/${alert.vendorId}`}
                className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityColor(
                  alert.severity
                )} hover:opacity-80 transition-opacity`}
              >
                <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{alert.vendorName}</div>
                  <div className="text-xs opacity-80 mt-0.5">{alert.message}</div>
                </div>
              </Link>
            );
          })
        )}
        {alerts.length > 5 && (
          <Link
            href="/admin/vendors?tab=alerts"
            className="block text-center text-sm text-emerald-400 hover:text-emerald-300 py-2"
          >
            View all {alerts.length} alerts →
          </Link>
        )}
      </div>
    );
  }

  // Full view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Vendor Alerts & Reminders</h3>
          <p className="text-gray-400 text-sm mt-1">
            {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={fetchAlerts}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-sm text-gray-300">Critical</span>
            </div>
            <div className="text-3xl font-bold text-red-400">{stats.bySeverity.critical}</div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Warning</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{stats.bySeverity.warning}</div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">Info</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">{stats.bySeverity.info}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="credit_limit">Credit Limit</option>
            <option value="contract_renewal">Contract Renewal</option>
            <option value="inactive_vendor">Inactive Vendors</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Alerts</h3>
          <p className="text-gray-400">All vendors are in good standing!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.alertType);
            const alertKey = `${alert.vendorId}-${alert.alertType}-${index}`;
            const isExpanded = expandedAlerts.has(alertKey);

            return (
              <div
                key={alertKey}
                className={`border rounded-lg ${getSeverityColor(alert.severity)}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4" />
                          <span className="font-semibold">{getAlertTypeLabel(alert.alertType)}</span>
                        </div>
                        <Link
                          href={`/admin/vendors/${alert.vendorId}`}
                          className="text-white hover:underline font-medium"
                        >
                          {alert.vendorName} ({alert.vendorCode})
                        </Link>
                        <p className="text-sm mt-1">{alert.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleExpand(alertKey)}
                        className="p-2 hover:bg-gray-700/50 rounded transition-colors"
                        title="View details"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => dismissAlert(alert)}
                        className="p-2 hover:bg-gray-700/50 rounded transition-colors"
                        title="Dismiss alert"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <h5 className="text-sm font-semibold mb-2">Details:</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(alert.details).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-400">{key}:</span>{' '}
                            <span className="text-white">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
