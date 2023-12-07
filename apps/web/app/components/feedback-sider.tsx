import { useEffect, useRef, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import debounce from "lodash.debounce";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FeedbackRadioGroup } from "./feedback-radio-group";
import { FeedbackCollapsibleArea } from "./feedback-collapsible-area";
import { useFeedbackContext } from "./feedback-provider";
import { CopyButton } from "./copy-button";

export function FeedbackSider() {
  const [search, setSearch] = useState("");

  const { projectId, filtersAndSorters, setFiltersAndSorters } =
    useFeedbackContext();
  const { sorters } = filtersAndSorters;

  const debouncedSearch = useRef(
    debounce((value) => {
      setFiltersAndSorters((prev) => ({
        ...prev,
        filters: {
          ...prev.filters,
          search: value,
        },
      }));
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative w-full shrink-0 border-r-0 md:w-[280px] md:border-r">
      <div className="sticky top-20">
        <div className="space-y-4">
          <FeedbackCollapsibleArea title="Filter">
            <div className="space-y-4 pr-0 md:pr-4">
              <div className="relative">
                <Input
                  placeholder="Search feedback"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                />
                <MagnifyingGlassIcon className="absolute right-2 top-1/2 -translate-y-1/2 transform" />
              </div>
              <FeedbackRadioGroup />
            </div>
          </FeedbackCollapsibleArea>
          <FeedbackCollapsibleArea title="Sorter">
            <div className="grid grid-cols-2 gap-1.5 pr-0 md:pr-4">
              <Button
                className="px-2 text-muted-foreground hover:text-muted-foreground"
                variant={
                  Object.values(sorters)[0] === "desc" ? "outline" : "ghost"
                }
                onClick={() =>
                  setFiltersAndSorters((prev) => ({
                    ...prev,
                    sorters: Object.fromEntries(
                      Object.entries(prev.sorters).map(([key, value]) => [
                        key,
                        "desc",
                      ]),
                    ),
                  }))
                }
              >
                <ArrowDownIcon className="mr-1 h-4 w-4" />
                Newest first
              </Button>
              <Button
                className="px-2 text-muted-foreground hover:text-muted-foreground"
                variant={
                  Object.values(sorters)[0] === "asc" ? "outline" : "ghost"
                }
                onClick={() =>
                  setFiltersAndSorters((prev) => ({
                    ...prev,
                    sorters: Object.fromEntries(
                      Object.entries(prev.sorters).map(([key, value]) => [
                        key,
                        "asc",
                      ]),
                    ),
                  }))
                }
              >
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                Oldest first
              </Button>
            </div>
          </FeedbackCollapsibleArea>
          <FeedbackCollapsibleArea title="Project ID">
            <div className="flex items-center gap-1.5">
              <p className="text-xs tracking-tight text-muted-foreground">
                {projectId}
              </p>
              <CopyButton
                className="h-4 w-4 text-muted-foreground"
                value={projectId}
              />
            </div>
          </FeedbackCollapsibleArea>
        </div>
      </div>
    </div>
  );
}
