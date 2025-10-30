'use client';

import { useState } from 'react';
import { 
  MessageSquare, FileText, CheckCircle, Package, 
  ClipboardCheck, Truck, Home, Plus, Calendar, Clock 
} from 'lucide-react';

interface Milestone {
  stage: string;
  label: string;
  date: string | null;
  time: string | null;
  icon: any;
  color: string;
  completed: boolean;
}

interface OrderProgressTimelineProps {
  order: any;
  onUpdate?: () => void;
}

export default function OrderProgressTimeline({ order, onUpdate }: OrderProgressTimelineProps) {
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [selectedStage, setSelectedStage] = useState('');
  const [milestoneDate, setMilestoneDate] = useState('');
  const [milestoneTime, setMilestoneTime] = useState('');

  const getMilestones = (): Milestone[] => {
    const currentStatus = order.orderStatus;
    const statusOrder = ['Inquiry', 'Quoted', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return [
      {
        stage: 'Inquiry',
        label: 'Inquiry Received',
        date: order.inquiryDate || order.orderDate,
        time: order.inquiryTime || null,
        icon: MessageSquare,
        color: 'blue',
        completed: currentIndex >= 0
      },
      {
        stage: 'Quoted',
        label: 'Quote Sent',
        date: order.quoteDate || null,
        time: order.quoteTime || null,
        icon: FileText,
        color: 'purple',
        completed: currentIndex >= 1
      },
      {
        stage: 'Confirmed',
        label: 'Order Confirmed',
        date: order.confirmationDate || null,
        time: order.confirmationTime || null,
        icon: CheckCircle,
        color: 'green',
        completed: currentIndex >= 2
      },
      {
        stage: 'Processing',
        label: 'Production Started',
        date: order.productionStartDate || null,
        time: order.productionStartTime || null,
        icon: Package,
        color: 'yellow',
        completed: currentIndex >= 3
      },
      {
        stage: 'QualityCheck',
        label: 'Quality Check Completed',
        date: order.qualityCheckDate || null,
        time: order.qualityCheckTime || null,
        icon: ClipboardCheck,
        color: 'orange',
        completed: currentIndex >= 3 && order.qualityCheckDate !== null
      },
      {
        stage: 'Shipped',
        label: 'Shipped',
        date: order.shippingDate || null,
        time: order.shippingTime || null,
        icon: Truck,
        color: 'indigo',
        completed: currentIndex >= 4
      },
      {
        stage: 'Delivered',
        label: 'Delivered',
        date: order.deliveryDate || null,
        time: order.deliveryTime || null,
        icon: Home,
        color: 'emerald',
        completed: currentIndex >= 5
      }
    ];
  };

  const handleAddMilestone = async () => {
    if (!selectedStage || !milestoneDate) {
      alert('Please select a stage and date');
      return;
    }

    try {
      const fieldMap: Record<string, string> = {
        'Inquiry': 'inquiryDate',
        'Quoted': 'quoteDate',
        'Confirmed': 'confirmationDate',
        'Processing': 'productionStartDate',
        'QualityCheck': 'qualityCheckDate',
        'Shipped': 'shippingDate',
        'Delivered': 'deliveryDate'
      };

      const timeFieldMap: Record<string, string> = {
        'Inquiry': 'inquiryTime',
        'Quoted': 'quoteTime',
        'Confirmed': 'confirmationTime',
        'Processing': 'productionStartTime',
        'QualityCheck': 'qualityCheckTime',
        'Shipped': 'shippingTime',
        'Delivered': 'deliveryTime'
      };

      const updateData: any = {
        [fieldMap[selectedStage]]: milestoneDate
      };

      if (milestoneTime) {
        updateData[timeFieldMap[selectedStage]] = milestoneTime;
      }

      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        alert('Milestone added successfully');
        setShowAddMilestone(false);
        setSelectedStage('');
        setMilestoneDate('');
        setMilestoneTime('');
        if (onUpdate) onUpdate();
      } else {
        alert('Failed to add milestone');
      }
    } catch (error) {
      console.error('Error adding milestone:', error);
      alert('Failed to add milestone');
    }
  };

  const milestones = getMilestones();
  const currentMilestoneIndex = milestones.findIndex(m => m.stage === order.orderStatus);

  const getColorClasses = (color: string, isCompleted: boolean, isCurrent: boolean) => {
    if (!isCompleted) {
      return {
        bg: 'bg-gray-700',
        border: 'border-gray-600',
        text: 'text-gray-400',
        icon: 'text-gray-500',
        line: 'bg-gray-700'
      };
    }

    if (isCurrent) {
      return {
        bg: `bg-${color}-500/20`,
        border: `border-${color}-500`,
        text: `text-${color}-400`,
        icon: `text-${color}-400`,
        line: `bg-${color}-500`
      };
    }

    return {
      bg: `bg-${color}-500/10`,
      border: `border-${color}-500/50`,
      text: `text-${color}-300`,
      icon: `text-${color}-400`,
      line: `bg-${color}-500`
    };
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Progress Timeline</h2>
        <button
          onClick={() => setShowAddMilestone(!showAddMilestone)}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      {/* Add Milestone Form */}
      {showAddMilestone && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-white mb-3">Add New Milestone</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="">Select Stage</option>
              <option value="Inquiry">Inquiry Received</option>
              <option value="Quoted">Quote Sent</option>
              <option value="Confirmed">Order Confirmed</option>
              <option value="Processing">Production Started</option>
              <option value="QualityCheck">Quality Check</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input
              type="date"
              value={milestoneDate}
              onChange={(e) => setMilestoneDate(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
            />
            <input
              type="time"
              value={milestoneTime}
              onChange={(e) => setMilestoneTime(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddMilestone}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm"
            >
              Save Milestone
            </button>
            <button
              onClick={() => setShowAddMilestone(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isCurrent = index === currentMilestoneIndex;
          const colors = getColorClasses(milestone.color, milestone.completed, isCurrent);
          const isLast = index === milestones.length - 1;

          return (
            <div key={milestone.stage} className="relative pb-8">
              {/* Connecting Line */}
              {!isLast && (
                <div className={`absolute left-6 top-12 w-0.5 h-full ${
                  milestone.completed ? colors.line : 'bg-gray-700'
                }`} />
              )}

              {/* Milestone */}
              <div className="flex items-start gap-4">
                {/* Icon Circle */}
                <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 ${colors.border} ${colors.bg} flex items-center justify-center ${
                  isCurrent ? 'ring-4 ring-' + milestone.color + '-500/30 scale-110' : ''
                } transition-all`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${colors.text} ${isCurrent ? 'text-lg' : 'text-base'}`}>
                        {milestone.label}
                        {isCurrent && (
                          <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                            Current
                          </span>
                        )}
                      </h3>
                      {milestone.date && (
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(milestone.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          {milestone.time && (
                            <div className="flex items-center gap-1 text-sm text-gray-400">
                              <Clock className="w-3 h-3" />
                              {milestone.time}
                            </div>
                          )}
                        </div>
                      )}
                      {!milestone.date && milestone.completed && (
                        <p className="text-xs text-gray-500 mt-1">Date not recorded</p>
                      )}
                      {!milestone.completed && (
                        <p className="text-xs text-gray-500 mt-1">Pending</p>
                      )}
                    </div>
                    {milestone.completed && (
                      <CheckCircle className={`w-5 h-5 ${colors.icon}`} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-medium">
            {milestones.filter(m => m.completed).length} of {milestones.length} stages completed
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${(milestones.filter(m => m.completed).length / milestones.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
