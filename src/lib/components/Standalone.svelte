<script context="module">
    import { img, a, passage, aside, collapse } from './components.js';
    export { img, a, passage, aside, collapse };
</script>

<script>
    import {onMount} from 'svelte'
    import {base} from '$app/paths'
    import {locations, selected} from '$lib/util/stores.js'
    import Callout from './Callout.svelte'
    import Fa from 'svelte-fa'
    import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

    export let title, type, description, author, layout, short, path
    export let compact, scrollable = false;
    export let position, opt;
    export let video; // = "https://www.youtube.com/embed/AsURmcD_Z5g"

    let p, elem
    $: p = getPrefix(position, opt)

    function getPrefix(position, optional) {
        if(optional) {
            return "Optional: "
        } else if(position > 0) {
            return `${position}.`
        } else {
            return false
        }
    }

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

    // Select next trail in the timeline
    function next() {
        // console.log($locations[p])
        scrollToMe();
        selected.set($locations[p]);
    }

</script>
<div class='container'>
    <section class='wrapper'>
        <div class='{ compact ? "" : "columns"}'>
            <div class='{ compact ? "" : "column"} content'>
                <h1 bind:this={elem} class='title'>{#if position && type == "tutorial"}{p} {/if}{title}</h1>
                <!-- TODO: add tags for trails -->
                <!-- <Callout color="yellow">
                    <p>{description}</p>
                </Callout> -->
                {#if video}
                <blockquote class='block {compact ? "is-hidden" : ""} is-italic'>{description}</blockquote>
                <p class='block {compact ? "small" : ""}'>Watch the video to see someone demonstrate the basics, or read on to work through it on your own. This concept is a part of several projects <a href='{base}/trails'>Trails</a>; check them out!</p>
                {/if}
                <!-- <h2 class='heading'>Trails:</h2> -->
            </div>
            {#if video}
            <div class='{ compact ? "" : "column"} my-3'>
                <div class='video'>
                    <iframe src="{video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            {/if}
        </div>
        
    </section>
    <hr>
    <section class='content post post-container'>
        <slot />
    </section>
    {#if p}
    <div class='to-next has-text-right'>
        <button on:click={next} class='button primary'>
            <span>Next Trail</span>
            <span class='icon'>
                <Fa icon={faArrowRight} />
            </span>
        </button>
    </div>
    {/if}
</div>

<style>
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
        margin-top: 1rem;
        /* min-width: 10rem; */
    }
    .wrapper {
        margin-top: 4rem;
        margin-bottom: 3rem;
    }
    section {
        position: relative;
        /* background-color: pink; */
        margin-bottom: 4rem;
    }
    .small {
        font-size: small;
    }
    hr {
        margin-bottom: 4rem;
    }

</style>


