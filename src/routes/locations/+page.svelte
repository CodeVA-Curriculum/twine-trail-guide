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
    import { faFilter, faCaretDown } from '@fortawesome/free-solid-svg-icons'
    import {onMount} from 'svelte'
    import LocationCard from "$lib/components/LocationCard.svelte";
    import {base} from '$app/paths'
    export let data;
    let locations = [];
    
    let filteredList = [];
    let searchTerm ='';
    let dropClass = '';

    onMount(() => {
        // console.log(locations);
        locations = data.locations
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

    let dropToggle = () => {
        dropClass = dropClass == 'is-active' ? '' : 'is-active'
    }

    $: filteredList = filter(searchTerm);
</script>

<section class='section'>
    <div class='container'>
        <h1 class='title'>Locations on the Map</h1>
        <p class='block'>This is a big list of all the locations in this guide. You can use this page to search for videos or tutorials that you think might be useful, or just browse around to find something interesting. You can also browse the Locations in this guide by exploring the <a href="https://padlet.com/jonstapleton/wvs5vb5ct1s5kqts">Region Map</a>.</p>
        <p class='block'>Each location includes a short video and a text explanation of a particular concept, storytelling strategy, or feature of Twine. You can also explore Locations by following <a href="{base}/trails">Trails</a>, which are collections of Locations organized around particular features or projects you can create with Twine. Check them out!</p>
        
        <!-- input field -->
        <div class="field has-addons">
            <div class="control is-expanded">
                <input bind:value="{searchTerm}" class="input" type="text" placeholder="Search in Location titles...">
            </div>
            <div class="control">
                <a class="button">
                    <Fa icon={faFilter} />
                </a>
            </div>
        </div>

        <!-- filters card -->
        <div class='card'>
            <div class='card-content'>
                <div class='content'>
                    <div class='columns'>
                        <div class='column'>
                            <!-- tags dropdown -->
                            <div class="dropdown {dropClass}">
                                <div class="dropdown-trigger level">
                                    <div class='level-item'>
                                        <p class=label>Tags:</p>
                                    </div>
                                    <div class='level-item mx-3'>
                                        <button on:click={dropToggle} class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span>Select tags...</span>
                                            <span class="icon is-small">
                                              <Fa icon={faCaretDown} aria-hidden='true' />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                  <div class="dropdown-content">
                                    <a href="#" class="dropdown-item">
                                      Dropdown item
                                    </a>
                                    <a class="dropdown-item">
                                      Other dropdown item
                                    </a>
                                    <a href="#" class="dropdown-item is-active">
                                      Active dropdown item
                                    </a>
                                    <a href="#" class="dropdown-item">
                                      Other dropdown item
                                    </a>
                                    <hr class="dropdown-divider">
                                    <a href="#" class="dropdown-item">
                                      With a divider
                                    </a>
                                  </div>
                                </div>
                              </div>
                        </div>
                        <div class='column'>
                            <div class='field is-grouped mt-1'>
                                <label class="label mx-5">Location Type:</label>
                                <div class='control'>
                                    <label class='checkbox'>
                                        <input type='checkbox'>
                                        Tutorial
                                    </label>
                                </div>
                                <div class='control'>
                                    <label class='checkbox'>
                                        <input type='checkbox'>
                                        Project
                                    </label>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
    
</section>

<section class='section'>
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
