'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourceDownloadModal from '@/components/ResourceDownloadModal';
import { FileText, CheckCircle, Award, ShieldCheck } from 'lucide-react';

const resources = [
  {
    id: 'factory-evaluation',
    title: 'EV Charger Factory Evaluation Checklist',
    description: 'Practical checklist for assessing EV charging manufacturers — covering QC systems, testing capability, and OEM readiness.',
    icon: CheckCircle,
    pdfUrl: '/resources/Factory_Evaluation_Checklist.pdf',
    cta: 'Download Checklist',
  },
  {
    id: 'oem-requirement',
    title: 'EV Charging OEM Requirement Form',
    description: 'Organize OEM project requirements including charging standards, certifications, branding, and packaging needs.',
    icon: FileText,
    pdfUrl: '/resources/EV_Charger_OEM_Requirement_Form.pdf',
    cta: 'Download OEM Form',
  },
  {
    id: 'certification',
    title: 'EV Charging Certification Checklist',
    description: 'Reference guide for CE, UL, FCC, IP ratings, and compliance requirements for different markets.',
    icon: Award,
    pdfUrl: '/resources/Certification_Compliance_Checklist.pdf',
    cta: 'Download PDF',
  },
  {
    id: 'supplier-verification',
    title: 'The 7-Point EVSE Supplier Verification Checklist',
    description: "A sourcing insider's guide to the 7 checks that catch bad suppliers before you wire a deposit — and how to judge what certification your market actually requires.",
    icon: ShieldCheck,
    pdfUrl: '/resources/evse-supplier-verification-checklist.pdf',
    cta: 'Download the Guide',
  },
];

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Free OEM Resources
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
              Professional EV Charging Sourcing Tools
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Factory evaluation and OEM requirement tools for overseas buyers sourcing EV charging equipment in China.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={resource.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-navy-500 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="text-navy-700" size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-navy-900 mb-3">
                      {resource.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {resource.description}
                    </p>

                    <button
                      onClick={() => setSelectedResource(resource)}
                      className="w-full bg-navy-700 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
                    >
                      {resource.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Use These Resources */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">
              Why Use These Resources?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">
                    Save Time on Factory Evaluation
                  </h3>
                  <p className="text-gray-600">
                    Pre-built checklists help you assess suppliers quickly without missing critical quality indicators.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">
                    Organize OEM Requirements Clearly
                  </h3>
                  <p className="text-gray-600">
                    Structured forms ensure you communicate all technical, certification, and branding needs upfront.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">
                    Understand Certification Requirements
                  </h3>
                  <p className="text-gray-600">
                    Know which certifications (CE, UL, FCC) are needed for your target markets before production starts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-navy-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Need Help with Your EV Charging Project?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Beyond these resources, PearlGate offers full OEM sourcing support — from factory audits to production oversight.
            </p>
            <a
              href="/supplier-match"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Discuss Your Project
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Download Modal */}
      {selectedResource && (
        <ResourceDownloadModal
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
          resourceName={selectedResource.id}
          resourceTitle={selectedResource.title}
          pdfUrl={selectedResource.pdfUrl}
        />
      )}
    </>
  );
}
