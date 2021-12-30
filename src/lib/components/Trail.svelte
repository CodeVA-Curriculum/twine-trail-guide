<script context="module">
    import { p, aside, trailmap, location } from './components.js';

    export { p, aside, trailmap, location };
</script>

<script>
    import TrailDesktop from '$lib/components/TrailDesktop.svelte';
    import TrailMobile from '$lib/components/TrailMobile.svelte';
    import { locations } from '$lib/util/stores.js';
    import { onMount } from 'svelte';
    
    export let title, difficulty, description;

    let locationContent = [];
    let loadedPaths = [];

    // figure out where to put it in the array
    async function loadLocationContent(path, content) {
        const index = loadedPaths.indexOf(path);
        const element = (await import(`../../routes/locations/${path}.md`));
        content.splice(index, 0, element)
        return content;
    }

    locations.subscribe(async (locs) => {

        // load based on paths
        for(let i=0;i<locs.length;i++) {
            // console.log(`searching for " + locs[i] + " in ${loadedPaths}...`, loadedPaths.includes([locs[i]]))
            if(!loadedPaths.includes(locs[i])) {
                // console.log("got new element!", loadedPaths, locs[i])
                loadedPaths = [...loadedPaths, locs[i]]
                locationContent = await loadLocationContent(locs[i], locationContent)
                // console.log("Successfully loaded" + locs[i], loadedPaths)
            }
        }
        
	});

    onMount(async () => {
        locations.set([]);
        return () => {
            locations.set([]);
        }
    })

</script>

<!-- TODO: potentially optimize this to avoid having to render things twice. Very sloppy -->
<div class='is-hidden-desktop'>
    <TrailMobile
        title={title}
        difficulty={difficulty}
        description={description}
        locations={locationContent}
    >
        <slot />
    </TrailMobile>
</div>
<div class='is-hidden-touch'>
    <TrailDesktop
        title={title}
        difficulty={difficulty}
        description={description}
        locations={locationContent}
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
    
