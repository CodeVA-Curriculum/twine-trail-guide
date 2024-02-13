---
title: Archeological Puzzle Project
author: Jon Stapleton
short: A project using conditionals to profile a historical location
description: Conditionals allow you to set up puzzles in your story for the reader to solve. These sorts of stories can feel more like games than narratives--they are interactive, and can be designed to produce surprising results for the reader to explore. In this project, you'll profile a historical location and have the reader solve a puzzle to uncover new information about the people and events of that place.
# video: https://www.youtube.com/embed/VpGFJA5Fnyc
type: project
layout: location
---

## About the Project

For this project, you'll use your Twine skills to create a narrative that allows the reader to explore a historic location while solving a puzzle, uncovering new information about the people and events of that place. Imagine an archeologist uncovering a rusty key that opens a locked journal, or a historian finding clues to a historical figure's thoughts, feelings, and actions as they comb through a cluttered archive. To accomplish this, you'll need to use **variables** and **conditional statements** in your passages, showing new paths and new choices for the reader to select based on their previous actions and choices.

## How To

First, **pick a historical location** (check out the [UNESCO World Heritage map](https://whc.unesco.org/en/interactive-map/) for some ideas). You should choose places that have lots of recorded history you can dig into and research, and your chosen location should also "make sense" as an archeological site--somewhere there might be things to discover and uncover. Here are some ideas (but you should choose your own; don't limit yourself to items from the list below unless you can't think of anything):

* The Qutub Minar in Delhi, India
* The Gjellestad site in Norway
* The Budj Bim heritage areas in Victoria, Australia
* The Valley of the Kings near Thebes, Egypt
* Olduvai Gorge in Tanzania
* Huayna Picchu in Peru
* The Montpelier Estate in Virginia, USA
* Mesa Verde in New Mexico, USA

Next, design a story where the reader investigates the historical site and learns about the people who lived there and events that took place there. Think carefully about your narrative; you should consider the following:

* What were the experiences of indigenous peoples in your chosen location?
* How is this place a part of people's (e.g., indigenous peoples) lives in modern times? How does it hold cultural significance for a community of people today?
* How colonization play a role in events that transpired at your chosen location? How will you acknowledge the harms colonists/settlers perpetrated in your narrative?
* What sorts of harms have been perpetrated by archeologists at your location in the past? How will you acknowledge these harms in your narrative?
* Whose voice should be elevated in the telling of your chosen location's story? How might you elevate their voices in your narrative? Check out [this Native Lands map](https://native-land.ca/) as a starting point, and consider the role of non-Native marginalized people as well (e.g., enslaved peoples, displaced peoples).

As you design your story, think about how you might use conditional statements to let the reader "unlock" new portions of the narrative through choices they make. By the end, your story should include the following:

* Variables that change in value over the course of the story
* Conditional statements that let the reader "unlock" new parts of the story as they make choices
* A narrative that communicates information about the historical site, especially information about the people who lived there and events that transpired there

Consider including images from the site in your story! Check out the [tutorial on adding images](/locations/add-images) for info on how to accomplish this.

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