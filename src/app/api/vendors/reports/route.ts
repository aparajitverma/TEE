import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PERMISSIONS } from '@/lib/auth';
import { withPermission } from '@/lib/route-handler';

// GET vendor reports
export const GET = withPermission(PERMISSIONS.VENDOR_VIEW, async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type');

    switch (reportType) {
      case 'top-vendors':
        return await getTopVendorsByValue();
      
      case 'performance-scorecard':
        return await getPerformanceScorecard();
      
      case 'product-supply-matrix':
        return await getProductSupplyMatrix();
      
      case 'outstanding-payments':
        return await getOutstandingPayments();
      
      case 'addition-trend':
        return await getAdditionTrend();
      
      case 'inactive-vendors':
        return await getInactiveVendors();
      
      case 'rating-distribution':
        return await getRatingDistribution();
      
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
});

async function getTopVendorsByValue() {
  const vendors = await prisma.vendor.findMany({
    orderBy: { totalValue: 'desc' },
    take: 10,
    select: {
      id: true,
      vendorCode: true,
      vendorName: true,
      totalValue: true,
      totalOrders: true,
      rating: true,
    },
  });

  return NextResponse.json({ vendors });
}

async function getPerformanceScorecard() {
  const vendors = await prisma.vendor.findMany({
    where: { status: 'Active' },
    select: {
      id: true,
      vendorCode: true,
      vendorName: true,
      rating: true,
      qualityRating: true,
      deliveryRating: true,
      communicationRating: true,
      totalOrders: true,
      totalValue: true,
      outstandingAmount: true,
    },
  });

  return NextResponse.json({ vendors });
}

async function getProductSupplyMatrix() {
  const vendors = await prisma.vendor.findMany({
    where: { status: 'Active' },
    select: {
      id: true,
      vendorCode: true,
      vendorName: true,
      productsSupplied: true,
      monthlyCapacity: true,
      minimumOrderQty: true,
      leadTimeDays: true,
    },
  });

  const matrix = vendors.map(v => ({
    ...v,
    productsSupplied: v.productsSupplied ? JSON.parse(v.productsSupplied) : [],
  }));

  return NextResponse.json({ matrix });
}

async function getOutstandingPayments() {
  const vendors = await prisma.vendor.findMany({
    where: {
      outstandingAmount: { gt: 0 },
    },
    orderBy: { outstandingAmount: 'desc' },
    select: {
      id: true,
      vendorCode: true,
      vendorName: true,
      outstandingAmount: true,
      totalValue: true,
      lastOrderDate: true,
      paymentTerms: true,
    },
  });

  const total = vendors.reduce((sum, v) => sum + v.outstandingAmount, 0);

  return NextResponse.json({ vendors, totalOutstanding: total });
}

async function getAdditionTrend() {
  const vendors = await prisma.vendor.findMany({
    select: {
      dateAdded: true,
    },
  });

  const monthlyData: Record<string, number> = {};
  
  vendors.forEach(v => {
    const month = new Date(v.dateAdded).toISOString().slice(0, 7);
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const trend = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return NextResponse.json({ trend });
}

async function getInactiveVendors() {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const vendors = await prisma.vendor.findMany({
    where: {
      OR: [
        { status: 'Inactive' },
        {
          AND: [
            { lastOrderDate: { lt: threeMonthsAgo } },
            { status: 'Active' },
          ],
        },
      ],
    },
    select: {
      id: true,
      vendorCode: true,
      vendorName: true,
      status: true,
      lastOrderDate: true,
      totalOrders: true,
      totalValue: true,
    },
  });

  return NextResponse.json({ vendors });
}

async function getRatingDistribution() {
  const vendors = await prisma.vendor.findMany({
    select: {
      rating: true,
    },
  });

  const distribution = {
    '0-1': 0,
    '1-2': 0,
    '2-3': 0,
    '3-4': 0,
    '4-5': 0,
  };

  vendors.forEach(v => {
    const rating = v.rating || 0;
    if (rating < 1) distribution['0-1']++;
    else if (rating < 2) distribution['1-2']++;
    else if (rating < 3) distribution['2-3']++;
    else if (rating < 4) distribution['3-4']++;
    else distribution['4-5']++;
  });

  return NextResponse.json({ distribution, total: vendors.length });
}
