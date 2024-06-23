import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";

export function FeedbackCollapsibleArea({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [permanentOpen, setPermanentOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPermanentOpen(false);
    }

    function handleResize(event: UIEvent) {
      const width = (event.target as Window).innerWidth;

      if (width >= 768) {
        setPermanentOpen(true);
      } else {
        setPermanentOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Collapsible open={permanentOpen || isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className="flex w-full items-center justify-between"
          aria-label="Toggle collapsible area"
          disabled={permanentOpen}
        >
          <span className="sr-only">Toggle</span>
          <h3 className="font-medium">{title}</h3>
          {!permanentOpen && (isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />)}
        </button>
      </CollapsibleTrigger>
      <Separator className="mb-4 mt-2" />
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
