<script context="module">
    import { p, blockquote } from './components.js';
    export { p, blockquote };
</script>

<script>
    import TrailTimeline from "$lib/components/TrailTimeline.svelte";
    import LocationNode from '$lib/components/LocationNode.svelte';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import {base} from '$app/paths';
    export let title, difficulty, description, locations;

    let Sample;
    let locationContent = [];
    let inlineLocations;
    let header;

    let scrollPosition = 0;

    let selected = 0;

    function getDist() {
        return "-" + locations.length * 2 + "rem";
    }

    function step(i) {
        selected = i; // transition desktop guy
        console.log("scrolling to " + i)
		inlineLocations.children[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

    function top() {
        header.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    onMount(async () => {
        for(let i=0;i<locations.length;i++) {
            locationContent[i] = (await import(`../../routes/locations/${locations[i]}.md`));
        }
    })
</script>

<!-- <section class='section'>
    <div class='container'>
    <h1 class='title block'>{title} {difficulty == 0 ? '✨' : ''}</h1>
    <p class='block'>{description}</p>
    <slot />
    <hr>
</section> -->
<svelte:window bind:scrollY={scrollPosition} />
<section class='section'>
    <div class='container'>
        <div class='columns'>
            <div class='column is-8'>
                <h1 class='title block' bind:this={header}>{title} {difficulty == 0 ? '✨' : ''} </h1>
                <!-- <p class='block'>{description}</p> -->
                <slot />
                <hr>
                <div class='is-hidden-desktop'>
                    <TrailTimeline>
                        {#each locationContent as location, i}
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
                <div class='container is-hidden-desktop' bind:this="{inlineLocations}">
                {#each locationContent as component, i}
                    <div class='container my-5 inline'>
                        <svelte:component this={component.default} position={i+1} compact={true} />
                    </div>
                {/each}
                </div>
                <div class='column is-hidden-touch content-wrapper'>
                    {#each locationContent as component, i}
                    {#if selected == i}
                    <div transition:fly="{{ y: 50, duration: 250 }}" class='el2'>
                        <svelte:component this={component.default} position={i+1} compact={true} />
                    </div>
                    <div class='has-text-centered'>
                        <button on:click={top} class='button is-primary is-rounded'>Back to Top</button>
                    </div>
                    {/if}
                    {/each}
                </div>
            </div>
            <div class='column is-4 ml-5 is-hidden-touch'>
                <div style="position: sticky; top: {getDist()};">
                    <TrailTimeline>
                        {#each locationContent as location, i}
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
            </div>
        </div>
        
    </div>
    {#if scrollPosition > 300}
    <div class='back-to-top is-hidden-desktop' transition:fade>
        <button on:click={top} class='button is-primary is-rounded'>Back to Top</button>
    </div>
    {/if}
</section>

<!-- TODO: Add standards info -->
<!-- <section class='section'>
    <div class='container'>
        <h2 class='title is-size-4'>Standards Alignment</h2>
        <p class='block'>Lorum ipsum sit dolor amet</p>
    </div>
</section> -->
    
<style lang='scss'>
    .content-wrapper {
		display: grid;
		align-items: start;
		border-radius: 1rem;
  }
  .el2 {
		grid-area: 1/1/2/2;
		border-radius: 1rem;
  }
  .timeline-wrapper {
    position: -webkit-sticky; /* Safari */
    position: fixed;
    /* bottom: 0rem; */
    background-color: pink;
  }
  .back-to-top {
      position: sticky;
      bottom: 2rem;
  }
</style>