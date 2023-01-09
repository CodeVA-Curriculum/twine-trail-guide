---
title: If-Else Blocks
author: Jon Stapleton
short: Use "else" blocks to show or hide two lines of text.
description: If statements allow you write passages where events unfold differently based on the value of variables, which are invisible to the reader. Sometimes you might want the passage to offer one of two mutually exclusive options--a message that says "the key turns in the lock", or a message that says "this is the wrong key...", for example. You can accomplish this with "if" and "unless" blocks, but the Chapbook format of Twine also offers "else" blocks, which accomplish something similar.
# video: https://www.youtube.com/embed/VpGFJA5Fnyc
type: tutorial
layout: location
---

## One of Two Options with "Unless" Blocks

Consider the following passage, which uses `[if ]` and `[unless ]` to show one of two sections based on a variable:

:::passage{title="If-Unless" src="TODO:"}
```
hasKey: true
--

You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

> [[Unlock the chest]]

[unless hasKey]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
> [[Turn back]]
```
:::

The way I've written this passage ensures that the computer *either* display the `Unlock the chest` option *or* the message `You tug on the...`; never both.

---

## One of Two Options with "Else" Blocks

"Else" blocks are another way to accomplish this task in a way that might be easier to read:

:::passage{title="If-Else" src="TODO:"}
```
hasKey: true
--

You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

> [[Unlock the chest]]

[else]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
> [[Turn back]]
```
:::

There isn't a functional difference between using `[if ]` and `[unless ]` versus `[if ]` and `[else]`--use whichever one makes the most sense to you.

---