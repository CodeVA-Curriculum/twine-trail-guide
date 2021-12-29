---
title: Add Audio
author: Jon Stapleton
short: Learn how to add sound to your Twine passages.
description: Adding sound is a great way of creating an immersive atmosphere in your story. Recording and figuring out how to host these recordings can be a hassle, but once you get to the point where you are ready to embed them in your story it isn't so bad. This tutorial shows you how to add audio to a Twine passage, and explains the difference between 'ambient' sounds and 'sound effects' in the Chapbook Twine format.
# video: https://youtube.com/embed/33OQtxF7L8g
type: tutorial
layout: location
---

## Embedding Audio

While the process of creating and hosting recordings can be challenging, adding them to your Twine story isn't actually all that hard. The important thing to know is that the **Chapbook** Twine format supports two kinds of audio: *ambient* sounds and *sound effects*.

*Ambient* sounds are long audio clips that fade in and provide background ambiance to a passage. *Sound effects* are short sounds that play once. You can experiment with both options and see which one works best; if you choose *ambient*, you might want to add a couple of seconds of lead-in to any audio clips that include important information (like someone's voice).

--

## Adding Ambient Sounds

To add an ambient sound to your passage, you'll need to add some information about the sound--it's name and url--and then a line to activate the sound. Here's an example of a Twine passage that sets up an audio file called `TODO: audio file name`:

```
sound.ambient.forest.url: 'TODO: audio file.mp3'
sound.ambient.forest.description: 'TODO: audio file description'
--

Here's some normal story text. Ambient sound is playing in the background.
```

I've written the passage above in two sections: the section *above* the `--`, and the section *below* it. This separation is incredibly important.

The text *above* the `--` will not appear in the passage--when I test out the passage I've created above, it looks like this:

![A Twine story showing text that reads Here is some normal story text. Ambient sound is playing in the background](TODO:)

The text *below* the `--` appears as normal. The rules for writing above the `--` are different than the rules for below; it's very, very important to be precise in your spelling, your use of `'`, and the `:` on each line. Follow the example closely, or Twine will not know how to interpret your code.

Right now, the example passage I've created doesn't make any sounds. It just loads the sound. To play it, I need to add another line:

```
sound.ambient.forest.url: 'TODO: audio file.mp3'
sound.ambient.forest.description: 'TODO: audio file description'
--
{ambient sound: 'TODO: audio file}

Here's some normal story text. Ambient sound is playing in the background.
```

The line that activates the sound is related to the code above the `--`: the *name* of the sound after the `:` in the activation line should match the word that comes after `sound.ambient` in the code section. So if I wanted to activate a sound called `'rainfall'`, my code would look like this:

```
sound.ambient.rainfall.url: 'rainfall-audio-file.mp3'
sound.ambient.rainfall.description: 'The sound of rain falling in a forest'
--

{ambient sound: 'rainfall'}

You hear rain begin to fall.
```

Your `url` should match the link or filename for your sound, and the `name` in your activation line `{ambient sound: 'name'}` should match the code above the `--`: `sound.ambient.name.url` and `sound.ambient.name.description`.

--

## Adding Sound Effects

Adding sound effects is exactly the same as adding ambient sounds, except sound effects play only once and do not fade in and out. Here's an example:

```
sound.effect.boom.url: 'boom-audio.mp3'
sound.effect.boom.description: 'a loud boom'
--

You hear something in the distance...

{sound effect: 'boom'}
```

Everything is basically the same as it is with ambient sounds, except you use `sound.effect` in your code instead of `sound.ambient`.

--