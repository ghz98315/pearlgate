import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { Factory, ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About — PearlGate | Former Factory Manager, Now Your Sourcing Partner",
  description: "10+ years managing factory operations in Guangdong. Now I help overseas buyers source directly from the Pearl River Delta's best factories with confidence.",
};

const strengths = [
  {
    icon: Factory,
    title: "Factory Insider Perspective",
    description: "I'm not a trading company. I managed production lines, solved quality issues on the floor, and negotiated with suppliers as a peer — not an outsider.",
  },
  {
    icon: ShieldCheck,
    title: "Quality-First Approach",
    description: "With a background in quality management at BYD, I know what to look for. Every order gets inspected before it leaves China.",
  },
  {
    icon: MapPin,
    title: "Guangdong-Based, On the Ground",
    description: "I live in the Pearl River Delta. I can visit any factory within hours — not days. Problems get solved fast.",
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
                  Hi, I&apos;m your sourcing partner.
                </h1>
                <p className="mt-6 text-text-secondary text-lg leading-relaxed">
                  I spent 8+ years managing factory operations at BYD — one of China&apos;s
                  largest manufacturers. I&apos;ve walked thousands of production lines, resolved
                  quality crises, and built relationships with suppliers across the Pearl River Delta.
                </p>
                <p className="mt-4 text-text-secondary text-lg leading-relaxed">
                  Now I use that experience to help overseas businesses source from China
                  with confidence. No guesswork, no middlemen games — just direct access
                  to verified factories through someone who speaks their language.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Introduction */}
        <section className="py-20 lg:py-28 bg-navy-900">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-[family-name:var(--font-serif)]">
                Watch: Who I am & how I can help
              </h2>
              <p className="mt-3 text-white/60">
                2 minutes that could save you months of sourcing headaches.
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="PearlGate Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <p className="mt-6 text-center text-white/40 text-sm">
              Prefer reading? Scroll down for the full story.
            </p>
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
                At BYD, I managed technical operations across multiple production lines.
                My job was to ensure quality, optimize processes, and solve problems before
                they became expensive. I learned how Chinese factories really work — not
                from a sales brochure, but from the inside.
              </p>
              <p>
                Over the years, I watched overseas buyers struggle with the same problems:
                unreliable suppliers, quality gaps between samples and bulk orders, communication
                breakdowns, and the constant fear of getting scammed. I realized that what
                these buyers needed wasn&apos;t another Alibaba listing — they needed someone
                on the ground who could be their eyes, ears, and quality gate.
              </p>
              <p>
                That&apos;s why I started PearlGate. I combine my factory management experience
                with deep relationships across Guangdong&apos;s industrial clusters to give
                overseas buyers something they can&apos;t get anywhere else: a trusted insider
                who works for them, not the factory.
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
                <div key={item.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto">
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
              Five major industrial clusters, all within 2 hours of each other. Click the markers to learn more.
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
              Ready to work together?
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Send me your first sourcing request — it&apos;s free, no strings attached.
            </p>
            <Link
              href="/quote"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
