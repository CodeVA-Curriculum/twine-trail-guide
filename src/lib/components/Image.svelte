<script>
    import { onMount } from "svelte";
    import { base } from '$app/paths'
    // import image from '../assets/twine-home.png';
    export let alt, src;
    // let image;
</script>

<!-- // TODO: figure out why the images aren't being served from the right directory -->
<!-- maybe downgrade sveltekit -->
<img alt="{alt}" src="{base}/images{src}" />

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

