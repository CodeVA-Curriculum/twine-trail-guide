---
title: Adding Images to Passages
author: Jon Stapleton
short: Learn how to add images to your Twine passages.
description: Images are a great way of adding new interest to your Twine passages. They can convey a mood, provide additional information for the reader, or even create something for the reader to investigate as they make choices to move the story forward. This tutorial demonstrates how to add images from the web to a Twine passage.
video: https://youtube.com/embed/-s3nCDMkPKE
type: tutorial
layout: location
---

## Finding an Image

The first thing to do if you want to add an image to a Twine passage is to find a *link* to an image. All images on the web have a link to their location, and you can use that link to include the image in your story. Here are some options to check out:

* Search for a stock image on [Unsplash](https://unsplash.com/)
* Find an image from the [Library of Virginia](https://edu.lva.virginia.gov/dbva/) Document Bank

Just make sure you have permission to use the image from the person who owns it! [Unsplash](https://unsplash.com/) only has stock photos, which means you can use them in your stories no problem. It's important to only use images that you have permission to use!

---

## Getting the Image Link

Once you've found an image you want to use on the internet, you'll need to get the link. The easiest way is to right-click the image and select `Copy image address`. This will copy the image's web location to your clipboard for later.

![A web browser showing the contextual menu open highlighting the option to copy the image address](/image-link.png)

If you're getting an image from [Unsplash](https://unsplash.com/), you'll need to use the normal link, which you can access by clicking `Share`.

![A screenshot of unsplash.com with an arrow pointing to the share button](/unsplash-share.png)

![A screenshot of unsplash.com indicating the link inside the share menu to copy for your Twine story](/unsplash-link.png)

After getting the image link, go ahead and open up the Twine story editor.

---

## Add an Image to a Passage

After you get the image link, open up a Twine passage and add some code like this:

:::passage{title="Passage with Unsplash Image Example"}
```
{embed Unsplash image: 'https://unsplash.com/photos/Na0BbqKbfAo', alt: 'the moon'}

You hear the howls of wolves in the distance.
```
:::

. . . but change a couple of things:

* Change the link (`https://unsplash.com/photos/Na0BbqKbfAo`) to your image link you found earlier. You can "paste" it by right-clicking the editor and selecting "paste", or you can press `Ctrl+V`.
* Change the words after `alt`. My picture is a picture of the moon, but yours probably isn't. Write a short sentence that describes your image.
* If you got your image from somewhere other than [Unsplash](https://unsplash.com/), delete the word `Unsplash` from the line of code and make sure the link ends in `.jpg`, `.png`, or another image format.

Click out of the passage editor, select the passage you added the image to, and click "Test From Here":

![The passage context menu in Twine](/test-from-here.png)

You should see your image in your Twine story!

![A Twine story with an image of a moon](/twine-image.png)

---

## Adding Images from Google Drive

If you can find images you want to use in your story online or on Unsplash, that's all you'll need. However, lots of people like creating their own images for their stories. Adding original images to a Twine story is a little complicated; the easiest way is to upload it to [Google Drive](https://drive.google.com) and then insert the link to the Google Drive-hosted copy of the image.

1. First, you'll need to upload the image you'd like to use to [Google Drive](https://drive.google.com). If you don't already have a Google account, you'll need to create one. Drag and drop the image onto the Google Drive window to upload it.
<!-- ![The process of uploading a file to Google Drive, animated](TODO:) -->
2. Then, right-click the file in Google Drive, go to `Share` set the visibility to "anyone with the link can view" (be sure that the image doesn't include any private or sensitive personal information before you do this). Then, click `Copy Link`.
<!-- ![Updating sharing settings and copying the sharing link in Google Drive, animated](TODO:) -->
3. Now, you need to find the *Google Drive file ID*. It's a string of seemingly random characters that appears in the link you copied between `https://drive.google.com/file/d/` and `/view`. For example, if a document has a link `https://drive.google.com/uc?id=18m-b02xNTee9gLRwVASKYqtxmoiIq6T9`, then the file ID for that link is `18m-b02xNTee9gLRwVASKYqtxmoiIq6T9`.
<!-- ![A Google Drive sharing link with the file ID highlighted](TODO:) -->
4. Finally, get ready to add the image to your Twine passage! Everything is the same as above **except for the `image:` field**. Instead of pasting the image URL after `image:`, write `https://drive.google.com/uc?id=` and paste the Google Drive file ID you found earlier after the `=`. Check out the passage below for an example:

:::passage{title="Google Drive Image Example" src="/drive-image-example.png"}
```
Here's an image from my Google Drive:

{embed image: "https://drive.google.com/uc?id=18m-b02xNTee9gLRwVASKYqtxmoiIq6T9", alt: "An image from my Google Drive"}

Copy and paste this code into your own story to try it out!
```
:::

If you have trouble getting this working, check out the video above for a demonstration!