import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Neem Oil - Cold-Pressed 30-40% Azadirachtin | The Export Express',
  description: 'Cold-pressed neem oil (Azadirachta indica) with 30-40% azadirachtin. Cosmetic grade, biopesticide grade, refined options. FOB $12-55/kg. GMP, Organic, COSMOS certified. Natural insecticide, skincare.',
  keywords: 'neem oil export, azadirachtin, cold-pressed neem, organic neem oil, biopesticide, cosmetic neem oil, natural insecticide, COSMOS certified',
};

export default function NeemOilProductPage() {
  return (
    <ProductDetail
      title="Neem Oil (Azadirachta indica)"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Neem oil bottle" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Neem seeds" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Neem oil application" },
      ]}
      shortDescription="Cold-pressed neem oil (Azadirachta indica) with 30-40% azadirachtin content. Available in cosmetic grade, biopesticide grade, and refined/deodorized options. Natural insecticide for organic farming, anti-inflammatory skincare ingredient. GMP, Organic, COSMOS certified."
      detailedDescription={[
        "Neem oil represents a $1.3 billion global market (2024) with 9% CAGR through 2029, spanning cosmetics, biopesticides, and nutraceuticals. We source neem seeds from APEDA-registered producers in Kadi-Gujarat, Andhra Pradesh, and Maharashtra. Seeds are harvested October-February from perennial neem trees, dried to <15% moisture, and stored in cool warehouses (≤25°C, <60% RH). Target markets: USA (30%), EU (25%), UAE & Saudi (12%), Japan (8%), Australia (6%).",
        "Our GMP-certified cold-press facilities use mechanical screw presses (120-150°C max) or hydraulic presses (lower temperature) to retain bio-actives without solvents. Vacuum filtration and centrifugation remove seed debris. For cosmetic grade, we perform degumming (water wash + centrifugation) and optional steam deodorization for food-grade applications. For biopesticide grade, solvent extraction (ethanol) concentrates azadirachtin to 2-5% powder via spray-drying. Each batch is tested for azadirachtin content, FFA %, peroxide value, heavy metals, and pesticide residues.",
        "Available formats: Cold-pressed crude oil (30-40% azadirachtin) in PET/HDPE bottles (250ml-5L), standardized azadirachtin extract (2-5%) powder for biopesticide, refined/deodorized oil for nutraceutical capsules (30-500ml), and bulk drums (20L) or bags (25kg) for B2B. FOB pricing: $12-18/kg crude, $30-55/kg standardized extract, $25-35/kg refined. Complete documentation: CoA, SDS, Certificate of Origin, Phytosanitary Certificate, optional organic/COSMOS/halal/vegan certificates."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Azadirachta indica" },
        { label: "Part Used", value: "Seeds (harvested Oct-Feb)" },
        { label: "Extraction Method", value: "Cold-press (mechanical)" },
        { label: "Azadirachtin Content", value: "30-40% (crude oil)" },
        { label: "Standardized Extract", value: "2-5% (powder)" },
        { label: "FFA %", value: "Varies by grade" },
        { label: "Peroxide Value", value: "Tested per batch" },
        { label: "Heavy Metals", value: "<10 ppm" },
        { label: "Color", value: "Yellow-brown to dark brown" },
        { label: "Shelf Life", value: "24 months (stored cool, dark)" },
        { label: "FOB Pricing", value: "$12-55/kg (varies by grade)" },
      ]}
      origin="Kadi-Gujarat, Andhra Pradesh, Maharashtra, India"
      form="Cold-Pressed Oil / Standardized Extract"
      quantityOptions={[
        "Cold-pressed oil (250ml-5L bottles)",
        "Standardized extract powder (2-5%)",
        "Refined/deodorized oil (30-500ml)",
        "Bulk drums (20L) / bags (25kg)",
        "Custom formulations",
      ]}
      certifications={[
        "GMP (FSSAI + AYUSH-GMP)",
        "ISO 9001 / ISO 22000",
        "USDA Organic (NPOP)",
        "EU Organic",
        "COSMOS-Organic",
        "Halal (optional)",
        "Vegan Certified",
      ]}
      hsCode="1515.90"
      exportInfo={{
        markets: [
          "USA (30%)",
          "EU (25%)",
          "UAE & Saudi (12%)",
          "Japan (8%)",
          "Australia (6%)",
          "Others",
        ],
        packaging: "PET bottles (UV-protected) for cosmetics, HDPE drums (20L) for bulk, Food-grade aluminum cans for nutraceuticals. Tamper-evident caps, recyclable packaging.",
        moq: "Contact for MOQ based on grade and certification",
        leadTime: "2-3 weeks processing + 30-45 days sea freight, 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/neem-oil-spec-sheet.pdf",
        coa: "/downloads/neem-oil-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Ashwagandha Root Extract",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/ashwagandha",
        },
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
          name: "Kashmir Saffron",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/saffron",
        },
      ]}
    />
  );
}
