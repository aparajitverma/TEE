import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Kashmir Saffron - Premium Category I Stigmas | The Export Express',
  description: 'Premium Kashmir Saffron (Crocus sativus) Category I with ≥30% crocin. Hand-picked stigmas. FOB $12-24/g ($12,000-24,000/kg). GI certified "Kashmir Saffron". Gourmet, nutraceutical, cosmetic.',
  keywords: 'kashmir saffron export, crocus sativus, saffron stigmas, premium saffron, GI certified saffron, organic saffron, fair trade saffron, category I saffron',
};

export default function SaffronProductPage() {
  return (
    <ProductDetail
      title="Kashmir Saffron (Crocus sativus)"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Kashmir saffron threads" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Saffron flowers" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Saffron packaging" },
      ]}
      shortDescription="World's most expensive spice - Premium Kashmir Saffron (Crocus sativus) Category I with ≥30% crocin content. Hand-picked stigmas from J&K Horticulture Department registered growers. GI certified 'Kashmir Saffron'. Gourmet cooking, nutraceuticals, cosmetics. Fair-trade & organic options."
      detailedDescription={[
        "Kashmir Saffron commands FOB prices of $12-24/g ($12,000-24,000/kg), representing the pinnacle of the $14 billion global spice market. India (Kashmir) supplies >80% of premium saffron with the coveted Geographical Indication (GI) tag. We source from APEDA-registered small-holder clusters (5-30 ha) in J&K practicing hand-picking and shade-curing. Stigmas are harvested early morning (6-9am) during peak bloom when crocin and safranal concentrations are highest. Target markets: USA (35%), EU (30%), UAE & Saudi (12%), Japan (8%), Australia (5%).",
        "Post-harvest processing includes manual debris removal, ISO 3632 grading (Category I = crocin ≥30%, Category II ≥20%), and shadow-drying at ≤30°C to achieve moisture ≤10%. Our GMP-certified packaging facilities use amber-glass ampoules (10g, 20g) with nitrogen flush and airtight screw-caps to prevent oxidation. Each batch undergoes testing: crocin % (≥30% for Category I), safranal % (≥0.5%), moisture, heavy metals (<10ppm), microbial load. Complete documentation: CoA, Certificate of Origin, Phytosanitary Certificate, GI certification, optional organic/fair-trade certificates.",
        "Available formats: Amber-glass ampoules (10g, 20g), boxed sets (5×10g) for retail, glass jars (50-100g) for bulk, and optional value-adds (saffron-infused oils, extracts, tea bags). Processing cycle: 2-3 days from raw stigmas to sealed ampoule. FOB pricing: $14/g Category II (non-organic), $22/g Category I (organic, fair-trade). Ideal for gourmet food importers, nutraceutical manufacturers (antioxidant, mood-enhancer), cosmetic brands (anti-aging), and traditional medicine practitioners."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Crocus sativus" },
        { label: "Part Used", value: "Stigmas (hand-picked 6-9am)" },
        { label: "ISO 3632 Grade", value: "Category I (≥30% crocin)" },
        { label: "Crocin Content", value: "≥30%" },
        { label: "Safranal Content", value: "≥0.5%" },
        { label: "Moisture Content", value: "≤10%" },
        { label: "Heavy Metals", value: "<10 ppm" },
        { label: "Color", value: "Deep red stigmas" },
        { label: "Aroma", value: "Characteristic saffron" },
        { label: "Shelf Life", value: "24-36 months (airtight, dark)" },
        { label: "FOB Pricing", value: "$12-24/g ($12,000-24,000/kg)" },
      ]}
      origin="Kashmir (J&K), India"
      form="Whole Stigmas (Category I)"
      quantityOptions={[
        "Amber-glass ampoules (10g, 20g)",
        "Boxed sets (5×10g)",
        "Glass jars (50-100g)",
        "Saffron-infused oils",
        "Custom packaging",
      ]}
      certifications={[
        "GMP (FSSAI + AYUSH-GMP)",
        "ISO 9001 / ISO 22000",
        "USDA Organic (NPOP)",
        "EU Organic",
        "Fair-Trade Certified",
        "GI Certification (Kashmir Saffron)",
        "ISO 3632 Grading",
      ]}
      hsCode="0910.20"
      exportInfo={{
        markets: [
          "USA (35%)",
          "EU - Germany, UK, Spain (30%)",
          "UAE & Saudi (12%)",
          "Japan (8%)",
          "Australia (5%)",
          "Others",
        ],
        packaging: "Amber-glass ampoules with nitrogen flush, UV-protective caps, FSC-certified recyclable cardboard boxes with tamper-evident seals and QR-code traceability.",
        moq: "Contact for MOQ - typically small quantities due to high value",
        leadTime: "2-3 days processing + 5-7 days air freight (express for high-value)",
      }}
      downloads={{
        specSheet: "/downloads/saffron-spec-sheet.pdf",
        coa: "/downloads/saffron-coa.pdf",
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
          name: "Neem Oil",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/neem-oil",
        },
      ]}
    />
  );
}
