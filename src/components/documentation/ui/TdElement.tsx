import { Param } from '@/types/documentation/param';
import { cn } from '@/lib/utils';

// Columns whose values are identifiers: param names, bot options, commands and template variables.
const NAME_COLUMNS = ['Params', 'Option', 'Command', 'Variables'];

export const TdElement = (props: { children: React.ReactNode; col: number; params: Param[] }) => {
  const column = props.params[props.col].name;
  const isDescription = column === 'Description';

  let content = props.children;

  if (NAME_COLUMNS.includes(column)) {
    content = (
      <code className="font-mono text-[13px] font-semibold text-gray-900 dark:text-gray-100">{props.children}</code>
    );
  } else if (column === 'Required') {
    content =
      props.children === 'Yes' ? (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
          Required
        </span>
      ) : (
        <span className="text-xs text-gray-400 dark:text-gray-500">Optional</span>
      );
  } else if (column === 'Default') {
    content = <code className="font-mono text-[13px] text-gray-500 dark:text-gray-400">{props.children}</code>;
  }

  return (
    <td
      className={cn(
        'border-b border-gray-200 dark:border-neutral-800 px-4 py-3 align-top text-left text-gray-700 dark:text-gray-300 [tr:last-child>&]:border-b-0',
        isDescription ? 'w-full' : 'whitespace-nowrap'
      )}
    >
      {content}
    </td>
  );
};
