'use client';

import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface DocsSection {
  id: string;
  label: string;
  // Sections sharing a group are listed under one heading.
  group: string;
}

const SUGGESTION_URL = 'https://github.com/alsonick/lyrics-tags-generator-docs/issues/new';

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

  const groups = sections.reduce<{ name: string; sections: DocsSection[] }[]>((acc, section) => {
    const last = acc[acc.length - 1];
    if (last && last.name === section.group) last.sections.push(section);
    else acc.push({ name: section.group, sections: [section] });
    return acc;
  }, []);

  return (
    <aside className="sticky top-32 hidden h-fit w-56 shrink-0 xl:block">
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.name}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {group.name}
            </p>
            <nav className="flex flex-col border-l border-gray-200 dark:border-neutral-800">
              {group.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    '-ml-px border-l-2 py-1.5 pl-4 text-base transition-colors',
                    active === section.id
                      ? 'border-brand-500 font-medium text-brand-700 dark:text-brand-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-neutral-600 dark:hover:text-gray-100'
                  )}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-2 border-t pt-5 text-base">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex w-fit items-center gap-1.5 text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <FiArrowUp /> Back to top
        </a>
        <a
          href={SUGGESTION_URL}
          target="_blank"
          className="flex w-fit items-center gap-1.5 text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <FiArrowUpRight /> Suggest an edit
        </a>
      </div>
    </aside>
  );
};
