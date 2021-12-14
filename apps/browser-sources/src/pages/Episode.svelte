<script lang="ts">
  import AgendaItem from "../components/AgendaItem.svelte";
  import Collapsible from "../components/Collapsible.svelte";
  import type {
    AgendaItem as AgendaItemModel,
    CmsResult,
    Episode,
  } from "../models";
  import { fetchCmsPath } from "../models";
  import { pageName } from "../stores";

  const urlParams = new URLSearchParams(window.location.search);
  const isRight = urlParams.get("isRight");

  const fetchData = (async () => {
    const entries: CmsResult = await (await fetchCmsPath("/entries")).json();

    const episode: Episode = JSON.parse(
      JSON.stringify(entries.items.find((entry) => entry.sys.id === id))
    );

    const data: { agendaItems: AgendaItemModel[]; episode: Episode } = {
      agendaItems: (episode.fields.agendaItems || []).map((item) => {
        // The fetch requests all items. It will be found.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return entries.items.find(
          (entry) => entry.sys.id === item.sys.id
        )! as AgendaItemModel;
      }),

      episode,
    };

    pageName.set(episode.fields.displayTitle || episode.fields.title);

    return data;
  })();

  export let id: string;
  export const location = "";
</script>

<form
  class="flex flex-col justify-end max-w-sm min-h-screen"
  on:submit={(event) => event.preventDefault()}
>
  {#await fetchData then data}
    <ol class={isRight ? "self-end" : "self-start"}>
      {#each data.agendaItems as entry}
        <li class="agenda-item broadcast-bubble">
          <AgendaItem isAnimatable={!(entry.fields.steps || []).length}>
            <span slot="button">
              {entry.fields.displayTitle || entry.fields.title}
            </span>

            <div slot="rest" let:state>
              {#if (entry.fields.steps || []).length}
                <Collapsible isExpanded={state === "EXPANDED"}>
                  {#if entry.fields.subtitle}
                    <small class="block my-1 text-gray-500">
                      {entry.fields.subtitle}
                    </small>
                  {/if}

                  <ul class="ml-4">
                    {#each entry.fields.steps || [] as step}
                      <li>
                        <AgendaItem isAnimatable={true}>
                          <span slot="button">{step}</span>
                        </AgendaItem>
                      </li>
                    {/each}
                  </ul>
                </Collapsible>
              {/if}
            </div>
          </AgendaItem>
        </li>
      {/each}
    </ol>
  {/await}
</form>

<style>
  .agenda-item + .agenda-item {
    @apply mt-1;
  }
</style>
