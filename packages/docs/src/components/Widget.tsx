import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

type PopoverSide =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";

type WidgetProps = {
  primaryColor?: string;
  scheme?: "light" | "dark";
  backgroundColor?: string;
  textColor?: string;
  side?: PopoverSide;
  sideOffset?: number;
};

export const Widget = ({
  primaryColor,
  scheme,
  backgroundColor,
  textColor,
  side,
  sideOffset
}: WidgetProps) => {
  const { colorMode } = useColorMode();
  return (
    <div className="widget-container">
      <button
        data-feedback-button
        className="widget-trigger"
        data-permanent-open
        data-side={side ?? "top-start"}
        data-side-offset={sideOffset ?? "12"}
        data-theme-scheme={scheme ?? colorMode}
        data-theme-primary-color={primaryColor}
        data-theme-background-color={backgroundColor}
        data-theme-text-color={textColor}
      >
        Feedback
      </button>
    </div>
  );
};
