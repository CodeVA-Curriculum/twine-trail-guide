<script context="module">
    import {base} from '$app/paths';
    export async function load({ fetch, page }) {
      const { trail } = page.params;
      const res = await fetch(`${base}/api/trails/all.json`);
      if (res.ok) return { props: { trails_res: await res.json() } };
      return {
        status: res.status,
        error: new Error(),
      };
    }
</script>

<script>
    import TrailCard from '$lib/components/TrailCard.svelte';
    
    export let trails_res;
    let trails = trails_res.trails;
</script>

<div class='section'>
    <div class='container'>
        <h1 class='title'>Trail Guide</h1>
        <p class='block'>Browse the list of trails below to explore different things to create with Twine. Each Trail is a set of short tutorials that will help you learn how to create a particular kind of story, or implement a feature into a story you've already created.</p>
            
        <p class='block'>Some Trails are short, and some are longer and take more time to complete. We've marked the trails recommended for beginners with the ✨ icon. All the Trails in this guide have a "difficulty" rating that corresponds to how much time the Trail might take to complete.</p>
        <div class=''>
            <ul class='list columns is-multiline is-desktop is-centered'>
                <li class='list-item column is-flex'>
                    <div class='card'>
                        <div class='card-header heading is-size-6 p-3'>🔷 Easy</div>
                        <div class='card-content content is-small'>
                            These trails are short and simple. They are good for novices or folks who don't have a lot of time to spend diving deep into a complicated topic.
                        </div>
                    </div>
                </li>
                <li class='list-item column is-flex'>
                    <div class='card'>
                        <div class='card-header heading is-size-6 p-3'>🔷🔷 Moderate</div>
                        <div class='card-content  content is-small'>
                            These trails are longer and more involved. They are good beginners who want to create slightly more complex projects.
                        </div>
                    </div>
                </li>
                <li class='list-item column is-flex'>
                    <div class='card'>
                        <div class='card-header heading is-size-6 p-3'>🔷🔷🔷 Strenuous</div>
                        <div class='card-content content is-small'>
                            These trails can be pretty complicated. They are good for experienced folks or beginners to who are willing to spend a little extra time.
                        </div>
                    </div>
                </li>
                <li class='list-item column is-flex'>
                    <div class='card'>
                        <div class='card-header heading is-size-6 p-3'>🔷🔷🔷🔷 Difficult</div>
                        <div class='card-content content is-small'>
                            These trails involve some advanced topics. They are good for folks who are comfortable with the basics of Twine and want to take on a challenge.
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <hr>
    </div>
</div>
<div class='section'>
    <div class='container trail-list'>
    <!-- Trail Card-->
        {#each trails as trail}
            <TrailCard
                name={trail.name}
                desc={trail.description}
                difficulty={trail.difficulty}
                path='trails/{trail.path}'
            />
        {/each}
    </div>
</div>

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