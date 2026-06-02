"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RequestSampleModal from "@/components/RequestSampleModal";
import MobileStickyButton from "@/components/MobileStickyButton";
import {
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
  Package,
  DollarSign,
  Award,
  ChevronRight,
  XCircle,
  Beaker
} from "lucide-react";

interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  priceRange: {
    min: number;
    max: number;
    moq: string;
  };
  specs: {
    current: string;
    voltage: string;
    cableLength: string;
    connector: string;
    cooling: string;
    certification: string[];
  };
  technicalDetails: string;
  commonMistakes: string[];
  redFlags: string[];
  suppliers: any[];
}

export default function ProductPageClient({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <RequestSampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productCategory={product.category}
        productUrl={productUrl}
      />
      <MobileStickyButton />

      <main className="pt-20 min-h-screen bg-white">
        {/* Hero with Request Sample CTA */}
        <section className="pt-16 pb-12 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm transition-colors mb-6"
            >
              <ChevronRight size={14} className="rotate-180" />
              Back to Home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight font-[family-name:var(--font-serif)]">
                  {product.name}
                </h1>
                <p className="mt-4 text-lg text-white/80 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-xs text-white/60 mb-1">Price Range (FOB)</p>
                    <p className="text-xl font-bold text-white">
                      ${product.priceRange.min}-${product.priceRange.max}
                    </p>
                    <p className="text-xs text-white/60 mt-1">MOQ: {product.priceRange.moq}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-xs text-white/60 mb-1">Verified Suppliers</p>
                    <p className="text-xl font-bold text-white">
                      {product.suppliers.length}
                    </p>
                    <p className="text-xs text-white/60 mt-1">Ready to quote</p>
                  </div>
                </div>

                {/* CTA #1: Hero Request Sample Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-8 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  <Beaker size={20} />
                  Request Product Sample
                </button>
              </div>

              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold mb-8 font-[family-name:var(--font-serif)]">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SpecCard icon={Zap} label="Current Rating" value={product.specs.current} />
              <SpecCard icon={Zap} label="Voltage" value={product.specs.voltage} />
              <SpecCard icon={Package} label="Cable Length" value={product.specs.cableLength} />
              <SpecCard icon={Package} label="Connector Type" value={product.specs.connector} />
              <SpecCard icon={Zap} label="Cooling" value={product.specs.cooling} />
              <SpecCard
                icon={Shield}
                label="Certifications"
                value={product.specs.certification.join(", ")}
              />
            </div>

            {/* CTA #2: After Specifications */}
            <div className="mt-12 p-6 rounded-xl bg-white border-2 border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">Ready to source this product?</p>
                <p className="text-sm text-gray-600">Get matched with verified OEMs within 48 hours</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Beaker size={18} />
                Request Sample
              </button>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-serif)]">
              What to Look For
            </h2>
            <div className="prose prose-lg max-w-none">
              {product.technicalDetails.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('**')) {
                  const lines = paragraph.split('\n');
                  const heading = lines[0].replace(/\*\*/g, '');
                  const items = lines.slice(1).filter(l => l.trim());
                  return (
                    <div key={idx} className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">{heading}</h3>
                      <ul className="space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">{item.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        {/* Common Mistakes & Red Flags */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Common Mistakes */}
              <div>
                <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-serif)] flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" size={28} />
                  Common Mistakes
                </h2>
                <div className="space-y-3">
                  {product.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <XCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-800">{mistake}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red Flags */}
              <div>
                <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-serif)] flex items-center gap-2">
                  <Shield className="text-red-500" size={28} />
                  Red Flags I Check
                </h2>
                <div className="space-y-3">
                  {product.redFlags.map((flag, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-800">{flag}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Suppliers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-bold mb-8 font-[family-name:var(--font-serif)]">
              Verified Suppliers for {product.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.suppliers.map((supplier) => (
                <SupplierCard key={supplier.name} supplier={supplier} onRequestSample={() => setIsModalOpen(true)} />
              ))}
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 text-center">
              <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-serif)]">
                Need Help Choosing the Right Supplier?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                I'll review your requirements, verify certifications, and recommend 2-3 factories
                that match your specs and budget. Free service, 48-hour turnaround.
              </p>
              <Link
                href="/supplier-match"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Get Free Supplier Match
              </Link>
            </div>

            {/* CTA #3: Bottom Request Sample */}
            <div className="mt-12 p-8 rounded-2xl bg-navy-900 text-center">
              <h3 className="text-2xl font-bold mb-3 text-white font-[family-name:var(--font-serif)]">
                Ready to Request a Sample?
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Submit your requirements and get matched with verified OEM manufacturers within 48 hours.
                Completely free service.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Beaker size={20} />
                Request Product Sample
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
          <Icon size={20} className="text-orange-600" />
        </div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-sm font-medium text-gray-900 leading-relaxed">{value}</p>
    </div>
  );
}

function SupplierCard({ supplier, onRequestSample }: { supplier: any; onRequestSample: () => void }) {
  const priceColors: Record<string, string> = {
    Budget: "bg-green-100 text-green-700",
    "Mid-range": "bg-blue-100 text-blue-700",
    Premium: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white border-2 border-gray-200 hover:border-orange-400 rounded-xl p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-900">{supplier.name}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priceColors[supplier.priceLevel]}`}>
          {supplier.priceLevel}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-orange-500" />
          {supplier.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package size={16} className="text-orange-500" />
          MOQ: {supplier.moq}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} className="text-orange-500" />
          Lead Time: {supplier.leadTime}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Certifications:</p>
        <div className="flex flex-wrap gap-1.5">
          {supplier.certifications.map((cert: string) => (
            <span key={cert} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {cert}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onRequestSample}
        className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Request Quote
      </button>
    </div>
  );
}
