import { CubeIcon } from "@radix-ui/react-icons";

export function ProjectEmptyView() {
  return (
    <div className="flex w-full flex-col items-center justify-center border border-dashed px-4 py-8">
      <CubeIcon className="h-12 w-12" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        You don't have any projects yet.
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Create your first project and start tracking your feedback.
      </p>
    </div>
  );
}
