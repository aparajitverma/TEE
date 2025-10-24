import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications & Quality Standards | The Export Express',
  description: 'ISO 9001, ISO 22000, HACCP, USDA Organic, EU Organic, Fair Trade, GMP, and Phytosanitary certifications. International quality and safety standards for premium Indian exports.',
  keywords: 'ISO certification, organic certification, USDA organic, EU organic, HACCP, food safety, quality standards, export certifications, Fair Trade, GMP',
  openGraph: {
    title: 'International Certifications & Quality Standards',
    description: 'ISO 9001, ISO 22000, HACCP, USDA Organic, EU Organic, Fair Trade certified. Premium quality Indian exports.',
    url: 'https://theexportexpress.com/certifications',
    siteName: 'The Export Express',
    type: 'website',
  },
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
