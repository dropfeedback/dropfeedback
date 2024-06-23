import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { FeedbackCategory, FeedbackStatus } from "@/types";
import { Button } from "./ui/button";
import { useFeedbackContext } from "./feedback-provider";
import { Skeleton } from "./ui/skeleton";

const categories: {
  label: string;
  value: FeedbackCategory | FeedbackStatus.archived | "all";
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Issue",
    value: FeedbackCategory.issue,
  },
  {
    label: "Idea",
    value: FeedbackCategory.idea,
  },
  {
    label: "Other",
    value: FeedbackCategory.other,
  },
  {
    label: "Archive",
    value: FeedbackStatus.archived,
  },
];

export function FeedbackRadioGroup() {
  const { counts, filtersAndSorters, setFiltersAndSorters } =
    useFeedbackContext();
  const { filters } = filtersAndSorters;

  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-1">
      {categories.map((category) => {
        return (
          <Button
            key={category.value}
            variant="ghost"
            className={cn(
              "justify-between px-1.5 font-semibold text-muted-foreground transition-colors duration-200 hover:text-muted-foreground",
              {
                "bg-blue-foreground text-blue hover:bg-blue-foreground hover:text-blue":
                  filters.category === undefined &&
                  category.value === "all" &&
                  filters.status !== FeedbackStatus.archived,
                "bg-red-foreground text-red hover:bg-red-foreground hover:text-red":
                  filters.category === FeedbackCategory.issue &&
                  filters.category === category.value,
                "bg-amber-foreground text-amber hover:bg-amber-foreground hover:text-amber":
                  filters.category === FeedbackCategory.idea &&
                  filters.category === category.value,
                "bg-gray-foreground text-gray hover:bg-gray-foreground hover:text-gray":
                  filters.category === FeedbackCategory.other &&
                  filters.category === category.value,
                "bg-stone-100  hover:bg-stone-100  dark:bg-stone-800 hover:dark:bg-stone-800":
                  filters.status === FeedbackStatus.archived,
              },
            )}
            onClick={() => {
              const value = category.value;

              if (value === FeedbackStatus.archived) {
                setFiltersAndSorters((prev) => ({
                  sorters: {
                    updatedAt: Object.values(prev.sorters)[0],
                  },
                  filters: {
                    ...prev.filters,
                    category: undefined,
                    status: FeedbackStatus.archived,
                  },
                }));
                return;
              }

              setFiltersAndSorters((prev) => ({
                sorters: {
                  createdAt: Object.values(prev.sorters)[0],
                },
                filters: {
                  ...prev.filters,
                  status: FeedbackStatus.new,
                  category:
                    value === "all" ? undefined : FeedbackCategory[value],
                },
              }));
            }}
          >
            <div className="flex items-center">
              {category.value === FeedbackStatus.archived ? (
                <DotIcon className="h-6 w-6" />
              ) : (
                <DotFilledIcon
                  className={cn("h-6 w-6", {
                    "text-blue": category.value === "all",
                    "text-red": category.value === FeedbackCategory.issue,
                    "text-amber": category.value === FeedbackCategory.idea,
                    "text-gray": category.value === FeedbackCategory.other,
                  })}
                />
              )}
              {category.label}
            </div>
            {counts[category.value] === undefined ? (
              <Skeleton className="h-6 w-8" />
            ) : (
              <div className="tabular-nums">
                {category.value === "all"
                  ? filters.search === undefined || filters.search === ""
                    ? counts.countNew
                    : (counts.idea ?? 0) +
                      (counts.issue ?? 0) +
                      (counts.other ?? 0)
                  : counts[category.value]}
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
}
