<script>
    export let title = "Click Me!"
    let collapse = false;
</script>

<div class='collapse'>
    <div class='has-text-centered'>
        <button on:click={() => collapse = !collapse} class='button is-primary'>{title}</button>
    </div>
    {#if collapse}
    <div class='collapsible'>
        <slot />
    </div>
    {/if}
</div>