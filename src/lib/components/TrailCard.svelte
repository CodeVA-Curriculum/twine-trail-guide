<script>
    import {base} from '$app/paths';

    export let name, desc, beginner, path;
    let icon = '';

    $: icon = beginner ? '✨' : '';

    import { goto } from '$app/navigation';

  function routeToPage() {
    const replaceState = false;
    goto(`${base}/trails/${path}`, { replaceState }) 
  }
</script>

<article on:click={routeToPage} class='card my-5 trail'>
    <div class='card-content'>
      <div class="media">
        <!-- TODO: integration images, either fallback icons or screenshots of the map -->
        <div class="media-left mr-5">
          <figure class="image is-hidden-touch">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <h2 class='title is-size-4'><a href='{base}/trails/{path}'>{name} {icon}</a></h2>
          <p class='block'>{desc}</p>
        </div>
      </div>
    </div>
</article>

<style lang="scss">
  a {
    color: black;
  }
  .trail {
    max-width: 40rem;
  }
  .trail:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
</style>