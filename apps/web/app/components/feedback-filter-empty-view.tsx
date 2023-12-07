import { MixerHorizontalIcon } from "@radix-ui/react-icons";

export function FeedbackFilterEmptyView() {
  return (
    <div className="flex h-max w-full flex-col items-center border border-dashed bg-accent/70 px-4 py-16 text-center dark:bg-accent/10 ">
      <MixerHorizontalIcon className="h-6 w-6 text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">
        No feedbacks found for this filter.
      </p>
    </div>
  );
}
