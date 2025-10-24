'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { name: 'Our Story', href: '/about/story' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'Partnerships', href: '/about/partnerships' },
      { name: 'Sustainability', href: '/about/sustainability' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Sourcing', href: '/services/sourcing' },
      { name: 'Quality Assurance', href: '/services/quality' },
      { name: 'Custom Packaging', href: '/services/packaging' },
      { name: 'Logistics', href: '/services/logistics' },
      { name: 'Trade Finance', href: '/services/finance' },
    ]
  },
  { 
    name: 'Products', 
    href: '/products',
    dropdown: [
      { name: 'Herbal & Ayurvedic', href: '/products/herbal-ayurvedic' },
      { name: 'Aromatic Effluences', href: '/products/aromatics' },
      { name: 'Tea & Coffee', href: '/products/tea-coffee' },
      { name: 'Jute Products', href: '/products/jute-products' },
      { name: 'Luxury Fabrics', href: '/products/luxury-fabrics' },
      { name: 'Eco-Friendly Essentials', href: '/products/eco-essentials' },
      { name: 'Herbs & Spices', href: '/products/herbs-spices' },
    ]
  },
  { name: 'Certifications', href: '/certifications' },
  { 
    name: 'Resources', 
    href: '/resources/blog',
    dropdown: [
      { name: 'Blog', href: '/resources/blog' },
      { name: 'Case Studies', href: '/resources/case-studies' },
      { name: 'Market Reports', href: '/resources/reports' },
      { name: 'FAQs', href: '/resources/faqs' },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update active link based on current path
  useEffect(() => {
    const currentLink = navLinks.find(link => {
      if (link.href === pathname) return true;
      if (link.dropdown) {
        return link.dropdown.some(item => item.href === pathname);
      }
      return false;
    });
    if (currentLink) setActiveLink(currentLink.name);
  }, [pathname]);

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="relative">
        {/* Glassmorphic navbar container */}
        <div className="flex items-center justify-between px-8 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.45)]">
          
          {/* Logo - Tilted E */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <span className="text-3xl font-bold text-white transform -rotate-12 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:rotate-0 transition-transform duration-300 cursor-pointer">
                E
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative group/dropdown"
              >
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300 ease-out overflow-hidden
                    ${
                      activeLink === link.name || (link.dropdown && link.dropdown.some(item => pathname === item.href))
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }
                    group block
                  `}
                >
                  {/* Active background */}
                  {(activeLink === link.name || (link.dropdown && link.dropdown.some(item => pathname === item.href))) && (
                    <span className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] animate-fadeIn" />
                  )}
                  
                  {/* Hover effect */}
                  <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  
                  {/* Metallic shine effect */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </span>
                  
                  {/* Text */}
                  <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {link.name}
                  </span>
                </Link>

                {/* Dropdown Menu - Regular */}
                {link.dropdown && link.name !== 'Products' && openDropdown === link.name && (
                  <div 
                    className="absolute top-full mt-2 left-0 min-w-[220px] bg-black/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] overflow-hidden"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveLink(item.name)}
                        className={`block px-6 py-3 text-sm transition-all duration-200 ${
                          pathname === item.href
                            ? 'text-white bg-white/20 font-medium'
                            : 'text-gray-300 hover:text-white hover:bg-white/15'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega Menu - Products */}
                {link.dropdown && link.name === 'Products' && openDropdown === link.name && (
                  <div 
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[700px] bg-black/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] overflow-hidden p-6"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveLink(item.name)}
                          className={`group/item px-4 py-3 rounded-xl transition-all duration-200 ${
                            pathname === item.href
                              ? 'text-white bg-white/20 font-medium'
                              : 'text-gray-300 hover:text-white hover:bg-white/15'
                          }`}
                        >
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-gray-400 group-hover/item:text-gray-300 mt-1">
                            {item.name === 'Herbal & Ayurvedic' && 'Ashwagandha, Turmeric, Brahmi...'}
                            {item.name === 'Aromatic Effluences' && 'Essential oils & fragrances'}
                            {item.name === 'Tea & Coffee' && 'Assam, Darjeeling, Arabica...'}
                            {item.name === 'Jute Products' && 'Eco-friendly bags & decor'}
                            {item.name === 'Luxury Fabrics' && 'Silk, cotton, handloom...'}
                            {item.name === 'Eco-Friendly Essentials' && 'Organic daily products'}
                            {item.name === 'Herbs & Spices' && 'Pepper, Cardamom, Cumin...'}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <Link
                        href="/products"
                        className="block text-center text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom shadow for depth */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[95%] h-4 bg-black/20 blur-xl rounded-full" />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full mt-4 left-0 right-0 bg-black/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] overflow-hidden max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  if (!link.dropdown) setMobileMenuOpen(false);
                }}
                className={`block px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeLink === link.name || (link.dropdown && link.dropdown.some(item => pathname === item.href))
                    ? 'text-white bg-white/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="bg-black/40">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveLink(item.name);
                        setMobileMenuOpen(false);
                      }}
                      className={`block px-10 py-3 text-sm transition-all duration-200 ${
                        pathname === item.href
                          ? 'text-white bg-white/20 font-medium'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
