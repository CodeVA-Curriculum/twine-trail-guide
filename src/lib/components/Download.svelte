<script>
    export let href=""
    import {onMount} from 'svelte'

    onMount(()=> {
        console.log("Loaded Download.svelte")
    })
</script>

<a href="{href}">Something</a>