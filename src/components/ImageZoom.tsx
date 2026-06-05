'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function ImageZoom({ src, alt, caption }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 缩略图 */}
      <div className="my-10 cursor-zoom-in" onClick={() => setIsOpen(true)}>
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <img src={src} alt={alt} className="w-full h-auto" />
        </div>
        {caption && (
          <p className="text-sm text-gray-500 italic text-center mt-3">{caption}</p>
        )}
      </div>

      {/* 全屏预览 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {caption && (
            <p className="absolute bottom-8 left-0 right-0 text-white text-center text-sm px-4">
              {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
