<script context='module'>

</script>

<script>
    import { onDestroy, onMount } from 'svelte';

    export let path;
    let locationContent;

    onMount(async () => {
        // if(path) {
        //     let location = (await import(`../../routes/locations/${path}.md`));
            
        // }
        // return () => {
        //     // Locations.delete(path);
        // }
    })
    // TODO: get the location metadata and content based on the path, pass the content up to the parent component
    // Something like this: https://svelte.dev/tutorial/module-exports/
</script>

<div class='locationText' style="display:none">

</div>

<!-- {#if locationContent}
<svelte:component this={locationContent} position={1} compact={true} />
{/if} -->