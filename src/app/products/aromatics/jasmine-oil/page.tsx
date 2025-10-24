import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Jasmine Absolute Oil - Pure Indian Jasmine | The Export Express',
  description: 'Premium jasmine absolute oil from India. Solvent-extracted from fresh jasmine flowers. Rich, floral, intoxicating aroma for perfumery.',
  keywords: 'jasmine oil export, jasmine absolute, jasmine sambac, perfume oil',
};

export default function JasmineOilProductPage() {
  return (
    <ProductDetail
      title="Jasmine Absolute Oil (Sambac)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&h=800&fit=crop", alt: "Jasmine flowers" },
        { url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop", alt: "Jasmine oil bottle" },
        { url: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&h=800&fit=crop", alt: "Essential oils" },
      ]}
      shortDescription="Exquisite jasmine absolute oil extracted from hand-picked Jasminum sambac flowers. This precious oil captures the intoxicating, sweet floral aroma of fresh jasmine, making it one of the most valuable ingredients in luxury perfumery and aromatherapy."
      detailedDescription={[
        "Indian jasmine, particularly Jasminum sambac (Mogra), produces one of the most prized floral absolutes in the world. Our jasmine flowers are hand-picked at night when their fragrance is most intense, then processed within hours to capture the full aromatic complexity. It takes approximately 8,000 hand-picked flowers to produce just 1ml of jasmine absolute, making this one of the most precious and expensive essential oils available. The resulting oil has a rich, warm, intensely floral aroma with honey-like sweetness and green undertones.",
        "We use solvent extraction followed by alcohol washing to produce a pure absolute, free from residual solvents. This method preserves the delicate aromatic compounds that would be destroyed by steam distillation. Each batch undergoes rigorous quality testing including GC-MS analysis to verify authenticity and purity, specific gravity testing, and organoleptic evaluation by trained perfumers. Our jasmine absolute contains the full spectrum of natural aromatic compounds including benzyl acetate, linalool, and indole, creating the characteristic jasmine scent profile.",
        "Essential for perfume houses creating floral, oriental, and chypre fragrances, cosmetic manufacturers developing luxury skincare and haircare products, and aromatherapy practitioners. Jasmine absolute is known for its aphrodisiac properties, mood-enhancing effects, and skin-nourishing benefits. Used in high-end perfumes, body oils, facial serums, and aromatherapy blends. Available in small quantities due to its precious nature. We provide complete documentation including certificates of analysis, batch-specific GC-MS reports, and allergen declarations for regulatory compliance."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Jasminum sambac" },
        { label: "Extraction Method", value: "Solvent Extraction (Absolute)" },
        { label: "Part Used", value: "Fresh Flowers" },
        { label: "Color", value: "Dark orange to brown" },
        { label: "Consistency", value: "Viscous liquid" },
        { label: "Aroma", value: "Intensely floral, sweet, warm" },
        { label: "Solubility", value: "Alcohol, oils" },
        { label: "Shelf Life", value: "3-5 years" },
      ]}
      origin="Tamil Nadu & Karnataka, India"
      form="Pure Absolute Oil"
      quantityOptions={[
        "5 ml",
        "10 ml",
        "25 ml",
        "50 ml",
        "100 ml",
        "Custom quantities",
      ]}
      certifications={[
        "GC-MS Tested",
        "IFRA Compliant",
        "ISO 9001",
        "Allergen Tested",
        "Organic (Available)",
      ]}
      hsCode="3301.29"
      exportInfo={{
        markets: [
          "France",
          "United States",
          "Switzerland",
          "UAE",
          "United Kingdom",
          "Japan",
        ],
        packaging: "Amber glass bottles, nitrogen flushed",
        moq: "50 ml",
        leadTime: "25-30 days",
      }}
      downloads={{
        specSheet: "/downloads/jasmine-oil-spec-sheet.pdf",
        coa: "/downloads/jasmine-oil-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Sandalwood Essential Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/sandalwood-oil",
        },
        {
          name: "Rose Absolute Oil",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/rose-oil",
        },
        {
          name: "Ylang Ylang Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/ylang-ylang-oil",
        },
        {
          name: "Tuberose Absolute",
          image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&h=400&fit=crop",
          link: "/products/aromatics/tuberose-oil",
        },
      ]}
    />
  );
}
