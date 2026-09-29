'use client';

import { FiCopy, FiCheck } from 'react-icons/fi';
import { buttonVariants } from '@/components/Button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CodeBlockTab {
  label: string;
  code: string;
}

interface Props {
  code?: string;
  language?: string;
  tabs?: CodeBlockTab[];
  className?: string;
  // Caps the height of long snippets (e.g. JSON responses); the rest scrolls.
  maxHeight?: number;
}

// Tiny regex highlighter, just enough for the snippets in the docs.
// Each capture group maps to a token class in TOKEN_CLASSES, in order.
const TOKEN_PATTERNS: Record<string, RegExp> = {
  template: /(\{[a-zA-Z0-9]+\})/g,
  json: /("(?:[^"\\]|\\[\s\S])*"(?=\s*:))|("(?:[^"\\]|\\[\s\S])*")|\b(true|false|null|-?\d+(?:\.\d+)?)\b/g,
  code: /("(?:[^"\\]|\\[\s\S])*"|`(?:[^`\\]|\\[\s\S])*`)|\b(const|let|await|new|return|curl)\b|\b(true|false|null)\b/g,
};

// Darker shades in light mode, lighter ones on the dark background.
const TOKEN_CLASSES: Record<string, string[]> = {
  template: ['text-brand-700 dark:text-brand-400'],
  json: ['text-sky-700 dark:text-sky-300', 'text-emerald-700 dark:text-emerald-300', 'text-amber-700 dark:text-amber-300'],
  code: ['text-emerald-700 dark:text-emerald-300', 'text-violet-700 dark:text-violet-300', 'text-amber-700 dark:text-amber-300'],
};

const grammarFor = (language: string) => {
  const lang = language.toLowerCase();
  if (lang === 'template' || lang === 'json') return lang;
  return 'code';
};

const highlight = (code: string, language: string) => {
  const grammar = grammarFor(language);
  const pattern = new RegExp(TOKEN_PATTERNS[grammar]);
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) nodes.push(code.slice(lastIndex, match.index));
    const group = match.slice(1).findIndex((value) => value !== undefined);
    nodes.push(
      <span key={match.index} className={TOKEN_CLASSES[grammar][group]}>
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < code.length) nodes.push(code.slice(lastIndex));
  return nodes;
};

export const CodeBlock = ({ code, language = 'bash', tabs, className, maxHeight }: Props) => {
  const items = tabs ?? [{ label: language, code: code ?? '' }];
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = items[active] ?? items[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-800 dark:bg-[#0d1117]',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100/70 px-3 py-1.5 dark:border-gray-800 dark:bg-[#161b22]">
        <div className="flex items-center gap-1">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                'rounded-md px-2.5 py-1 text-base font-medium transition-colors',
                index === active
                  ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200 dark:bg-gray-700/60 dark:text-white dark:shadow-none dark:ring-0'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(buttonVariants({ variant: 'secondary' }), 'dark:border-gray-700 dark:bg-transparent dark:hover:bg-gray-800')}
          title="Copy to clipboard"
        >
          {copied ? <FiCheck className="text-emerald-600 dark:text-emerald-400" /> : <FiCopy />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className="overflow-auto px-4 py-3.5 text-base leading-relaxed [scrollbar-color:#d1d5db_transparent] dark:[scrollbar-color:#30363d_transparent]"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code className="whitespace-pre font-mono text-gray-900 dark:text-gray-100">{highlight(current.code, current.label)}</code>
      </pre>
    </div>
  );
};
