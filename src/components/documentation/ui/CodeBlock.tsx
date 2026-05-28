'use client';

import { FiCopy, FiCheck } from 'react-icons/fi';
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
}

export const CodeBlock = ({ code, language = 'bash', tabs, className }: Props) => {
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
    <div className={cn('overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] shadow-sm', className)}>
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#161b22] px-3 py-1.5">
        <div className="flex items-center gap-1">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                index === active ? 'bg-gray-700/60 text-white' : 'text-gray-400 hover:text-gray-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:text-white"
          title="Copy to clipboard"
        >
          {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-sm leading-relaxed">
        <code className="whitespace-pre font-mono text-gray-100">{current.code}</code>
      </pre>
    </div>
  );
};
