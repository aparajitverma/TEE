import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// GET client reports
export const GET = withPermission(PERMISSIONS.CLIENT_VIEW, async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');

    switch (reportType) {
      case 'total-count':
        return await getTotalClientsCount();
      
      case 'new-clients':
        return await getNewClients();
      
      case 'acquisition-trend':
        return await getAcquisitionTrend();
      
      case 'by-country':
        return await getClientsByCountry();
      
      case 'by-industry':
        return await getClientsByIndustry();
      
      case 'top-revenue':
        return await getTopClientsByRevenue();
      
      case 'lifetime-value':
        return await getLifetimeValueDistribution();
      
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
});

async function getTotalClientsCount() {
  const total = await prisma.client.count();
  const active = await prisma.client.count({ where: { status: 'Active' } });
  const inactive = await prisma.client.count({ where: { status: 'Inactive' } });
  
  const byType = await prisma.client.groupBy({
    by: ['clientType'],
    _count: true,
  });

  return NextResponse.json({
    total,
    active,
    inactive,
    byType: byType.map(t => ({ type: t.clientType, count: t._count })),
  });
}

async function getNewClients() {
  const now = new Date();
  
  // This month
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonth = await prisma.client.count({
    where: { dateAdded: { gte: thisMonthStart } },
  });

  // Last month
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  const lastMonth = await prisma.client.count({
    where: {
      dateAdded: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  // This quarter
  const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
  const thisQuarter = await prisma.client.count({
    where: { dateAdded: { gte: quarterStart } },
  });

  // Last quarter
  const lastQuarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 - 3, 1);
  const lastQuarterEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 0);
  const lastQuarter = await prisma.client.count({
    where: {
      dateAdded: {
        gte: lastQuarterStart,
        lte: lastQuarterEnd,
      },
    },
  });

  return NextResponse.json({
    thisMonth,
    lastMonth,
    thisQuarter,
    lastQuarter,
    monthGrowth: lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1) : 0,
    quarterGrowth: lastQuarter > 0 ? ((thisQuarter - lastQuarter) / lastQuarter * 100).toFixed(1) : 0,
  });
}

async function getAcquisitionTrend() {
  const clients = await prisma.client.findMany({
    select: { dateAdded: true },
  });

  const monthlyData: Record<string, number> = {};
  
  clients.forEach(c => {
    const month = new Date(c.dateAdded).toISOString().slice(0, 7);
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const trend = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12); // Last 12 months

  return NextResponse.json({ trend });
}

async function getClientsByCountry() {
  const byCountry = await prisma.client.groupBy({
    by: ['country'],
    _count: true,
    orderBy: { _count: { country: 'desc' } },
  });

  return NextResponse.json({
    countries: byCountry.map(c => ({
      country: c.country || 'Unknown',
      count: c._count,
    })),
  });
}

async function getClientsByIndustry() {
  const byIndustry = await prisma.client.groupBy({
    by: ['industry'],
    _count: true,
    orderBy: { _count: { industry: 'desc' } },
  });

  return NextResponse.json({
    industries: byIndustry.map(i => ({
      industry: i.industry || 'Unknown',
      count: i._count,
    })),
  });
}

async function getTopClientsByRevenue() {
  const clients = await prisma.client.findMany({
    orderBy: { totalRevenue: 'desc' },
    take: 20,
    select: {
      id: true,
      clientCode: true,
      companyName: true,
      totalRevenue: true,
      totalOrders: true,
      averageOrderValue: true,
      country: true,
      industry: true,
    },
  });

  return NextResponse.json({ clients });
}

async function getLifetimeValueDistribution() {
  const clients = await prisma.client.findMany({
    select: { totalRevenue: true },
  });

  const distribution = {
    '0-1000': 0,
    '1000-5000': 0,
    '5000-10000': 0,
    '10000-50000': 0,
    '50000+': 0,
  };

  clients.forEach(c => {
    const revenue = c.totalRevenue;
    if (revenue < 1000) distribution['0-1000']++;
    else if (revenue < 5000) distribution['1000-5000']++;
    else if (revenue < 10000) distribution['5000-10000']++;
    else if (revenue < 50000) distribution['10000-50000']++;
    else distribution['50000+']++;
  });

  return NextResponse.json({
    distribution,
    total: clients.length,
    averageLTV: clients.reduce((sum, c) => sum + c.totalRevenue, 0) / clients.length,
  });
}
