---
title: Logical Operations
author: Jon Stapleton
short: Compare Boolean values with logic operators.
description: When you write stories that include conditional control structures, you might find yourself wanting to have the computer display or hide text based on more than one condition. For example, you might want to offer the reader an option to pick up a key from the floor of a dark room, but only if they haven't already picked it up and they have found the flashlight beforehand. You can use logical operations to accomplish this kind of task.
# video: https://www.youtube.com/embed/VpGFJA5Fnyc
type: tutorial
layout: location
---

## Using Logical Operators

Logic operators allow you to write [conditional control structures](/locations/if-unless) that include more than one Boolean value or relational expression (expressions that resolve to a Boolean value of either `true` or `false`, read more [here](/locations/relational-expressions)). That's a lot of jargon--here's an example to help explain what I mean.

:::aside
If you haven't learned about ["if/unless"](/locations/if-unless) blocks, ["if/else" blocks](/locations/if-else), or [relational expressions](/locations/relational-expressions), you might see some unfamiliar concepts in this tutorial.
:::

Imagine an interactive story where the reader needs to light a torch to illuminate a room. In order to do this, they need to find flint *and* steel so they can make sparks and create fire. You might create a passage like this as a start:

:::passage{title="Torch Room"}
```
You see a dark room, with an unlit iron brazier in the center.

[if flint]
> [[Light the brazier->lit]]
[else]
If only I had some flint and steel to light the brazier...

> [[Search the hallway->hallway]]
> [[Search the stairs->stairs]]
```
:::

In this example, if the variable `flint` has a value of `true`, the computer displays the link leading to the `lit` passage. Otherwise, it shows the two passages that will allow the reader to search for the items they need.

The passage above doesn't work exactly as it should--I only want the computer to show the `"Light the torch"` option if *both* `flint` and `steel` are `true`. If one of them is still `false`, the reader should need to search around the story to find them. To fix the passage so it works as intended, I'll use a **logic operator**:

:::passage{title="Torch Room"}
```
_foundEverything: flint && steel
--

You see a dark room, with an unlit iron brazier in the center.

[if _foundEverything]
> [[Light the brazier->lit]]
[else]
If only I had some flint and steel to light the brazier...

> [[Search the hallway->hallway]]
> [[Search the stairs->stairs]]
```
:::

Check out the first line-I've added a *temporary* variable to the passage set to the value `flint && steel`. The `&&` symbol is a **logic operator** that compares two Boolean values; if both values are `true`, the **logical expression** produces a value of `true`. Otherwise, it produces a value of `false`. Logical expressions work exactly the same way as [arithmetic expressions](/locations/arithmetic-expressions) and [relational expressions](/locations/relational-expressions), except instead of comparing numbers or strings to one another or calculating new values, they compare two *Boolean* values to produce a new Boolean value based on them.

Here's a more complete version of the story that uses a logical operation as demonstrated above; Try it out by [clicking here](/examples/unlit-brazier)!

![GIF of a reader playing through the Unlit Brazier story below](/the-unlit-brazier-demo.gif)

:::passage{title="The Unlit Brazier" src="/unlit-room.png" tabs}
```intro
flint: false
steel: false
--

# The Unlit Room

> [[Begin->torch-room]]
```
```torch-room
_foundEverything: flint && steel
--

You see a dark room, with an unlit iron brazier in the center.

[if _foundEverything]
> [[Light the brazier->lit]]
[else]
If only I had some flint and steel to light the brazier...

> [[Search the hallway->hallway]]
> [[Search the stairs->stairs]]
```
```hallway
flint: true
--

You pace around the room and find a narrow hall leading off into the house. You feel something underfoot as you ease forward into the pitch darkness... a piece of **flint**?

> [[Return->torch-room]]
```
```stairs
steel: true
--

You feel your shin smash against a wooden stair. On your hands and knees, you feel around the dusty floor and feel something cold... A **knife**.

> [[Return->torch-room]]
```
```lit
The brazier roars to life!
```
:::

You can also use [relational expressions](/locations/relational-expressions) as operands in your logical expressions:

```
_bonus: score > 10 && time < 30
--

Your score is {score}! Nice job.

[if _bonus]
Whoa! You got a great score *and* finished really quickly!
```

There are a lot of ways to use logic operators--try combining them in different ways to see what happens with your `[if/unless ]` blocks!

---

## Logical Operators

There are three logic operators available to you in Chapbook Twine passages:

| Operator | Name | Description | Example Expression | Value Produced |
| -------- | ---- | ----------- | ------------------ | -------------- |
| `&&`     | "and" | Compare two Boolean values. If they are both `true`, produce `true`; Otherwise, produce `false`. | `true && false` | `false` |
| `||`     | "or" | Compare two Boolean values. If at least one of them is `true`, produce `true`; otherwise, produce `false`. | `true && false` | `true` |
| `!`      | "not" | Produce the opposite of one Boolean value. If the value is `true`, produce false; if it's `false`, produce `true` | `!false` | `true` |

Try them out in your variables, and use them in `[if ]` statements to create interactive passages that respond to user's choices!