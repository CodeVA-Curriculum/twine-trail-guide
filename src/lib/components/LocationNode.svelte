<script>
    import {base} from '$app/paths';
    import { goto } from '$app/navigation';
    import Fa from 'svelte-fa'
    import { faHammer } from '@fortawesome/free-solid-svg-icons'
    import { onMount } from 'svelte';
    import {selected} from '$lib/util/stores.js'
    export let slug, position

    let data;
    function routeToPage() {
        const replaceState = false;
        goto(`${base}/locations/${slug}`, { replaceState }) 
    }

    onMount(async () => {
        if(slug) {
            data = (await import(`../../routes/locations/${slug}/+page.md`)).metadata;
        }
    })

    function cl() {
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
    <div class="timeline-content card location-content p-4 {selected ? 'not-selected' : 'not-selected'}">
            <!-- <div class='video mb-3'>
                <iframe src="https://www.youtube.com/embed/AsURmcD_Z5g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div> -->
            <h3 class="heading is-small">{#if data.type!='project'}{position}.{/if} {data.title}</h3>
            <slot><p>{data.short}</p></slot>
    </div>
    {/if}
</article>

<style>
    .location > .location-content {
        margin-left: 3rem;
    }
    .not-selected:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
    .is-selected {
        background-color: white;
        cursor: pointer;
    }
    .is-selected:hover {
        background-color: whitesmoke;
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