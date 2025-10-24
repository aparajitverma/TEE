export default function TradeFinance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Trade Finance</h1>
          <p className="text-xl text-gray-300 mb-12">Flexible payment terms and risk mitigation</p>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Payment Solutions</h2>
              <p className="text-gray-300 leading-relaxed">
                Letters of credit, documentary collections, pre-payment discounts. Support for new buyers 
                and comprehensive risk mitigation strategies to ensure secure transactions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Letter of Credit (L/C)</h3>
                <p className="text-gray-400 mb-3">Secure payment guaranteed by banks</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Sight L/C</li>
                  <li>• Usance L/C</li>
                  <li>• Confirmed L/C</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Telegraphic Transfer (T/T)</h3>
                <p className="text-gray-400 mb-3">Direct bank transfers with flexible terms</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 30% advance, 70% before shipment</li>
                  <li>• 100% advance (with discount)</li>
                  <li>• Payment against documents</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Documentary Collection</h3>
                <p className="text-gray-400 mb-3">Documents through banking channels</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• D/P (Documents against Payment)</li>
                  <li>• D/A (Documents against Acceptance)</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Credit Terms</h3>
                <p className="text-gray-400 mb-3">For established buyers</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Net 30/60/90 days</li>
                  <li>• Credit limit based on history</li>
                  <li>• Early payment discounts</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Risk Mitigation</h3>
              <p className="text-gray-400">Export credit insurance and bank guarantees available for large orders</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
