'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';

export default function VendorReports() {
  const [reportType, setReportType] = useState('top-vendors');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const reports = [
    { id: 'top-vendors', name: 'Top Vendors by Value', icon: TrendingUp },
    { id: 'performance-scorecard', name: 'Performance Scorecard', icon: BarChart3 },
    { id: 'product-supply-matrix', name: 'Product Supply Matrix', icon: FileText },
    { id: 'outstanding-payments', name: 'Outstanding Payments', icon: FileText },
    { id: 'addition-trend', name: 'Addition Trend', icon: TrendingUp },
    { id: 'inactive-vendors', name: 'Inactive Vendors', icon: FileText },
    { id: 'rating-distribution', name: 'Rating Distribution', icon: BarChart3 },
  ];

  const loadReport = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/reports?type=${type}`, {
        headers: {
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
      });
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error loading report:', error);
    }
    setLoading(false);
  };

  const handleReportChange = (type: string) => {
    setReportType(type);
    loadReport(type);
  };

  const exportToPDF = () => {
    window.print();
  };

  const exportToExcel = async () => {
    const response = await fetch(`/api/vendors/export?format=excel&type=${reportType}`, {
      headers: {
        'x-admin-auth': localStorage.getItem('adminAuth') || '',
        'x-admin-email': localStorage.getItem('adminEmail') || '',
      },
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vendor-report-${reportType}-${Date.now()}.xlsx`;
    a.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Vendor Reports & Analytics</h2>
        <div className="flex gap-2">
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => handleReportChange(report.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                reportType === report.id
                  ? 'border-emerald-500 bg-emerald-900/30'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-sm font-medium text-white">{report.name}</div>
            </button>
          );
        })}
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading report...</div>
        ) : reportData ? (
          <div className="text-white">
            <pre className="text-sm overflow-auto">{JSON.stringify(reportData, null, 2)}</pre>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">Select a report to view</div>
        )}
      </div>
    </div>
  );
}
