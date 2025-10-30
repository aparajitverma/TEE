import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all products with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const where: any = {};

    if (search) {
      where.OR = [
        { productName: { contains: search, mode: 'insensitive' } },
        { productCode: { contains: search, mode: 'insensitive' } },
        { productNameScientific: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { dateAdded: 'desc' },
    });

    // Calculate stats
    const stats = {
      totalProducts: await prisma.product.count(),
      activeProducts: await prisma.product.count({ where: { status: 'Active' } }),
      lowStock: await prisma.product.count({
        where: {
          currentStock: { lte: prisma.product.fields.reorderLevel },
        },
      }),
      outOfStock: await prisma.product.count({ where: { status: 'Out of Stock' } }),
    };

    return NextResponse.json({ products, stats });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Auto-generate product code if not provided
    if (!body.productCode) {
      const count = await prisma.product.count();
      body.productCode = `PROD-${String(count + 1).padStart(4, '0')}`;
    }

    // Auto-generate slug from product name
    if (!body.slug && body.productName) {
      body.slug = body.productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Calculate margin percentage
    if (body.costPrice && body.sellingPrice) {
      body.marginPercentage = ((body.sellingPrice - body.costPrice) / body.costPrice) * 100;
    }

    const product = await prisma.product.create({
      data: {
        productCode: body.productCode,
        productName: body.productName,
        productNameScientific: body.productNameScientific || null,
        category: body.category,
        subcategory: body.subcategory || null,
        status: body.status || 'Active',
        featured: body.featured || false,
        shortDescription: body.shortDescription || null,
        longDescription: body.longDescription || null,
        metaDescription: body.metaDescription || null,
        metaKeywords: body.metaKeywords || null,
        seoTitle: body.seoTitle || null,
        slug: body.slug,
        specifications: body.specifications || null,
        costPrice: parseFloat(body.costPrice) || 0,
        sellingPrice: parseFloat(body.sellingPrice) || 0,
        currency: body.currency || 'USD',
        unit: body.unit || 'kg',
        moq: parseInt(body.moq) || 1,
        marginPercentage: body.marginPercentage || null,
        bulkPricing: body.bulkPricing || null,
        currentStock: parseFloat(body.currentStock) || 0,
        stockUnit: body.stockUnit || 'kg',
        reorderLevel: body.reorderLevel ? parseFloat(body.reorderLevel) : null,
        maxStockLevel: body.maxStockLevel ? parseFloat(body.maxStockLevel) : null,
        warehouseLocation: body.warehouseLocation || null,
        primaryVendorId: body.primaryVendorId ? parseInt(body.primaryVendorId) : null,
        vendorProductCode: body.vendorProductCode || null,
        vendorLeadTimeDays: body.vendorLeadTimeDays ? parseInt(body.vendorLeadTimeDays) : null,
        packagingOptions: body.packagingOptions || null,
        certifications: body.certifications || null,
        hsCode: body.hsCode || null,
        images: body.images || null,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error },
      { status: 500 }
    );
  }
}
