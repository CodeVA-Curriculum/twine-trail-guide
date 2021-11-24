
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

    .post > hr {
        margin-bottom: 4rem;
    }
</style>
