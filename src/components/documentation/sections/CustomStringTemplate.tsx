import { ADDITIONAL_PARAMS } from '@/lib/documentation/params';
import { VALUES_VARIABLES } from '@/lib/documentation/values';
import { DocumentationNote } from '../ui/DocumentationNote';
import { TableContainer } from '../ui/TableContainer';
import { Badge } from '@/components/shadcn/badge';
import { CodeBlock } from '../ui/CodeBlock';
import { TdElement } from '../ui/TdElement';

export const CustomStringTemplate = () => {
  const rowsVariables = [];

  for (let i = 0; i < VALUES_VARIABLES.length; i += ADDITIONAL_PARAMS.length) {
    rowsVariables.push(VALUES_VARIABLES.slice(i, i + ADDITIONAL_PARAMS.length));
  }
  return (
    <div className="flex flex-col">
      <CodeBlock language="template" code={'{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}'} />
      <p className="my-4 text-gray-700 dark:text-gray-300">
        You might be wondering what the <Badge variant={'secondary'}>{'{}'}</Badge> parts are, we call them{' '}
        <i>variables</i>, and the letters inside them signify where the components of a song belong to. Let's take this
        song for example:
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <Badge variant={'secondary'}>Rex Orange County - Pluto Projector</Badge>
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We break down the song into components and place them into their respective parts.{' '}
        <Badge variant={'secondary'}>{'{a}'}</Badge> is for the 'artist' and{' '}
        <Badge variant={'secondary'}>{'{t}'}</Badge> is for the 'title'. To use your custom string template, you must
        provide the song followed by a forward slash which is then followed by the string template you want to use.
        Here's an example:
      </p>
      <CodeBlock
        language="template"
        code={'Rex Orange County - Pluto Projector/{a} {t} lyrics,{t} lyrics,lyrics {t},{a} {t}'}
      />
      <p className="mb-4 mt-6 text-gray-700 dark:text-gray-300">
        Here are the available variables you can use in your custom string template:
      </p>
      <TableContainer params={ADDITIONAL_PARAMS}>
        <tbody>
          {rowsVariables.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors hover:bg-gray-50/70 dark:hover:bg-neutral-800/50">
              {row.map((value, index) => (
                <TdElement key={index} col={index} params={ADDITIONAL_PARAMS}>
                  {value.placeholder}
                </TdElement>
              ))}
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <DocumentationNote>
        We only support up to <b>three</b> features. Supporting more wouldn't help with ranking optimization, since the
        first 2-3 features on a song typically carry the most ranking weight, and the most well-known features are
        usually listed first. Viewers rarely search for a song using its full feature list.
      </DocumentationNote>
    </div>
  );
};
