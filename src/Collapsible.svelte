<script>
  /**
   * Vertically animate the collapse and expansion of the given children.
   *
   * @component Collapsible
   */

  export let isExpanded = false;
</script>

<style>
  .collapse {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1);
  }

  .expand {
    max-height: 99em;
    transition: max-height 0.3s ease-in-out;
  }
</style>

<div class:collapse={!isExpanded} class:expand={isExpanded}>
  <slot />
</div>
