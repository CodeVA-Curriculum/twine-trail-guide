---
title: Delay Text
author: Jon Stapleton
short: Learn how to set text to reveal itself in a passage after some time has passed.
description: As a Twine author, you may find yourself in a situation where you want to increase dramatic tension in your story by revealing something after a delay instead of right away when the reader arrives at a passage. This tutorial shows you how to set up delays in your Chapbook Twine passages.
# video: https://youtube.com/embed/33OQtxF7L8g
type: tutorial
layout: location
---

## Creating Delay With the "After" Modifier

Twine passages created using the **Chapbook** format have access to *modifiers*, special commands that cause the passage to behave differently than usual. You can use one of those modifiers, the `after` modifier, to reveal text after a delay.

```
TODO: Lorum ipsum sit dolor amet

[after 1 second]
Lorum ipsum
```

Here's what that Twine passage looks like when I play it:

![A passage with TODO: Lorum ipsum, revealing additional text reading TODO: Lorum ipsum after 1 second](TODO:)

You can change the time to whatever you like. Here are some examples:

* `[after 500ms]`: Delays for half a second, or 500 milliseconds
* `[after 1 minute]: Delays for a full minute (that's a really long time!)
* `[after 3 seconds]: Delays for 3 seconds (you can use whatever number you like)

---

## Adding Delayed Text to a Paragraph

Sometimes, you may want to add delayed text to a paragraph rather than revealing the delayed portion on its own line. Something like this:

![A paragraph reading TODO: lorum ipsum, after 1 second a second portion fades in reading TODO: lorum ipsum](TODO:)

To add a delayed line to the previous paragraph, use the `append` modifier along with the `after` modifier:

```
TODO: Lorum ipsum sit dolor amet

[after 1 second; append]
Lorum ipsum

--

This tutorial is based on the [Chapbook delayed text documentation](https://klembot.github.io/chapbook/guide/modifiers-and-inserts/delayed-text.html). Visit the [wiki](https://klembot.github.io/chapbook/guide/modifiers-and-inserts/delayed-text.html) to learn more about delayed text in Chapbook and other features included in the Chapbook format.
