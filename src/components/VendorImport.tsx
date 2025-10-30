'use client';

import { useState } from 'react';
import {
  Upload,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
  RefreshCw,
} from 'lucide-react';

interface ImportError {
  row: number;
  field: string;
  value: any;
  error: string;
}

interface VendorImportProps {
  onImportComplete?: () => void;
}

export default function VendorImport({ onImportComplete }: VendorImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<ImportError[]>([]);

  const downloadTemplate = async () => {
    try {
      const response = await fetch('/api/vendors/export');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'vendor-import-template.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading template:', error);
      alert('Failed to download template');
    }
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter((line) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#');
    });

    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, '').replace('*', ''));
    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim().replace(/"/g, ''));
      const row: any = {};

      headers.forEach((header, index) => {
        const key = header
          .toLowerCase()
          .replace(/ /g, '')
          .replace(/\*/g, '');
        
        // Map header names to expected field names
        const fieldMap: Record<string, string> = {
          'vendorcode': 'vendorCode',
          'vendorname': 'vendorName',
          'vendortype': 'vendorType',
          'status': 'status',
          'contactperson': 'contactPerson',
          'phoneprimary': 'phonePrimary',
          'phonesecondary': 'phoneSecondary',
          'email': 'email',
          'whatsapp': 'whatsapp',
          'addressline1': 'addressLine1',
          'addressline2': 'addressLine2',
          'city': 'city',
          'state': 'state',
          'pincode': 'pincode',
          'country': 'country',
          'gstin': 'gstin',
          'pan': 'pan',
          'bankname': 'bankName',
          'bankaccountnumber': 'bankAccountNumber',
          'bankifsc': 'bankIfsc',
          'paymentterms': 'paymentTerms',
          'creditlimit': 'creditLimit',
          'productssupplied': 'productsSupplied',
          'monthlycapacity': 'monthlyCapacity',
          'leadtimedays': 'leadTimeDays',
          'rating': 'rating',
        };

        const fieldName = fieldMap[key] || key;
        row[fieldName] = values[index] || '';
      });

      rows.push(row);
    }

    return rows;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setErrors([]);
    }
  };

  const validateFile = async () => {
    if (!file) return;

    setValidating(true);
    setResult(null);
    setErrors([]);

    try {
      const text = await file.text();
      const csvData = parseCSV(text);

      const response = await fetch('/api/vendors/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData, validateOnly: true }),
      });

      const data = await response.json();
      setResult(data);
      setErrors(data.errors || []);
    } catch (error) {
      console.error('Error validating file:', error);
      alert('Failed to validate file');
    } finally {
      setValidating(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setResult(null);
    setErrors([]);

    try {
      const text = await file.text();
      const csvData = parseCSV(text);

      const response = await fetch('/api/vendors/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData, validateOnly: false }),
      });

      const data = await response.json();
      setResult(data);
      setErrors(data.errors || []);

      if (data.success && onImportComplete) {
        setTimeout(() => {
          onImportComplete();
        }, 2000);
      }
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Failed to import file');
    } finally {
      setImporting(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setErrors([]);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Import Vendors</h3>
          <p className="text-gray-400 text-sm mt-1">Upload a CSV file to import multiple vendors</p>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Select CSV File</label>
        <div className="flex gap-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          />
          {file && (
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {file && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}
      </div>

      {/* Actions */}
      {file && !result && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={validateFile}
            disabled={validating}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {validating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Validate Data
              </>
            )}
          </button>
          <button
            onClick={handleImport}
            disabled={importing}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {importing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Import Now
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Summary */}
          <div
            className={`border rounded-lg p-4 ${
              result.success
                ? 'bg-green-900/20 border-green-700'
                : 'bg-red-900/20 border-red-700'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    result.success ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {result.success
                    ? result.validationOnly
                      ? 'Validation Successful'
                      : 'Import Successful'
                    : 'Validation Failed'}
                </h4>
                <div className="mt-2 space-y-1 text-sm text-gray-300">
                  <div>Total Rows: {result.totalRows}</div>
                  {result.validationOnly ? (
                    <>
                      <div className="text-green-400">Valid Rows: {result.validRows}</div>
                      {result.errorRows > 0 && (
                        <div className="text-red-400">Rows with Errors: {result.errorRows}</div>
                      )}
                    </>
                  ) : result.success ? (
                    <div className="text-green-400">Imported: {result.importedRows} vendors</div>
                  ) : (
                    <>
                      <div className="text-green-400">Valid Rows: {result.validRows}</div>
                      <div className="text-red-400">Rows with Errors: {result.errorRows}</div>
                    </>
                  )}
                </div>
                {result.success && !result.validationOnly && (
                  <button
                    onClick={reset}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Import Another File
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-gray-900 border border-red-700 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Validation Errors ({errors.length})
              </h4>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded p-3 text-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-white font-medium">
                          Row {error.row}: {error.field}
                        </div>
                        <div className="text-red-400 mt-1">{error.error}</div>
                        {error.value && (
                          <div className="text-gray-500 mt-1">Value: "{error.value}"</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h4 className="font-semibold text-blue-400 mb-2">Import Instructions</h4>
        <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
          <li>Download the CSV template using the button above</li>
          <li>Fill in vendor data following the template format</li>
          <li>Fields marked with * are required</li>
          <li>Use "Validate Data" to check for errors before importing</li>
          <li>Fix any errors shown and re-upload the file</li>
          <li>Click "Import Now" to add vendors to the database</li>
        </ul>
      </div>
    </div>
  );
}
