<script>
    import {base} from '$app/paths';
    export let title, description, position, icon
    const path=""
</script>

<div class="timeline-item location">
    {#if icon=="project"}
        <div class='timeline-marker is-warning is-icon'>
            icon
        </div>
    {:else}
        <div class="timeline-marker"></div>
    {/if}
    <a href='{base}/locations/{path}' class="timeline-content card p-4 location-content">
        <h3 class="heading">{position}. {title}</h3>
        <p>{description}</p>
    </a>
</div>

<style>
    .location > .location-content {
        margin-left: 3rem;
    }
    .location > .location-content:hover {
        background-color: whitesmoke;
    }
</style>