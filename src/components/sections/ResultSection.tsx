interface Props {
  children?: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  title: string;
}

// Card used for each block of generated output (titles, keywords, hashtags, etc).
export const ResultSection = (props: Props) => {
  return (
    <section className="surface mt-6 overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">{props.title}</h3>
          {props.description ? (
            <p className="mt-0.5 text-base text-gray-500 dark:text-gray-400">{props.description}</p>
          ) : null}
        </div>
        {props.actions ? <div className="flex shrink-0 items-center gap-2">{props.actions}</div> : null}
      </div>
      <div className="px-5 py-4">{props.children}</div>
    </section>
  );
};
