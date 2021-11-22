<script>
    import {base} from '$app/paths';

    export let name, desc, path;
    export let video = 'https://www.youtube.com/embed/AsURmcD_Z5g'
    let icon = '';

    import { goto } from '$app/navigation';

  function routeToPage() {
    const replaceState = false;
    goto(`${base}/locations/${path}`, { replaceState }) 
  }
</script>

<article on:click={routeToPage} class='card my-5 location'>
    <div class='card-content'>
      <div class="columns is-mobile">
        <!-- TODO: add tags for trails -->
        <div class="column is-4">
          <div class='video'>
            <iframe src="{video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
        <div class='column'>
            <h2 class='title is-size-4 mb-3'><a href='{base}/trails/{path}'>{name} {icon}</a></h2>
            <p class='block'>{desc}</p>
        </div>
      </div>
    </div>
</article>

<style lang="scss">
  a {
    color: black;
  }
  .location {
    max-width: 40rem;
  }
  .location:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }

  .video {
        overflow: hidden;
        /* 16:9 aspect ratio */
        padding-top: 75%;
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
    }
</style>