export default function OurStory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-2xl text-gray-300 mb-12">From Indian Soil to Global Shelves</p>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">The Beginning</h2>
              <p>
                Founded in 2015, we recognised the price-gap between Indian producers and global buyers. 
                Our mission is to bridge that gap, delivering superior value to both sides.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Growth</h2>
              <p>
                Today, we serve more than 120 international clients across North America, Europe, 
                the Middle East, and Asia. By aggregating hundreds of small-scale Indian producers, 
                we give you the scale, consistency and price advantage of a large exporter while 
                preserving the artisanal quality of each product.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p>
                We are not a manufacturer – we are your global sourcing partner. Partner with us 
                and become part of a supply chain that respects the land, the farmer, and your bottom line.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
