<script>
    export let src;
    export let alt = "The output of the code above"
</script>

<div class='box columns'>
    <div class='column'>
        <slot />
    </div>
    <div class='column'>
        <img src="{src}" alt="{alt}" />
    </div>
</div>