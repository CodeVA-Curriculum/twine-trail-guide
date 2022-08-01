<script>
    import {onMount} from 'svelte'
    import {base} from '$app/paths'
    export let href = ''
    export let rel = '';

    let filteredLink = ''

    onMount(()=> {
        if(typeof(href) != typeof('str')) {
            console.warn(`Link received 'href' prop that is not a string type: ${href}`)
            filteredLink = ''
        } else {
            filteredLink = href.indexOf('/') == 0 ? base+href : href
        }
    })
</script>

<a href="{filteredLink}" rel="{rel}"><slot /></a>