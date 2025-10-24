export default function Logistics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Logistics & Documentation</h1>
          <p className="text-xl text-gray-300 mb-12">Door-to-door shipping, customs clearance, phytosanitary certificates</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Complete Export Logistics</h2>
              <p className="text-gray-300 leading-relaxed">
                Air & sea freight coordination, Incoterms (FOB, CIF, DAP) flexibility. We handle all 
                documentation and customs procedures to ensure smooth delivery to your destination.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Freight Options</h3>
                <p className="text-gray-400 mb-3">Flexible shipping methods based on urgency and budget</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Sea Freight (FCL/LCL)</li>
                  <li>• Air Freight (Express/Standard)</li>
                  <li>• Multi-modal transport</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Incoterms Support</h3>
                <p className="text-gray-400 mb-3">All major trade terms supported</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• FOB (Free on Board)</li>
                  <li>• CIF (Cost, Insurance & Freight)</li>
                  <li>• DAP (Delivered at Place)</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Documentation</h3>
                <p className="text-gray-400 mb-3">Complete export paperwork handled</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Commercial Invoice</li>
                  <li>• Packing List</li>
                  <li>• Certificate of Origin</li>
                  <li>• Phytosanitary Certificate</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Customs Clearance</h3>
                <p className="text-gray-400 mb-3">Expert handling of customs procedures</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Export clearance</li>
                  <li>• Import support</li>
                  <li>• Duty optimization</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Tracking</h3>
              <p className="text-gray-400">Track your shipment from warehouse to destination port</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
