import { ADDITIONAL_PARAMS } from '@/lib/documentation/params';
import { Badge } from '@/components/shadcn/badge';
import { VALUES_VARIABLES } from '@/lib/documentation/values';
import { TableContainer } from '../ui/TableContainer';

const TdElement = (props: { children: React.ReactNode; col: number }) => {
  const shouldWrapInBadge = ['Variables', 'Required'].includes(ADDITIONAL_PARAMS[props.col].name);

  return (
    <td
      className={`p-2 border border-teal-100 text-gray-800 marker:text-gray-800 ${
        ADDITIONAL_PARAMS[props.col].name === 'Description' ? 'text-left' : 'text-center'
      }`}
    >
      {shouldWrapInBadge ? <Badge variant="secondary">{props.children}</Badge> : props.children}
    </td>
  );
};

export const CustomStringTemplate = () => {
  const rowsVariables = [];

  for (let i = 0; i < VALUES_VARIABLES.length; i += ADDITIONAL_PARAMS.length) {
    rowsVariables.push(VALUES_VARIABLES.slice(i, i + ADDITIONAL_PARAMS.length));
  }
  return (
    <div className="flex flex-col">
      {' '}
      <p className="mb-4 text-gray-800">
        <Badge variant={'secondary'}>{'{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}'}</Badge>
      </p>
      <p className="mb-4 text-gray-800">
        You might be wondering what the <Badge variant={'secondary'}>{'{}'}</Badge> parts are, we call them{' '}
        <i>variables</i>, and the letters inside them signify where the components of a song belong to. Let's take this
        song for example:
      </p>
      <p className="text-gray-800 mb-4">
        <Badge variant={'secondary'}>Rex Orange County – Pluto Projector</Badge>
      </p>
      <p className="text-gray-800 mb-4">
        We break down the song into components and place them into their respective parts.{' '}
        <Badge variant={'secondary'}>{'{a}'}</Badge> is for the 'artist' and{' '}
        <Badge variant={'secondary'}>{'{b}'}</Badge> is for the 'title'. To use your custom string template, you must
        provide the song followed by a forward slash which is then followed by the string template you want to use.
        Here's an example:
      </p>
      <p className="text-gray-800">
        <Badge variant={'secondary'}>
          {'Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}'}
        </Badge>
      </p>
      <p className="text-gray-800 mt-4">Here are the available variables you can use in your custom string template:</p>
      <div className="mt-6">
        <TableContainer params={ADDITIONAL_PARAMS}>
          <tbody>
            {rowsVariables.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-teal-100">
                {row.map((value, index) => (
                  <TdElement key={index} col={index}>
                    {value.placeholder}
                  </TdElement>
                ))}
              </tr>
            ))}
          </tbody>
        </TableContainer>
      </div>
    </div>
  );
};
