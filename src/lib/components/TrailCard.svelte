<script>
    import {base} from '$app/paths';

    export let name, desc, difficulty, path;
    let icon = '';

    $: icon = difficulty == 0 ? '✨' : '';

    import { goto } from '$app/navigation';

  function routeToPage() {
    goto(base + "/trails" + path, { replaceState: true, noScroll: false }) 
  }

  function getDifficulty() {
    switch (difficulty) {
      case 0:
        return '🔷'
      case 1:
        return '🔷🔷'
      case 2:
        return '🔷🔷🔷'
      case 3:
        return '🔷🔷🔷🔷'
    }
    return ''
  }
</script>

<article on:click={routeToPage} class='card my-5 trail'>
    <div class='card-content'>
      <div class="media">
        <!-- TODO: integration images, either fallback icons or screenshots of the map -->
        <!-- <div class="media-left mr-5">
          <figure class="image is-hidden-touch">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image">
          </figure>
        </div> -->
        <div>
          <div class='columns is-mobile'>
            <div class='column'>
              <h2 class='title is-size-4'><a href='{base}/trails{path}'>{name} {icon}</a></h2>
            </div>
            <div class='column is-narrow'>
              <span class='heading is-size-5'>{getDifficulty()}</span>
            </div>
          </div>
          
          <p class='block'>{desc}</p>
        </div>
      </div>
    </div>
</article>

<style>
  a {
    color: black;
  }
  .trail {
    /* // max-width: 40rem; */
  }
  .trail:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
  .trail:hover h2 {
    text-decoration: underline;
  }
</style>