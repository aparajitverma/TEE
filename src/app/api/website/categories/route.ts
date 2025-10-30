import { NextRequest, NextResponse } from 'next/server';
import { categoriesDB } from '@/lib/products-db';

// GET - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    const categories = categoriesDB.getAll();
    
    return NextResponse.json({
      categories,
      total: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;
    
    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }
    
    const category = categoriesDB.create(name, description || '');
    
    return NextResponse.json({
      category,
      message: 'Category created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
