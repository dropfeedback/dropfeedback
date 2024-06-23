import { PropsWithChildren } from "react";
import { AuthHeader } from "@/components/headers/auth-header";

export const LayoutAuthPage = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
        <div className="container mx-4 w-full rounded-lg border p-4 sm:w-fit sm:p-16  ">
          {children}
        </div>
      </div>
    </>
  );
};
