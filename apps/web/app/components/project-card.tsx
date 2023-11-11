import { Link } from "@remix-run/react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

type ProjectCardProps = {
  id: string;
  title: string;
  totalFeedbacks: number | string;
  createdAt: string;
  currentPlan?: string;
};

export function ProjectCard({
  id,
  title,
  totalFeedbacks,
  createdAt,
  currentPlan,
}: ProjectCardProps) {
  return (
    <Link to={`/dashboard/${id}`}>
      <Card className="group rounded-lg border-none shadow-border transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">Current plan:</p>
            <Badge variant="outline">{currentPlan}</Badge>
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="font-bold">+{totalFeedbacks}</div>
              <p className="text-xs text-muted-foreground">total feedbacks</p>
            </div>
            <p className="text-xs text-muted-foreground">{createdAt}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
