import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Calculate automatic rating based on performance metrics
 */
function calculateAutomaticRating(metrics: any): {
  rating: number;
  onTimeDeliveryPercent: number;
  qualityRejectionRate: number;
  communicationScore: number;
} {
  // On-time delivery percentage (40% weight)
  const onTimeDeliveryPercent =
    metrics.completedOrders > 0
      ? (metrics.onTimeDeliveries / metrics.completedOrders) * 100
      : 0;
  const onTimeScore = (onTimeDeliveryPercent / 100) * 2; // Max 2 points

  // Quality rejection rate (40% weight) - lower is better
  const qualityRejectionRate =
    metrics.qualityAccepted + metrics.qualityRejected > 0
      ? (metrics.qualityRejected / (metrics.qualityAccepted + metrics.qualityRejected)) * 100
      : 0;
  const qualityScore = ((100 - qualityRejectionRate) / 100) * 2; // Max 2 points

  // Communication responsiveness (20% weight)
  // Assuming response time < 2 hours is excellent, > 24 hours is poor
  const responseTimeHours = metrics.responseTimeAvg || 12;
  let communicationScore = 0;
  if (responseTimeHours <= 2) communicationScore = 1.0;
  else if (responseTimeHours <= 6) communicationScore = 0.8;
  else if (responseTimeHours <= 12) communicationScore = 0.6;
  else if (responseTimeHours <= 24) communicationScore = 0.4;
  else communicationScore = 0.2;
  // Max 1 point

  // Total rating out of 5
  const rating = Math.min(5, Math.max(0, onTimeScore + qualityScore + communicationScore));

  return {
    rating: Math.round(rating * 10) / 10, // Round to 1 decimal
    onTimeDeliveryPercent: Math.round(onTimeDeliveryPercent * 10) / 10,
    qualityRejectionRate: Math.round(qualityRejectionRate * 10) / 10,
    communicationScore: Math.round(communicationScore * 10) / 10,
  };
}

/**
 * GET /api/vendors/[id]/rating
 * Get vendor rating and history
 */
export async function GET(
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

    // Get vendor
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: {
        id: true,
        vendorName: true,
        vendorCode: true,
        rating: true,
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Get rating history
    // @ts-ignore - VendorRatingHistory model exists in schema but Prisma client needs regeneration
    const ratingHistory = await prisma.vendorRatingHistory.findMany({
      where: { vendorId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    // Get performance metrics
    // @ts-ignore - VendorPerformanceMetrics model exists in schema but Prisma client needs regeneration
    const metrics = await prisma.vendorPerformanceMetrics.findUnique({
      where: { vendorId },
    });

    // Calculate automatic rating if metrics exist
    let automaticRating = null;
    if (metrics) {
      automaticRating = calculateAutomaticRating(metrics);
    }

    return NextResponse.json({
      success: true,
      vendor: {
        id: vendor.id,
        name: vendor.vendorName,
        code: vendor.vendorCode,
        currentRating: vendor.rating,
      },
      ratingHistory,
      metrics,
      automaticRating,
    });
  } catch (error) {
    console.error('Error fetching vendor rating:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch vendor rating',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/vendors/[id]/rating
 * Update vendor rating (manual)
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
    const { rating, notes, ratedBy } = body;

    if (rating === undefined || rating < 0 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 0 and 5' },
        { status: 400 }
      );
    }

    if (!ratedBy) {
      return NextResponse.json(
        { success: false, error: 'ratedBy is required' },
        { status: 400 }
      );
    }

    // Get current vendor rating
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { rating: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const previousRating = vendor.rating;

    // Update vendor rating
    await prisma.vendor.update({
      where: { id: vendorId },
      data: { rating: parseFloat(rating) },
    });

    // Add to rating history
    // @ts-ignore - VendorRatingHistory model exists in schema but Prisma client needs regeneration
    const historyEntry = await prisma.vendorRatingHistory.create({
      data: {
        vendorId,
        rating: parseFloat(rating),
        previousRating,
        ratingType: 'Manual',
        notes,
        ratedBy,
      },
    });

    // Check if rating dropped below threshold (e.g., 3.0)
    const threshold = 3.0;
    const ratingDropped = previousRating && previousRating >= threshold && rating < threshold;

    return NextResponse.json({
      success: true,
      message: 'Rating updated successfully',
      rating: parseFloat(rating),
      previousRating,
      historyEntry,
      alert: ratingDropped
        ? {
            type: 'warning',
            message: `Rating dropped below ${threshold}. Immediate attention required.`,
          }
        : null,
    });
  } catch (error) {
    console.error('Error updating vendor rating:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update vendor rating',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/vendors/[id]/rating
 * Calculate and update automatic rating
 */
export async function PUT(
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

    // Get current vendor rating
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { rating: true },
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: 'Vendor not found' },
        { status: 404 }
      );
    }

    // Get or create performance metrics
    // @ts-ignore - VendorPerformanceMetrics model exists in schema but Prisma client needs regeneration
    let metrics = await prisma.vendorPerformanceMetrics.findUnique({
      where: { vendorId },
    });

    if (!metrics) {
      // Create initial metrics
      // @ts-ignore - VendorPerformanceMetrics model exists in schema but Prisma client needs regeneration
      metrics = await prisma.vendorPerformanceMetrics.create({
        data: { vendorId },
      });
    }

    // Calculate automatic rating
    const calculatedRating = calculateAutomaticRating(metrics);
    const previousRating = vendor.rating;

    // Update vendor rating
    await prisma.vendor.update({
      where: { id: vendorId },
      data: { rating: calculatedRating.rating },
    });

    // Update metrics last calculated time
    // @ts-ignore - VendorPerformanceMetrics model exists in schema but Prisma client needs regeneration
    await prisma.vendorPerformanceMetrics.update({
      where: { vendorId },
      data: { lastCalculated: new Date() },
    });

    // Add to rating history
    // @ts-ignore - VendorRatingHistory model exists in schema but Prisma client needs regeneration
    const historyEntry = await prisma.vendorRatingHistory.create({
      data: {
        vendorId,
        rating: calculatedRating.rating,
        previousRating,
        ratingType: 'Automatic',
        onTimeDeliveryPercent: calculatedRating.onTimeDeliveryPercent,
        qualityRejectionRate: calculatedRating.qualityRejectionRate,
        communicationScore: calculatedRating.communicationScore,
        totalOrders: metrics.totalOrders,
        ratedBy: 'System',
      },
    });

    // Check if rating dropped below threshold
    const threshold = 3.0;
    const ratingDropped =
      previousRating && previousRating >= threshold && calculatedRating.rating < threshold;

    return NextResponse.json({
      success: true,
      message: 'Automatic rating calculated and updated',
      rating: calculatedRating.rating,
      previousRating,
      breakdown: calculatedRating,
      historyEntry,
      alert: ratingDropped
        ? {
            type: 'warning',
            message: `Rating dropped below ${threshold}. Immediate attention required.`,
          }
        : null,
    });
  } catch (error) {
    console.error('Error calculating automatic rating:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate automatic rating',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
