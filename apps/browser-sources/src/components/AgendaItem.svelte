<script lang="ts">
  /**
   * Track the in-progress, completion, etc. state of an agenda item. Show the
   * name of the item in the "button" slot. If you need to know the current
   * state, use the "rest" slot's "state" prop.
   *
   * Truncates the agenda item name by default. When the agenda item is
   * in-progress, animate it back and forth, like a marquee. To disable this,
   * pass `isAnimatable={false}`.
   *
   * @component AgendaItem
   */

  export let isAnimatable = false;
  let state: "EXPANDED" | "COMPLETE" | "COLLAPSED";

  function toggle(): void {
    if (state === "EXPANDED") {
      state = "COMPLETE";
    } else if (state === "COMPLETE") {
      state = "COLLAPSED";
    } else {
      state = "EXPANDED";
    }
  }
</script>

<button
  class={`button font-display ${state}`}
  class:isAnimatable
  on:click={toggle}
>
  <slot name="button" />
</button>

<slot name="rest" {state} />

<slot />

<style type="text/postcss">
  .COMPLETE {
    color: lightgray;
    text-decoration: line-through;
  }

  .button {
    @apply leading-5;
    @apply outline-none;
    @apply text-left;
  }

  .isAnimatable.EXPANDED {
    @apply ring;
  }
</style>
