<script>
    import Image from './Image.svelte'
    export let title, src;
    export let alt = "The output of the code above";
</script>

<article class='card my-5'>
    {#if title}
    <header class='card-header pl-5 pt-2 pb-0'>
        <h4>{title}</h4>
    </header>
    {/if}
    <div class='card-content'>
        <div class='columns is-tablet'>
            <div class='code column m-0'>
                <slot />
            </div>
            {#if src}
            <div class='column has-text-centered m-0'>
                <Image src="{src}" alt="{alt}" />
            </div>
            {/if}
        </div>
    </div>
</article>

<style>
    .code {
        overflow-x: hidden;
    }
</style>