import { PropsWithChildren } from "react";
import { ProjectHeader } from "@/components/headers/project-header";

export const LayoutProject = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <ProjectHeader />
      <div>{children}</div>
    </div>
  );
};
