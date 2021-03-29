<script>
  import Loader from "./SittingAtTheBar/Loader.svelte";
  import { Link } from "svelte-routing";
  import { TWITCH_CLIENT_ID, pageName, twitchAccessToken } from "./stores";
  import { onMount } from "svelte";

  const COCKTAIL_ICONS = ["🍸", "🍹", "🥃"];

  const HOST = "https://api.twitch.tv/helix";

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

      const urlParams = new URLSearchParams(window.location.search);
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

  onMount(function () {
    pageName.set("Sitting at the bar");
  });

  export const location = "";
</script>

<div class="align-top inline-flex justify-end w-full">
  {#await fetchData}
    <div class="broadcast-bubble">
      <Loader />
    </div>
  {:then data}
    <div class="broadcast-bubble">
      <h2 class="text-tn">Sitting at the bar</h2>

      {#if data.length}
        <ol class="flex mt-1">
          {#each data as entry, i}
            <li class="flex items-center text-xs {i > 0 && 'ml-4'}">
              <span aria-label="Drinking a cocktail" role="img">
                {COCKTAIL_ICONS[i % COCKTAIL_ICONS.length]}
              </span>

              <div class="flex flex-col items-center ml-1">
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- The text below it is sufficient. -->
                <img class="rounded-full w-4" src={entry.profile_image_url} />
                <p>{entry.display_name}</p>
              </div>
            </li>
          {/each}
        </ol>
      {:else}
        <p class="animate-pulse text-tn">…</p>
      {/if}
    </div>
  {:catch error}
    <div class="broadcast-bubble text-tn">
      <p>
        No one at the bar! 😭 Are your
        <Link to="/admin">
          <span class="underline">admin settings</span>
        </Link>
        correct?
      </p>
      <code class="text-red-600">{error.message}</code>
    </div>
  {/await}
</div>

<style>
  .text-tn {
    font-size: 0.5rem;
  }
</style>
