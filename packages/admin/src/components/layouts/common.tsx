import { PropsWithChildren } from "react";
import { CommonHeader } from "@/components/headers/common-header";

export const LayoutCommon = ({ children }: PropsWithChildren) => {
  return (
    <>
      <CommonHeader />
      <div className="flex h-[calc(100vh-4rem)] flex-col">{children}</div>
    </>
  );
};
