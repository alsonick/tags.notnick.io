interface Props {
  children?: React.ReactNode;
  heading: string;
}

export const DocumentationSection = (props: Props) => (
  <section className="mt-8 border-b">
    <h1 className="text-2xl font-bold mb-4">{props.heading}</h1>
    {props.children}
  </section>
);
