import { type MetaFunction } from "@remix-run/cloudflare";

export const defaultMeta: ReturnType<MetaFunction> = [
  {
    title: "DropFeedback",
  },
  {
    name: "description",
    content:
      "Effortlessly collect feedback from your website visitors through a seamless, customizable widget.",
  },
  {
    property: "og:url",
    content: "https://www.dropfeedback.com/",
  },
  {
    property: "og:type",
    content: "website",
  },
  {
    property: "og:title",
    content: "DropFeedback",
  },
  {
    property: "og:description",
    content:
      "Effortlessly collect feedback from your website visitors through a seamless, customizable widget.",
  },
  {
    property: "og:image",
    content:
      "https://raw.githubusercontent.com/dropfeedback/dropfeedback/master/brand-assets/dropfeedback-og-image.png",
  },
  {
    name: "twitter:card",
    content: "summary_large_image",
  },
  {
    name: "twitter:domain",
    content: "dropfeedback.com",
  },
  {
    name: "twitter:url",
    content: "https://www.dropfeedback.com/",
  },
  {
    name: "twitter:title",
    content: "DropFeedback",
  },
  {
    name: "twitter:description",
    content:
      "Effortlessly collect feedback from your website visitors through a seamless, customizable widget.",
  },
  {
    name: "twitter:image",
    content:
      "https://raw.githubusercontent.com/dropfeedback/dropfeedback/master/brand-assets/dropfeedback-og-image.png",
  },
];
