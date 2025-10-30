'use client';

import { useState, useEffect } from 'react';
import { Bell, Calendar, TrendingUp, UserX, AlertCircle } from 'lucide-react';

export default function ClientReminders() {
  const [reminders, setReminders] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clients/reminders?type=all', {
        headers: {
          'x-admin-auth': localStorage.getItem('adminAuth') || '',
          'x-admin-email': localStorage.getItem('adminEmail') || '',
        },
      });
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error('Error loading reminders:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-center text-gray-400">Loading reminders...</div>
      </div>
    );
  }

  if (!reminders) {
    return null;
  }

  const tabs = [
    { id: 'all', name: 'All', count: reminders.summary?.total || 0, icon: Bell },
    { id: 'follow-up', name: 'Follow-ups', count: reminders.summary?.followUp || 0, icon: Calendar },
    { id: 'hot-leads', name: 'Hot Leads', count: reminders.summary?.hotLeads || 0, icon: TrendingUp },
    { id: 'inactive', name: 'Inactive', count: reminders.summary?.inactiveClients || 0, icon: UserX },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Reminders & Alerts</h2>
        {reminders.summary?.total > 0 && (
          <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
            {reminders.summary.total}
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-emerald-700' : 'bg-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {activeTab === 'all' && (
          <>
            {reminders.reminders?.followUp?.length > 0 && (
              <ReminderSection
                title="Follow-up Reminders"
                icon={Calendar}
                items={reminders.reminders.followUp}
                type="follow-up"
              />
            )}
            {reminders.reminders?.hotLeads?.length > 0 && (
              <ReminderSection
                title="Hot Lead Alerts"
                icon={TrendingUp}
                items={reminders.reminders.hotLeads}
                type="hot-leads"
              />
            )}
            {reminders.reminders?.inactiveClients?.length > 0 && (
              <ReminderSection
                title="Inactive Client Alerts"
                icon={UserX}
                items={reminders.reminders.inactiveClients}
                type="inactive"
              />
            )}
          </>
        )}

        {activeTab === 'follow-up' && reminders.reminders?.followUp && (
          <ReminderSection
            title="Follow-up Reminders"
            icon={Calendar}
            items={reminders.reminders.followUp}
            type="follow-up"
          />
        )}

        {activeTab === 'hot-leads' && reminders.reminders?.hotLeads && (
          <ReminderSection
            title="Hot Lead Alerts"
            icon={TrendingUp}
            items={reminders.reminders.hotLeads}
            type="hot-leads"
          />
        )}

        {activeTab === 'inactive' && reminders.reminders?.inactiveClients && (
          <ReminderSection
            title="Inactive Client Alerts"
            icon={UserX}
            items={reminders.reminders.inactiveClients}
            type="inactive"
          />
        )}
      </div>
    </div>
  );
}

function ReminderSection({ title, icon: Icon, items, type }: any) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="text-sm text-gray-400">({items.length})</span>
      </div>

      <div className="space-y-2">
        {items.map((item: any) => (
          <div
            key={item.id}
            className="p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-white">{item.companyName}</div>
                <div className="text-sm text-gray-400">{item.contactPerson}</div>
                
                {type === 'follow-up' && (
                  <div className="text-xs text-yellow-400 mt-1">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    {item.daysOverdue > 0 
                      ? `Overdue by ${item.daysOverdue} days`
                      : 'Due today'}
                  </div>
                )}

                {type === 'hot-leads' && (
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-red-600 text-white rounded">
                      Score: {item.leadScore}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">
                      {item.leadStatus}
                    </span>
                    {item.daysSinceContact && (
                      <span className="text-xs text-yellow-400">
                        {item.daysSinceContact} days since contact
                      </span>
                    )}
                  </div>
                )}

                {type === 'inactive' && (
                  <div className="text-xs text-gray-400 mt-1">
                    {item.daysSinceLastOrder 
                      ? `${item.daysSinceLastOrder} days since last order`
                      : 'No orders yet'}
                  </div>
                )}
              </div>

              <a
                href={`/admin/clients/${item.id}`}
                className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
