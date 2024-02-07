import React from "react";

const SIDES = [
  "auto",
  "auto-start",
  "auto-end",
  "left",
  "right",
  "top",
  "bottom",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
];

export const SidePreview = () => {
  return (
    <div
      className="side-preview-container"
      style={{
        gridTemplateAreas:
          '". top-start top top-end ." "left-start . . . right-start" "left auto-start _auto auto-end right" "left-end . . . right-end" ". bottom-start bottom bottom-end ."',
      }}
    >
      {SIDES.map((side) => (
        <button
          data-feedback-button
          key={side}
          style={{ gridArea: side === "auto" ? "_auto" : side }}
          data-side={side}
          className="side-preview-button button button--outline button--primary"
        >
          {side}
        </button>
      ))}
    </div>
  );
};
