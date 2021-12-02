<script context="module">
    export async function load({ fetch, page }) {
      const { trail } = page.params;
      const res = await fetch(`/api/trails/${trail}`);
      if (res.ok) return { props: { trail: await res.json() } };
      return {
        status: res.status,
        error: new Error(),
      };
    }
</script>
  
<script>
    import TrailTimeline from "$lib/components/TrailTimeline.svelte";
    import LocationNode from '$lib/components/LocationNode.svelte';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import {base} from '$app/paths';
    export let trail;

    let Sample;
    let locationContent = [];
    let locations = [];
    let inlineLocations;

    let selected = 0;

    function step(i) {
        selected = i; // transition desktop guy
        console.log("scrolling to " + i)
		inlineLocations.children[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
		//console.log(offset);
	}

    // console.log(trail.difficulty);

    onMount(async () => {
        for(let i=0;i<trail.locations.length;i++) {
            locationContent[i] = (await import(`../locations/${trail.locations[i]}.md`)).default;
        }

        // Get location objects
        const url = `${base}/api/locations/locations.json`;
		const res = await fetch(url);
		if (res.ok) {
            let obj = await res.json()
            // console.log(obj);
            // if the trail slug list includes a location in the object,
            // add it to the timeline
            for(let i=0;i<trail.locations.length;i++) {
                const post = obj.posts.find(post => post.slug == trail.locations[i])
                if(post) {
                    locations[i] = post;
                }
            }
		}
    })
</script>

<section class='section'>
    <div class='container'>
    <h1 class='title block'>{trail.name} {trail.difficulty == 0 ? '✨' : ''}</h1>
    <p class='block'>{trail.desc}</p>
    <hr>
</section>

<section class='section'>
    <div class='container'>
        <div class='columns'>
            <div class='column is-4'>
                <TrailTimeline>
                    {#each locations as location, i}
                    <LocationNode 
                        cl={() => step(i)}
                        title={location.title}
                        short={location.short}
                        position={i+1}
                        type={location.type}
                        slug={location.slug}
                        selected={selected == i}
                    />
                    {/each}
                </TrailTimeline>
            </div>
            <!-- TODO: on desktop, and only show the selected location -->
            <div class='column is-hidden-touch content-wrapper'>
                {#each locationContent as component, i}
                {#if selected == i}
                <div transition:fly="{{ y: 50, duration: 250 }}" class='el2'>
                    <svelte:component this={component} position={i+1} compact={true} />
                </div>
                {/if}
                {/each}
            </div>
            
        </div>
        
    </div>
</section>
<!-- TODO: on mobile -->
<!-- TODO: add "scroll to top" button on mobile -->
<section class='section is-hidden-desktop' bind:this="{inlineLocations}">
    
        {#each locationContent as component, i}
            <div class='container my-5 inline'>
                <svelte:component this={component} position={i+1} />
            </div>
        {/each}
   
</section>

<!-- TODO: Add standards info -->
<!-- <section class='section'>
    <div class='container'>
        <h2 class='title is-size-4'>Standards Alignment</h2>
        <p class='block'>Lorum ipsum sit dolor amet</p>
    </div>
</section> -->
    
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
</style>
    