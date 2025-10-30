import { NextRequest, NextResponse } from 'next/server';
import { productsDB, categoriesDB } from '@/lib/products-db';

// Hardcoded products data extracted from website
const websiteProducts = [
  {
    name: 'Jasmine Absolute (Jasminum grandiflorum)',
    slug: 'jasmine-absolute',
    sku: 'JASMINE_ABSOLUTE',
    category: 'Aromatic Effluences',
    price: 0,
    compareAtPrice: null,
    costPrice: null,
    stockStatus: 'in_stock',
    stockQuantity: 0,
    lowStockThreshold: 10,
    status: 'published',
    description: 'Luxurious jasmine absolute from hand-picked pre-dawn blossoms. High linalool & benzyl acetate.',
    shortDescription: 'Luxurious jasmine absolute from hand-picked pre-dawn blossoms.',
    featuredImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=800&fit=crop',
    images: [],
    tags: ['jasmine', 'absolute', 'aromatics', 'essential oil'],
    metaTitle: 'Jasmine Absolute - Jasminum grandiflorum | The Export Express',
    metaDescription: 'Luxurious jasmine absolute from hand-picked pre-dawn blossoms.',
    keywords: ['jasmine absolute export', 'jasminum grandiflorum', 'jasmine oil'],
    specifications: [],
    certifications: ['ISO 9001', 'NABL Lab Certified', 'GMP Audited'],
    quantityOptions: ['30 ml', '100 ml', '250 ml'],
    origin: 'Tamil Nadu, India',
    form: 'Absolute (Solvent Extracted)',
    hsCode: '3301.13.00',
    moq: 'Contact for MOQ',
    leadTime: '4-5 days processing',
    packaging: 'Amber glass bottles',
    syncStatus: 'synced',
    lastSynced: new Date().toISOString(),
    websiteProductId: 'jasmine-absolute',
  },
  {
    name: 'Organic Turmeric Powder (High Curcumin)',
    slug: 'turmeric',
    sku: 'TURMERIC',
    category: 'Herbal & Ayurvedic',
    price: 0,
    compareAtPrice: null,
    costPrice: null,
    stockStatus: 'in_stock',
    stockQuantity: 0,
    lowStockThreshold: 10,
    status: 'published',
    description: 'Premium organic turmeric powder with 3-5% curcumin content.',
    shortDescription: 'Premium organic turmeric powder with 3-5% curcumin.',
    featuredImage: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop',
    images: [],
    tags: ['turmeric', 'organic', 'curcumin', 'ayurvedic'],
    metaTitle: 'Organic Turmeric Powder - High Curcumin Content',
    metaDescription: 'Premium organic turmeric powder from India with 3-5% curcumin content.',
    keywords: ['turmeric export', 'organic turmeric', 'curcumin powder'],
    specifications: [],
    certifications: ['USDA Organic', 'EU Organic', 'ISO 22000'],
    quantityOptions: ['1 kg', '5 kg', '10 kg', '25 kg'],
    origin: 'Tamil Nadu & Andhra Pradesh, India',
    form: 'Fine Powder',
    hsCode: '0910.30',
    moq: '100 kg',
    leadTime: '15-20 days',
    packaging: '25kg HDPE bags',
    syncStatus: 'synced',
    lastSynced: new Date().toISOString(),
    websiteProductId: 'turmeric',
  },
  {
    name: 'Arabica Coffee Beans (Coorg Premium)',
    slug: 'arabica-coffee',
    sku: 'ARABICA_COFFEE',
    category: 'Tea & Coffee',
    price: 0,
    compareAtPrice: null,
    costPrice: null,
    stockStatus: 'in_stock',
    stockQuantity: 0,
    lowStockThreshold: 10,
    status: 'published',
    description: 'Premium Arabica coffee beans from Coorg, Karnataka.',
    shortDescription: 'Premium Arabica coffee beans from Coorg.',
    featuredImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
    images: [],
    tags: ['coffee', 'arabica', 'coorg', 'premium'],
    metaTitle: 'Arabica Coffee Beans - Coorg Premium Grade',
    metaDescription: 'Premium Arabica coffee beans from Coorg, India.',
    keywords: ['arabica coffee export', 'coorg coffee', 'indian coffee beans'],
    specifications: [],
    certifications: ['Rainforest Alliance', 'UTZ Certified', 'Fair Trade'],
    quantityOptions: ['1 kg', '5 kg', '10 kg', '60 kg'],
    origin: 'Coorg (Kodagu), Karnataka, India',
    form: 'Green Beans / Roasted',
    hsCode: '0901.21',
    moq: '60 kg',
    leadTime: '20-25 days',
    packaging: '60kg jute bags',
    syncStatus: 'synced',
    lastSynced: new Date().toISOString(),
    websiteProductId: 'arabica-coffee',
  },
  // Add more products as needed
];

// POST - Import all products
export async function POST(request: NextRequest) {
  try {
    // Extract unique categories
    const categories = [...new Set(websiteProducts.map(p => p.category))];

    // Import categories first
    const importedCategories = categoriesDB.bulkCreate(categories);

    // Import products
    const importedProducts = productsDB.bulkImport(websiteProducts);

    
    return NextResponse.json({
      message: 'Products imported successfully',
      productsCount: importedProducts.length,
      categoriesCount: importedCategories.length,
      categories: categoriesDB.getAll(),
      products: importedProducts.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        sku: p.sku,
        syncStatus: p.syncStatus,
      })),
    });
  } catch (error) {
    console.error('Error importing products:', error);
    return NextResponse.json(
      { error: 'Failed to import products', details: String(error) },
      { status: 500 }
    );
  }
}

// GET - Preview products
export async function GET(request: NextRequest) {
  try {
    const categories = [...new Set(websiteProducts.map(p => p.category))];
    
    return NextResponse.json({
      count: websiteProducts.length,
      categories: categories,
      products: websiteProducts.map(p => ({
        name: p.name,
        slug: p.slug,
        category: p.category,
        sku: p.sku,
      })),
    });
  } catch (error) {
    console.error('Error scanning products:', error);
    return NextResponse.json(
      { error: 'Failed to scan products', details: String(error) },
      { status: 500 }
    );
  }
}
