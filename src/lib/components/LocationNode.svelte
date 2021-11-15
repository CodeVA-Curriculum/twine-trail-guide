<script>
    import {base} from '$app/paths';
    export let title, description, position, type, slug
</script>

<div class="timeline-item location">
    {#if type=="project"}
        <div class='timeline-marker is-warning is-icon'>
            icon
        </div>
    {:else}
        <div class="timeline-marker"></div>
    {/if}
    <div class="timeline-content card p-4 location-content">
        <h3 class="heading"><a href='{base}/locations/{slug}'>{position}. {title}</a></h3>
        <p>{description}</p>
    </div>
</div>

<style>
    .location > .location-content {
        margin-left: 3rem;
    }
    .location > .location-content:hover {
        background-color: whitesmoke;
    }
</style>