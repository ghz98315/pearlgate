import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllSuppliers, getSupplierById } from "@/lib/suppliers";
import { MapPin, Star, Calendar, Users, Clock, Ship, ArrowLeft, Shield, CheckCircle, Mail, Lock } from "lucide-react";

export async function generateStaticParams() {
  const all = await getAllSuppliers();
  return all.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supplier = await getSupplierById(id);
  if (!supplier) return {};
  return {
    title: `${supplier.name} — PearlGate Verified Supplier`,
    description: supplier.description.slice(0, 160),
  };
}

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supplier = await getSupplierById(id);
  if (!supplier) notFound();
  if (!supplier.isFree) redirect("/suppliers");

  const allSuppliers = await getAllSuppliers();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Link
            href="/suppliers"
            className="inline-flex items-center gap-1 text-text-secondary hover:text-navy-700 text-sm transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to all suppliers
          </Link>

          {/* Hero */}
          <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
            <Image
              src={supplier.images[0]}
              alt={supplier.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                {supplier.isDirectFactory && (
                  <span className="bg-green-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} /> Direct Factory
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  Verified {supplier.verifiedDate}
                </span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
                {supplier.name}
              </h1>
              <p className="text-white/70 flex items-center gap-1 mt-2">
                <MapPin size={14} /> {supplier.city}, Guangdong · {supplier.cluster}
              </p>
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-6 flex flex-wrap gap-6 p-5 rounded-xl bg-gray-50 border border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Quality:</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < supplier.qualityRating ? "text-orange-500 fill-orange-500" : "text-gray-200"} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Cooperation:</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < supplier.cooperationRating ? "text-orange-500 fill-orange-500" : "text-gray-200"} />
                ))}
              </div>
            </div>
          </div>

          {/* Overview */}
          <section className="mt-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Overview</h2>
            <p className="mt-4 text-text-secondary leading-relaxed text-lg">{supplier.description}</p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard icon={Calendar} label="Established" value={String(supplier.established)} />
              <InfoCard icon={Users} label="Employees" value={supplier.employees} />
              <InfoCard icon={Clock} label="Lead Time" value={supplier.productionLeadTime} />
              <InfoCard icon={Ship} label="Port" value={supplier.shippingPort} />
            </div>
          </section>

          {/* Business Details */}
          <section className="mt-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Business Details</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailRow label="Minimum Order" value={supplier.moq} />
              <DetailRow label="Price Range" value={supplier.priceRange} />
              <DetailRow label="Sample Lead Time" value={supplier.sampleLeadTime} />
              <DetailRow label="Production Lead Time" value={supplier.productionLeadTime} />
              <DetailRow label="Payment Methods" value={supplier.paymentMethods.join(", ")} />
              <DetailRow label="Shipping Port" value={supplier.shippingPort} />
            </div>
          </section>

          {/* Specialties */}
          <section className="mt-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Specialties</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {supplier.specialties.map((s) => (
                <span key={s} className="bg-navy-900/5 text-navy-700 text-sm font-medium px-4 py-2 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mt-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Certifications</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {supplier.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-2 rounded-lg">
                  <Shield size={14} />
                  {cert}
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mt-10">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Contact</h2>
            <div className="mt-4 p-6 rounded-xl bg-gray-50 border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-text-secondary">Contact Person</p>
                  <p className="font-medium mt-1">{supplier.contactName}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Email</p>
                  <p className="font-medium mt-1">{supplier.contactEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">WeChat</p>
                  <p className="font-medium mt-1">{supplier.contactWechat}</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 text-center">
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-serif)]">
              Interested in this supplier?
            </h3>
            <p className="mt-2 text-white/70">
              I can help you get quotes, arrange samples, and manage the order.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
            >
              <Mail size={18} />
              Send Inquiry
            </Link>
          </section>

          {/* Related Suppliers */}
          <section className="mt-12">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Similar Suppliers</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {allSuppliers
                .filter((s) => s.id !== supplier.id)
                .slice(0, 2)
                .map((s) => (
                  <div key={s.id} className="relative rounded-xl overflow-hidden border border-border">
                    <div className="relative h-32">
                      <Image src={s.images[0]} alt={s.name} fill className={`object-cover ${!s.isFree ? "opacity-50" : ""}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <p className="text-white font-semibold text-sm">{s.name}</p>
                        <p className="text-white/60 text-xs flex items-center gap-1"><MapPin size={10} />{s.city}</p>
                      </div>
                    </div>
                    {s.isFree ? (
                      <Link href={`/suppliers/${s.id}`} className="block p-3 text-center text-sm text-orange-500 font-medium hover:text-orange-600">
                        View Profile →
                      </Link>
                    ) : (
                      <div className="p-3 text-center">
                        <Link href="/pricing" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-navy-700">
                          <Lock size={12} /> Subscribe to unlock
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-border">
      <Icon size={18} className="text-navy-700" />
      <p className="text-xs text-text-secondary mt-2">{label}</p>
      <p className="font-semibold mt-0.5">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
