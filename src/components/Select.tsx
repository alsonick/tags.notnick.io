import { FiChevronDown } from 'react-icons/fi';
import { fieldClassName } from './Input';
import { cn } from '@/lib/utils';

interface Props {
  options: { value: string; text: string }[];
  onChange: (value: string) => void;
  className?: string;
  value: string;
}

export const Select = (props: Props) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(fieldClassName, 'cursor-pointer appearance-none pr-10', props.className)}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      >
        {props.options.map((option) => (
          <option className="font-inter" key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-gray-400 dark:text-neutral-500" />
    </div>
  );
};
