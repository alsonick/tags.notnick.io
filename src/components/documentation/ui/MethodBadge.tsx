import { cn } from '@/lib/utils';

const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  POST: 'bg-blue-50 text-blue-700 border-blue-200',
  PUT: 'bg-amber-50 text-amber-700 border-amber-200',
  PATCH: 'bg-purple-50 text-purple-700 border-purple-200',
  DELETE: 'bg-red-50 text-red-700 border-red-200',
};

export const MethodBadge = ({ method, className }: { method: string; className?: string }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-bold tracking-wide',
        METHOD_STYLES[method] ?? 'border-gray-200 bg-gray-50 text-gray-700',
        className
      )}
    >
      {method}
    </span>
  );
};
