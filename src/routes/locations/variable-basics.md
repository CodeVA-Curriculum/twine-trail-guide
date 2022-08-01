---
title: Variable Basics
authors: Jon Stapleton
date: 8/1/2022
type: tutorial
layout: location
short: A brief explaination of how to create and use variables.
description: In this tutorial, you'll learn all about variables. Variables are containers that store information; they allow you to direct your story to "remember" information for later, and use that information across multiple passages. Using variables allows you to simplify stories with a lot of repetition, but they also open up lots of creative possibilities after you learn some other skills, like modifying variables across your story or using variables to embed passages.
---

## What Is a Variable?

A variable is a *container* inside your computer that contains data. Programmers use variables to make computers "remember" information for later. You can think of your computer like a big, mostly empty warehouse. When you write code that tells the computer to create a variable, the computer reserves a small amount of that empty space for a box. Then, the computer will put some kind of data in the box--usually a number or a message of some kind. Finally, the computer will label the box so it can find it later on. After the computer creates a variable, the programmer can write code that directs the computer to recall and use the value in the box somehow (i.e., read the variable) or modify the value in the box. 

![Praxis comic panels](TODO:)

The variable stays in the computer's warehouse (i.e., memory) until the program ends or the code directs the computer to discard the variable.

## Creating Variables with Chapbook

To create variables to use in your passages, you need to add some code to a passage like so:

```
a_cool_message: "Hello!"
--

This is an example passage.
```

In the example above, I've created a variable called `a_cool_message`. Because I've written code that directs the computer to create a variable, the computer will create a "box" in its memory "warehouse" and label it with the name `a_cool_message`. The *value* I've told the computer to place *inside* the box is `"Hello!"`. You can imagine the computer has placed a slip of paper with the word `Hello!` in the box.

The area above the `--` is called the **"vars" section**. The code in the "vars" section follows different rules than the other parts of your passages. The area *below* the `--` is like a normal passage. Go ahead and add a passage like the one above to a story, and test it out. You should see something like this:

![The code above](TODO:)

You can see that the text in the "vars" section does not appear in the passage--that's because the code in the "vars" section is instruction for the computer to follow in the "background". The variable called `a_cool_message` is in the computer's memory warehouse, but the reader can't see that--variables are kind of secret that way; the reader will not be able to see their value unless you want them to.

## Using Variables

To show the reader the value of a variable, you can include it in your passage like so:

<!-- TODO: migrate from rath-python or one of the other ones -->
:::code-and-example{src="TODO:"}
```
a_cool_message: "Hello!"
--

This is an example. The variable is {a_cool_message}.
```
:::

There are a couple of things to notice about this example. First, the `"`s around `"Hello!"` don't show up in the passage--I will cover the reason for this in the following section. The second thing to note is that the computer has *automatically* replaced the text `{a_cool_message}` with the variable's value: `Hello!`.

You can create and use as many variables as you like in your passages. You can even use one variable multiple times!

:::code-and-example{src="TODO:"}
```
affirmation: "Nice."
creature: "woodchuck"
material: "wood"
--

How much {material} could a {creature} chuck if a {creature} could chuck {material}?
```
:::

## Types of Variables

There are two types of basic variables available to you when you use the Chapbook format: **strings** and **numbers**. Strings are messages, *strings* of text characters. All of the examples above use strings for the variable values. All strings *must* have `"`s on either side of them to tell the computer where the string begins and ends. When the computer reads a string value, it discards the quotation marks and just uses the letters and such between them.

Number variables represent quantities or numerical values. When you create a number variable, you don't need to use `"` like you would with strings. Here's an example:

:::code-and-example{src="TODO:"}
```
age: 25
--

I am {age} years old.
```
:::

You can direct the computer to read number variables the same way as strings. The big difference between strings and number variables is you can use number variables to have the computer solve mathematical expressions--you can read more about that in the *[Expressions With Variables](/locations/expressions-with-variables)* tutorial.

---