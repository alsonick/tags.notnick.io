'use client';

import { FiAlertCircle, FiAlertTriangle, FiCheck, FiInfo, FiLoader, FiX } from 'react-icons/fi';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

// Round, tinted badge that holds each toast's icon.
const ToastIcon = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-sm', className)}>{children}</span>
);

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme as ToasterProps['theme']) ?? 'system'}
      className="toaster group"
      closeButton
      icons={{
        success: (
          <ToastIcon className="bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
            <FiCheck strokeWidth={3} />
          </ToastIcon>
        ),
        error: (
          <ToastIcon className="bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
            <FiAlertCircle strokeWidth={2.5} />
          </ToastIcon>
        ),
        warning: (
          <ToastIcon className="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
            <FiAlertTriangle strokeWidth={2.5} />
          </ToastIcon>
        ),
        info: (
          <ToastIcon className="bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300">
            <FiInfo strokeWidth={2.5} />
          </ToastIcon>
        ),
        loading: (
          <ToastIcon className="bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-300">
            <FiLoader className="animate-spin" />
          </ToastIcon>
        ),
        close: <FiX />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group/toast flex w-[var(--width)] items-center gap-3 rounded-xl border border-gray-200 bg-white py-3 pl-3 pr-10 shadow-lg shadow-black/[0.06] dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/40',
          icon: 'shrink-0',
          content: 'flex flex-col gap-0.5',
          title: 'text-base font-medium text-gray-900 dark:text-gray-100',
          description: 'text-base text-gray-500 dark:text-gray-400',
          closeButton:
            'absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 opacity-0 transition hover:bg-gray-100 hover:text-black focus-visible:opacity-100 group-hover/toast:opacity-100 dark:text-gray-500 dark:hover:bg-neutral-800 dark:hover:text-white',
          actionButton:
            'ml-auto shrink-0 rounded-md bg-black px-2.5 py-1 text-base font-medium text-white dark:bg-white dark:text-black',
          cancelButton:
            'ml-auto shrink-0 rounded-md px-2.5 py-1 text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-800',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
