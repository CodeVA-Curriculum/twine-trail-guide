<script context='module'>
    let selected; // keeps track of which element has been clicked
</script>

<script>
    import LocationNode from '$lib/components/LocationNode.svelte'

    export let path

    // TODO: get the location metadata and content based on the path, pass the content up to the parent component
    // Something like this: https://svelte.dev/tutorial/module-exports/
</script>

<LocationNode 
    title={path}>
    <slot />
</LocationNode>
