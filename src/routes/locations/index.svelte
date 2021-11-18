<script context="module">
import { object_without_properties } from "svelte/internal";


    export async function load({ fetch, page }) {
        const { trail } = page.params;
        const res = await fetch(`/api/locations/locations.json`);
        if (res.ok) {
            const obj = await res.json();
            return { props: { locations: obj.posts } };
        };
      return {
        status: res.status,
        error: new Error(),
      };
    }
</script>

<script>
    import {onMount} from 'svelte'
    import TrailCard from '$lib/components/TrailCard.svelte';
    export let locations
    
    let filteredList = [];
    let searchTerm ='';

    onMount(() => {
        if(locations) {
            filteredList = locations;
        }
    })

    let filter = (searchTerm) => {
        let tempList = [];
        for(let i=0; i<locations.length;i++) {
            if(locations[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
                tempList.push(locations[i]);
            }
        }
        if(searchTerm.length > 0) {
            return tempList;
        } else {
            return locations;
        }
    }

    $: filteredList = filter(searchTerm);
</script>

<section class='section'>
    <div class='container'>
        <h1 class='title'>Locations on the Map</h1>
        <p class='block'>This is a big list of all the locations on the Region Map. You can use this page to search for videos or tutorials that you think might be useful, or just browse around to find something interesting. Each location has a short video and a text explanation of a particular concept, storytelling strategy, or feature of Twine. Check them out!</p>
        <hr>
        <div class="field search">
            <div class="control">
                <input bind:value="{searchTerm}" class="input" type="text" placeholder="Search in Location titles...">
            </div>
        </div>
    </div>
    
</section>

<section class='section'>
    <div class='container'>
        {#each filteredList as location}
        <TrailCard
            name={location.title}
            desc={location.description}
            path={location.slug}
        />
        {/each}
    </div>
</section>
