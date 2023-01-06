<script context="module">
//   throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  //   // export const prerender = true;
  //   // import {base} from '$app/paths'
  //   //     export async function load({ fetch, page }) {
  //   //         const { trail } = page.params;
  //   //         const res = await fetch(`${base}/api/trails.json`);
  //   //         if (res.ok) {
  //   //             const obj = await res.json();
  //   //             return { props: { trails: obj.posts } };
  //   //         };
  //   //       return {
  //   //         status: res.status,
  //   //         error: new Error(),
  //   //       };
  //   //     }

  //   const posts = import.meta.glob('./*.md')

  //   let body = []
  //   let paths = []
  // 
  //   for (const path in posts) {
  //       paths.push(path);
  //       body.push(posts[path]().then(({metadata}) => metadata))
  //   }
  //   /**
  //       * @type {import('@sveltejs/kit').Load}
  //       */
  //   export async function load({ url, params, fetch }) {
  //       const trails = await Promise.all(body)
  //       for(let i=0; i<trails.length; i++) {
  //           if(trails[i]) {
  //               let end = paths[i].indexOf(".md");
  //               trails[i].slug = paths[i].substring(1, end);
  //           }
  //       }
  //       return {
  //       props: {
  //           trails
  //       }
  //       };
  //   }
</script>

<script>
    // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

    import TrailCard from '$lib/components/TrailCard.svelte';
    import Fa from 'svelte-fa';
    import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import { onMount } from 'svelte';
    import { selected } from '$lib/util/stores';
    let trailList;
    let trails = [];

    export let data;

    const difficulties = [
        "Easy 🔷",
        "Moderate 🔷🔷",
        "Strenuous 🔷🔷🔷",
        "Extreme 🔷🔷🔷🔷"
    ]

    let filteredList = [];
    let searchTerm ='';
    let selectedDifficulties = [0, 1, 2, 3]

    onMount(() => {
        // sort by "sparkle"
        // trails.sort(function (a,b) { return a.difficulty - b.difficulty})
        // console.log(data.trails)
        // trails = data.trails;
        // if(trails) {
        //     filteredList = trails;
        // }
        filteredList = data.trails;
        // console.log(trails)
    })

    let filter = (searchTerm, selectedDifficulties) => {
        let tempList = [];
        for(let i=0; i<trails.length;i++) {
            if(trails[i].title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm.length <= 0) {
                tempList.push(trails[i]);
            }
        }
        tempList = diffFilter(tempList, selectedDifficulties)
        return tempList
    }

    let diffFilter = (arr, selectedDiffs) => {
        let tempList = []
        for(let i=0; i<arr.length; i++) {
            if(selectedDiffs.includes(arr[i].difficulty)) {
                tempList.push(arr[i])
            }
        }
        return tempList;
    }

    $: filteredList = filter(searchTerm, selectedDifficulties);
</script>

<section class='section'>
    <div class='container'>
        <h1 class='title'>Trail Guide</h1>
        <p class='block'>Browse the list of trails below to explore different things to create with Twine. Each Trail is a set of short tutorials that will help you learn how to create a particular kind of story, or implement a feature into a story you've already created.</p>
            
        <p class='block'>Some Trails are short, and some are longer and take more time to complete. We've marked the trails recommended for beginners with the ✨ icon. All the Trails in this guide have a "difficulty" rating that corresponds to how much time the Trail might take to complete (🔷 for Easy, 🔷🔷 for Moderate, 🔷🔷🔷 for Strenuous, and 🔷🔷🔷🔷 for Expert).</p>
        <!-- <hr> -->
        <div class='field has-addons'>
            <div class='control is-expanded'>
                <input bind:value={searchTerm} class='input' type='text' placeholder="Search in Trail titles...">
            </div>
            <div class='control'>
                <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>Filter by difficulty...</span>
                        {#if selectedDifficulties.length > 0}
                        <span class="icon is-small">
                            <p>{selectedDifficulties.length}</p>
                          </span>
                        {/if}
                        
                      </button>
                    </div>
                    <!-- <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            {#each difficulties as diff, i}
                            <label class="dropdown-item checkbox">
                                <input type='checkbox' bind:group={selectedDifficulties} name='selectedDifficulties' value={i}>
                                {diff}
                            </label>
                            {/each}
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
<!-- <div class='section'>
    <div class='container trail-list' this:bind={trailList}>
    Trail Card-->
        <!-- {#each trails as trail}
            <TrailCard
                name={trail.name}
                desc={trail.description}
                difficulty={trail.difficulty}
                path='trails/{trail.path}'
            />
        {/each}
    </div>
</div> -->
    <hr>
    <div class='container trail-list'>
        {#if filteredList.length > 0}
        {#each filteredList as trail}
        <TrailCard
                name={trail.title}
                desc={trail.description}
                difficulty={trail.difficulty}
                path={trail.slug}
        />
        {/each}
        {/if}
    </div>
</section>

<style>
    .trail {
        max-width: 786px;
    }
    .trail:hover {
        background-color: whitesmoke;
    }
    .list-item {
        margin: 0.5rem;
    }
    .icon {
        background-color: lightgray;
        border-radius: 3rem;
        width: 1.5rem;
        height: 1.5rem;
    }
</style>

