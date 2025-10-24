export default function Sourcing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Sourcing Services</h1>
          <p className="text-xl text-gray-300 mb-12">Direct farmer sourcing, minimum intermediaries</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Sourcing Network</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Access to over 200 verified farms across India. We eliminate intermediaries and connect you 
                directly with producers, ensuring the best prices and quality control from the source.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">200+</div>
                  <p className="text-gray-400">Partner Farms</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">5</div>
                  <p className="text-gray-400">States Covered</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
                  <p className="text-gray-400">Verified Suppliers</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Customized Crop Selection</h3>
                <p className="text-gray-400">Tailored sourcing based on your specific requirements and quality standards</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Seasonal Planning</h3>
                <p className="text-gray-400">Year-round availability through strategic multi-region sourcing</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Quality Audits</h3>
                <p className="text-gray-400">Regular farm inspections and quality assessments</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Traceability</h3>
                <p className="text-gray-400">Complete supply chain transparency from farm to shipment</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
