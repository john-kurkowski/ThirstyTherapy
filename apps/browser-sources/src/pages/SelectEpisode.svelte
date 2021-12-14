<script lang="ts">
  import Header from "../components/Header.svelte";
  import { Episode, fetchCmsPath } from "../models";
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import { pageName } from "../stores";

  const DATETIME_FORMAT = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  });

  const urlParams = new window.URLSearchParams(window.location.search);
  const qs = urlParams.toString() ? `?${urlParams.toString()}` : "";

  const fetchData: Promise<Episode[]> = (async () => {
    const resp = await fetchCmsPath("/entries", {
      content_type: "episode",
      order: "-fields.broadcast",
    });
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
