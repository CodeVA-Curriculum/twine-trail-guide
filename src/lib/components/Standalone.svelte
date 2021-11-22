<script>
    export let title, type, description, author, layout, short
    export let compact = false;
    export let position = false;
</script>

<div class='container'>
    <section class='section'>
        <div class='{ compact ? "" : "columns"}'>
            <div class='{ compact ? "" : "column"}'>
                <h1 class='title'>{#if position}{position}. {/if}{title}</h1>
                <!-- TODO: add tags for trails -->
                <p class='block'>{description}</p>
                <p class='block'>Watch the video to see someone demonstrate the basics, or read on to work through it on your own. This concept is a part of several project "trails"; check them out:</p>
                <h2 class='heading'>Trails:</h2>
            </div>
            <div class='{ compact ? "" : "column"}'>
                <div class='video'>
                    <iframe src="https://www.youtube.com/embed/AsURmcD_Z5g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        <hr>
    </section>
    <section class='section content'>
        <slot />
    </section>
</div>

<style lang='scss'>
    .video {
        // overflow: hidden;
        /* 16:9 aspect ratio */
        padding-top: 56.25%;
        position: relative;
    }

    .video iframe {
        border: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        border-radius: 12px;
        /* min-width: 10rem; */
    }

</style>


