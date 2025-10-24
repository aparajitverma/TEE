export default function Sustainability() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">CSR & Sustainability</h1>
          <p className="text-xl text-gray-300 mb-12">Committed to environmental and social responsibility</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Initiatives</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We invest in organic conversion, water-conservation projects, and fair-trade initiatives 
                to ensure sustainable growth for our farming partners and the environment.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">150+</div>
                  <p className="text-gray-400">Partner Farms</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">40%</div>
                  <p className="text-gray-400">Organic Certified</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">5</div>
                  <p className="text-gray-400">States Covered</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Organic Conversion</h3>
                <p className="text-gray-400">Supporting farmers transition to certified organic practices</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Water Conservation</h3>
                <p className="text-gray-400">Implementing drip irrigation and rainwater harvesting</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Fair Trade</h3>
                <p className="text-gray-400">Ensuring fair wages and working conditions</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Community Development</h3>
                <p className="text-gray-400">Education and healthcare programs for farming communities</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
