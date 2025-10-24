'use client';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-black to-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Quick Links Menu - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="/about/team" className="text-gray-400 hover:text-white transition-colors">Our Team</a>
              </li>
              <li>
                <a href="/about/partnerships" className="text-gray-400 hover:text-white transition-colors">Partnerships</a>
              </li>
              <li>
                <a href="/about/sustainability" className="text-gray-400 hover:text-white transition-colors">CSR & Sustainability</a>
              </li>
              <li>
                <a href="/certifications" className="text-gray-400 hover:text-white transition-colors">Certifications</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="text-gray-400 hover:text-green-400 transition-colors font-semibold">All Products</a>
              </li>
              <li>
                <a href="/products/herbal-ayurvedic" className="text-gray-400 hover:text-white transition-colors">Herbal & Ayurvedic</a>
              </li>
              <li>
                <a href="/products/aromatics" className="text-gray-400 hover:text-white transition-colors">Aromatic Effluences</a>
              </li>
              <li>
                <a href="/products/tea-coffee" className="text-gray-400 hover:text-white transition-colors">Tea & Coffee</a>
              </li>
              <li>
                <a href="/products/jute-products" className="text-gray-400 hover:text-white transition-colors">Jute Products</a>
              </li>
              <li>
                <a href="/products/luxury-fabrics" className="text-gray-400 hover:text-white transition-colors">Luxury Fabrics</a>
              </li>
              <li>
                <a href="/products/eco-essentials" className="text-gray-400 hover:text-white transition-colors">Eco-Friendly Essentials</a>
              </li>
              <li>
                <a href="/products/herbs-spices" className="text-gray-400 hover:text-white transition-colors">Herbs & Spices</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="/services" className="text-gray-400 hover:text-white transition-colors">All Services</a>
              </li>
              <li>
                <a href="/services/sourcing" className="text-gray-400 hover:text-white transition-colors">Sourcing</a>
              </li>
              <li>
                <a href="/services/quality" className="text-gray-400 hover:text-white transition-colors">Quality Assurance</a>
              </li>
              <li>
                <a href="/services/packaging" className="text-gray-400 hover:text-white transition-colors">Custom Packaging</a>
              </li>
              <li>
                <a href="/services/logistics" className="text-gray-400 hover:text-white transition-colors">Logistics</a>
              </li>
            </ul>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/resources/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="/resources/case-studies" className="text-gray-400 hover:text-white transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="/resources/faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-bold text-2xl mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest market insights and export news delivered to your inbox</p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
              />
              <button 
                type="submit"
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>

        {/* Compliance Ribbons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className="text-gray-400 text-sm">ISO 9001 Certified</span>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className="text-gray-400 text-sm">HACCP Compliant</span>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className="text-gray-400 text-sm">USDA Organic</span>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className="text-gray-400 text-sm">FSSAI Licensed</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} The Export Express. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            <a href="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
