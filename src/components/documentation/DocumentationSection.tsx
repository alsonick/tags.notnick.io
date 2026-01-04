interface Props {
  children?: React.ReactNode;
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
    <section id={headingId} className={`mt-8 scroll-mt-32 ${showBorder ? 'border-b border-teal-200 pb-4' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4">
        <a href={`#${headingId}`} className="hover:text-teal-600 transition-colors">
          {props.heading}
        </a>
      </h2>
      {props.children}
    </section>
  );
};
