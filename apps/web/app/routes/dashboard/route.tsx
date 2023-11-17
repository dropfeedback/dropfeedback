import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "@remix-run/react";
import { ProjectList } from "~/components/project-list";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
  const [_, setSearchParams] = useSearchParams();

  return (
    <div className="container py-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSearchParams(
              (prev) => {
                prev.set("modal", "create-project");
                return prev;
              },
              { replace: true },
            );
          }}
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
      <br />
      <ProjectList />
    </div>
  );
}
