import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/orders/reports
 * Generate comprehensive order reports and analytics
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'summary';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build date filter
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    const whereClause: any = {};
    if (Object.keys(dateFilter).length > 0) {
      whereClause.orderDate = dateFilter;
    }

    switch (reportType) {
      case 'by-status':
        return await getOrdersByStatus(whereClause);
      
      case 'by-client':
        return await getOrdersByClient(whereClause);
      
      case 'by-product':
        return await getOrdersByProduct(whereClause);
      
      case 'by-date-range':
        return await getOrdersByDateRange(whereClause);
      
      case 'revenue':
        return await getRevenueReport(whereClause);
      
      case 'performance':
        return await getPerformanceMetrics(whereClause);
      
      case 'conversion':
        return await getConversionRate(whereClause);
      
      case 'summary':
      default:
        return await getSummaryReport(whereClause);
    }
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Orders by Status Report
async function getOrdersByStatus(whereClause: any) {
  const ordersByStatus = await prisma.order.groupBy({
    by: ['orderStatus'],
    where: whereClause,
    _count: {
      id: true,
    },
    _sum: {
      totalAmount: true,
    },
  });

  const formattedData = ordersByStatus.map((item) => ({
    status: item.orderStatus,
    count: item._count.id,
    totalValue: item._sum.totalAmount || 0,
    averageValue: item._sum.totalAmount && item._count.id 
      ? item._sum.totalAmount / item._count.id 
      : 0,
  }));

  return NextResponse.json({
    success: true,
    reportType: 'by-status',
    data: formattedData,
    totalOrders: formattedData.reduce((sum, item) => sum + item.count, 0),
    totalValue: formattedData.reduce((sum, item) => sum + item.totalValue, 0),
  });
}

// Orders by Client Report
async function getOrdersByClient(whereClause: any) {
  const ordersByClient = await prisma.order.groupBy({
    by: ['clientId', 'clientName'],
    where: whereClause,
    _count: {
      id: true,
    },
    _sum: {
      totalAmount: true,
    },
    orderBy: {
      _sum: {
        totalAmount: 'desc',
      },
    },
  });

  const formattedData = ordersByClient.map((item) => ({
    clientId: item.clientId,
    clientName: item.clientName,
    orderCount: item._count.id,
    totalRevenue: item._sum.totalAmount || 0,
    averageOrderValue: item._sum.totalAmount && item._count.id 
      ? item._sum.totalAmount / item._count.id 
      : 0,
  }));

  return NextResponse.json({
    success: true,
    reportType: 'by-client',
    data: formattedData,
    totalClients: formattedData.length,
    totalOrders: formattedData.reduce((sum, item) => sum + item.orderCount, 0),
    totalRevenue: formattedData.reduce((sum, item) => sum + item.totalRevenue, 0),
  });
}

// Orders by Product Report
async function getOrdersByProduct(whereClause: any) {
  const orders = await prisma.order.findMany({
    where: whereClause,
    include: {
      lineItems: true,
    },
  });

  // Aggregate by product
  const productMap = new Map<string, any>();

  orders.forEach((order) => {
    order.lineItems.forEach((item) => {
      const key = item.productName;
      if (!productMap.has(key)) {
        productMap.set(key, {
          productName: item.productName,
          productCode: item.productCode,
          totalQuantity: 0,
          totalRevenue: 0,
          orderCount: 0,
          orders: new Set(),
        });
      }

      const product = productMap.get(key);
      product.totalQuantity += item.quantity;
      product.totalRevenue += item.totalPrice;
      product.orders.add(order.id);
    });
  });

  const formattedData = Array.from(productMap.values()).map((item) => ({
    productName: item.productName,
    productCode: item.productCode,
    totalQuantity: item.totalQuantity,
    totalRevenue: item.totalRevenue,
    orderCount: item.orders.size,
    averageQuantityPerOrder: item.totalQuantity / item.orders.size,
  })).sort((a, b) => b.totalRevenue - a.totalRevenue);

  return NextResponse.json({
    success: true,
    reportType: 'by-product',
    data: formattedData,
    totalProducts: formattedData.length,
    totalRevenue: formattedData.reduce((sum, item) => sum + item.totalRevenue, 0),
  });
}

