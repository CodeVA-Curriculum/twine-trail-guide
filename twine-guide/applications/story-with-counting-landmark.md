---
title: Vote Counting Story
author: Jon Stapleton
short: Keep a count using variables
description: Create a story where the computer keeps track of a vote count during an important election in American history. Explore the viewpoints of the people who participated, and learn about their reactions to how events unfolded.
# video: https://youtube.com/embed/33OQtxF7L8g
type: project
# TODO: synthesize "layout" and "type"
layout: location
---

## About the Project

In this project, you'll use variables to keep track of a number that changes over the course of the story. While number variables can represent anything--a count or an age, for example--your story should be about counting votes. There are lots of situations in American history where votes played an important role in the future of the country. Your job is to investigate one of those events, and create a story where the reader talks to different people involved in the event and discovers how they will vote. The computer should keep track of the votes they uncover, and show them to the reader periodically. Eventually, the reader should be able to end the story and compare the votes they uncovered to the subsequent events that unfolded. By speaking to different people about their votes, the reader should understand the many important roles that voting plays in civic life and also speak to the concerns of different stakeholders at an important moment in American history.

---

## How To

First, decide on an event you'd like to chronicle in your story. You should consider choosing a topic that has a good number of primary accounts of the event, especially interviews and details about the people who were there. Your event should also involve voting, somehow. Here are some options you could consider:

* The 2000 Presidential election, where Florida's results were decided by the Supreme Court after a close recount 
* The failed ratification of the Equal Right Amendment to the Constitution
* The passage of the Civil Right Act
* The Constitutional Convention where the original U.S. Constitution was ratified
* A recent local election in your community

Then, create several characters for the reader to "talk to" during the story. These characters should represent the different viewpoints of the folks involved in your historical event. Consider the roles of activists, protestors, government workers, the politicians involved, and ordinary citizens in your chosen event. Your characters can be actual historical figures, or they can be made up--just make sure your characters hold *actual viewpoints* from people involved in the event! Come up with answers to the following questions for each character you create:

1. How did they vote in your chosen historical event?
2. What were the reasons for their vote?
3. What do they think of the events unfolding around them? What outcome do they support?
4. How did/would they react to how events unfolded?

Finally, start writing the passages for your story. Your story should take place in two parts. In the first part, the reader should explore the location where your chosen event takes place, and talk to characters about their votes. Keep a running count of folks' votes using variables, and display those counts to the reader periodically. The goal of the first part should be to learn about folks' perspectives, and figure out how people voted.

The second part should take place *after* the votes have been counted and the result has been decided. In this part of the story, the reader should be able to revisit the characters they talked to in *Part 1* and learn how the characters reacted to the result.

---

## Save Your Work

Twine saves your work in your browser, but that's not a very secure way to keep your story safe. To create a secure and permanent version of your story, click the name of your story in the bottom-left of the story editor and select `Publish to File`. The file that your computer saves when you click that button is a portable version of your story that you can send to other people and keep for yourself.

![The Twine story editor showing the 'Publish to File' button that allows the author to download their story in HTML format](/publish-to-file.png)

Make sure you save your work!

## Troubleshooting

Here are some common problems people run into when they are first starting out with Twine:

* **Variable Format Issues:** When you create or modify variables, the code must follow this pattern: `v_name: [value]`, where you replace `v_name` with the name of the variable you'd like to create or modify, and you replace `[value]` with the data you'd like the computer to store in the specified variable. If your variable is a `string`, you need to put `'`s around it (e.g., `v_name: 'Hello World!').
* **Link Name Typos:** Whenever you make a link, the name has to match another passage in your story. If it doesn't Twine will create a *new* passage with the name of your mispelled link. Double-check your spelling to avoid confusion
* **Not Testing Often:** You should test your code as *often as possible*. Testing your story frequently will help you catch errors before they pile up and become difficult to fix
* **Link Format Errors:** All of your links need to follow the same format: `> [[passage-name]]`, with the name of one of your passages in place of `passage-name`. There are some [other kinds of links](https://klembot.github.io/chapbook/guide/text-and-links/simple-links.html) that also work, but I recommend sticking with the "normal" way until you get comfortable recognizing errors
* **Spaces and Capitalization:** Twine keeps track of spacing and capitalization, so make sure you pay attention to it as well (especially with passage names)

---