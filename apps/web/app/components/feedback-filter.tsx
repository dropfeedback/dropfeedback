import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { FeedbackRadioGroup } from "./feedback-radio-group";
import { Button } from "./ui/button";
import { useState } from "react";

export default function FeedbackFilter() {
  const [orderBy, setOrderBy] = useState("desc");

  return (
    <div className="relative w-[300px] shrink-0 border-r">
      <div className="sticky top-20">
        <h3 className="font-semibold">Filter</h3>
        <Separator className="mb-4 mt-2" />
        <div className="space-y-4 pr-4">
          <div className="relative -ml-[13px]">
            <Input placeholder="Search feedbacks" />
            <MagnifyingGlassIcon className="absolute right-2 top-1/2 -translate-y-1/2 transform" />
          </div>
          <FeedbackRadioGroup />
        </div>
        <br />
        <br />
        <h3 className="font-semibold">Sorter</h3>
        <Separator className="mb-4 mt-2" />
        <div className="-ml-3.5 grid grid-cols-2 gap-1.5 pr-4">
          <Button
            variant={orderBy === "desc" ? "outline" : "ghost"}
            onClick={() => setOrderBy("desc")}
          >
            <ArrowDownIcon className="mr-1 h-4 w-4" />
            Newest first
          </Button>
          <Button
            variant={orderBy === "asc" ? "outline" : "ghost"}
            onClick={() => setOrderBy("asc")}
          >
            <ArrowUpIcon className="mr-1 h-4 w-4" />
            Oldest first
          </Button>
        </div>
        <br />
        <br />
        <h3 className="font-semibold">Project ID</h3>
        <Separator className="mb-4 mt-2" />
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-muted-foreground">
            57c19f23-fc16-4bbc-816e-ba26eaeade47
          </p>
          <Button variant="ghost" size="icon" className="h-4 w-4" title="Copy">
            <CopyIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
