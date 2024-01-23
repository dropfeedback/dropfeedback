import React from "react";
import { useColorMode } from "@docusaurus/theme-common";

type WidgetProps = {
  primaryColor?: string;
  scheme?: "light" | "dark";
  backgroundColor?: string;
  textColor?: string;
};

export const Widget = ({
  primaryColor,
  scheme,
  backgroundColor,
  textColor,
}: WidgetProps) => {
  const { colorMode } = useColorMode();
  return (
    <div className="widget-container">
      <button
        data-feedback-button
        className="widget-trigger"
        data-permanent-open
        data-side="top"
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
