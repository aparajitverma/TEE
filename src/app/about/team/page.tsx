export default function OurTeam() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 text-center">Our Team</h1>
          <p className="text-xl text-gray-300 mb-12 text-center">Meet the experts behind The Export Express</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
              <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">Export Manager</h3>
              <p className="text-gray-400 text-sm">Leading our global export operations</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
              <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Lead</h3>
              <p className="text-gray-400 text-sm">Ensuring ISO & HACCP compliance</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 text-center">
              <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">Logistics Coordinator</h3>
              <p className="text-gray-400 text-sm">Managing worldwide shipping</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
