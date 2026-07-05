import { Param } from '@/types/documentation/param';
import { Badge } from '@/components/shadcn/badge';
import { cn } from '@/lib/utils';

export const TdElement = (props: { children: React.ReactNode; col: number; params: Param[] }) => {
  const shouldWrapInBadge = ['Params', 'Required', 'Default', 'Variables'].includes(props.params[props.col].name);
  const isDescription = props.params[props.col].name === 'Description';

  return (
    <td
      className={cn(
        'border-b border-r border-gray-200 dark:border-neutral-800 p-3 align-top text-gray-700 marker:text-gray-700 dark:text-gray-300 dark:marker:text-gray-300 last:border-r-0 [tr:last-child>&]:border-b-0',
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
