'use client';

import { useState, useEffect } from 'react';
import {
  Star,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Edit,
  Save,
  X,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
} from 'lucide-react';

interface RatingHistory {
  id: number;
  rating: number;
  previousRating?: number;
  ratingType: string;
  onTimeDeliveryPercent?: number;
  qualityRejectionRate?: number;
  communicationScore?: number;
  totalOrders?: number;
  notes?: string;
  ratedBy: string;
  createdAt: string;
}

interface VendorRatingProps {
  vendorId: number;
  vendorName: string;
  currentRating?: number;
}

export default function VendorRating({ vendorId, vendorName, currentRating }: VendorRatingProps) {
  const [rating, setRating] = useState(currentRating || 0);
  const [history, setHistory] = useState<RatingHistory[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [automaticRating, setAutomaticRating] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<any>(null);

  const fetchRating = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}/rating`);
      const data = await response.json();

      if (data.success) {
        setRating(data.vendor.currentRating || 0);
        setHistory(data.ratingHistory || []);
        setMetrics(data.metrics);
        setAutomaticRating(data.automaticRating);
      }
    } catch (error) {
      console.error('Error fetching rating:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRating();
  }, [vendorId]);

  const handleManualUpdate = async () => {
    if (newRating < 0 || newRating > 5) {
      alert('Rating must be between 0 and 5');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/vendors/${vendorId}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: newRating,
          notes,
          ratedBy: 'Admin',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRating(data.rating);
        setEditing(false);
        setNotes('');
        if (data.alert) {
          setAlert(data.alert);
        }
        fetchRating();
      } else {
        alert(data.error || 'Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
      alert('Failed to update rating');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutomaticCalculation = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(`/api/vendors/${vendorId}/rating`, {
        method: 'PUT',
      });

      const data = await response.json();

      if (data.success) {
        setRating(data.rating);
        if (data.alert) {
          setAlert(data.alert);
        }
        fetchRating();
      } else {
        alert(data.error || 'Failed to calculate rating');
      }
    } catch (error) {
      console.error('Error calculating rating:', error);
      alert('Failed to calculate rating');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (ratingValue: number, size: 'sm' | 'lg' = 'lg') => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;
    const iconSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className={`${iconSize} fill-yellow-400 text-yellow-400`} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className={`${iconSize} text-gray-600`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${iconSize} fill-yellow-400 text-yellow-400`} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className={`${iconSize} text-gray-600`} />);
      }
    }

    return stars;
  };

  const getRatingColor = (ratingValue: number) => {
    if (ratingValue >= 4) return 'text-green-400';
    if (ratingValue >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRatingTrend = (current: number, previous?: number) => {
    if (!previous) return null;
    if (current > previous) {
      return (
        <div className="flex items-center gap-1 text-green-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          +{(current - previous).toFixed(1)}
        </div>
      );
    } else if (current < previous) {
      return (
        <div className="flex items-center gap-1 text-red-400 text-sm">
          <TrendingDown className="w-4 h-4" />
          {(current - previous).toFixed(1)}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading rating...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert */}
      {alert && (
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-400">Rating Alert</h4>
              <p className="text-gray-300 mt-1">{alert.message}</p>
            </div>
            <button
              onClick={() => setAlert(null)}
              className="ml-auto p-1 hover:bg-yellow-800/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Current Rating */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Vendor Rating - {vendorName}</h3>
          <div className="flex gap-2">
            <button
              onClick={fetchRating}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            {!editing && (
              <button
                onClick={() => {
                  setEditing(true);
                  setNewRating(rating);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                Update Rating
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className={`text-6xl font-bold ${getRatingColor(rating)} mb-2`}>
              {rating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {renderStars(rating)}
            </div>
            <p className="text-gray-400 text-sm">Current Rating</p>
          </div>

          {history.length > 0 && (
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-white mb-1">
                  {history[0].previousRating?.toFixed(1) || 'N/A'}
                </div>
                <p className="text-gray-400 text-sm">Previous</p>
                {getRatingTrend(rating, history[0].previousRating)}
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white mb-1">{history.length}</div>
                <p className="text-gray-400 text-sm">Updates</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-white mb-1">
                  {history[0].ratingType}
                </div>
                <p className="text-gray-400 text-sm">Last Update</p>
              </div>
            </div>
          )}
        </div>

        {/* Manual Update Form */}
        {editing && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Update Rating Manually</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Rating (0-5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newRating}
                  onChange={(e) => setNewRating(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  rows={3}
                  placeholder="Reason for rating change..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleManualUpdate}
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {submitting ? 'Saving...' : 'Save Rating'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Automatic Rating Calculation */}
      {automaticRating && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Automatic Rating Calculation</h4>
            <button
              onClick={handleAutomaticCalculation}
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${submitting ? 'animate-spin' : ''}`} />
              {submitting ? 'Calculating...' : 'Recalculate'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">On-Time Delivery</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {automaticRating.onTimeDeliveryPercent.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Weight: 40%</div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Quality Rejection</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {automaticRating.qualityRejectionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Weight: 40%</div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-400">Communication</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {automaticRating.communicationScore.toFixed(1)}/1.0
              </div>
              <div className="text-xs text-gray-500 mt-1">Weight: 20%</div>
            </div>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Calculated Rating:</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">{renderStars(automaticRating.rating, 'sm')}</div>
                <span className={`text-xl font-bold ${getRatingColor(automaticRating.rating)}`}>
                  {automaticRating.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating History */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Rating History</h4>

        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No rating history available</div>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-900 rounded-lg p-4 hover:bg-gray-850 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">{renderStars(entry.rating, 'sm')}</div>
                      <span className={`text-lg font-bold ${getRatingColor(entry.rating)}`}>
                        {entry.rating.toFixed(1)}
                      </span>
                      {getRatingTrend(entry.rating, entry.previousRating)}
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          entry.ratingType === 'Manual'
                            ? 'bg-blue-900/20 text-blue-400'
                            : 'bg-purple-900/20 text-purple-400'
                        }`}
                      >
                        {entry.ratingType}
                      </span>
                    </div>

                    {entry.ratingType === 'Automatic' && (
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-2">
                        <div>On-Time: {entry.onTimeDeliveryPercent?.toFixed(1)}%</div>
                        <div>Quality: {entry.qualityRejectionRate?.toFixed(1)}%</div>
                        <div>Communication: {entry.communicationScore?.toFixed(1)}</div>
                      </div>
                    )}

                    {entry.notes && (
                      <p className="text-sm text-gray-400 mt-2 italic">"{entry.notes}"</p>
                    )}

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>By {entry.ratedBy}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(entry.createdAt).toLocaleString()}
                      </span>
                      {entry.totalOrders && <span>{entry.totalOrders} orders</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
