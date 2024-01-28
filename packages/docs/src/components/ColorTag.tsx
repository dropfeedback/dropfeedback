import React from "react";

type ColorTagProps = {
  bg: string;
  text: string;
  children: React.ReactNode;
};

export const ColorTag = ({ bg, text, children }: ColorTagProps) => {
  return (
    <span style={{ "--ifm-code-background": bg, color: text }}>{children}</span>
  );
};
