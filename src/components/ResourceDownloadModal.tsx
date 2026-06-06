'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ResourceDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  resourceTitle: string;
  pdfUrl: string;
}

export default function ResourceDownloadModal({
  isOpen,
  onClose,
  resourceName,
  resourceTitle,
  pdfUrl,
}: ResourceDownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    productInterest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 保存到数据库
      const response = await fetch('/api/resources/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          product_interest: formData.productInterest,
          resource_name: resourceName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // 显示感谢页面
      setShowThankYou(true);

      // 3 秒后自动下载 PDF
      setTimeout(() => {
        window.open(pdfUrl, '_blank');
      }, 1000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {!showThankYou ? (
          <>
            {/* Form */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">
                Download: {resourceTitle}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Enter your details to receive this free resource.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Interest (Optional)
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productInterest: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  >
                    <option value="">Select product type</option>
                    <option value="EV Charging Cables">EV Charging Cables</option>
                    <option value="Wallbox Chargers">Wallbox Chargers</option>
                    <option value="Portable EVSE">Portable EVSE</option>
                    <option value="Connectors">Connectors</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy-700 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Get Free PDF'}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Thank You */}
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-navy-900 mb-2">
                Thank You
              </h3>
              <p className="text-gray-600 mb-6">
                Your OEM resource is ready.
                Feel free to contact PearlGate if you are planning EV charging OEM or sourcing projects in China.
              </p>

              <div className="space-y-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-navy-700 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
                >
                  Download PDF
                </a>
                <a
                  href="/supplier-match"
                  className="block w-full border-2 border-navy-700 text-navy-700 py-3 rounded-lg font-semibold hover:bg-navy-50 transition-colors"
                  onClick={onClose}
                >
                  Discuss OEM Project
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
