<script>
  import Header from "./Header.svelte";
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
  const ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

  const fetchData = (async () => {
    const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}&content_type=episode&order=-fields.broadcast`;
    const resp = await fetch(url);
    const entries = await resp.json();
    return entries.items;
  })();

  onMount(function () {
    pageName.set("Episodes");
  });

  export const location = "";
</script>

{#await fetchData then data}
  <div class="px-1 py-1">
    <Header />

    <table class="text-xs">
      <thead>
        <tr>
          <th class="pb-2">Date</th>
          <th class="pb-1 pl-3">Title</th>
        </tr>
      </thead>
      <tbody>
        {#each data as entry}
          <tr>
            <td class="pb-1">
              <time datetime={entry.fields.broadcast}>
                {DATETIME_FORMAT.format(new Date(entry.fields.broadcast))}
              </time>
            </td>
            <td class="pb-2 pl-3">
              <Link to={`/episode/${entry.sys.id}${qs}`}>
                <span class="hover:text-gray-500 text-gray-200 underline">
                  {entry.fields.title}
                </span>
              </Link>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/await}
