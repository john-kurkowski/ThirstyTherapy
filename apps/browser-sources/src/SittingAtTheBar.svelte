<script>
  import Scene0 from "./SittingAtTheBar/Scene0.svelte";
  import Scene1 from "./SittingAtTheBar/Scene1.svelte";
  import { TWITCH_CLIENT_ID, twitchAccessToken } from "./stores";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { pageName } from "./stores";

  const HOST = "https://api.twitch.tv/helix";
  const NUM_SCENES = 2;

  const urlParams = new URLSearchParams(window.location.search);
  let isVisible = true;
  let sceneNumber = 0;
  let timeoutIsVisible = 0;

  let fetchData;
  $: if (!$twitchAccessToken) {
    fetchData = new Promise(() => {});
  } else if ($twitchAccessToken instanceof Error) {
    fetchData = Promise.reject($twitchAccessToken);
  } else {
    fetchData = (async () => {
      const headers = {
        Authorization: `Bearer ${$twitchAccessToken}`,
        "client-id": TWITCH_CLIENT_ID,
      };

      const usernames = urlParams
        .getAll("username")
        .map((username) => username.toLowerCase());

      if (!usernames.length) {
        return [];
      }

      const qs = `?login=${usernames.join("&login=")}`;
      const url = `${HOST}/users${qs}`;
      const resp = await fetch(url, { headers });
      const entries = await resp.json();

      if (!resp.ok) {
        throw new Error(entries.message);
      }

      return entries.data.sort(
        (o1, o2) =>
          usernames.indexOf(o1.display_name.toLowerCase()) -
          usernames.indexOf(o2.display_name.toLowerCase())
      );
    })();
  }

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

{#if isVisible}
  {#if sceneNumber === 0}
    <div transition:fade={{ duration: 2000 }}>
      <Scene0 {fetchData} />
    </div>
  {:else if sceneNumber === 1}
    <div transition:fade={{ duration: 2000 }}>
      <Scene1 />
    </div>
  {/if}
{/if}
