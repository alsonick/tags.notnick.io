import { Param } from '@/types/documentation/param';

export const TableContainer = (props: { children: React.ReactNode; params: Param[] }) => {
  return (
    <table className="table-auto border w-full border-teal-100 mb-4">
      <thead>
        <tr className="border border-teal-100">
          {props.params.map((param) => (
            <th key={param.name} className="p-2 border border-teal-100">
              {param.name}
            </th>
          ))}
        </tr>
      </thead>
      {props.children}
    </table>
  );
};
