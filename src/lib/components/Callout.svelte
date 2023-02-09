<script>
    export let color = "yellow";
</script>

<div class='callout {color}'>
    <div class='border-container'>
        <!-- <h2 class='title'>${this.title}</h2> -->
        <slot />
    </div>
</div>

<style lang='scss'>
    @import "../styles/variables.scss";
    .callout {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
          padding: 1rem;
          padding-left: 0;
          padding-right: 0;
          box-shadow: 4px 4px 6px lightgray;
      }
      .title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.5rem;
      }
      .border-container {
          padding: 0rem 3rem;
          margin: 0rem;
          position: relative;
          left: -0.125%;
          width: 100.25%;
          border-left: double;
          border-right: double;
          border-image: url('$lib/assets/CalloutBorder.png') 100 50% 100 50% repeat;
          border-width: 9px;
      }

      // themes
      .yellow {
        background-color: $yellow;
      }
      .white {
        background-color: $white;
        border-color: black;
        border-width: 1px;
        border-style: solid;
      }
</style>