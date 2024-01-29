---
title: Attach Custom Data
slug: /attach-custom-data
sidebar_label: 📝 Attach Custom Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The widget allows you to attach custom data to the feedback. You can use it to send metadata like role, location, etc.

You can attach custom data to the feedback in two ways:

<Tabs groupId="frameworks">
<TabItem value="js" label="JavaScript">

**Within the `<drop-feedback />` component:**

```html
<drop-feedback
  meta-role="admin"
  meta-location="dashboard"
  meta-organization="dropfeedback"
/>
```

</TabItem>
<TabItem value="react" label="React">

**Within the `<DropFeedback />` component:**

```jsx
import { DropFeedback } from "@dropfeedback/react";

<DropFeedback
  meta={{
    role: "admin",
    location: "dashboard",
    organization: "dropfeedback",
  }}
/>;
```

</TabItem>
</Tabs>

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

The passed data will be displayed in the feedback details in the dashboard.

:::tip
If you pass the same key both in the `<drop-feedback />` component and the trigger element, the value from the trigger element will be used.
:::
