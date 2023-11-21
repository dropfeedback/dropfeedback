import { useState } from "react";
import {
  CaretSortIcon,
  CheckCircledIcon,
  CheckIcon,
  CircleIcon,
  CrossCircledIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { cn } from "~/lib/utils";
import { DropdownFilter } from "./dropdown-filter";

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export function Toolbar() {
  return (
    <div className="flex gap-6">
      <div className="relative">
        <Input className="w-[300px] pl-6" placeholder="Search feedbacks" />
        <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform" />
      </div>
      <DropdownFilter title="Type" options={statuses} />
    </div>
  );
}
