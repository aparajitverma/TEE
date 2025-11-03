import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Create a test blog post
export async function POST(request: NextRequest) {
  try {
    // Create a test blog post using Prisma
    const testPost = await prisma.blogPost.create({
      data: {
        title: 'Test Blog Post',
        slug: 'test-blog-post-' + Date.now(),
        category: 'Test Category',
        tags: JSON.stringify(['test', 'debug']),
        authorName: 'Admin',
        featuredImageUrl: null,
        excerpt: 'This is a test blog post created for debugging purposes.',
        content: `# Test Blog Post

This is a **test blog post** created to verify that the blog system is working correctly.

## Features Tested

- Blog post creation
- Rich text content with *markdown*
- Categories and tags
- Author information

> This post should appear in the blog management dashboard.

### Code Example

\`\`\`javascript
console.log('Blog system is working!');
\`\`\`

The system should now persist blog posts to the database instead of using temporary in-memory storage.`,
        metaTitle: 'Test Blog Post - Export Express',
        metaDescription: 'A test blog post to verify the blog management system is working correctly.',
        status: 'published',
      },
    });

    // Get total count for debugging
    const totalPosts = await prisma.blogPost.count();

    // Map response to API format
    const responsePost = {
      id: testPost.id,
      title: testPost.title,
      slug: testPost.slug,
      content: testPost.content,
      excerpt: testPost.excerpt,
      category: testPost.category,
      author: testPost.authorName,
      featuredImage: testPost.featuredImageUrl,
      tags: testPost.tags ? JSON.parse(testPost.tags) : [],
      status: testPost.status,
      publishedDate: testPost.publishedDate,
      scheduledDate: testPost.scheduledDate,
      metaTitle: testPost.metaTitle,
      metaDescription: testPost.metaDescription,
      viewsCount: testPost.viewsCount,
      createdAt: testPost.createdAt,
      updatedAt: testPost.updatedAt,
      // Add default values for fields not in DB yet
      keywords: [],
      images: [],
      readTime: '2 min read',
      authorEmail: null,
      websitePostId: null,
      syncStatus: 'not_synced',
      lastSynced: null,
    };

    return NextResponse.json({
      success: true,
      message: 'Test blog post created successfully',
      post: responsePost,
      debug: {
        totalPosts,
        postId: testPost.id,
      }
    });
  } catch (error) {
    console.error('Error creating test blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create test blog post', details: error },
      { status: 500 }
    );
  }
}

// GET - Get current database status
export async function GET(request: NextRequest) {
  try {
    const [allPosts, totalPosts] = await Promise.all([
      prisma.blogPost.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blogPost.count(),
    ]);
    
    return NextResponse.json({
      postsCount: totalPosts,
      categoriesCount: 0,
      posts: allPosts.map(p => ({
        id: p.id,
        title: p.title,
        author: p.authorName,
        status: p.status,
        category: p.category,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error getting status:', error);
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}
