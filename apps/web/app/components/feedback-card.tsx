import { formatDistance } from "date-fns";
import { cn } from "~/lib/utils";
import { type Feedback } from "~/types";
import { Button } from "./ui/button";

export function FeedbackCard({
  id,
  content,
  createdAt,
  openedCardId,
  setOpenedCardId,
}: Feedback & {
  openedCardId?: string;
  setOpenedCardId: (id: string) => void;
}) {
  const isOpen = openedCardId === id;
  return (
    <button
      className={cn("block w-full border-b text-left transition-all", {
        "my-4 rounded-md border-x border-t bg-accent": isOpen,
      })}
      onClick={() => setOpenedCardId(id)}
    >
      <div className="flex h-full flex-col gap-0.5 p-2 first:mt-0">
        <div className="flex items-center justify-between">
          <div className="font-semibold">salihozdemir@gmail.com</div>
          <div className="text-xs text-muted-foreground">
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </div>
        </div>
        <div className="text-xs">General</div>
        <p
          className={cn("line-clamp-3 h-full text-xs text-muted-foreground", {
            "line-clamp-none": isOpen,
          })}
        >
          {content + " " + content + " " + content}
        </p>
        {isOpen && (
          <div className="flex justify-end">
            <Button size="sm" variant="outline">
              Details
            </Button>
          </div>
        )}
      </div>
    </button>
  );
}
