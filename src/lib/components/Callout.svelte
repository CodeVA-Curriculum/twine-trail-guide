<div class='callout'>
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
          background-color: $yellow;
          padding: 1rem;
          padding-left: 0;
          padding-right: 0;
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
</style>