/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  defaultSidebar: [
    {
      type: "html",
      value: "Getting Started",
      className: "custom-category",
    },
    "getting-started/welcome-to-dropfeedback",
    "getting-started/quickstart-guide",
    {
      type: "html",
      value: "Feedback Widget",
      className: "custom-category mt-20",
    },
    "feedback-widget/installation-guide",
    "feedback-widget/javascript-usage",
    "feedback-widget/react-usage",
    {
      type: "html",
      value: "API Reference",
      className: "custom-category mt-20",
    },
    "api-reference/container-props",
    "api-reference/trigger-props",
    {
      type: "html",
      value: "Cheat-Sheets",
      className: "custom-category mt-20",
    },
    "cheat-sheets/bind-widget-to-an-element",
    "cheat-sheets/user-identification",
    "cheat-sheets/widget-customization",
    "cheat-sheets/attach-custom-data",
  ],
};

export default sidebars;
