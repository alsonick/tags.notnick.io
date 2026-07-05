import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("bg-gray-100 dark:bg-neutral-800 animate-pulse rounded-lg", className)} {...props} />;
}

export { Skeleton };
