
<slot />

<style lang='scss' global>
    @import '../app.scss';

    .post > p > img {
        @extend .image;
        border-radius: 12px;
        border-width: 3px;
        border-color: black;
        border-style: dashed;
        margin-bottom: 2rem;
    }

    .post > pre {
        white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
    }

    .post > hr {
        margin-bottom: 4rem;
    }
</style>
