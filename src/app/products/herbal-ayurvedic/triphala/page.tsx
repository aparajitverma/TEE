import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Triphala Powder - Traditional Ayurvedic Blend | The Export Express',
  description: 'Triphala (Amla + Haritaki + Bibhitaki) powder with 30%+ polyphenols. Digestive health, detox, immunity. GMP, Organic, Vegan certified. FOB $10-15/kg. Capsules, powder, tea sachets.',
  keywords: 'triphala export, ayurvedic digestive, amla haritaki bibhitaki, triphala powder, organic triphala, gut health supplement, ayurvedic rasayana',
};

export default function TriphalaProductPage() {
  return (
    <ProductDetail
      title="Triphala Powder (Amla + Haritaki + Bibhitaki)"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Triphala powder" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Triphala fruits" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=400&fit=crop", alt: "Triphala capsules" },
      ]}
      shortDescription="Traditional Ayurvedic Triphala blend (1:1:1 ratio) of Amla (Phyllanthus emblica), Haritaki (Terminalia chebula), and Bibhitaki (Terminalia bellirica). Standardized to 30%+ polyphenols. Digestive health, detox, immunity support. GMP certified, organic & vegan options."
      detailedDescription={[
        "Triphala represents a $1.2 billion global market (2024) for Ayurvedic digestive-health supplements with 9% CAGR through 2029. We source three fruits from APEDA-registered growers in Maharashtra, Karnataka, Gujarat, and Uttar Pradesh. Amla (Phyllanthus emblica), Haritaki (Terminalia chebula), and Bibhitaki (Terminalia bellirica) are harvested at optimal ripeness and shade-dried at ≤45°C to preserve vitamin C and polyphenols. Dried fruits are stored in jute bags with desiccant in cool warehouses (≤25°C).",
        "Our GMP-certified processing facilities employ mechanical cleaning, hot-air drying (45-55°C), and hammer milling to 80-100µm particle size. The standard 1:1:1 blend ratio can be adjusted for polyphenol-enriched formulations (e.g., 40% Amla). Each batch is tested for total polyphenols (≥30% by Folin-Ciocalteu), vitamin C (≥200mg/100g by HPLC), heavy metals (<10ppm), and pesticide residues. Complete documentation includes CoA, Certificate of Origin, Phytosanitary Certificate, and optional organic/vegan/halal certifications.",
        "Target markets: USA (35%), EU (25%), Canada (7%), UAE & Saudi (6%), Japan & South Korea (5%). Available formats: bulk powder (10-50kg bags), capsules (300-500mg gelatin or vegan HPMC), loose-leaf tea sachets (1g), and ready-to-drink (RTD) sachets. FOB pricing: $10-15/kg for standardized powder, $3-6 per 30-capsule bottle. Ideal for dietary supplement brands, functional food manufacturers, and wellness product developers seeking clean-label Ayurvedic digestive support."
      ]}
      specifications={[
        { label: "Botanical Names", value: "Phyllanthus emblica, Terminalia chebula, Terminalia bellirica" },
        { label: "Parts Used", value: "Dried fruits" },
        { label: "Blend Ratio", value: "1:1:1 (Amla:Haritaki:Bibhitaki)" },
        { label: "Total Polyphenols", value: "≥30% (spectrophotometric)" },
        { label: "Vitamin C", value: "≥200 mg/100g (HPLC)" },
        { label: "Particle Size", value: "80-100 µm" },
        { label: "Moisture Content", value: "<10%" },
        { label: "Heavy Metals", value: "<10 ppm" },
        { label: "Color", value: "Brown to dark brown" },
        { label: "Shelf Life", value: "24-36 months" },
        { label: "FOB Pricing", value: "$10-15/kg (powder)" },
      ]}
      origin="Maharashtra, Karnataka, Gujarat, Uttar Pradesh, India"
      form="Fine Powder (80-100µm)"
      quantityOptions={[
        "Bulk powder (10-50 kg bags)",
        "Capsules 300-500mg (30-60 count)",
        "Tea sachets (1g dosed)",
        "RTD sachets (powder + sweetener)",
        "Custom formulations",
      ]}
      certifications={[
        "GMP (FSSAI + AYUSH-GMP)",
        "ISO 9001 / ISO 22000",
        "USDA Organic (NPOP)",
        "EU Organic",
        "Vegan Certified",
        "Halal (optional)",
      ]}
      hsCode="1211.90"
      exportInfo={{
        markets: [
          "USA (35%)",
          "EU (25%)",
          "Canada (7%)",
          "UAE & Saudi (6%)",
          "Japan & South Korea (5%)",
          "Australia",
        ],
        packaging: "HDPE/PP bottles (250-500g) for powder, Aluminum/PP blister packs (30-60 caps), Eco-friendly kraft sachets for tea. Tamper-evident, recyclable packaging.",
        moq: "Varies by format - contact for details",
        leadTime: "2-3 weeks processing + 30-45 days sea freight, 5-7 days air freight",
      }}
      downloads={{
        specSheet: "/downloads/triphala-spec-sheet.pdf",
        coa: "/downloads/triphala-coa.pdf",
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
