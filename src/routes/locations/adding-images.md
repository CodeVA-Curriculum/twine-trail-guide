---
title: Adding Images
# TODO: incorporate author into location cards
author: Jon Stapleton
short: Learn how to add images to your Twine passages.
description: Images are a great way of adding new interest to your Twine passages. They can convey a mood, provide additional information for the reader, or even create something for the reader to investigate as they make choices to move the story forward. This tutorial demonstrates how to add images from the web to a Twine passage.
# video: https://youtube.com/embed/p91bou3cJuA
type: tutorial
layout: location
---

## Finding an Image

The first thing to do if you want to add an image to a Twine passage is to find a *link* to an image. All images on the web have a link to their location, and you can use that link to include the image in your story. Here are some options to check out:

* Search for a stock image on [Unsplash](https://unsplash.com/)
* Find an image from the [Library of Virginia](https://edu.lva.virginia.gov/about/) collections

Just make sure you have permission to use the image from the person who owns it! [Unsplash](https://unsplash.com/) only has stock photos, which means you can use them in your stories no problem. It's important to only use images that you have permission to use!

---

## Getting the Image Link

Once you've found an image you want to use on the internet, you'll need to get the link. The easiest way is to right-click the image and select `Copy image address`. This will copy the image's web location to your clipboard for later.

![Unsplash.com, showing the contextual menu open highlighting the option to copy the image address](TODO:)

After getting the image link, go ahead and open up the Twine story editor.

---

## Add an Image to a Passage

After you get the image link, open up a Twine passage and add a line like this one:

```
{embed Unsplash image: 'https://unsplash.com/photos/Na0BbqKbfAo', alt: 'the moon'}
```

. . . but change a couple of things:

* Change the link (`https://unsplash.com/photos/Na0BbqKbfAo`) to your image link you found earlier. You can "paste" it by right-clicking the editor and selecting "paste", or you can press `Ctrl+V`.
* Change the words after `alt`. My picture is a picture of the moon, but yours probably isn't. Write a short sentence that describes your image.
* If you got your image from somewhere other than [Unsplash](https://unsplash.com/), delete the word `Unsplash` from the line of code

Click out of the passage editor and click "Play" on your passage:

![The passage context menu in Twine](/passage-hover)

You should see your image in your Twine story!

![A Twine story with an image of a moon](TODO:)

---