"use client";

import { useState, useEffect } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

interface RequestSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productCategory?: string;
  productUrl?: string;
}

interface FormData {
  fullName: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  targetMarket: string;
  chargingStandard: string;
  certificationsNeeded: string[];
  intendedUse: string;
  estimatedVolume: string;
  oemRequirements: string;
  message: string;
  productName: string;
  productCategory: string;
  productUrl: string;
}

const chargingStandards = [
  "CCS1",
  "CCS2",
  "NACS (Tesla)",
  "GB/T",
  "Type 1 (J1772)",
  "Type 2 (IEC 62196-2)",
  "CHAdeMO",
  "Not Sure",
];

const certifications = [
  "CE",
  "UL",
  "FCC",
  "RoHS",
  "ETL",
  "IEC 62196",
  "SAE J3400",
  "Not Sure",
];

export default function RequestSampleModal({
  isOpen,
  onClose,
  productName = "",
  productCategory = "",
  productUrl = "",
}: RequestSampleModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    whatsapp: "",
    country: "",
    targetMarket: "",
    chargingStandard: "",
    certificationsNeeded: [],
    intendedUse: "",
    estimatedVolume: "",
    oemRequirements: "",
    message: "",
    productName,
    productCategory,
    productUrl,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      productName,
      productCategory,
      productUrl,
    }));
  }, [productName, productCategory, productUrl]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getRecommendedCertifications = (category: string): string[] => {
    const recommendations: Record<string, string[]> = {
      "CCS2": ["CE", "IEC 62196", "RoHS"],
      "Type 2": ["CE", "IEC 62196", "RoHS"],
      "CCS1": ["UL", "FCC", "ETL"],
      "NACS": ["UL", "SAE J3400", "FCC"],
      "Type 1": ["UL", "FCC", "ETL"],
    };

    for (const [key, certs] of Object.entries(recommendations)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return certs;
      }
    }

    return [];
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCertificationToggle = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certificationsNeeded: prev.certificationsNeeded.includes(cert)
        ? prev.certificationsNeeded.filter((c) => c !== cert)
        : [...prev.certificationsNeeded, cert],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.targetMarket.trim()) newErrors.targetMarket = "Target market is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/request-sample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json();

      setIsSuccess(true);
      setTimeout(() => {
        // 传递 Reference ID 到 Thank You 页面
        window.location.href = `/thank-you?ref=${encodeURIComponent(result.referenceId || '')}`;
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const recommendedCerts = getRecommendedCertifications(productCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Request Product Sample</h2>
            {productName && (
              <p className="mt-1 text-sm text-gray-600">Product: {productName}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center px-8 py-16">
            <CheckCircle2 size={64} className="mb-4 text-green-500" />
            <h3 className="mb-2 text-2xl font-bold text-gray-900">Request Submitted!</h3>
            <p className="text-center text-gray-600">Redirecting to confirmation page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Smith"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="EV Solutions Inc."
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block mb-1.5 text-sm font-medium text-gray-700">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="country" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Your Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="targetMarket" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Target Market <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="targetMarket"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.targetMarket ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="North America, Europe, etc."
                  />
                  {errors.targetMarket && (
                    <p className="mt-1 text-xs text-red-500">{errors.targetMarket}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Optional Product Details - Moved to bottom */}
            <div className="pt-6 space-y-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Product Details (Optional)</h3>
                <span className="text-sm text-gray-500">All fields optional</span>
              </div>

              <div>
                <label htmlFor="chargingStandard" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Charging Standard
                </label>
                <select
                  id="chargingStandard"
                  name="chargingStandard"
                  value={formData.chargingStandard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select charging standard</option>
                  {chargingStandards.map((standard) => (
                    <option key={standard} value={standard}>
                      {standard}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Certifications Needed
                </label>
                {recommendedCerts.length > 0 && (
                  <p className="mb-2 text-xs text-orange-600">
                    Recommended for {productCategory}: {recommendedCerts.join(", ")}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => handleCertificationToggle(cert)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                        formData.certificationsNeeded.includes(cert)
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:border-orange-300"
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="intendedUse" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Intended Use
                </label>
                <input
                  type="text"
                  id="intendedUse"
                  name="intendedUse"
                  value={formData.intendedUse}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Residential, Commercial, Fleet, etc."
                />
              </div>

              <div>
                <label htmlFor="estimatedVolume" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Estimated Order Volume
                </label>
                <input
                  type="text"
                  id="estimatedVolume"
                  name="estimatedVolume"
                  value={formData.estimatedVolume}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="500 units/month, 10,000 units/year, etc."
                />
              </div>

              <div>
                <label htmlFor="oemRequirements" className="block mb-1.5 text-sm font-medium text-gray-700">
                  OEM / Customization Requirements
                </label>
                <input
                  type="text"
                  id="oemRequirements"
                  name="oemRequirements"
                  value={formData.oemRequirements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Custom branding, cable length, packaging, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Any other requirements or questions..."
                />
              </div>
            </div>

            {errors.submit && (
              <div className="p-4 text-sm text-red-700 bg-red-50 rounded-lg">
                {errors.submit}
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-semibold text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
