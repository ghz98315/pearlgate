import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OEMMatchForm from "@/components/OEMMatchForm";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animations";
import {
  Search,
  Clock,
  CheckCircle,
  Package,
  TrendingUp,
  Shield,
  Users,
  Factory,
  Award,
  Globe,
  Zap,
  Building,
  Lightbulb,
  Target,
  FileCheck,
  HeadphonesIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OEM & Supplier Matching Service — PearlGate | EV Charging Equipment Sourcing",
  description: "Professional OEM matching for EV charging products. Get matched with 2-3 verified manufacturers within 48 hours. CCS1/CCS2/NACS cables, portable EVSE, connectors.",
};

export default function SupplierMatchPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-orange-300 bg-orange-500/20 uppercase tracking-wider mb-6 rounded-full">
                OEM & Supplier Matching
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-serif)]">
                Get Matched with Verified EV Charging OEMs in 48 Hours
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Submit your requirements. We verify certifications, evaluate production capability,
                and recommend 2-3 suitable manufacturers. Completely free service.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 font-[family-name:var(--font-serif)]">
                What We Do
              </h2>
              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                We bridge EV charging buyers and China-based OEM manufacturers through technical verification
                and hands-on factory evaluation.
              </p>
            </FadeIn>

            <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerItem>
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                    <FileCheck size={28} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Technical Verification</h3>
                  <p className="text-gray-600">
                    Verify UL/IEC certifications in official databases. Review temperature rise test reports,
                    contact resistance data, and production QC procedures.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                    <Factory size={28} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Factory Evaluation</h3>
                  <p className="text-gray-600">
                    On-site visits to assess production lines, testing equipment, export documentation,
                    and worker training programs.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                    <Target size={28} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Customized Matching</h3>
                  <p className="text-gray-600">
                    Match you with 2-3 OEMs based on your target market certifications, order volume,
                    OEM requirements, and budget constraints.
                  </p>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Our Services
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "OEM Manufacturer Matching",
                  desc: "Find the right EVSE OEM for CCS1/CCS2/NACS cables, portable chargers, connectors",
                },
                {
                  icon: Shield,
                  title: "Certification Verification",
                  desc: "Verify UL 2594, IEC 62196, SAE J3400 certificates in official databases",
                },
                {
                  icon: Factory,
                  title: "Factory Audits",
                  desc: "On-site production capability assessment and QC procedure evaluation",
                },
                {
                  icon: Package,
                  title: "Sample Coordination",
                  desc: "Arrange product samples, manage specifications, coordinate international shipping",
                },
                {
                  icon: FileCheck,
                  title: "QC Inspection",
                  desc: "Pre-shipment quality control inspection following AQL standards",
                },
                {
                  icon: HeadphonesIcon,
                  title: "Production Support",
                  desc: "Ongoing communication bridge, production monitoring, shipping coordination",
                },
              ].map((service, idx) => (
                <div key={idx} className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-400 transition-all">
                  <service.icon size={32} className="text-orange-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                How It Works
              </h2>
            </FadeIn>

            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Submit Requirements",
                  desc: "Tell us product type, target market, quantity, certifications needed, OEM requirements",
                  time: "5 minutes",
                },
                {
                  step: 2,
                  title: "Factory Evaluation",
                  desc: "We evaluate suppliers based on production capability, certifications, export experience",
                  time: "24-48 hours",
                },
                {
                  step: 3,
                  title: "Supplier Shortlist",
                  desc: "Receive 2-3 verified supplier recommendations with comparative analysis",
                  time: "48 hours",
                },
                {
                  step: 4,
                  title: "Sample Coordination",
                  desc: "We coordinate sample orders, specifications, and international shipping",
                  time: "1-2 weeks",
                },
                {
                  step: 5,
                  title: "Production Support",
                  desc: "Optional QC inspection, production monitoring, and shipping coordination",
                  time: "Ongoing",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-2xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-lg mb-2">{item.desc}</p>
                    <div className="inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                      <Clock size={16} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Case Studies
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
                <div className="text-sm font-semibold text-orange-600 mb-2">EU Market</div>
                <h3 className="text-xl font-bold mb-4">Portable EV Charger OEM</h3>
                <p className="text-gray-600 mb-6">
                  German EV charging brand needed CE-certified portable EVSE (Level 1/2) with custom branding.
                  Matched with Dongguan OEM, 5,000 units/month capacity, 22kW AC output.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>CE + TÜV certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>MOQ: 500 units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>Lead time: 45 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
                <div className="text-sm font-semibold text-orange-600 mb-2">North America</div>
                <h3 className="text-xl font-bold mb-4">NACS Adapter Sourcing</h3>
                <p className="text-gray-600 mb-6">
                  US importer needed CCS1-to-NACS adapters for Tesla compatibility. Verified UL certification,
                  matched with Shenzhen manufacturer, 250A DC rating, SAE J3400 compliant.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>UL + FCC certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>MOQ: 100 units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>Lead time: 30 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
                <div className="text-sm font-semibold text-orange-600 mb-2">Asia-Pacific</div>
                <h3 className="text-xl font-bold mb-4">CCS2 Cable Supplier Match</h3>
                <p className="text-gray-600 mb-6">
                  Australian distributor needed IEC 62196-3 CCS2 DC cables, 200A, liquid-cooled.
                  Matched with Guangdong OEM, exported to 15+ countries, 10,000 units/month.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>IEC 62196-3 + RoHS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>MOQ: 200 units</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>Lead time: 35 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Use existing WhyChooseMe component styling */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Why Choose Us
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Save Time",
                  desc: "No need to contact dozens of suppliers. We pre-screen and recommend only verified options.",
                },
                {
                  icon: Shield,
                  title: "Reduce Risk",
                  desc: "Every recommended supplier is verified for certifications, production capability, export experience.",
                },
                {
                  icon: Lightbulb,
                  title: "Expert Guidance",
                  desc: "11 years BYD charging infrastructure experience. Evaluate suppliers using OEM-level criteria.",
                },
                {
                  icon: TrendingUp,
                  title: "Free Service",
                  desc: "OEM matching is free. No upfront fees, only optional paid services after successful match.",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-orange-500" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Industries We Serve
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "EV Charging Brands",
                  desc: "New charging equipment brands sourcing OEM manufacturers for branded products",
                },
                {
                  icon: Globe,
                  title: "Importers & Distributors",
                  desc: "Regional distributors importing CCS/NACS cables and portable EVSE to local markets",
                },
                {
                  icon: Building,
                  title: "OEM Buyers",
                  desc: "Companies white-labeling charging equipment under their own brand name",
                },
                {
                  icon: Factory,
                  title: "EV Infrastructure Companies",
                  desc: "Charging network operators procuring equipment for station deployment",
                },
                {
                  icon: FileCheck,
                  title: "Engineering Procurement Teams",
                  desc: "Technical buyers evaluating suppliers for large-scale charging projects",
                },
                {
                  icon: Users,
                  title: "Energy Solution Providers",
                  desc: "Companies integrating EV charging into broader energy management systems",
                },
              ].map((industry, idx) => (
                <div key={idx} className="p-6 bg-white rounded-xl border-2 border-gray-200">
                  <industry.icon size={32} className="text-orange-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">{industry.title}</h3>
                  <p className="text-sm text-gray-600">{industry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6 font-[family-name:var(--font-serif)]">
                Certifications We Verify
              </h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                We verify all safety and performance certifications in official databases before recommending any OEM.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "UL 2594", market: "North America", type: "DC Cables" },
                { name: "UL 2251", market: "North America", type: "AC Cables" },
                { name: "IEC 62196", market: "Europe/Global", type: "EV Connectors" },
                { name: "SAE J3400", market: "North America", type: "NACS/Tesla" },
                { name: "CE", market: "Europe", type: "General Safety" },
                { name: "TÜV", market: "Germany", type: "Product Safety" },
                { name: "FCC", market: "North America", type: "EMC" },
                { name: "RoHS", market: "Europe/Global", type: "Env. Compliance" },
              ].map((cert, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <Award size={24} className="text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{cert.market}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{cert.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Frequently Asked Questions
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {[
                {
                  q: "How long does the matching process take?",
                  a: "We typically respond within 24-48 hours with 2-3 verified OEM recommendations including pricing, MOQ, lead times, and certification details.",
                },
                {
                  q: "Is this service really free?",
                  a: "Yes, OEM matching is completely free. We earn commission from manufacturers only after successful orders. Optional paid services (QC inspection, production monitoring) are clearly quoted upfront.",
                },
                {
                  q: "What if I don't like any of the recommended OEMs?",
                  a: "We'll refine the search based on your feedback and provide additional options. Our goal is finding the right fit, not forcing a match.",
                },
                {
                  q: "Do you handle shipping and customs clearance?",
                  a: "We coordinate with freight forwarders for international shipping. You'll work directly with your chosen logistics partner for customs clearance in your country.",
                },
                {
                  q: "Can you help with product customization?",
                  a: "Yes. We communicate your OEM requirements (branding, cable length, connector types, packaging) to manufacturers and coordinate sample approval before production.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-white rounded-xl border-2 border-gray-200">
                  <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 font-[family-name:var(--font-serif)]">
                Submit Your OEM Match Request
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12">
                Fill out the form below and we'll match you with verified EVSE manufacturers within 48 hours.
              </p>
            </FadeIn>

            <OEMMatchForm />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-serif)]">
                Ready to Find Your EVSE OEM?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Submit your requirements and get matched with verified EV charging manufacturers within 48 hours.
                Completely free service.
              </p>
              <a
                href="#form"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
              >
                Get Started Now
              </a>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
