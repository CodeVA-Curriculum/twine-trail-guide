<script>
    import TrailTimeline from "$lib/components/TrailTimeline.svelte";
    import LocationNode from '$lib/components/LocationNode.svelte';
    import { fade, fly } from 'svelte/transition';
    import {base} from '$app/paths';

    export let title, difficulty, description, locations;
    let timeline, inlineLocations, scrollPosition;

    let selected = 0;
    function top() {
        timeline.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    function step(i) {
        selected = i; // transition desktop guy
        console.log("scrolling to " + i)
		inlineLocations.children[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>
<svelte:window bind:scrollY={scrollPosition} />
<section class='section'>
    <div class='container'>
        <div class='columns'>
            <div class='column is-8'>
                <h1 class='title block'>{title} {difficulty == 0 ? '✨' : ''} </h1>
                <!-- <p class='block'>{description}</p> -->
                <slot />

                <hr>
                <div bind:this={timeline}>
                    <TrailTimeline>
                        {#each locations as location, i}
                        <LocationNode 
                            cl={() => step(i)}
                            title={location.metadata.title}
                            short={location.metadata.short}
                            position={i+1}
                            type={location.metadata.type}
                            slug={location.metadata.slug}
                            selected={selected == i}
                        />
                        {/each}
                    </TrailTimeline>
                </div>
                <div class='container' bind:this="{inlineLocations}">
                {#each locations as component, i}
                    <div class='container my-5 inline'>
                        <svelte:component this={component.default} position={i+1} compact={true} />
                    </div>
                {/each}
                </div>
            </div>
        </div>
        
    </div>
    {#if scrollPosition > 300}
    <div class='back-to-top has-text-right' transition:fade>
        <button on:click={top} class='button is-primary is-rounded'>Back to Top</button>
    </div>
    {/if}
</section>

<style lang='scss'>
    .content-wrapper {
		display: grid;
		align-items: start;
		border-radius: 1rem;
  }
  .back-to-top {
      position: sticky;
      bottom: 2rem;
  }
</style>