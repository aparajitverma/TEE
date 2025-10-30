import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Jasmine Absolute - Jasminum grandiflorum | The Export Express',
  description: 'Luxurious jasmine absolute from hand-picked pre-dawn blossoms. High linalool & benzyl acetate. Hexane residue <10ppm. ISO 9001, NABL certified. Solvent-extracted premium quality.',
  keywords: 'jasmine absolute export, jasminum grandiflorum, jasmine oil, solvent extraction, perfume ingredient, aromatherapy jasmine',
};

export default function JasmineAbsoluteProductPage() {
  return (
    <ProductDetail
      title="Jasmine Absolute (Jasminum grandiflorum)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&h=800&fit=crop", alt: "Jasmine absolute bottle" },
        { url: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=800&h=800&fit=crop", alt: "Jasmine flowers" },
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Essential oil collection" },
      ]}
      shortDescription="Luxurious jasmine absolute (Jasminum grandiflorum) from hand-picked pre-dawn blossoms. High linalool (≥20%) & benzyl acetate (≥15%) content. Solvent-extracted with hexane residue <10ppm. NABL lab certified, ISO 9001 compliant. Perfect for high-end perfumery and aromatherapy."
      detailedDescription={[
        "Our jasmine absolute is extracted from Jasminum grandiflorum 'Lalitha' flowers harvested during peak bloom (04:00-07:00 hours) when essential oil content is highest. The flowers are hand-picked from organic farms in Tamil Nadu and processed within hours to preserve the delicate aromatic compounds. Using analytical-grade hexane (≥99.9%), we employ a two-stage extraction process: first creating a waxy concrete (1.5-2% yield from fresh buds), then refining with 95% USP ethanol to produce the final absolute (0.10-0.20% yield from fresh flowers).",
        "Our NABL-accredited lab conducts comprehensive testing on every batch: GC-MS fingerprinting confirms linalool ≥20%, benzyl acetate ≥15%, and indole ≤0.5%. Residual solvent analysis ensures hexane ≤10ppm and ethanol ≤500ppm per USP <467> standards. Heavy metals (Pb, Cd, As, Hg) are tested via ICP-MS and kept below FSSAI/EU MRL limits. Specific gravity ranges 0.97-1.02 at 20°C, with optical rotation [α]D²⁰ = +28±3°. Each batch includes full documentation: CoA with GC-MS chromatogram, MSDS per GHS standards, Phytosanitary Certificate, and Certificate of Origin.",
        "Target markets include luxury perfume houses, boutique fragrance manufacturers, natural cosmetics brands, and aromatherapy product developers. Jasmine absolute is prized for its intoxicating floral aroma and is used in high-end perfumes, skincare formulations, and wellness products. Available in 30ml-250ml amber glass bottles with PTFE-lined caps and nitrogen purge, or bulk HDPE drums (20L-200L) for large manufacturers. MOQ varies by grade. We provide APEDA registration, REACH/CPNP documentation for EU markets, and optional organic certification."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Jasminum grandiflorum" },
        { label: "Extraction Method", value: "Solvent Extraction (Hexane/Ethanol)" },
        { label: "Part Used", value: "Fresh flower buds (pre-dawn harvest)" },
        { label: "Linalool Content", value: "≥20%" },
        { label: "Benzyl Acetate", value: "≥15%" },
        { label: "Indole", value: "≤0.5%" },
        { label: "Residual Hexane", value: "≤10 ppm" },
        { label: "Residual Ethanol", value: "≤500 ppm" },
        { label: "Specific Gravity", value: "0.97-1.02 at 20°C" },
        { label: "Color", value: "Viscous amber" },
        { label: "Shelf Life", value: "24+ months (nitrogen-sealed, <25°C)" },
      ]}
      origin="Tamil Nadu, India"
      form="Absolute (Solvent Extracted)"
      quantityOptions={[
        "30 ml amber bottle",
        "100 ml amber bottle",
        "250 ml amber bottle",
        "20 L HDPE drum (B2B)",
        "Custom bulk quantities",
      ]}
      certifications={[
        "ISO 9001",
        "NABL Lab Certified",
        "GMP Audited",
        "IFRA Compliant",
        "Organic Option Available",
        "APEDA Registered",
        "REACH/CPNP (EU)",
      ]}
      hsCode="3301.13.00"
      exportInfo={{
        markets: [
          "EU - France, Germany, UK",
          "United States",
          "GCC - UAE, Saudi Arabia",
          "Japan",
          "South Korea",
          "China",
        ],
        packaging: "Amber glass bottles with PTFE-lined caps, nitrogen-flushed poly-bags, foam-insulated corrugated cartons",
        moq: "Contact for MOQ based on grade",
        leadTime: "4-5 days processing + 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/jasmine-absolute-spec-sheet.pdf",
        coa: "/downloads/jasmine-absolute-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Rose Absolute",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/rose-absolute",
        },
        {
          name: "Sandalwood Essential Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/sandalwood-oil",
        },
        {
          name: "Vetiver Essential Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/vetiver-oil",
        },
        {
          name: "Lemongrass Essential Oil",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/lemongrass-oil",
        },
      ]}
    />
  );
}
