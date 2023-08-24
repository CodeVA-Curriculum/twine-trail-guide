---
title: Delay Text
author: Jon Stapleton
short: Learn how to set text to reveal itself in a passage after some time has passed.
description: As a Twine author, you may find yourself in a situation where you want to increase dramatic tension in your story by revealing something after a delay instead of right away when the reader arrives at a passage. This tutorial shows you how to set up delays in your Chapbook Twine passages.
video: https://youtube.com/embed/bSWW-QHAxpI
type: tutorial
layout: location
---

## Creating Delay With the "After" Modifier

As a Twine author, you may find yourself in a situation where you want to increase dramatic tension in your story by revealing something after a delay instead of right away when the reader arrives at a passage. This tutorial shows you how to set up delays in your Chapbook Twine passages. Twine passages created using the **Chapbook** format have access to *modifiers*, special commands that cause the passage to behave differently than usual. You can use one of those modifiers, the `after` modifier, to reveal text after a delay.

:::passage{title="Delay Example" src="/delay-text-demo.gif"}
```
You find yourself in a damp, dark cave. You hear water dripping from stalactites hanging above you.

[after 1 second]
In the distance... is that a light?
```
:::

You can change the time to whatever you like. Here are some examples:

* `[after 500ms]`: Delays for half a second, or 500 milliseconds
* `[after 1 minute]`: Delays for a full minute (that's a really long time!)
* `[after 3 seconds]`: Delays for 3 seconds (you can use whatever number you like)

If you'd like to have the delay apply to a section of next in the middle of a passage, you can set that up using the `[continue]` block:

:::passage{title="Delay with Continue" src="/delay-in-situ.gif"}
```
You find yourself in a damp, dark cave. You hear water dripping from stalactites hanging above you.

[after 1 second]
In the distance... is that a light?

[continue]
It's cold here...
```
:::

---

## Adding Delayed Text to a Paragraph

Sometimes, you may want to add delayed text to a paragraph rather than revealing the delayed portion on its own line. Something like this:

![A paragraph reading You find yourself in a damp, dark cave. You hear water dripping from stalagtites hanging above you., after 1 second a second portion fades in reading In the distance... is that a light?](/delay-append-demo.gif)

To add a delayed line to the previous paragraph, use the `append` modifier along with the `after` modifier:

:::passage{title="Delay Append Example" src="/delay-append-demo.gif"}
```
You find yourself in a damp, dark cave. You hear water dripping from stalagtites hanging above you.

[after 2 seconds; append]
In the distance... is that a light?
```
:::

---

:::aside
This tutorial is based on the [Chapbook delayed text documentation](https://klembot.github.io/chapbook/guide/modifiers-and-inserts/delayed-text.html). Visit the [wiki](https://klembot.github.io/chapbook/guide/modifiers-and-inserts/delayed-text.html) to learn more about delayed text in Chapbook and other features included in the Chapbook format.
:::