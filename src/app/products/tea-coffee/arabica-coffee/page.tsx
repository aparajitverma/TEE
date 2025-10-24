import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Arabica Coffee Beans - Coorg Premium Grade | The Export Express',
  description: 'Premium Arabica coffee beans from Coorg, India. Washed process, medium roast, rich flavor profile. Direct from coffee estates.',
  keywords: 'arabica coffee export, coorg coffee, indian coffee beans, specialty coffee',
};

export default function ArabicaCoffeeProductPage() {
  return (
    <ProductDetail
      title="Arabica Coffee Beans (Coorg Premium)"
      category="Tea & Coffee"
      heroImage="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop", alt: "Arabica coffee beans" },
        { url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=800&fit=crop", alt: "Coffee plantation" },
        { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop", alt: "Brewed coffee" },
      ]}
      shortDescription="Premium Arabica coffee beans from the lush coffee estates of Coorg (Kodagu), Karnataka. Grown at high altitudes under shade trees, our Arabica beans offer a smooth, balanced cup with notes of chocolate, nuts, and subtle fruit undertones."
      detailedDescription={[
        "Coorg, nestled in the Western Ghats of Karnataka, is India's premier coffee-growing region, producing some of the finest Arabica coffee in Asia. Our coffee estates are located at elevations of 3,000-5,000 feet, where cool temperatures, abundant rainfall, and rich volcanic soil create ideal conditions for Arabica cultivation. The beans are grown under natural shade trees, following traditional agroforestry practices that protect biodiversity while producing exceptional coffee. This shade-grown method results in slower cherry maturation, allowing beans to develop complex flavors and higher acidity that coffee connoisseurs prize.",
        "We work exclusively with certified coffee estates that follow sustainable farming practices and fair-trade principles. Coffee cherries are hand-picked at peak ripeness (only red cherries selected), then processed using the washed method: pulping, fermentation, washing, and sun-drying on raised beds. This meticulous process produces clean, bright coffee with pronounced acidity and clarity of flavor. After drying to optimal moisture content (10-12%), beans are hulled, graded by size and density, and sorted to remove defects. Each lot is cupped by certified Q-graders to ensure it meets specialty coffee standards (80+ points on the SCA scale).",
        "Perfect for specialty coffee roasters, café chains, coffee importers, and retail brands seeking high-quality single-origin coffee. Our Arabica beans are ideal for medium to light roasts that highlight their natural sweetness and complex flavor notes. Available as green (unroasted) beans for roasters or custom-roasted to your specifications. Packaging options include 60kg jute bags, 5kg vacuum-sealed bags, or retail-ready pouches with one-way valves. We provide complete traceability documentation, including estate certificates, cupping scores, moisture analysis, and export quality certificates. Competitive pricing with direct estate sourcing ensures the best value for premium Indian Arabica coffee."
      ]}
      specifications={[
        { label: "Coffee Type", value: "Arabica (Coffea arabica)" },
        { label: "Variety", value: "S795, Chandragiri, Cauvery" },
        { label: "Processing", value: "Washed (Wet Process)" },
        { label: "Grade", value: "Plantation AA / A" },
        { label: "Screen Size", value: "17/18" },
        { label: "Moisture Content", value: "10-12%" },
        { label: "Defects", value: "< 5 per 300g" },
        { label: "Cup Score", value: "82-86 (SCA)" },
      ]}
      origin="Coorg (Kodagu), Karnataka, India"
      form="Green Beans / Roasted (Optional)"
      quantityOptions={[
        "1 kg",
        "5 kg",
        "10 kg",
        "30 kg",
        "60 kg",
        "Custom quantities",
      ]}
      certifications={[
        "Rainforest Alliance",
        "UTZ Certified",
        "Fair Trade",
        "Organic (Available)",
        "ISO 22000",
      ]}
      hsCode="0901.21"
      exportInfo={{
        markets: [
          "United States",
          "European Union",
          "Japan",
          "South Korea",
          "Australia",
          "Middle East",
        ],
        packaging: "60kg jute bags or vacuum-sealed bags",
        moq: "60 kg",
        leadTime: "20-25 days",
      }}
      downloads={{
        specSheet: "/downloads/arabica-coffee-spec-sheet.pdf",
        coa: "/downloads/arabica-coffee-coa.pdf",
      }}
      relatedProducts={[
        {
          name: "Darjeeling Black Tea",
          image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
          link: "/products/tea-coffee/darjeeling-tea",
        },
        {
          name: "Robusta Coffee Beans",
          image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
          link: "/products/tea-coffee/robusta-coffee",
        },
        {
          name: "Cardamom (Green)",
          image: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400&h=400&fit=crop",
          link: "/products/herbs-spices/cardamom",
        },
        {
          name: "Vanilla Beans",
          image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop",
          link: "/products/herbs-spices/vanilla",
        },
      ]}
    />
  );
}
