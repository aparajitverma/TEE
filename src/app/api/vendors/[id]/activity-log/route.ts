import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/vendors/[id]/activity-log
 * Get activity log for a specific vendor
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const actionType = searchParams.get('actionType');
    const limit = parseInt(searchParams.get('limit') || '100');

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, vendorName: true, vendorCode: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Build where clause
    const whereClause: any = { vendorId };
    if (actionType && actionType !== 'all') {
      whereClause.actionType = actionType;
    }

    // Fetch activity logs
    // @ts-ignore - VendorActivityLog model exists in schema but Prisma client needs regeneration
    const logs = await prisma.vendorActivityLog.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Get action type statistics
    // @ts-ignore - VendorActivityLog model exists in schema but Prisma client needs regeneration
    const allLogs = await prisma.vendorActivityLog.findMany({
      where: { vendorId },
      select: { actionType: true },
    });

    const actionTypeStats = allLogs.reduce((acc: Record<string, number>, log: any) => {
      acc[log.actionType] = (acc[log.actionType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        name: vendor.vendorName,
        code: vendor.vendorCode,
      },
      logs,
      totalLogs: logs.length,
      actionTypeStats,
    });
  } catch (error) {
    console.error('Error fetching activity log:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch activity log',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendors/[id]/activity-log
 * Add a new activity log entry
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = parseInt(params.id);

    if (isNaN(vendorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid vendor ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { actionType, actionBy, details, ipAddress, userAgent } = body;

    // Validate required fields
    if (!actionType || !actionBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Create activity log entry
    // @ts-ignore - VendorActivityLog model exists in schema but Prisma client needs regeneration
    const log = await prisma.vendorActivityLog.create({
      data: {
        vendorId,
        actionType,
        actionBy,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
        userAgent,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Activity logged successfully',
      log,
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create activity log',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
