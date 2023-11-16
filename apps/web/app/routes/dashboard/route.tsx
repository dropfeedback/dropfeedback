import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ProjectList } from "~/components/project-list";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
  return (
    <div className="container py-6">
      <div className="flex justify-end">
        <Button>
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
      <br />
      <ProjectList />
    </div>
  );
}
