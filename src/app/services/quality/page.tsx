export default function QualityAssurance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Quality Assurance</h1>
          <p className="text-xl text-gray-300 mb-12">ISO, HACCP, organic, and buyer-specific standards</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Quality Standards</h2>
              <p className="text-gray-300 leading-relaxed">
                In-house labs, third-party certifications, and batch-wise testing reports ensure every 
                shipment meets international quality and safety standards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">ISO 9001 Certified</h3>
                <p className="text-gray-400">Quality management systems for consistent product excellence</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">HACCP Compliance</h3>
                <p className="text-gray-400">Food safety hazard analysis and critical control points</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">In-House Testing</h3>
                <p className="text-gray-400">State-of-the-art laboratory for immediate quality checks</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Third-Party Verification</h3>
                <p className="text-gray-400">Independent certification bodies validate our standards</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Batch Testing</h3>
                <p className="text-gray-400">Every batch tested for pesticides, heavy metals, and microbial content</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">COA Provided</h3>
                <p className="text-gray-400">Certificate of Analysis with every shipment</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
