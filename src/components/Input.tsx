import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Shared field styling, also used by Select and the feedback form.
export const fieldClassName = `flex h-10 w-full items-center rounded-lg border bg-background px-3.5 text-base shadow-sm
  transition-[border-color,box-shadow] placeholder:text-gray-400 dark:placeholder:text-neutral-500
  hover:border-gray-300 dark:bg-neutral-900/60 dark:hover:border-neutral-700
  focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15
  dark:focus:border-brand-500 dark:focus:ring-brand-500/20`;

export const Input = ({
  className,
  ...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return <input className={cn(fieldClassName, className)} {...props} />;
};
