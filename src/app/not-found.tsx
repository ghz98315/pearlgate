import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-white flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-6xl font-bold text-orange-500 font-[family-name:var(--font-serif)]">404</p>
          <h1 className="mt-4 text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)]">
            Page not found
          </h1>
          <p className="mt-3 text-text-secondary text-lg">
            The page you&apos;re looking for doesn&apos;t exist. But we can still help you find the right factory.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/suppliers"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
            >
              Browse Suppliers
            </Link>
            <Link
              href="/quote"
              className="border border-border hover:border-navy-700/30 text-navy-900 font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
            >
              Submit an Inquiry
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
