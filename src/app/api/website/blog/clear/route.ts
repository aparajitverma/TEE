import { NextRequest, NextResponse } from 'next/server';
import { blogsDB, blogCategoriesDB } from '@/lib/blogs-db';

// POST - Clear all blog posts and categories
export async function POST(request: NextRequest) {
  try {
    // Clear all posts and categories
    blogsDB.clear();
    blogCategoriesDB.clear();
    
    return NextResponse.json({
      message: 'All blog posts and categories cleared successfully',
      postsCount: 0,
      categoriesCount: 0,
    });
  } catch (error) {
    console.error('Error clearing blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to clear blog posts', details: String(error) },
      { status: 500 }
    );
  }
}

// GET - Get current counts and posts for debugging
export async function GET(request: NextRequest) {
  try {
    const allPosts = blogsDB.getAll({ page: 1, limit: 100 });
    return NextResponse.json({
      postsCount: blogsDB.count(),
      categoriesCount: blogCategoriesDB.getAll().length,
      posts: allPosts.posts.map(p => ({
        id: p.id,
        title: p.title,
        author: p.author,
        status: p.status
      }))
    });
  } catch (error) {
    console.error('Error getting counts:', error);
    return NextResponse.json(
      { error: 'Failed to get counts' },
      { status: 500 }
    );
  }
}
