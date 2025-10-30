import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// GET engagement reports
export const GET = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');

    switch (reportType) {
      case 'communication-frequency':
        return await getCommunicationFrequency();
      
      case 'response-rate':
        return await getResponseRate();
      
      case 'overdue-followups':
        return await getOverdueFollowups();
      
      case 'inactive-clients':
        return await getInactiveClients();
      
      case 'most-engaged':
        return await getMostEngagedClients();
      
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error generating engagement report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
});

async function getCommunicationFrequency() {
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      totalInteractions: true,
      dateAdded: true,
    },
  });

  const communications = await prisma.communicationLog.groupBy({
    by: ['clientId'],
    _count: true,
  });

  const commMap = new Map(communications.map(c => [c.clientId, c._count]));

  const clientsWithFrequency = clients.map(client => {
    const commCount = commMap.get(client.id) || 0;
    const daysSinceAdded = Math.floor(
      (new Date().getTime() - new Date(client.dateAdded).getTime()) / (1000 * 60 * 60 * 24)
    );
    const frequency = daysSinceAdded > 0 ? (commCount / daysSinceAdded * 30).toFixed(2) : 0;

    return {
      ...client,
      communicationCount: commCount,
      frequencyPerMonth: parseFloat(frequency as string),
    };
  });

  const averageFrequency = clientsWithFrequency.length > 0
    ? clientsWithFrequency.reduce((sum, c) => sum + c.frequencyPerMonth, 0) / clientsWithFrequency.length
    : 0;

  return NextResponse.json({
    clients: clientsWithFrequency.sort((a, b) => b.frequencyPerMonth - a.frequencyPerMonth).slice(0, 50),
    averageFrequency: averageFrequency.toFixed(2),
  });
}

async function getResponseRate() {
  const outboundComms = await prisma.communicationLog.count({
    where: { direction: 'Outbound' },
  });

  const inboundComms = await prisma.communicationLog.count({
    where: { direction: 'Inbound' },
  });

  const responseRate = outboundComms > 0 ? (inboundComms / outboundComms * 100).toFixed(2) : 0;

  // Get response rate by communication type
  const byType = await prisma.communicationLog.groupBy({
    by: ['communicationType', 'direction'],
    _count: true,
  });

  const typeStats: Record<string, { outbound: number; inbound: number; rate: number }> = {};

  byType.forEach(item => {
    if (!typeStats[item.communicationType]) {
      typeStats[item.communicationType] = { outbound: 0, inbound: 0, rate: 0 };
    }
    if (item.direction === 'Outbound') {
      typeStats[item.communicationType].outbound = item._count;
    } else {
      typeStats[item.communicationType].inbound = item._count;
    }
  });

  Object.keys(typeStats).forEach(type => {
    const stats = typeStats[type];
    stats.rate = stats.outbound > 0 ? (stats.inbound / stats.outbound * 100) : 0;
  });

  return NextResponse.json({
    overall: {
      outbound: outboundComms,
      inbound: inboundComms,
      responseRate: parseFloat(responseRate as string),
    },
    byType: Object.entries(typeStats).map(([type, stats]) => ({
      type,
      ...stats,
    })),
  });
}

async function getOverdueFollowups() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueClients = await prisma.client.findMany({
    where: {
      nextFollowUpDate: {
        lt: today,
      },
      status: 'Active',
    },
    orderBy: { nextFollowUpDate: 'asc' },
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      contactPerson: true,
      emailPrimary: true,
      phonePrimary: true,
      nextFollowUpDate: true,
      followUpNotes: true,
      assignedTo: true,
      leadStatus: true,
    },
  });

  const withOverdueDays = overdueClients.map(client => ({
    ...client,
    daysOverdue: Math.floor(
      (today.getTime() - new Date(client.nextFollowUpDate!).getTime()) / (1000 * 60 * 60 * 24)
    ),
  }));

  return NextResponse.json({
    count: overdueClients.length,
    clients: withOverdueDays,
  });
}

async function getInactiveClients() {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - 30); // 30 days

  const inactiveClients = await prisma.client.findMany({
    where: {
      OR: [
        {
          lastContactDate: {
            lt: thresholdDate,
          },
        },
        {
          lastContactDate: null,
          dateAdded: {
            lt: thresholdDate,
          },
        },
      ],
      status: 'Active',
    },
    orderBy: { lastContactDate: 'asc' },
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      contactPerson: true,
      emailPrimary: true,
      lastContactDate: true,
      totalRevenue: true,
      totalOrders: true,
      assignedTo: true,
    },
  });

  const withDaysSinceContact = inactiveClients.map(client => ({
    ...client,
    daysSinceContact: client.lastContactDate
      ? Math.floor(
          (new Date().getTime() - new Date(client.lastContactDate).getTime()) / (1000 * 60 * 60 * 24)
        )
      : null,
  }));

  return NextResponse.json({
    count: inactiveClients.length,
    clients: withDaysSinceContact,
  });
}

async function getMostEngagedClients() {
  const clients = await prisma.client.findMany({
    where: { status: 'Active' },
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      contactPerson: true,
      totalInteractions: true,
      emailOpenRate: true,
      responseRate: true,
      lastContactDate: true,
      totalRevenue: true,
    },
  });

  const communications = await prisma.communicationLog.groupBy({
    by: ['clientId'],
    _count: true,
  });

  const commMap = new Map(communications.map(c => [c.clientId, c._count]));

  const clientsWithEngagement = clients.map(client => {
    const commCount = commMap.get(client.id) || 0;
    const engagementScore = 
      (commCount * 10) + 
      ((client.emailOpenRate || 0) * 5) + 
      ((client.responseRate || 0) * 5);

    return {
      ...client,
      communicationCount: commCount,
      engagementScore: Math.round(engagementScore),
    };
  });

  const topEngaged = clientsWithEngagement
    .sort((a, b) => b.engagementScore - a.engagementScore)
    .slice(0, 20);

  return NextResponse.json({
    clients: topEngaged,
    averageEngagement: clientsWithEngagement.length > 0
      ? Math.round(
          clientsWithEngagement.reduce((sum, c) => sum + c.engagementScore, 0) / clientsWithEngagement.length
        )
      : 0,
  });
}
