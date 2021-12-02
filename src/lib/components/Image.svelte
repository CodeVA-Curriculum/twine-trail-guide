<script>
    import { onMount } from "svelte";
    // import image from '../assets/twine-home.png';
    export let alt, src;
    // let image;
</script>

<img alt="{alt}" src="/images{src}" />

<style lang='scss'>
    @import '../../app.scss';
    img {
        @extend .image;
        border-radius: 12px;
        border-width: 3px;
        border-color: black;
        border-style: dashed;
        margin-bottom: 2rem;
    }
</style>

