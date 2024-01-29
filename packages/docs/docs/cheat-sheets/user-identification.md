---
title: User Identification
slug: /user-identification
sidebar_label: 🆔 User Identification
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To identify the user who sent the feedback, you can use the `report-identifier` attribute on your trigger element or `<drop-feedback />` component.

It can be an email address, a username, or any other identifier that you use to identify your users. If you provide an email address, the reply button will be displayed in your feedback inbox.

```html
<button data-feedback-button data-report-identifier="user@example.com">
  Feedback
</button>
```

<Tabs groupId="frameworks">
<TabItem value="js" label="JavaScript">

```html
<drop-feedback report-identifier="user@example.com" />
```

</TabItem>
<TabItem value="react" label="React">

```jsx
import { DropFeedback } from "@dropfeedback/react";

<DropFeedback reportIdentifier="user@example.com" />;
```

</TabItem>
</Tabs>

:::info
If you don't provide the attribute, the feedback will be shown as anonymous.
:::
