'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Lock, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet,
  Download,
  Search,
  Filter,
  Calendar,
  FileText
} from 'lucide-react';
import AddPaymentModal from '@/components/payments/AddPaymentModal';
import AddUnofficialExpenseModal from '@/components/payments/AddUnofficialExpenseModal';
import ViewUnofficialExpenseModal from '@/components/payments/ViewUnofficialExpenseModal';
import AddBankAccountModal from '@/components/payments/AddBankAccountModal';
import BankReconciliationModal from '@/components/payments/BankReconciliationModal';

type Tab = 'received' | 'expenses' | 'unofficial' | 'bank-accounts' | 'reports';

export default function PaymentsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('received');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'received' | 'made'>('received');
  const [paymentsReceived, setPaymentsReceived] = useState<any[]>([]);
  const [paymentsMade, setPaymentsMade] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    bankBalance: 0,
  });
  const [unofficialExpenses, setUnofficialExpenses] = useState<any[]>([]);
  const [unofficialPassword, setUnofficialPassword] = useState('');
  const [isUnofficialUnlocked, setIsUnofficialUnlocked] = useState(false);
  const [unofficialLoading, setUnofficialLoading] = useState(false);
  const [showUnofficialModal, setShowUnofficialModal] = useState(false);
  const [selectedUnofficialExpense, setSelectedUnofficialExpense] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBankAccountModal, setShowBankAccountModal] = useState(false);
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadData();
    }
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load payments received
      const receivedRes = await fetch('/api/payments/received');
      const receivedData = await receivedRes.json();
      setPaymentsReceived(receivedData.payments || []);

      // Load payments made
      const madeRes = await fetch('/api/payments/made');
      const madeData = await madeRes.json();
      setPaymentsMade(madeData.expenses || []);

      // Load bank accounts
      const bankRes = await fetch('/api/payments/bank-accounts');
      const bankData = await bankRes.json();
      setBankAccounts(bankData.accounts || []);

      // Calculate stats
      setStats({
        totalIncome: receivedData.total || 0,
        totalExpenses: madeData.total || 0,
        netProfit: (receivedData.total || 0) - (madeData.total || 0),
        bankBalance: bankData.totalBalance || 0,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const loadUnofficialExpenses = async () => {
    if (!unofficialPassword) {
      alert('Please enter password');
      return;
    }

    setUnofficialLoading(true);
    try {
      const res = await fetch(`/api/payments/unofficial?password=${encodeURIComponent(unofficialPassword)}`);
      
      if (res.status === 401) {
        alert('Invalid password');
        setUnofficialPassword('');
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setUnofficialExpenses(data.expenses || []);
        setIsUnofficialUnlocked(true);
      } else {
        alert('Failed to load unofficial expenses');
      }
    } catch (error) {
      console.error('Error loading unofficial expenses:', error);
      alert('Failed to load unofficial expenses');
    } finally {
      setUnofficialLoading(false);
    }
  };

  const calculateUnofficialStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthExpenses = unofficialExpenses.filter(e => {
      const expenseDate = new Date(e.expenseDate);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const currentYearExpenses = unofficialExpenses.filter(e => {
      const expenseDate = new Date(e.expenseDate);
      return expenseDate.getFullYear() === currentYear;
    });

    const categoryBreakdown: Record<string, number> = {};
    unofficialExpenses.forEach(expense => {
      if (!categoryBreakdown[expense.category]) {
        categoryBreakdown[expense.category] = 0;
      }
      categoryBreakdown[expense.category] += expense.amountInInr;
    });

    return {
      currentMonth: currentMonthExpenses.reduce((sum, e) => sum + e.amountInInr, 0),
      currentYear: currentYearExpenses.reduce((sum, e) => sum + e.amountInInr, 0),
      categoryBreakdown,
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Financial Management</h1>
              <p className="text-gray-400">Track income, expenses, and financial reports</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setModalType('received');
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Record Payment
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Income</span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalIncome)}</div>
            <div className="text-xs text-gray-500 mt-1">Current month</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Expenses</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalExpenses)}</div>
            <div className="text-xs text-gray-500 mt-1">Official only</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Net Profit</span>
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div className={`text-2xl font-bold ${stats.netProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {formatCurrency(stats.netProfit)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Official calculation</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Bank Balance</span>
              <Wallet className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.bankBalance)}</div>
            <div className="text-xs text-gray-500 mt-1">All accounts</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('received')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'received'
                  ? 'bg-gray-700 text-white border-b-2 border-emerald-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-750'
              }`}
            >
              Payments Received
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'expenses'
                  ? 'bg-gray-700 text-white border-b-2 border-emerald-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-750'
              }`}
            >
              Expenses (Official)
            </button>
            <button
              onClick={() => setActiveTab('unofficial')}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'unofficial'
                  ? 'bg-gray-700 text-white border-b-2 border-amber-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-750'
              }`}
            >
              <Lock className="w-4 h-4" />
              Unofficial Expenses
            </button>
            <button
              onClick={() => setActiveTab('bank-accounts')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'bank-accounts'
                  ? 'bg-gray-700 text-white border-b-2 border-emerald-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-750'
              }`}
            >
              Bank Accounts
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'reports'
                  ? 'bg-gray-700 text-white border-b-2 border-emerald-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-750'
              }`}
            >
              Reports
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : (
              <>
                {/* Payments Received Tab */}
                {activeTab === 'received' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search payments..."
                          className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <Download className="w-5 h-5" />
                        Export
                      </button>
                    </div>

                    {paymentsReceived.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        No payments received yet. Click "Record Payment" to add one.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                              <th className="pb-3">Date</th>
                              <th className="pb-3">Payment #</th>
                              <th className="pb-3">Client</th>
                              <th className="pb-3">Order #</th>
                              <th className="pb-3">Amount</th>
                              <th className="pb-3">Method</th>
                              <th className="pb-3">Status</th>
                              <th className="pb-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentsReceived.map((payment) => (
                              <tr key={payment.id} className="border-b border-gray-700 hover:bg-gray-750">
                                <td className="py-3 text-white">{formatDate(payment.paymentDate)}</td>
                                <td className="py-3 text-white">{payment.paymentNumber}</td>
                                <td className="py-3 text-white">{payment.clientName}</td>
                                <td className="py-3 text-gray-400">{payment.orderNumber || '-'}</td>
                                <td className="py-3 text-emerald-400 font-medium">{formatCurrency(payment.amountInInr)}</td>
                                <td className="py-3 text-gray-400">{payment.paymentMethod}</td>
                                <td className="py-3">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    payment.status === 'Cleared' ? 'bg-emerald-900/30 text-emerald-400' :
                                    payment.status === 'Received' ? 'bg-blue-900/30 text-blue-400' :
                                    payment.status === 'Bounced' ? 'bg-red-900/30 text-red-400' :
                                    'bg-gray-700 text-gray-400'
                                  }`}>
                                    {payment.status}
                                  </span>
                                </td>
                                <td className="py-3">
                                  <button className="text-emerald-400 hover:text-emerald-300 text-sm">View</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Expenses Tab */}
                {activeTab === 'expenses' && (
                  <div>
                    {/* Expense Categories Quick View */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                      {[
                        { name: 'Vendor Payments', color: 'blue', icon: '🏭' },
                        { name: 'Salaries & Wages', color: 'purple', icon: '👥' },
                        { name: 'Rent & Utilities', color: 'orange', icon: '🏢' },
                        { name: 'Transport & Logistics', color: 'green', icon: '🚚' },
                        { name: 'Marketing & Advertising', color: 'pink', icon: '📢' },
                        { name: 'Office Supplies', color: 'yellow', icon: '📎' },
                        { name: 'Professional Fees', color: 'indigo', icon: '💼' },
                        { name: 'Taxes', color: 'red', icon: '📊' },
                        { name: 'Other', color: 'gray', icon: '📋' },
                      ].map((category) => {
                        const categoryExpenses = paymentsMade.filter(
                          e => e.expenseCategory === category.name
                        );
                        const categoryTotal = categoryExpenses.reduce(
                          (sum, e) => sum + e.amountInInr, 0
                        );
                        
                        return (
                          <button
                            key={category.name}
                            className="bg-gray-700 border border-gray-600 rounded-lg p-3 hover:bg-gray-650 transition-colors text-left"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{category.icon}</span>
                              <span className={`text-xs px-2 py-0.5 rounded bg-${category.color}-900/30 text-${category.color}-400`}>
                                {categoryExpenses.length}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mb-1">{category.name}</div>
                            <div className="text-sm font-semibold text-white">
                              {formatCurrency(categoryTotal)}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search expenses..."
                          className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setModalType('made');
                            setShowAddModal(true);
                          }}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                          Add Expense
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                          <Download className="w-5 h-5" />
                          Export
                        </button>
                      </div>
                    </div>

                    {paymentsMade.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        No expenses recorded yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                              <th className="pb-3">Date</th>
                              <th className="pb-3">Expense #</th>
                              <th className="pb-3">Category</th>
                              <th className="pb-3">Payee</th>
                              <th className="pb-3">Amount</th>
                              <th className="pb-3">Method</th>
                              <th className="pb-3">Tax Deductible</th>
                              <th className="pb-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymentsMade.map((expense) => (
                              <tr key={expense.id} className="border-b border-gray-700 hover:bg-gray-750">
                                <td className="py-3 text-white">{formatDate(expense.expenseDate)}</td>
                                <td className="py-3 text-white">{expense.expenseNumber}</td>
                                <td className="py-3">
                                  <span className="px-2 py-1 rounded text-xs bg-blue-900/30 text-blue-400">
                                    {expense.expenseCategory}
                                  </span>
                                </td>
                                <td className="py-3 text-white">{expense.payeeName}</td>
                                <td className="py-3 text-red-400 font-medium">{formatCurrency(expense.amountInInr)}</td>
                                <td className="py-3 text-gray-400">{expense.paymentMethod}</td>
                                <td className="py-3 text-center">
                                  {expense.taxDeductible ? (
                                    <span className="text-emerald-400">✓</span>
                                  ) : (
                                    <span className="text-gray-600">-</span>
                                  )}
                                </td>
                                <td className="py-3">
                                  <button className="text-emerald-400 hover:text-emerald-300 text-sm">View</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Unofficial Expenses Tab */}
                {activeTab === 'unofficial' && (
                  <div>
                    {/* Warning Banner */}
                    <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-amber-400 font-semibold mb-1">⚠️ Secure Section</h3>
                          <p className="text-amber-300 text-sm mb-2">
                            This section contains sensitive information. Access is logged.
                          </p>
                          <p className="text-amber-400 text-xs font-medium">
                            🚫 Do not share screen while viewing this section.
                          </p>
                        </div>
                      </div>
                    </div>

                    {!isUnofficialUnlocked ? (
                      /* Password Gate */
                      <div className="max-w-md mx-auto">
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-8 text-center">
                          <Lock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-white mb-2">Password Required</h3>
                          <p className="text-gray-400 mb-6">
                            Enter password to access unofficial expenses
                          </p>
                          <div className="space-y-4">
                            <input
                              type="password"
                              value={unofficialPassword}
                              onChange={(e) => setUnofficialPassword(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && loadUnofficialExpenses()}
                              placeholder="Enter password"
                              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                            />
                            <button
                              onClick={loadUnofficialExpenses}
                              disabled={unofficialLoading}
                              className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                              {unofficialLoading ? 'Verifying...' : 'Unlock'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Unlocked Content */
                      <div>
                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {(() => {
                            const stats = calculateUnofficialStats();
                            return (
                              <>
                                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                                  <div className="text-sm text-gray-400 mb-1">Current Month</div>
                                  <div className="text-2xl font-bold text-amber-400">
                                    {formatCurrency(stats.currentMonth)}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {unofficialExpenses.filter(e => {
                                      const expenseDate = new Date(e.expenseDate);
                                      return expenseDate.getMonth() === new Date().getMonth();
                                    }).length} expenses
                                  </div>
                                </div>
                                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                                  <div className="text-sm text-gray-400 mb-1">Current Year</div>
                                  <div className="text-2xl font-bold text-amber-400">
                                    {formatCurrency(stats.currentYear)}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {unofficialExpenses.filter(e => {
                                      const expenseDate = new Date(e.expenseDate);
                                      return expenseDate.getFullYear() === new Date().getFullYear();
                                    }).length} expenses
                                  </div>
                                </div>
                                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                                  <div className="text-sm text-gray-400 mb-1">Top Category</div>
                                  <div className="text-lg font-bold text-amber-400">
                                    {Object.keys(stats.categoryBreakdown).length > 0
                                      ? Object.entries(stats.categoryBreakdown).sort((a, b) => b[1] - a[1])[0][0]
                                      : 'N/A'}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {Object.keys(stats.categoryBreakdown).length > 0
                                      ? formatCurrency(Object.entries(stats.categoryBreakdown).sort((a, b) => b[1] - a[1])[0][1])
                                      : '₹0'}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        {/* Category Breakdown */}
                        <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 mb-6">
                          <h4 className="text-white font-semibold mb-3">Breakdown by Category</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(calculateUnofficialStats().categoryBreakdown).map(([category, amount]) => (
                              <div key={category} className="bg-gray-800 rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">{category}</div>
                                <div className="text-sm font-semibold text-amber-400">
                                  {formatCurrency(amount)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add Expense Button */}
                        <div className="mb-4">
                          <button
                            onClick={() => setShowUnofficialModal(true)}
                            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                            Add Unofficial Expense
                          </button>
                        </div>

                        {/* Expenses Table */}
                        {unofficialExpenses.length === 0 ? (
                          <div className="text-center py-12 text-gray-400">
                            No unofficial expenses recorded yet.
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                                  <th className="pb-3">Date</th>
                                  <th className="pb-3">Code</th>
                                  <th className="pb-3">Category</th>
                                  <th className="pb-3">Amount</th>
                                  <th className="pb-3">Purpose</th>
                                  <th className="pb-3">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {unofficialExpenses.map((expense) => (
                                  <tr key={expense.id} className="border-b border-gray-700 hover:bg-gray-750">
                                    <td className="py-3 text-white">{formatDate(expense.expenseDate)}</td>
                                    <td className="py-3 text-amber-400 font-mono">{expense.expenseCode}</td>
                                    <td className="py-3">
                                      <span className="px-2 py-1 rounded text-xs bg-amber-900/30 text-amber-400">
                                        {expense.category}
                                      </span>
                                    </td>
                                    <td className="py-3 text-amber-400 font-medium">
                                      {formatCurrency(expense.amountInInr)}
                                    </td>
                                    <td className="py-3 text-gray-400 max-w-xs truncate">
                                      {expense.purpose?.substring(0, 50)}...
                                    </td>
                                    <td className="py-3">
                                      <button 
                                        onClick={() => {
                                          setSelectedUnofficialExpense(expense);
                                          setShowViewModal(true);
                                        }}
                                        className="text-amber-400 hover:text-amber-300 text-sm"
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Lock Button */}
                        <div className="mt-6 text-center">
                          <button
                            onClick={() => {
                              setIsUnofficialUnlocked(false);
                              setUnofficialPassword('');
                              setUnofficialExpenses([]);
                            }}
                            className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-2 mx-auto"
                          >
                            <Lock className="w-4 h-4" />
                            Lock Section
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bank Accounts Tab */}
                {activeTab === 'bank-accounts' && (
                  <div>
                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setShowBankAccountModal(true)}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Add Bank Account
                      </button>
                      <button
                        onClick={() => setShowReconciliationModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FileText className="w-5 h-5" />
                        Bank Reconciliation
                      </button>
                    </div>

                    {bankAccounts.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        No bank accounts added yet. Click "Add Bank Account" to get started.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bankAccounts.map((account) => (
                          <div key={account.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-white font-semibold">{account.accountName}</h3>
                              <span className={`px-2 py-1 rounded text-xs ${
                                account.status === 'Active' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-gray-600 text-gray-400'
                              }`}>
                                {account.status}
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Bank:</span>
                                <span className="text-white">{account.bankName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Account Type:</span>
                                <span className="text-white">{account.accountType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Currency:</span>
                                <span className="text-white">{account.currency}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                                <span className="text-gray-400">Current Balance:</span>
                                <span className="text-emerald-400 font-semibold text-lg">
                                  {formatCurrency(account.currentBalance)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Reports Tab */}
                {activeTab === 'reports' && (
                  <div className="space-y-6">
                    {/* Profit & Loss Statement */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <FileText className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">Profit & Loss Statement</h3>
                          <p className="text-gray-400 text-sm mb-4">Generate comprehensive P&L report with optional unofficial expenses</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                              <input
                                type="date"
                                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm"
                                defaultValue={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">End Date</label>
                              <input
                                type="date"
                                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm"
                                defaultValue={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-4 p-3 bg-amber-900/20 border border-amber-700/50 rounded">
                            <input
                              type="checkbox"
                              id="includeUnofficial"
                              className="w-4 h-4"
                            />
                            <label htmlFor="includeUnofficial" className="text-sm text-amber-400 flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Include unofficial expenses (requires password)
                            </label>
                          </div>

                          <div className="flex gap-3">
                            <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                              Generate Report
                            </button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-750 transition-colors text-sm flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Export PDF
                            </button>
                            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-750 transition-colors text-sm flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Export Excel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cash Flow Statement */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <TrendingUp className="w-8 h-8 text-blue-500 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">Cash Flow Statement</h3>
                          <p className="text-gray-400 text-sm mb-4">Track cash in vs cash out with visual charts</p>
                          
                          <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2">Period</label>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Monthly</button>
                              <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded text-sm hover:bg-gray-750">Quarterly</button>
                              <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded text-sm hover:bg-gray-750">Yearly</button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-800 rounded">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Cash In</div>
                              <div className="text-lg font-bold text-emerald-400">{formatCurrency(stats.totalIncome)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Cash Out</div>
                              <div className="text-lg font-bold text-red-400">{formatCurrency(stats.totalExpenses)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Net Cash Flow</div>
                              <div className={`text-lg font-bold ${stats.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {formatCurrency(stats.netProfit)}
                              </div>
                            </div>
                          </div>

                          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Generate Cash Flow Report
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expense Breakdown */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <DollarSign className="w-8 h-8 text-purple-500 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">Expense Breakdown</h3>
                          <p className="text-gray-400 text-sm mb-4">Analyze expenses by category with charts</p>
                          
                          <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2">View Type</label>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-purple-600 text-white rounded text-sm">By Category</button>
                              <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded text-sm hover:bg-gray-750">By Month</button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-4 p-3 bg-amber-900/20 border border-amber-700/50 rounded">
                            <input
                              type="checkbox"
                              id="includeUnofficialExpenses"
                              className="w-4 h-4"
                            />
                            <label htmlFor="includeUnofficialExpenses" className="text-sm text-amber-400 flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Include unofficial expenses (password protected)
                            </label>
                          </div>

                          <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                            Generate Expense Breakdown
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Client Payment Report */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Wallet className="w-8 h-8 text-cyan-500 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">Client Payment Report</h3>
                          <p className="text-gray-400 text-sm mb-4">Track outstanding payments and collection rates</p>
                          
                          <button className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors text-sm">
                            Generate Client Report
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Tax Report */}
                    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Calendar className="w-8 h-8 text-amber-500 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">Tax Report</h3>
                          <p className="text-gray-400 text-sm mb-4">Export tax-ready reports for accountant</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Financial Year</label>
                              <select className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm">
                                <option>2024-2025</option>
                                <option>2023-2024</option>
                                <option>2022-2023</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">Quarter</label>
                              <select className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm">
                                <option>Q1 (Apr-Jun)</option>
                                <option>Q2 (Jul-Sep)</option>
                                <option>Q3 (Oct-Dec)</option>
                                <option>Q4 (Jan-Mar)</option>
                              </select>
                            </div>
                          </div>

                          <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm">
                            Generate Tax Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Add Payment Modal */}
        <AddPaymentModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={loadData}
          type={modalType}
        />

        {/* Add Unofficial Expense Modal */}
        <AddUnofficialExpenseModal
          isOpen={showUnofficialModal}
          onClose={() => setShowUnofficialModal(false)}
          onSuccess={() => {
            loadUnofficialExpenses();
            setShowUnofficialModal(false);
          }}
          password={unofficialPassword}
        />

        {/* View Unofficial Expense Modal */}
        <ViewUnofficialExpenseModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedUnofficialExpense(null);
          }}
          expense={selectedUnofficialExpense}
          password={unofficialPassword}
          onSuccess={() => {
            loadUnofficialExpenses();
            setShowViewModal(false);
            setSelectedUnofficialExpense(null);
          }}
        />

        {/* Add Bank Account Modal */}
        <AddBankAccountModal
          isOpen={showBankAccountModal}
          onClose={() => setShowBankAccountModal(false)}
          onSuccess={() => {
            loadData();
            setShowBankAccountModal(false);
          }}
        />

        {/* Bank Reconciliation Modal */}
        <BankReconciliationModal
          isOpen={showReconciliationModal}
          onClose={() => setShowReconciliationModal(false)}
          bankAccounts={bankAccounts}
        />
      </div>
    </div>
  );
}
