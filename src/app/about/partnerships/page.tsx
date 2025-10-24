export default function Partnerships() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Partnerships</h1>
          <p className="text-xl text-gray-300 mb-12">Building strong relationships with Indian farmers</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Farmer Network</h2>
              <p className="text-gray-300 leading-relaxed">
                We partner with over 150 small-holder farms across Kerala, Karnataka, Assam, Tamil Nadu, and Gujarat. 
                Each farmer is audited, trained, and empowered to meet international export standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Quality Training</h3>
                <p className="text-gray-400">Regular workshops on organic farming and quality standards</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Fair Pricing</h3>
                <p className="text-gray-400">Guaranteed fair-trade premiums for certified farmers</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Technical Support</h3>
                <p className="text-gray-400">Access to modern farming techniques and equipment</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Long-term Contracts</h3>
                <p className="text-gray-400">Multi-year agreements ensuring stable income</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
