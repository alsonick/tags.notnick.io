import { FiInfo } from 'react-icons/fi';

export const DocumentationNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 rounded-lg border border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950/40 p-4">
      <FiInfo className="mt-0.5 shrink-0 text-lg text-brand-500" />
      <div>
        <p className="mb-1 text-sm font-semibold text-brand-800 dark:text-brand-300">Note</p>
        <div className="text-sm leading-relaxed text-brand-700 dark:text-brand-300/90">{children}</div>
      </div>
    </div>
  );
};
