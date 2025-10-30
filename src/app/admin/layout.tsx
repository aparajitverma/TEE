'use client';

import { usePathname } from 'next/navigation';
import { NotificationProvider } from '@/contexts/NotificationContext';
import ToastNotifications from '@/components/ToastNotifications';
import AdminNavigation from '@/components/AdminNavigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <NotificationProvider>
      <div className={isLoginPage ? '' : 'bg-gray-900 min-h-screen'}>
        {!isLoginPage && <AdminNavigation />}
        {children}
        <ToastNotifications />
      </div>
    </NotificationProvider>
  );
}
