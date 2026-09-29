import { FiMonitor } from 'react-icons/fi';

export const NoSupportedSizeScreenMessage = () => {
  return (
    <div className="flex xl:hidden flex-col items-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm">
        <FiMonitor className="text-xl text-gray-600 dark:text-gray-400" />
      </div>
      <p className="mt-4 text-xl font-semibold tracking-tight">This is awkward!</p>
      <p className="mt-1 max-w-sm text-gray-600 dark:text-gray-400">This site only supports desktop size screens.</p>
    </div>
  );
};
