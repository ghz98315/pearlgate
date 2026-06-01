import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { Factory, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About — PearlGate | 11 Years in BYD Manufacturing, Now Helping You Source EV Charging Components",
  description: "11 years at BYD managing manufacturing for Dell, Toshiba, Lenovo, Huawei. Now I help overseas buyers source verified EV charging suppliers from China's Pearl River Delta.",
};

const strengths = [
  {
    icon: Factory,
    title: "Manufacturing Insider Perspective",
    description: "11 years inside BYD — from NPI engineer to engineering manager. I managed 100+ person teams delivering projects for Dell, Toshiba, Lenovo, Huawei. I know what 'factory-verified' actually means, especially for EV components where safety certifications and quality consistency matter.",
  },
  {
    icon: ShieldCheck,
    title: "EV-Focused Quality Approach",
    description: "EV charging products require specific certifications (UL2251, IEC 62196, GB/T 20234) and safety testing that generic factories don't understand. I verify that suppliers actually hold these certifications, understand EV-specific quality requirements, and have experience with international EV brands.",
  },
  {
    icon: MapPin,
    title: "Pearl River Delta Network",
    description: "Based in Shenzhen, heart of China's EV supply chain. Most EV charging manufacturers are within 1-2 hours. Problems get solved in person, not over email chains. I can visit factories same-week when issues arise, which is critical for time-sensitive production problems.",
  },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", alt: "Factory production line" },
  { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80", alt: "CNC machining" },
  { src: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=600&q=80", alt: "Precision parts" },
  { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=600&q=80", alt: "Aluminum profiles" },
  { src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80", alt: "Factory floor" },
  { src: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&q=80", alt: "Metal fittings" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero / Intro */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="relative w-56 h-56 lg:w-72 lg:h-72 shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-700 to-orange-500 opacity-15 rotate-3" />
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80"
                    alt="Professional portrait"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="max-w-xl">
                <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-serif)]">
                  11 Years in BYD Manufacturing.
                  <br />
                  Now Helping You Source EV Charging Components.
                </h1>
                <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                  I spent 11 years at BYD — one of the world&apos;s largest electronics manufacturers —
                  progressing from NPI Engineer to Engineering &amp; Technical Department Manager
                  to After-Sales Service Director. I managed teams of 100+ people and delivered
                  30-40 projects per year for clients including Dell, Toshiba, Lenovo, Huawei, Siemens, and ASUS.
                </p>
                <p className="mt-4 text-text-secondary text-lg leading-relaxed">
                  Now I use that experience to help overseas buyers source verified EV charging suppliers.
                  Every supplier in our network is vetted the same way I used to evaluate BYD&apos;s own supply chain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Introduction - Placeholder */}
        <section className="py-20 lg:py-28 bg-navy-900">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-[family-name:var(--font-serif)]">
                Inside our factory network
              </h2>
              <p className="mt-3 text-white/60">
                We visit every factory before adding it to our database.
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80"
                alt="Factory inspection visit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-sm font-medium">Video coming soon</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-white/40 text-sm">
              Prefer reading? Scroll down for the full story.
            </p>
          </div>
        </section>

        {/* Why EV Charging - NEW SECTION */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)]">
              Why EV Charging?
            </h2>
            <div className="mt-8 space-y-6 text-text-secondary leading-relaxed text-lg">
              <p>
                After 11 years in manufacturing, I watched China&apos;s EV ecosystem explode.
                The Pearl River Delta became the global hub for EV charging components —
                cables, connectors, adapters, portable chargers. Shenzhen alone has hundreds
                of factories producing EV charging products for Tesla, ChargePoint, and major
                automakers worldwide.
              </p>
              <p>
                But overseas buyers still struggle to find reliable suppliers who understand
                both manufacturing quality and EV safety standards. Many factories claim
                certifications they don&apos;t have. Quality varies wildly between samples and
                bulk orders. Communication breaks down during production. A bad supplier
                doesn&apos;t just cost money — it can create safety risks and regulatory problems.
              </p>
              <p>
                That&apos;s why PearlGate focuses exclusively on EV charging supply chain.
                Every supplier in our network is vetted for EV-specific certifications
                (UL2251, IEC 62196, CE, TUV), production capability, and export experience.
                I use the same evaluation process I learned at BYD — the same standards we
                applied to suppliers for Dell, Toshiba, and Lenovo.
              </p>
            </div>
          </div>
        </section>

        {/* My Story */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)]">
              My Story
            </h2>
            <div className="mt-8 space-y-6 text-text-secondary leading-relaxed text-lg">
              <p>
                I joined BYD in 2014 as an NPI (New Product Introduction) engineer, responsible
                for taking products from prototype to mass production. Over 11 years, I progressed
                through engineering management and eventually led the after-sales service division.
              </p>
              <p>
                My clients were global brands — Dell, Toshiba, Lenovo, Huawei, Siemens, ASUS.
                My job was to ensure their products were manufactured to spec, on time, and without
                quality escapes. I managed teams of 100+ engineers and technicians, delivering
                30-40 projects per year across consumer electronics, industrial equipment, and precision components.
              </p>
              <p>
                Over the years, I watched overseas buyers outside of BYD struggle with the same problems:
                unreliable suppliers, quality gaps between samples and bulk orders, communication
                breakdowns, and the constant fear of getting scammed. I realized that what
                these buyers needed wasn&apos;t another Alibaba listing — they needed someone
                on the ground who could vet factories the way a major OEM does.
              </p>
              <p>
                That&apos;s why I built PearlGate. Every supplier in our network goes through
                the same evaluation process I used at BYD: on-site visit, production capability
                assessment, quality system review, and reference checks. If a supplier wouldn&apos;t
                pass BYD&apos;s supplier audit, it doesn&apos;t make it into our network.
              </p>
            </div>
          </div>
        </section>

        {/* Why Work With Me */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-center font-[family-name:var(--font-serif)]">
              Why work with me
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {strengths.map((item) => (
                <div key={item.title} className="p-6">
                  <div className="w-14 h-14 rounded-full bg-navy-900/5 flex items-center justify-center">
                    <item.icon size={26} className="text-navy-700" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
                  <p className="mt-3 text-text-secondary leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Map */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-center font-[family-name:var(--font-serif)]">
              Our Coverage — Pearl River Delta
            </h2>
            <p className="mt-4 text-text-secondary text-center">
              Major industrial clusters, all within 1-2 hours of each other. Click the markers to learn more.
            </p>

            <div className="mt-12">
              <MapSection />
            </div>
          </div>
        </section>

        {/* Factory Gallery */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-center font-[family-name:var(--font-serif)]">
              Inside the factories
            </h2>
            <p className="mt-4 text-text-secondary text-center">
              Real photos from our factory visits and inspections.
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img) => (
                <div key={img.alt} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
              Ready to source with confidence?
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Submit your requirements — we&apos;ll match you with verified factories within 48 hours. Free, no obligation.
            </p>
            <Link
              href="/quote"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Submit an Inquiry
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
