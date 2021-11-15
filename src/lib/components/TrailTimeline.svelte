<script>
    import LocationNode from '$lib/components/LocationNode.svelte';
    // import { locations } from '$lib/db/trails';
    import { onMount } from 'svelte';
    export let locations = [];
    export let locs=[];

    onMount(async () => {
        // fetch location list rendered from available location routes
        const url = `/locations/locations.json`;
		const res = await fetch(url);
		if (res.ok) {
            let obj = await res.json()
            // if the trail slug list includes a location in the object,
            // add it to the timeline
            for(let i=0;i<locs.length;i++) {
                const post = obj.posts.find(post => post.slug == locs[i])
                if(post) {
                    locations[i] = post;
                }
            }
		}
    })
</script>

<section class="timeline">
    <h2 class='title is-size-4'>Trail Blazes</h2>
    <header class="timeline-header">
        <span class="tag is-medium is-primary">Start</span>
    </header>
    {#each locations as location, i}
        <LocationNode 
                title={location.title}
                description={location.description}
                position={i+1}
                type={location.type}
                slug={location.slug}
        />
    {/each}
    
    <div class="timeline-header">
        <span class="tag is-medium is-primary">End</span>
    </div>
</section>

