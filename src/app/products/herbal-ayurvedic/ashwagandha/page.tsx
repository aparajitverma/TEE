import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Organic Ashwagandha Root Powder - Premium Ayurvedic Herb | The Export Express',
  description: 'Premium organic Ashwagandha (Withania somnifera) root powder from India. Lab-tested, certified organic, with high withanolide content for export.',
  keywords: 'ashwagandha export, organic ashwagandha, withania somnifera, ashwagandha powder, ayurvedic herbs export',
};

export default function AshwagandhaProductPage() {
  return (
    <ProductDetail
      title="Organic Ashwagandha Root Powder"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Ashwagandha powder close-up" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Ashwagandha roots" },
        { url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&h=800&fit=crop", alt: "Ashwagandha packaging" },
      ]}
      shortDescription="Premium organic Ashwagandha (Withania somnifera) root powder sourced from certified organic farms in India. Known as 'Indian Ginseng,' this adaptogenic herb is standardized to contain minimum 5% withanolides for maximum potency."
      detailedDescription={[
        "Ashwagandha, scientifically known as Withania somnifera, is one of the most revered herbs in Ayurvedic medicine with a history spanning over 3,000 years. Often called 'Indian Ginseng' or 'Winter Cherry,' this powerful adaptogenic herb has gained global recognition for its ability to help the body manage stress, enhance vitality, and support overall wellness. Our premium Ashwagandha root powder is sourced exclusively from certified organic farms in Rajasthan and Madhya Pradesh, regions known for producing the highest quality Ashwagandha with optimal withanolide content.",
        "Our processing facility employs advanced low-temperature drying and milling techniques that preserve the herb's bioactive compounds, particularly withanolides, which are responsible for Ashwagandha's therapeutic properties. Each batch undergoes rigorous third-party laboratory testing to verify withanolide content (minimum 5%), ensure absence of heavy metals, pesticide residues, and microbial contamination. We maintain complete traceability from farm to final product, with comprehensive documentation including organic certificates, test reports, and phytosanitary certificates.",
        "Ideal for nutraceutical manufacturers, supplement brands, herbal tea producers, and cosmetic companies, our Ashwagandha powder is available in various mesh sizes (60 mesh, 80 mesh, 100 mesh) to suit different applications. We offer flexible packaging options from bulk 25kg bags to retail-ready pouches, with private labeling services available. Our competitive pricing, consistent quality, and reliable supply chain make us the preferred partner for businesses seeking premium Ashwagandha for international markets."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Withania somnifera" },
        { label: "Part Used", value: "Root" },
        { label: "Withanolide Content", value: "Minimum 5%" },
        { label: "Mesh Size", value: "60 / 80 / 100 mesh" },
        { label: "Moisture Content", value: "Maximum 10%" },
        { label: "Color", value: "Light brown to beige" },
        { label: "Taste", value: "Bitter, earthy" },
        { label: "Shelf Life", value: "24 months" },
      ]}
      origin="Rajasthan & Madhya Pradesh, India"
      form="Fine Powder"
      quantityOptions={[
        "1 kg",
        "5 kg",
        "10 kg",
        "25 kg",
        "50 kg",
        "100 kg+",
      ]}
      certifications={[
        "USDA Organic",
        "EU Organic",
        "India Organic",
        "ISO 22000",
        "Kosher",
        "Halal",
      ]}
      hsCode="1211.90"
      exportInfo={{
        markets: [
          "United States",
          "European Union",
          "Canada",
          "Australia",
          "Japan",
          "South Korea",
        ],
        packaging: "25kg HDPE bags or custom packaging",
        moq: "100 kg",
        leadTime: "15-20 days",
      }}
      downloads={{
        specSheet: "/downloads/ashwagandha-spec-sheet.pdf",
        coa: "/downloads/ashwagandha-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Organic Turmeric Powder",
          image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/turmeric",
        },
        {
          name: "Brahmi Powder",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/brahmi",
        },
        {
          name: "Moringa Leaf Powder",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/moringa",
        },
        {
          name: "Triphala Powder",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/triphala",
        },
      ]}
    />
  );
}
