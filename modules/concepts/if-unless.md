---
title: If & Unless Blocks
author: Jon Stapleton
short: Learn the basics of "if" and "unless" blocks in the Chapbook format of Twine.
description: The Chapbook format of Twine includes special commands you can use in your passages called "if" and "unless" blocks. These blocks allow you to "hide" or "reveal" lines of text based on the value of a variable. This powerful "selection" feature (where the computer, as it interprets your passage, "selects" lines of code to skip or include in the passage) is useful for creating all sorts of things in your Twine stories--puzzles, secrets, alternative paths and endings, and a lot more!
video: https://www.youtube.com/embed/TZXFTwgYjuA
type: tutorial
layout: location
---

## Simple "If" Blocks

An "if" block directs the computer to *hide* or *reveal* a given line of text based on the value of a variable. To create an "if" block, copy the example below into a new passage:

:::aside
If you aren't sure what a "variable" is and the syntax in the passage examples above is confusing, you might want to check out the *[Variable Basics](/locations/variable-basics)* tutorial, which explains how to create and modify variables.
:::

:::code-and-image{name="If Example" src="/images/simple-if-example.png"}
```
exampleVar: false
--

Here's a passage...

[if exampleVar]
...and here's a hidden message
```
:::

Test it out! Your results should match the image above--**the last two lines don't appear in the passage!** Here's how the computer interprets the passage above, step by step:

1. Set the variable `exampleVar` to a value of `false`
2. Display the text `Here's a passage...`
3. An "if" block! First, check the value of the variable `exampleVar`. Then...
    a. If it has a value of `true`, *display* the next line
    b. If it has a value of `false`, *skip* the next line
4. End of the passage--nothing else to do!

In the example above, the variable called `exampleVar` has a value of `false`, causing the computer to *skip* the line after the "if" block. However, if you go back into the passage and modify it like so:

:::code-and-image{name="If Example" src="/images/simple-if-true.png"}
```
exampleVar: true
--

Here's a passage...

[if exampleVar]
...and here's a hidden message
```
:::

...now the hidden message is revealed! The only difference between the first example and the new example is the value of the `exampleVar` variable--I've set it to `true` this time instead of `false`. That's an "if" block!

---

## "Unless" Blocks

An "unless" block is sort of like the opposite of an "if" block--instead of directing the computer to *skip* the subsequent line when the variable is `false` and *display* the line when the variable is `true`, it does the reverse:

* If the variable is `false`, *display* the following line
* If the variable is `true`, *skip* the following line

Here's an example:

:::code-and-image{name="Unless Example" src="/images/simple-if-true.png"}
```
v: false
--

Here's another passage...

[unless v]
...and here's the secret message.
```
:::

> **Practice:** What would you change about the example above to make the computer *skip* the line after the "unless" block instead of displaying it? Once you've made your guess, click the "Reveal Solution" button below to see a working example:

:::collapse{title="Reveal Solution"}
:::code-and-image{name="Unless Example" src="/images/simple-if-example.png"}
```
var: true
--

Here's another passage...

[unless var]
...and here's the secret message.
```
:::

---

## What's The Point?

You might be asking yourself:

> "Why would I use "if" or "unless" blocks? It seems needlessly fussy; if I want to omit text from a passage, I just won't type it!"

This is absolutely the case, but remember--you can have the computer *modify the value of variables* as the reader visits passages in your story. The real power of conditional blocks like `[if ]` and `[unless ]` becomes more clear when your story *modifies* the variables, and directs the reader to revisit the passage. Here's an example with three passages--one that *sets* the initial value of a variable, one that *uses* the variable in an "if" block, and one that *modifies* the variable, unlocking a new option in the second passage! You can play the story by [clicking here](/examples/the-locked-door) if you'd like.

![A GIF of the Twine story below, which displays a Twine story where the reader must find a key that unlocks a door](/the-locked-door-demo.gif)

:::code-and-image{name="The Locked Door" src="/images/the-locked-door.png" tabs}
```intro
key: false
--

# The Locked Door

A story demonstrating "if" blocks

> [[Continue->door]]
```
```door
You see a large, wooden door on heavy hinges with a big, iron padlock holding it shut.

> [[Search the foyer->search]]
[if key]
> [[Try the key in the padlock->unlock]]
```
```search
key: true
--

You comb the room, and as you step across the thick, dusty carpet you feel something hard under your shoe. You pull back the carpet, and see a heavy wrought-iron key sitting on wood floor below.

> [[Go check the door->door]]
```
```unlock
The door swings slowly open, creaking on its rusty hinges...
```
:::

---

## "Continue" Blocks

If you want to use an `[if ]` block *before* a line that should appear in every passage, you can use the `[continue]` block:

:::code-and-image{name="Continue Block Example" src="/images/continue-block-example.png"}
```
key: false
--

You see a large, wooden door on heavy hinges with a big, iron padlock holding it shut.

[if key]
The key seems to fit into the padlock...

> [[Try the key in the padlock->unlock]]
[continue]
> [[Search the foyer->search]]
```
:::

Using `[continue]` blocks allows you to sort of "insert" hidden sections of text *between* the sections of code that the computer will always display.

## Longer "If" & "Unless" Blocks

"If" and "unless" blocks are really powerful, but they can sometimes make your passages difficult to read. Part of using **conditional control structures** like "if", "unless", and "continue" blocks is being able to *trace* the passage and *predict* what the passage will cause the computer to show to the reader given the variables the conditional control structure relies on. If you want to hide or reveal a larger amount of text, it can be easier to read the passage if you use an [embedded passage](/locations/embedding-passages):

:::code-and-image{name="If Block w/ Embedded Passage" tabs}
```main
toReveal: false
--
A passage.

[if toReveal]
{embed passage: 'embedded'}

[continue]
There's a hidden message... change the variable to `true`!
```
```embedded
This is hidden...

I can even include links:

> [[A link]]
> [[Another link]]
```
:::