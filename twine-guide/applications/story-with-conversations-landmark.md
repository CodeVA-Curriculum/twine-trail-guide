---
title: Story With Conversations
author: Jon Stapleton
short: A project where characters react to the reader's choices.
description: Create a story where the reader holds conversations with people involved in an important historical moment in American history. As the reader explores the setting, the characters should respond to the reader's choices & actions.
# video: https://youtube.com/embed/33OQtxF7L8g
type: project
# TODO: synthesize "layout" and "type"
layout: location
---

## About the Project

One of the great things about interactive narratives is the possibility for the story to respond to the choices the reader makes. One way to make your interactive narrative feel life-like is to use variables to change what different characters say based on what the reader does in the story. This project prompts you to create a story about a big event in history, and try to imagine what the people there would say to one another. As the reader discovers more information, the characters' scripts should change to reveal more information about their inner thoughts, their lives, and how they are making sense of the historical moment they are living in.

## How To

First, decide on an event you'd like to chronicle in your story. You should consider choosing a topic that has a good number of primary accounts of the event, especially interviews and details about the people who were there. Here are some options you could consider:

* The protests around the passage of the Americans with Disabilities Act, where disabled Americans organized to advocate for their rights and the passage of this important legislation 
* The March on Washington, where many activists and organizers involved in the Civil Rights Movement convened on Washington D.C. to advocate for their rights
* The Oklahoma or West Virginia teacher protests of 2018, where educators went on strike to advocate for better pay & benefits

Then, pick several "main characters" for the reader to "talk to" during the story. Gather as much information as you can about them! Here are some questions you might want to answer about the main characters before you start writing:

1. Why were they attending the event?
2. What did they think of the other people who were there?
3. Did they know anyone else who was attending? What would they have talked about?

Finally, start writing the passages for your story. By the end, your story should have the following qualities:

* The reader can "visit" and "speak to" the main characters more than one time during the course of the story
* The main characters say different things when the reader re-visits them
* The main characters "react" (i.e., their scripts change) based on what the other main characters say
* Events unfold around the main characters as the reader visits them, giving the impression of events proceeding apace around the reader and the characters

---

## Save Your Work

Twine saves your work in your browser, but that's not a very secure way to keep your story safe. To create a secure and permanent version of your story, click the name of your story in the bottom-left of the story editor and select `Publish to File`. The file that your computer saves when you click that button is a portable version of your story that you can send to other people and keep for yourself.

![The Twine story editor showing the 'Publish to File' button that allows the author to download their story in HTML format](/publish-to-file.png)

Make sure you save your work!

## Troubleshooting

Here are some common problems people run into when they are first starting out with Twine:

* **Embed Format Issues:** When you embed a passage, the line of code must follow this pattern: `{embed passage: '[passage name]'}`, with `[passage name]` being replaced by the name of the passage you'd like to embed. Don't forget to put `'`s around the passage name!
* **Variable Format Issues:** When you create or modify variables, the code must follow this pattern: `v_name: [value]`, where you replace `v_name` with the name of the variable you'd like to create or modify, and you replace `[value]` with the data you'd like the computer to store in the specified variable. If your variable is a `string`, you need to put `'`s around it (e.g., `v_name: 'Hello World!').
* **Link Name Typos:** Whenever you make a link, the name has to match another passage in your story. If it doesn't Twine will create a *new* passage with the name of your mispelled link. Double-check your spelling to avoid confusion
* **Not Testing Often:** You should test your code as *often as possible*. Testing your story frequently will help you catch errors before they pile up and become difficult to fix
* **Link Format Errors:** All of your links need to follow the same format: `> [[passage-name]]`, with the name of one of your passages in place of `passage-name`. There are some [other kinds of links](https://klembot.github.io/chapbook/guide/text-and-links/simple-links.html) that also work, but I recommend sticking with the "normal" way until you get comfortable recognizing errors
* **Spaces and Capitalization:** Twine keeps track of spacing and capitalization, so make sure you pay attention to it as well (especially with passage names)

---