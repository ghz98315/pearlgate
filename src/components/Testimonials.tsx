'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { FadeIn } from '@/components/Animations';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  content: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Chen',
    role: 'Procurement Manager',
    company: 'EV Charge Solutions (USA)',
    rating: 5,
    content: 'Working with PearlGate saved us 3 months of supplier vetting. They connected us with a UL-certified NACS cable manufacturer that met all our specs. Their factory verification report was thorough and accurate.',
    project: 'NACS Cable Manufacturing - 50K units',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Supply Chain Director',
    company: 'ChargePoint Equipment Ltd',
    rating: 5,
    content: 'After getting burned by an Alibaba supplier, we turned to PearlGate. They found us a legitimate CCS2 manufacturer with real certifications. The difference in quality control was night and day.',
    project: 'CCS2 Connector OEM Partnership',
  },
  {
    id: 3,
    name: 'Thomas Mueller',
    role: 'CEO',
    company: 'Nordic EV Systems',
    rating: 5,
    content: "PearlGate's knowledge of IEC standards and European compliance was impressive. They helped us source Type 2 cables that passed TUV certification on first attempt. Highly recommended for EU buyers.",
    project: 'Type 2 Cable Supply - IEC 62196 Certified',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 自动切换功能
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000); // 每 5 秒切换一次

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // 点击后暂停 10 秒，然后继续自动切换
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-navy-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Client Success Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-[family-name:var(--font-serif)]">
              Trusted by EV Equipment Buyers Worldwide
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Real results from real buyers who found reliable manufacturers through PearlGate
            </p>
          </div>

          {/* Main Testimonial Card */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 relative">
              <Quote className="absolute top-8 left-8 text-orange-200 opacity-50" size={48} />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-orange-500 text-orange-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[activeIndex].content}"
                </p>

                {/* Project Info */}
                {testimonials[activeIndex].project && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm font-semibold text-gray-600">Project</p>
                    <p className="text-gray-900">{testimonials[activeIndex].project}</p>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonials[activeIndex].avatar ? (
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[activeIndex].name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-orange-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-700 mb-2">48hrs</div>
              <p className="text-sm text-gray-600">Average Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-700 mb-2">95%</div>
              <p className="text-sm text-gray-600">First-Time Certification Pass Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-700 mb-2">50+</div>
              <p className="text-sm text-gray-600">Successful Projects Completed</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
