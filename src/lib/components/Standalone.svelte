<script>
    export let position, title, type
</script>

<h2 class='is-size-4'>{#if type!="project"}{position}. {/if}{title}</h2>

<slot />