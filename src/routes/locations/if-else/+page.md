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

:::passage{title="If-Unless" src="/if-unless-starter.png" tabs}
```treasure
hasKey: true
--

You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

> [[Unlock the chest->unlock]]

[unless hasKey]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
> [[Turn back->return]]
```
```unlock
Nothing here yet!
```
```return
Nothing here yet!
```
:::

The way I've written this passage ensures that the computer *either* display the `Unlock the chest` option *or* the message `You tug on the...`; never both.

---

## One of Two Options with "Else" Blocks

"Else" blocks are another way to accomplish this task in a way that might be easier to read:

:::passage{title="If-Else" src="/if-unless-starter.png" tabs}
```treasure
hasKey: true
--

You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

> [[Unlock the chest->unlock]]

[else]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
> [[Turn back->return]]
```
```unlock
Nothing here yet!
```
```return
Nothing here yet!
```
:::

There isn't a functional difference between using `[if ]` and `[unless ]` versus `[if ]` and `[else]`--use whichever one makes the most sense to you.

Here's an example of a story that uses the `if` and `else` code above--the first time the reader visits the `treasure` passage, the variable called `hasKey` is `false` which means the option to "unlock the chest" is hidden from them. They need to visit other passages until they discover the key hidden in the `desk` passage. You can play through the whole story by [clicking here](/examples/the-locked-chest).

:::passage{title="The Locked Chest" src="/the-locked-chest.png" tabs}
```intro
hasKey: false
--

# The Locked Chest

> [[Begin->return]]
```
```return
You find yourself in a dusty office. A large bookshelf against the looms over the room, and a dirty window looks out over an overgrown courtyard. A heavy wooden desk sits near the center of the room, its surface littered with loose papers. An old mariner's chest stands against the wall opposite the window.

> [[Investigate the chest->treasure]]
> [[Investigate the bookshelf->books]]
> [[Look out the window->window]]
> [[Investigate the desk->desk]]
```
```treasure
You see a wooden treasure chest secured by a heavy iron padlock.

[if hasKey]
The key in your pocket seems like it would fit the lock...

> [[Unlock the chest->unlock]]

[else]
You tug on the padlock. It holds fast--you probably need a key.

[continue]
> [[Turn back->return]]
```
```books
You peruse the spines of the many leather-bound tomes on the bookshelf. A thick layer of dust sits over everything--no one has been here for a long time.

> [[Turn back->return]]
```
```window
You try to wipe the grime off of the window to get a better look outside, but it's no good--you'll have to head downstairs to get a closer look.

> [[Turn back->return]]
```
```desk
hasKey: true
--

You shuffle through the papers and hear something heavy scrape against the wood. You uncover a heavy, rusty key.

> [[Turn back->return]]
```
```unlock
The chest swings open, revealing its contents...

# The End
```
:::

---