<script context="module">
    import { img } from './components.js';
    export { img };
</script>

<script>
    import {onMount} from 'svelte'
    import {base} from '$app/paths'
    import {locations, selected} from '$lib/util/stores.js'

    export let title, type, description, author, layout, short, path
    export let compact, scrollable = false;
    export let position;
    export let video; // = "https://www.youtube.com/embed/AsURmcD_Z5g"

    let p, elem
    $: p = position > 0 ? position : false

    selected.subscribe(loc => {
        if(loc == path && scrollable) {
            scrollToMe()
        }
    })

    // TODO: scroll into view
    function scrollToMe() {
        if(elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
    }

</script>

<div class='container'>
    <section class='section'>
        <div class='{ compact ? "" : "columns"}'>
            <div class='{ compact ? "" : "column"} mb-5'>
                <h1 bind:this={elem} class='title'>{#if position && type == "tutorial"}{p}. {/if}{title}</h1>
                <!-- TODO: add tags for trails -->
                <p class='block'>{description}</p>
                {#if video}
                <p class='block'>Watch the video to see someone demonstrate the basics, or read on to work through it on your own. This concept is a part of several project <a href='{base}/trails'>Trails</a>; check them out!</p>
                {/if}
                <!-- <h2 class='heading'>Trails:</h2> -->
            </div>
            {#if video}
            <div class='{ compact ? "" : "column"}'>
                <div class='video'>
                    <iframe src="{video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            {/if}
        </div>
        <hr>
    </section>
    <section class='section content post'>
        <slot />
    </section>
</div>

<style lang='scss'>
    .video {
        padding-top: 56.25%;
        position: relative;
    }

    .video iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        border-radius: 12px;
        /* min-width: 10rem; */
    }
    section {
        position: relative;
    }

</style>


