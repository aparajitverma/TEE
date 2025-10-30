import { NextRequest, NextResponse } from 'next/server';
import { blogsDB } from '@/lib/blogs-db';

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const author = searchParams.get('author') || '';

    const result = blogsDB.getAll({
      search,
      category,
      status,
      author,
      page,
      limit,
    });

    return NextResponse.json({
      posts: result.posts,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'slug', 'excerpt', 'content', 'category', 'author'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newPost = blogsDB.create({
      ...body,
      status: body.status || 'draft',
      scheduledDate: body.scheduledDate || null,
      viewsCount: 0,
      websitePostId: null,
      syncStatus: 'pending',
      lastSynced: null,
    });

    return NextResponse.json({
      post: newPost,
      message: 'Blog post created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
