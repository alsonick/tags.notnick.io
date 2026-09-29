import { Badge } from '@/components/shadcn/badge';

interface Props {
  children?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: string;
  title: string;
}

// Heading block shared by the secondary pages (FAQ, changelog, documentation, etc).
export const PageHeader = (props: Props) => {
  return (
    <header className="mt-8 border-b pb-8">
      {props.eyebrow ? (
        <Badge className="mb-3 border-brand-100 bg-brand-50 text-brand-700 dark:border-brand-900 dark:bg-brand-950 dark:text-brand-400">
          {props.eyebrow}
        </Badge>
      ) : null}
      <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">{props.title}</h1>
      {props.description ? (
        <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-400">{props.description}</p>
      ) : null}
      {props.children}
    </header>
  );
};
