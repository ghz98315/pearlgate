'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 只解析 H2 标题
    const headingRegex = /^#{2}\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));

    const parsedHeadings = matches.map(match => {
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      return { id, text };
    });

    setHeadings(parsedHeadings);

    // 监听滚动，高亮当前标题
    const handleScroll = () => {
      const headingElements = parsedHeadings.map(h =>
        document.getElementById(h.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 150;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(parsedHeadings[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-32">
        <div className="border-l-2 border-navy-200 pl-6">
          <h3 className="text-xs font-bold text-navy-500 mb-4 uppercase tracking-wider">
            Contents
          </h3>
          <ul className="space-y-3">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block text-sm leading-snug transition-all ${
                    activeId === heading.id
                      ? 'text-navy-900 font-semibold border-l-2 border-navy-900 -ml-[2px] pl-[22px]'
                      : 'text-navy-600 hover:text-navy-900 pl-6'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      const top = element.offsetTop - 100;
                      window.scrollTo({
                        top,
                        behavior: 'smooth',
                      });
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
