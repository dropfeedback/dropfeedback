---
title: Javascript Usage
---

import {Widget} from '@site/src/components/Widget';
import {ThemedComponent} from '@site/src/components/ThemedComponent';
import {SidePreview} from '@site/src/components/SidePreview';
import {ColorTag} from '@site/src/components/ColorTag';

This document provides a comprehensive guide on how to use the `<drop-feedback />` custom element to embed the feedback widget on any website.

## Prerequisites

- [Sign up](https://dropfeedback.com/signup) for a free account.
- Create a project for your website.
- Copy the project ID from the project settings page.
- Add the script tag to the HTML:

```html
<script src="https://unpkg.com/@dropfeedback/core" type="module" defer></script>
```

## Usage

1. Initialize the widget by adding the `<drop-feedback />` custom element to your HTML.

   ```html
   <drop-feedback project-id="your_project_id" />
   ```

2. Add the trigger element to open the widget.

   ```html
   <button data-feedback-button>Feedback</button>
   ```

## `<drop-feedback />`

It initializes the widget and renders it when the trigger is clicked.

You can add the `<drop-feedback />` element anywhere in your `<body />`. We recommend adding it to the root of your HTML.

```html
<drop-feedback
  project-id="your_project_id"
  report-identifier="..."
  theme-scheme="dark"
/>
```

### `project-id`

It determines which project the feedback is sent to. Find it in your project settings on the dashboard.

**Within the `<drop-feedback />` component:**

```html
<drop-feedback project-id="your_project_id" />
```

**Via a trigger element:**

```jsx
<button data-feedback-button data-project-id="your_project_id">
  Feedback
</button>
```

The `project-id` is required to send feedback. You must provide it either via the `<drop-feedback />` component or via the trigger element.

### `report-identifier`

It is used to identify the user who sent the feedback. It can be an email address, a username, or any other identifier that you use to identify your users.

**Within the `<drop-feedback />` component:**

```html
<drop-feedback report-identifier="user@example.com" />
```

**Via a trigger element:**

```jsx
<button data-feedback-button data-report-identifier="user@example.com">
  Feedback>
</button>
```

If you don't provide the `reportIdentifier`, the feedback will be sent anonymously.

### `theme`

It is used to customize the theme of the widget.

**Within the `<drop-feedback />` component:**

<ThemedComponent theme="light">
```jsx
<drop-feedback
  theme-scheme="light"
  theme-primary-color="#ff0000"
  theme-text-color="#000000"
  theme-background-color="#ffffff"
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

<Widget scheme="light" primaryColor="#ff0000" backgroundColor="#ffffff" textColor="#000000" />

</ThemedComponent>

<ThemedComponent theme="dark">
```jsx
<drop-feedback
  theme-scheme="dark"
  theme-primary-color="#ff7a45"
  theme-text-color="#ffffff"
  theme-background-color="#000000"
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

<Widget scheme="dark" primaryColor="#ff7a45" backgroundColor="#000000" textColor="#ffffff"  />

</ThemedComponent>

### `meta-*`

It is used to send additional information about the feedback. You can use it to send metadata like role, location, etc.

**Within the `<drop-feedback />` component:**

```html
<drop-feedback
  meta-role="admin"
  meta-location="dashboard"
  meta-organization="dropfeedback"
/>
```

**Via a trigger element:**

```html
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

<button data-feedback-button className="button button--outline button--primary" data-side-offset="12">Feedback</button>

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

### `<drop-feedback />`

| Name                     | Type                | Default                                                                                                                         | Description                                    |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `project-id`             | `string`            | -                                                                                                                               | Determines the project the feedback is sent to |
| `report-identifier`      | `string`            | -                                                                                                                               | Identifies the user who sent the feedback      |
| `theme-scheme`           | `"dark" \| "light"` | light                                                                                                                           | Theme scheme of the widget                     |
| `theme-primary-color`    | `string`            | <ColorTag bg="#1677ff" text="white">`#1677ff`</ColorTag>                                                                        | Primary color of the widget                    |
| `theme-text-color`       | `string`            | light: <ColorTag bg="#171717" text="white">`#171717`</ColorTag>, dark: <ColorTag bg="#ededed" text="black">`#ededed`</ColorTag> | Text color of the widget                       |
| `theme-background-color` | `string`            | light: <ColorTag bg="#ffffff" text="black">`#ffffff`</ColorTag>, dark: <ColorTag bg="#0a0a0a" text="white">`#0a0a0a`</ColorTag> | Background color of the widget                 |

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
