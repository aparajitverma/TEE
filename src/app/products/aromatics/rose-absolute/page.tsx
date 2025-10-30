import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Rose Absolute - Rosa damascena Kashmir | The Export Express',
  description: 'Exquisite rose absolute with 30%+ phenylethyl alcohol, 20%+ geraniol. Solvent-extracted from fresh Kashmir rose petals. GC-MS certified, batch traceability. GMP, Fair Trade, COSMOS certified.',
  keywords: 'rose absolute export, rosa damascena, kashmir rose, rose oil, perfume ingredient, natural rose fragrance, fair trade rose',
};

export default function RoseAbsoluteProductPage() {
  return (
    <ProductDetail
      title="Rose Absolute (Rosa damascena)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=800&fit=crop", alt: "Rose absolute bottle" },
        { url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=800&fit=crop", alt: "Rosa damascena flowers" },
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Essential oil collection" },
      ]}
      shortDescription="Exquisite rose absolute (Rosa damascena) from Kashmir with 30%+ phenylethyl alcohol and 20%+ geraniol. Solvent-extracted from hand-picked fresh petals harvested at peak bloom (5-8am). GC-MS certified with complete batch traceability via QR code. GMP, Fair Trade, and COSMOS certified."
      detailedDescription={[
        "Our rose absolute is crafted from Rosa damascena 'Mausul' (Kashmir) and Rosa centifolia 'Pashupatinath' (Uttar Pradesh) petals, renowned for their high geraniol and citronellol content. Petals are hand-picked during early morning hours (5-8am) when aromatic compounds are at peak concentration. The flowers are immediately cooled to 15°C and processed within hours to preserve the delicate rose fragrance. Using a two-stage solvent extraction process with analytical-grade hexane (99.9%), we first create a waxy concrete (1.5-2% yield), then refine it with 95% USP ethanol to produce the final absolute (0.08-0.15% yield from fresh petals).",
        "Every batch undergoes rigorous NABL-accredited laboratory testing. GC-MS fingerprinting confirms citronellol ≥16%, geraniol ≥20%, and phenylethyl alcohol ≥30%. Residual solvent analysis ensures hexane ≤10ppm and ethanol ≤500ppm per USP <467> standards. Heavy metals (Pb ≤0.1ppm, Cd ≤0.05ppm, As ≤0.2ppm, Hg ≤0.01ppm) are verified via ICP-MS. Specific gravity ranges 0.98-1.02 at 20°C with optical rotation [α]D²⁰ = +30±3°. Our LIMS integrates with ERP for automatic CoA generation, ensuring zero transcription errors.",
        "Target markets include luxury perfume houses, natural cosmetics manufacturers, aromatherapy brands, and boutique fragrance developers. Rose absolute is the cornerstone of floral perfumes and is valued for its skin-nourishing properties in premium skincare. Available in 30ml-250ml amber glass bottles with PTFE-lined caps and nitrogen purge, or LDPE-lined HDPE drums (≥500ml) for bulk orders. We provide complete export documentation: Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, CoA with GC-MS chromatogram, MSDS per GHS, and optional organic/fair-trade certificates. REACH/CPNP registration support available for EU markets."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Rosa damascena / Rosa centifolia" },
        { label: "Extraction Method", value: "Solvent Extraction (Hexane/Ethanol)" },
        { label: "Part Used", value: "Fresh petals (pre-dawn harvest)" },
        { label: "Citronellol", value: "≥16%" },
        { label: "Geraniol", value: "≥20%" },
        { label: "Phenylethyl Alcohol", value: "≥30%" },
        { label: "Residual Hexane", value: "≤10 ppm" },
        { label: "Residual Ethanol", value: "≤500 ppm" },
        { label: "Specific Gravity", value: "0.98-1.02 at 20°C" },
        { label: "Color", value: "Viscous amber with characteristic rose odor" },
        { label: "Acid Value", value: "≤5 mg KOH/g" },
        { label: "Shelf Life", value: "24+ months (nitrogen-sealed, <25°C)" },
      ]}
      origin="Kashmir, Uttar Pradesh, India"
      form="Absolute (Solvent Extracted)"
      quantityOptions={[
        "30 ml amber bottle",
        "100 ml amber bottle",
        "250 ml amber bottle",
        "500 ml+ LDPE-lined HDPE",
        "Custom bulk quantities",
      ]}
      certifications={[
        "GMP Certified",
        "ISO 9001",
        "Fair Trade Certified",
        "COSMOS-Organic",
        "NABL Lab Tested",
        "IFRA Compliant",
        "APEDA Registered",
        "Organic Option Available",
      ]}
      hsCode="3301.12.00"
      exportInfo={{
        markets: [
          "EU - France, Germany, UK",
          "United States",
          "UAE & GCC",
          "Japan",
          "South Korea",
          "Australia",
        ],
        packaging: "Amber glass bottles with PTFE-lined caps, nitrogen-flushed poly-bags, foam-insulated corrugated cartons with QR-code traceability",
        moq: "Contact for MOQ based on grade and certification",
        leadTime: "4-5 days processing + 5-7 days air freight (express)",
      }}
      downloads={{
        specSheet: "/downloads/rose-absolute-spec-sheet.pdf",
        coa: "/downloads/rose-absolute-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Jasmine Absolute",
          image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&h=400&fit=crop",
          link: "/products/aromatics/jasmine-absolute",
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
