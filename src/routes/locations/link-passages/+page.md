---
title: Link Passages
author: Jon Stapleton
short: Allow the reader to progress through the story step-by-step
description: Each passage is like a scene in your story. Learn how to connect passages together with links, allowing the reader to move the story forward and uncover new scenes step-by-step.
video: https://youtube.com/embed/UO3XtMy24yc
type: tutorial
layout: location
---

## What Are Links?

Most Twine stories are made up of little pages connected together by **links**--little buttons on the page that allow the reader to click through one page of the story to the next one. Here's an example:

![GIF of the story of Jack and the beanstalk told in Twine passages](/jack-beanstalk-demo.gif)

In this tutorial, you'll learn how to create passages and link them together.

---

## Create a Beginning Passage

Twine *passages* are like scenes in your story. They should be short and descriptive. Twine passages are connected by ***links***--clickable words that lead from one passage to another. Readers can click on links to move forward in the story from one scene to another.

Before you can create a link to a new passage, write a beginning scene for your story that can lead to a new scene. Here's an example:

```
Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.
```

![The Twine passage editor, showing a passage beginning a story](/intro-passage.png)

Once you've written the first scene of your story, click the `X` in the top-right corner or click the dark background outside of the editor box to return to the main story editor page.

----

## Create a Second Passage

Next, create a new passage by selecting the `Passage` tab in the top-left area of the editor and clicking the `+New` button. You'll see the two passages side-by-side in the story editor.

![The Twine story editor showing two passages, one called Intro and one Untitled](/two-passages.png)

Open the passage, and edit the title and contents. I've chosen to name my passage `The Clearing` because that's the topic of the scene, but you can name it whatever you want. The new passage should continue from where the first passage left off:

```
The spider explored the beautiful clearing, but all the trees were too far apart to support their web. They decided to keep exploring to see if they could find another place for their home.
```

![The Twine passage editor, showing a passage named 'The Clearing'](/second-passage.png)

Once you're finished with your second passage, click the `X` to close the passage editor and return to the main story editor page.

----

## Create a Link

Finally, it's time to add a *link* to the first passage that connects it to the new passage. Open the `intro` passage, and add the link by adding to the passage like so:

:::passage{title="Intro"}
```
Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

> [[The Clearing]]
```
:::

Links like this one have a couple of parts--the `>`, the `[[` and `]]`, and the *name* of the passage you want to link to (in this case, `The Clearing`, the new passage we just made). 

The `>`, `[[`, and `]]` all have to be exactly like in the example, but the *name* can be whatever you want **as long as it matches the name of a passage in your story**.

----

## Check the Connection

After adding the link, return to the main story editor. You'll see that your two passages are now connected visually.

![The Twine story editor, showing two passages connected by a link](/linked-passages.png)

Test your story by pressing the `Play` button. You'll notice that you can click the link at the end of your first passage, and the screen changes to show the next passage! A typical Twine story will have a lot of passages, and a *lot* of links connecting them. You can add as many passages and links as you like!

:::passage{title="Linked Passages Example" src="/spider-clearing.gif" tabs}
```intro
Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

> [[The Clearing]]
```
```the-clearing
The spider explored the beautiful clearing, but all the trees were too far apart to support their web. They decided to keep exploring to see if they could find another place for their home.
```
:::

## Named Links

Sometimes, you might want to use a different name for the link in the story versus in the editor. For example, I might want something like this:

:::passage{src="/named-link.png"}
```
# Jack & the Beanstalk

> [[intro]]
```
:::

The link in the passage above connects the reader to the passage called `intro`, but the button in the story says `Begin`--this lets the reader know what the purpose of the link is--it will begin the story. Using different names for links and passages is generally a good idea; it allows you (as the programmer) to use *expressive* passage names, and also lets you show the reader options that will make sense to them.

To accomplish this, you can create *named links*:

:::passage{src="/named-link.png"}
```
# Jack & the Beanstalk

> [[Begin->intro]]
```

In the example above, the link `> [[Begin->intro]]` will send the reader to the `intro` passage, but the link will show the text `Begin`. Most of the examples in the Twine Trail Guide will use this "named link" format, so it's a good idea to get acquainted with it!

---

