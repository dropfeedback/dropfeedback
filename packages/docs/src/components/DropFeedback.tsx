import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { DropFeedback } from "@dropfeedback/react";

export const DropFeedbackContainer = () => {
  const { colorMode } = useColorMode();
  return <DropFeedback projectId="123" theme={{ scheme: colorMode }} />;
};
