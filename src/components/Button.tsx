import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Every button on the site shares one size; the variant only changes the colors.
export const buttonVariants = cva(
  `inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 text-base font-medium select-none
  transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2
  focus-visible:ring-offset-background [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        primary:
          'bg-black text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200',
        secondary:
          'border bg-background text-gray-900 shadow-sm hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-neutral-900',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ variant, className, ...props }: Props) => {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)}>
      {props.children}
    </button>
  );
};
