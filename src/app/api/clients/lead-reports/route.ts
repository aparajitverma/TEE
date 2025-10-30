import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// GET lead reports
export const GET = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');

    switch (reportType) {
      case 'pipeline':
        return await getLeadPipeline();
      
      case 'by-source':
        return await getLeadsBySource();
      
      case 'by-status':
        return await getLeadsByStatus();
      
      case 'conversion-rate':
        return await getConversionRate();
      
      case 'time-to-close':
        return await getAverageTimeToClose();
      
      case 'win-loss':
        return await getWinLossAnalysis();
      
      case 'score-distribution':
        return await getLeadScoreDistribution();
      
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error generating lead report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
});

async function getLeadPipeline() {
  const leads = await prisma.client.findMany({
    where: {
      clientType: {
        in: ['Lead', 'Prospect'],
      },
    },
    select: {
      id: true,
      leadStatus: true,
      expectedOrderValue: true,
      probabilityToClose: true,
      leadTemperature: true,
    },
  });

  const pipeline = {
    'New': { count: 0, value: 0 },
    'Contacted': { count: 0, value: 0 },
    'Qualified': { count: 0, value: 0 },
    'Proposal Sent': { count: 0, value: 0 },
    'Negotiation': { count: 0, value: 0 },
    'Won': { count: 0, value: 0 },
    'Lost': { count: 0, value: 0 },
  };

  leads.forEach(lead => {
    const status = lead.leadStatus || 'New';
    if (pipeline[status as keyof typeof pipeline]) {
      pipeline[status as keyof typeof pipeline].count++;
      pipeline[status as keyof typeof pipeline].value += lead.expectedOrderValue || 0;
    }
  });

  const totalValue = Object.values(pipeline).reduce((sum, stage) => sum + stage.value, 0);
  const totalLeads = Object.values(pipeline).reduce((sum, stage) => sum + stage.count, 0);

  return NextResponse.json({
    pipeline,
    totalValue,
    totalLeads,
    averageValue: totalLeads > 0 ? totalValue / totalLeads : 0,
  });
}

async function getLeadsBySource() {
  const bySource = await prisma.client.groupBy({
    by: ['leadSource'],
    where: {
      clientType: {
        in: ['Lead', 'Prospect'],
      },
    },
    _count: true,
  });

  return NextResponse.json({
    sources: bySource.map(s => ({
      source: s.leadSource || 'Unknown',
      count: s._count,
    })),
  });
}

async function getLeadsByStatus() {
  const byStatus = await prisma.client.groupBy({
    by: ['leadStatus'],
    where: {
      clientType: {
        in: ['Lead', 'Prospect'],
      },
    },
    _count: true,
  });

  return NextResponse.json({
    statuses: byStatus.map(s => ({
      status: s.leadStatus || 'Unknown',
      count: s._count,
    })),
  });
}

async function getConversionRate() {
  const totalLeads = await prisma.client.count({
    where: {
      clientType: {
        in: ['Lead', 'Prospect'],
      },
    },
  });

  const convertedLeads = await prisma.client.count({
    where: {
      clientType: 'Active Client',
      firstOrderDate: { not: null },
    },
  });

  const wonLeads = await prisma.client.count({
    where: {
      leadStatus: 'Won',
    },
  });

  const lostLeads = await prisma.client.count({
    where: {
      leadStatus: 'Lost',
    },
  });

  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads * 100).toFixed(2) : 0;
  const winRate = (wonLeads + lostLeads) > 0 ? (wonLeads / (wonLeads + lostLeads) * 100).toFixed(2) : 0;

  return NextResponse.json({
    totalLeads,
    convertedLeads,
    wonLeads,
    lostLeads,
    conversionRate: parseFloat(conversionRate as string),
    winRate: parseFloat(winRate as string),
  });
}

async function getAverageTimeToClose() {
  const closedLeads = await prisma.client.findMany({
    where: {
      leadStatus: {
        in: ['Won', 'Lost'],
      },
      dateAdded: { not: null },
      lastUpdated: { not: null },
    },
    select: {
      dateAdded: true,
      lastUpdated: true,
      leadStatus: true,
    },
  });

  let totalDays = 0;
  let wonTotalDays = 0;
  let wonCount = 0;

  closedLeads.forEach(lead => {
    const days = Math.floor(
      (new Date(lead.lastUpdated).getTime() - new Date(lead.dateAdded).getTime()) / (1000 * 60 * 60 * 24)
    );
    totalDays += days;
    
    if (lead.leadStatus === 'Won') {
      wonTotalDays += days;
      wonCount++;
    }
  });

  const averageTimeToClose = closedLeads.length > 0 ? Math.round(totalDays / closedLeads.length) : 0;
  const averageTimeToWin = wonCount > 0 ? Math.round(wonTotalDays / wonCount) : 0;

  return NextResponse.json({
    averageTimeToClose,
    averageTimeToWin,
    totalClosedLeads: closedLeads.length,
  });
}

async function getWinLossAnalysis() {
  const wonLeads = await prisma.client.findMany({
    where: { leadStatus: 'Won' },
    select: {
      id: true,
      companyName: true,
      expectedOrderValue: true,
      leadSource: true,
      dateAdded: true,
      lastUpdated: true,
    },
  });

  const lostLeads = await prisma.client.findMany({
    where: { leadStatus: 'Lost' },
    select: {
      id: true,
      companyName: true,
      expectedOrderValue: true,
      leadSource: true,
      lostReason: true,
      competitorName: true,
      dateAdded: true,
      lastUpdated: true,
    },
  });

  const wonValue = wonLeads.reduce((sum, lead) => sum + (lead.expectedOrderValue || 0), 0);
  const lostValue = lostLeads.reduce((sum, lead) => sum + (lead.expectedOrderValue || 0), 0);

  // Group lost reasons
  const lostReasons: Record<string, number> = {};
  lostLeads.forEach(lead => {
    const reason = lead.lostReason || 'Unknown';
    lostReasons[reason] = (lostReasons[reason] || 0) + 1;
  });

  return NextResponse.json({
    won: {
      count: wonLeads.length,
      value: wonValue,
      averageValue: wonLeads.length > 0 ? wonValue / wonLeads.length : 0,
    },
    lost: {
      count: lostLeads.length,
      value: lostValue,
      averageValue: lostLeads.length > 0 ? lostValue / lostLeads.length : 0,
      reasons: Object.entries(lostReasons).map(([reason, count]) => ({ reason, count })),
    },
    winRate: (wonLeads.length + lostLeads.length) > 0 
      ? ((wonLeads.length / (wonLeads.length + lostLeads.length)) * 100).toFixed(2)
      : 0,
  });
}

async function getLeadScoreDistribution() {
  const leads = await prisma.client.findMany({
    where: {
      clientType: {
        in: ['Lead', 'Prospect'],
      },
    },
    select: {
      leadScore: true,
    },
  });

  const distribution = {
    '0-20': 0,
    '21-40': 0,
    '41-60': 0,
    '61-80': 0,
    '81-100': 0,
  };

  leads.forEach(lead => {
    const score = lead.leadScore || 0;
    if (score <= 20) distribution['0-20']++;
    else if (score <= 40) distribution['21-40']++;
    else if (score <= 60) distribution['41-60']++;
    else if (score <= 80) distribution['61-80']++;
    else distribution['81-100']++;
  });

  const averageScore = leads.length > 0
    ? leads.reduce((sum, lead) => sum + (lead.leadScore || 0), 0) / leads.length
    : 0;

  return NextResponse.json({
    distribution,
    total: leads.length,
    averageScore: averageScore.toFixed(2),
  });
}
