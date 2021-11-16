<script context="module">
    import {base} from '$app/paths';
    export async function load({ fetch, page }) {
      const { trail } = page.params;
      const res = await fetch(`${base}/api/trails/${trail}`);
      if (res.ok) return { props: { trail: await res.json() } };
      return {
        status: res.status,
        error: new Error(),
      };
    }
</script>
  
<script>
    import TrailTimeline from "$lib/components/TrailTimeline.svelte";
    import { onMount } from 'svelte';
    export let trail;

    // console.log(trail);
</script>

<section class='section'>
    <div class='container'>
    <h1 class='title block'>{trail.name} {trail.beginner ? '✨' : ''}</h1>
    <p class='block'>{trail.desc}</p>
</section>

<section class='section'>
    <div class='container'>
        <TrailTimeline locs={trail.locations} />
    </div>
</section>
<section class='section'>
    <div class='container'>
        <h2 class='title is-size-4'>Standards Alignment</h2>
        <p class='block'>Lorum ipsum sit dolor amet</p>
    </div>
</section>
    
    
    