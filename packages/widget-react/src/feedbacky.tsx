"use client";

import React from "react";
import "@feedbacky/widget-core";

export interface FeedbackyProps {
  projectId: string;
  theme?: {
    scheme?: "light" | "dark";
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  position?: "left" | "right";
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "feedbacky-widget": {
        "project-id": string;
        "theme-scheme"?: "light" | "dark";
        "theme-primary-color"?: string;
        "theme-background-color"?: string;
        "theme-text-color"?: string;
        position?: "left" | "right";
      };
    }
  }
}

export const Feedbacky = ({ projectId, position, theme }: FeedbackyProps) => {
  return (
    <feedbacky-widget
      project-id={projectId}
      position={position}
      theme-scheme={theme?.scheme}
      theme-primary-color={theme?.primaryColor}
      theme-background-color={theme?.backgroundColor}
      theme-text-color={theme?.textColor}
    />
  );
};
