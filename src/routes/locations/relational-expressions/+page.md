---
title: Relational Expressions
author: Jon Stapleton
short: Learn how to write relational expressions
description: Relational expressions (or "Boolean" expressions) are a way of having the computer compare two or more values and produce a value of "true" or "false" based on the comparison. Because "true" and "false" variable values are such an important part of "if" statements and other conditional control structures, you'll find lots of uses for relational expressions in your stories that use "if" and "unless" blocks.
# video: https://www.youtube.com/embed/VpGFJA5Fnyc
type: tutorial
layout: location
---

## Shortcomings of Boolean Variables

If you've written passages with `[if ]`/`[continue]` conditional blocks, then you may already know how powerful having the computer choose to *display* or *hide* text based on a variable can be (read about [`if/unless`](/locations/if-unless) & [`if/else`](/locations/if-else) if you haven't). You can create all sorts of little puzzles for readers to engage with as they experience your story. Twine stories that use conditionals can feel more like games than narratives, and they can get really complex!

But what if you wanted the computer to choose whether or not to display some text based on a non-Boolean variable? If you only use Boolean variables (variables that can only be either `true` or `false`), you can only write `[if ]` statements like these...

```
[if hasKey]
Try to unlock the door!
[else]
You can't unlock the door.
```

...where the computer looks at the variable's value and either *displays* or *skips* a section of the passage based on whether that variable has a value of `true` or `false` when the computer reads it. What if you wanted the computer to display a section based on how high a `score` number variable is, or based on the value of a string-type variable?

---

## Using Relational Expressions with Conditionals

The Chapbook format of Twine has a way for you to use number and string variables in your `[if ]` statements: **relational expressions**. Relational expressions are sort of like [arithmetic expressions](/locations/arithmetic-expressions), but instead of producing numbers like a math equation, they *compare* numbers or strings and produce *Boolean* values. Here's an example of a relational expression:

:::passage{title="Relational Expression Example" src="/simple-relational-expression.png"}
```
var: 2 > 5
--

The variable value is: {var}
```
:::

Check out the `var` variable--what value is the passage giving that variable? To find out, you need to *evaluate* the relational expression `2 > 5`. In this case, the relational expression is `false`--the number `2` is *not* greater than the number `5`. The passage above assigns the variable `var` a value of `false`!

In the example above, I could accomplish the same thing by just writing `var: false`. But, just like with [arithmetic expressions](/locations/arithmetic-expressions), I can use variables in relational expressions. Here's an example:

```
_readerWins: score > 5
--

That's the end!

[if _readerWins]
You won!
[else]
You lost...
```

The value of the Boolean variable `readerWins` *depends* on the value of the number variable called `score`; if `score` is greater than 5, then the variable called `readerWins` will be `true`. Otherwise, it will get a value of `false`. Then, when the computer reads the passage, it will display different messages based on the value of the `readerWins` variable!

Here's a more complete example, which shows a simple "scavenger hunt" sort of story, where the reader has to find all of the coins before they can reach the end of the tale. You can play the story yourself by [clicking here](/examples/great-coin-hunt).

![Story editor view of the story written below](/great-coin-hunt.png)

:::passage{title="The Great Coin Hunt" src="/the-coin-hunt-demo.gif" tabs}
```title
score: 0
--

# The Great Coin Hunt

*A story demonstrating a relational expression*

> [[Begin->quest]]
```
```quest
_finished: score > 2
--

You see a hunched figure in a dark cloak. They approach, and say:

[if _finished]
You have found the secret coins. Follow me, traveler...

> [[Follow the hunched figure->end]]
[else]
"Find the hidden coins three, and I will show you the way forward"

> [[Search the road->road]]
> [[Search the forest->forest]]
> [[Search the cabin->cabin]]
```
```road
score: score + 1
--

You find a shining, gold coin buried in the dirt.

> [[Return->quest]]
```
```forest
score: score + 1
--

A massive, panting wolf approaches you and gently places a glistening gold coin in your hand before loping into the darkness.

> [[Return->quest]]
```
```cabin
score: score + 1
--

You see something shine from beneath the floorboards. You pry it up, and find a gold coin.

> [[Return->quest]]
```
```end
You follow the figure into the mist, to adventures unknown...

# The End
```
:::

Try editing the story above so you need to find *five* coins instead of three to practice your skills!

---

## Relational Expressions

There are several kinds of relational operators available to you in the Chapbook format of Twine. Here is a summary:

| Operator | Name | Description | Example | Value |
| -------- | ---- | ----------- | ------------------ | -------------- |
| `==`     | "Is equal to" | Compares two values. If they are the same, produce `true`; otherwise, produce `false` | `5 == 5` | `true` |
| `<`      | "Is less than" | Compares two values. If the first value is less than the second, produce `true`; otherwise, produce `false`. | `2 < 1` | `false` |
| `>`      | "Is greater than" | Compares two values. If the first value is greater than the second, produce `true`; otherwise, produce `false`. | `4 > 3` | `true` |
| `!=`     | "Is not equal to" | Compares two values. If they are not equal, produce `true`; otherwise, produce `false` | `5 != 5` | `false` |
| `<=`     | "Is less than or equal to" | Compares two values. If the first value is less than or equal to the second, produce `true`; otherwise produce `false` | `3 <= 3` | `true` |
| `>=`     | "Is greater than or equal to" | Compares two values. If the first value is greater than or equal to the second, produce `true`; otherwise produce `false` | `2 >= 1` | `false` |

Try them out in your variables, and use them in `[if ]` statements to create interactive passages that respond to user's choices!