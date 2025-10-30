'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  UserCircle,
  LogOut,
  Menu,
  X,
  Globe,
  FileText,
  Truck,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import DashboardAlerts from '@/components/DashboardAlerts';
import { productsDB, categoriesDB } from '@/lib/products-db';
import { blogsDB, blogCategoriesDB } from '@/lib/blogs-db';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    blogPosts: 0,
    blogCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth');
    const email = localStorage.getItem('adminEmail');
    
    if (auth === 'true' && email) {
      setIsAuthenticated(true);
      setAdminEmail(email);
      loadStats();
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadStats = async () => {
    try {
      setLoading(true);
      // Get real-time stats from databases
      const productCount = productsDB.count();
      const categoryCount = categoriesDB.getAll().length;
      const blogCount = blogsDB.count();
      const blogCategoryCount = blogCategoriesDB.getAll().length;

      setStats({
        products: productCount,
        categories: categoryCount,
        blogPosts: blogCount,
        blogCategories: blogCategoryCount,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: Users, label: 'Vendors', href: '/admin/vendors' },
    { icon: UserCircle, label: 'Clients', href: '/admin/clients' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: DollarSign, label: 'Payments', href: '/admin/payments' },
    { icon: Globe, label: 'Website', href: '/admin/website' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 fixed h-full z-30`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-emerald-500">Export Express</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 text-gray-400"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            <p className="text-sm text-gray-400">Welcome back, Admin</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{adminEmail}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-8 h-8 text-yellow-300" />
                <h2 className="text-3xl font-bold text-white">Welcome Back, Admin!</h2>
              </div>
              <p className="text-emerald-50 text-lg mb-6 max-w-2xl">
                Your Export Express management system is live and ready. Monitor your products, blog posts, and manage your entire export business from here.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/admin/website/products')}
                  className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Package className="w-5 h-5" />
                  Manage Products
                </button>
                <button
                  onClick={() => router.push('/admin/website/blog')}
                  className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Manage Blog
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Products Stat */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push('/admin/website/products')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-emerald-100 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Live</span>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">{loading ? '...' : stats.products}</p>
                <p className="text-emerald-100 text-sm">Total Products</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-emerald-100 text-xs">
                <span>{stats.categories} Categories</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Blog Posts Stat */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push('/admin/website/blog')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-purple-100 text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Active</span>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">{loading ? '...' : stats.blogPosts}</p>
                <p className="text-purple-100 text-sm">Blog Posts</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-purple-100 text-xs">
                <span>{stats.blogCategories} Categories</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Website Status */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push('/admin/website')}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-blue-100 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Online</span>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">100%</p>
                <p className="text-blue-100 text-sm">Website Uptime</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-blue-100 text-xs">
                <span>All Systems Operational</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-amber-100 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Ready</span>
                </div>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold mb-1">{stats.products + stats.blogPosts}</p>
                <p className="text-amber-100 text-sm">Total Content Items</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-amber-100 text-xs">
                <span>Synced & Ready</span>
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Dashboard Alerts */}
          <DashboardAlerts />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Website Management */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500" />
                Website Management
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/admin/website/products')}
                  className="w-full flex items-center justify-between p-4 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Products</p>
                      <p className="text-gray-400 text-sm">{stats.products} items</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </button>
                <button
                  onClick={() => router.push('/admin/website/blog')}
                  className="w-full flex items-center justify-between p-4 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">Blog Posts</p>
                      <p className="text-gray-400 text-sm">{stats.blogPosts} articles</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Other Modules */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-blue-500" />
                Other Modules
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users, label: 'Vendors', href: '/admin/vendors', color: 'blue' },
                  { icon: UserCircle, label: 'Clients', href: '/admin/clients', color: 'green' },
                  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders', color: 'orange' },
                  { icon: DollarSign, label: 'Payments', href: '/admin/payments', color: 'purple' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className="p-4 bg-gray-750 hover:bg-gray-700 rounded-lg transition-colors group text-left"
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}-400 mb-2`} />
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-gray-500 text-xs">Coming Soon</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Development Guide */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-750 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                Development Resources
              </h3>
              <span className="text-xs px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full">Active</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Products System</p>
                  <p className="text-gray-400 text-xs">✅ Import, CRUD, Sync - Fully functional</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Blog System</p>
                  <p className="text-gray-400 text-xs">✅ Import, CRUD, Categories - Fully functional</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Database Integration</p>
                  <p className="text-gray-400 text-xs">⏳ Ready for MySQL/Prisma migration</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Other Modules</p>
                  <p className="text-gray-400 text-xs">📋 Follow guides in /management-guides/</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
