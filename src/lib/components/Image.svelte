<script>
    import { onMount } from "svelte";
    import { base } from '$app/paths'
    // import image from '../assets/twine-home.png';
    export let alt, src;
    // let image;
</script>

<!-- // TODO: figure out why the images aren't being served from the right directory -->
<!-- maybe downgrade sveltekit -->
<div class='has-text-left'>
    <figure class="image is-inline-block">
        <img alt="{alt}" src="{base}/images{src}" />
    </figure>
</div>


<!-- <style lang='scss'> -->
<style>    
    /* // @import '../../app.scss'; */
    img {
        /* // @extend .image; */
        border-radius: 12px;
        border-width: 3px;
        border-color: black;
        border-style: dashed;
        margin-bottom: 2rem;
        max-width: 40rem;
    }
</style>

