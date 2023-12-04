import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { FeedbackRadioGroup } from "./feedback-radio-group";
import { FeedbackCollapsibleArea } from "./feedback-collapsible-area";
import { Button } from "./ui/button";

export function FeedbackFilter() {
  const [orderBy, setOrderBy] = useState("desc");

  return (
    <div className="relative w-full shrink-0 border-r-0 md:w-[280px] md:border-r">
      <div className="sticky top-20">
        <div className="space-y-4">
          <FeedbackCollapsibleArea title="Filter">
            <div className="space-y-4 pr-0 md:pr-4">
              <div className="relative">
                <Input placeholder="Search feedbacks" />
                <MagnifyingGlassIcon className="absolute right-2 top-1/2 -translate-y-1/2 transform" />
              </div>
              <FeedbackRadioGroup />
            </div>
          </FeedbackCollapsibleArea>
          <FeedbackCollapsibleArea title="Sorter">
            <div className="grid grid-cols-2 gap-1.5 pr-0 md:pr-4">
              <Button
                className="px-2 text-muted-foreground hover:text-muted-foreground"
                variant={orderBy === "desc" ? "outline" : "ghost"}
                onClick={() => setOrderBy("desc")}
              >
                <ArrowDownIcon className="mr-1 h-4 w-4" />
                Newest first
              </Button>
              <Button
                className="px-2 text-muted-foreground hover:text-muted-foreground"
                variant={orderBy === "asc" ? "outline" : "ghost"}
                onClick={() => setOrderBy("asc")}
              >
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                Oldest first
              </Button>
            </div>
          </FeedbackCollapsibleArea>
          <FeedbackCollapsibleArea title="Project ID">
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-muted-foreground">
                57c19f23-fc16-4bbc-816e-ba26eaeade47
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 text-muted-foreground"
                title="Copy"
              >
                <CopyIcon />
              </Button>
            </div>
          </FeedbackCollapsibleArea>
        </div>
      </div>
    </div>
  );
}
