import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

export const metadata: Metadata = {
  title: 'Eco-Friendly Jute Tote Bags - Customizable Bulk Orders | The Export Express',
  description: 'Premium jute tote bags from India. Biodegradable, customizable with logos, perfect for retail and promotional use. Bulk orders available.',
  keywords: 'jute bags export, eco-friendly tote bags, jute shopping bags, promotional jute bags',
};

export default function JuteToteBagsProductPage() {
  return (
    <ProductDetail
      title="Eco-Friendly Jute Tote Bags (Customizable)"
      category="Jute & Natural Fiber Products"
      heroImage="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop"
      images={[
        { url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop", alt: "Jute tote bags" },
        { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop", alt: "Jute bag with logo" },
        { url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop", alt: "Shopping with jute bag" },
      ]}
      shortDescription="Premium eco-friendly jute tote bags, perfect sustainable alternative to plastic bags. Made from 100% natural jute fiber, fully biodegradable, and customizable with your brand logo. Ideal for retail stores, promotional events, corporate gifting, and eco-conscious consumers."
      detailedDescription={[
        "Our jute tote bags are crafted from premium quality jute fiber sourced from West Bengal's jute belt, where the finest golden fiber is cultivated. These bags combine environmental responsibility with practical functionality, offering a durable, reusable alternative to single-use plastic bags. The natural jute fabric provides excellent strength and load-bearing capacity while maintaining a rustic, organic aesthetic that appeals to eco-conscious consumers. Each bag features reinforced stitching, comfortable handles, and a spacious interior suitable for shopping, beach trips, daily errands, or promotional giveaways.",
        "We offer extensive customization options to help you create branded bags that represent your business values. Choose from various sizes (small gift bags to large shopping totes), handle styles (cotton webbing, jute rope, padded handles), and finishing options (laminated for water resistance, lined with cotton, zippered closures, internal pockets). Your logo or design can be applied through screen printing, heat transfer, embroidery, or digital printing in single or multiple colors. Our design team provides mock-ups and samples before bulk production to ensure perfect results.",
        "Ideal for retail stores replacing plastic bags, corporate events and trade shows, wedding favors and gift packaging, promotional campaigns for eco-brands, farmers markets and organic stores, and hospitality industry welcome bags. Minimum order quantities start from 500 pieces with competitive bulk pricing. Production lead time is 20-30 days depending on customization complexity. We handle complete export logistics including quality inspection, packaging, and documentation. All bags are made in facilities following fair-trade practices, supporting local artisan communities while delivering premium quality products to global markets."
      ]}
      specifications={[
        { label: "Material", value: "100% Natural Jute Fiber" },
        { label: "Weight", value: "10-12 oz per sq yard" },
        { label: "Standard Size", value: "14\" x 16\" x 6\" (customizable)" },
        { label: "Handle Type", value: "Cotton webbing / Jute rope" },
        { label: "Load Capacity", value: "Up to 10 kg" },
        { label: "Color Options", value: "Natural, dyed (custom colors)" },
        { label: "Printing", value: "Screen print, embroidery, heat transfer" },
        { label: "Biodegradable", value: "100% (decomposes in 1-2 years)" },
      ]}
      origin="West Bengal, India"
      form="Finished Tote Bags"
      quantityOptions={[
        "500 pieces",
        "1,000 pieces",
        "2,500 pieces",
        "5,000 pieces",
        "10,000+ pieces",
        "Custom quantities",
      ]}
      certifications={[
        "Eco-Friendly Certified",
        "Fair Trade",
        "ISO 9001",
        "SEDEX Audited",
      ]}
      hsCode="4202.22"
      exportInfo={{
        markets: [
          "United States",
          "European Union",
          "United Kingdom",
          "Australia",
          "Canada",
          "Middle East",
        ],
        packaging: "Carton boxes (50-100 pcs per carton)",
        moq: "500 pieces",
        leadTime: "20-30 days (with customization)",
      }}
      downloads={{
        specSheet: "/downloads/jute-tote-bags-spec-sheet.pdf",
        coa: "/downloads/jute-bags-catalog.pdf",
      }}
      relatedProducts={[
        {
          name: "Jute Wine Bottle Bags",
          image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
          link: "/products/jute-products/wine-bags",
        },
        {
          name: "Jute Drawstring Pouches",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          link: "/products/jute-products/drawstring-pouches",
        },
        {
          name: "Cotton Canvas Bags",
          image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
          link: "/products/eco-essentials/cotton-bags",
        },
        {
          name: "Bamboo Utensils Set",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
          link: "/products/eco-essentials/bamboo-utensils",
        },
      ]}
    />
  );
}
