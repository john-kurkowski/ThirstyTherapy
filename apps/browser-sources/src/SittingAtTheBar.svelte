<script>
  import Loader from "./SittingAtTheBar/Loader.svelte";
  import { onMount } from "svelte";
  import { pageName } from "./stores";

  const COCKTAIL_ICONS = ["🍸", "🍹", "🥃"];

  const HOST = "https://api.twitch.tv/helix";
  const CLIENT_ID = "yrcihot9pxnayk7czuvy5jplj1r7yd";
  // TODO: redact from source control
  const ACCESS_TOKEN = "9zfbkvjl7occic43d0fpb9seopj0qr";

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "client-id": CLIENT_ID,
  };

  const fetchData = (async () => {
    const usernames = ["TargTarts", "KynderLyft", "luzeph"];
    const qs = `?login=${usernames.join("&login=")}`;
    const url = `${HOST}/users${qs}`;
    const resp = await fetch(url, { headers });
    const entries = await resp.json();
    return entries.data.sort(
      (o1, o2) =>
        usernames.indexOf(o1.display_name.toLowerCase()) -
        usernames.indexOf(o2.display_name.toLowerCase())
    );
  })();

  onMount(function () {
    pageName.set("Sitting at the bar");
  });

  export const location = "";
</script>

{#await fetchData}
  <div class="broadcast-bubble">
    <Loader />
  </div>
{:then data}
  <div class="broadcast-bubble inline-block">
    <h2 class="text-tn">Sitting at the bar</h2>

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
  </div>
{:catch error}
  <div class="broadcast-bubble inline-block text-tn">
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

<style>
  .text-tn {
    font-size: 0.5rem;
  }
</style>
