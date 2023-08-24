---
title: Linking With Variables
authors: Jon Stapleton
date: 8/1/2022
type: tutorial
layout: location
video: https://www.youtube.com/embed/kBbngnj2QLA
short: Use variables as links
description: In this tutorial, learn how to use variables within links to make your passages more flexible, able to lead the reader to many different locations rather than one pre-determined one. Links allow you to create passage "clusters" that readers can explore; once they reach a certain passage, you can use a variable to "unlock" a link to a new cluster, moving the story forward to a new place or scenario.
---

## Story Clusters

As you get more experienced with Twine, you might notice that your story structures follow some common patterns. Here are some examples:

* **Lines:** Each passage has one link that leads the reader to the next scene (think of a typical, non-interactive narrative)
* **Branches:** Most passages lead to two or more passages, creating a "tree" leading to one of many possible endings for the story (think of a "choose your own adventure" book)
* **Clusters:** Most passages lead to two or more passages, and sometimes the passages create loops (think of a level in a videogame, where you can visit rooms more than one time)
* **Cluster Chains:** Similar to cluster, but the story is made up of *several* clusters rather than just one. Each cluster is connected to one other cluster linearly

<!-- ![Divided into four quadrants, diagrams showing the four story formats described above](TODO:) -->

This tutorial covers how to create *cluster chains* where the reader has to visit a particular passage before the story makes the next cluster available to them. This technique involves using variables in conjunction with links in a clever way.

---

## Setting the Stage

First, it's helpful to imagine a "cluster chain" story to add the variable links to. Here's an example of a cluster-chain version of the story *Goldilocks & the Three Bears*. Check out the story flowchart below, or [play it here](/examples/goldilocks):

![The story map of the Goldilocks story linked above](/goldilocks-map.png)

The story has three clusters--the kitchen, the living room, and the bedroom (one for each location Goldilocks investigates while she is in the bears' home). The goal of the project is to make it so the reader has Golidlocks choose the "just right" option in each location before the plot moves forward--she has to try the small bowl of porridge in the kitchen, then sit in the small chair in the living room, and then sleep in the smallest bed in the bedroom. The story shouldn't let the reader move on to the next cluster until they complete the task for the preceding cluster.

**Here's how I set up each cluster in the story, step-by-step.** The first passage, which introduces the story and sets up all the variables, looks like this:

:::passage{title="Goldilocks Version 1" src="/goldilocks-intro.png" tabs}
```intro
kitchen: 'porridge'
kitchen_choice: 'Look for food'
--

One day, as Goldilocks was walking through the woods, she came upon a quaint cabin nestled in a copse of trees. After investigating the manicured yard and the verdant garden, she turned the doorknob and found it was unlocked!

> [[Go Inside->kitchen]]
```
:::

I've created two variables in this passage: 

* `kitchen`: A variable to store the name of the passage to send the reader to from the kitchen
* `kitchen_choice`: The text that the reader should click to follow the `kitchen` link

They are both `string` variables, meaning they store text (as opposed to a number). I don't use them in the intro passage--I'm just setting them up to use later on in the story in a different passage.

## Using Variables as Links

Each location in the story has a "home page" that the reader will return to after they make choices for Goldilocks. Here's the "home page" for the kitchen:

:::passage{title="Goldilocks Version 2" src="/goldilocks2-demo.gif" tabs}
```kitchen
Goldilocks looks around the kitchen.

> [[{kitchen_choice}->{kitchen}]]
```
```intro
kitchen: 'porridge'
kitchen_choice: 'Look for food'
--

One day, as Goldilocks was walking through the woods, she came upon a quaint cabin nestled in a copse of trees. After investigating the manicured yard and the verdant garden, she turned the doorknob and found it was unlocked!

> [[Go Inside->kitchen]]
```
:::

The passage above asks the computer to insert the value of the `kitchen_choice` and `kitchen` variables I set up in the `intro` into the `kitchen` page, but in this particular situation the effect is sort of interesting--I have inserted the variables into a link! Here's what the link would look like if I had written it out without the variable:

```
> [[Look for food->porridge]]
```

The values of the variables makes it so the link in `kitchen` leads to a passage called `porridge`! Now I need to add the new `porridge` passage to the story. Here's the story with the new material and the flowchart. Notice that `porridge` isn't connected to anything in the flowchart, and `kitchen` has that scary red symbol--this is normal! The computer can't tell which passage the link in `kitchen` is connected to because we are using a variable:

![Twine editor view of the story written out below](/porridge-cluster.png)

:::passage{title="Goldilocks Version 3" src="/goldilocks3-demo.gif" tabs}
```porridge
Goldilocks finds three bowls of porridge set out on the kitchen table: a big one, a medium one, and a small one.

> [[Try the big one->too-hot]]
> [[Try the medium one->too-cold]]
> [[Try the small one->just-right-porridge]]
```
```kitchen
Goldilocks looks around the kitchen.

> [[{kitchen_choice}->{kitchen}]]
```
```intro
kitchen: 'porridge'
kitchen_choice: 'Look for food'
--

One day, as Goldilocks was walking through the woods, she came upon a quaint cabin nestled in a copse of trees. After investigating the manicured yard and the verdant garden, she turned the doorknob and found it was unlocked!

> [[Go Inside->kitchen]]
```
:::

The reader needs to choose one of these three options. The passages called `too-hot` and `too-cold` lead back to the `kitchen` passage, but the `just-right-porridge` passage is special:

:::passage{title="Goldilocks Version 4" src="/goldilocks4-demo.gif" tabs}
```just-right-porridge
kitchen: "living-room"
kitchen_choice: "I wonder if there's a place to sit in the next room..."
--

The porridge in the small bowl is just right! Goldilocks eats up all the porridge in the small bowl and sighs contentedly.

> [[I wonder what else they have around here->kitchen]]
```
```too-hot
The porridge in the large bowl is too hot!

> [[Better find something else->porridge]]
```
```too-cold
The porridge in the medium bowl is too cold!

> [[Better find something else->porridge]]
```
```porridge
Goldilocks finds three bowls of porridge set out on the kitchen table: a big one, a medium one, and a small one.

> [[Try the big one->too-hot]]
> [[Try the medium one->too-cold]]
> [[Try the small one->just-right-porridge]]
```
```kitchen
Goldilocks looks around the kitchen.

> [[{kitchen_choice}->{kitchen}]]
```
```intro
kitchen: 'porridge'
kitchen_choice: 'Look for food'
--

One day, as Goldilocks was walking through the woods, she came upon a quaint cabin nestled in a copse of trees. After investigating the manicured yard and the verdant garden, she turned the doorknob and found it was unlocked!

> [[Go Inside->kitchen]]
```
```living-room
Nothing here yet!
```
:::

In the `just-right-porridge` passage, I've directed the computer to *modify* the value of the variables called `kitchen_choice` and `kitchen`. That way, when the user clicks the link to return to the `kitchen` passage, the value of the variables have changed! Now, the link `> [[{kitchen_choice}->{kitchen}]]` leads to a new passage--`living-room`!

![The full porridge cluster in the story written out above](/porridge-cluster-complete.png)

The rest of the story works just the same way; the "just right" option leads to a passage that modifies the link variable on the "home" page, unlocking the next passage and letting the reader move on to the next passage cluster. You can play through the story if you [click here](/examples/goldilocks). Try copying the starter story from the tutorial above and extend it!

---