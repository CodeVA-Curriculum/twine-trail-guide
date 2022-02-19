<script>
    import TrailTimeline from "$lib/components/TrailTimeline.svelte";
    import LocationNode from '$lib/components/LocationNode.svelte';
    import { fade, fly } from 'svelte/transition';
    import {base} from '$app/paths';
import { onMount } from "svelte";
import {locations, selected} from '$lib/util/stores.js'

    export let title, difficulty, description //, locations;
    let timeline, inlineLocations, scrollPosition;

    // let selected = 0;
    function top() {
        timeline.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    // function step(i) {
    //     selected = i; // transition desktop guy
	// }

    let locationObjects = {}
    let loadedLocations = []

    // onMount(async () => {
    //     locations.subscribe(async (locs) => {
    //         loadedLocations = locs;
    //         for(let i=0;i<locs.length;i++) {
    //             if(!locationObjects[locs[i]]) {
    //                 console.log("Getting metadata for ", locs[i])
    //                 locationObjects[locs[i]] = (await import(`../../routes/locations/${locs[i]}.md`)).metadata;
    //             }
    //         }
    //     })
    // })

    onMount(() => {
        selected.set($locations[0])
        return () => {
            locations.set([])
        }
    })

</script>
<svelte:window bind:scrollY={scrollPosition} />
<section class='section'>
    <div class='container'>
        <div class='columns'>
            <div class='column is-8'>
                <h1 bind:this={timeline} class='title block'>{title} {difficulty == 0 ? '✨' : ''} </h1>
                <!-- <p class='block'>{description}</p> -->
                <slot></slot>
                <!-- <div class='column is-hidden-touch content-wrapper'>
                    {#each locations as component, i}
                    {#if selected == i}
                    <div transition:fly="{{ y: 50, duration: 250 }}" class='el2'>
                        <svelte:component this={component.default} position={i+1} compact={true} />
                    </div>
                    <div class='has-text-centered'>
                        <button on:click={top} class='button is-primary is-rounded'>Back to Top</button>
                    </div>
                    {/if}
                    {/each}
                </div> -->
                <div class='back-to-top has-text-centered is-hidden-mobile' transition:fade>
                    <button on:click={top} class='button is-primary is-rounded'>Back to Top</button>
                </div>
            </div>
            <!-- <div  class='column is-4 ml-5 is-hidden-touch'>
                    <TrailTimeline></TrailTimeline>
            </div> -->
        </div>
        
    </div>
    {#if scrollPosition > 300}
    <div class='back-to-top has-text-centered is-hidden-desktop' transition:fade>
        <button on:click={top} class='button is-primary is-rounded'>Back to Top</button>
    </div>
    {/if}
</section>

<style>
    .content-wrapper {
		display: grid;
		align-items: start;
		border-radius: 1rem;
  }
  .el2 {
		grid-area: 1/1/2/2;
		border-radius: 1rem;
  }
  .back-to-top {
      position: sticky;
      bottom: 2rem;
  }
  section {
      position: relative;
  }
</style>