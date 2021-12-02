---
title: Link Passages
author: Jon Stapleton
short: Allow the reader to progress through the story step-by-step
description: Each passage is like a scene in your story. Learn how to connect passages together with links, allowing the reader to move the story forward and uncover new scenes step-by-step.
type: tutorial
layout: location
---

## Create a Beginning Passage

Twine *passages* are like scenes in your story. They should be short and descriptive. Twine passages are connected by ***links***--clickable words that lead from one passage to another. Readers can click on links to move forward in the story from one scene to another.

Before you can create a link to a new passage, write a beginning scene for your story that can lead to a new scene. Here's an example:

> Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

![The Twine passage editor, showing a passage beginning a story](/intro-passage.png)

Once you've written the first scene of your story, click the `X` in the top-right corner or click the dark background outside of the editor box to return to the main story editor page.

----

## Create a Second Passage

Next, create a new passage by clicking the `+ Passage` button in the bottom-right corner of the editor. You'll see the two passages side-by-side in the story editor.

![The Twine story editor showing two passages, one called Intro and one Untitled](/two-passages.png)

Open the passage, and edit the title and contents. I've chosen to name my passage `The Clearing` because that's the topic of the scene, but you can name it whatever you want. The new passage should continue from where the first passage left off:

> The spider explored the beautiful clearing, but all the trees were too far apart to support their web. They decided to keep exploring to see if they could find another place for their home.

![The Twine passage editor, showing a passage named 'The Clearing'](/second-passage.png)

Once you're finished with your second passage, return to the main story editor page.

----

## Create a Link

Finally, it's time to add a *link* to the first passage that connects it to the new passage. Open the first passage, and add the link by adding to the passage like so:

```
Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

> [[The Clearing]]
```

Links like this one have a couple of parts--the `>`, the `[[` and `]]`, and the *name* of the passage you want to link to (in this case, `The Clearing`, the new passage we just made). 

The `>`, `[[`, and `]]` all have to be exactly like in the example, but the *name* can be whatever you want **as long as it matches the name of a passage in your story**.

----

## Check the Connection

After adding the link, return to the main story editor. You'll see that your two passages are now connected visually.

![The Twine story editor, showing two passages connected by a link](/linked-passages.png)

Test your story by pressing the `Play` button. You'll notice that you can click the link at the end of your first passage, and the screen changes to show the next passage!

A typical Twine story will have a lot of passages, and a *lot* of links connecting them. You can add as many passages and links as you like!

----

