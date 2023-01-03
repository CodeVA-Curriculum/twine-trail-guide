<script context="module">
    // throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

    // // import {base} from '$app/paths'
    // // export const prerender = true;

    // // export async function load({ fetch, page }) {
    // //     const { trail } = page.params;
    // //     const res = await fetch(`${base}/api/locations.json`);
    // //     if (res.ok) {
    // //         const obj = await res.json();
    // //         return { props: { locations: obj.posts } };
    // //     };
    // //   return {
    // //     status: res.status,
    // //     error: new Error(),
    // //   };
    // // }
    // const locs = import.meta.glob('./*.md')

    // let body = []
    // let slugs = []
    // // let locations = []

    // for (const path in locs) {
    //     slugs.push(path)
    //     body.push(locs[path]().then(({metadata}) => metadata))
    // }
    // /**
    //     * @type {import('@sveltejs/kit').Load}
    //     */
    // async function load({ url, params, fetch }) {
    //     let locations = await Promise.all(body)
    //     for(let i=0; i<locations.length; i++) {
    //         if(locations[i]) {
    //             let end = slugs[i].indexOf(".md");
    //             locations[i].slug = slugs[i].substring(1, end);
    //         }
    //     }
    //     return {
    //         props: {
    //             locations
    //         }
    //     };
    // }
    // export {load}
</script>

<script>
    // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");
    import Fa from 'svelte-fa'
    import {faHammer} from '@fortawesome/free-solid-svg-icons'
    import {onMount} from 'svelte'
    import LocationCard from "$lib/components/LocationCard.svelte";
    import {base} from '$app/paths'
    export let data;
    let locations = [];
    
    let filteredList = [];
    let searchTerm ='';

    let types = ['tutorial', 'project']

    onMount(() => {
        // console.log(locations);
        locations = data.locations
        if(locations) {
            filteredList = locations;
        }
    })

    let filter = (searchTerm, types) => {
        

        // generate filtered list
        let tempList = [];
        for(let i=0; i<locations.length;i++) {
            if(locations[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm.length <= 0) {
                tempList.push(locations[i]);
            }
        }
        tempList = categoryFilter(tempList, types)
        return tempList
    }

    let categoryFilter = (arr, types) => {
        let tempList = []
        for(let i=0; i<arr.length; i++) {
            if (types.includes(arr[i].type)) {
                tempList.push(arr[i])
            }
        }
        return tempList;
    }

    $: filteredList = filter(searchTerm, types);
</script>

<section class='section'>
    <div class='container'>
        <h1 class='title'>Locations on the Map</h1>
        <p class='block'>This is a big list of all the locations in this guide. You can use this page to search for videos or tutorials that you think might be useful, or just browse around to find something interesting. You can also browse the Locations in this guide by exploring the <a href="https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts">Region Map</a>.</p>
        <p class='block'>Each location includes a short video and a text explanation of a particular concept, storytelling strategy, or feature of Twine. You can also explore Locations by following <a href="{base}/trails">Trails</a>, which are collections of Locations organized around particular features or projects you can create with Twine. Check them out!</p>
        
        <div class='columns'>
            <div class='column'>
                <div class="field is-grouped">
                    <div class="control is-expanded">
                        <input bind:value="{searchTerm}" class="input" type="text" placeholder="Search in Location titles...">
                    </div>
                </div>
            </div>
            <div class='column is-narrow'>
                <div class="field is-grouped mt-1">
                    <label class='label mr-3'>Type:</label>
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" bind:group={types} name="types" value={"tutorial"}>
                            Tutorial
                        </label>
                    </div>
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" bind:group={types} name="types" value={"project"}>
                            Project
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
    
    <div class='container'>
        <!-- TODO: display list of Trails for each Location in the card -->
        {#each filteredList as location}
        <LocationCard
            name={location.title}
            desc={location.description}
            path={location.slug}
            video={location.video}
            type={location.type}
        />
        {/each}
    </div>
</section>
    
<style>
    .check {
        width: 2rem;
    }
    .icon {
      border-radius: 2rem;
      margin-left: 0.5rem;
      height: 1.5rem;
      width: 1.5rem;
      background-color: hsl(48, 100%, 67%);
    }
</style>