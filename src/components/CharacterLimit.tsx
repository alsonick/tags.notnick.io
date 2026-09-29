import { cn } from '@/lib/utils';

interface Props {
  text?: string;
  count?: number;
  limit: number;
  // Renders a progress bar next to the count, used for the 500 character tag budget.
  bar?: boolean;
  className?: string;
}

export const CharacterLimit = (props: Props) => {
  const currentCount = props.text?.length ?? props.count ?? 0;
  const over = currentCount > props.limit;
  const percentage = Math.min((currentCount / props.limit) * 100, 100);

  const label = (
    <p
      className={cn(
        'text-xs tabular-nums shrink-0',
        over ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400',
        !props.bar && props.className
      )}
    >
      {currentCount}/{props.limit}
    </p>
  );

  if (!props.bar) return label;

  return (
    <div className={cn('flex items-center gap-3', props.className)}>
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-800">
        <div
          className={cn('h-full rounded-full transition-all duration-300', over ? 'bg-red-500' : 'bg-brand-500')}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {label}
    </div>
  );
};
