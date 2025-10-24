import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Organic Darjeeling Black Tea - First Flush Premium | The Export Express',
  description: 'Premium organic Darjeeling first flush black tea from India. Muscatel flavor, certified organic, direct from tea estates.',
  keywords: 'darjeeling tea export, organic darjeeling, first flush tea, black tea export',
};

export default function DarjeelingTeaProductPage() {
  return (
    <ProductDetail
      title="Organic Darjeeling Black Tea (First Flush)"
      category="Tea & Coffee"
      heroImage="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop", alt: "Darjeeling tea leaves" },
        { url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop", alt: "Tea plantation" },
        { url: "https://images.unsplash.com/photo-1597318130293-c8eb8d0e2b8b?w=800&h=800&fit=crop", alt: "Brewed tea" },
      ]}
      shortDescription="Premium organic Darjeeling first flush black tea from renowned estates in the Himalayan foothills. Known as the 'Champagne of Teas,' our Darjeeling features the characteristic muscatel flavor, floral aroma, and light golden liquor that has made it world-famous."
      detailedDescription={[
        "Darjeeling tea, grown in the misty Himalayan foothills of West Bengal at elevations of 2,000-7,000 feet, is protected by a Geographical Indication (GI) tag, certifying its authentic origin. Our first flush Darjeeling is harvested in March-April, when the tea bushes produce their first tender leaves after winter dormancy. These young leaves yield a tea with delicate, floral notes, light astringency, and the prized muscatel character—a unique grape-like sweetness found only in genuine Darjeeling tea. The cool mountain climate, rich soil, and traditional cultivation methods contribute to the tea's exceptional quality and complex flavor profile.",
        "We source directly from certified organic tea estates that have been producing premium Darjeeling for generations. These estates follow strict organic farming practices, avoiding synthetic pesticides and fertilizers, and are certified by USDA Organic, EU Organic, and India Organic standards. The tea is hand-plucked using the 'two leaves and a bud' method, ensuring only the finest quality leaves are selected. After plucking, leaves undergo careful withering, rolling, oxidation, and drying processes that preserve their delicate flavors and aromatic compounds. Each batch is tested for pesticide residues, heavy metals, and quality parameters.",
        "Ideal for specialty tea retailers, organic tea brands, hotels and restaurants seeking premium teas, and tea importers serving discerning consumers. Darjeeling tea is perfect for afternoon tea service, gift sets, and premium tea collections. Available in various grades (FTGFOP1, SFTGFOP, etc.) and packaging options from bulk 5kg bags to retail-ready tins and pyramid tea bags. We provide complete documentation including organic certificates, GI certification, estate certificates, and quality test reports. Our competitive pricing, direct estate sourcing, and reliable export logistics make us the ideal partner for premium tea businesses worldwide."
      ]}
      specifications={[
        { label: "Tea Type", value: "Black Tea (First Flush)" },
        { label: "Origin Estate", value: "Certified Darjeeling Estates" },
        { label: "Harvest Season", value: "March-April (First Flush)" },
        { label: "Grade", value: "FTGFOP1 / SFTGFOP" },
        { label: "Leaf Appearance", value: "Light, wiry, greenish-brown" },
        { label: "Liquor Color", value: "Light golden" },
        { label: "Flavor Profile", value: "Floral, muscatel, delicate" },
        { label: "Caffeine", value: "Moderate (40-70mg per cup)" },
      ]}
      origin="Darjeeling, West Bengal, India"
      form="Loose Leaf Tea"
      quantityOptions={[
        "100 grams",
        "250 grams",
        "500 grams",
        "1 kg",
        "5 kg",
        "10 kg+",
      ]}
      certifications={[
        "USDA Organic",
        "EU Organic",
        "India Organic",
        "Darjeeling GI Tag",
        "Fair Trade",
        "Rainforest Alliance",
      ]}
      hsCode="0902.10"
      exportInfo={{
        markets: [
          "United Kingdom",
          "United States",
          "Germany",
          "Japan",
          "France",
          "Australia",
        ],
        packaging: "Food-grade aluminum pouches or custom packaging",
        moq: "5 kg",
        leadTime: "15-20 days",
      }}
      downloads={{
        specSheet: "/downloads/darjeeling-tea-spec-sheet.pdf",
        coa: "/downloads/darjeeling-tea-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Assam Black Tea",
          image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
          link: "/products/tea-coffee/assam-tea",
        },
        {
          name: "Nilgiri Green Tea",
          image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
          link: "/products/tea-coffee/nilgiri-tea",
        },
        {
          name: "Arabica Coffee Beans",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
          link: "/products/tea-coffee/arabica-coffee",
        },
        {
          name: "Masala Chai Blend",
          image: "https://images.unsplash.com/photo-1597318130293-c8eb8d0e2b8b?w=400&h=400&fit=crop",
          link: "/products/tea-coffee/masala-chai",
        },
      ]}
    />
  );
}
