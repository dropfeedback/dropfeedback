import { cva, type VariantProps } from "class-variance-authority";

const categoryBadgeVariants = cva(
  "inline-flex select-none items-center rounded-md px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        idea: "bg-amber-foreground text-amber",
        issue: "bg-red-foreground text-red",
        other: "bg-gray-foreground text-gray",
      },
    },
  },
);

export interface FeedbackCategoryBadgeProps
  extends VariantProps<typeof categoryBadgeVariants> {}

function FeedbackCategoryBadge({ variant }: FeedbackCategoryBadgeProps) {
  return <div className={categoryBadgeVariants({ variant })}>{variant}</div>;
}

export { FeedbackCategoryBadge, categoryBadgeVariants };
