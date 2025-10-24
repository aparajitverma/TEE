import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Pure Sandalwood Essential Oil - Mysore Sandalwood | The Export Express',
  description: 'Authentic Mysore sandalwood essential oil from India. 100% pure, steam distilled, with rich woody aroma. Perfect for perfumery and aromatherapy.',
  keywords: 'sandalwood oil export, mysore sandalwood, sandalwood essential oil, santalum album',
};

export default function SandalwoodOilProductPage() {
  return (
    <ProductDetail
      title="Pure Sandalwood Essential Oil (Mysore)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop", alt: "Sandalwood oil bottle" },
        { url: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&h=800&fit=crop", alt: "Sandalwood wood" },
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Essential oil collection" },
      ]}
      shortDescription="Authentic Mysore sandalwood essential oil (Santalum album) steam-distilled from sustainably sourced heartwood. Known as 'liquid gold,' our sandalwood oil features the characteristic rich, woody, sweet aroma prized in high-end perfumery and aromatherapy."
      detailedDescription={[
        "Mysore sandalwood from Karnataka, India, is considered the finest sandalwood in the world, producing essential oil of unparalleled quality and aroma complexity. Our sandalwood oil is extracted through careful steam distillation of heartwood from mature trees (minimum 15 years old), yielding a precious oil rich in alpha-santalol and beta-santalol, the key aromatic compounds. The oil's deep, warm, woody fragrance with subtle sweet undertones has made it one of the most sought-after ingredients in luxury perfumery, cosmetics, and aromatherapy for centuries.",
        "Due to strict government regulations protecting sandalwood trees, we source our raw material exclusively through legal channels with proper documentation and permits. Each batch comes with complete traceability certificates and government-issued authenticity documents. Our distillation process uses traditional copper stills combined with modern quality control, ensuring optimal extraction while preserving the oil's therapeutic properties and aromatic profile. Laboratory testing confirms purity (100% pure, no additives), specific gravity, refractive index, and santalol content (typically 90%+ combined alpha and beta santalol).",
        "Ideal for perfume houses creating oriental and woody fragrances, cosmetic manufacturers developing premium skincare products, aromatherapy practitioners, and essential oil distributors serving luxury markets. Sandalwood oil is known for its fixative properties in perfumery, skin-soothing benefits in cosmetics, and calming effects in aromatherapy. Available in various quantities from 10ml sample bottles to bulk orders. Due to the precious nature of this oil, prices are premium but competitive. We provide complete documentation including government permits, certificates of analysis, and CITES documentation where required for international trade."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Santalum album" },
        { label: "Extraction Method", value: "Steam Distillation" },
        { label: "Part Used", value: "Heartwood" },
        { label: "Santalol Content", value: "90%+ (α & β combined)" },
        { label: "Color", value: "Pale yellow to golden" },
        { label: "Consistency", value: "Viscous liquid" },
        { label: "Aroma", value: "Rich, woody, sweet" },
        { label: "Shelf Life", value: "5+ years" },
      ]}
      origin="Karnataka (Mysore), India"
      form="Pure Essential Oil"
      quantityOptions={[
        "10 ml",
        "50 ml",
        "100 ml",
        "500 ml",
        "1 liter",
        "5 liters+",
      ]}
      certifications={[
        "GC-MS Tested",
        "ISO 9001",
        "Government Permits",
        "CITES Compliant",
        "Organic (Available)",
      ]}
      hsCode="3301.29"
      exportInfo={{
        markets: [
          "France",
          "United States",
          "UAE",
          "Switzerland",
          "Japan",
          "Singapore",
        ],
        packaging: "Amber glass bottles with tamper-proof seals",
        moq: "100 ml",
        leadTime: "20-25 days",
      }}
      downloads={{
        specSheet: "/downloads/sandalwood-oil-spec-sheet.pdf",
        coa: "/downloads/sandalwood-oil-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Jasmine Absolute Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/jasmine-oil",
        },
        {
          name: "Rose Essential Oil",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/rose-oil",
        },
        {
          name: "Vetiver Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/vetiver-oil",
        },
        {
          name: "Patchouli Oil",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/patchouli-oil",
        },
      ]}
    />
  );
}
