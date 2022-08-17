---
title: Modifying Variables
authors: Jon Stapleton
date: 8/1/2022
type: tutorial
layout: location
short: Write code to modify the value of variables.
description: In this tutorial, you'll learn how to write code in your passage to modify the value of variables across your story. Variables are a very flexible tool for crafting your stories, but they can also be tricky. It's important to have a good mental model of how they work so you can use them creatively in your narratives. Once you know how to modify variables, you can have your story react to the choices the reader makes, and change how the story is being told "behind the scenes", making your narrative feel interactive and lifelike.
---

:::aside
This tutorial builds on the information from the *[Variable Basics](/locations/variable-basics)* tutorial--if you aren't sure what a variable is, consider checking that one out first!
:::

Variables are somewhat useful on their own, but they are *extremely* useful and powerful when you write code to *modify* their values during your story. [Check out this story](/examples/shop), where a shopkeeper reacts differently to the reader's second visit based on their behavior during their first visit.

This tutorial will show you how to set this kind of story up by creating and modifying variables in your story.

## Changing Dialogue

Here's what that story looks like in the editor:

![The Twine editor showing the story map for the story above](/shop-map.png)

...and here are the first two passages, called `Intro` and `Shop`:

:::passage{title="Intro"}
```
greeting: "Hello! Welcome to my shop."
--

You see a friendly little shop in a woodsy clearing ahead.

> [[Check out the shop->Shop]]
```
:::

:::passage{title="Shop"}
```
You see a friendly shopkeeper. A small bell rings above your head as the door swings open and you walk toward the counter. The shopkeeper waves and says:

"{greeting}"

> [[Hello! I'd like to purchase something->Nice]]
> [[Walk away rudely->Rude]]
```
:::

`Intro` sets up a variable called `greeting`, and then sends the reader to the `Shop` passage. The `Shop` passage *reads* the value of the `greeting` variable, inserting the value from the `Intro` passage into the story during the `Shop` passage. All of the variables you create are available to *all* of the passages in your story!

Then, the passage provides the reader with a choice between two different passages--a "nice" option that leads to the passage called `Nice`, and a "rude" option that leads to a passage called `Rude`. Here's what the `Nice` and `Rude` passages look like:

:::passage{title="Nice"}
```
greeting: "It's nice to see you again! Need anything?"
--

You step outside, and leave the shop for a while. Some time later, you find yourself outside the shop again.

> [[Enter the shop->Shop]]
```
:::

:::passage{title="Rude"}
```
greeting: "You're sort of a strange person, to walk in without saying hello!"
--

You step outside, and then think better of it. You turn around, and head back into the shop.

> [[Enter the shop->Shop]]
```
:::

Pay close attention to the "vars" section of the `Nice` and `Rude` passages--each one *modifies* the value of the `greeting` variable differently. When the code directs the computer to modify a variable that already has a value, the computer *discards* the old value and replaces it with the new one. Then, when the reader shows up to the `Shop` passage for a second time the passage still reads the `greeting`, but the value has changed!

![The new Nice version of the shop dialogue](/shop-return-new.png)

Here's what happens in the demo above in order from start to finish, including variable changes:

1. Run the `Intro` passage, which creates the `greeting` variable with the value `"Hello! Welcome to my shop."`
2. Run the `Shop` passage, which reads the `greeting` variable (`"Hello! Welcome to my shop."`)
3. Click the `"Hello! I'd like to purchase something"` option to go to the `Nice` passage
4. Run the `Nice` passage. It *modifies* the existing `greeting` variable, giving it a value of `"It's nice to see you again! Need anything?"` and discarding the old value
5. Run the `Shop` passage again. When it reads the `greeting` variable, it gets the new value set in `Nice` (`"It's nice to see you again! Need anything?"`)
6. Click the `"Walk away rudely"` option to go to the `Rude` passage
7. Run the `Rude` passage. It *modifies* the existing `greeting` variable, giving it a value of `"You're sort of a strange person, to walk in without saying hello!"` and discarding the old value
8. Run the `Shop` passage for a third time. When it reads the `greeting` variable, it gets the new value set in `Rude`.

If you're creative and tricky about when you modify variables, you can create interesting results that make your story feel more interactive!

---