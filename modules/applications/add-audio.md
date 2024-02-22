---
title: Adding Audio to Passages
author: Jon Stapleton
short: Learn how to add sound to your Twine passages.
description: Adding sound is a great way of creating an immersive atmosphere in your story. Recording and figuring out how to host these recordings can be a hassle, but once you get to the point where you are ready to embed them in your story it isn't so bad. This tutorial shows you how to add audio to a Twine passage, and explains the difference between 'ambient' sounds and 'sound effects' in the Chapbook Twine format.
video: https://youtube.com/embed/016T1snJ7MM
type: tutorial
layout: location
---

<!-- :::aside-box
In order to use audio in your story, you'll need to figure out a way to *host* it so the Twine webpage can access the sound data. You can read about different hosting options using either the downloadable Twine editor or the browser-based editor by checking out the *[Hosting Recordings](/locations/hosting-recordings)* tutorial.
::: -->

While the process of *creating* recordings can be challenging, adding them to your Twine story isn't actually all that hard. The important thing to know is that the **Chapbook** Twine format supports two kinds of audio: *ambient* sounds and *sound effects*.

*Ambient* sounds are long audio clips that fade in and provide background ambiance to a passage. *Sound effects* are short sounds that play once. You can experiment with both options and see which one works best; if you choose *ambient*, you might want to add a couple of seconds of lead-in to any audio clips that include important information (like someone's voice).

## Adding Ambient Sounds

To add an ambient sound to your passage, you'll need to add information about the sound--the file name (if you're hosting the file locally and using the downloadable Twine editor) or URL (if you're using [Google Drive](https://drive.google.com) for hosting, see below)--and then a line to activate the sound. Here's an example of a Twine passage that sets up an audio file at a Google Drive URL (but does not play it):

:::code-and-image{name="Passage with Ambient Sound Example"}
```
sound.ambient.rainfall.url: 'https://drive.google.com/uc?id=1DabfUnYRfpF0ksy3rpVJNbGtOwERii0M'
sound.ambient.rainfall.description: 'the sound of falling rain'
--

Here's some normal story text.
```
:::

The first step for adding sound to your Twine stories is to figure out how to *host* the audio so that Twine can use it. Twine uses audio the same way it uses [images](/locations/adding-images)--you can use image file (if you're using the offline Twine editor) or a URL to an online version of the file (like [Unsplash](https://unsplash.com) or [Google Drive](https://drive.google.com)). Here's an example of what it looks like to add audio to a Twine passage:

The easiest way to *host* audio files is to use Google Drive:

1. First, find an audio file that you'd like to use in your story. You can create your own audio, or find royalty-free audio files on sites like [Pixabay](https://pixabay.com/sound-effects/search/).
2. Then, upload the audio file you'd like to use to [Google Drive](https://drive.google.com). If you don't already have a Google account, you'll need to create one. Drag and drop the file onto the Google Drive window to upload it.
3. Then, right-click the file in Google Drive, go to `Share` set the visibility to "anyone with the link can view" (be sure that the image doesn't include any private or sensitive personal information before you do this). Then, click `Copy Link`.
4. Now, you need to find the *Google Drive file ID*. It's a string of seemingly random characters that appears in the link you copied between `https://drive.google.com/file/d/` and `/view`. For example, if a document has a link `https://drive.google.com/file/d/1DabfUnYRfpF0ksy3rpVJNbGtOwERii0M/view?usp=drive_link`, then the file ID for that link is `1DabfUnYRfpF0ksy3rpVJNbGtOwERii0M`.
5. Finally, get ready to add the audio file to your Twine passage! Instead of adding the file name after `sound.ambient.rainfall.url:`, write `https://drive.google.com/uc?id=` and paste the Google Drive file ID you found earlier after the `=` (see above for an example).

I've written the passage above in two sections: the section *above* the `--`, and the section *below* it. This separation is incredibly important.

The text *above* the `--` will not appear in the passage--when I test out the passage I've created above, it looks like this:

![A Twine story showing text that reads Here is some normal story text. Ambient sound is playing in the background](/twine-audio-load.png)

The text *below* the `--` appears as normal. The rules for writing above the `--` are different from the rules for below; it's very, very important to be precise in your spelling, your use of `'`, and the `:` on each line. Follow the example closely, or Twine will not know how to interpret your code.

Right now, the example passage I've created doesn't make any sounds. It just loads the sound file. To play it, I need to add another line:

:::code-and-image{name="Playing Rainfall Sounds"}
```
sound.ambient.rainfall.url: 'https://drive.google.com/uc?id=1DabfUnYRfpF0ksy3rpVJNbGtOwERii0M'
sound.ambient.rainfall.description: 'the sound of falling rain'
--
{ambient sound: 'rainfall'}

Here's some normal story text. Ambient sound is playing in the background.
```
:::

You can't hear the result in the image above, but [click here to open the example](/examples/audio-ambient) and hear what it sounds like.

The line that activates the sound is related to the code above the `--`: the *name* of the sound after the `:` in the activation line should match the word that comes after `sound.ambient` in the code section. So if I wanted to activate a sound called `'storm'`, my code would look like this:

:::code-and-image{name="Playing Storm Sounds"}
```
sound.ambient.storm.url: 'https://drive.google.com/uc?id=1XFNzcY26wvD-wbOnhuEOdM5OoiUrm2FD'
sound.ambient.storm.description: 'The sound of a storm'
--

{ambient sound: 'storm'}

You hear wind and rain rushing toward you.
```
:::

Your `url` should match the link or filename for your sound, and the `name` in your activation line `{ambient sound: 'name'}` should correspond to the code above the `--`: `sound.ambient.name.url` and `sound.ambient.name.description`.

---

## Adding Sound Effects

Adding sound effects is exactly the same as adding ambient sounds, except sound effects play only once and do not fade in and out. Here's an example:

:::code-and-image{name="Passage With Sound Effects"}
```
sound.effect.boom.url: 'https://drive.google.com/uc?id=16V5UnErgIX6yz-DOU7XEMK_9tbXEmsTQ'
sound.effect.boom.description: 'a loud boom'
--

You hear something in the distance...

{sound effect: 'boom'}
```
:::

[Check out this example](/examples/audio-effect) to hear the sound effect.