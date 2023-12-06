import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useFeedbackContext } from "./feedback-provider";
import { Skeleton } from "./ui/skeleton";
import { cn } from "~/lib/utils";
import { FeedbackCategory, FeedbackStatus } from "~/types";

const categories: {
  label: string;
  value: "all" | "issue" | "idea" | "other" | "archive";
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Issue",
    value: "issue",
  },
  {
    label: "Idea",
    value: "idea",
  },
  {
    label: "Other",
    value: "other",
  },
  {
    label: "Archive",
    value: "archive",
  },
];

export function FeedbackRadioGroup() {
  const { counts, filtersAndSorters, setFiltersAndSorters } =
    useFeedbackContext();
  const { filters } = filtersAndSorters;

  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-1">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant="ghost"
          className={cn(
            "justify-between px-1.5 font-semibold text-muted-foreground transition-colors duration-200 hover:text-muted-foreground",
            {
              "bg-blue-foreground text-blue hover:bg-blue-foreground hover:text-blue":
                filters.category === undefined &&
                category.value === "all" &&
                filters.status !== "archived",
              "bg-red-foreground text-red hover:bg-red-foreground hover:text-red":
                filters.category === "issue" &&
                filters.category === category.value,
              "bg-amber-foreground text-amber hover:bg-amber-foreground hover:text-amber":
                filters.category === "idea" &&
                filters.category === category.value,
              "bg-gray-foreground text-gray hover:bg-gray-foreground hover:text-gray":
                filters.category === "other" &&
                filters.category === category.value,
              "bg-stone-100  hover:bg-stone-100  dark:bg-stone-800 hover:dark:bg-stone-800":
                filters.status === "archived" && category.value === "archive",
            },
          )}
          onClick={() => {
            const value = category.value;

            if (value === "archive") {
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
                category: value === "all" ? undefined : FeedbackCategory[value],
              },
            }));
          }}
        >
          <div className="flex items-center">
            {category.value === "archive" ? (
              <DotIcon className="h-6 w-6" />
            ) : (
              <DotFilledIcon
                className={cn("h-6 w-6", {
                  "text-blue": category.value === "all",
                  "text-red": category.value === "issue",
                  "text-amber": category.value === "idea",
                  "text-gray": category.value === "other",
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
      ))}
    </div>
  );
}
