'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  BookOpen,
  Loader2,
  Package,
  AlertTriangle,
  TestTube,
} from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
  status: string;
  viewsCount: number;
  syncStatus: string;
  lastSynced: string | null;
}

export default function BlogManagementPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadPosts();
    }
  }, [router, page, searchTerm, filterStatus, filterCategory]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(filterStatus && { status: filterStatus }),
        ...(filterCategory && { category: filterCategory }),
      });

      const response = await fetch(`/api/website/blog?${params}`);
      const data = await response.json();

      console.log('Blog API Response:', data);
      console.log('Posts received:', data.posts?.length || 0);
      console.log('Debug info:', data.debug);
      if (data.posts?.length > 0) {
        console.log('First post:', data.posts[0]);
        console.log('Post IDs:', data.posts.map((p: any) => p.id));
      }

      setPosts(data.posts || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!confirm('Import all blog posts from website? This will add all blog posts to the admin system.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/website/blog/import', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Import completed! ${data.postsCount} posts and ${data.categoriesCount} categories imported.`);
        loadPosts();
      } else {
        alert('Import failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error importing posts:', error);
      alert('Failed to import posts');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!confirm('Clear all blog posts and categories? This action cannot be undone!')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/website/blog/clear', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('All blog posts and categories cleared successfully!');
        loadPosts();
      } else {
        alert('Clear failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error clearing posts:', error);
      alert('Failed to clear posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/website/blog/test', {
        method: 'POST',
      });

      const data = await response.json();
      
      if (response.ok) {
        alert(`Test post created! Total posts: ${data.totalPosts}`);
        loadPosts();
      } else {
        alert('Test creation failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating test post:', error);
      alert('Failed to create test post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/website/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog post deleted successfully');
        loadPosts();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete blog post');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="text-xs px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded">Published</span>;
      case 'draft':
        return <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">Draft</span>;
      case 'scheduled':
        return <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded">Scheduled</span>;
      case 'archived':
        return <span className="text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded">Archived</span>;
      default:
        return <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded">{status}</span>;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/website')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-purple-500" />
                Blog Management
              </h1>
              <p className="text-gray-400">Manage blog posts and articles</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateTest}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <TestTube className="w-5 h-5" />
              )}
              Create Test Post
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              Clear All
            </button>
            <button
              onClick={handleImport}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Package className="w-5 h-5" />
              )}
              Import from Website
            </button>
            <button
              onClick={() => router.push('/admin/website/blog/new')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Herbal & Ayurvedic">Herbal & Ayurvedic</option>
              <option value="Export Guide">Export Guide</option>
              <option value="Quality Standards">Quality Standards</option>
              <option value="Product Insights">Product Insights</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Buyer Guide">Buyer Guide</option>
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-12">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No blog posts found</p>
              <button
                onClick={() => router.push('/admin/website/blog/new')}
                className="mt-4 text-purple-400 hover:text-purple-300"
              >
                Create your first post
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-750 border-b border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Post
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Author
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Published
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                        Views
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {post.featuredImage ? (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-gray-500" />
                              </div>
                            )}
                            <div className="max-w-md">
                              <div className="font-medium text-white line-clamp-1">{post.title}</div>
                              <div className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">{post.author}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(post.status)}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{post.viewsCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/website/blog/${post.id}`)}
                              className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="p-2 text-red-400 hover:bg-red-900/20 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
