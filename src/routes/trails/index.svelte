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
        <p class='block'>Browse the list of trails below to explore different things to create with Twine. We've marked the trails recommended for beginners with the ✨ icon.</p>
        <hr>
    </div>
</div>
<div class='section'>
    <div class='container'>
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
</style>