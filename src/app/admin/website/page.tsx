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

        {/* Under Construction Message */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-amber-900/30 rounded-full flex items-center justify-center">
              <Construction className="w-12 h-12 text-amber-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Under Construction
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl">
                This section is being rebuilt from scratch to provide better functionality
                and remove hardcoded data. Check back soon!
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
