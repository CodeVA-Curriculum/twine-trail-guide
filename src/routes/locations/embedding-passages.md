---
title: Embedding Passages
authors: Jon Stapleton
date: 8/1/2022
type: tutorial
layout: location
short: Embed passages within other passages
description: This tutorial shows you how to combine passages by embedding, which allows you to insert the content of one passage into another one. Embedding is a great way of organizing passages, especially in stories with a lot of repetition.
---

## Creating Embedded Passages

An **embedded passage** is a passage that you insert into another passage (I call it the "host passage", but Chapbook doesn't have an official name for it). When you view the host passage, the computer also displays the embedded passage along with it. Setting up an embedded passage is pretty easy, but understanding how and why the embed works might be a little tricky. Here's a story with two passages, one called `Stanza1` and one called `Raven`.

![Story screenshot](TODO:)

:::passage{title="Stanza1"}
```
Then, methought, the air grew denser, perfumed from an unseen censer
Swung by Seraphim whose foot-falls tinkled on the tufted floor.
“Wretch,” I cried, “thy God hath lent thee—by these angels he hath sent thee
Respite—respite and nepenthe from thy memories of Lenore;
Quaff, oh quaff this kind nepenthe and forget this lost Lenore!”
```
:::

:::passage{title="Raven"}
```
Quoth the Raven "Nevermore."
```
:::

The way I've written these passages above, they are not connected--the story starts with `Stanza1`, and then ends without ever getting to `Raven`. In a normal situation, I might link these passages together so the reader can "visit" the `Raven` passage after reading `Stanza1`. However, in this case, I want to **embed** `Raven` *inside* `Stanza1`--the `Raven` passage will be the embedded passage, and `Stanza1` will be the host passage. To embed the `Raven` passage inside `Stanza1`, I need to add some code to `Stanza1`:

:::passage{title="Stanza1"}
```
Then, methought, the air grew denser, perfumed from an unseen censer
Swung by Seraphim whose foot-falls tinkled on the tufted floor.
“Wretch,” I cried, “thy God hath lent thee—by these angels he hath sent thee
Respite—respite and nepenthe from thy memories of Lenore;
Quaff, oh quaff this kind nepenthe and forget this lost Lenore!”

{embed passage: 'Raven'}
```
:::

Now, when I test the story, the text from the `Raven` passage appears at the bottom of the `Stanza1` passage!

![The output](TODO:)

You might be asking yourself why use embedded passages at all--it's a sort of complicated feature, and in many cases it might make more sense to just write out the embedded part in the host passage in the first place. In some cases, avoiding unnecessary complexity is a good idea! However, the main benefit of embedding isn't to just host passages inside another one; it's to *re-use* passages across your story.

For example, I can add a `Stanza2` passage with the following text:

```
“Prophet!” said I, “thing of evil!—prophet still, if bird or devil!—
Whether Tempter sent, or whether tempest tossed thee here ashore,
Desolate yet all undaunted, on this desert land enchanted—
On this home by Horror haunted—tell me truly, I implore—
Is there—is there balm in Gilead?—tell me—tell me, I implore!”

{embed passage: 'Raven'}
```

Since each stanza in [the poem](https://www.poetryfoundation.org/poems/48860/the-raven) ends with the same text, I can re-use the `Raven` passage in each of my main `Stanza` passages. Now, whenever I make a change to `Raven`, that change will take effect in all of the host passages! Here's what the new story looks like:

![Screenshot, two passage & raven](TODO:)

Even though I've embedded `Raven` twice, I only need one copy of it! This technique is very similar to using ["reveal" links with passages](/locations/reveal-text); if you understand that, you definitely can use this!

## When To Embed?

This is a kind of silly example--the `Raven` passage is really short. However, you *could* decide to add a bunch of other interesting features to the `Raven` passage, and then those features would apply to all of the host passages that it is embedded within. For example, you could [add audio of a raven's caw](/locations/add-audio), put the embedded passage into a ["reveal" link](/locations/reveal-text), or have the `Raven` passage [fade in after a dramatic pause using a delay](/locations/delay-text).

Generally, it's a good idea to think about using embedded passages in the following situations:

1. Your story has a lot of repetition, where one passage appears in several places
2. Some of your passages are very complex
3. Some of your passages are very long, and it makes sense to break them up into pieces

---