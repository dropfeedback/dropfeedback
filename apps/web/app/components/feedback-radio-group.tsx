import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";

const categories = [
  {
    label: "All",
    value: "all",
    count: 42,
  },
  {
    label: "Issue",
    value: "issue",
    count: 12,
  },
  {
    label: "Idea",
    value: "idea",
    count: 20,
  },
  {
    label: "Other",
    value: "other",
    count: 10,
  },
  {
    label: "Archive",
    value: "archive",
    count: 0,
  },
];

export function FeedbackRadioGroup() {
  const [selected, setSelected] = useState("all");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1.5">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant="ghost"
          className={cn(
            "justify-between px-1.5 font-semibold text-muted-foreground transition-colors duration-200 hover:text-muted-foreground",
            {
              "bg-blue-foreground text-blue hover:bg-blue-foreground hover:text-blue":
                selected === "all" && selected === category.value,
              "bg-red-foreground text-red hover:bg-red-foreground hover:text-red":
                selected === "issue" && selected === category.value,
              "bg-amber-foreground text-amber hover:bg-amber-foreground hover:text-amber":
                selected === "idea" && selected === category.value,
              "bg-gray-foreground text-gray hover:bg-gray-foreground hover:text-gray":
                selected === "other" && selected === category.value,
              "bg-stone-100  hover:bg-stone-100  dark:bg-stone-800 hover:dark:bg-stone-800":
                selected === "archive" && selected === category.value,
            },
          )}
          onClick={() => setSelected(category.value)}
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
          <div className="tabular-nums">{category.count}</div>
        </Button>
      ))}
    </div>
  );
}
