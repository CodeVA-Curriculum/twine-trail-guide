---
title: Reveal Text
# TODO: incorporate author into location cards
author: Jon Stapleton
short: Learn how to create links that reveal new sections of text in your Twine passages.
description: Sometimes, you might want to use a link to reveal a new section of a passage instead of transitioning to a new part of your story. "Reveal" links do exactly that--they allow you to use a link to reveal more information to the reader in the current passage. This tutorial covers how to create "reveal" links and section in your Twine story.
video: https://youtube.com/embed/EUhDExXTR_U
type: tutorial
layout: location
---

## Simple Reveal Links

**Reveal links** are special kinds of links that you can use to show additional text in your story rather than moving to a whole new passage when the reader clicks the link. Try it out! Add the following line to a Twine passage:

:::passage{title="Reveal Text Example" src="/twine-reveal-link.gif"}
```
Ranier was walking home one night when they saw {reveal link: 'something strange', text: 'an abandoned truck in the middle of the road, sitting alone under a streetlamp'}.
```
:::

Test out the passage--what do you notice about how the link works?

## Why Use a Reveal Link?

"Reveal" links have the effect of making the reader feel like they are investigating something new. It also allows you to keep information on the screen for the reader to reference while still moving the story forward.

You can see "reveal" links in action in *[Stone Harbor](https://stoneharborgame.com/)* by Liza Daly.

## Reveal a Passage

The simple "reveal" link above is good for small sections of text, but not as good for longer reveals. If you want to reveal a larger section of text, you might want to use the "reveal" link to show a *passage* instead of just some text.

First, create a new passage. I've called mine `abandoned-truck`, but you can name yours whatever you like. Here's what my `abandoned-truck` passage says:

```
an abandoned truck in the middle of the road, sitting alone under a streetlamp.

The truck was red and rusty. Ranier approached slowly, scanning the surroundings trying to see if the owner of the truck was in trouble or needed help.
```

Now, return to your first passage and change the link "reveal" link so it looks like this:

```
Ranier was walking home one night when they saw {reveal link: 'something strange', passage: 'abandoned-truck'}.
```

At this point you'll have two passages that aren't connected, like this:

![The Twine story editor showing two disconnected passages, one called Introduction and one called Abandoned Truck](/two-passages-reveal.png)

You'll notice that I've changed `text` to say `passage` instead, and replaced the sentence describing the truck with the name of the new passage (`Abandoned Truck`). Test out your story!

:::passage{title="Reveal Passage Example" src="/twine-reveal-passage.gif" tabs}
```intro
Ranier was walking home one night when they saw {reveal link: 'something strange', passage: 'abandoned-truck'}.
```
```abandoned-truck
an abandoned truck in the middle of the road, sitting alone under a streetlamp.

The truck was red and rusty. Ranier approached slowly, scanning the surroundings trying to see if the owner of the truck was in trouble or needed help.
```
:::

The "reveal" link, once clicked, inserts the text from the `abandoned-truck` passage into the first passage. This is a little different than a normal link, because the text from the two passages appear *together* rather than separately.

---