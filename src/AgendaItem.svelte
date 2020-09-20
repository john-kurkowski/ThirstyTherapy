<script>
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
  let button;
  let isTruncated;
  let state;

  $: if (button) {
    isTruncated = button.offsetWidth < button.scrollWidth;
  }

  function toggle() {
    if (state === "EXPANDED") {
      state = "COMPLETE";
    } else if (state === "COMPLETE") {
      state = "COLLAPSED";
    } else {
      state = "EXPANDED";
    }
  }
</script>

<style>
  .COMPLETE {
    color: lightgray;
    text-decoration: line-through;
  }

  .button {
    @apply outline-none;
    @apply text-left;
    @apply whitespace-no-wrap;
  }

  .button:not(.EXPANDED) {
    @apply truncate;
    @apply w-full;
  }

  .isAnimatable.EXPANDED {
    @apply shadow-outline;
  }

  .isAnimatable.isTruncated.EXPANDED {
    animation: backAndForth 10s linear infinite;
  }

  @keyframes backAndForth {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(0);
    }

    45% {
      transform: translateX(calc(-100% + 80vw));
    }

    55% {
      transform: translateX(calc(-100% + 80vw));
    }

    90% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(0);
    }
  }
</style>

<button
  bind:this={button}
  class={`button font-display ${state}`}
  class:isAnimatable
  class:isTruncated
  on:click={toggle}>
  <slot name="button" />
</button>

<slot name="rest" {state} />

<slot />
