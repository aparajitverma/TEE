'use client';

import { useState } from 'react';
import { X, Upload, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';

interface BankReconciliationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankAccounts: any[];
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  matched: boolean;
  matchedWith?: string;
}

export default function BankReconciliationModal({ 
  isOpen, 
  onClose, 
  bankAccounts 
}: BankReconciliationModalProps) {
  const [step, setStep] = useState<'select' | 'upload' | 'match' | 'summary'>('select');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bankTransactions, setBankTransactions] = useState<Transaction[]>([]);
  const [systemTransactions, setSystemTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In production, parse CSV/Excel file
    // For now, create sample data
    const sampleTransactions: Transaction[] = [
      {
        id: 'bank-1',
        date: '2025-01-15',
        description: 'Payment from Client A',
        amount: 50000,
        type: 'credit',
        matched: false,
      },
      {
        id: 'bank-2',
        date: '2025-01-16',
        description: 'Vendor Payment - ABC Supplies',
        amount: 15000,
        type: 'debit',
        matched: false,
      },
      {
        id: 'bank-3',
        date: '2025-01-17',
        description: 'Wire Transfer Received',
        amount: 75000,
        type: 'credit',
        matched: false,
      },
    ];

    setBankTransactions(sampleTransactions);
    
    // Simulate system transactions
    const sampleSystemTransactions: Transaction[] = [
      {
        id: 'sys-1',
        date: '2025-01-15',
        description: 'Payment Received - Client A',
        amount: 50000,
        type: 'credit',
        matched: false,
      },
      {
        id: 'sys-2',
        date: '2025-01-16',
        description: 'Expense - ABC Supplies',
        amount: 15000,
        type: 'debit',
        matched: false,
      },
    ];

    setSystemTransactions(sampleSystemTransactions);
    setStep('match');
  };

  const autoMatch = () => {
    setLoading(true);
    
    // Simple auto-matching logic
    const updatedBankTxns = [...bankTransactions];
    const updatedSystemTxns = [...systemTransactions];

    updatedBankTxns.forEach((bankTxn) => {
      const match = updatedSystemTxns.find(
        (sysTxn) =>
          !sysTxn.matched &&
          sysTxn.amount === bankTxn.amount &&
          sysTxn.type === bankTxn.type &&
          Math.abs(new Date(sysTxn.date).getTime() - new Date(bankTxn.date).getTime()) < 3 * 24 * 60 * 60 * 1000 // Within 3 days
      );

      if (match) {
        bankTxn.matched = true;
        bankTxn.matchedWith = match.id;
        match.matched = true;
        match.matchedWith = bankTxn.id;
      }
    });

    setBankTransactions(updatedBankTxns);
    setSystemTransactions(updatedSystemTxns);
    
    setTimeout(() => setLoading(false), 1000);
  };

  const manualMatch = (bankTxnId: string, sysTxnId: string) => {
    const updatedBankTxns = bankTransactions.map((txn) => {
      if (txn.id === bankTxnId) {
        return { ...txn, matched: true, matchedWith: sysTxnId };
      }
      return txn;
    });

    const updatedSystemTxns = systemTransactions.map((txn) => {
      if (txn.id === sysTxnId) {
        return { ...txn, matched: true, matchedWith: bankTxnId };
      }
      return txn;
    });

    setBankTransactions(updatedBankTxns);
    setSystemTransactions(updatedSystemTxns);
  };

  const unmatch = (txnId: string) => {
    const updatedBankTxns = bankTransactions.map((txn) => {
      if (txn.id === txnId || txn.matchedWith === txnId) {
        return { ...txn, matched: false, matchedWith: undefined };
      }
      return txn;
    });

    const updatedSystemTxns = systemTransactions.map((txn) => {
      if (txn.id === txnId || txn.matchedWith === txnId) {
        return { ...txn, matched: false, matchedWith: undefined };
      }
      return txn;
    });

    setBankTransactions(updatedBankTxns);
    setSystemTransactions(updatedSystemTxns);
  };

  const getReconciliationSummary = () => {
    const matchedCount = bankTransactions.filter((t) => t.matched).length;
    const unmatchedBankCount = bankTransactions.filter((t) => !t.matched).length;
    const unmatchedSystemCount = systemTransactions.filter((t) => !t.matched).length;
    
    const bankTotal = bankTransactions.reduce((sum, t) => 
      sum + (t.type === 'credit' ? t.amount : -t.amount), 0
    );
    
    const systemTotal = systemTransactions.reduce((sum, t) => 
      sum + (t.type === 'credit' ? t.amount : -t.amount), 0
    );

    return {
      matchedCount,
      unmatchedBankCount,
      unmatchedSystemCount,
      bankTotal,
      systemTotal,
      difference: bankTotal - systemTotal,
    };
  };

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

  const handleReconcile = () => {
    alert('Reconciliation marked as complete! In production, this would update the database.');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep('select');
    setSelectedAccount('');
    setStartDate('');
    setEndDate('');
    setBankTransactions([]);
    setSystemTransactions([]);
  };

  if (!isOpen) return null;

  const summary = getReconciliationSummary();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">Bank Reconciliation</h2>
            <p className="text-sm text-gray-400">Match bank statement with system transactions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Select Account & Date Range */}
          {step === 'select' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Bank Account *
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Choose account...</option>
                  {bankAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountName} - {account.bankName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep('upload')}
                disabled={!selectedAccount || !startDate || !endDate}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Upload
              </button>
            </div>
          )}

          {/* Step 2: Upload Bank Statement */}
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Upload Bank Statement</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Upload CSV or Excel file from your bank
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                <p className="text-xs text-gray-500 mt-3">
                  Supported formats: CSV, Excel (.xlsx, .xls)
                </p>
              </div>

              <button
                onClick={() => setStep('select')}
                className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
            </div>
          )}

          {/* Step 3: Match Transactions */}
          {step === 'match' && (
            <div className="space-y-4">
              {/* Auto-match Button */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Match Transactions</h3>
                  <p className="text-sm text-gray-400">Match bank statement entries with system records</p>
                </div>
                <button
                  onClick={autoMatch}
                  disabled={loading}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Matching...' : 'Auto-Match'}
                </button>
              </div>

              {/* Matched Transactions */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Matched Transactions ({bankTransactions.filter(t => t.matched).length})
                </h4>
                <div className="space-y-2">
                  {bankTransactions.filter(t => t.matched).map((txn) => {
                    const matchedSysTxn = systemTransactions.find(st => st.id === txn.matchedWith);
                    return (
                      <div key={txn.id} className="bg-gray-800 rounded p-3 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-white text-sm">{txn.description}</div>
                          <div className="text-xs text-gray-400">{formatDate(txn.date)}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className={`font-semibold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                          </div>
                          <button
                            onClick={() => unmatch(txn.id)}
                            className="text-xs text-gray-400 hover:text-red-400"
                          >
                            Unmatch
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Unmatched Bank Transactions */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Unmatched Bank Transactions ({bankTransactions.filter(t => !t.matched).length})
                </h4>
                <div className="space-y-2">
                  {bankTransactions.filter(t => !t.matched).map((txn) => (
                    <div key={txn.id} className="bg-gray-800 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-white text-sm">{txn.description}</div>
                          <div className="text-xs text-gray-400">{formatDate(txn.date)}</div>
                        </div>
                        <div className={`font-semibold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                        </div>
                      </div>
                      <select
                        onChange={(e) => e.target.value && manualMatch(txn.id, e.target.value)}
                        className="w-full bg-gray-700 text-white text-xs px-3 py-1.5 rounded border border-gray-600"
                      >
                        <option value="">Match with system transaction...</option>
                        {systemTransactions.filter(st => !st.matched && st.type === txn.type).map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.description} - {formatCurrency(st.amount)} ({formatDate(st.date)})
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unmatched System Transactions */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Unmatched System Transactions ({systemTransactions.filter(t => !t.matched).length})
                </h4>
                <div className="space-y-2">
                  {systemTransactions.filter(t => !t.matched).map((txn) => (
                    <div key={txn.id} className="bg-gray-800 rounded p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-white text-sm">{txn.description}</div>
                        <div className="text-xs text-gray-400">{formatDate(txn.date)}</div>
                      </div>
                      <div className={`font-semibold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep('upload')}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('summary')}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Summary
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 'summary' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Reconciliation Summary</h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4">
                  <div className="text-emerald-400 text-2xl font-bold">{summary.matchedCount}</div>
                  <div className="text-sm text-gray-400">Matched</div>
                </div>
                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                  <div className="text-amber-400 text-2xl font-bold">{summary.unmatchedBankCount}</div>
                  <div className="text-sm text-gray-400">Unmatched (Bank)</div>
                </div>
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                  <div className="text-red-400 text-2xl font-bold">{summary.unmatchedSystemCount}</div>
                  <div className="text-sm text-gray-400">Unmatched (System)</div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bank Statement Total:</span>
                  <span className="text-white font-semibold">{formatCurrency(summary.bankTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">System Records Total:</span>
                  <span className="text-white font-semibold">{formatCurrency(summary.systemTotal)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-600">
                  <span className="text-gray-300 font-semibold">Difference:</span>
                  <span className={`font-bold ${summary.difference === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(Math.abs(summary.difference))}
                  </span>
                </div>
              </div>

              {summary.difference === 0 && summary.unmatchedBankCount === 0 && summary.unmatchedSystemCount === 0 && (
                <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="text-emerald-400 font-semibold">Perfect Match!</div>
                    <div className="text-sm text-gray-400">All transactions are reconciled</div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep('match')}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Matching
                </button>
                <button
                  onClick={handleReconcile}
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Mark as Reconciled
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
