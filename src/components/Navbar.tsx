"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">Home</Link>
          <Link href="/suppliers" className="text-white/80 hover:text-white text-sm transition-colors">Suppliers</Link>
          <Link href="/pricing" className="text-white/80 hover:text-white text-sm transition-colors">Pricing</Link>
          <Link href="/about" className="text-white/80 hover:text-white text-sm transition-colors">About</Link>
          <Link href="/blog" className="text-white/80 hover:text-white text-sm transition-colors">Blog</Link>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/quote"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Get a Quote
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    {session.user.image ? (
                      <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <p className="px-4 py-1 text-xs text-text-secondary truncate">{session.user.email}</p>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-navy-900 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-white/80 hover:text-white text-sm transition-colors">
                Sign in
              </Link>
              <Link
                href="/quote"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Get a Quote
              </Link>
            </div>
          )}
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
          <Link href="/pricing" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/about" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>About</Link>
          <Link href="/blog" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>Blog</Link>
          {session?.user ? (
            <>
              <p className="text-white/50 text-xs truncate">{session.user.email}</p>
              <button onClick={() => signOut()} className="block text-white/80 hover:text-white text-sm">Sign out</button>
            </>
          ) : (
            <Link href="/login" className="block text-white/80 hover:text-white text-sm" onClick={() => setOpen(false)}>Sign in</Link>
          )}
          <Link
            href="/quote"
            className="block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center transition-colors"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
