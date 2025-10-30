import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Vetiver Essential Oil - Chrysopogon zizanioides | The Export Express',
  description: 'Earthy, grounding vetiver oil from 12-18 month roots. 30%+ vetiverol, rich sesquiterpene profile. Steam distilled, nitrogen-sealed. ISO 9001, APEDA registered, REACH compliant.',
  keywords: 'vetiver oil export, chrysopogon zizanioides, vetiver essential oil, vetiverol, aromatherapy vetiver, natural fragrance',
};

export default function VetiverOilProductPage() {
  return (
    <ProductDetail
      title="Vetiver Essential Oil (Chrysopogon zizanioides)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop", alt: "Vetiver oil bottle" },
        { url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=800&fit=crop", alt: "Vetiver roots" },
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Essential oil collection" },
      ]}
      shortDescription="Earthy, grounding vetiver essential oil (Chrysopogon zizanioides) from 12-18 month roots. Contains 30%+ vetiverol with rich sesquiterpene profile including β-caryophyllene and α-vetiverene. Steam distilled using stainless-steel equipment with nitrogen-sealed packaging. APEDA registered, ISO 9001 certified."
      detailedDescription={[
        "Our vetiver essential oil is steam-distilled from the roots of Chrysopogon zizanioides cultivated in Rajasthan and Kerala. Roots are harvested 12-18 months after planting when sesquiterpene-rich oil content reaches optimal levels (0.45-0.70% w/w). The roots are carefully cleaned, sorted by diameter (≥15mm), and optionally pre-dried at 40°C to reduce water load and improve oil concentration. Using GMP-certified distillation facilities with stainless-steel (AISI-304) equipment, we employ steam distillation at 1.2 MPa pressure and 95-100°C for 3-4 hours, maintaining an inert nitrogen blanket to prevent oxidation.",
        "Every batch undergoes comprehensive NABL-accredited laboratory testing per ISO 11024-1:2022 standards. GC-MS profiling confirms vetiverol ≥30%, α-vetiverene ≥3%, and total α-vetiverene + β-caryophyllene ≥12%. Optical rotation [α]D²⁰ = -15±2°, acid value ≤4 mg KOH/g, and peroxide value ≤10 meq O₂/kg. Heavy metals (Pb ≤0.1ppm) and pesticide residues are tested via LC-MS/MS and ICP-MS, ensuring compliance with FSSAI and EU MRL limits. Our digital QA dashboard integrates LIMS with ERP for automatic CoA field population, eliminating manual errors.",
        "Target markets include perfume houses (vetiver is a key base note in woody fragrances), natural cosmetics manufacturers, aromatherapy product developers, and essential oil distributors. Vetiver oil is prized for its grounding, calming properties and is used in stress-relief formulations, men's fragrances, and natural skincare. Available in 30ml-250ml amber glass bottles with PTFE-lined caps and nitrogen flush, or HDPE bottles (500ml-1L) for larger quantities. We provide complete export documentation: Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, CoA with GC-MS chromatogram, and MSDS per GHS standards. REACH registration support available for EU markets."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Chrysopogon zizanioides" },
        { label: "Extraction Method", value: "Steam Distillation" },
        { label: "Part Used", value: "Roots (12-18 months old)" },
        { label: "Vetiverol Content", value: "≥30%" },
        { label: "α-Vetiverene", value: "≥3%" },
        { label: "Total Sesquiterpenes", value: "≥12% (α-vetiverene + β-caryophyllene)" },
        { label: "Optical Rotation", value: "[α]D²⁰ = -15±2°" },
        { label: "Acid Value", value: "≤4 mg KOH/g" },
        { label: "Peroxide Value", value: "≤10 meq O₂/kg" },
        { label: "Microbial Load", value: "≤10³ CFU/g" },
        { label: "Color", value: "Amber to dark brown" },
        { label: "Aroma", value: "Earthy, woody, smoky" },
        { label: "Shelf Life", value: "24+ months (nitrogen-sealed, <25°C)" },
      ]}
      origin="Rajasthan, Kerala, India"
      form="Pure Essential Oil (Steam Distilled)"
      quantityOptions={[
        "30 ml amber bottle",
        "100 ml amber bottle",
        "250 ml amber bottle",
        "500 ml HDPE bottle",
        "1 liter HDPE bottle",
        "Custom bulk quantities",
      ]}
      certifications={[
        "ISO 9001",
        "NABL Lab Certified",
        "GMP Audited",
        "APEDA Registered",
        "REACH Compliant (EU)",
        "Sustainable Sourcing",
        "Organic Option Available",
        "IFRA Compliant",
      ]}
      hsCode="3301.29.00"
      exportInfo={{
        markets: [
          "USA",
          "EU - France, Germany, UK",
          "Japan",
          "Australia",
          "GCC - UAE, Saudi Arabia",
          "South Korea",
        ],
        packaging: "Amber glass or HDPE bottles with PTFE-lined caps, nitrogen flush, silica gel packets, foam-insulated corrugated cartons with GS1-128 barcoding",
        moq: "Contact for MOQ based on grade",
        leadTime: "2-4 days processing + 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/vetiver-oil-spec-sheet.pdf",
        coa: "/downloads/vetiver-oil-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Sandalwood Essential Oil",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/sandalwood-oil",
        },
        {
          name: "Lemongrass Essential Oil",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/lemongrass-oil",
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
