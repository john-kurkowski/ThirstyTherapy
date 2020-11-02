<script lang="ts">
  import AgendaItem from "./AgendaItem.svelte";
  import Collapsible from "./Collapsible.svelte";
  import type {
    AgendaItemModel,
    ContentfulEntry,
    ContentfulResponse,
    EpisodeModel,
  } from "./models";
  import { pageName } from "./stores";

  const SPACE_ID = "nc2tnr0lufn7";
  const ENVIRONMENT_ID = "master";
  const HOST = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;

  // TODO: redact from source control
  const ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

  const fetchData = (async () => {
    const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}`;
    const resp = await fetch(url);
    const entries = (await resp.json()) as ContentfulResponse<AgendaItemModel | EpisodeModel>;

    const entry = entries.items.find((entry) => entry.sys.id === id);
    if (!entry) {
      throw new Error(`Not found: ${id}`);
    }

    const data: ContentfulEntry<EpisodeModel> = JSON.parse(
      JSON.stringify(entry)
    );

    const allAgendaItems = data.fields.agendaItems
      .filter((item): item is AgendaItemModel => !!item.steps)
      .map((item) =>
        entries.items.find((entry) => entry.sys.id === item.sys.id)
      )
      .filter((item): item is AgendaItemModel => !!item)

    data.fields.agendaItems = allAgendaItems
      .reduce<ContentfulEntry<EpisodeModel>[]>(
        (acc, entry) => (entry ? [...acc, entry] : acc),
        []
      );

    pageName.set(data.fields.title);

    return data;
  })();

  export let id: string;
  export const location = "";
</script>

<form
  class="flex flex-col justify-end min-h-screen"
  on:submit={(event) => event.preventDefault()}>
  {#await fetchData then data}
    <ol>
      {#each data.fields.agendaItems as entry}
        <li>
          <AgendaItem isAnimatable={!(entry.fields.steps || []).length}>
            <span slot="button">{entry.fields.title}</span>

            <div slot="rest" let:state>
              {#if (entry.fields.steps || []).length}
                <Collapsible isExpanded={state === 'EXPANDED'}>
                  <ul class="ml-4">
                    {#each entry.fields.steps as step}
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
