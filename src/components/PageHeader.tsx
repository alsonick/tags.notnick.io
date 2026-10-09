interface Props {
  children?: React.ReactNode;
  description?: React.ReactNode;
  title: string;
}

// Heading block shared by the secondary pages (FAQ, changelog, documentation, etc).
export const PageHeader = (props: Props) => {
  return (
    <header className="mt-8 border-b pb-8">
      <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">{props.title}</h1>
      {props.description ? (
        <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-400">{props.description}</p>
      ) : null}
      {props.children}
    </header>
  );
};
