export const Step = ({
  step,
  text,
  required,
  children,
}: {
  step: number;
  text: string;
  required?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center shrink-0 h-5 w-5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-semibold tabular-nums">
          {step}
        </div>
        <p className="ml-2 text-base font-medium text-black dark:text-white">{text}</p>
        {required ? (
          <span className="ml-2 rounded-full bg-amber-100 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
            Required
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
};
