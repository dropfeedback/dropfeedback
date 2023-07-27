import React, { Suspense, useState } from "react";
import { cn, useFeedbacks } from "@/lib";
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";

interface Props {
  projectId: string;
  className?: string;
}

export const FeedbackList = ({ projectId, className }: Props) => {
  const [search, setSearch] = useState("");

  const { data: feedbacks = [], refetch } = useFeedbacks({
    projectId,
    search,
  });

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto",
        "flex flex-col gap-8",
        className,
      )}
    >
      <div className={cn("flex items-center gap-2")}>
        <Input
          type="search"
          placeholder="Search in feedbacks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline" onClick={() => refetch()}>
          <SymbolIcon />
        </Button>
      </div>

      {feedbacks.map((feedback) => {
        const metaKeys = Object.keys(feedback?.meta || {});

        return (
          <div
            key={feedback.id}
            className={cn(
              "w-full",
              "flex flex-col",
              "border shadow-lg rounded-xl",
              "bg-card text-card-foreground",
            )}
          >
            <div
              className={cn(
                "p-4",
                "flex items-center justify-end",
                "rounded-t-xl",
                "bg-zinc-950 dark:bg-zinc-900",
              )}
            >
              <p className={cn("text-xs text-muted-foreground self-end")}>
                {new Date(feedback.createdAt).toDateString()}
              </p>
            </div>

            <p className={cn("pt-4 px-4")}>{feedback.content}</p>

            <Separator className="my-4" />

            <div
              className={cn("px-4 pb-4", "flex items-center justify-between")}
            >
              <div>
                <div
                  className={cn(
                    "text-sm font-bold capitalize text-muted-foreground",
                  )}
                >
                  Page
                </div>
                <div className={cn("text-sm font-bold")}>
                  {feedback.origin || "-"}
                </div>
              </div>
              <div>
                <div
                  className={cn(
                    "text-sm font-bold capitalize text-muted-foreground",
                  )}
                >
                  Device
                </div>
                <div className={cn("text-sm font-bold")}>
                  {feedback.device || "-"}
                </div>
              </div>
            </div>

            {!!metaKeys && (
              <div
                className={cn(
                  "flex flex-wrap gap-4",
                  "rounded-b-xl",
                  "bg-zinc-950 dark:bg-zinc-900",
                  "px-4 py-2",
                  "border-t",
                )}
              >
                {metaKeys.map((key) => {
                  return (
                    <div
                      key={key}
                      className={cn("flex items-center justify-between")}
                    >
                      <div>
                        <div
                          className={cn(
                            "text-sm font-bold capitalize text-muted-foreground",
                          )}
                        >
                          {key}
                        </div>
                        <div className={cn("text-sm font-bold")}>
                          {feedback?.meta?.[key] || "-"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
