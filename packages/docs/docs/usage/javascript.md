---
title: Javascript Usage
---

import {Widget} from '@site/src/components/Widget';
import {ThemedComponent} from '@site/src/components/ThemedComponent';

## Prerequisites

- [Sign up](https://dropfeedback.com/signup) for a free account.
- Create a project for your website.
- Copy the project ID from the project settings page.
- Add the script tag to the HTML:

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

<ThemedComponent theme="light">
```html
<drop-feedback theme-scheme="dark" />
```
</ThemedComponent>

<ThemedComponent theme="dark">
```html
<drop-feedback theme-scheme="light" />
```
</ThemedComponent>

Alternatively, you can also pass the theme scheme via the trigger like this:

<ThemedComponent theme="light">
```html
<button data-feedback-button data-theme-scheme="dark">Feedback</button>
```
</ThemedComponent>

<ThemedComponent theme="dark">
```html
<button data-feedback-button data-theme-scheme="light">Feedback</button>
```
</ThemedComponent>

<ThemedComponent theme="light">
  <Widget scheme="dark" />
</ThemedComponent>

<ThemedComponent theme="dark">
  <Widget scheme="light" />
</ThemedComponent>

### `theme-primary-color`

It is used to set the primary color of the widget. The default value is <span style={{     '--ifm-code-background': '#1677ff', color: 'white' }}>`#1677ff`</span>. You can set it to any valid CSS color value.

```html
<drop-feedback theme-primary-color="#52c41a" />
```

Alternatively, you can also pass the primary color via the trigger like this:

```html
<button data-feedback-button data-theme-primary-color="#52c41a">
  Feedback
</button>
```

<Widget primaryColor="#52c41a" />

### `theme-background-color`

It is used to set the background color of the widget. The default value is <span style={{'--ifm-code-background': '#ffffff', color: 'black' }}>`#ffffff`</span> for the light theme and <span style={{'--ifm-code-background': '#0a0a0a', color: 'white' }}>`#0a0a0a`</span> for the dark theme. You can set it to any valid CSS color value.

<ThemedComponent theme="light">
  ```html
  <drop-feedback theme-background-color="#f0f0f0" />
  ```
</ThemedComponent>
<ThemedComponent theme="dark">
  ```html
  <drop-feedback theme-background-color="#262626" />
  ```
</ThemedComponent>

Alternatively, you can also pass the background color via the trigger like this:

<ThemedComponent theme="light">
  ```html
  <button data-feedback-button data-theme-background-color="#f0f0f0">
    Feedback
  </button>
  ```
</ThemedComponent>
<ThemedComponent theme="dark">
  ```html
  <button data-feedback-button data-theme-background-color="#262626">
    Feedback
  </button>
  ```
</ThemedComponent>

<ThemedComponent theme="light">
  <Widget backgroundColor="#f0f0f0" />
</ThemedComponent>
<ThemedComponent theme="dark">
  <Widget backgroundColor="#262626" />
</ThemedComponent>

### `theme-text-color`

It is used to set the text color of the widget. The default value is <span style={{     '--ifm-code-background': '#171717', color: 'white' }}>`#171717`</span> for the light theme and <span style={{'--ifm-code-background': '#ededed', color: 'black' }}>`#ededed`</span> for the dark theme. You can set it to any valid CSS color value.

```html
<drop-feedback theme-text-color="#171717" />
```

Alternatively, you can also pass the text color via the trigger like this:

```html
<button data-feedback-button data-theme-text-color="#8a2be2">Feedback</button>
```

<Widget textColor="#8a2be2" />

### `report-identifier`

It allows you to identify the user who is sending the feedback. You can pass the user's email or id as the value of the attribute.

```html
<drop-feedback report-identifier="user@example.com" />
```

Alternatively, you can also pass the report identifier via the trigger like this:

```html
<button data-feedback-button data-report-identifier="user@example.com">
  Feedback
</button>
```

If you add the `report-identifier` attribute, you can see the user's email or id in the feedback report on the dashboard. So you can contact the user if you need more information about the feedback.

### `meta-*`

You can pass any custom data to the feedback report. It can be useful to add information. For example, if you want to know the version of your website when the feedback was sent, you can add the version as metadata.

```html
<drop-feedback meta-version="1.0.0" />
```

Alternatively, you can also pass the metadata via the trigger like this:

```html
<button data-feedback-button data-meta-version="1.0.0">Feedback</button>
```

You can add multiple metadata attributes both on the `<drop-feedback />` element and the trigger.

## Trigger Specific Attributes