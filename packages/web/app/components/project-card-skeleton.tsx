import { Skeleton } from "./ui/skeleton";

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg border p-6">
      <Skeleton className="h-5" />
      <div className="mt-4 flex items-end justify-between">
        <div className="w-full space-y-1">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </div>
        <div className="flex w-full flex-col items-end gap-1">
          <Skeleton className="h-4 w-2/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}
