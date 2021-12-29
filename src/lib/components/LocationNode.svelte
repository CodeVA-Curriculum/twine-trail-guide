<script>
    import {base} from '$app/paths';
    import { goto } from '$app/navigation';
    import Fa from 'svelte-fa'
    import { faHammer } from '@fortawesome/free-solid-svg-icons'
    export let title, short, position, type, slug, cl, selected


    function routeToPage() {
        const replaceState = false;
        goto(`${base}/locations/${slug}`, { replaceState }) 
    }
</script>


<!-- TODO: add 'completed' checkbox for people on the timeline -->
<article on:click={cl} class="timeline-item location">
    {#if type=="project"}
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
            <h3 class="heading is-small">{#if type!='project'}{position}.{/if} {title}</h3>
            <slot><p>{short}</p></slot>
    </div>
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