import { Skeleton } from "./ui/skeleton";

export function FeedbackDetailContentSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-14" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
