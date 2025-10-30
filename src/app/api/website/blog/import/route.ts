import { NextRequest, NextResponse } from 'next/server';
import { blogsDB, blogCategoriesDB } from '@/lib/blogs-db';

// Hardcoded blog posts from the website
const websiteBlogPosts = [
  {
    slug: 'herbal-ayurvedic-export-guide-2024',
    title: 'Complete Guide to Exporting Herbal & Ayurvedic Products from India 2024',
    excerpt: 'Comprehensive export guide for Ashwagandha, Curcumin, Triphala, Neem Oil, and Kashmir Saffron. Learn about GMP certification, USDA Organic standards, FOB pricing, and target markets.',
    content: 'Full article content about herbal and ayurvedic product exports...',
    category: 'Herbal & Ayurvedic',
    author: 'Dr. Priya Sharma',
    authorEmail: 'priya.sharma@exportexpress.com',
    publishedDate: '2024-10-27',
    readTime: '15 min read',
    featuredImage: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=500&fit=crop',
    images: [],
    tags: ['Ayurveda', 'Herbal Export', 'GMP Certification', 'USDA Organic', 'Ashwagandha', 'Curcumin'],
  },
  {
    slug: 'ashwagandha-root-extract-export-guide',
    title: 'Ashwagandha Root Extract Export: 5-10% Withanolides, GMP Certified, FOB $45-80/kg',
    excerpt: 'Import premium Ashwagandha from India with guaranteed 5-10% withanolides, HPLC verified. Full certifications (GMP, Organic, Halal), direct farm sourcing, flexible formats. Learn why to choose us.',
    content: 'Detailed guide on Ashwagandha export...',
    category: 'Herbal & Ayurvedic',
    author: 'Dr. Priya Sharma',
    authorEmail: 'priya.sharma@exportexpress.com',
    publishedDate: '2024-10-27',
    readTime: '12 min read',
    featuredImage: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=500&fit=crop',
    images: [],
    tags: ['Ashwagandha', 'Withanolides', 'Adaptogen Export', 'GMP Certified', 'USDA Organic', 'Import Guide'],
  },
  {
    slug: 'choosing-indian-spices',
    title: 'How to Choose the Right Indian Spice for Your Food-Processing Line',
    excerpt: 'A comprehensive guide for food manufacturers on selecting premium Indian spices, quality parameters, and supplier evaluation criteria.',
    content: 'Guide on choosing the right Indian spices...',
    category: 'Buyer Guide',
    author: 'Rajesh Kumar',
    authorEmail: 'rajesh.kumar@exportexpress.com',
    publishedDate: '2024-10-10',
    readTime: '10 min read',
    featuredImage: 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&h=500&fit=crop',
    images: [],
    tags: ['Spices', 'Quality Control', 'Sourcing', 'Food Processing'],
  },
  {
    slug: 'darjeeling-tea-certification',
    title: 'Organic Tea from Darjeeling – Certification Process Explained',
    excerpt: 'Understanding the rigorous organic certification process for Darjeeling tea, from farm practices to international compliance standards.',
    content: 'Detailed explanation of Darjeeling tea certification...',
    category: 'Quality Standards',
    author: 'Anita Desai',
    authorEmail: 'anita.desai@exportexpress.com',
    publishedDate: '2024-10-05',
    readTime: '12 min read',
    featuredImage: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=500&fit=crop',
    images: [],
    tags: ['Tea', 'Organic', 'Certification', 'Darjeeling'],
  },
  {
    slug: 'seasonal-cash-crops',
    title: 'Seasonal Cash Crops: Managing Supply-Chain Risk',
    excerpt: 'Strategies for managing supply chain volatility in seasonal crops like mango, cashew, and turmeric with practical risk mitigation techniques.',
    content: 'Supply chain risk management strategies...',
    category: 'Export Guide',
    author: 'Vikram Singh',
    authorEmail: 'vikram.singh@exportexpress.com',
    publishedDate: '2024-09-28',
    readTime: '9 min read',
    featuredImage: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&h=500&fit=crop',
    images: [],
    tags: ['Supply Chain', 'Risk Management', 'Seasonal Crops', 'Logistics'],
  },
  {
    slug: 'essential-oils-journey',
    title: 'Essential Oils from India – From Farm to Fragrance Lab',
    excerpt: 'Follow the journey of Indian essential oils from cultivation and extraction to quality testing and international fragrance applications.',
    content: 'Journey of essential oils from farm to lab...',
    category: 'Product Insights',
    author: 'Meera Patel',
    authorEmail: 'meera.patel@exportexpress.com',
    publishedDate: '2024-09-20',
    readTime: '11 min read',
    featuredImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=500&fit=crop',
    images: [],
    tags: ['Essential Oils', 'Aromatics', 'Production', 'Quality'],
  },
  {
    slug: 'incoterms-explained',
    title: 'Understanding Incoterms: FOB vs CIF for Indian Exporters',
    excerpt: 'A detailed breakdown of FOB and CIF terms, cost implications, risk transfer points, and which option works best for different scenarios.',
    content: 'Detailed explanation of Incoterms...',
    category: 'Export Guide',
    author: 'Amit Verma',
    authorEmail: 'amit.verma@exportexpress.com',
    publishedDate: '2024-09-15',
    readTime: '7 min read',
    featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=500&fit=crop',
    images: [],
    tags: ['Incoterms', 'Shipping', 'Export Documentation', 'Trade'],
  },
  {
    slug: 'sustainability-case-studies',
    title: 'Sustainability Initiatives – Case Studies from Indian Farms',
    excerpt: 'Real-world examples of sustainable farming practices, fair trade partnerships, and environmental conservation in Indian agriculture.',
    content: 'Case studies on sustainability initiatives...',
    category: 'Sustainability',
    author: 'Kavita Reddy',
    authorEmail: 'kavita.reddy@exportexpress.com',
    publishedDate: '2024-09-10',
    readTime: '13 min read',
    featuredImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop',
    images: [],
    tags: ['Sustainability', 'Fair Trade', 'Environment', 'Case Studies'],
  },
  {
    slug: 'export-documentation-checklist',
    title: 'Export Documentation Checklist: Complete Guide for First-Time Exporters',
    excerpt: 'Step-by-step documentation requirements for exporting from India, including certificates, permits, and compliance paperwork.',
    content: 'Complete export documentation checklist...',
    category: 'Export Guide',
    author: 'Suresh Iyer',
    authorEmail: 'suresh.iyer@exportexpress.com',
    publishedDate: '2024-09-05',
    readTime: '10 min read',
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
    images: [],
    tags: ['Documentation', 'Export Process', 'Compliance', 'Beginners Guide'],
  },
];

