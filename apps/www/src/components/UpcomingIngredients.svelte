<script>
  import { INLINES } from "@contentful/rich-text-types";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
  import { onMount } from "svelte";

  const DATETIME_FORMAT = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "America/Los_Angeles",
  });

  const RICH_OPTIONS = {
    renderNode: {
      [INLINES.HYPERLINK]: (node) =>
        `<a class="underline" href="${node.data.uri}">${node.content[0].value}</a>`,
    },
  };

  const SPACE_ID = "nc2tnr0lufn7";
  const ENVIRONMENT_ID = "master";
  const HOST = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;
  const ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

  const fetchData = async () => {
    const episodeTooOldToDisplayDate = new Date();
    episodeTooOldToDisplayDate.setDate(
      episodeTooOldToDisplayDate.getDate() - 7
    );

    const episodeIsPastDate = new Date();
    episodeIsPastDate.setDate(episodeIsPastDate.getDate() - 1);

    const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}&content_type=episode&fields.isReadyForViewers=true&fields.broadcast[gte]=${episodeTooOldToDisplayDate.toISOString()}&order=fields.broadcast`;
    const resp = await fetch(url);
    const entries = await resp.json();

    entries.items.forEach(function joinIncludesInMemory(episode, i) {
      const isEpisodeBeforeThis = entries.items
        .slice(0, i)
        .some((previousEpisode) => !previousEpisode.fields.isPast);

      episode.fields.isPast =
        new Date(episode.fields.broadcast) < episodeIsPastDate;

      episode.fields.agendaItems = (episode.fields.agendaItems || [])
        .map((item) => {
          const agendaItem = entries.includes.Entry.find(
            (entry) => entry.sys.id === item.sys.id
          );

          if (!agendaItem) {
            return null;
          }

          agendaItem.fields.isCollapsed =
            episode.fields.isPast || isEpisodeBeforeThis;

          return agendaItem;
        })
        .filter(Boolean);
    });

    return entries.items;
  };
  let fetchingData = Promise.resolve();

  onMount(() => {
    fetchingData = fetchData();
  });
</script>

{#await fetchingData then data}
  {#each data as episode}
    <div>
      <h3 class="mb-4">
        {#if episode.fields.isPast}
          <del class="opacity-50"
            >{DATETIME_FORMAT.format(new Date(episode.fields.broadcast))}</del
          >
          ✅
        {:else}{DATETIME_FORMAT.format(new Date(episode.fields.broadcast))}{/if}
      </h3>

      <div class={episode.fields.isPast ? "opacity-50" : ""}>
        {#if episode.fields.teaser_rich}
          <p class="mb-4">
            {@html documentToHtmlString(
              episode.fields.teaser_rich,
              RICH_OPTIONS
            )}
          </p>
        {/if}

        {#if episode.fields.agendaItems.length}
          <ul class="mb-4">
            {#each episode.fields.agendaItems as agendaItem}
              <li class="mb-4">
                <details open={!agendaItem.fields.isCollapsed}>
                  <summary>
                    <h4 class="font-bold inline">{agendaItem.fields.title}</h4>
                  </summary>

                  <ul class="list-disc list-outside ml-4">
                    {#if agendaItem.fields.steps && agendaItem.fields.steps.length}
                      {#each agendaItem.fields.steps as step}
                        <li>{step}</li>
                      {/each}
                    {/if}
                  </ul>
                </details>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="mb-4">TBD</p>
        {/if}
      </div>
    </div>
  {/each}
{/await}

<style>
  h3 {
    @apply text-xl;
    @apply font-display;
  }

  summary {
    @apply cursor-pointer;
  }
</style>
