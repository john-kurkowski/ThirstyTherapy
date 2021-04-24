<script>
  import Scene0 from "./SittingAtTheBar/Scene0.svelte";
  import { onMount } from "svelte";
  import { pageName } from "./stores";

  const NUM_SCENES = 2;

  const urlParams = new URLSearchParams(window.location.search);
  let isVisible = true;
  let sceneNumber = 0;
  let timeoutIsVisible = 0;

  setTimeout(timeShow, timeShowMs());

  onMount(function () {
    pageName.set("Sitting at the bar");
  });

  function timeShowMs() {
    return isVisible
      ? urlParams.get("on") || 30 * 1000
      : urlParams.get("off") || 60 * 1000;
  }

  function timeShow() {
    clearTimeout(timeoutIsVisible);

    isVisible = !isVisible;
    if (!isVisible) {
      sceneNumber = (sceneNumber + 1) % NUM_SCENES;
    }
    timeoutIsVisible = setTimeout(timeShow, timeShowMs());
  }

  export const location = "";
</script>

<div
  class="align-top fadeable inline-flex justify-end w-full {isVisible
    ? 'is-visible'
    : 'is-not-visible'}"
>
  {#if sceneNumber == 0}
    <Scene0 />
  {/if}
</div>

<style>
  .fadeable {
    @apply transition-opacity;
    transition-duration: 2000ms;
  }

  .is-visible {
    @apply opacity-100;
  }

  .is-not-visible {
    @apply opacity-0;
  }
</style>
