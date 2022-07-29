<script context="module">
    // export const prerender = true;
    // import {base} from '$app/paths'
    //     export async function load({ fetch, page }) {
    //         const { trail } = page.params;
    //         const res = await fetch(`${base}/api/trails.json`);
    //         if (res.ok) {
    //             const obj = await res.json();
    //             return { props: { trails: obj.posts } };
    //         };
    //       return {
    //         status: res.status,
    //         error: new Error(),
    //       };
    //     }

    const posts = import.meta.glob('./*.md')

    let body = []
    let paths = []
  
    for (const path in posts) {
        paths.push(path);
        body.push(posts[path]().then(({metadata}) => metadata))
    }
    /**
        * @type {import('@sveltejs/kit').Load}
        */
    export async function load({ url, params, fetch }) {
        const trails = await Promise.all(body)
        for(let i=0; i<trails.length; i++) {
            if(trails[i]) {
                let end = paths[i].indexOf(".md");
                trails[i].slug = paths[i].substring(1, end);
            }
        }
        return {
        props: {
            trails
        }
        };
    }
</script>

<script>
    import TrailCard from '$lib/components/TrailCard.svelte';
    import Fa from 'svelte-fa';
    import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
    import { onMount } from 'svelte';
    let trailList;
    export let trails;

    let filteredList = [];
    let searchTerm ='';

    onMount(() => {
        // sort by "sparkle"
        // trails.sort(function (a,b) { return a.difficulty - b.difficulty})
        if(trails) {
            filteredList = trails;
        }
        // console.log(trails)
    })

    let filter = (searchTerm) => {
        let tempList = [];
        for(let i=0; i<trails.length;i++) {
            if(trails[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
                tempList.push(trails[i]);
            }
        }
        if(searchTerm.length > 0) {
            return tempList;
        } else {
            trails.sort(function (a,b) { return a.difficulty-b.difficulty})
            return trails;
        }
    }

    $: filteredList = filter(searchTerm);
</script>

<div class='section'>
    <div class='container'>
        <h1 class='title'>Trail Guide</h1>
        <p class='block'>Browse the list of trails below to explore different things to create with Twine. Each Trail is a set of short tutorials that will help you learn how to create a particular kind of story, or implement a feature into a story you've already created.</p>
            
        <p class='block'>Some Trails are short, and some are longer and take more time to complete. We've marked the trails recommended for beginners with the ✨ icon. All the Trails in this guide have a "difficulty" rating that corresponds to how much time the Trail might take to complete (🔷 for Easy, 🔷🔷 for Moderate, 🔷🔷🔷 for Strenuous, and 🔷🔷🔷🔷 for Expert).</p>
        <!-- <hr> -->
    </div>
</div>
<!-- <div class='section'>
    <div class='container trail-list' this:bind={trailList}>
    <!-- Trail Card-->
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

<section class='section'>
    
    <div class='container trail-list'>
        
        {#each filteredList as trail}
        <TrailCard
                name={trail.title}
                desc={trail.description}
                difficulty={trail.difficulty}
                path='{trail.slug}'
        />
        {/each}
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
</style>

