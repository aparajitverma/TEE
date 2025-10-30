'use client';

import { useState, useEffect } from 'react';
import { Mail, Send, X, FileText } from 'lucide-react';

interface EmailComposerProps {
  clientId: number;
  clientName: string;
  clientEmail: string;
  onClose: () => void;
  onSent: () => void;
}

export default function EmailComposer({ clientId, clientName, clientEmail, onClose, onSent }: EmailComposerProps) {
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [trackOpens, setTrackOpens] = useState(true);
  const [trackClicks, setTrackClicks] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/email-templates', {
        headers: {
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
      });
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setMessage(template.body);
    }
  };

  const handleSend = async () => {
    if (!subject || !message) {
      alert('Please fill in subject and message');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/clients/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
        body: JSON.stringify({
          clientId,
          subject,
          message,
          template: selectedTemplate || null,
          trackOpens,
          trackClicks,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Email sent successfully!');
        onSent();
        onClose();
      } else {
        alert(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Send email error:', error);
      alert('Failed to send email');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Send Email</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-900 rounded-lg">
          <div className="text-sm text-gray-400">To:</div>
          <div className="text-white font-medium">{clientName} ({clientEmail})</div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Email Template (Optional)
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg"
          >
            <option value="">-- Select a template --</option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Email message"
            rows={12}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg font-mono text-sm"
          />
          <div className="text-xs text-gray-400 mt-1">
            Personalization: {'{name}'} = {clientName}, {'{company}'} = Company Name, {'{email}'} = {clientEmail}
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={trackOpens}
              onChange={(e) => setTrackOpens(e.target.checked)}
              className="rounded"
            />
            Track email opens
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={trackClicks}
              onChange={(e) => setTrackClicks(e.target.checked)}
              className="rounded"
            />
            Track link clicks
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSend}
            disabled={loading || !subject || !message}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Sending...' : 'Send Email'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
