import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Sandalwood Essential Oil - Kashmir Sandalwood (Santalum album) | The Export Express',
  description: 'Premium Kashmir sandalwood essential oil with 70-90% α-santalol. CITES compliant, GI certified, organic & fair-trade. FOB $1,200-$2,500/kg. Steam-distilled from 15+ year heartwood.',
  keywords: 'sandalwood oil export, kashmir sandalwood, santalum album, alpha-santalol, CITES sandalwood, organic sandalwood oil, fair trade sandalwood',
};

export default function SandalwoodOilProductPage() {
  return (
    <ProductDetail
      title="Sandalwood Essential Oil (Santalum album)"
      category="Aromatic Effluences"
      heroImage="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop", alt: "Sandalwood oil bottle" },
        { url: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&h=800&fit=crop", alt: "Sandalwood heartwood" },
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Essential oil collection" },
      ]}
      shortDescription="Premium Kashmir sandalwood essential oil (Santalum album) with 70-90% α-santalol. Steam-distilled from 15+ year old heartwood. CITES compliant, GI certified. The world's most valuable 'red gold' fragrance ingredient for ultra-luxury perfumery, high-end cosmetics, and aromatherapy."
      detailedDescription={[
        "Kashmir sandalwood oil represents the pinnacle of aromatic excellence, commanding FOB prices of $1,200-$2,500/kg. Our oil is steam-distilled from heartwood of trees aged 15+ years, sourced exclusively from CITES-licensed growers in Kashmir, Himachal Pradesh, and Uttarakhand. The oil contains 70-90% α-santalol, the key compound responsible for its characteristic deep, woody, sweet aroma. India supplies approximately 80% of the world's premium sandalwood oil and holds the Geographical Indication (GI) tag for 'Kashmir Sandalwood'.",
        "Our processing partners are GMP-certified distillation facilities using modern stainless-steel column stills with fractionating trays for optimal α-santalol recovery. Low-temperature vacuum distillation concentrates the oil to Category I grade (≥70% α-santalol) for top-tier perfumers. Each batch undergoes rigorous QC: GC-MS analysis, heavy metal testing (<10ppm), microbial load verification, and stability testing. We provide complete batch documentation including CoA, SDS, CITES export permit, Phytosanitary Certificate, and Certificate of Origin.",
        "Target markets include luxury perfumery houses (Chanel, Dior), high-end cosmetics brands (L'Occitane, The Body Shop), aromatherapy retailers (doTERRA, Young Living), and Middle-East halal-certified distributors. Sandalwood oil serves as a fixative in perfumery, offers skin-soothing properties in cosmetics, and provides calming aromatherapy benefits. Available in 10ml-100ml amber glass ampoules with nitrogen flush, or 20L bulk drums for B2B. MOQ: 5kg for first orders. Premium certifications (Organic, Fair-Trade, COSMOS-Organic) add 20-50% to base pricing."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Santalum album" },
        { label: "Extraction Method", value: "Steam Distillation (Fractionation)" },
        { label: "Part Used", value: "Heartwood (15+ years)" },
        { label: "α-Santalol Content", value: "70-90% (Category I)" },
        { label: "Color", value: "Pale yellow to golden amber" },
        { label: "Specific Gravity", value: "0.97-0.98 at 20°C" },
        { label: "Aroma Profile", value: "Deep woody, sweet, balsamic" },
        { label: "Heavy Metals", value: "<10 ppm" },
        { label: "Microbial Load", value: "<10³ CFU/g" },
        { label: "Shelf Life", value: "3-5 years (stored <25°C, dark)" },
        { label: "FOB Pricing", value: "$1,200-$2,500/kg" },
      ]}
      origin="Kashmir, Himachal Pradesh, Uttarakhand, India"
      form="Pure Essential Oil (70-90% α-santalol)"
      quantityOptions={[
        "10 ml amber ampoule",
        "30 ml amber ampoule",
        "100 ml amber ampoule",
        "20 L bulk drum (B2B)",
        "Custom quantities",
      ]}
      certifications={[
        "GMP Certified",
        "ISO 9001",
        "USDA Organic (select grades)",
        "Fair-Trade Certified",
        "COSMOS-Organic",
        "CITES Export Permit",
        "GI Certification (Kashmir Sandalwood)",
        "IFRA Compliant",
      ]}
      hsCode="3301.90"
      exportInfo={{
        markets: [
          "USA (35%)",
          "EU - Germany, France, UK (30%)",
          "UAE & Saudi Arabia (12%)",
          "Japan (8%)",
          "South Korea (5%)",
          "Australia",
        ],
        packaging: "Amber glass ampoules with nitrogen flush, UV-protective caps, FSC-certified cardboard boxes with QR-code traceability",
        moq: "5 kg (first order), negotiable for repeat orders",
        leadTime: "2-4 days processing + 5-7 days air freight (USA), 35-50 days sea freight (EU)",
      }}
      downloads={{
        specSheet: "/downloads/sandalwood-oil-spec-sheet.pdf",
        coa: "/downloads/sandalwood-oil-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Jasmine Absolute",
          image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
          link: "/products/aromatics/jasmine-absolute",
        },
        {
          name: "Rose Absolute",
          image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=400&h=400&fit=crop",
          link: "/products/aromatics/rose-absolute",
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
