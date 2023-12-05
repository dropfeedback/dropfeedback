import { useContext, useEffect, useRef, useState } from "react";
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
import { FeedbackContext } from "./feedback-provider";
import { CopyButton } from "./copy-button";

export function FeedbackSider() {
  const [search, setSearch] = useState("");
  const { setCurrentFilter, orderBy, setOrderBy, projectId } =
    useContext(FeedbackContext);

  const debouncedSearch = useRef(
    debounce((value) => {
      setCurrentFilter((prev) => ({ ...prev, search: value }));
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
                  placeholder="Search feedbacks"
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
                variant={orderBy.createdAt === "desc" ? "outline" : "ghost"}
                onClick={() => setOrderBy({ createdAt: "desc" })}
              >
                <ArrowDownIcon className="mr-1 h-4 w-4" />
                Newest first
              </Button>
              <Button
                className="px-2 text-muted-foreground hover:text-muted-foreground"
                variant={orderBy.createdAt === "asc" ? "outline" : "ghost"}
                onClick={() => setOrderBy({ createdAt: "asc" })}
              >
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                Oldest first
              </Button>
            </div>
          </FeedbackCollapsibleArea>
          <FeedbackCollapsibleArea title="Project ID">
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-muted-foreground tracking-tight">{projectId}</p>
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
