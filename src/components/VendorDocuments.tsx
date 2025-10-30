'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Calendar,
  Eye,
  X,
  RefreshCw,
  File,
  FileImage,
  FileSpreadsheet,
  Plus,
  AlertCircle,
} from 'lucide-react';

interface VendorDocument {
  id: number;
  documentName: string;
  documentType: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
  expiryDate?: string;
  description?: string;
  uploadedBy: string;
  tags?: string;
}

interface VendorDocumentsProps {
  vendorId: number;
  vendorName: string;
}

export default function VendorDocuments({ vendorId, vendorName }: VendorDocumentsProps) {
  const [documents, setDocuments] = useState<VendorDocument[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<VendorDocument | null>(null);
  const [formData, setFormData] = useState({
    documentName: '',
    documentType: 'Contract',
    fileUrl: '',
    fileName: '',
    fileSize: 0,
    mimeType: '',
    expiryDate: '',
    description: '',
    uploadedBy: 'Admin',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}/documents`);
      const data = await response.json();

      if (data.success) {
        setDocuments(data.documents);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error fetching vendor documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [vendorId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload to a file storage service (S3, Cloudinary, etc.)
      // For now, we'll use a placeholder URL
      const fileUrl = `/uploads/vendors/${vendorId}/${file.name}`;
      
      setFormData({
        ...formData,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileUrl: fileUrl,
        documentName: formData.documentName || file.name,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/vendors/${vendorId}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowUploadForm(false);
        setFormData({
          documentName: '',
          documentType: 'Contract',
          fileUrl: '',
          fileName: '',
          fileSize: 0,
          mimeType: '',
          expiryDate: '',
          description: '',
          uploadedBy: 'Admin',
        });
        fetchDocuments();
      } else {
        alert(data.error || 'Failed to upload document');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (documentId: number) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const response = await fetch(`/api/vendors/${vendorId}/documents/${documentId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchDocuments();
      } else {
        alert(data.error || 'Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <FileImage className="w-5 h-5 text-blue-400" />;
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-red-400" />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel'))
      return <FileSpreadsheet className="w-5 h-5 text-green-400" />;
    return <File className="w-5 h-5 text-gray-400" />;
  };

  const canPreview = (mimeType: string) => {
    return mimeType.startsWith('image/') || mimeType.includes('pdf');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading documents...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Documents - {vendorName}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {summary?.totalDocuments || 0} documents ({formatFileSize(summary?.totalSize || 0)})
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchDocuments}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Upload New Document</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Document Name *
                </label>
                <input
                  type="text"
                  value={formData.documentName}
                  onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  placeholder="GST Certificate"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Document Type *
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                >
                  <option value="Contract">Contract</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Invoice">Invoice</option>
                  <option value="License">License</option>
                  <option value="Tax Document">Tax Document</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Quality Report">Quality Report</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  File * (Simulated)
                </label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note: File upload is simulated. Integrate with cloud storage in production.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  rows={3}
                  placeholder="Additional notes about this document..."
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !formData.fileUrl}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {submitting ? 'Uploading...' : 'Upload Document'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents Grid */}
      {documents.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Documents Found</h3>
          <p className="text-gray-400 mb-6">No documents uploaded for this vendor yet.</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Upload First Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getFileIcon(doc.mimeType)}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{doc.documentName}</h4>
                    <p className="text-sm text-gray-400">{doc.documentType}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  {formatFileSize(doc.fileSize)}
                </div>
                {doc.expiryDate && (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="w-4 h-4" />
                    Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {doc.description && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{doc.description}</p>
              )}

              <div className="flex gap-2">
                {canPreview(doc.mimeType) && (
                  <button
                    onClick={() => setPreviewDocument(doc)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                )}
                <a
                  href={doc.fileUrl}
                  download={doc.fileName}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">{previewDocument.documentName}</h3>
              <button
                onClick={() => setPreviewDocument(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {previewDocument.mimeType.startsWith('image/') ? (
                <img
                  src={previewDocument.fileUrl}
                  alt={previewDocument.documentName}
                  className="max-w-full h-auto mx-auto"
                />
              ) : previewDocument.mimeType.includes('pdf') ? (
                <iframe
                  src={previewDocument.fileUrl}
                  className="w-full h-[70vh] border-0"
                  title={previewDocument.documentName}
                />
              ) : (
                <p className="text-gray-400 text-center py-12">Preview not available for this file type</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