// Orders by Date Range Report
async function getOrdersByDateRange(whereClause: any) {
  const orders = await prisma.order.findMany({
    where: whereClause,
    orderBy: {
      orderDate: 'asc',
    },
  });

  // Group by month
  const monthlyData = new Map<string, any>();

  orders.forEach((order) => {
    const date = new Date(order.orderDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {
        month: monthKey,
        orderCount: 0,
        totalRevenue: 0,
        orders: [],
      });
    }

    const monthData = monthlyData.get(monthKey);
    monthData.orderCount++;
    monthData.totalRevenue += order.totalAmount;
    monthData.orders.push(order.orderNumber);
  });

  const formattedData = Array.from(monthlyData.values()).map((item) => ({
    month: item.month,
    orderCount: item.orderCount,
    totalRevenue: item.totalRevenue,
    averageOrderValue: item.totalRevenue / item.orderCount,
  }));

  return NextResponse.json({
    success: true,
    reportType: 'by-date-range',
    data: formattedData,
    totalOrders: orders.length,
    totalRevenue: formattedData.reduce((sum, item) => sum + item.totalRevenue, 0),
  });
}

// Revenue Report
async function getRevenueReport(whereClause: any) {
  const orders = await prisma.order.findMany({
    where: whereClause,
    include: {
      lineItems: true,
    },
  });

  // Calculate revenue metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Revenue by month
  const monthlyRevenue = new Map<string, number>();
  orders.forEach((order) => {
    const date = new Date(order.orderDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyRevenue.set(monthKey, (monthlyRevenue.get(monthKey) || 0) + order.totalAmount);
  });

  // Revenue by currency
  const revenueByCurrency = new Map<string, number>();
  orders.forEach((order) => {
    revenueByCurrency.set(
      order.currency,
      (revenueByCurrency.get(order.currency) || 0) + order.totalAmount
    );
  });

  // Revenue by order type
  const revenueByType = new Map<string, number>();
  orders.forEach((order) => {
    revenueByType.set(
      order.orderType,
      (revenueByType.get(order.orderType) || 0) + order.totalAmount
    );
  });

  return NextResponse.json({
    success: true,
    reportType: 'revenue',
    data: {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      monthlyRevenue: Array.from(monthlyRevenue.entries()).map(([month, revenue]) => ({
        month,
        revenue,
      })),
      revenueByCurrency: Array.from(revenueByCurrency.entries()).map(([currency, revenue]) => ({
        currency,
        revenue,
      })),
      revenueByType: Array.from(revenueByType.entries()).map(([type, revenue]) => ({
        type,
        revenue,
      })),
    },
  });
}

// Performance Metrics Report
async function getPerformanceMetrics(whereClause: any) {
  const orders = await prisma.order.findMany({
    where: whereClause,
  });

  // Calculate fulfillment time for delivered orders
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === 'Delivered' && order.actualDeliveryDate
  );

  const fulfillmentTimes = deliveredOrders.map((order) => {
    const orderDate = new Date(order.orderDate).getTime();
    const deliveryDate = new Date(order.actualDeliveryDate!).getTime();
    return (deliveryDate - orderDate) / (1000 * 60 * 60 * 24); // Days
  });

  const averageFulfillmentTime =
    fulfillmentTimes.length > 0
      ? fulfillmentTimes.reduce((sum, time) => sum + time, 0) / fulfillmentTimes.length
      : 0;

  // On-time delivery rate
  const ordersWithExpectedDate = orders.filter(
    (order) => order.expectedDeliveryDate && order.actualDeliveryDate
  );

  const onTimeDeliveries = ordersWithExpectedDate.filter((order) => {
    const expected = new Date(order.expectedDeliveryDate!).getTime();
    const actual = new Date(order.actualDeliveryDate!).getTime();
    return actual <= expected;
  });

  const onTimeDeliveryRate =
    ordersWithExpectedDate.length > 0
      ? (onTimeDeliveries.length / ordersWithExpectedDate.length) * 100
      : 0;

  // Payment collection rate
  const paidOrders = orders.filter((order) => order.paymentStatus === 'Paid');
  const paymentCollectionRate = orders.length > 0 ? (paidOrders.length / orders.length) * 100 : 0;

  return NextResponse.json({
    success: true,
    reportType: 'performance',
    data: {
      totalOrders: orders.length,
      deliveredOrders: deliveredOrders.length,
      averageFulfillmentTime: Math.round(averageFulfillmentTime * 10) / 10,
      onTimeDeliveryRate: Math.round(onTimeDeliveryRate * 10) / 10,
      paymentCollectionRate: Math.round(paymentCollectionRate * 10) / 10,
      ordersByStatus: {
        inquiry: orders.filter((o) => o.orderStatus === 'Inquiry').length,
        quoted: orders.filter((o) => o.orderStatus === 'Quoted').length,
        confirmed: orders.filter((o) => o.orderStatus === 'Confirmed').length,
        processing: orders.filter((o) => o.orderStatus === 'Processing').length,
        shipped: orders.filter((o) => o.orderStatus === 'Shipped').length,
        delivered: orders.filter((o) => o.orderStatus === 'Delivered').length,
        cancelled: orders.filter((o) => o.orderStatus === 'Cancelled').length,
      },
    },
  });
}

