import { cn } from "~/lib/utils";

export function LoadingIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "repeat-infinite; box-border inline-block h-4 w-4 animate-spin rounded-full border-2 border-inherit border-b-transparent",
        className,
      )}
    />
  );
}
