<script>
    import {onMount} from 'svelte'
    import {base} from '$app/paths'
    export let href, rel;

    $: filteredLink = href.indexOf('/') == 0 ? base+href : href

    onMount(()=> {
        console.log(`link is live, going to ${filteredLink}`)
    })
</script>

<a href="{filteredLink}" rel="{rel}"><slot /></a>