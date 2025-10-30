import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// GET client reminders and alerts
export const GET = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'follow-up':
        return await getFollowUpReminders();
      
      case 'birthday':
        return await getBirthdayReminders();
      
      case 'contract-renewal':
        return await getContractRenewalReminders();
      
      case 'inactive-clients':
        return await getInactiveClientAlerts();
      
      case 'hot-leads':
        return await getHotLeadAlerts();
      
      case 'all':
        return await getAllReminders();
      
      default:
        return NextResponse.json({ error: 'Invalid reminder type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 });
  }
});

async function getFollowUpReminders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const clients = await prisma.client.findMany({
    where: {
      nextFollowUpDate: {
        lte: today,
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
      leadStatus: true,
      assignedTo: true,
    },
  });

  return NextResponse.json({
    type: 'follow-up',
    count: clients.length,
    reminders: clients.map(c => ({
      ...c,
      daysOverdue: Math.floor((today.getTime() - new Date(c.nextFollowUpDate!).getTime()) / (1000 * 60 * 60 * 24)),
    })),
  });
}

async function getBirthdayReminders() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  // Note: This is a simplified version. In production, you'd need a birthday field in the schema
  // For now, returning empty array as birthday field doesn't exist
  return NextResponse.json({
    type: 'birthday',
    count: 0,
    reminders: [],
    note: 'Birthday field not yet implemented in schema',
  });
}

async function getContractRenewalReminders() {
  const today = new Date();
  const next30Days = new Date(today);
  next30Days.setDate(today.getDate() + 30);

  // Note: Contract renewal date field doesn't exist in current schema
  // This is a placeholder implementation
  return NextResponse.json({
    type: 'contract-renewal',
    count: 0,
    reminders: [],
    note: 'Contract renewal field not yet implemented in schema',
  });
}

async function getInactiveClientAlerts() {
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - 90); // 90 days

  const clients = await prisma.client.findMany({
    where: {
      OR: [
        {
          lastOrderDate: {
            lt: thresholdDate,
          },
        },
        {
          lastOrderDate: null,
          dateAdded: {
            lt: thresholdDate,
          },
        },
      ],
      status: 'Active',
    },
    orderBy: { lastOrderDate: 'asc' },
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      contactPerson: true,
      emailPrimary: true,
      phonePrimary: true,
      lastOrderDate: true,
      totalOrders: true,
      totalRevenue: true,
      daysSinceLastOrder: true,
      assignedTo: true,
    },
  });

  return NextResponse.json({
    type: 'inactive-clients',
    count: clients.length,
    alerts: clients.map(c => ({
      ...c,
      daysSinceLastOrder: c.lastOrderDate 
        ? Math.floor((new Date().getTime() - new Date(c.lastOrderDate).getTime()) / (1000 * 60 * 60 * 24))
        : null,
    })),
  });
}

async function getHotLeadAlerts() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const clients = await prisma.client.findMany({
    where: {
      leadScore: {
        gte: 70, // High lead score
      },
      leadStatus: {
        in: ['Qualified', 'Proposal Sent', 'Negotiation'],
      },
      OR: [
        {
          lastContactDate: {
            lt: sevenDaysAgo,
          },
        },
        {
          lastContactDate: null,
        },
      ],
      status: 'Active',
    },
    orderBy: { leadScore: 'desc' },
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      contactPerson: true,
      emailPrimary: true,
      phonePrimary: true,
      leadScore: true,
      leadStatus: true,
      leadTemperature: true,
      lastContactDate: true,
      expectedOrderValue: true,
      expectedCloseDate: true,
      assignedTo: true,
    },
  });

  return NextResponse.json({
    type: 'hot-leads',
    count: clients.length,
    alerts: clients.map(c => ({
      ...c,
      daysSinceContact: c.lastContactDate
        ? Math.floor((new Date().getTime() - new Date(c.lastContactDate).getTime()) / (1000 * 60 * 60 * 24))
        : null,
    })),
  });
}

async function getAllReminders() {
  const [followUp, inactive, hotLeads] = await Promise.all([
    getFollowUpReminders(),
    getInactiveClientAlerts(),
    getHotLeadAlerts(),
  ]);

  const followUpData = await followUp.json();
  const inactiveData = await inactive.json();
  const hotLeadsData = await hotLeads.json();

  return NextResponse.json({
    summary: {
      followUp: followUpData.count,
      inactiveClients: inactiveData.count,
      hotLeads: hotLeadsData.count,
      total: followUpData.count + inactiveData.count + hotLeadsData.count,
    },
    reminders: {
      followUp: followUpData.reminders,
      inactiveClients: inactiveData.alerts,
      hotLeads: hotLeadsData.alerts,
    },
  });
}
