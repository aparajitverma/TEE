'use client';

import { useState, useEffect } from 'react';
import { 
  Phone, Mail, MessageSquare, Video, Users, Plus, 
  ArrowDownCircle, ArrowUpCircle, Trash2, Calendar 
} from 'lucide-react';

interface Communication {
  id: number;
  communicationType: string;
  direction: string;
  dateTime: string;
  subject: string | null;
  summary: string | null;
  fullContent: string | null;
  outcome: string | null;
  nextAction: string | null;
  loggedBy: string | null;
}

interface CommunicationLogProps {
  clientId: number;
}

export default function CommunicationLog({ clientId }: CommunicationLogProps) {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    communicationType: 'Email',
    direction: 'Outbound',
    dateTime: new Date().toISOString().slice(0, 16),
    subject: '',
    summary: '',
    fullContent: '',
    outcome: 'Positive',
    nextAction: '',
    loggedBy: 'Admin',
  });

  useEffect(() => {
    fetchCommunications();
  }, [clientId]);

  const fetchCommunications = async () => {
    try {
      const response = await fetch(`/api/communications?clientId=${clientId}`);
      const data = await response.json();
      setCommunications(data.communications || []);
    } catch (error) {
      console.error('Error fetching communications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          ...formData,
        }),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({
          communicationType: 'Email',
          direction: 'Outbound',
          dateTime: new Date().toISOString().slice(0, 16),
          subject: '',
          summary: '',
          fullContent: '',
          outcome: 'Positive',
          nextAction: '',
          loggedBy: 'Admin',
        });
        fetchCommunications();
      }
    } catch (error) {
      console.error('Error creating communication:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this communication log?')) return;
    try {
      await fetch(`/api/communications/${id}`, { method: 'DELETE' });
      fetchCommunications();
    } catch (error) {
      console.error('Error deleting communication:', error);
    }
  };

  const getIcon = (type: string) => {
    const icons: Record<string, any> = {
      'Email': Mail,
      'Phone': Phone,
      'WhatsApp': MessageSquare,
      'Meeting': Users,
      'Video Call': Video,
    };
    const Icon = icons[type] || Mail;
    return <Icon className="w-4 h-4" />;
  };

  const getOutcomeColor = (outcome: string | null) => {
    const colors: Record<string, string> = {
      'Positive': 'text-green-400',
      'Neutral': 'text-gray-400',
      'Negative': 'text-red-400',
      'Follow-up Required': 'text-yellow-400',
    };
    return outcome ? colors[outcome] || 'text-gray-400' : 'text-gray-400';
  };

  if (loading) {
    return <div className="text-gray-400">Loading communications...</div>;
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Communication Log</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Communication
        </button>
      </div>

      {/* Add Communication Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Type</label>
              <select
                value={formData.communicationType}
                onChange={(e) => setFormData({ ...formData, communicationType: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Meeting">Meeting</option>
                <option value="Video Call">Video Call</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Direction</label>
              <select
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              >
                <option value="Outbound">Outbound</option>
                <option value="Inbound">Inbound</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Outcome</label>
              <select
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
                <option value="Follow-up Required">Follow-up Required</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                placeholder="Email subject or call topic"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Summary</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                placeholder="Brief summary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Full Content / Notes</label>
              <textarea
                value={formData.fullContent}
                onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                placeholder="Complete message or detailed notes"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Next Action</label>
              <input
                type="text"
                value={formData.nextAction}
                onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                placeholder="What to do next"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm"
            >
              Save Communication
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Communications Timeline */}
      {communications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p>No communications logged yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm"
          >
            Add first communication
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {communications.map((comm) => (
            <div key={comm.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded">
                    {getIcon(comm.communicationType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{comm.communicationType}</span>
                      {comm.direction === 'Inbound' ? (
                        <ArrowDownCircle className="w-4 h-4 text-blue-400" />
                      ) : (
                        <ArrowUpCircle className="w-4 h-4 text-green-400" />
                      )}
                      <span className="text-sm text-gray-400">{comm.direction}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-sm text-gray-400">
                        {new Date(comm.dateTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(comm.id)}
                  className="p-2 hover:bg-gray-800 rounded text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {comm.subject && (
                <h4 className="text-white font-medium mb-2">{comm.subject}</h4>
              )}

              {comm.summary && (
                <p className="text-gray-300 text-sm mb-2">{comm.summary}</p>
              )}

              {comm.fullContent && (
                <p className="text-gray-400 text-sm mb-3 whitespace-pre-wrap">{comm.fullContent}</p>
              )}

              <div className="flex items-center gap-4 text-sm">
                {comm.outcome && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Outcome:</span>
                    <span className={getOutcomeColor(comm.outcome)}>{comm.outcome}</span>
                  </div>
                )}
                {comm.nextAction && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Next:</span>
                    <span className="text-yellow-400">{comm.nextAction}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
