import { FiInfo } from 'react-icons/fi';

export const DocumentationNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40 p-4">
      <FiInfo className="mt-0.5 shrink-0 text-lg text-blue-500" />
      <div>
        <p className="mb-1 text-sm font-semibold text-blue-800 dark:text-blue-300">Note</p>
        <div className="text-sm leading-relaxed text-blue-700 dark:text-blue-300/90">{children}</div>
      </div>
    </div>
  );
};
