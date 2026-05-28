import { Param } from '@/types/documentation/param';
import { cn } from '@/lib/utils';

export const TableContainer = (props: { children: React.ReactNode; params: Param[] }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            {props.params.map((param) => (
              <th
                key={param.name}
                className={cn(
                  'border-b border-r border-gray-200 p-3 text-xs font-semibold uppercase tracking-wider text-gray-500 last:border-r-0',
                  param.name === 'Description' ? 'text-left' : 'text-center'
                )}
              >
                {param.name}
              </th>
            ))}
          </tr>
        </thead>
        {props.children}
      </table>
    </div>
  );
};
