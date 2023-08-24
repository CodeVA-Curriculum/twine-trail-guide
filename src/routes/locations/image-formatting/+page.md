---
title: Image Formatting Using CSS
# TODO: incorporate author into location cards
author: Jon Stapleton
short: Learn how to manipulate your images to display them in different ways.
description: Images are great, but sometimes they may not look exactly right. They may be too big, or too small, or take up the wrong amount of space. They may even make it difficult to read the passage because they push the text all over the place. This tutorial covers how to use CSS to make some changes to the way Twine displays images.
video: https://youtube.com/embed/MSqnueqV3Rw 
type: tutorial
layout: location
---

## Adding CSS To Your Story

**CSS** (stands for "cascading style sheet") is a coding language that works with HTML to help with changing the look of a website. Because your Twine story is also a website, you can add CSS to it to change how it looks.

To add CSS, go to the `Story` tab near the top-left of the editor and click `Stylesheet`.

![The Twine story menu with an arrow pointing to the option to edit the stylesheet](/twine-edit-stylesheet.png)

Then, you can edit the stylesheet by adding CSS rules to the `Stylesheet` text entry area. If you aren't sure how to write CSS, this is totally optional. You can check out some options for what to add [here](https://www.w3schools.com/w3css/defaulT.asp) if you'd like. You can add as much CSS here as you want. For example, let's turn all the text red:


```
p {
    color: red;
}
```

![A Twine story with all the text colored red](/twine-red-text-style.png)

To see your changes, start your story in the usual way. To change it back, just delete your CSS from the stylesheet editor and restart your story.

---

## Formatting Images

You can do all sorts of things with CSS, but this tutorial is specifically about formatting images. By default, Twine inserts your image such that it takes up a whole line in its passage, which may cause the passage to be difficult to read. You can do lots of things to improve the look of the passage by changing how the image and the text interact with one another.

To get set up, start by writing this CSS code into your stylesheet editor:

```
img {

}
```

All of your CSS to control your images will go between the `{` and the `}`.

### Change Image Size

Depending on how you're writing your story, you might want to make your images a little smaller. You can set the width of your image based on a percentage of the width of the page.

Here's what it looks like with the image taking up 100% of the page width:

:::passage{title="Full Width Image Example" src="/twine-image-full.png"}
```
img {
    width: 100%;
}
```
:::

. . . and here's what it looks like when the image only takes up 50%:

:::passage{title="Half Width Image Example" src="/twine-image-half.png"}
```
img {
    width: 50%;
}
```
:::

### Columns

Sometimes, you may want to display your image *next to* your passage text, with the image on one side and the text on the other like this:

![A Twine passage with an image on the left side of the screen and the text on the right side](/twine-image-column.png)

To make this happen, you need to do two things: make the image small enough to leave room for your text, and then make the image stay on the left side of the page. Here's what the CSS looks like:

```
img {
    float: left;
    position: static;
    width: 50%;
    margin-right: 50px;
}
```

You can make the image bigger or smaller by changing the `width` value. To put the image on the right side of the screen instead of the left, change `float: left` to `float: right`. The `margin-right: 50px;` line is there to put space between the text and the image.

---

Remember, these style apply to *all* of the images in your story. It's a good idea to think carefully about what you want your story to look like as you work with the image styles.