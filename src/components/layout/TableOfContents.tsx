import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  /**
   * Selector for headings to include in TOC
   */
  selector?: string;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Table of Contents Component
 * Auto-generates navigation from page headings
 * Highlights active section based on scroll position
 */
export function TableOfContents({
  selector = 'h2, h3',
  className = '',
}: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Generate TOC items from headings
    const headings = document.querySelectorAll(selector);
    const tocItems: TOCItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `section-${index}`;
      if (!heading.id) {
        heading.id = id;
      }

      const level = parseInt(heading.tagName.charAt(1));
      tocItems.push({
        id,
        title: heading.textContent || '',
        level,
      });
    });

    setItems(tocItems);

    // Setup intersection observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [selector]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className={cn('sticky top-24 space-y-2', className)} aria-label="Table of contents">
      <h3 className="font-semibold text-sm text-foreground mb-4">On This Page</h3>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <button
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm w-full text-left py-1 px-3 border-l-2 transition-colors',
                activeId === item.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
