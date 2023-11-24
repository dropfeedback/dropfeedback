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
    <div className="-ml-3.5 flex flex-col gap-1.5">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant="ghost"
          className={cn(
            "justify-between px-1.5 font-semibold text-muted-foreground transition-colors duration-200 hover:text-muted-foreground",
            {
              "border border-blue-500 bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500":
                selected === "all" && selected === category.value,
              "border border-red-500 bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500":
                selected === "issue" && selected === category.value,
              "border border-orange-500 bg-orange-50 text-orange-500 hover:bg-orange-50 hover:text-orange-500":
                selected === "idea" && selected === category.value,
              "border border-slate-500 bg-slate-50 text-slate-500 hover:bg-slate-50 hover:text-slate-500":
                selected === "other" && selected === category.value,
              "border border-stone-500 bg-stone-50 text-stone-500 hover:bg-stone-50 hover:text-stone-500":
                selected === "archive" && selected === category.value,
            },
          )}
          onClick={() => setSelected(category.value)}
        >
          <div className="flex items-center">
            {category.value === "archive" ? (
              <DotIcon className="h-6 w-6 text-stone-500" />
            ) : (
              <DotFilledIcon
                className={cn("h-6 w-6", {
                  "text-blue-500": category.value === "all",
                  "text-red-500": category.value === "issue",
                  "text-orange-500": category.value === "idea",
                  "text-slate-500": category.value === "other",
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
