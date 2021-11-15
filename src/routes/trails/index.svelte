<script>
    import {base} from '$app/paths';
    import TrailCard from '$lib/components/TrailCard.svelte';
    import { trails } from '$lib/db/trails';
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
                beginner={trail.beginner}
                path={trail.path}
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