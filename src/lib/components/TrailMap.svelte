<script context="module">
    let locations = [];

    export function getLocations() {
        return locations;
    }
</script>

<script>
    import TrailTimeline from '$lib/components/TrailTimeline.svelte';
    let s;

    
</script>

<div bind:this={s}>
    <slot />
</div>