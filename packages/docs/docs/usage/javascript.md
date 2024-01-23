---
title: Javascript Usage
---

import {Widget} from '@site/src/components/Widget'

## Prerequisites

- [Sign up](https://dropfeedback.com/signup) for a free account.
- Create a project for your website.
- Copy the project ID from the project settings page.

Add the script tag to the HTML:

```html
<script src="https://unpkg.com/@dropfeedback/core" type="module" defer></script>
```

<hr />

## `<drop-feedback />`

`<drop-feedback />` is a custom element that you can use to embed the feedback widget on your website. It initializes the widget and renders it when the trigger is clicked.

You can add the `<drop-feedback />` element anywhere in your HTML. We recommend adding it to the root of your application.

```html
<drop-feedback project-id="your_project_id" data-theme-scheme="dark" />
```

### `project-id`

It is used to identify the project that the feedback is sent to. You can find the project ID on the project settings page on the dashboard.

```html
<drop-feedback project-id="your_project_id" />
```

The `project-id` attribute is not required for the `<drop-feedback />`, you can also pass the project id via the trigger like this:

```html
<button data-feedback-button data-project-id="your_project_id">Feedback</button>
```

### `theme-scheme`

It is used to set the theme scheme of the widget. The default value is `light`. You can set it to `dark` to use the dark theme.

```html
<drop-feedback theme-scheme="dark" />
```

Alternatively, you can also pass the theme scheme via the trigger like this:

```html
<button data-feedback-button data-theme-scheme="dark">Feedback</button>
```

<Widget scheme="dark" />

### `theme-primary-color`

It is used to set the primary color of the widget. The default value is `#1677ff`. You can set it to any valid CSS color value.

```html
<drop-feedback theme-primary-color="#29bc9b" />
```

Alternatively, you can also pass the primary color via the trigger like this:

```html
<button data-feedback-button data-theme-primary-color="#29bc9b">
  Feedback
</button>
```

<Widget primaryColor="#29bc9b" />

### `theme-background-color`

It is used to set the background color of the widget. The default value is `#ffffff` for the light theme and `#0a0a0a` for the dark theme. You can set it to any valid CSS color value.

```html
<drop-feedback theme-background-color="#ffffff" />
```

Alternatively, you can also pass the background color via the trigger like this:

```html
<button data-feedback-button data-theme-background-color="#f8f9fa">
  Feedback
</button>
```

<Widget backgroundColor="#f8f9fa" />

### `theme-text-color`

It is used to set the text color of the widget. The default value is `#171717` for the light theme and `#ededed` for the dark theme. You can set it to any valid CSS color value.

```html
<drop-feedback theme-text-color="#171717" />
```

Alternatively, you can also pass the text color via the trigger like this:

```html
<button data-feedback-button data-theme-text-color="#8a2be2">Feedback</button>
```

<Widget textColor="#8a2be2" />
