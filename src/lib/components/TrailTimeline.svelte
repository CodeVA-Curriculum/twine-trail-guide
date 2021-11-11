<script>
    const locations = [
        {
            title: "Start a Story",
            description: "A brief description of the location"
        },
        {
            title: 'Create a Passage',
            description: "A brief description of the location"
        },
        {
            title: "Link Passages together",
            description: "A brief description of the location"
        }
    ];
</script>

<section class="timeline">
    <h2 class='title is-size-4'>Trail Blazes</h2>
    <header class="timeline-header">
        <span class="tag is-medium is-primary">Start</span>
    </header>
    {#each locations as location, i}
    <div class="timeline-item location">
        <div class="timeline-marker"></div>
        <div class="timeline-content card p-4 location-content">
        <h3 class="heading">{i+1}. {location.title}</h3>
        <p>{location.description}</p>
        </div>
    </div>
    {/each}
    <div class='timeline-item location'>
        <div class='timeline-marker is-warning is-icon'>
            icon
        </div>
        <div class='timeline-content card p-4 location-content'>
            <h3 class='heading'>Project Title</h3>
            <p>Lorum ipsum sit dolor amet</p>
        </div>
    </div>
    <div class="timeline-header">
        <span class="tag is-medium is-primary">End</span>
    </div>
</section>

<style>
    .location > .location-content {
        margin-left: 3rem;
    }
</style>