import { Param } from '@/types/documentation/param';
import { Badge } from '@/components/shadcn/badge';
import { cn } from '@/lib/utils';

export const TdElement = (props: { children: React.ReactNode; col: number; params: Param[] }) => {
  const shouldWrapInBadge = ['Params', 'Required', 'Default', 'Variables'].includes(props.params[props.col].name);
  const isDescription = props.params[props.col].name === 'Description';

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
