import { cn } from "@/lib/utils";

export const Button = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      className={cn(
        `flex items-center justify-center font-medium text-white
      bg-black dark:bg-white dark:text-black p-2 px-4 rounded-lg focus:outline-2`,
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
