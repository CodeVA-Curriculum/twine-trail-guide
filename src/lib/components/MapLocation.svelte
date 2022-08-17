<script>
    import { onDestroy, onMount } from 'svelte';
    import { session } from '$app/stores';
    import { locationData, locations, selected } from '$lib/util/stores.js';
    import Standalone from '$lib/components/Standalone.svelte';
import LocationNode from './LocationNode.svelte';
import { fade, fly } from 'svelte/transition';
    export let path;
    
    let index;
    let locationContent;
    let p = 0;
    let visible = false;

    function updateStore(locs, newLocation) {
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
            locations.update(locs => updateStore(locs, path));
            locationContent = (await import(`../../routes/locations/${path}/+page.md`));
            let meta = locationContent.metadata
            meta.path = path
            // locationData.update(obj => obj = [...obj, meta])
            // console.log("Added", meta, "to the store")
            // console.log("Added", locationContent);
            locations.subscribe(locs => {
                // console.log(locs, path);
                for(let i=0;i<locs.length;i++) {
                    if(locs[i] == path) {
                        p = i + 1
                        break
                    }
                }
            })
            selected.subscribe(value => {
                visible = value == path;
            })

        }
        // return () => {
        //     locations.set([]);
        // }
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