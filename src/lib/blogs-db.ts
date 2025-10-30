// Temporary in-memory database for blog posts
// TODO: Replace with actual database (Prisma/MySQL)

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorEmail: string;
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  images: string[];
  tags: string[];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  scheduledDate: string | null;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  viewsCount: number;
  websitePostId: string | null;
  syncStatus: 'synced' | 'pending' | 'failed' | 'not_synced';
  lastSynced: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

// In-memory storage
let blogPosts: BlogPost[] = [];
let blogCategories: BlogCategory[] = [];
let nextPostId = 1;
let nextCategoryId = 1;

// Blog Posts CRUD
export const blogsDB = {
  // Get all posts with filtering
  getAll: (filters: {
    search?: string;
    category?: string;
    status?: string;
    author?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    let filtered = [...blogPosts];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(search) ||
        p.excerpt.toLowerCase().includes(search) ||
        p.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    if (filters.author) {
      filtered = filtered.filter(p => p.author === filters.author);
    }
    
    // Sort by published date (newest first)
    filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    
    const total = filtered.length;
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;
    
    const paginated = filtered.slice(offset, offset + limit);
    
    return {
      posts: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  
  // Get single post by ID
  getById: (id: number) => {
    return blogPosts.find(p => p.id === id) || null;
  },
  
  // Get post by slug
  getBySlug: (slug: string) => {
    return blogPosts.find(p => p.slug === slug) || null;
  },
  
  // Create new post
  create: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const post: BlogPost = {
      ...data,
      id: nextPostId++,
      createdAt: now,
      updatedAt: now,
    };
    blogPosts.push(post);
    return post;
  },
  
  // Update post
  update: (id: number, data: Partial<BlogPost>) => {
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    blogPosts[index] = {
      ...blogPosts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return blogPosts[index];
  },
  
  // Delete post
  delete: (id: number) => {
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    blogPosts.splice(index, 1);
    return true;
  },
  
  // Bulk import posts
  bulkImport: (postsData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const imported: BlogPost[] = [];
    const now = new Date().toISOString();
    
    for (const data of postsData) {
      // Check if post already exists by slug
      const existing = blogPosts.find(p => p.slug === data.slug);
      
      if (existing) {
        // Update existing post
        const updated = blogsDB.update(existing.id, data);
        if (updated) imported.push(updated);
      } else {
        // Create new post
        const post: BlogPost = {
          ...data,
          id: nextPostId++,
          createdAt: now,
          updatedAt: now,
        };
        blogPosts.push(post);
        imported.push(post);
      }
    }
    
    return imported;
  },
  
  // Increment view count
  incrementViews: (id: number) => {
    const post = blogPosts.find(p => p.id === id);
    if (post) {
      post.viewsCount++;
      return post;
    }
    return null;
  },
  
  // Get posts count
  count: () => blogPosts.length,
  
  // Clear all posts (for testing)
  clear: () => {
    blogPosts = [];
    nextPostId = 1;
  },
};

// Blog Categories CRUD
export const blogCategoriesDB = {
  // Get all categories
  getAll: () => {
    // Update post counts
    return blogCategories.map(cat => ({
      ...cat,
      postCount: blogPosts.filter(p => p.category === cat.name).length,
    }));
  },
  
  // Get category by ID
  getById: (id: number) => {
    return blogCategories.find(c => c.id === id) || null;
  },
  
  // Get category by name
  getByName: (name: string) => {
    return blogCategories.find(c => c.name === name) || null;
  },
  
  // Create category
  create: (name: string, description: string = '') => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category: BlogCategory = {
      id: nextCategoryId++,
      name,
      slug,
      description,
      postCount: 0,
    };
    blogCategories.push(category);
    return category;
  },
  
  // Update category
  update: (id: number, data: Partial<BlogCategory>) => {
    const index = blogCategories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    blogCategories[index] = {
      ...blogCategories[index],
      ...data,
    };
    return blogCategories[index];
  },
  
  // Delete category
  delete: (id: number) => {
    const index = blogCategories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    blogCategories.splice(index, 1);
    return true;
  },
  
  // Bulk create categories
  bulkCreate: (names: string[]) => {
    const created: BlogCategory[] = [];
    
    for (const name of names) {
      const existing = blogCategories.find(c => c.name === name);
      if (!existing) {
        const category = blogCategoriesDB.create(name);
        created.push(category);
      }
    }
    
    return created;
  },
  
  // Clear all categories
  clear: () => {
    blogCategories = [];
    nextCategoryId = 1;
  },
};
