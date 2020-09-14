<script>
  import AgendaItem from "./AgendaItem.svelte";
  import Collapsible from "./Collapsible.svelte";
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

    const data = JSON.parse(
      JSON.stringify(entries.items.find((entry) => entry.sys.id === id))
    );
    data.fields.agendaItems = data.fields.agendaItems.map((item) =>
      entries.items.find((entry) => entry.sys.id === item.sys.id)
    );

    pageName.set(data.fields.title);

    return data;
  })();

  export let id;
  export const location = "";
</script>

<style>
  .COMPLETE {
    color: lightgray;
    text-decoration: line-through;
  }

  .item {
    @apply text-left;
    @apply truncate;
    @apply w-full;
  }

  .step.EXPANDED {
    @apply shadow-outline;
  }
</style>

<form on:submit={(event) => event.preventDefault()}>
  {#await fetchData then data}
    <ol>
      {#each data.fields.agendaItems as entry}
        <li>
          <AgendaItem let:state let:toggle>
            <button
              class={`font-display item ${state}`}
              class:step={!(entry.fields.steps || []).length}
              on:click={toggle}>
              {entry.fields.title}
            </button>

            {#if (entry.fields.steps || []).length}
              <Collapsible isExpanded={state === 'EXPANDED'}>
                <ul class="ml-4">
                  {#each entry.fields.steps as step}
                    <li>
                      <AgendaItem let:state let:toggle>
                        <button
                          class={`font-display item step ${state}`}
                          on:click={toggle}>
                          {step}
                        </button>
                      </AgendaItem>
                    </li>
                  {/each}
                </ul>
              </Collapsible>
            {/if}
          </AgendaItem>
        </li>
      {/each}
    </ol>
  {/await}
</form>