// POST - Import all blog posts
export async function POST(request: NextRequest) {
  try {
    // Extract unique categories
    const categories = [...new Set(websiteBlogPosts.map(p => p.category))];
    
    // Import categories first
    const importedCategories = blogCategoriesDB.bulkCreate(categories);
    
    // Prepare blog posts for import
    const postsToImport = websiteBlogPosts.map(post => ({
      ...post,
      status: 'published' as const,
      scheduledDate: null,
      metaTitle: post.title,
      metaDescription: post.excerpt,
      keywords: post.tags,
      viewsCount: 0,
      websitePostId: post.slug,
      syncStatus: 'synced' as const,
      lastSynced: new Date().toISOString(),
    }));
    
    // Import posts
    const importedPosts = blogsDB.bulkImport(postsToImport);
    
    return NextResponse.json({
      message: 'Blog posts imported successfully',
      postsCount: importedPosts.length,
      categoriesCount: importedCategories.length,
      categories: blogCategoriesDB.getAll(),
      posts: importedPosts.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        author: p.author,
        publishedDate: p.publishedDate,
        status: p.status,
      })),
    });
  } catch (error) {
    console.error('Error importing blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to import blog posts', details: String(error) },
      { status: 500 }
    );
  }
}

// GET - Preview posts that would be imported
export async function GET(request: NextRequest) {
  try {
    const categories = [...new Set(websiteBlogPosts.map(p => p.category))];
    
    return NextResponse.json({
      count: websiteBlogPosts.length,
      categories: categories,
      posts: websiteBlogPosts.map(p => ({
        title: p.title,
        slug: p.slug,
        category: p.category,
        author: p.author,
        publishedDate: p.publishedDate,
      })),
    });
  } catch (error) {
    console.error('Error previewing blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to preview blog posts', details: String(error) },
      { status: 500 }
    );
  }
}
