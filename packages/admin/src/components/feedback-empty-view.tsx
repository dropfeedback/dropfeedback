import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function FeedbackEmptyView() {
  return (
    <div className="flex h-max w-full flex-col items-center justify-center border border-dashed bg-accent/70 px-4 py-16 text-center dark:bg-accent/10">
      <ChatBubbleIcon className="h-12 w-12" />
      <h3 className="mt-4 text-lg font-medium">There is no feedback yet. </h3>
      <p className="mt-2 text-muted-foreground">
        Connect to widget and start collecting feedback.
      </p>
      <Button className="mt-4" asChild>
        <Link to="#">Learn more</Link>
      </Button>
    </div>
  );
}
