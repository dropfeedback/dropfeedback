import { useSearchParams } from "@remix-run/react";
import { UserInviteList } from "~/components/user-invite-list";
import { ProjectList } from "~/components/project-list";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function Dashboard() {
  const [_, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="container flex flex-wrap items-center justify-between gap-4 py-8 ">
        <div>
          <h2 className="text-3xl tracking-wide">Projects</h2>
          <p className="mt-1 text-muted-foreground">
            List of projects you have access to.
          </p>
        </div>
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
          Create Project
        </Button>
      </div>
      <Separator />
      <UserInviteList />
      <div className="h-full bg-accent/50 py-4 dark:bg-background md:py-8">
        <div className="container">
          <ProjectList />
        </div>
      </div>
    </>
  );
}