// Conversion Rate Report
async function getConversionRate(whereClause: any) {
  const orders = await prisma.order.findMany({
    where: whereClause,
  });

  const inquiries = orders.filter((order) => order.inquiryNumber);
  const quotes = orders.filter((order) => order.quoteNumber);
  const confirmed = orders.filter((order) =>
    ['Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(order.orderStatus)
  );

  const totalInquiries = inquiries.length;
  const totalQuotes = quotes.length;
  const totalConfirmed = confirmed.length;

  const inquiryToQuoteRate = totalInquiries > 0 ? (totalQuotes / totalInquiries) * 100 : 0;
  const quoteToOrderRate = totalQuotes > 0 ? (totalConfirmed / totalQuotes) * 100 : 0;
  const inquiryToOrderRate = totalInquiries > 0 ? (totalConfirmed / totalInquiries) * 100 : 0;

  return NextResponse.json({
    success: true,
    reportType: 'conversion',
    data: {
      totalInquiries,
      totalQuotes,
      totalConfirmedOrders: totalConfirmed,
      inquiryToQuoteRate: Math.round(inquiryToQuoteRate * 10) / 10,
      quoteToOrderRate: Math.round(quoteToOrderRate * 10) / 10,
      inquiryToOrderRate: Math.round(inquiryToOrderRate * 10) / 10,
      conversionFunnel: [
        { stage: 'Inquiries', count: totalInquiries, percentage: 100 },
        {
          stage: 'Quotes',
          count: totalQuotes,
          percentage: inquiryToQuoteRate,
        },
        {
          stage: 'Confirmed Orders',
          count: totalConfirmed,
          percentage: inquiryToOrderRate,
        },
      ],
    },
  });
}

// Summary Report
async function getSummaryReport(whereClause: any) {
  const orders = await prisma.order.findMany({
    where: whereClause,
    include: {
      lineItems: true,
    },
  });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Top clients
  const clientRevenue = new Map<string, { name: string; revenue: number; orders: number }>();
  orders.forEach((order) => {
    const key = order.clientName;
    if (!clientRevenue.has(key)) {
      clientRevenue.set(key, { name: key, revenue: 0, orders: 0 });
    }
    const client = clientRevenue.get(key)!;
    client.revenue += order.totalAmount;
    client.orders++;
  });

  const topClients = Array.from(clientRevenue.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Top products
  const productRevenue = new Map<string, { name: string; revenue: number; quantity: number }>();
  orders.forEach((order) => {
    order.lineItems.forEach((item) => {
      const key = item.productName;
      if (!productRevenue.has(key)) {
        productRevenue.set(key, { name: key, revenue: 0, quantity: 0 });
      }
      const product = productRevenue.get(key)!;
      product.revenue += item.totalPrice;
      product.quantity += item.quantity;
    });
  });

  const topProducts = Array.from(productRevenue.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  return NextResponse.json({
    success: true,
    reportType: 'summary',
    data: {
      overview: {
        totalOrders,
        totalRevenue,
        averageOrderValue,
      },
      topClients,
      topProducts,
      ordersByStatus: {
        inquiry: orders.filter((o) => o.orderStatus === 'Inquiry').length,
        quoted: orders.filter((o) => o.orderStatus === 'Quoted').length,
        confirmed: orders.filter((o) => o.orderStatus === 'Confirmed').length,
        processing: orders.filter((o) => o.orderStatus === 'Processing').length,
        shipped: orders.filter((o) => o.orderStatus === 'Shipped').length,
        delivered: orders.filter((o) => o.orderStatus === 'Delivered').length,
        cancelled: orders.filter((o) => o.orderStatus === 'Cancelled').length,
      },
    },
  });
}
