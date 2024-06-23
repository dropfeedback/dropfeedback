import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const FeedbackTooltip = (props: {
  children: React.ReactNode;
  tooltip: string;
}) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{props.children}</TooltipTrigger>
      <TooltipContent sideOffset={5}>{props.tooltip}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
