<script>
    import {base} from '$app/paths';
    import { goto } from '$app/navigation';
    import Fa from 'svelte-fa'
    import { faHammer } from '@fortawesome/free-solid-svg-icons'
    import { onMount } from 'svelte';
    import {selected} from '$lib/util/stores.js'
    export let slug, position
    export let optional = false;

    let data;
    function routeToPage() {
        const replaceState = false;
        goto(`${base}/locations/${slug}`, { replaceState }) 
    }

    onMount(async () => {
        console.log(optional)
        if(slug) {
            data = (await import(`../../routes/locations/${slug}/+page.md`)).metadata;
        }
    })

    function cl() {
        // console.log(`Selecting ${slug}`)
        selected.set(slug);
    }
</script>


<!-- TODO: add 'completed' checkbox for people on the timeline -->
<article on:click={cl} class="timeline-item location">
    {#if data}
    {#if data.type=="project"}
        <div class='timeline-marker is-warning is-icon'>
            <i><Fa icon={faHammer} /></i>
        </div>
    {:else}
        <div class="timeline-marker {selected ? '': ''}"></div>
    {/if}
        {#if !optional}
            <div class="timeline-content card location-content p-4 {$selected == slug ? 'is-selected' : 'not-selected'}">
                    <!-- <div class='video mb-3'>
                        <iframe src="https://www.youtube.com/embed/AsURmcD_Z5g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div> -->
                    <h3 class="heading is-small">{#if data.type!='project'}{position}.{/if} {data.title}</h3>
                    <slot><p>{data.short}</p></slot>
            </div>
        {:else}
            <div class='timeline-content'>Hey</div>
        {/if}

    {/if}
</article>

<style lang='scss'>
    @import '../styles/variables.scss';
    .location > .location-content {
        margin-left: 3rem;
    }
    .not-selected {
        border-width: 0px;
    }
    .not-selected:hover, .is-selected:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
    .is-selected {
        border-color: $blue;
        border-width: 3px;
        border-style: solid;
        background-color: white;
        cursor: pointer;
    }
    .location {
        max-width: 25rem;
    }

    .video {
        overflow: hidden;
        /* 16:9 aspect ratio */
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
    }
</style>