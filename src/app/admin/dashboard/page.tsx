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
  Truck
} from 'lucide-react';
import DashboardAlerts from '@/components/DashboardAlerts';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth');
    const email = localStorage.getItem('adminEmail');
    
    if (auth === 'true' && email) {
      setIsAuthenticated(true);
      setAdminEmail(email);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

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
        <main className="p-6">
          {/* Dashboard Alerts */}
          <DashboardAlerts />
          
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 my-6 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Admin Portal</h2>
            <p className="text-emerald-100 mb-4">
              Your management system is ready to be built. Start implementing modules using the guides.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin/vendors')}
                className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
              >
                Start Building
              </button>
              <a
                href="/management-guides/README.md"
                target="_blank"
                className="bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
              >
                View Guides
              </a>
            </div>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {menuItems.slice(1).map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 hover:bg-gray-750 transition-all group text-left"
              >
                <item.icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-sm text-gray-400">
                  Click to start building this module
                </p>
              </button>
            ))}
          </div>

          {/* Development Guide */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              Development Roadmap
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>📁 All development guides are in <code className="bg-gray-900 px-2 py-1 rounded text-emerald-400">/management-guides/</code></p>
              <p>📋 Follow the 12-week roadmap in <code className="bg-gray-900 px-2 py-1 rounded text-emerald-400">MANAGEMENT_07_ROADMAP.md</code></p>
              <p>🔧 Each module has detailed checklists for implementation</p>
              <p>🚀 Start with database setup, then build modules one by one</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
