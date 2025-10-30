import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Recalculate margin if prices changed
    if (body.costPrice && body.sellingPrice) {
      body.marginPercentage = ((body.sellingPrice - body.costPrice) / body.costPrice) * 100;
    }

    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        productName: body.productName,
        productNameScientific: body.productNameScientific,
        category: body.category,
        subcategory: body.subcategory,
        status: body.status,
        featured: body.featured,
        shortDescription: body.shortDescription,
        longDescription: body.longDescription,
        metaDescription: body.metaDescription,
        metaKeywords: body.metaKeywords,
        seoTitle: body.seoTitle,
        slug: body.slug,
        specifications: body.specifications,
        costPrice: body.costPrice ? parseFloat(body.costPrice) : undefined,
        sellingPrice: body.sellingPrice ? parseFloat(body.sellingPrice) : undefined,
        currency: body.currency,
        unit: body.unit,
        moq: body.moq ? parseInt(body.moq) : undefined,
        marginPercentage: body.marginPercentage,
        bulkPricing: body.bulkPricing,
        currentStock: body.currentStock !== undefined ? parseFloat(body.currentStock) : undefined,
        stockUnit: body.stockUnit,
        reorderLevel: body.reorderLevel ? parseFloat(body.reorderLevel) : undefined,
        maxStockLevel: body.maxStockLevel ? parseFloat(body.maxStockLevel) : undefined,
        warehouseLocation: body.warehouseLocation,
        primaryVendorId: body.primaryVendorId ? parseInt(body.primaryVendorId) : undefined,
        vendorProductCode: body.vendorProductCode,
        vendorLeadTimeDays: body.vendorLeadTimeDays ? parseInt(body.vendorLeadTimeDays) : undefined,
        packagingOptions: body.packagingOptions,
        certifications: body.certifications,
        hsCode: body.hsCode,
        images: body.images,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
