import { NextRequest, NextResponse } from 'next/server';
import { productsDB } from '@/lib/products-db';

// GET - Fetch all website products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const syncStatus = searchParams.get('syncStatus') || '';

    const result = productsDB.getAll({
      search,
      category,
      status,
      syncStatus,
      page,
      limit,
    });

    return NextResponse.json({
      products: result.products.map(p => ({
        ...p,
        image: p.featuredImage,
      })),
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching website products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new website product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'slug', 'sku', 'category', 'price'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newProduct = productsDB.create({
      ...body,
      status: body.status || 'draft',
      syncStatus: 'pending',
      lastSynced: null,
      websiteProductId: null,
    });

    return NextResponse.json({
      product: newProduct,
      message: 'Product created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
