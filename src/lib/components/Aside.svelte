<script>
    export let title, type
    import Fa from 'svelte-fa'
    import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
</script>

<aside class='card is- p-3'>
    <div class='columns is-mobile is-vcentered'>
        <div class='column is-narrow'><span><Fa icon={faExclamationTriangle} size='1.75x' /></span></div>
        <div class='column'>
            <p class='is-size-7'>
                <slot />
            </p>
        </div>
    </div>
</aside>

<style>
    aside {
        background-color: whitesmoke;
    }
</style>