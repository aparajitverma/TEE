import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Fetching blog post with ID:', id, 'Type:', typeof id);
    
    const postId = parseInt(id);
    console.log('Parsed post ID:', postId, 'isNaN:', isNaN(postId));
    
    if (isNaN(postId)) {
      console.log('Invalid post ID - returning 400');
      return NextResponse.json(
        { error: `Invalid post ID: ${id}` },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    console.log('Found post:', post ? post.title : 'Not found');

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Map database fields to API format
    const responsePost = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      author: post.authorName || 'Admin',
      featuredImage: post.featuredImageUrl,
      tags: post.tags ? JSON.parse(post.tags) : [],
      status: post.status,
      publishedDate: post.publishedDate,
      scheduledDate: post.scheduledDate,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      viewsCount: post.viewsCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      // Add default values for fields not in DB yet
      keywords: [],
      images: [],
      readTime: '5 min read',
      authorEmail: null,
      websitePostId: null,
      syncStatus: 'not_synced',
      lastSynced: null,
    };

    return NextResponse.json({ post: responsePost });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Update the post
    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
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
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      content: updatedPost.content,
      excerpt: updatedPost.excerpt,
      category: updatedPost.category,
      author: updatedPost.authorName,
      featuredImage: updatedPost.featuredImageUrl,
      tags: updatedPost.tags ? JSON.parse(updatedPost.tags) : [],
      status: updatedPost.status,
      publishedDate: updatedPost.publishedDate,
      scheduledDate: updatedPost.scheduledDate,
      metaTitle: updatedPost.metaTitle,
      metaDescription: updatedPost.metaDescription,
      viewsCount: updatedPost.viewsCount,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
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
      message: 'Blog post updated successfully',
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Delete the post
    await prisma.blogPost.delete({
      where: { id: postId },
    });

    return NextResponse.json({
      message: 'Blog post deleted successfully',
      id: postId,
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
