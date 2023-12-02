import { Link } from "@remix-run/react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as dateFns from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { type Project } from "~/types";

export function ProjectCard({ id, name, feedbackCount, createdAt }: Project) {
  const localCreatedAt = dateFns.format(
    dateFns.parseISO(createdAt),
    "MMM dd, yyyy",
  );
  return (
    <Link to={`/dashboard/${id}`}>
      <Card className="group rounded-lg shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </CardHeader>
        <CardContent>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="font-bold">+{feedbackCount}</div>
              <p className="text-xs text-muted-foreground">total feedbacks</p>
            </div>
            <div className="text-right">
              <div className="text-xs">{localCreatedAt}</div>
              <p className="text-xs text-muted-foreground">created at</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
