# Script to update all pages with proper content (excluding home page)

$pages = @(
    @{path="src\app\certifications\page.tsx"; title="Certifications"; subtitle="International Quality & Safety Standards"; content="ISO 9001, HACCP, FSSAI, USDA Organic, EU Organic, GMP, Fair Trade certifications"},
    @{path="src\app\products\herbal-ayurvedic\page.tsx"; title="Herbal & Ayurvedic Products"; subtitle="India's Ayurvedic Heritage"; content="Over 150 herbs including Ashwagandha, Turmeric, Brahmi, Giloy"},
    @{path="src\app\products\aromatics\page.tsx"; title="Aromatic Effluences"; subtitle="Essential Oils & Natural Fragrances"; content="Sandalwood, Jasmine, Rose, Vetiver, Lemongrass essential oils"},
    @{path="src\app\products\tea-coffee\page.tsx"; title="Tea & Coffee"; subtitle="Premium Indian Tea & Coffee"; content="Assam, Darjeeling, Nilgiri teas and Coorg Arabica coffee"},
    @{path="src\app\products\seasonal-crops\page.tsx"; title="Seasonal & Cash Crops"; subtitle="Fresh, Frozen & Processed"; content="Alphonso Mango, Papaya, Banana, Cashew nuts"},
    @{path="src\app\products\herbs-spices\page.tsx"; title="Herbs & Spices"; subtitle="India's Spice Heritage"; content="Black Pepper, Cardamom, Turmeric, Cumin, custom blends"},
    @{path="src\app\services\sourcing\page.tsx"; title="Sourcing Services"; subtitle="Direct Farmer Sourcing"; content="Access to 200+ farms, customized crop selection, seasonal planning"},
    @{path="src\app\services\quality\page.tsx"; title="Quality Assurance"; subtitle="ISO, HACCP & Organic Standards"; content="In-house labs, third-party certifications, batch-wise testing"},
    @{path="src\app\services\packaging\page.tsx"; title="Custom Packaging"; subtitle="Bulk to Retail-Ready"; content="Label design, private-label, eco-friendly packaging options"},
    @{path="src\app\services\logistics\page.tsx"; title="Logistics & Documentation"; subtitle="Door-to-Door Shipping"; content="Air & sea freight, customs clearance, Incoterms flexibility"},
    @{path="src\app\services\finance\page.tsx"; title="Trade Finance"; subtitle="Flexible Payment Terms"; content="Letters of credit, documentary collections, risk mitigation"},
    @{path="src\app\resources\blog\page.tsx"; title="Blog"; subtitle="Latest Export Insights"; content="Market trends, industry news, and export guides"},
    @{path="src\app\resources\case-studies\page.tsx"; title="Case Studies"; subtitle="Success Stories"; content="Real-world examples of our export partnerships"},
    @{path="src\app\resources\reports\page.tsx"; title="Market Reports"; subtitle="Industry Intelligence"; content="Quarterly reports on export trends and pricing"},
    @{path="src\app\resources\faqs\page.tsx"; title="FAQs"; subtitle="Frequently Asked Questions"; content="Common questions about our products and services"}
)

foreach ($page in $pages) {
    $template = @"
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">$($page.title)</h1>
          <p className="text-xl text-gray-300 mb-12">$($page.subtitle)</p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <p className="text-gray-300 leading-relaxed">
              $($page.content)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
"@
    
    Set-Content -Path $page.path -Value $template
    Write-Host "Updated: $($page.path)"
}

Write-Host "`nAll pages updated successfully!"
"@
