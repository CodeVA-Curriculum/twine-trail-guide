<script>
    import {base} from '$app/paths';
    import { goto } from '$app/navigation';
    import Fa from 'svelte-fa'
    import { faHammer } from '@fortawesome/free-solid-svg-icons'
    export let title, description, position, type, slug

    function routeToPage() {
    const replaceState = false;
    goto(`${base}/locations/${slug}`, { replaceState }) 
  }
</script>

<article on:click={routeToPage} class="timeline-item location">
    {#if type=="project"}
        <div class='timeline-marker is-warning is-icon'>
            <i><Fa icon={faHammer} /></i>
        </div>
    {:else}
        <div class="timeline-marker"></div>
    {/if}
    <div class="timeline-content card p-4 location-content">
        <h3 class="heading"><a href='{base}/locations/{slug}'>{#if type!='project'}{position}.{/if} {title}</a></h3>
        <p>{description}</p>
    </div>
</article>

<style>
    .location > .location-content {
        margin-left: 3rem;
    }
    .location > .location-content:hover {
        background-color: whitesmoke;
        cursor: pointer;
    }
    .location {
        max-width: 30rem;
    }
</style>