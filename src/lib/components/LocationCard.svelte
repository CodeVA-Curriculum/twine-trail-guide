<script>
    import {base} from '$app/paths';
    import Fa from 'svelte-fa'
    import {faHammer} from '@fortawesome/free-solid-svg-icons'

    export let name, desc, path, type;
    export let video; // = 'https://www.youtube.com/embed/AsURmcD_Z5g'
    let icon = '';

    import { goto } from '$app/navigation';

  function routeToPage() {
    const replaceState = false;
    goto(`${base}/locations${path}`, { replaceState: false, noscroll: false }) 
  }
</script>

<article on:click={routeToPage} class='card my-5 location'>
    <div class='card-content'>
      <div class="columns is-mobile">
        <!-- TODO: add tags for trails -->
        {#if video}
        <div class="column is-4">
          <div class='video'>
            <iframe src="{video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
        {/if}
        <div class='column'>
            <h2 class='title is-size-4 mb-3'><a href='{base}/locations{path}'>{name}</a>{#if type=="project"}<span class='icon'><Fa icon={faHammer} size="0.75x" /></span>{/if}</h2>
            <p class='block'>{desc}</p>
        </div>
      </div>
    </div>
</article>

<style>
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

    .icon {
      border-radius: 3rem;
      margin-left: 1rem;
      height: 2rem;
      width: 2rem;
      background-color: hsl(48, 100%, 67%);
    }
</style>