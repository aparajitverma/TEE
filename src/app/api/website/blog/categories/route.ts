import { NextRequest, NextResponse } from 'next/server';
import { blogCategoriesDB } from '@/lib/blogs-db';

// GET - Fetch all blog categories
export async function GET(request: NextRequest) {
  try {
    const categories = blogCategoriesDB.getAll();
    
    return NextResponse.json({
      categories,
      total: categories.length,
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog categories' },
      { status: 500 }
    );
  }
}

// POST - Create new blog category
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
    
    const category = blogCategoriesDB.create(name, description || '');
    
    return NextResponse.json({
      category,
      message: 'Blog category created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog category:', error);
    return NextResponse.json(
      { error: 'Failed to create blog category' },
      { status: 500 }
    );
  }
}
