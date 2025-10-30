'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TawkToChat from '@/components/TawkToChat';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes: no navbar, footer, chat, or whatsapp
    return <>{children}</>;
  }

  // Public routes: include navbar, footer, chat, and whatsapp
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <TawkToChat />
      <WhatsAppButton />
    </>
  );
}
