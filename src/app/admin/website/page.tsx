'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, Construction } from 'lucide-react';

export default function WebsitePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

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
              onClick={() => router.push('/admin/dashboard')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Globe className="w-7 h-7 text-emerald-500" />
                Website Management
              </h1>
              <p className="text-gray-400">Manage content, products, and SEO</p>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products Management */}
          <button
            onClick={() => router.push('/admin/website/products')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 hover:bg-gray-750 transition-all group text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Products Management</h3>
                <p className="text-sm text-gray-400">Manage website products</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Create, edit, and sync products to your website with full CRUD operations.
            </p>
            <div className="mt-4 text-emerald-400 text-sm font-medium">
              Open Products →
            </div>
          </button>

          {/* Blog Management */}
          <button
            onClick={() => router.push('/admin/website/blog')}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 hover:bg-gray-750 transition-all group text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Construction className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Blog Management</h3>
                <p className="text-sm text-gray-400">Manage blog posts</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Create, edit, and manage blog posts for your website.
            </p>
            <div className="mt-4 text-purple-400 text-sm font-medium">
              Open Blog →
            </div>
          </button>

          {/* Analytics - Coming Soon */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 opacity-50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Construction className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Analytics</h3>
                <p className="text-sm text-gray-400">Coming soon</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Track website traffic and performance metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
