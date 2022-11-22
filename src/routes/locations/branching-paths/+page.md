---
title: Branching Paths
author: Jon Stapleton
short: Learn how to give your reader choices in the story that each lead to different passages.
description: Twine stories are about choices. This tutorial covers how to add multiple links to a passage, allowing users to make choices that affect how the story ends.
video: https://www.youtube.com/embed/_PK5kNc4LrQ
type: tutorial
layout: location
---

## Create a Choice

Before you begin, make sure you've got a good idea of what your story might be about, and that you have at least one "starting" passage and one linked passage for the reader to follow.

Twine stories are interactive, which means the author (that's you) can create **options** for the reader to choose from, and connect each option to a different part of the story. Consider this starting passage:

```
Once upon a time, a spider was looking for a place to spin their web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing.

> [[The Clearing]]
```

In this scene, the reader only has one choice--they can go to `The Clearing`. But what if they had another choice?

```
Once upon a time, a spider was looking for a place to spin thier web. They walked into the forest alone, looking for a good spot to make their new home. Over the hill, they spotted a peaceful clearing; to the right, they spotted a rotten old log.

> [[The Clearing]]
> [[The Rotten Log]]
```

By adding a second link, you can create a *choice* for the reader. After adding a second link, return to the main story editor. You'll notice that Twine automatically created a new passage with a name matching the one we created in the first passage: `The Rotten Log`. Nice!

![The Twine story editor showing three passages connected to one another.](/branching-path.png)

----

## Edit the New Passage

Twine created the `Rotten Log` passage for us, but we still need to go into it and add the story part. Here's what I wrote:

> The spider clambered up the soft wood, and was surprised to find a nest of ants milling around inside the log! The spider quietly stepped away, not wanting to disturb them. The spider carefully returned to the path, and noticed a pond glimmering in the distance near the clearing they noticed before.

My new passage needs some links! One of them will lead back to `The Clearing`, and the other will lead to a new passage that I will choose to name `The Pond`.

```
> [[The Clearing]]
> [[The Pond]]
```

Here's what my story editor looks like after adding the the links to my `Rotten Log` passage:

![The Twine story editor, showing four passages connected together](/new-branch.png)

----

## Test the Story

After adding a few new passages and links, it's a good idea to test out the story to make sure everything works the way you intended it to. Try adding some choices to your story, then press the `Play` button to test it out! You can refresh your story tab to return to the first passage if you want to test each of the choices in your story.

----

