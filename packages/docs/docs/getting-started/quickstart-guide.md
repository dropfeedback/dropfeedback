---
title: Quickstart Guide
slug: /quickstart-guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Follow these steps to get started:

## Sign Up

Get started by signing up at [here](https://dropfeedback.com/signup) and create your project for free. You can create as many projects as you want and use them on different websites.

## Widget Installation

Check out the full [installation guide](/installation-guide) to learn how to install the widget on your website.

<Tabs groupId="frameworks">
<TabItem value="js" label="JavaScript">

```bash
npm i @dropfeedback/core
```

Or use the CDN to include the script in your HTML:

```html
<script src="https://unpkg.com/@dropfeedback/core" type="module" defer></script>
```

</TabItem>
<TabItem value="react" label="React">

```bash
npm i @dropfeedback/react
```

</TabItem>
</Tabs>

## Basic Usage

### 1. Add container

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

### 2. Add trigger

To open the widget, you need to add a trigger. Add the `data-feedback-button` attribute to any element.

```html
<button data-feedback-button>Feedback</button>
```

If you want to identify the user, you can add the `data-report-identifier` attribute to the trigger element and pass in the currently authenticated user's email or id.

```html
<button data-feedback-button data-report-identifier="...">Feedback</button>
```

Refer to the [User Identification](/user-identification) cheatsheet for more information.

## Customize Your Widget

The widget is fully customizable. You can change the colors, position, and more. Check out the [Widget Customization](/widget-customization) cheatsheet for more information.

## Feedback Analysis

Once feedback starts coming in, you can analyze it on the [dashboard](https://dropfeedback.com/dashboard). You can also receive feedback via email.

<hr />

## Cheat-sheets

For quick reference, here are some cheat sheets to help you make the most out of DropFeedback.

- [User Identification](/user-identification) 🆔
- [Widget Customization](/widget-customization) 🎨
- [Attach Custom Data](/attach-custom-data) 📝
