import { Param } from '@/types/documentation/param';
import { Badge } from '@/components/shadcn/badge';

export const TdElement = (props: { children: React.ReactNode; col: number; params: Param[] }) => {
  const shouldWrapInBadge = ['Params', 'Required', 'Default', 'Variables'].includes(props.params[props.col].name);

  return (
    <td
      className={`p-2 border border-teal-100 text-gray-800 marker:text-gray-800 ${
        props.params[props.col].name === 'Description' ? 'text-left' : 'text-center'
      }`}
    >
      {shouldWrapInBadge ? <Badge variant="secondary">{props.children}</Badge> : props.children}
    </td>
  );
};
