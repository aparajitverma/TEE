import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Curcumin Extract 95% - Standardized Turmeric Extract | The Export Express',
  description: '95% curcuminoids standardized extract from Indian turmeric. Bio-available phytosome & BCM-95® options. FOB $120-200/kg. GMP, Organic, Halal certified. Joint care, anti-inflammatory.',
  keywords: 'curcumin extract export, 95% curcuminoids, turmeric extract, phytosome curcumin, BCM-95, standardized curcumin, organic turmeric, anti-inflammatory supplement',
};

export default function CurcuminExtractProductPage() {
  return (
    <ProductDetail
      title="Curcumin Extract (95% Curcuminoids)"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop", alt: "Curcumin extract powder" },
        { url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop", alt: "Turmeric rhizomes" },
        { url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop", alt: "Curcumin capsules" },
      ]}
      shortDescription="Premium 95% curcuminoids standardized extract from Indian turmeric (Curcuma longa). Sourced from high-curcumin varieties in Kadi-Gujarat, Andhra Pradesh, and Tamil Nadu. Available with bio-available phytosome & BCM-95® technology. GMP certified, organic & halal options."
      detailedDescription={[
        "Curcumin extract represents a $2.8 billion global market (2024) with 12% CAGR through 2029, driven by demand for anti-inflammatory and joint-care supplements. We source raw turmeric from APEDA-registered cultivators growing high-curcumin varieties like 'Kasturi' and 'Alleppey' (≥6% curcuminoids in dry rhizome). Harvest occurs October-December with sun-drying under shade (≤45°C) to prevent degradation. Raw material is stored in climate-controlled warehouses (<25°C, ≤60% RH) with moisture ≤12%.",
        "Our GMP-certified contract extractors employ ethanol (50-70%) maceration or supercritical CO₂ extraction for solvent-free processing. Vacuum evaporation and spray-drying produce 95% curcuminoids powder (sum of curcumin + demethoxycurcumin + bis-demethoxycurcumin) verified by HPLC. For premium markets, we offer phytosome (curcumin-phosphatidylcholine) with 2-3× absorption or BCM-95® (curcumin + essential oil) with 7-8× bioavailability. Each batch undergoes testing: curcuminoid content, residual ethanol (<0.5%), heavy metals, pesticides. Complete documentation includes CoA, Certificate of Origin, Phytosanitary Certificate, and optional organic/halal certificates.",
        "Target markets: USA (38%), EU (27%), Canada, UAE, Japan, Australia. Available formats: 95% curcumin powder (bulk/sachets), standardized capsules (500mg gelatin or vegan HPMC), liquid tincture (alcohol/glycerin), and phytosome capsules (300mg). FOB pricing: $120-200/kg for standard extract, premium for phytosome/BCM-95®. Ideal for dietary supplement brands, functional food manufacturers, and nutraceutical companies seeking clinically-proven anti-inflammatory ingredients."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Curcuma longa" },
        { label: "Part Used", value: "Rhizome (harvested Oct-Dec)" },
        { label: "Extraction Method", value: "Ethanol / Supercritical CO₂" },
        { label: "Curcuminoid Content", value: "≥95% (HPLC)" },
        { label: "Curcumin", value: "70-80%" },
        { label: "Demethoxycurcumin", value: "15-20%" },
        { label: "Bis-demethoxycurcumin", value: "2-5%" },
        { label: "Residual Ethanol", value: "<0.5%" },
        { label: "Heavy Metals", value: "<10 ppm" },
        { label: "Color", value: "Bright orange-yellow" },
        { label: "Shelf Life", value: "24-36 months (powder)" },
        { label: "FOB Pricing", value: "$120-200/kg" },
      ]}
      origin="Kadi-Gujarat, Andhra Pradesh, Tamil Nadu, India"
      form="Standardized Extract (95% curcuminoids)"
      quantityOptions={[
        "95% curcumin powder (bulk)",
        "Capsules 500mg (30-60 count)",
        "Phytosome capsules 300mg",
        "Liquid tincture",
        "Bulk 10-50 kg bags",
      ]}
      certifications={[
        "GMP (FSSAI + AYUSH-GMP)",
        "ISO 9001 / ISO 22000",
        "USDA Organic (NPOP)",
        "EU Organic",
        "Halal Certified",
        "Phytosome/BCM-95® Licensing",
      ]}
      hsCode="2106.90"
      exportInfo={{
        markets: [
          "USA (38%)",
          "EU (27%)",
          "Canada",
          "UAE",
          "Japan",
          "Australia",
        ],
        packaging: "HDPE/PET bottles (30-60ml) for liquid, PET jars (50-100g) for powder, PVC/Alu-Alu blister packs for capsules. Recyclable carton boxes with tamper-evident seals.",
        moq: "Contact for MOQ based on format and certification",
        leadTime: "3-4 weeks processing + 30-45 days sea freight, 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/curcumin-extract-spec-sheet.pdf",
        coa: "/downloads/curcumin-extract-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Ashwagandha Root Extract",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/ashwagandha",
        },
        {
          name: "Triphala Powder",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/triphala",
        },
        {
          name: "Neem Oil",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/neem-oil",
        },
        {
          name: "Kashmir Saffron",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/saffron",
        },
      ]}
    />
  );
}
