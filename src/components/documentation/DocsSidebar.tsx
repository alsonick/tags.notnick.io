'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface DocsSection {
  id: string;
  label: string;
}

export const DocsSidebar = ({ sections }: { sections: DocsSection[] }) => {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Trigger when a section's heading reaches just below the fixed nav.
      { rootMargin: '-128px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="sticky top-32 hidden h-fit w-56 shrink-0 xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">On this page</p>
      <nav className="flex flex-col border-l border-gray-200 dark:border-neutral-800">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              '-ml-px border-l-2 py-1.5 pl-4 text-sm transition-colors',
              active === section.id
                ? 'border-brand-500 font-medium text-brand-600 dark:text-brand-400'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-neutral-600 dark:hover:text-gray-100'
            )}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};
