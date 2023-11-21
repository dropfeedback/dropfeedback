import { formatDistance } from "date-fns";
import { forwardRef } from "react";
import { type Feedback } from "~/types";

export const FeedbackCard = forwardRef<HTMLDivElement, Feedback>(
  function FeedbackCard(props, ref) {
    return (
      <div
        ref={ref}
        className="min-h-[90px] border-b transition-colors hover:bg-accent"
      >
        <div className="space-y-0.5 p-2">
          <div className="flex justify-between items-center">
            <div className="font-semibold">salihozdemir@gmail.com</div>
            <div className="text-muted-foreground text-xs">
              {formatDistance(new Date(props.createdAt), new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </div>
          </div>
          <div className="text-xs">General</div>
          <p className="line-clamp-3 text-xs text-muted-foreground">
            {props.content}
          </p>
        </div>
      </div>
    );
  },
);
