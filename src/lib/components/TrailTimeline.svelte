<script>
    import LocationNode from '$lib/components/LocationNode.svelte'
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
        },
        {
            title: "Project",
            description: "Lorum ipsum sit dolor amet",
            icon: "project"
        }
    ];
</script>

<section class="timeline">
    <h2 class='title is-size-4'>Trail Blazes</h2>
    <header class="timeline-header">
        <span class="tag is-medium is-primary">Start</span>
    </header>
    {#each locations as location, i}
        <LocationNode 
                title={location.title}
                description={location.description}
                position={i+1}
                icon={location.icon}
        />
    {/each}
    
    <div class="timeline-header">
        <span class="tag is-medium is-primary">End</span>
    </div>
</section>

