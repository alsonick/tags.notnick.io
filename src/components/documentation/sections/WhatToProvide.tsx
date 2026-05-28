import { VALUES_GENERATE, VALUES_LENGTH } from '@/lib/documentation/values';
import { TableContainer } from '../ui/TableContainer';
import { PARAMS } from '@/lib/documentation/params';
import { Badge } from '@/components/shadcn/badge';
import { TdElement } from '../ui/TdElement';

export const WhatToProvide = (props: { endpoint: 'generate' | 'length' }) => {
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
      {props.endpoint === 'generate' ? (
        <TableContainer params={PARAMS}>
          <tbody>
            {rowsGenerate.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors hover:bg-gray-50/70">
                {row.map((value, index) =>
                  value.list ? (
                    <TdElement key={index} col={index} params={PARAMS}>
                      <ul className="ml-4 list-disc">
                        {value.list.map((val) => (
                          <li key={val} className="mb-2 last:mb-0">
                            <Badge variant="secondary">{val}</Badge>
                          </li>
                        ))}
                      </ul>
                    </TdElement>
                  ) : (
                    <TdElement key={index} col={index} params={PARAMS}>
                      {value.placeholder}
                    </TdElement>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </TableContainer>
      ) : (
        <TableContainer params={PARAMS}>
          <tbody>
            {rowsLength.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition-colors hover:bg-gray-50/70">
                {row.map((value, index) => (
                  <TdElement key={index} col={index} params={PARAMS}>
                    {value.placeholder}
                  </TdElement>
                ))}
              </tr>
            ))}
          </tbody>
        </TableContainer>
      )}
    </>
  );
};
