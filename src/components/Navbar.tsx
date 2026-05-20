"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">Home</Link>
          <Link href="/suppliers" className="text-white/80 hover:text-white text-sm transition-colors">Suppliers</Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm transition-colors">About</Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm transition-colors">Blog</Link>

          <Link
            href="/quote"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Submit an Inquiry
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-6 py-4 space-y-3">
          <Link href="/" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/suppliers" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>Suppliers</Link>
          <Link href="/about" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>About</Link>
          <Link href="/blog" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>Blog</Link>
          <Link
            href="/quote"
            className="block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            Submit an Inquiry
          </Link>
        </div>
      )}
    </nav>
  );
}
