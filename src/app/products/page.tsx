import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EV Charging Products - Pre-Vetted Suppliers | SilkBridge",
  description: "Browse CCS1, CCS2, NACS, Type 2 cables, portable chargers, and connectors. Each product category includes pre-vetted suppliers, specs, and red flags to avoid.",
  openGraph: {
    title: "EV Charging Products - Pre-Vetted Suppliers",
    description: "Browse CCS1, CCS2, NACS, Type 2 cables, portable chargers, and connectors.",
  },
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Browse EV Charging Products
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Each product category includes pre-vetted suppliers, technical specs, common mistakes to avoid, and red flags to watch for.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.slug}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {product.name}
                </h3>

                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Key Specs */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="text-slate-400 w-24">Current:</span>
                    <span className="text-slate-300 text-xs">{product.specs.current}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-slate-400 w-24">Voltage:</span>
                    <span className="text-slate-300 text-xs">{product.specs.voltage}</span>
                  </div>
                </div>

                {/* Price and Suppliers */}
                <div className="border-t border-slate-800 pt-4 mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xs text-slate-400">Price Range</p>
                      <p className="text-lg font-semibold text-white">
                        ${product.priceRange.min}-${product.priceRange.max}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Suppliers</p>
                      <p className="text-lg font-semibold text-blue-400">
                        {product.suppliers.length}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    View Details & Suppliers
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need direct access to supplier list?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl">
              If you already know what you need and want to browse all suppliers directly, visit our supplier directory.
            </p>
            <Link
              href="/suppliers"
              className="inline-block bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Browse All Suppliers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
