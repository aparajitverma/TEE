export default function SeasonalCrops() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Seasonal Products & Cash Crops</h1>
          <p className="text-xl text-gray-300 mb-12">Fresh, Frozen & Processed</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Year-Round Availability</h2>
              <p className="text-gray-300 leading-relaxed">
                Seasonal cash-crops such as mango, papaya, banana, and cashew provide high-volume export opportunities. 
                We source fresh, frozen, dried, or processed forms (pulp, puree, sliced) ensuring year-round availability 
                through coordinated harvesting across multiple states.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Fresh & Frozen Mango</h3>
                <p className="text-gray-400 mb-2">Alphonso, Kesar, Totapuri varieties</p>
                <p className="text-sm text-gray-500">Whole fruit, pulp, puree, sliced</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Papaya Products</h3>
                <p className="text-gray-400 mb-2">Pulp and dried slices</p>
                <p className="text-sm text-gray-500">IQF frozen options available</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Banana</h3>
                <p className="text-gray-400 mb-2">Raw and dried varieties</p>
                <p className="text-sm text-gray-500">Chips, powder, and puree</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Cashew Nuts</h3>
                <p className="text-gray-400 mb-2">Whole, blanched, roasted</p>
                <p className="text-sm text-gray-500">W180, W240, W320 grades</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Processing & Export</h3>
              <p className="text-gray-400">ISO-22000 & HACCP compliant processing • Flexible MOQs (500 kg minimum) • HS Codes: 0804, 0803, 0805, 0801 • Markets: EU, Gulf, USA, South-East Asia</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
