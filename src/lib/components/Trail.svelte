<script context="module">
    import { p, aside, trailmap, location, timeline, a, passage, download } from './components.js';

    export { p, aside, trailmap, location, timeline, a, passage, download };
</script>

<script>
    import TrailDesktop from '$lib/components/TrailDesktop.svelte';
    import TrailMobile from '$lib/components/TrailMobile.svelte';
    import { locations, selected } from '$lib/util/stores.js';
    import { onMount, onDestroy } from 'svelte';
    
    export let title, difficulty, description;

    let locationContent = [];
    let loadedPaths = [];

    // figure out where to put it in the array
    // async function loadLocationContent(path, content) {
    //     const index = loadedPaths.indexOf(path);
    //     const element = (await import(`../../routes/locations/${path}/+page.md`));
    //     content.splice(index, 0, element)
    //     return content;
    // }

    // locations.subscribe(async (locs) => {

    //     // load based on paths
    //     for(let i=0;i<locs.length;i++) {
    //         // console.log(`searching for " + locs[i] + " in ${loadedPaths}...`, loadedPaths.includes([locs[i]]))
    //         if(!loadedPaths.includes(locs[i])) {
    //             // console.log("got new element!", loadedPaths, locs[i])
    //             loadedPaths = [...loadedPaths, locs[i]]
    //             // locationContent = await loadLocationContent(locs[i], locationContent)
    //             // console.log("Successfully loaded" + locs[i], loadedPaths)
    //         }
    //     }
        
	// });

    onMount(() => {
        // loadedPaths = $locations;
    })

    onDestroy(() => {
        // console.log(`Destroying Trail... ${$locations}`)
        // $locations = $locations[0]
        // $locations = $locations.splice(0, loadedPaths.length);
    })
</script>

<div>
    <TrailDesktop
        title={title}
        difficulty={difficulty}
        description={description}
    >
        <slot />
    </TrailDesktop>
</div>

<!-- TODO: Add standards info -->
<!-- <section class='section'>
    <div class='container'>
        <h2 class='title is-size-4'>Standards Alignment</h2>
        <p class='block'>Lorum ipsum sit dolor amet</p>
    </div>
</section> -->
    
