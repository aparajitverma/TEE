'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import BasicInfoStep from '@/components/product-form/BasicInfoStep';
import SpecificationsStep from '@/components/product-form/SpecificationsStep';
import PricingStep from '@/components/product-form/PricingStep';
import InventoryStep from '@/components/product-form/InventoryStep';
import VendorPackagingStep from '@/components/product-form/VendorPackagingStep';
import CertificationsStep from '@/components/product-form/CertificationsStep';
import ImagesMediaStep from '@/components/product-form/ImagesMediaStep';
import SeoWebsiteStep from '@/components/product-form/SeoWebsiteStep';

interface ProductFormData {
  // Basic Information
  productName: string;
  productNameScientific: string;
  category: string;
  subcategory: string;
  productCode: string;
  status: string;
  featured: boolean;
  shortDescription: string;
  longDescription: string;
  
  // Specifications
  specifications: {
    botanicalName: string;
    partUsed: string;
    form: string;
    color: string;
    aroma: string;
    moistureContent: string;
    purity: string;
    meshSize: string;
    originRegion: string;
    harvestSeason: string;
    shelfLife: string;
    storageConditions: string;
  };
  
  // Pricing
  costPrice: number;
  sellingPrice: number;
  currency: string;
  unit: string;
  moq: number;
  bulkPricing: Array<{ qtyFrom: number; qtyTo: number; price: number }>;
  
  // Inventory
  currentStock: number;
  stockUnit: string;
  reorderLevel: number;
  maxStockLevel: number;
  warehouseLocation: string;
  
  // Vendor & Packaging
  primaryVendorId: number | null;
  vendorProductCode: string;
  vendorLeadTimeDays: number;
  packagingOptions: Array<{ type: string; size: string; packagesPerContainer: string }>;
  
  // Certifications
  certifications: string[];
  hsCode: string;
  casNumber: string;
  fssaiApproved: boolean;
  fdaApproved: boolean;
  euCompliant: boolean;
  
  // Images & Media
  images: string[];
  videoUrl: string;
  brochureUrl: string;
  
  // SEO & Website
  publishedOnWebsite: boolean;
  seoTitle: string;
  metaDescription: string;
  metaKeywords: string;
  slug: string;
}

const STEPS = [
  { id: 1, name: 'Basic Info', component: BasicInfoStep },
  { id: 2, name: 'Specifications', component: SpecificationsStep },
  { id: 3, name: 'Pricing', component: PricingStep },
  { id: 4, name: 'Inventory', component: InventoryStep },
  { id: 5, name: 'Vendor & Packaging', component: VendorPackagingStep },
  { id: 6, name: 'Certifications', component: CertificationsStep },
  { id: 7, name: 'Images & Media', component: ImagesMediaStep },
  { id: 8, name: 'SEO & Website', component: SeoWebsiteStep },
];

export default function NewProductPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    productNameScientific: '',
    category: '',
    subcategory: '',
    productCode: '',
    status: 'Active',
    featured: false,
    shortDescription: '',
    longDescription: '',
    specifications: {
      botanicalName: '',
      partUsed: '',
      form: '',
      color: '',
      aroma: '',
      moistureContent: '',
      purity: '',
      meshSize: '',
      originRegion: '',
      harvestSeason: '',
      shelfLife: '',
      storageConditions: '',
    },
    costPrice: 0,
    sellingPrice: 0,
    currency: 'USD',
    unit: 'kg',
    moq: 1,
    bulkPricing: [],
    currentStock: 0,
    stockUnit: 'kg',
    reorderLevel: 0,
    maxStockLevel: 0,
    warehouseLocation: '',
    primaryVendorId: null,
    vendorProductCode: '',
    vendorLeadTimeDays: 0,
    packagingOptions: [],
    certifications: [],
    hsCode: '',
    casNumber: '',
    fssaiApproved: false,
    fdaApproved: false,
    euCompliant: false,
    images: [],
    videoUrl: '',
    brochureUrl: '',
    publishedOnWebsite: false,
    seoTitle: '',
    metaDescription: '',
    metaKeywords: '',
    slug: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const updateFormData = (data: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async (publishNow: boolean = false) => {
    setIsSaving(true);
    try {
      // Calculate margin percentage
      const marginPercentage = formData.sellingPrice > 0
        ? ((formData.sellingPrice - formData.costPrice) / formData.sellingPrice) * 100
        : 0;

      const payload = {
        productCode: formData.productCode,
        productName: formData.productName,
        productNameScientific: formData.productNameScientific,
        category: formData.category,
        subcategory: formData.subcategory || null,
        status: formData.status,
        featured: formData.featured,
        shortDescription: formData.shortDescription || null,
        longDescription: formData.longDescription || null,
        metaDescription: formData.metaDescription || null,
        metaKeywords: formData.metaKeywords || null,
        seoTitle: formData.seoTitle || null,
        slug: formData.slug || null,
        specifications: JSON.stringify(formData.specifications),
        costPrice: formData.costPrice,
        sellingPrice: formData.sellingPrice,
        currency: formData.currency,
        unit: formData.unit,
        moq: formData.moq,
        marginPercentage,
        bulkPricing: formData.bulkPricing.length > 0 ? JSON.stringify(formData.bulkPricing) : null,
        currentStock: formData.currentStock,
        stockUnit: formData.stockUnit,
        reorderLevel: formData.reorderLevel || null,
        maxStockLevel: formData.maxStockLevel || null,
        warehouseLocation: formData.warehouseLocation || null,
        primaryVendorId: formData.primaryVendorId,
        vendorProductCode: formData.vendorProductCode || null,
        vendorLeadTimeDays: formData.vendorLeadTimeDays || null,
        packagingOptions: formData.packagingOptions.length > 0 ? JSON.stringify(formData.packagingOptions) : null,
        certifications: formData.certifications.length > 0 ? JSON.stringify(formData.certifications) : null,
        hsCode: formData.hsCode || null,
        casNumber: formData.casNumber || null,
        fssaiApproved: formData.fssaiApproved,
        fdaApproved: formData.fdaApproved,
        euCompliant: formData.euCompliant,
        images: formData.images.length > 0 ? JSON.stringify(formData.images) : null,
        videoUrl: formData.videoUrl || null,
        brochureUrl: formData.brochureUrl || null,
        publishedOnWebsite: publishNow || formData.publishedOnWebsite,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(publishNow ? 'Product saved and published!' : 'Product saved as draft!');
        router.push('/admin/products');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to save product'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/products')}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Add New Product</h1>
            <p className="text-gray-400">Fill in the product details</p>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > step.id
                        ? 'bg-emerald-600 text-white'
                        : currentStep === step.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${
                      currentStep === step.id ? 'text-white font-medium' : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <CurrentStepComponent formData={formData} updateFormData={updateFormData} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-3">
            {currentStep === STEPS.length ? (
              <>
                <button
                  onClick={() => handleSave(false)}
                  disabled={isSaving}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-medium disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50"
                >
                  {isSaving ? 'Publishing...' : 'Save & Publish'}
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
