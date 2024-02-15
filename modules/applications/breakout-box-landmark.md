---
title: Mystery Figure Project
author: Jon Stapleton
short: A project using conditionals to profile a historical figure
description: Conditionals allow you to set up puzzles in your story for the reader to solve. These sorts of stories can feel more like games than narratives--they are interactive, and can be designed to produce surprising results for the reader to explore. In this project, you'll use conditional statements to create a puzzle where the reader must uncover the identity of a historical figure.
# video: https://www.youtube.com/embed/VpGFJA5Fnyc
type: project
layout: location
---

## About the Project

For this project, you'll use your Twine skills to create a "game" that asks the reader to discover clues and solve a puzzle about an important historical figure. The reader will need to use their knowledge of history to unlock clues, come up with a hypothesis about who the figure is, and eventually "unlock" the ending of the story to reveal the historical figure's identity. Your story should be informative, creating opportunities for the reader to learn new and surprising facts about the historical figure in question.

## How To

First, choose a **historical figure** to profile in your project. You should choose someone you either know a lot about, or someone who you can research to learn the details of their life. Here are some ideas (but you should choose someone *you* think is interesting--don't limit yourself to the suggestions below unless you can't think of anything):

* Alan Turing, the code-cracking computer scientist
* Ada Lovelace, the mathmatician and inventor of programming
* Frederick Douglas, the abolitionist writer and orator
* Frida Kahlo, the indigenous magical realist painter
* Octavia E. Butler, the famous & influential science fiction writer

Next, design a story where the reader uncovers information about the historical figure. Be creative! There are lots of ways to present the clues--you could have the reader explore a museum with historical artifacts, interview the historical figure's family, investigate the town where the figure once lived, or solve a made-up mystery involving the historical figure. By the end, your story should include the following:

* Variables that change in value over the course of the story
* Conditional statements that let the reader "unlock" new parts of the story as they make choices
* A narrative that communicates information about the historical figure
* A question at the end of the story where the reader must guess the name of the historical figure, followed by a passage that tells the reader if they guessed correctly or not

Consider including images in your story to set the tone or provide clues! Check out the [tutorial on adding images](/locations/add-images) for info on how to accomplish this.

## Troubleshooting

Here are some common problems people run into when they are first starting out with Twine:

* **Forgetting to `[continue]`:** Remember--if you want the computer to display a section of text *after* an `[if ]` or `[unless ]` block regardless of the results of the conditional, you'll need to add a `[continue]` command after the `[if ]` block and before the following text.
* **Modifying [if ] Variables:** Conditional blocks like `[if ]` and `[unless ]` tell the computer to either *display* or *hide* a section of text based on the value of a variable; if you want the computer to reveal a section after hiding it at first (or vice-versa), you need to have the computer *modify* the relevant variable at some other point in the story (usually in another passage).
* **Setting Initial Variable Values:** Be sure to set your variables to the right value at the beginning of the story!
* **Debugging Variables:** Use the "testing" interface in Twine to see the value of each variable in your story as you run each passage, and make sure the variables change in the way you expect them to as you progress through the story.
* **Relational Operators:** Make sure you are "spelling" your relational operators correctly! For example, lots of beginners accidentally use `=` when they mean to use `==`

## Save Your Work

Twine saves your work in your browser, but that's not a very secure way to keep your story safe. To create a secure and permanent version of your story, click the name of your story in the bottom-left of the story editor and select `Publish to File`. The file that your computer saves when you click that button is a portable version of your story that you can send to other people and keep for yourself.

![The Twine story editor showing the 'Publish to File' button that allows the author to download their story in HTML format](/publish-to-file.png)

Make sure you save your work!