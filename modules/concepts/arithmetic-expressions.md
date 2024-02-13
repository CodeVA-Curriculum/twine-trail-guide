---
title: Arithmetic Expressions
authors: Jon Stapleton
date: 8/16/2022
type: tutorial
layout: location
video: https://www.youtube.com/embed/Kk_Xe0Dl30k
short: Modify number variables
description: This tutorial shows you how to modify number variables using arithmetic expressions--lines of code that use mathematical operations to assign a variable a value. You'll learn how to write arithmetic expressions, increment variables, and use variables as operands in mathematical expressions.
---

<script>
    import Image from '$lib/components/Image.svelte'
</script>

## Variables & Math

Number-type variables have a special capability that `string` variables do not: you can use them to perform mathematical operations. There are lots of reasons to have the computer do math during your stories; you could have the computer keep track of a score (if the reader is playing a game), for example. There are also some ways for you to use `number` variables to hide or show different parts of the story, but I won't get into that in this tutorial. Instead, this page focuses on writing and tracing code that includes `number` variables and arithmetic expressions.

You may have already learned how to create and modify variables in the *[Variable Basics](/locations/variable-basics)* tutorial; but if not, here's an example of a passage where I have the computer create a variable called `age` and store the number `15` in it:

:::passage{title="Passage With a Variable" src="/var-simple.png"}
```
age: 15
--

I am {age} years old.
```
:::

If I wanted to, I could write out a mathematical expression instead of the number `15`, like so:

:::passage{title="Passage With an Expression" src="/var-simple.png"}
```
age: 10 + (2+3)
--

I am {age} years old.
```
:::

The computer will "do" the math, and store the result in the variable! It doesn't matter how complicated the mathematical equation is--the computer will resolve it pretty much instantly and store the result in the variable. You have a lot of mathematical operations to choose from, each with its own symbol:

| Operator | Description | Example |
| -------- | ----------- | ------- |
| `+` | Add two numbers together | `2 + 2` |
| `-` | Find the difference between two numbers | `6 - 2` |
| `*` | Muliply two numbers together | `2 * 2` |
| `/` | Divide two numbers | `8 / 2` |
| `**` | Raise the first operand to the power of the second | `2 ** 2` |
| `%` | Find the remainder after dividing the two operands | `12 % 8` |

*Note: The result of each example equation above is `4`*

## Expressions with Variables as Operands

Just writing mathematical expressions instead of numbers in your code isn't all that useful. However, because the computer will interpret `number`-type variables as number data, we can use variables as *operands* in mathematical expressions. This opens up a couple of interesting possibilties that are worth highlighting here. For example:

:::passage{title="Using Variables as Operands" src="/var-expression.png"}
```
age: 15
age_in_days: age * 365.25
--

I am {age} years old, which means I am about {age_in_days} days old.
```
:::

In the passage above, I am using the variable called `age` in the equation that sets the value for the variable called `age_in_days`. When the computer tries to resolve the `age_in_days` equation, it will "look up" the current value of the `age` variable and use that value in its place in the equation `age * 365.25`.

## Incrementing Variables

You can also write expressions like this to **increment** a variable. "Increment" means to increase a variable's value by one. For example, imagine you wanted to create a `count` variable that could keep track of how many passages the reader has visited. First, you would make an `Intro` passage that sets the initial value of the variable called `count`:

:::passage{title="intro" src="/count1.png"}
```
count: 0
--

You have visited {count} passages.

> [[Next passage->Passage1]]
```
:::

Then, in each following passage, you would include something like this:

:::passage{title="passage1" src="/count2.png"}
```
count: count + 1
--

This is Passage 1. You have visited {count} passage(s).

> [[Next passage->Passage2]]
```
:::

The expression `count: count + 1` tells the computer to do the following:

1. Solve the equation `count + 1`
2. Store the result in the variable called `count`, discarding its old value

To complete step #1, the computer needs to "look up" the value of `count`. In the `Intro` passage, the computer set the `count` variable to a value of `0`, meaning that in `Passage1` the solution to the equation `count + 1` is `0 + 1`, or simply `1`.

In step #2, the computer discards `count`'s old value (`0`), and replaces it with the value it calculated in step #1 (`1`). Then, it stores the result (`1`) in the now-empty `count` variable. The effect of these two steps (as complicated as it is to explain it step-by-step) is to change `count`'s value from `0` to `1`.

I'll put something very similar into the `Passage2` passage:

:::passage{title="passage2" src="/count3.png"}
```
count: count + 1
--

This is Passage 2. You have visited {count} passage(s).

> [[Next passage->Passage1]]
```
:::

The story map now looks like this, with a "loop" between `Passage1` and `Passage2`:

![The Twine editor showing the story map for the passages described above](/var-map.png)

You can play through the story by [clicking here](/examples/count). When you play through it, you can see that the `count` variable keeps going up, even as I return to `Passage1`! There are lots of creative ways to use variables (making a counter is interesting, but perhaps not all that useful); try it out! You can test out the story below by [clicking here](/examples/count):

<!-- TODO: <iframe src="/examples/count" title="A Twine story demonstrating incrementing variables"></iframe> -->

:::passage{title="Incrementing Loop Example" src="/var-map.png" tabs}
```intro
count: 0
--

You have visited {count} passages.

> [[Next passage->Passage1]]
```
```passage1
count: count + 1
--

This is Passage 1. You have visited {count} passage(s).

> [[Next passage->Passage2]]
```
```passage2
count: count + 1
--

This is Passage 2. You have visited {count} passage(s).

> [[Next passage->Passage1]]
```
:::

---