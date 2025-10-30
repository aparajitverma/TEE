'use client';

import { useState, useEffect } from 'react';
import { X, Users, UserPlus, Check } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  activeLeads: number;
  maxLeads: number;
}

interface LeadAssignmentProps {
  clientId: number;
  clientName: string;
  currentAssignee?: number | null;
  onClose: () => void;
  onAssign: () => void;
}

export default function LeadAssignment({ clientId, clientName, currentAssignee, onClose, onAssign }: LeadAssignmentProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<number | null>(currentAssignee || null);
  const [loading, setLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTeamMembers: TeamMember[] = [
        { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Sales Manager', activeLeads: 15, maxLeads: 25 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Sales Executive', activeLeads: 8, maxLeads: 20 },
        { id: 3, name: 'Mike Davis', email: 'mike@company.com', role: 'Sales Executive', activeLeads: 12, maxLeads: 20 },
        { id: 4, name: 'Emily Chen', email: 'emily@company.com', role: 'Account Manager', activeLeads: 5, maxLeads: 15 },
      ];
      setTeamMembers(mockTeamMembers);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoadingMembers(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedMember) {
      alert('Please select a team member');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo: selectedMember })
      });

      if (response.ok) {
        alert('Lead assigned successfully');
        onAssign();
        onClose();
      } else {
        alert('Failed to assign lead');
      }
    } catch (error) {
      console.error('Error assigning lead:', error);
      alert('Failed to assign lead');
    } finally {
      setLoading(false);
    }
  };

  const getCapacityColor = (active: number, max: number) => {
    const percentage = (active / max) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Assign Lead</h2>
            <p className="text-sm text-gray-400 mt-1">{clientName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loadingMembers ? (
            <div className="text-center py-12 text-gray-400">Loading team members...</div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-400 mb-4">Select a team member to assign this lead to:</p>
              
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedMember === member.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-900'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{member.name}</h3>
                          {selectedMember === member.id && (
                            <Check className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{member.role}</p>
                        <p className="text-xs text-gray-500 mt-1">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getCapacityColor(member.activeLeads, member.maxLeads)}`}>
                        {member.activeLeads}/{member.maxLeads}
                      </p>
                      <p className="text-xs text-gray-400">Active Leads</p>
                      <div className="w-20 bg-gray-700 rounded-full h-1.5 mt-2">
                        <div 
                          className={`h-1.5 rounded-full ${
                            (member.activeLeads / member.maxLeads) >= 0.9 ? 'bg-red-500' :
                            (member.activeLeads / member.maxLeads) >= 0.7 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(member.activeLeads / member.maxLeads) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedMember || loading}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 text-white rounded-lg"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? 'Assigning...' : 'Assign Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}
