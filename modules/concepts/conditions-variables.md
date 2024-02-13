---
title: Conditions & Variables
author: Jon Stapleton
short: Modify variables based on a Boolean value.
description: Conditional control structures are useful for displaying or hiding text based on the value of a variable, but what if you want to modify a variable based on the value of another variable? The Chapbook format of Twine includes a special variable assignment syntax for this exact task, allowing you to modify variables in your passages based on the results of a relational or logical expression.
video: https://www.youtube.com/embed/TaizAxHPWDE
type: tutorial
layout: location
---

## Modifying Variables Based on Conditions

Conditional control structures like ["if", "unless",](/locations/if-unless) or ["if-else" blocks](/locations/if-else) are useful for displaying or hiding text based on the value of a variable. But what if you want to [modify a variable](/locations/modify-variables) based on the value of another variable? The Chapbook format of Twine includes a special variable assignment syntax for this exact task, allowing you to modify variables in your passages based on the results of a [relational](/locations/relational-expression) or [logical expression](/locations/logic-operators).

:::aside
If you haven't learned about [creating](/locations/variable-basics) and [modifying](/locations/modify-variables) variables, ["if" blocks](/locations/if-unless), or [relational expressions](/locations/relational-expressions) yet, consider checking out the tutorials about those topics before continuing!
:::

## Creating Conditionally-Set Variables

Consider the following passage, which provides options to the reader based on whether or not they've collected a light source over the course of the story:

![GIF demonstration of the story below played out](/starting-point-demo.gif)

:::passage{title="Starting Point" src="/conditions-variables-example1.png" tabs}
```intro
lightSource: false
--

# A Dark Room

> [[Begin->room]]
```
```room
You find yourself in a dark room.

> [[Search for something in the darkness->search]]

[if lightSource]
> [[Turn on your light->reveal]]
```
```search
lightSource: true
--

You found a flashlight!

> [[Go back->room]]
```
```reveal
The beam of your flashlight passes over the room...
```
:::

This is a great way to have the reader "unlock" a new choice in the story; they'll need to find the part of the story that sets the variable called `lightSource` to `true` in order to proceed to the `reveal` passage. But what if you wanted the text to be more specific? For example, you might have an `item` variable that could be any number of light sources:

```
...

[if lightSource == "lantern"]
> [[Light your lantern->reveal]]

[if lightSource == "flashlight"]
> [[Turn on your flashlight->reveal]]

[if lightSource == "torch"]
> [[Ignite your torch->reveal]]

[unless lightSource]
> [[Search the room->search]]
```

That's a lot of `[if ]` blocks! Now imagine if you had even more options! It might get difficult to read the passage, and even harder to fix problems if the story doesn't work the way you expect it to! You might find using **conditionally-set variables** a little easier. Here's a new version of the passage above that uses these special variable assignment statements:

:::passage{title="Conditionally-Set Variables"}
```
lightText (lightSource == "lantern"): "Light your lantern"
lightText (lightSource == "flashlight"): "Light your torch"
lightText (lightSource == "torch"): "Turn on your flashlight"
--

You find yourself in a dark room.

[if lightText]
> [[{lightText}->reveal]]
[else]
> [[Search the room->search]]
```
:::

In the passage above, the computer first sets the variable `lightText` to `false`. Then, it evaluates each of the variable assignment commands after it one at a time:

* If the [relational expression](/locations/relational-expressions) after the variable and between the `(` and `)` is `true`, it sets the variable to value after the `:`
* If the expression is `false`, it does nothing and moves on to the next variable assignment command.
* After evaluating each line above the `--`, it displays the passage (inserting any variables as necessary)

It's sort of like using `[if ]` blocks, but instead of *displaying* or *hiding* text in the passage, the computer either *assigns* a value to a variable or *leaves it alone* based on the relational expression. You can read more about this topic in the Chapbook Wiki by [clicking here](https://klembot.github.io/chapbook/guide/state/conditions-and-variables.html).

---

## Using Conditionally-Set Variables

There are lots of ways to use conditionally-modified variables in your passages. You can use the state of variables to set the text of choices in the passage, or to add additional information to a passage based on the state of variables which are invisible to the reader:

![GIF demo of the story written out below](/help-text-demo.gif)

:::passage{title="Passage With Help Text" src="/help-text-flowchart.png" tabs}
```intro
lightChoice: false
item: ""
matches: false
--

# A Dark Room

> [[Begin->room]]
```
```room
lightChoice (item == "flashlight"): "Turn on the flashlight"
lightChoice (item == "lantern" && matches == true): "Light your lantern"

helpText: ""
helpText (item == "lantern" && matches == false): "If only you had some matches..."
--

You find yourself in a dark room. {helpText}

> [[Search for something in the darkness->search]]

[if lightChoice]
> [[{lightChoice}->reveal]]
```
```search
You find several things that might help...

> [[Pick up the lantern->lantern]]
> [[Pick up the flashlight->flashlight]]
```
```lantern
item: "lantern"
--

You pick up the lantern and head back to check out the room.

{embed passage: 'room'}
```
```flashlight
item: "flashlight"
--

You pick up the flashlight and head back to check out the room.

{embed passage: 'room'}
```
```reveal
The beam of your flashlight passes over the room...
```
:::

You could even use these kinds of variable assignments to send the reader to different locations in the story based on combinations of variable values:

:::passage{title="The Secret Room" src="/the-secret-door-demo.gif" tabs}
```intro
key: false
--

# The Secret Room

> [[Begin->door]]
```
```door
destination: "secret_room"
destination (key == false): "trap"
--

You see a door secured by a rusty padlock.

> [[Search the room->search]]
> [[Try the door->{destination}]]
```
```search
key: true
--

You search the room and find a key hidden under a loose cobblestone

> [[Approach the door->door]]
```
```trap
You fell into a terrible trap!

> [[Try again->intro]]
```
```secret_room
The lock opens and the door slowly creaks open...
```
:::

There are even more clever ways of using conditionally-set variables in your stories--don't be afraid to experiment!