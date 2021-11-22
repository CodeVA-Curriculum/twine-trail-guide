<script context="module">
    import {base} from '$app/paths';
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
    export let trail;

    let Sample;
    let locationContent = [];
    let locations = [];
    let inlineLocations;

    function step(i) {
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
</section>

<section class='section'>
    <div class='container'>
        <div class='columns is-desktop'>
            <div class='column'>
                <TrailTimeline>
                    {#each locations as location, i}
                    <LocationNode 
                        cl={() => step(i)}
                        title={location.title}
                        description={location.description}
                        position={i+1}
                        type={location.type}
                        slug={location.slug}
                    />
                    {/each}
                </TrailTimeline>
            </div>
            <!-- TODO: on desktop, and only show the selected location -->
            <div class='column content' bind:this="{inlineLocations}">
                {#each locationContent as component, i}
                <div class='container my-5'>
                    <svelte:component this={component} position={i+1} />
                </div>
                {/each}
            </div>
            
        </div>
        
    </div>
</section>
<!-- TODO: on mobile -->
<!-- TODO: add "scroll to top" button on mobile -->
<section class='section content' bind:this="{inlineLocations}">
    
        {#each locationContent as component, i}
            <div class='container my-5'>
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
    
    
    