"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo";

const productMenuItems = [
  { name: "Portable EV Chargers", href: "/products/portable-ev-chargers" },
  { name: "EV Charging Cables", href: "/products/ev-charging-cables" },
  { name: "EV Charging Adapters", href: "/products/ev-charging-adapters" },
  { name: "EV Connectors", href: "/products/ev-connectors" },
  { name: "Wallbox", href: "#", badge: "Coming Soon" },
  { name: "Charging Accessories", href: "#", badge: "Coming Soon" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
            Home
          </Link>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors">
              Products
              <ChevronDown size={16} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {productMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      item.badge
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                    onClick={(e) => item.badge && e.preventDefault()}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/factory-verification" className="text-white/80 hover:text-white text-sm transition-colors">
            Verification
          </Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm transition-colors">
            Insights
          </Link>

          <Link
            href="/supplier-match"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Get Matched
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-6 py-4 space-y-3">
          <Link
            href="/"
            className="block text-white/80 hover:text-white text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Products Dropdown */}
          <div>
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="flex items-center justify-between w-full text-white/80 hover:text-white text-sm"
            >
              Products
              <ChevronDown size={16} className={`transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileProductsOpen && (
              <div className="mt-2 ml-4 space-y-2">
                {productMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block text-sm py-1.5 ${
                      item.badge
                        ? 'text-white/40 cursor-not-allowed'
                        : 'text-white/70 hover:text-white'
                    }`}
                    onClick={(e) => {
                      if (item.badge) {
                        e.preventDefault();
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/factory-verification"
            className="block text-white/80 hover:text-white text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Verification
          </Link>
          <Link
            href="/about"
            className="block text-white/80 hover:text-white text-sm"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            href="/blog"
            className="block text-white/80 hover:text-white text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Insights
          </Link>
          <Link
            href="/supplier-match"
            className="block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Get Matched
          </Link>
        </div>
      )}
    </nav>
  );
}
