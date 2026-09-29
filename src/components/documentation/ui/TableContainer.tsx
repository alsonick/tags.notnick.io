import { Param } from '@/types/documentation/param';

export const TableContainer = (props: { children: React.ReactNode; params: Param[] }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800">
      <table className="w-full table-auto border-collapse text-base">
        <thead>
          <tr className="bg-gray-50 dark:bg-neutral-900">
            {props.params.map((param) => (
              <th
                key={param.name}
                className="border-b border-gray-200 dark:border-neutral-800 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
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
