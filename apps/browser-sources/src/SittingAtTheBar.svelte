<script>
  import Scene0 from "./SittingAtTheBar/Scene0.svelte";
  import Scene1 from "./SittingAtTheBar/Scene1.svelte";
  import Scene2 from "./SittingAtTheBar/Scene2.svelte";
  import { TWITCH_CLIENT_ID, twitchAccessToken } from "./stores";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { pageName } from "./stores";

  const FADE_DURATION = 2000;
  const HOST = "https://api.twitch.tv/helix";

  const urlParams = new URLSearchParams(window.location.search);
  let isVisible = true;
  let sceneNumber = 0;

  let scenes = urlParams.getAll("scene").length
    ? urlParams.getAll("scene")
    : ["0", "1", "0", "2"];

  let usernames = (urlParams.getAll("username").length
    ? urlParams.getAll("username")
    : ["ThirstyTherapy", "BluuNukem", "toughgum"]
  ).map((username) => username.toLowerCase());

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
      ? urlParams.get("on") || 10 * 1000
      : Math.max(urlParams.get("off") || 3 * 1000, FADE_DURATION + 500);
  }

  function timeShow() {
    if (scenes.length > 1) {
      isVisible = !isVisible;
      if (!isVisible) {
        sceneNumber = (sceneNumber + 1) % scenes.length;
      }
    }

    setTimeout(timeShow, timeShowMs());
  }

  export const location = "";
</script>

{#if isVisible}
  {#if scenes[sceneNumber] === "0"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene0 {fetchData} />
    </div>
  {:else if scenes[sceneNumber] === "1"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene1 />
    </div>
  {:else if scenes[sceneNumber] === "2"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene2 />
    </div>
  {/if}
{/if}
