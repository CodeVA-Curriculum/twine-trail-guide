<script>
    let trails = [0, 0, 0, 0, 0, 0, 0, 0]
    import {base} from '$app/paths';
</script>

<div class='section'>
    <div class='container'>
        <h1 class='title'>Trail Guide</h1>
        <p class='block'>Browse the list of trails below to explore different things to create with Twine. We've marked the trails recommended for beginners with the ✨ icon.</p>
        <hr>
    </div>
</div>
<div class='section'>
    <div class='container'>
    <!-- Trail Card-->
        {#each trails as trail}
        <article class='card mx-1 my-5 trail'>
            <div class='card-content p-3'>
                <div class="media">
                    <div class="media-left">
                      <figure class="image is-hidden-touch">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <a><h2 class='title is-size-4'>Your First Story ✨</h2></a>
                      <p class='block'>Do the thing! Provide a short description, with enough words that it fills up the space. Here's an example.</p>
                        <a href="{base}/trails/trail-demo">Trail Demo</a>
                    </div>
                  </div>
            </div>
            <!-- <div class='column is-hidden-touch is-narrow'>
                <img src='https://via.placeholder.com/400x300' />
            </div> -->
        </article>
        {/each}
    </div>
</div>

<style>
    .trail {
        max-width: 786px;
    }
    .trail:hover {
        background-color: whitesmoke;
    }
</style>