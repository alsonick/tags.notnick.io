import { PARAMS } from "@/lib/documentation/params";
import { VALUES } from "@/lib/documentation/values";

export const WhatToProvide = () => {
  const rows = [];

  for (let i = 0; i < VALUES.length; i += PARAMS.length) {
    rows.push(VALUES.slice(i, i + PARAMS.length));
  }

  return (
    <table className="table-auto border w-full border-teal-100">
      <thead>
        <tr className="border border-teal-100">
          {PARAMS.map((param) => (
            <th key={param.name} className="p-2 border border-teal-100">
              {param.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border border-teal-100">
            {row.map((value, colIndex) => (
              <td
                key={colIndex}
                className={`p-2 border border-teal-100 text-gray-800 ${
                  PARAMS[colIndex].name === "Description" ? "text-left" : "text-center"
                }`}
              >
                {value.placeholder}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
