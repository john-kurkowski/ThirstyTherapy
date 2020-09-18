<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import { pageName } from "./stores";

  const urlParams = new window.URLSearchParams(window.location.search);
  const qs = urlParams.toString() ? `?${urlParams.toString()}` : "";

  const DATETIME_FORMAT = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  });

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
    pageName.set("Episodes");
  });

  export const location = "";
</script>

<style>
  .font-display {
    @apply text-3xl;
  }
</style>

{#await fetchData then data}
  <label class="font-display">Episodes</label>
  <table class="mt-4">
    <thead>
      <tr>
        <th class="py-2">Date</th>
        <th class="pl-4 py-2">Title</th>
        <th class="pl-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data as entry}
        <tr>
          <td class="py-2">
            <time datetime={entry.fields.broadcast}>
              {DATETIME_FORMAT.format(new Date(entry.fields.broadcast))}
            </time>
          </td>
          <td class="pl-4 py-2">{entry.fields.title}</td>
          <td class="pl-4 py-2">
            <Link to={`/episode/${entry.sys.id}${qs}`}>
              <span class="hover:text-gray-500 text-gray-200 underline">
                View
              </span>
            </Link>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/await}
