export default function CustomPackaging() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Custom Packaging</h1>
          <p className="text-xl text-gray-300 mb-12">From bulk sacks to retail-ready cartons</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Flexible Packaging Solutions</h2>
              <p className="text-gray-300 leading-relaxed">
                Label design, private-label, and eco-friendly packaging options tailored to your brand 
                and market requirements. We handle everything from bulk industrial packaging to 
                consumer-ready retail formats.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Bulk Packaging</h3>
                <p className="text-gray-400 mb-3">Industrial-grade containers for wholesale buyers</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 25kg - 50kg sacks</li>
                  <li>• Jute or PP bags</li>
                  <li>• Palletized options</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Retail Packaging</h3>
                <p className="text-gray-400 mb-3">Consumer-ready formats with custom branding</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Glass jars & bottles</li>
                  <li>• Stand-up pouches</li>
                  <li>• Cardboard boxes</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Private Label</h3>
                <p className="text-gray-400 mb-3">Complete branding and design services</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Custom label design</li>
                  <li>• Multilingual labels</li>
                  <li>• Barcode integration</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Eco-Friendly Options</h3>
              <p className="text-gray-400">Biodegradable, recyclable, and sustainable packaging materials available</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
