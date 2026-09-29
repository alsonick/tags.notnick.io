import { cn } from '@/lib/utils';

// A single tag pattern from a format string template, e.g. "{artist} {title} lyrics",
// with the {variables} highlighted.
export const TemplatePattern = ({ pattern, className }: { pattern: string; className?: string }) => {
  const parts = pattern.split(/(\{[^}]+\})/g).filter(Boolean);

  return (
    <span
      className={cn(
        'inline-block whitespace-pre rounded-md border bg-gray-50 px-2 py-1 font-mono text-base text-gray-700 dark:bg-neutral-900 dark:text-gray-300',
        className
      )}
    >
      {parts.map((part, index) =>
        part.startsWith('{') ? (
          <span key={index} className="text-brand-700 dark:text-brand-400">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};
