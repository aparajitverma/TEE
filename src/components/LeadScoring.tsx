'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, MessageSquare, Award } from 'lucide-react';

interface LeadScoringProps {
  client: any;
  onScoreUpdate?: (newScore: number) => void;
}

export default function LeadScoring({ client, onScoreUpdate }: LeadScoringProps) {
  const [leadScore, setLeadScore] = useState(client.leadScore || 0);
  const [scoreBreakdown, setScoreBreakdown] = useState({
    engagementScore: 0,
    companySizeScore: 0,
    orderValueScore: 0,
    responseRateScore: 0
  });

  useEffect(() => {
    calculateLeadScore();
  }, [client]);

  const calculateLeadScore = () => {
    let totalScore = 0;
    const breakdown = {
      engagementScore: 0,
      companySizeScore: 0,
      orderValueScore: 0,
      responseRateScore: 0
    };

    // 1. Engagement Level Score (0-30 points)
    const engagementScore = calculateEngagementScore();
    breakdown.engagementScore = engagementScore;
    totalScore += engagementScore;

    // 2. Company Size Score (0-25 points)
    const companySizeScore = calculateCompanySizeScore();
    breakdown.companySizeScore = companySizeScore;
    totalScore += companySizeScore;

    // 3. Order Value Potential Score (0-30 points)
    const orderValueScore = calculateOrderValueScore();
    breakdown.orderValueScore = orderValueScore;
    totalScore += orderValueScore;

    // 4. Response Rate Score (0-15 points)
    const responseRateScore = calculateResponseRateScore();
    breakdown.responseRateScore = responseRateScore;
    totalScore += responseRateScore;

    setScoreBreakdown(breakdown);
    setLeadScore(Math.round(totalScore));

    // Update the score in the database
    if (onScoreUpdate && totalScore !== client.leadScore) {
      updateLeadScore(Math.round(totalScore));
    }
  };

  const calculateEngagementScore = () => {
    let score = 0;
    
    // Total interactions (0-15 points)
    const interactions = client.totalInteractions || 0;
    if (interactions >= 20) score += 15;
    else if (interactions >= 10) score += 10;
    else if (interactions >= 5) score += 5;
    else if (interactions >= 1) score += 2;

    // Days since last contact (0-10 points)
    const daysSinceContact = client.lastContactDate 
      ? Math.floor((new Date().getTime() - new Date(client.lastContactDate).getTime()) / (1000 * 60 * 60 * 24))
      : 999;
    
    if (daysSinceContact <= 7) score += 10;
    else if (daysSinceContact <= 14) score += 7;
    else if (daysSinceContact <= 30) score += 4;
    else if (daysSinceContact <= 60) score += 2;

    // Lead temperature (0-5 points)
    if (client.leadTemperature === 'Hot') score += 5;
    else if (client.leadTemperature === 'Warm') score += 3;
    else if (client.leadTemperature === 'Cold') score += 1;

    return Math.min(score, 30);
  };

  const calculateCompanySizeScore = () => {
    let score = 0;
    
    switch (client.companySize) {
      case 'Enterprise (1000+)':
        score = 25;
        break;
      case 'Large (250-999)':
        score = 20;
        break;
      case 'Medium (50-249)':
        score = 15;
        break;
      case 'Small (10-49)':
        score = 10;
        break;
      case 'Micro (1-9)':
        score = 5;
        break;
      default:
        score = 0;
    }

    return score;
  };

  const calculateOrderValueScore = () => {
    let score = 0;
    
    // Expected order value (0-20 points)
    const expectedValue = client.expectedOrderValue || 0;
    if (expectedValue >= 100000) score += 20;
    else if (expectedValue >= 50000) score += 15;
    else if (expectedValue >= 25000) score += 10;
    else if (expectedValue >= 10000) score += 5;
    else if (expectedValue >= 5000) score += 2;

    // Probability to close (0-10 points)
    const probability = client.probabilityToClose || 0;
    score += Math.round((probability / 100) * 10);

    return Math.min(score, 30);
  };

  const calculateResponseRateScore = () => {
    const responseRate = client.responseRate || 0;
    
    if (responseRate >= 80) return 15;
    if (responseRate >= 60) return 12;
    if (responseRate >= 40) return 8;
    if (responseRate >= 20) return 4;
    if (responseRate > 0) return 2;
    
    return 0;
  };

  const updateLeadScore = async (newScore: number) => {
    try {
      await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadScore: newScore })
      });
      
      if (onScoreUpdate) {
        onScoreUpdate(newScore);
      }
    } catch (error) {
      console.error('Error updating lead score:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-emerald-400';
    if (score >= 40) return 'text-yellow-400';
    if (score >= 20) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 80) return 'A';
    if (score >= 60) return 'B';
    if (score >= 40) return 'C';
    if (score >= 20) return 'D';
    return 'F';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Lead Score
        </h3>
        <div className="text-right">
          <div className={`text-4xl font-bold ${getScoreColor(leadScore)}`}>
            {leadScore}
          </div>
          <div className="text-sm text-gray-400">out of 100</div>
        </div>
      </div>

      {/* Score Grade */}
      <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Grade</span>
          <span className={`text-2xl font-bold ${getScoreColor(leadScore)}`}>
            {getScoreGrade(leadScore)}
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              leadScore >= 80 ? 'bg-green-500' :
              leadScore >= 60 ? 'bg-emerald-500' :
              leadScore >= 40 ? 'bg-yellow-500' :
              leadScore >= 20 ? 'bg-orange-500' :
              'bg-red-500'
            }`}
            style={{ width: `${leadScore}%` }}
          />
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Score Breakdown</h4>
        
        {/* Engagement Score */}
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-sm text-white">Engagement Level</p>
              <p className="text-xs text-gray-400">
                {client.totalInteractions || 0} interactions, {client.leadTemperature || 'N/A'} lead
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{scoreBreakdown.engagementScore}/30</p>
          </div>
        </div>

        {/* Company Size Score */}
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-sm text-white">Company Size</p>
              <p className="text-xs text-gray-400">{client.companySize || 'Not specified'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{scoreBreakdown.companySizeScore}/25</p>
          </div>
        </div>

        {/* Order Value Potential */}
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="w-4 h-4 text-green-400" />
            <div>
              <p className="text-sm text-white">Order Value Potential</p>
              <p className="text-xs text-gray-400">
                ${(client.expectedOrderValue || 0).toLocaleString()} expected, {client.probabilityToClose || 0}% probability
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{scoreBreakdown.orderValueScore}/30</p>
          </div>
        </div>

        {/* Response Rate */}
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-sm text-white">Response Rate</p>
              <p className="text-xs text-gray-400">{client.responseRate || 0}% response rate</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{scoreBreakdown.responseRateScore}/15</p>
          </div>
        </div>
      </div>

      {/* Score Interpretation */}
      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-300 font-medium mb-1">
          {leadScore >= 80 ? '🔥 Hot Lead - High Priority' :
           leadScore >= 60 ? '✨ Qualified Lead - Good Potential' :
           leadScore >= 40 ? '⚡ Warm Lead - Needs Nurturing' :
           leadScore >= 20 ? '❄️ Cold Lead - Low Priority' :
           '📊 New Lead - Needs Qualification'}
        </p>
        <p className="text-xs text-gray-400">
          {leadScore >= 80 ? 'This lead shows strong buying signals. Prioritize immediate follow-up.' :
           leadScore >= 60 ? 'This lead is well-qualified. Schedule a demo or proposal.' :
           leadScore >= 40 ? 'Continue engagement to build relationship and trust.' :
           leadScore >= 20 ? 'Focus on higher-priority leads. Nurture through email campaigns.' :
           'Gather more information to properly qualify this lead.'}
        </p>
      </div>
    </div>
  );
}
