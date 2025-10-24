import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Organic Turmeric Powder - High Curcumin Content | The Export Express',
  description: 'Premium organic turmeric powder from India with 3-5% curcumin content. Lab-tested, certified organic, ideal for supplements and culinary use.',
  keywords: 'turmeric export, organic turmeric, curcumin powder, turmeric powder, haldi export',
};

export default function TurmericProductPage() {
  return (
    <ProductDetail
      title="Organic Turmeric Powder (High Curcumin)"
      category="Herbal & Ayurvedic"
      heroImage="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&h=800&fit=crop", alt: "Turmeric powder" },
        { url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=800&fit=crop", alt: "Turmeric roots" },
        { url: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&h=800&fit=crop", alt: "Turmeric packaging" },
      ]}
      shortDescription="Premium organic turmeric powder (Curcuma longa) sourced from certified organic farms in Tamil Nadu and Andhra Pradesh. Our turmeric contains 3-5% curcumin, the active compound responsible for its powerful anti-inflammatory and antioxidant properties."
      detailedDescription={[
        "Turmeric, known as 'Haldi' in India, has been a cornerstone of Ayurvedic medicine and Indian cuisine for over 4,000 years. Our organic turmeric is cultivated in the fertile soils of Tamil Nadu's Erode district and Andhra Pradesh's Nizamabad region, areas renowned for producing the world's finest turmeric with the highest curcumin content. The golden-yellow rhizomes are harvested after 7-9 months of growth, when curcumin levels peak, then carefully processed using traditional sun-drying methods combined with modern low-temperature processing to preserve bioactive compounds.",
        "Our turmeric powder undergoes rigorous quality control at every stage. After harvesting, the rhizomes are cleaned, boiled to enhance color and aroma, dried, and finely ground to achieve uniform particle size. Each batch is tested by accredited third-party laboratories for curcumin content (minimum 3%, typically 3-5%), moisture levels, heavy metals, pesticide residues, and microbial contamination. We maintain complete traceability from farm to final product, with organic certification from USDA, EU, and India Organic standards. Our processing facility is ISO 22000 certified and follows HACCP protocols.",
        "Ideal for nutraceutical manufacturers producing curcumin supplements, food companies adding natural color and flavor, cosmetic brands developing skincare products, and spice importers serving retail markets. Available in various mesh sizes (60, 80, 100 mesh) and packaging options from bulk 25kg bags to retail-ready pouches. We offer competitive wholesale pricing, flexible MOQs starting from 100kg, and complete export documentation including phytosanitary certificates, organic certificates, and certificates of analysis. Our reliable supply chain ensures consistent quality and timely delivery to destinations worldwide."
      ]}
      specifications={[
        { label: "Botanical Name", value: "Curcuma longa" },
        { label: "Part Used", value: "Rhizome (Root)" },
        { label: "Curcumin Content", value: "3-5%" },
        { label: "Mesh Size", value: "60 / 80 / 100 mesh" },
        { label: "Moisture Content", value: "Maximum 12%" },
        { label: "Color", value: "Bright golden yellow" },
        { label: "Taste", value: "Warm, bitter, earthy" },
        { label: "Shelf Life", value: "24 months" },
      ]}
      origin="Tamil Nadu & Andhra Pradesh, India"
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
        "HACCP",
        "Kosher",
        "Halal",
      ]}
      hsCode="0910.30"
      exportInfo={{
        markets: [
          "United States",
          "European Union",
          "United Kingdom",
          "Canada",
          "Australia",
          "Middle East",
        ],
        packaging: "25kg HDPE bags or custom packaging",
        moq: "100 kg",
        leadTime: "15-20 days",
      }}
      downloads={{
        specSheet: "/downloads/turmeric-spec-sheet.pdf",
        coa: "/downloads/turmeric-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Organic Ashwagandha Powder",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/ashwagandha",
        },
        {
          name: "Ginger Powder",
          image: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
          link: "/products/herbs-spices/ginger",
        },
        {
          name: "Moringa Leaf Powder",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
          link: "/products/herbal-ayurvedic/moringa",
        },
        {
          name: "Black Pepper",
          image: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
          link: "/products/herbs-spices/black-pepper",
        },
      ]}
    />
  );
}
