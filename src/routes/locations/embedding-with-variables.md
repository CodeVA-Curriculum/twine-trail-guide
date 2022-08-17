---
title: Embedding With Variables
authors: Jon Stapleton
date: 8/1/2022
type: tutorial
layout: location
short: Use variables with embedded passages
description: This tutorial covers some techniques that involve using embedded passages in conjunction with variables to create story systems. Embedding & variables are powerful tools for organizing your stories, allowing you to group related features together into passages and re-use those passages across your story. This tutorial covers two techniques; using variable links in embedded passages, and using variables to control which passage the host passage embeds.
---

:::aside
This tutorial references concepts from the [Embedding Passages](/locations/embedding-passages), [Variable Basics](/locations/variable-basics), and [Modifying Variables](/locations/modify-variables) tutorials. Consider checking those out if you get stuck in the material below!
:::

## Embedded Passage Variables

Just like all other text elements in a passage, you can use variables to replace the embedded passage name in your `embed passage` element within a host passage. Using variables to have the computer "choose" between several different embedded passages allows you to create very dynamic stories which respond to events across passages. These sorts of stories can be complex--here's an example.

Check out the story below: the `Bonfire` passage describes a bonfire. Using variables and embedded passages, I can make it so the bonfire "burns down" as the user spends time "away" from the `Bonfire` passage.

![Story map](TODO:)

First, I'll creat the `Intro` passage that sets up the variables, and then the `Bonfire` passage with the bonfire and a link to another passage:

:::passage{title="Intro"}
```
fire: 'Roaring'
--

> [[Start the Story -> Bonfire]]
```
:::

:::passage={title="Bonfire"}
```
You come across a campsite. In the center of the clearing, you see a place for a fire.

{embed passage: {fire}}

> [[Search for Food]]
```
:::

You can see in the passages above that I've created a variable called `fire`. This variable will be the **name of a passage** containing a description of the fire. In future passages, I'll have the computer modify the variable to point to different passages, thereby replacing the embedded passage at different points in the story. Before I move any further, I'll create two different passages with descriptions of the bonfire: `Roaring` and `Dying`. Here's `Roaring` as an example:

```
The fire is roaring, licking the stones placed around the logs. You can feel the heat tickling your face and hands, even from across the clearing.
```

`Dying` contains a similar description of a fire that is going out. I've also made a `Search for Food` passage, which looks like this:

```
fire: 'Dying'
--

You spend some time picking through the underbrush. You find a raspberry briar, and collect some berries to eat by the fire.

> [[Return to the Fire -> Bonfire]]
```

The `Search for Food` passage *modifies* the variable called `fire`, changing its value to `Dying`. Now, when the reader returns to the fire, the `Bonfire` passage will host the passage called `Dying` rather than the passage called `Roaring`. This will emphasize the time the reader has "spent" collecting berries nearby. Here's the story map with all of the links in place:

![Story map](TODO:)

There are lots of other creative ways to control embedded passages with variables--feel free to experiment!

## Embedding & Variable Links

If you've read the *[Embedding Passages](/locations/embedding-passages)* tutorial, you can start combining these concepts to create powerful systems that work together. For example, consider the story based on Edgar Allen Poe's *The Raven* from the embedding tutorial:

![Story screenshot](TODO:)

In this story, I've embedded the passage named `Raven` into all of the `Stanza` passages. Each `Stanza` passage has a link to the next part of the poem, allowing the reader to progress through the poem step-by-step. Here's the `Stanza1` passage as an example:

:::passage{title="Stanza1"}
```
Then, methought, the air grew denser, perfumed from an unseen censer
Swung by Seraphim whose foot-falls tinkled on the tufted floor.
“Wretch,” I cried, “thy God hath lent thee—by these angels he hath sent thee
Respite—respite and nepenthe from thy memories of Lenore;
Quaff, oh quaff this kind nepenthe and forget this lost Lenore!”

{embed passage: 'Raven'}

> [[Next -> Stanza2]]
```
:::

Because the structure of the story is so consistent, I can change things up slightly and simplify the passages, moving the link into the `Raven` passage. The first step is to add a variable to each `Stanza` passage, whose value is the name of the passage the `Stanza` should link to:

```
next: 'Stanza2'
--

Then, methought, the air grew denser, perfumed from an unseen censer
Swung by Seraphim whose foot-falls tinkled on the tufted floor.
“Wretch,” I cried, “thy God hath lent thee—by these angels he hath sent thee
Respite—respite and nepenthe from thy memories of Lenore;
Quaff, oh quaff this kind nepenthe and forget this lost Lenore!”

{embed passage: 'Raven'}

> [[Next -> {next}]]
```

You can see above that I've inserted the value of the `next` variable into the link, just like I did in the *Goldilocks* example in the *[Linking with Variables](/locations/linking-with-variables)* tutorial. Now, I can move the link into the `Raven` passage (remember: *all* passages have access to the variables):

:::passage{title="Raven"}
```
Quoth the Raven "Nevermore".

> [[Next -> {next}]]
```
:::

Because the `Raven` passage is responsible for the link, I can add all sorts of fancy features to make the embedded material more dramatic:

```
Quoth the Raven...

[after 15 seconds]
[["Nevermore". -> {next}]]
```

You can try out the new version of *The Raven* by clicking [here](TODO:). If you'd like to download it and play around with it in the Twine editor, click [here](TODO:). There are lots of other creative ways to use variables and links--don't be afraid to experiment!

---
