"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Zap, Factory, Clock, Search, FileText } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=75"
          alt="Modern factory floor"
          fill
          className="object-cover scale-110"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-40">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Pearl River Delta · Guangdong, China
            <span className="inline-block w-px h-3 bg-white/30 mx-1" />
            <span className="text-green-400 font-semibold">CCS/NACS/Type2 Specialist</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-3xl lg:text-5xl font-bold text-white leading-tight font-[family-name:var(--font-serif)]"
          >
            Stop Gambling on EVSE Manufacturers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-xl text-orange-400 leading-relaxed max-w-2xl font-semibold"
          >
            One fake UL 2594 cert = $100K+ loss. One wrong connector standard (CCS1 vs CCS2) = entire container useless.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 text-lg text-white/80 leading-relaxed max-w-xl"
          >
            I audit EVSE manufacturers and charging cable OEMs before you deploy. Former BYD quality manager
            specializing in CCS1/CCS2/NACS connector compliance and DC fast charging infrastructure.
            I verify what others can&apos;t fake: UL/IEC certifications, temperature rise test data, liquid-cooled cable capabilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/supplier-match"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-lg text-base transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <Search size={18} />
              Get Free Factory Verification (48h)
            </Link>
            <Link
              href="/factory-verification"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-7 py-3.5 rounded-lg text-base transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <FileText size={18} />
              How I Verify Suppliers
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 lg:flex lg:flex-wrap gap-3"
          >
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
              <ShieldCheck className="text-orange-500" size={20} />
              <span className="text-xs text-white/60">UL/IEC Certified<br/>Network</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
              <Zap className="text-orange-500" size={20} />
              <span className="text-xs text-white/60">EVSE & Connector<br/>Specialist</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
              <Factory className="text-orange-500" size={20} />
              <span className="text-xs text-white/60">11yr Charging<br/>Infrastructure</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
              <Clock className="text-orange-500" size={20} />
              <span className="text-xs text-white/60">48h OEM<br/>Matching</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
