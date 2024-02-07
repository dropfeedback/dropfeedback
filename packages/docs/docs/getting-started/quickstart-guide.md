---
title: Quickstart Guide
slug: /quickstart-guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

DropFeedback is a feedback widget that you can embed on your website which framework agnostic. 

Get started by following the steps below.

## 1. Sign Up

Get started by signing up at [here](https://dropfeedback.com/signup) and create your project for free. You can create as many projects as you want and use them on different websites.

## 2. Widget Installation

### JavaScript

To embed the feedback widget on your website, add the script tag to the HTML:

```html
<script src="https://unpkg.com/@dropfeedback/core" type="module" defer></script>
```

### React

If you are using React, you can install the React package, which is a wrapper around the core package.

```bash
npm i @dropfeedback/react
```

## 3. Add the Widget

### Widget Container

After installing the widget, Add the following code as a container for the widget:

<Tabs groupId="frameworks">
<TabItem value="js" label="JavaScript">

```html
<drop-feedback project-id="your_project_id" />
```

</TabItem>
<TabItem value="react" label="React">

```tsx
import { DropFeedback } from "@dropfeedback/react";

<DropFeedback projectId="your_project_id" />;
```

</TabItem>
</Tabs>

:::tip

We recommend adding the container to the root of your application.
:::

### Widget Trigger

To open the widget, you need to add a trigger. Add the `data-feedback-button` attribute to any element.

```html
<button data-feedback-button>Feedback</button>
```

If you want to identify the user, you can add the `data-report-identifier` attribute to the trigger element and pass in the currently authenticated user's email or id.

```html
<button data-feedback-button data-report-identifier="...">Feedback</button>
```

Refer to the [User Identification](/user-identification) cheatsheet for more information.

## 4. Customize Your Widget

The widget is fully customizable. You can change the colors, position, and more. Check out the [Widget Customization](/widget-customization) cheatsheet for more information.

## 5. Feedback Analysis

Once feedback starts coming in, you can analyze it on the [dashboard](https://dropfeedback.com/dashboard). You can also receive feedback via email.

<hr />

## Cheat-sheets

For quick reference, here are some cheat sheets to help you make the most out of DropFeedback.

- [User Identification](/user-identification) 🆔
- [Widget Customization](/widget-customization) 🎨
- [Attach Custom Data](/attach-custom-data) 📝
