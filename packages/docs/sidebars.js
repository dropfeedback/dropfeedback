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
      value: "Usage",
      className: "custom-category mt-20",
    },
    "usage/javascript",
    "usage/react",
    {
      type: "html",
      value: "Cheat-Sheets",
      className: "custom-category mt-20",
    },
    "cheat-sheets/user-identification",
    "cheat-sheets/attach-custom-data",
    "cheat-sheets/widget-customization",
  ],
};

export default sidebars;
