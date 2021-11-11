<script>
    let trails = [0, 0, 0, 0, 0, 0, 0, 0]
    import {base} from '$app/paths';
import TrailCard from '$lib/components/TrailCard.svelte';
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
            <TrailCard />
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