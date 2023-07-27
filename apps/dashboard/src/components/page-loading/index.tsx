import { cn } from "@/lib";
import React from "react";

export const PageLoading = () => {
  return (
    <div
      className={cn(
        "min-h-screen max-w-sm mx-auto",
        "flex items-center justify-center",
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <h1
          className={cn(
            "text-5xl font-bold text-center text-blue-500",
            "animate-pulse",
          )}
        >
          Feedbacky
        </h1>
      </div>
    </div>
  );
};
