import { AlertCircle, Bug, Sparkles } from 'lucide-react';
import { Children, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const textFromChildren = (children: ReactNode): string =>
  Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('');

// Picks an icon for a section based on its heading, e.g. "Bug fixes" gets a bug.
const SectionIcon = ({ heading }: { heading: string }) => {
  const text = heading.toLowerCase();
  const Icon = text.includes('break')
    ? AlertCircle
    : text.includes('fix') || text.includes('improve')
    ? Bug
    : Sparkles;

  return (
    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
      <Icon className="w-4 h-4" />
    </span>
  );
};

export const ChangelogMarkdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="flex items-center text-xl font-semibold text-black dark:text-white mt-10 first:mt-0">
            <SectionIcon heading={textFromChildren(children)} />
            {children}
          </h2>
        ),
        h3: ({ children }) => <h3 className="text-lg font-semibold text-black dark:text-white mt-6 ml-12">{children}</h3>,
        p: ({ children }) => <p className="mt-4">{children}</p>,
        ul: ({ children }) => <ul className="list-disc mt-3 ml-16">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal mt-3 ml-16">{children}</ol>,
        li: ({ children }) => <li className="mt-1">{children}</li>,
        code: ({ children }) => (
          <code className="bg-gray-100 dark:bg-neutral-800 rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>
        ),
        a: ({ href, children }) => (
          <Link className="text-blue-500 font-semibold hover:underline" href={href ?? '#'}>
            {children}
          </Link>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
