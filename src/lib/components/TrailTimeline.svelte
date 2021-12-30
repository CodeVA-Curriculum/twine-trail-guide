<script>
    import LocationNode from '$lib/components/LocationNode.svelte';
    // import { locations } from '$lib/db/trails';
    import { onMount } from 'svelte';
    import {locations, selected} from '$lib/util/stores.js'
    export let mobile = "false"
    onMount(() => {
        selected.set($locations[0])
    })

</script>

<section class="timeline my-5">
    <!-- <h2 class='title is-size-4'>Trail Blazes</h2> -->
    <header class="timeline-header">
        <span class="tag is-medium is-primary">Start</span>
    </header>
    
    {#each $locations as path, i}
    <!-- <LocationNode 
        cl={() => console.log("click!")}
        title={$locationData[path].title}
        short={$locationData[path].short}
        position={1}
        type={$locationData[path].type}
        slug={path}
        selected={false}
    /> -->
    <LocationNode
        position={i+1}
        slug={path}
    />
    {/each}
    
    <div class="timeline-header">
        <span class="tag is-medium is-primary">End</span>
    </div>
</section>

<style>
    @media (min-width: 1024px) { 
        .timeline {
            position: absolute;
            top: 0;
            left: 41rem;
            padding-left: auto;
            padding-right: 0;
        }
     }
     @media (max-width: 1023px) { 
        .timeline {
            position: relative;
            top: 0;
            left: 0;
        }
     }
    
</style>

