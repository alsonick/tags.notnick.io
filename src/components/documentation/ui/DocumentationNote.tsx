import { FiInfo } from 'react-icons/fi';

export const DocumentationNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 rounded-xl border border-l-4 border-brand-200 border-l-brand-500 bg-brand-50/50 dark:border-brand-900 dark:border-l-brand-500 dark:bg-brand-950/30 p-4">
      <FiInfo className="mt-0.5 shrink-0 text-lg text-brand-600 dark:text-brand-400" />
      <div>
        <p className="mb-1 text-base font-semibold text-brand-800 dark:text-brand-300">Note</p>
        <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
};
