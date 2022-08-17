---
title: Linking With Variables
authors: Jon Stapleton
date: 8/1/2022
type: tutorial
layout: location
short: Use variables as links
description: In this tutorial, learn how to use variables within links to make your passages more flexible, able to lead the reader to many different locations rather than one pre-determined one. Links allow you to create passage "clusters" that readers can explore; once they reach a certain passage, you can use a variable to "unlock" a link to a new cluster, moving the story forward to a new place or scenario.
---

## Story Clusters

As you get more experienced with Twine, you might notice that your story structures follow some common patterns. Here are some examples:

* **Lines:** Each passage has one link that leads the reader to the next scene (think of a typical, non-interactive narrative)
* **Branches:** Most passages lead to two or more passages, creating a "tree" leading to one of many possible endings for the story (think of a "choose your own adventure" book)
* **Clusters:** Most passages lead to two or more passages, and sometimes the passages create loops (think of a level in a videogame, where you can visit rooms more than one time)
* **Cluster Chains:** Similar to cluster, but the story is made up of *several* clusters rather than just one. Each cluster is connected to one other cluster linearly

![Divided into four quadrants, diagrams showing the four story formats described above](TODO:)

This tutorial covers how to create *cluster chains* where the reader has to visit a particular passage before the story makes the next cluster available to them. This technique involves using variables in conjunction with links in a clever way.

## Setting the Stage

First, it's helpful to imagine a "cluster chain" story to add the variable links to. Here's an example of a cluster-chain version of the story *Goldilocks & the Three Bears*. Check out the story flowchart below, or [play it here](TODO:):

![Flowchart](TODO:)

The story has three clusters--the kitchen, the living room, and the bedroom (one for each location Goldilocks investigates while she is in the bears' home). The goal of the project is to make it so the reader has Golidlocks choose the "just right" option in each location before the plot moves forward--she has to try the small bowl of porridge in the kitchen, then sit in the small chair in the living room, and then sleep in the smallest bed in the bedroom. The story shouldn't let the reader move on to the next cluster until they complete the task for the preceding cluster.

The first passage, which introduces the story and sets up all the variables, looks like this:

:::passage{title="Intro"}
```
kitchen = "Look for food->Porridge"
living_room = "Investigate->Chairs"
bedroom = "Investigate->Beds"
--

One day, as Goldilocks was walking through the woods, she came upon a quaint cabin nestled in a copse of trees. After investigating the manicured yard and the verdant garden, she turned the doorknob and found it was unlocked!

> [[Go Inside->Kitchen]]
```
:::

I've created three variables in this passage: `kitchen`, `living_room`, and `bedroom`. They are all `string` variables, meaning they store text (as opposed to a number). They look sort of like links--that's intentional.

## Using Variables as Links

Each location in the story has a "home page" that the reader will return to after they make choices for Goldilocks. Here's the home page for the kitchen:

:::passage{title="Kitchen"}
```
Goldilocks looks around the kitchen.

> [[{kitchen}]]
```
:::

The passage above asks the computer to insert the value of the `kitchen` variable into the page, but in this particular situation the effect is sort of interesting--I have inserted the variable into the link! Here's what the link would look like if I had written it out without the variable:

```
> [[Look for food->Porridge]]
```

The value of the variable makes it so the link in `Kitchen` leads to the passage called `Porridge`; here it is:

:::passage{title="Porridge"}
```

Goldilocks finds three bowls of porridge set out on the kitchen table: a big one, a medium one, and a small one.

> [[Try the big one->Too Hot]]
> [[Try the medium one->Too cold]]
> [[Try the small one->Just Right (Porridge)]]
```
:::

The reader needs to choose one of these three options. The passages called `Too Hot` and `Too Cold` lead back to the `Kitchen` passage, but the `Just Right (Porridge)` passage is special:

:::passage{title="Just Right (Porridge)"}
```
kitchen = "I wonder if there's a place to sit in the next room...->Living Room"
--

The porridge in the small bowl is just right! Goldilocks eats up all the porridge in the small bowl and sighs contentedly.

> [[I wonder what else they have around here->Kitchen]]
```
:::

In the `Just Right (Porridge)` passage, I've directed the computer to *modify* the value of the variable called `kitchen`. That way, when the user clicks the link to return to the `Kitchen` passage, the value of the variable has changed! Now, the link `> [[{kitchen}]]` leads to a new passage!

The rest of the story works just the same way; the "just right" option leads to a passage that modifies the link variable on the "home" page, unlocking the next passage and letting the reader move on to the next passage cluster. You can dig through the example Twine story to see how it works by downloading the story ([click here](TODO:)) and uploading it to Twine on your computer. Try it out!

---