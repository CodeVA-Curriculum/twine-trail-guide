<script context="module">
    import { p, aside, trailmap, location } from './components.js';

    export { p, aside, trailmap, location };
</script>

<script>
    import TrailDesktop from '$lib/components/TrailDesktop.svelte';
    import TrailMobile from '$lib/components/TrailMobile.svelte';
    import { onMount } from 'svelte';
    
    export let title, difficulty, description, locations;

    let locationContent = [];

    let scrollPosition = 0;

    let selected = 0;

    function getDist() {
        return "-" + locations.length * 2 + "rem";
    }


    onMount(async () => {
        for(let i=0;i<locations.length;i++) {
            locationContent[i] = (await import(`../../routes/locations/${locations[i]}.md`));
        }
    })
</script>

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
    
