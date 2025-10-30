'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Trash2, File } from 'lucide-react';

interface Document {
  id: number;
  fileName: string;
  fileSize: number;
  category: string;
  uploadDate: string;
  description?: string;
}

interface DocumentManagerProps {
  clientId: number;
}

const CATEGORIES = ['Contracts', 'Certificates', 'Invoices', 'Proposals', 'Other'];

export default function DocumentManager({ clientId }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Contracts');
  const [description, setDescription] = useState('');

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Contracts': 'bg-blue-500/20 text-blue-400',
      'Certificates': 'bg-green-500/20 text-green-400',
      'Invoices': 'bg-yellow-500/20 text-yellow-400',
      'Proposals': 'bg-purple-500/20 text-purple-400',
      'Other': 'bg-gray-500/20 text-gray-400',
    };
    return colors[category] || colors['Other'];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In production, you would upload to server here
    // For now, we'll just add to local state as a demo
    const file = files[0];
    const newDoc: Document = {
      id: Date.now(),
      fileName: file.name,
      fileSize: file.size,
      category: selectedCategory,
      uploadDate: new Date().toISOString(),
      description: description || undefined,
    };

    setDocuments([...documents, newDoc]);
    setShowUploadForm(false);
    setDescription('');
    
    // Show success message
    alert(`Document "${file.name}" uploaded successfully! (Demo mode - file not actually stored)`);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this document?')) return;
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Documents</h2>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-white font-medium mb-4">Upload New Document</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description (Optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the document"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Select File</label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-emerald-600 file:text-white hover:file:bg-emerald-700"
              />
            </div>
            <button
              onClick={() => setShowUploadForm(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(category => {
          const count = documents.filter(d => d.category === category).length;
          return (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-lg text-sm ${getCategoryColor(category)} border border-current`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Documents List */}
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <File className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No documents uploaded yet</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            Upload your first document
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-gray-800 rounded">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium">{doc.fileName}</p>
                    <span className={`px-2 py-0.5 rounded text-xs ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{formatFileSize(doc.fileSize)}</span>
                    <span>•</span>
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                  {doc.description && (
                    <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-800 rounded text-emerald-400 hover:text-emerald-300"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 hover:bg-gray-800 rounded text-red-400 hover:text-red-300"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-400 text-sm">
          💡 <strong>Note:</strong> This is a demo version. In production, files would be stored on the server and properly managed.
        </p>
      </div>
    </div>
  );
}
