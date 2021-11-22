<script>
    import LocationNode from '$lib/components/LocationNode.svelte';
    // import { locations } from '$lib/db/trails';
    import { onMount } from 'svelte';
    export let locations = [];
    export let locs=[];

    onMount(async () => {
        // fetch location list rendered from available location routes
        
    })
</script>

<section class="timeline my-5">
    <!-- <h2 class='title is-size-4'>Trail Blazes</h2> -->
    <header class="timeline-header">
        <span class="tag is-medium is-primary">Start</span>
    </header>
    <slot />
    
    <div class="timeline-header">
        <span class="tag is-medium is-primary">End</span>
    </div>
</section>

