import { ADDITIONAL_PARAMS } from '@/lib/documentation/params';
import { VALUES_VARIABLES } from '@/lib/documentation/values';
import { DocumentationNote } from '../ui/DocumentationNote';
import { TableContainer } from '../ui/TableContainer';
import { Badge } from '@/components/shadcn/badge';
import { CodeBlock } from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const TdElement = (props: { children: React.ReactNode; col: number }) => {
  const shouldWrapInBadge = ['Variables', 'Required'].includes(ADDITIONAL_PARAMS[props.col].name);
  const isDescription = ADDITIONAL_PARAMS[props.col].name === 'Description';

  return (
    <td
      className={cn(
        'border-b border-r border-gray-200 p-3 align-top text-gray-700 marker:text-gray-700 last:border-r-0',
        isDescription ? 'text-left' : 'whitespace-nowrap text-center'
      )}
    >
      {shouldWrapInBadge ? (
        <div className="flex justify-center">
          <Badge variant="secondary">{props.children}</Badge>
        </div>
      ) : (
        props.children
      )}
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
      <CodeBlock language="template" code={'{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}'} />
      <p className="my-4 text-gray-700">
        You might be wondering what the <Badge variant={'secondary'}>{'{}'}</Badge> parts are, we call them{' '}
        <i>variables</i>, and the letters inside them signify where the components of a song belong to. Let's take this
        song for example:
      </p>
      <p className="mb-4 text-gray-700">
        <Badge variant={'secondary'}>Rex Orange County – Pluto Projector</Badge>
      </p>
      <p className="mb-4 text-gray-700">
        We break down the song into components and place them into their respective parts.{' '}
        <Badge variant={'secondary'}>{'{a}'}</Badge> is for the 'artist' and <Badge variant={'secondary'}>{'{b}'}</Badge>{' '}
        is for the 'title'. To use your custom string template, you must provide the song followed by a forward slash
        which is then followed by the string template you want to use. Here's an example:
      </p>
      <CodeBlock
        language="template"
        code={'Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}'}
      />
      <p className="mb-4 mt-6 text-gray-700">Here are the available variables you can use in your custom string template:</p>
      <TableContainer params={ADDITIONAL_PARAMS}>
        <tbody>
          {rowsVariables.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors hover:bg-gray-50/70">
              {row.map((value, index) => (
                <TdElement key={index} col={index}>
                  {value.placeholder}
                </TdElement>
              ))}
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <DocumentationNote>
        We only support <b>three</b> features.
      </DocumentationNote>
    </div>
  );
};
