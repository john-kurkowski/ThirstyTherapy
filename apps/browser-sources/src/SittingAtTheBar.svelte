<script>
  import Scene0 from "./SittingAtTheBar/Scene0.svelte";
  import Scene1 from "./SittingAtTheBar/Scene1.svelte";
  import { fade } from "svelte/transition";
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

<div class="align-top inline-flex justify-end w-full">
  {#if isVisible}
    {#if sceneNumber === 0}
      <div transition:fade={{ duration: 2000 }}>
        <Scene0 />
      </div>
    {:else if sceneNumber === 1}
      <div transition:fade={{ duration: 2000 }}>
        <Scene1 />
      </div>
    {/if}
  {/if}
</div>
