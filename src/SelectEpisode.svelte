<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import { pageName } from "./stores";

  const SPACE_ID = "nc2tnr0lufn7";
  const ENVIRONMENT_ID = "master";
  const HOST = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;

  // TODO: redact from source control
  const ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

  const fetchData = (async () => {
    const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}`;
    const resp = await fetch(url);
    const entries = await resp.json();

    return entries.items.filter(
      (entry) => entry.sys.contentType.sys.id === "episode"
    );
  })();

  onMount(function () {
    pageName.set("Select episode");
  });

  export const location = "";
</script>

<style>
  .font-display {
    @apply text-3xl;
  }
</style>

{#await fetchData then data}
  <label class="font-display">Select episode</label>
  <ol class="list-disc list-inside">
    {#each data as entry}
      <li>
        <Link to={`/episode/${entry.sys.id}`}>
          <span class="hover:text-gray-500 text-gray-200 underline">
            {entry.fields.title}
          </span>
        </Link>
      </li>
    {/each}
  </ol>
{/await}
