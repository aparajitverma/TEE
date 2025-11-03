'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Eye, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import '../blog.css';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featuredImage?: string;
  publishedDate?: string;
  readTime?: string;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (params.slug) {
      loadPost(params.slug as string);
    }
  }, [params.slug]);

  const loadPost = async (slug: string) => {
    try {
      // First, get all posts to find the one with matching slug
      const response = await fetch('/api/website/blog?status=published&limit=100');
      const data = await response.json();
      
      if (response.ok && data.posts) {
        const foundPost = data.posts.find((p: BlogPost) => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
          
          // Load related posts from the same category
          const related = data.posts
            .filter((p: BlogPost) => p.category === foundPost.category && p.id !== foundPost.id)
            .slice(0, 3);
          setRelatedPosts(related);
          
          // Update view count (optional - you might want to create a separate API for this)
          // incrementViewCount(foundPost.id);
        } else {
          router.push('/blog');
        }
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-gray-600 space-x-6 mb-6">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {formatDate(post.publishedDate || post.createdAt)}
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
            )}
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              {post.viewsCount} views
            </div>
            <button
              onClick={sharePost}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="markdown-content max-w-none">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {relatedPost.featuredImage ? (
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <h4 className="text-white text-sm font-semibold text-center px-2">
                        {relatedPost.title}
                      </h4>
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
