---
title: React Usage
---

import {ThemedComponent} from '@site/src/components/ThemedComponent';
import {Widget} from '@site/src/components/Widget';
import {SidePreview} from '@site/src/components/SidePreview';
import {ColorTag} from '@site/src/components/ColorTag';

This document provides a comprehensive guide for `@dropfeedback/react` package.

## Prerequisites

- [Sign up](https://dropfeedback.com/signup) for a free account.
- Create a project for your website.
- Copy the project ID from the project settings page.
- Install the `@dropfeedback/react` package:

```bash
npm i @dropfeedback/react
```

## Usage

1. Initialize the widget by adding the `<DropFeedback />` component to your React application.

   ```jsx
   import { DropFeedback } from "@dropfeedback/react";

   export default function App() {
     return (
       //...
       <DropFeedback projectId="your_project_id" />
     );
   }
   ```

2. Add the trigger element to open the widget.

   ```html
   <button data-feedback-button>Feedback</button>
   ```

## `<DropFeedback />`

`<DropFeedback />` is a wrapper component for [`<drop-feedback />`](/usage/javascript#drop-feedback-) custom element. It initializes the widget and renders it when the trigger is clicked.

You can add the `<DropFeedback />` component anywhere in your React application. We recommend adding it to the root of your application.

```jsx
import { DropFeedback } from "@dropfeedback/react";

<DropFeedback projectId="your_project_id" reportIdentifier="..." theme={...} />;
```

### `projectId`

It determines which project the feedback is sent to. Find it in your project settings on the dashboard.

**Within the `<DropFeedback />` component:**

```jsx
<DropFeedback projectId="your_project_id" />
```

**Via a trigger element:**

```jsx
<button data-feedback-button data-project-id="your_project_id">
  Feedback
</button>
```

The `projectId` is required to send feedback. You must provide it either via the `<DropFeedback />` component or via the trigger element.

### `reportIdentifier`

It is used to identify the user who sent the feedback. It can be an email address, a username, or any other identifier that you use to identify your users.

**Within the `<DropFeedback />` component:**

```jsx
<DropFeedback reportIdentifier="user@example.com" />
```

**Via a trigger element:**

```jsx
<button data-feedback-button data-report-identifier="user@example.com" />
```

If you don't provide the `reportIdentifier`, the feedback will be sent anonymously.

### `theme`

It is used to customize the theme of the widget.

**Within the `<DropFeedback />` component:**

<ThemedComponent theme="light">
```jsx
<DropFeedback
  theme={{
    scheme: "light",
    primaryColor: "#ff0000",
    textColor: "#000000",
    backgroundColor: "#ffffff",
  }}
/>
```

**Via a trigger element:**

```jsx
<button
  data-feedback-button
  data-theme-scheme="light"
  data-theme-primary-color="#ff0000"
  data-theme-text-color="#000000"
  data-theme-background-color="#ffffff"
>
  Feedback
</button>
```

<Widget sideOffset={0} scheme="light" primaryColor="#ff0000" backgroundColor="#ffffff" textColor="#000000" />

</ThemedComponent>

<ThemedComponent theme="dark">
```jsx
<DropFeedback
  theme={{
    scheme: "dark",
    primaryColor: "#ff7a45",
    textColor: "#ffffff",
    backgroundColor: "#000000",
  }}
/>
```

**Via a trigger element:**

```jsx
<button
  data-feedback-button
  data-theme-scheme="dark"
  data-theme-primary-color="#ff7a45"
  data-theme-text-color="#ffffff"
  data-theme-background-color="#000000"
>
  Feedback
</button>
```

<Widget sideOffset={0} scheme="dark" primaryColor="#ff7a45" backgroundColor="#000000" textColor="#ffffff"  />

</ThemedComponent>

### `meta`

It is used to send additional information about the feedback. You can use it to send metadata like role, location, etc.

**Within the `<DropFeedback />` component:**

```jsx
<DropFeedback
  meta={{
    role: "admin",
    location: "dashboard",
    organization: "dropfeedback",
  }}
/>
```

**Via a trigger element:**

```jsx
<button
  data-feedback-button
  data-meta-role="admin"
  data-meta-location="dashboard"
  data-meta-organization="dropfeedback"
>
  Feedback
</button>
```

## Trigger Specific Attributes

You can only use the following attributes with the trigger element to customize the widget.

### `data-feedback-button`

It is used to mark the trigger element. It is required to open the widget.

```html
<button data-feedback-button>Feedback</button>
```

### `data-side`

Sets which side of the trigger the widget should open. The default value is `auto`. The widget will open on a suitable side if there is not enough space on the specified side.

```html
<button data-feedback-button data-side="bottom">Feedback</button>
```

<SidePreview />

### `data-side-offset`

Sets the distance between the trigger and the widget. The default value is `12`.

```html
<button data-feedback-button data-side-offset="6">Feedback</button>
```

<button data-feedback-button className="button button--outline button--primary" data-side-offset="6">Feedback</button>

### `data-open`

You can use it to open the widget programmatically.

```html
<button data-feedback-button data-open>Feedback</button>
```

### `data-permanent-open`

You can use it to keep the widget open permanently.

```html
<div data-feedback-button data-permanent-open />
```

## API

### `<DropFeedback />`

| Name               | Type                | Default                                        | Description                                    |
| ------------------ | ------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `projectId`        | `string`            | -                                              | Determines the project the feedback is sent to |
| `reportIdentifier` | `string`            | -                                              | Identifies the user who sent the feedback      |
| `theme`            | [`Theme`](#theme-1) | [See here](/usage/javascript#drop-feedback--1) | Customizes the theme of the widget             |

### Trigger

| Name               | Type                          | Default | Description                                           |
| ------------------ | ----------------------------- | ------- | ----------------------------------------------------- |
| `data-side`        | [`PopoverSide`](#popoverside) | `auto`  | Sets which side of the trigger the widget should open |
| `data-side-offset` | `number \| string `           | `12`    | Sets the distance between the trigger and the widget  |
| `data-open`        | `boolean \| string`           | `false` | Opens the widget programmatically                     |
| `data-permanent`   | `boolean \| string`           | `false` | Keeps the widget open permanently                     |

#### `PopoverSide`

```ts
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
```

#### `Theme`

```ts
type Theme = {
  scheme: "light" | "dark";
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
};
```
