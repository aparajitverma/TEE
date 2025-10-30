'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Package, DollarSign, Calendar, Download, RefreshCw } from 'lucide-react';

interface ReportData {
  [key: string]: any;
}

export default function OrderReports() {
  const [reportType, setReportType] = useState('summary');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const fetchReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ type: reportType });
      if (dateRange.startDate) params.append('startDate', dateRange.startDate);
      if (dateRange.endDate) params.append('endDate', dateRange.endDate);

      const response = await fetch(`/api/orders/reports?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setReportData(data);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportType, dateRange]);

  const exportReport = () => {
    if (!reportData) return;
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-report-${reportType}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderSummaryReport = () => {
    if (!reportData?.data) return null;
    const { overview, topClients, topProducts, ordersByStatus } = reportData.data;

    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Orders</span>
              <Package className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">{overview.totalOrders}</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              ${overview.totalRevenue.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Avg Order Value</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              ${Math.round(overview.averageOrderValue).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Orders by Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <div key={status} className="bg-gray-900 rounded-lg p-4">
                <div className="text-gray-400 text-sm capitalize mb-1">{status}</div>
                <div className="text-2xl font-bold text-white">{count as number}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Top Clients by Revenue
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-2 text-gray-400 text-sm">Client</th>
                  <th className="text-right py-2 text-gray-400 text-sm">Orders</th>
                  <th className="text-right py-2 text-gray-400 text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {topClients.map((client: any, index: number) => (
                  <tr key={index}>
                    <td className="py-3 text-white">{client.name}</td>
                    <td className="py-3 text-right text-gray-300">{client.orders}</td>
                    <td className="py-3 text-right text-emerald-400 font-medium">
                      ${client.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            Top Products by Revenue
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-2 text-gray-400 text-sm">Product</th>
                  <th className="text-right py-2 text-gray-400 text-sm">Quantity</th>
                  <th className="text-right py-2 text-gray-400 text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {topProducts.map((product: any, index: number) => (
                  <tr key={index}>
                    <td className="py-3 text-white">{product.name}</td>
                    <td className="py-3 text-right text-gray-300">{product.quantity}</td>
                    <td className="py-3 text-right text-emerald-400 font-medium">
                      ${product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderByStatusReport = () => {
    if (!reportData?.data) return null;

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Orders by Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-2 text-gray-400 text-sm">Status</th>
                <th className="text-right py-2 text-gray-400 text-sm">Count</th>
                <th className="text-right py-2 text-gray-400 text-sm">Total Value</th>
                <th className="text-right py-2 text-gray-400 text-sm">Avg Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reportData.data.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="py-3 text-white">{item.status}</td>
                  <td className="py-3 text-right text-gray-300">{item.count}</td>
                  <td className="py-3 text-right text-emerald-400">
                    ${item.totalValue.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-gray-300">
                    ${Math.round(item.averageValue).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderByClientReport = () => {
    if (!reportData?.data) return null;

    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Orders by Client</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-2 text-gray-400 text-sm">Client</th>
                <th className="text-right py-2 text-gray-400 text-sm">Orders</th>
                <th className="text-right py-2 text-gray-400 text-sm">Total Revenue</th>
                <th className="text-right py-2 text-gray-400 text-sm">Avg Order Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reportData.data.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="py-3 text-white">{item.clientName}</td>
                  <td className="py-3 text-right text-gray-300">{item.orderCount}</td>
                  <td className="py-3 text-right text-emerald-400">
                    ${item.totalRevenue.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-gray-300">
                    ${Math.round(item.averageOrderValue).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPerformanceReport = () => {
    if (!reportData?.data) return null;
    const { data } = reportData;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Avg Fulfillment Time</div>
            <div className="text-3xl font-bold text-white">{data.averageFulfillmentTime} days</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">On-Time Delivery Rate</div>
            <div className="text-3xl font-bold text-emerald-400">{data.onTimeDeliveryRate}%</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Payment Collection Rate</div>
            <div className="text-3xl font-bold text-emerald-400">{data.paymentCollectionRate}%</div>
          </div>
        </div>
      </div>
    );
  };

  const renderConversionReport = () => {
    if (!reportData?.data) return null;
    const { data } = reportData;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Inquiry → Quote</div>
            <div className="text-3xl font-bold text-emerald-400">{data.inquiryToQuoteRate}%</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Quote → Order</div>
            <div className="text-3xl font-bold text-emerald-400">{data.quoteToOrderRate}%</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Inquiry → Order</div>
            <div className="text-3xl font-bold text-emerald-400">{data.inquiryToOrderRate}%</div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h3>
          <div className="space-y-4">
            {data.conversionFunnel.map((stage: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{stage.stage}</span>
                  <span className="text-white font-medium">{stage.count} ({Math.round(stage.percentage)}%)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Reports & Analytics</h2>
            <p className="text-gray-400">Comprehensive insights into your order data</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={fetchReport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="summary">Summary Report</option>
            <option value="by-status">Orders by Status</option>
            <option value="by-client">Orders by Client</option>
            <option value="by-product">Orders by Product</option>
            <option value="by-date-range">Orders by Date Range</option>
            <option value="revenue">Revenue Report</option>
            <option value="performance">Performance Metrics</option>
            <option value="conversion">Conversion Rate</option>
          </select>

          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="Start Date"
          />

          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Report Content */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading report...</div>
      ) : (
        <>
          {reportType === 'summary' && renderSummaryReport()}
          {reportType === 'by-status' && renderByStatusReport()}
          {reportType === 'by-client' && renderByClientReport()}
          {reportType === 'performance' && renderPerformanceReport()}
          {reportType === 'conversion' && renderConversionReport()}
          {['by-product', 'by-date-range', 'revenue'].includes(reportType) && reportData && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <pre className="text-gray-300 text-sm overflow-auto">
                {JSON.stringify(reportData, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
