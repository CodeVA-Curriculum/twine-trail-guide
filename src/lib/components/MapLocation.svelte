<script>
    import { onDestroy, onMount } from 'svelte';
    import { session } from '$app/stores';
    import { locations } from '$lib/util/stores.js';
    export let path;
    
    let index;

    function updateStore(locs, newLocation) {
        // console.log("called updateStore on " + newLocation)
        if(!locs.includes(newLocation)) {
            return [...locs, newLocation]
        } else {
            return locs;
        }
    }

    onMount(async () => {
        if(path) {
            // let location = (await import(`../../routes/locations/${path}.md`));
            locations.update(locs => updateStore(locs, path));
        }
        return () => {
            locations.set([]);
        }
    })
</script>