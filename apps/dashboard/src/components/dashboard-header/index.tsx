import React, { FC, PropsWithChildren } from "react";

export const DashboardHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4">{children}</div>
    </div>
  );
};
