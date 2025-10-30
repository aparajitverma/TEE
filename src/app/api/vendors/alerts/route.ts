import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface VendorAlert {
  vendorId: number;
  vendorName: string;
  vendorCode: string;
  alertType: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  details: any;
}

/**
 * GET /api/vendors/alerts
 * Get all vendor alerts and reminders
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');
    const alertType = searchParams.get('alertType');

    const alerts: VendorAlert[] = [];

    // Build where clause
    const whereClause: any = {};
    if (vendorId) {
      whereClause.id = parseInt(vendorId);
    }

    // Fetch all vendors with necessary data
    const vendors = await prisma.vendor.findMany({
      where: whereClause,
      select: {
        id: true,
        vendorName: true,
        vendorCode: true,
        outstandingAmount: true,
        creditLimit: true,
        contractStartDate: true,
        contractEndDate: true,
        totalOrders: true,
        lastUpdated: true,
        contactPerson: true,
      },
    });

    const now = new Date();

    for (const vendor of vendors) {
      // 1. Alert when outstanding amount exceeds credit limit
      if (
        (!alertType || alertType === 'credit_limit') &&
        vendor.outstandingAmount > vendor.creditLimit
      ) {
        const exceededBy = vendor.outstandingAmount - vendor.creditLimit;
        const exceededPercent = ((exceededBy / vendor.creditLimit) * 100).toFixed(1);

        alerts.push({
          vendorId: vendor.id,
          vendorName: vendor.vendorName,
          vendorCode: vendor.vendorCode,
          alertType: 'credit_limit',
          severity: exceededBy > vendor.creditLimit * 0.5 ? 'critical' : 'warning',
          message: `Outstanding amount exceeds credit limit by ${exceededPercent}%`,
          details: {
            outstandingAmount: vendor.outstandingAmount,
            creditLimit: vendor.creditLimit,
            exceededBy,
            exceededPercent: parseFloat(exceededPercent),
          },
        });
      }

      // 2. Reminder for contract renewal (30 days before expiry)
      if ((!alertType || alertType === 'contract_renewal') && vendor.contractEndDate) {
        const endDate = new Date(vendor.contractEndDate);
        const daysUntilExpiry = Math.ceil(
          (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysUntilExpiry > 0 && daysUntilExpiry <= 30) {
          alerts.push({
            vendorId: vendor.id,
            vendorName: vendor.vendorName,
            vendorCode: vendor.vendorCode,
            alertType: 'contract_renewal',
            severity: daysUntilExpiry <= 7 ? 'critical' : daysUntilExpiry <= 14 ? 'warning' : 'info',
            message: `Contract expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
            details: {
              contractEndDate: vendor.contractEndDate,
              daysUntilExpiry,
              contractStartDate: vendor.contractStartDate,
            },
          });
        } else if (daysUntilExpiry < 0) {
          alerts.push({
            vendorId: vendor.id,
            vendorName: vendor.vendorName,
            vendorCode: vendor.vendorCode,
            alertType: 'contract_expired',
            severity: 'critical',
            message: `Contract expired ${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) !== 1 ? 's' : ''} ago`,
            details: {
              contractEndDate: vendor.contractEndDate,
              daysExpired: Math.abs(daysUntilExpiry),
            },
          });
        }
      }

      // 3. Alert for vendors with no orders in 90 days
      if ((!alertType || alertType === 'inactive_vendor') && vendor.lastUpdated) {
        const daysSinceLastActivity = Math.ceil(
          (now.getTime() - new Date(vendor.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastActivity >= 90) {
          alerts.push({
            vendorId: vendor.id,
            vendorName: vendor.vendorName,
            vendorCode: vendor.vendorCode,
            alertType: 'inactive_vendor',
            severity: daysSinceLastActivity >= 180 ? 'warning' : 'info',
            message: `No activity in ${daysSinceLastActivity} days`,
            details: {
              daysSinceLastActivity,
              lastActivityDate: vendor.lastUpdated,
              totalOrders: vendor.totalOrders,
            },
          });
        }
      }

      // 4. Birthday/anniversary reminders (optional)
      // Note: This requires additional fields in the vendor model
      // For now, we'll check if contactPerson has a birthday field
      // This is a placeholder implementation
      if (!alertType || alertType === 'birthday') {
        // Placeholder: In production, you'd have a separate field for birthdays
        // For example: vendor.contactPersonBirthday
        // We'll skip this for now as it requires schema changes
      }
    }

    // Sort alerts by severity
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    // Group alerts by type
    const alertsByType = alerts.reduce((acc: any, alert) => {
      if (!acc[alert.alertType]) {
        acc[alert.alertType] = [];
      }
      acc[alert.alertType].push(alert);
      return acc;
    }, {});

    // Count by severity
    const alertsBySeverity = alerts.reduce(
      (acc: any, alert) => {
        acc[alert.severity]++;
        return acc;
      },
      { critical: 0, warning: 0, info: 0 }
    );

    return NextResponse.json({
      success: true,
      alerts,
      totalAlerts: alerts.length,
      alertsByType,
      alertsBySeverity,
    });
  } catch (error) {
    console.error('Error fetching vendor alerts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vendor alerts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendors/alerts/dismiss
 * Dismiss or acknowledge an alert
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorId, alertType, dismissedBy } = body;

    if (!vendorId || !alertType || !dismissedBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a production system, you'd store dismissed alerts in a database
    // For now, we'll just return success
    // You could create a VendorAlertDismissal model to track this

    return NextResponse.json({
      success: true,
      message: 'Alert dismissed successfully',
      dismissedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error dismissing alert:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to dismiss alert',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
