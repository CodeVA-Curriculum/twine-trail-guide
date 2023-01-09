<script>
    import { onDestroy, onMount } from 'svelte';
    // import { session } from '$app/stores';
    import { locationData, locations, selected } from '$lib/util/stores.js';
    import Standalone from '$lib/components/Standalone.svelte';
import LocationNode from './LocationNode.svelte';
import { fade, fly } from 'svelte/transition';
    export let path;
    export let optional = false;
    
    let index;
    let locationContent;
    let p = 0;
    let visible = false;
    let unsubLocations = () => { console.log("Default unsub") };

    function updateStore(locs, newLocation) {
        // add self to $locations
        // console.log("called updateStore on " + newLocation)
        if(!locs.includes(newLocation)) {
            // p += locs.length
            return [...locs, newLocation]
        } else {
            return locs;
        }
    }

    function findPos(locs, path) {
        return locs.indexOf(path) + 1;
    }

    onMount(async () => {
        if(path) {
            locationContent = (await import(`../../routes/locations/${path}/+page.md`));
            let meta = locationContent.metadata
            meta.path = path

            console.log(`Sending ${path} to $locations`)
            locations.update(locs => updateStore(locs, path));
            // locationData.update(obj => obj = [...obj, meta])
            // console.log("Added", meta, "to the store")
            // console.log("Added", locationContent);

            // update position in timeline
            unsubLocations = locations.subscribe(locs => {
                // console.log(locs, path);
                p = locs.indexOf(path) + 1;
                // for(let i=0;i<locs.length;i++) {
                //     if(locs[i] == path) {
                //         p = i + 1
                //         break
                //     }
                // }
            })

            // make the location page visible if the path matches the `selected` value in $util/store.js
            selected.subscribe(value => {
                visible = value == path;
            })

        }
        // return () => {
        //     locations.set([]);
        // }
    })

    // remove self from $locations
    onDestroy(() => {
        // if(path) {
        //     // find self in $locations & remove
        //     let i = $locations.indexOf(path)
        //     let newLocs = $locations.splice(i, 1)
        //     locations.set(newLocs)
        // }
        
        // unsubLocations();
    })
</script>

<div class='is-hidden-touch'>
    {#if locationContent && visible}
    <div transition:fly="{{ y: 50, duration: 250 }}" class='el2'>
        <svelte:component this={locationContent.default} compact={true} position={p} scrollable={false} />
    </div>
    {/if}
</div>
<div class='is-hidden-desktop'>
    {#if locationContent}
    <svelte:component this={locationContent.default} compact={true} position={p} scrollable={true} />
    {/if}
</div>

<style>
    .el2 {
		grid-area: 1/1/2/2;
		border-radius: 1rem;
  }
</style>