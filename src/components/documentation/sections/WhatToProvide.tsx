import { VALUES_GENERATE, VALUES_LENGTH } from "@/lib/documentation/values";
import { PARAMS } from "@/lib/documentation/params";

const TdElement = (props: { children: React.ReactNode; col: number }) => {
  return (
    <td
      className={`p-2 border border-teal-100 text-gray-800 marker:text-gray-800 ${
        PARAMS[props.col].name === "Description" ? "text-left" : "text-center"
      }`}
    >
      {props.children}
    </td>
  );
};

const TableContainer = (props: { children: React.ReactNode }) => {
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
      {props.children}
    </table>
  );
};

export const WhatToProvide = (props: { endpoint: "generate" | "length" }) => {
  const rowsGenerate = [];
  const rowsLength = [];

  for (let i = 0; i < VALUES_GENERATE.length; i += PARAMS.length) {
    rowsGenerate.push(VALUES_GENERATE.slice(i, i + PARAMS.length));
  }

  for (let i = 0; i < VALUES_LENGTH.length; i += PARAMS.length) {
    rowsLength.push(VALUES_LENGTH.slice(i, i + PARAMS.length));
  }

  return (
    <>
      {props.endpoint === "generate" ? (
        <TableContainer>
          <tbody>
            {rowsGenerate.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-teal-100">
                {row.map((value, colIndex) => (
                  <>
                    {value.list ? (
                      <TdElement col={colIndex}>
                        <ul className="list-disc ml-4">
                          {value.list.map((val) => (
                            <li>{val}</li>
                          ))}
                        </ul>
                      </TdElement>
                    ) : (
                      <TdElement col={colIndex}>{value.placeholder}</TdElement>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </TableContainer>
      ) : (
        <TableContainer>
          <tbody>
            {rowsLength.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-teal-100">
                {row.map((value, index) => (
                  <TdElement col={index}>{value.placeholder}</TdElement>
                ))}
              </tr>
            ))}
          </tbody>
        </TableContainer>
      )}
    </>
  );
};
