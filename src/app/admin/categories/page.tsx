'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, GripVertical, Package, ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string | null;
  productCount?: number;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  productCount?: number;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [subcategoryName, setSubcategoryName] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      // Mock data - replace with actual API call
      const mockCategories: Category[] = [
        { 
          id: 1, 
          name: 'Spices', 
          description: 'All types of spices', 
          productCount: 45,
          subcategories: [
            { id: 1, name: 'Whole Spices', categoryId: 1, productCount: 25 },
            { id: 2, name: 'Ground Spices', categoryId: 1, productCount: 20 }
          ]
        },
        { 
          id: 2, 
          name: 'Herbs', 
          description: 'Medicinal and culinary herbs', 
          productCount: 32,
          subcategories: [
            { id: 3, name: 'Dried Herbs', categoryId: 2, productCount: 18 },
            { id: 4, name: 'Fresh Herbs', categoryId: 2, productCount: 14 }
          ]
        },
        { 
          id: 3, 
          name: 'Essential Oils', 
          description: 'Pure essential oils', 
          productCount: 28,
          subcategories: []
        },
        { 
          id: 4, 
          name: 'Seeds', 
          description: 'Various seeds', 
          productCount: 15,
          subcategories: []
        },
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      if (editingCategory) {
        // Update existing category
        const updated = categories.map(cat =>
          cat.id === editingCategory.id
            ? { ...cat, name: categoryName, description: categoryDescription }
            : cat
        );
        setCategories(updated);
        alert('Category updated successfully');
      } else {
        // Create new category
        const newCategory: Category = {
          id: Date.now(),
          name: categoryName,
          description: categoryDescription,
          productCount: 0,
          subcategories: []
        };
        setCategories([...categories, newCategory]);
        alert('Category created successfully');
      }

      setShowModal(false);
      setCategoryName('');
      setCategoryDescription('');
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? All products in this category will need to be reassigned.')) return;

    try {
      setCategories(categories.filter(cat => cat.id !== id));
      alert('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
    setShowModal(true);
  };

  const toggleCategory = (id: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddSubcategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSubcategoryName('');
    setShowSubcategoryModal(true);
  };

  const handleSaveSubcategory = () => {
    if (!subcategoryName.trim() || !selectedCategoryId) {
      alert('Please enter a subcategory name');
      return;
    }

    const newSubcategory: Subcategory = {
      id: Date.now(),
      name: subcategoryName,
      categoryId: selectedCategoryId,
      productCount: 0
    };

    const updated = categories.map(cat => {
      if (cat.id === selectedCategoryId) {
        return {
          ...cat,
          subcategories: [...(cat.subcategories || []), newSubcategory]
        };
      }
      return cat;
    });

    setCategories(updated);
    setShowSubcategoryModal(false);
    setSubcategoryName('');
    alert('Subcategory added successfully');
  };

  const handleDeleteSubcategory = (categoryId: number, subcategoryId: number) => {
    if (!confirm('Delete this subcategory?')) return;

    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subcategories: cat.subcategories?.filter(sub => sub.id !== subcategoryId)
        };
      }
      return cat;
    });

    setCategories(updated);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Category Management</h1>
            <p className="text-gray-400 mt-1">Organize your product catalog</p>
          </div>
          <button
            onClick={() => {
              setEditingCategory(null);
              setCategoryName('');
              setCategoryDescription('');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Categories</p>
            <p className="text-3xl font-bold text-white mt-1">{categories.length}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Subcategories</p>
            <p className="text-3xl font-bold text-white mt-1">
              {categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-white mt-1">
              {categories.reduce((sum, cat) => sum + (cat.productCount || 0), 0)}
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Categories</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {categories.map((category) => (
              <div key={category.id}>
                {/* Category Row */}
                <div className="p-4 hover:bg-gray-750 transition-colors">
                  <div className="flex items-center gap-4">
                    <button className="cursor-move text-gray-500 hover:text-gray-400">
                      <GripVertical className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <h3 className="text-white font-medium">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-emerald-400">{category.productCount}</p>
                        <p className="text-xs text-gray-400">Products</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddSubcategory(category.id)}
                          className="p-2 hover:bg-gray-700 rounded text-blue-400 hover:text-blue-300"
                          title="Add Subcategory"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-2 hover:bg-gray-700 rounded text-emerald-400 hover:text-emerald-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                {expandedCategories.has(category.id) && category.subcategories && category.subcategories.length > 0 && (
                  <div className="bg-gray-900 border-t border-gray-700">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="p-4 pl-20 flex items-center justify-between hover:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-300">{subcategory.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-blue-400">{subcategory.productCount}</p>
                            <p className="text-xs text-gray-400">Products</p>
                          </div>
                          <button
                            onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                            className="p-1.5 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Category Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Spices, Herbs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Brief description"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  >
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subcategory Modal */}
        {showSubcategoryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Add Subcategory</h2>
                <button
                  onClick={() => setShowSubcategoryModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subcategory Name *
                  </label>
                  <input
                    type="text"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g., Whole Spices, Ground Spices"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSubcategoryModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSubcategory}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
