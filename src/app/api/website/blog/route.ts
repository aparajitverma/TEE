import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (author) {
      where.authorName = { contains: author, mode: 'insensitive' };
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Parse JSON fields and map database fields to API format
    const parsedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      author: post.authorName || 'Admin', // Map authorName to author
      featuredImage: post.featuredImageUrl, // Map featuredImageUrl to featuredImage
      tags: post.tags ? JSON.parse(post.tags) : [],
      status: post.status,
      publishedDate: post.publishedDate,
      scheduledDate: post.scheduledDate,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      viewsCount: post.viewsCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      // Add fields that may not exist in DB yet
      keywords: [],
      images: [],
      readTime: '5 min read',
      authorEmail: null,
      websitePostId: null,
      syncStatus: 'not_synced',
      lastSynced: null,
    }));

    const result = {
      posts: parsedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    // Debug logging
    console.log('Blog API - Total posts in DB:', total);
    console.log('Blog API - Returning posts:', result.posts.length);
    if (result.posts.length > 0) {
      console.log('Blog API - First post title:', result.posts[0].title);
      console.log('Blog API - First post author:', result.posts[0].author);
    }

    return NextResponse.json({
      posts: result.posts,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
      debug: {
        totalInDB: total,
        returnedCount: result.posts.length
      }
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

    const newPost = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        category: body.category,
        authorName: body.author,
        featuredImageUrl: body.featuredImage,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        status: body.status || 'draft',
        scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : null,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
      },
    });

    // Map response to API format
    const responsePost = {
      id: newPost.id,
      title: newPost.title,
      slug: newPost.slug,
      content: newPost.content,
      excerpt: newPost.excerpt,
      category: newPost.category,
      author: newPost.authorName,
      featuredImage: newPost.featuredImageUrl,
      tags: newPost.tags ? JSON.parse(newPost.tags) : [],
      status: newPost.status,
      publishedDate: newPost.publishedDate,
      scheduledDate: newPost.scheduledDate,
      metaTitle: newPost.metaTitle,
      metaDescription: newPost.metaDescription,
      viewsCount: newPost.viewsCount,
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt,
      // Add default values for fields not in DB yet
      keywords: [],
      images: [],
      readTime: '5 min read',
      authorEmail: null,
      websitePostId: null,
      syncStatus: 'not_synced',
      lastSynced: null,
    };

    return NextResponse.json({
      post: responsePost,
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
