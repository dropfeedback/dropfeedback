import { CubeIcon } from "@radix-ui/react-icons";

export function ProjectEmptyView() {
  return (
    <div className="flex w-full flex-col items-center justify-center border border-dashed bg-accent/70 px-4 py-16 text-center dark:bg-accent/10">
      <CubeIcon className="h-12 w-12" />
      <h3 className="mt-4 text-lg font-medium">
        You don&apos;t have any projects yet.
      </h3>
      <p className="mt-2 text-muted-foreground">
        Create your first project and start tracking your feedback.
      </p>
    </div>
  );
}
