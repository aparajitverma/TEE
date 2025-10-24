import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get Export Quote | The Export Express',
  description: 'Contact The Export Express for premium Indian export products. Get instant quotes for herbs, spices, tea, coffee, essential oils & more. 24-hour response time. Offices in Mumbai, Delhi & Dubai.',
  keywords: [
    'export company contact',
    'Indian export inquiry',
    'bulk spices supplier contact',
    'essential oils exporter',
    'tea coffee export quote',
    'herbal products supplier',
    'export consultation',
    'international trade contact',
    'Mumbai export office',
    'Indian export business'
  ],
  openGraph: {
    title: 'Contact The Export Express - Premium Indian Export Company',
    description: 'Get your export quote today. Trusted supplier of herbs, spices, tea, coffee, essential oils, jute products & eco-friendly items. ISO certified with global reach.',
    url: 'https://theexportexpress.com/contact',
    siteName: 'The Export Express',
    images: [
      {
        url: 'https://theexportexpress.com/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact The Export Express - Export Inquiry Form',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact The Export Express - Get Your Export Quote',
    description: 'Premium Indian export products. Instant quotes for herbs, spices, tea, coffee & more. 24-hour response time.',
    images: ['https://theexportexpress.com/og-contact.jpg'],
    creator: '@exportexpress',
  },
  alternates: {
    canonical: 'https://theexportexpress.com/contact',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};
