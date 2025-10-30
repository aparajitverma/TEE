import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Lemongrass Essential Oil - Cymbopogon flexuosus | The Export Express',
  description: 'Bright, citrusy lemongrass oil with 75%+ citral content. Steam-distilled from fresh stalks harvested at peak morning hours. Pesticide-free, IPM cultivated. GMP, Organic, Halal certified.',
  keywords: 'lemongrass oil export, cymbopogon flexuosus, citral oil, lemongrass essential oil, organic lemongrass, halal essential oil',
};

export default function LemongrassOilProductPage() {
  return (
    <ProductDetail
      title="Lemongrass Essential Oil (Cymbopogon flexuosus)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop", alt: "Lemongrass oil bottle" },
        { url: "https://images.unsplash.com/photo-1595622472498-e22d90a24a1e?w=800&h=800&fit=crop", alt: "Lemongrass stalks" },
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Essential oil collection" },
      ]}
      shortDescription="Bright, citrusy lemongrass essential oil (Cymbopogon flexuosus) with 75%+ citral content. Steam-distilled from fresh stalks harvested at peak morning hours (06:00-08:00) when citral concentration is highest. Pesticide-free, IPM cultivated. GMP, Organic, and Halal certified."
      detailedDescription={[
        "Our lemongrass essential oil is steam-distilled from Cymbopogon flexuosus 'Mysore' cultivar, known for its high citral content (≈75%). Stalks are cultivated using Integrated Pest Management (IPM) with Trichoderma spp. and neem-based formulations, avoiding systemic fungicides that could contaminate the oil. Harvest occurs 90-120 days after planting during early morning hours (06:00-08:00) when citral concentration peaks. Stalks are cut 5-10cm above ground using sterilized machetes and transported to the distillery within 2 hours in UV-protected, ventilated crates to prevent wilting and citral hydrolysis.",
        "Processing takes place in GMP-certified facilities using stainless-steel (AISI-304) closed-loop stills. Stalks are trimmed to 30-40cm, washed with potable water, and air-dried 1-2 hours to reach ≈70% moisture. Steam distillation operates at 0.6-0.9 MPa (6-9 bar) with steam temperature 100-110°C for 3-4 hours per batch. The steam-to-biomass ratio is optimized at 3-4 kg steam per kg fresh stalk to avoid hydrothermal degradation of citral. Oil yield averages 0.5-1.2% w/w from fresh stalks (typical 0.85%). Post-distillation, oil is stored in amber glass or stainless-steel containers with nitrogen blanketing (≥95% N₂) at 15-20°C away from light.",
        "Every batch undergoes NABL-accredited laboratory testing per ISO 11024-1 standards. GC-MS fingerprinting confirms citral (geranial + neral) ≥70%, linalool ≤5%, α-terpineol ≤2%, and β-myrcene ≤1%. Chiral GC-FID verifies geranial:neral ratio ≈55:45 (±5%). Optical rotation [α]D²⁰ = +30±3°, specific gravity 0.86-0.88 at 20°C, acid value ≤4 mg KOH/g, and peroxide value ≤10 meq O₂/kg. Heavy metals and pesticide residues are tested via ICP-MS and LC-MS/MS, ensuring compliance with FSSAI and EU MRL limits. Complete documentation includes CoA with full GC-MS chromatogram, MSDS per GHS standards, Phytosanitary Certificate, and Certificate of Origin. Optional organic and halal certifications available."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Cymbopogon flexuosus" },
        { label: "Extraction Method", value: "Steam Distillation" },
        { label: "Part Used", value: "Fresh stalks (early morning harvest)" },
        { label: "Citral Content", value: "≥70% (geranial + neral)" },
        { label: "Geranial:Neral Ratio", value: "≈55:45 (±5%)" },
        { label: "Linalool", value: "≤5%" },
        { label: "α-Terpineol", value: "≤2%" },
        { label: "Optical Rotation", value: "[α]D²⁰ = +30±3°" },
        { label: "Specific Gravity", value: "0.86-0.88 at 20°C" },
        { label: "Acid Value", value: "≤4 mg KOH/g" },
        { label: "Peroxide Value", value: "≤10 meq O₂/kg" },
        { label: "Microbial Load", value: "≤10³ CFU/g" },
        { label: "Color", value: "Yellow to amber" },
        { label: "Aroma", value: "Fresh, citrusy, lemony" },
        { label: "Shelf Life", value: "24+ months (nitrogen-sealed, <25°C)" },
      ]}
      origin="India (Multiple regions)"
      form="Pure Essential Oil (Steam Distilled)"
      quantityOptions={[
        "30 ml amber bottle",
        "100 ml amber bottle",
        "250 ml amber bottle",
        "20 L HDPE drum (B2B)",
        "Custom bulk quantities",
      ]}
      certifications={[
        "GMP Certified",
        "ISO 9001",
        "NABL Lab Tested",
        "APEDA Registered",
        "USDA Organic (select batches)",
        "Halal Certified",
        "IFRA Compliant",
        "REACH/CPNP (EU)",
      ]}
      hsCode="3301.10.00"
      exportInfo={{
        markets: [
          "EU - Germany, France, UK",
          "United States",
          "GCC - UAE, Saudi Arabia",
          "Japan",
          "South Korea",
          "Australia",
        ],
        packaging: "Amber glass bottles with PTFE-lined screw caps, nitrogen-flushed sealed cartons, foam inserts, silica gel packets (1% w/w)",
        moq: "Contact for MOQ based on grade and certification",
        leadTime: "3-4 days processing + 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/lemongrass-oil-spec-sheet.pdf",
        coa: "/downloads/lemongrass-oil-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Vetiver Essential Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/vetiver-oil",
        },
        {
          name: "Sandalwood Essential Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/sandalwood-oil",
        },
        {
          name: "Jasmine Absolute",
          image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&h=400&fit=crop",
          link: "/products/aromatics/jasmine-absolute",
        },
        {
          name: "Rose Absolute",
          image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
          link: "/products/aromatics/rose-absolute",
        },
      ]}
    />
  );
}
