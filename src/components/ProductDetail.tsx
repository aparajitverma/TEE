'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, ShoppingCart, Mail, ZoomIn, CheckCircle, Home } from 'lucide-react';

interface ProductImage {
  url: string;
  alt: string;
}

interface Specification {
  label: string;
  value: string;
}

interface RelatedProduct {
  name: string;
  image: string;
  link: string;
}

interface ProductDetailProps {
  title: string;
  category: string;
  heroImage: string;
  images: ProductImage[];
  shortDescription: string;
  detailedDescription: string[];
  specifications: Specification[];
  origin: string;
  form: string;
  quantityOptions: string[];
  certifications: string[];
  hsCode: string;
  exportInfo: {
    markets: string[];
    packaging: string;
    moq: string;
    leadTime: string;
  };
  downloads?: {
    specSheet?: string;
    coa?: string;
  };
  relatedProducts?: RelatedProduct[];
}

export default function ProductDetail({
  title,
  category,
  heroImage,
  images,
  shortDescription,
  detailedDescription,
  specifications,
  origin,
  form,
  quantityOptions,
  certifications,
  hsCode,
  exportInfo,
  downloads,
  relatedProducts,
}: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const allImages = [{ url: heroImage, alt: title }, ...images];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Generate JSON-LD structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": shortDescription,
    "image": allImages.map(img => img.url),
    "brand": {
      "@type": "Brand",
      "name": "The Export Express"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Organization",
        "name": "The Export Express"
      }
    },
    "category": category,
    "additionalProperty": specifications.map(spec => ({
      "@type": "PropertyValue",
      "name": spec.label,
      "value": spec.value
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://theexportexpress.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://theexportexpress.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category,
        "item": `https://theexportexpress.com/products/${category.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": title,
        "item": typeof window !== 'undefined' ? window.location.href : ''
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <main className="container mx-auto px-4 py-12 pt-32">
          {/* Enhanced Breadcrumb Navigation */}
          <nav className="flex items-center text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:text-green-400 transition-colors flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <a href="/products" className="hover:text-green-400 transition-colors">Products</a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <a href={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-green-400 transition-colors">{category}</a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <span className="text-gray-300 font-medium">{title}</span>
              </li>
            </ol>
          </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 aspect-square">
              <img
                src={allImages[currentImageIndex].url}
                alt={`${title} - ${allImages[currentImageIndex].alt}`}
                title={title}
                loading="eager"
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-green-500'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${title} - ${image.alt}`}
                      title={`${title} thumbnail ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-green-400 text-sm font-semibold mb-2">{category}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">{shortDescription}</p>
            </div>

            {/* Quick Specs */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Origin</p>
                  <p className="text-white font-semibold">{origin}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Form</p>
                  <p className="text-white font-semibold">{form}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">HS Code</p>
                  <p className="text-white font-semibold">{hsCode}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">MOQ</p>
                  <p className="text-white font-semibold">{exportInfo.moq}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30 flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/contact"
                className="flex-1 min-w-[200px] bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Request Quote
              </a>
              <a
                href="/contact"
                className="flex-1 min-w-[200px] bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Sample
              </a>
            </div>

            {/* Downloads */}
            {downloads && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Downloads</h3>
                <div className="space-y-2">
                  {downloads.specSheet && (
                    <a
                      href={downloads.specSheet}
                      className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Product Specification Sheet (PDF)</span>
                      <Download className="w-4 h-4 ml-auto" />
                    </a>
                  )}
                  {downloads.coa && (
                    <a
                      href={downloads.coa}
                      className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Certificate of Analysis (PDF)</span>
                      <Download className="w-4 h-4 ml-auto" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Detailed Description */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Product Description</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {detailedDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quantity Options */}
            {quantityOptions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Available Quantities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {quantityOptions.map((option, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 text-center text-gray-300"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="border-b border-white/10 pb-3">
                  <p className="text-gray-400 text-sm mb-1">{spec.label}</p>
                  <p className="text-white font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Information */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Export Information</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-green-400 font-semibold mb-3">Key Markets</h3>
              <ul className="space-y-2 text-gray-300">
                {exportInfo.markets.map((market, index) => (
                  <li key={index}>• {market}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-green-400 font-semibold mb-3">Packaging</h3>
              <p className="text-gray-300">{exportInfo.packaging}</p>
            </div>
            <div>
              <h3 className="text-green-400 font-semibold mb-3">Minimum Order</h3>
              <p className="text-gray-300">{exportInfo.moq}</p>
            </div>
            <div>
              <h3 className="text-green-400 font-semibold mb-3">Lead Time</h3>
              <p className="text-gray-300">{exportInfo.leadTime}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <a
                  key={index}
                  href={product.link}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.name} - Related product`}
                      title={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        </main>
      </div>
    </>
  );
}
