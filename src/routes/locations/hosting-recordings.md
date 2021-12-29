---
title: Hosting Recordings
author: Jon Stapleton
short: Learn how to make audio recordings accessible to websites like Twine stories.
description: Your Twine stories are websites, which means whoever is reading them needs to download the whole story (including all its images, video, and audio) when they want to read it. In order for them to get access to audio you want to include in the story, you'll need to host that audio on a web server. This tutorial shows you how.
# video: https://youtube.com/embed/33OQtxF7L8g
type: tutorial
layout: location
---

## What Is Hosting?

"Hosting" a webpage or a file means that you've made it accessible to other people connected to the internet by "hosting" the file on a server (a computer set up to send files to people over the internet). Any website you access with your computer is being hosted by a server somewhere in the world.

Websites are made up of files, and when you visit a site online the server sends you the files you need. A lot of times, the server needs to send you *many* files for the webpage to load properly. There are HTML, CSS, and Javascript files which make up the webpage itself, but there are often also image, video, and audio files that you need to download in order to show the proper information on the webpage.

<!-- ![Diagram of a webpage loading assets from different servers](TODO:) -->

When you make a website (like a Twine story) that includes audio recordings, you have two choices--either host your audio on its own server, or store the audio in the same location as your website. You can use either method with Twine; read the instructions below to learn how.

---

## Host Locally

When you host your audio locally, you will create two files: an audio file (like a `.mp3` or `.wav` file) and a `.html` file that includes the code from your story. As long as these two files are together on your computer, you'll be able to link the audio to your Twine story without any problems.

<!-- ![A cartoon showing a webpage asking where an audio file is, and the audio file responding that it is right there](TODO:) -->

Using local audio has a couple of advantages:

* It makes editing the audio pretty easy--just edit the file, no publishing necessary!
* You don't need to make your audio public online for anyone to listen to

To set up local hosting, follow the instructions below:

1. Find a spot on your computer where you'd like to store your Twine stories. I like to use the `Documents` folder. 
2. Then, create a new folder for the Twine story that will include audio.
3. Put all your audio files into that new folder.
4. When the time comes to test your Twine story, you'll need to `Publish to File` and save the `.html` file produced by Twine to the new folder with your audio files. 

Using local images has a couple of downsides:

* You have to test your story differently--you can't use the `Play` button like normal. You'll need to `Publish to File` and then open your HTML file every time you want to test your audio.
* If you want to share your story with someone, it will be a little tricky. You'll need to send them a folder with all of your files, not just the `.html` file from Twine.

---

## Host on SoundCloud

[SoundCloud](https://soundcloud.com/) is a music streaming service. When you host your audio on [SoundCloud](https://soundcloud.com/), you will upload your audio file (`.mp3` or `.wav`) to SoundCloud's web servers. Then, you'll use a link to the SoundCloud hosting location in your Twine story so that when a reader opens your story, the webpage will download the audio from SoundCloud automatically.

<!-- ![A cartoon showing a webpage asking a server to send it an audio file, with the server responding--sure!](TODO:) -->

Using [SoundCloud](https://soundcloud.com/) to host your audio has a couple of advantages:

* You don't have to worry about local files, so you can use Twine (even the browser version) without any problems.
* You can make edits to your audio without changing your story, as long as the link is the same as before.

1. Log into [SoundCloud](https://soundcloud.com/) and click the `Upload` button in top-right corner of the window

![A screenshot from SoundCloud.com showing the upload button](/soundcloud-upload.png)

2. Drag and drop the audio you want to host into the file upload area of the page. Set privacy to `Public`, otherwise you won't be able to embed the audio in your Twine story.

![A screenshot from SoundCloud.com showing the file upload dialog box](/soundcloud-file-select.png)

3. Open the edit page for your track, and enter all its information.
4. Then, go to the `Permissions` tab and check the `Include in RSS Feed` option

![The SoundCloud.com permissions page, showing how to check the include in RSS feed option](/soundcloud-rss.gif)

5. Click `Save changes`.
6. To get the URL to your audio file, use your RSS feed link and replace `sounds.rss` with the name of your audio file.
<!-- TODO: test this out -->

Using SoundCloud to host your audio also has a couple of downsides, though:

* Editing your audio is complicated, requiring you to make changes using your own software, and then upload your audio to SoundCloud before the changes appear in your story.
* Your audio will be public for anyone to listen to.

---

Whatever you choose, don't be discouraged! Once you get it working once, it will get easier with practice.