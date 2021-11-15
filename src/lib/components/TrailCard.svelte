<script>
    import {base} from '$app/paths';

    export let name, desc, beginner, path;
    let icon = '';

    $: icon = beginner ? '✨' : '';
</script>

<article class='card mx-1 my-5 trail'>
    <div class='card-content p-3'>
        <div class="media">
            <div class="media-left">
              <figure class="image is-hidden-touch">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <h2 class='title is-size-4'><a>{name} {icon}</a></h2>
              <p class='block'>{desc}</p>
                <a href="{base}/trails/{path}">Trail Demo</a>
            </div>
          </div>
    </div>
    <!-- <div class='column is-hidden-touch is-narrow'>
        <img src='https://via.placeholder.com/400x300' />
    </div> -->
</article>

<style>
  a {
    color: black;
  }
</style>