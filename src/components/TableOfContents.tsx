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
    <nav className="hidden xl:block w-72 shrink-0 ml-16">
      <div className="sticky top-32">
        <div className="pl-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">
            In This Article
          </h3>
          <ul className="space-y-5">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block text-[15px] leading-relaxed transition-colors ${
                    activeId === heading.id
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
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
