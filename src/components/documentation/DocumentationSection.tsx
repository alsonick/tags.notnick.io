import { cn } from '@/lib/utils';

interface Props {
  children?: React.ReactNode;
  description?: string;
  border?: boolean;
  heading: string;
}

export const DocumentationSection = (props: Props) => {
  const showBorder = props.border !== false;
  const headingId = props.heading
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return (
    <section id={headingId} className={cn('scroll-mt-32 pt-12', showBorder && 'border-b border-gray-100 dark:border-neutral-800 pb-12')}>
      <h2 className="group flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        <a href={`#${headingId}`} className="transition-colors hover:text-brand-600">
          {props.heading}
        </a>
        <a
          href={`#${headingId}`}
          aria-label={`Link to ${props.heading}`}
          className="ml-2 text-gray-300 dark:text-gray-600 opacity-0 transition-opacity hover:text-brand-500 group-hover:opacity-100"
        >
          #
        </a>
      </h2>
      {props.description ? <p className="mb-6 mt-2 text-gray-700 dark:text-gray-300">{props.description}</p> : <div className="mb-6" />}
      {props.children}
    </section>
  );
};
