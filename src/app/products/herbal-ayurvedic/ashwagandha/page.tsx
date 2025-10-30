import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Ashwagandha Root Extract - 5-10% Withanolides | The Export Express',
  description: 'Premium Ashwagandha (Withania somnifera) standardized extract 5-10% withanolides. GMP certified, USDA Organic. FOB $45-80/kg. Capsules, powder, tincture. Stress-relief, immunity booster.',
  keywords: 'ashwagandha export, withanolides extract, withania somnifera, standardized ashwagandha, organic ashwagandha, adaptogen export, ayurvedic herbs, GMP certified',
};

export default function AshwagandhaProductPage() {
  return (
    <ProductDetail
      title="Ashwagandha Root Extract (Withania somnifera)"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Ashwagandha extract powder" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Ashwagandha roots" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Ashwagandha capsules" },
      ]}
      shortDescription="Premium Ashwagandha (Withania somnifera) standardized root extract with 5-10% withanolides. Sourced from certified organic farms in Kadi-Gujarat, Madhya Pradesh, and Rajasthan. Powerful adaptogen for stress-relief, immunity boost, and sleep support. GMP certified, AYUSH-GMP compliant."
      detailedDescription={[
        "Ashwagandha (Withania somnifera) is a cornerstone of Ayurvedic medicine, commanding FOB prices of $45-80/kg for standardized extracts. The global adaptogen market exceeds $4 billion (2024) with 12% CAGR through 2029, driven by demand for stress-relief and immunity-boosting supplements. We source raw roots from APEDA-registered growers in Kadi-Gujarat, Madhya Pradesh, and Rajasthan, harvested October-February when withanolide content peaks. Roots are shade-dried below 40°C to preserve actives, then stored in climate-controlled warehouses (<25°C, ≤60% RH).",
        "Our GMP-certified contract manufacturers employ water-alcohol (50-70% ethanol) extraction or supercritical CO₂ for solvent-free processing. Spray-drying produces standardized extracts with 5-10% withanolides verified by HPLC. Each batch undergoes comprehensive testing: withanolide content, heavy metals (<10ppm), pesticide residues (below FSSAI/EU MRL), and microbial load. We provide complete documentation: Certificate of Analysis (CoA), Certificate of Origin, Phytosanitary Certificate, and optional organic/halal certifications. Processing takes 2-3 weeks from raw root to finished product.",
        "Target markets include USA (35%), EU (25%), Canada (8%), Middle East (7%), and Japan/South Korea (5%). Available formats: standardized powder (10% w/w), capsules (500mg gelatin or vegan HPMC), and liquid tinctures (alcohol or glycerin-based). We offer private-label contract packaging with 30-60 capsule bottles. MOQ varies by format. Premium certifications (Organic, Halal) add 20-40% to pricing. Ideal for dietary supplement brands, functional food manufacturers, and wellness product developers seeking clean-label, clinically-backed adaptogens."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Withania somnifera" },
        { label: "Part Used", value: "Root (harvested Oct-Feb)" },
        { label: "Extraction Method", value: "Water-alcohol / Supercritical CO₂" },
        { label: "Withanolide Content", value: "5-10% (HPLC verified)" },
        { label: "Drying Method", value: "Spray-dry / Freeze-dry" },
        { label: "Moisture Content", value: "≤10%" },
        { label: "Heavy Metals", value: "<10 ppm" },
        { label: "Pesticide Residues", value: "Below FSSAI/EU MRL" },
        { label: "Color", value: "Light brown to beige" },
        { label: "Shelf Life", value: "24-36 months (dry extract)" },
        { label: "FOB Pricing", value: "$45-80/kg (extract)" },
      ]}
      origin="Kadi-Gujarat, Madhya Pradesh, Rajasthan, India"
      form="Standardized Extract (5-10% withanolides)"
      quantityOptions={[
        "Standardized powder (10% w/w)",
        "Capsules 500mg (30-60 count)",
        "Liquid tincture (alcohol/glycerin)",
        "Bulk 10-50 kg bags",
        "Custom formulations",
      ]}
      certifications={[
        "GMP (FSSAI + AYUSH-GMP)",
        "ISO 9001 / ISO 22000",
        "USDA Organic (NPOP)",
        "EU Organic",
        "ISO 22000",
        "Kosher",
        "Halal",
      ]}
      hsCode="1211.90"
      exportInfo={{
        markets: [
          "USA (35%)",
          "EU (25%)",
          "Canada (8%)",
          "UAE & Saudi Arabia (7%)",
          "Japan & South Korea (5%)",
          "Australia",
        ],
        packaging: "HDPE/PP bottles (15-30ml) for tinctures, PET jars (50-100g) for powder, PVC/Alu-Alu blister packs for capsules (30-60pcs). Recyclable carton boxes with tamper-evident seals.",
        moq: "Varies by format - contact for details",
        leadTime: "2-3 weeks processing + 30-45 days sea freight (USA), 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/ashwagandha-spec-sheet.pdf",
        coa: "/downloads/ashwagandha-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Curcumin Extract (95%)",
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/curcumin-extract",
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
