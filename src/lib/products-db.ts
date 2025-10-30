// Temporary in-memory database for products
// TODO: Replace with actual database (Prisma/MySQL)

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: string;
  price: number;
  compareAtPrice: number | null;
  costPrice: number | null;
  stockStatus: string;
  stockQuantity: number;
  lowStockThreshold: number;
  status: string;
  description: string;
  shortDescription: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  specifications: any[];
  certifications: string[];
  quantityOptions: string[];
  origin: string;
  form: string;
  hsCode: string;
  moq: string;
  leadTime: string;
  packaging: string;
  syncStatus: string;
  lastSynced: string | null;
  websiteProductId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

// In-memory storage
let products: Product[] = [];
let categories: Category[] = [];
let nextProductId = 1;
let nextCategoryId = 1;

// Products CRUD
export const productsDB = {
  // Get all products with filtering
  getAll: (filters: {
    search?: string;
    category?: string;
    status?: string;
    syncStatus?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    let filtered = [...products];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search) ||
        p.slug.toLowerCase().includes(search)
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    if (filters.syncStatus) {
      filtered = filtered.filter(p => p.syncStatus === filters.syncStatus);
    }
    
    const total = filtered.length;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;
    
    const paginated = filtered.slice(offset, offset + limit);
    
    return {
      products: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  
  // Get single product by ID
  getById: (id: number) => {
    return products.find(p => p.id === id) || null;
  },
  
  // Get product by slug
  getBySlug: (slug: string) => {
    return products.find(p => p.slug === slug) || null;
  },
  
  // Create new product
  create: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const product: Product = {
      ...data,
      id: nextProductId++,
      createdAt: now,
      updatedAt: now,
    };
    products.push(product);
    return product;
  },
  
  // Update product
  update: (id: number, data: Partial<Product>) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return products[index];
  },
  
  // Delete product
  delete: (id: number) => {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    products.splice(index, 1);
    return true;
  },
  
  // Bulk import products
  bulkImport: (productsData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const imported: Product[] = [];
    const now = new Date().toISOString();
    
    for (const data of productsData) {
      // Check if product already exists by slug
      const existing = products.find(p => p.slug === data.slug);
      
      if (existing) {
        // Update existing product
        const updated = productsDB.update(existing.id, data);
        if (updated) imported.push(updated);
      } else {
        // Create new product
        const product: Product = {
          ...data,
          id: nextProductId++,
          createdAt: now,
          updatedAt: now,
        };
        products.push(product);
        imported.push(product);
      }
    }
    
    return imported;
  },
  
  // Get products count
  count: () => products.length,
  
  // Clear all products (for testing)
  clear: () => {
    products = [];
    nextProductId = 1;
  },
};

// Categories CRUD
export const categoriesDB = {
  // Get all categories
  getAll: () => {
    // Update product counts
    return categories.map(cat => ({
      ...cat,
      productCount: products.filter(p => p.category === cat.name).length,
    }));
  },
  
  // Get category by ID
  getById: (id: number) => {
    return categories.find(c => c.id === id) || null;
  },
  
  // Get category by name
  getByName: (name: string) => {
    return categories.find(c => c.name === name) || null;
  },
  
  // Create category
  create: (name: string, description: string = '') => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category: Category = {
      id: nextCategoryId++,
      name,
      slug,
      description,
      productCount: 0,
    };
    categories.push(category);
    return category;
  },
  
  // Update category
  update: (id: number, data: Partial<Category>) => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    categories[index] = {
      ...categories[index],
      ...data,
    };
    return categories[index];
  },
  
  // Delete category
  delete: (id: number) => {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  },
  
  // Bulk create categories
  bulkCreate: (names: string[]) => {
    const created: Category[] = [];
    
    for (const name of names) {
      const existing = categories.find(c => c.name === name);
      if (!existing) {
        const category = categoriesDB.create(name);
        created.push(category);
      }
    }
    
    return created;
  },
  
  // Clear all categories
  clear: () => {
    categories = [];
    nextCategoryId = 1;
  },
};
