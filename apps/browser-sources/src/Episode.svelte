<script>
  import AgendaItem from "./AgendaItem.svelte";
  import Collapsible from "./Collapsible.svelte";
  import { pageName } from "./stores";

  const SPACE_ID = "nc2tnr0lufn7";
  const ENVIRONMENT_ID = "master";
  const HOST = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;
  const ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

  const urlParams = new URLSearchParams(window.location.search);
  const isRight = urlParams.get("isRight");

  const fetchData = (async () => {
    const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}`;
    const resp = await fetch(url);
    const entries = await resp.json();

    const data = JSON.parse(
      JSON.stringify(entries.items.find((entry) => entry.sys.id === id))
    );
    data.fields.agendaItems = (data.fields.agendaItems || []).map((item) =>
      entries.items.find((entry) => entry.sys.id === item.sys.id)
    );

    pageName.set(data.fields.displayTitle || data.fields.title);

    return data;
  })();

  export let id;
  export const location = "";
</script>

<form
  class="flex flex-col justify-end max-w-sm min-h-screen"
  on:submit={(event) => event.preventDefault()}
>
  {#await fetchData then data}
    <ol class={isRight ? "self-end" : "self-start"}>
      {#each data.fields.agendaItems as entry}
        <li class="agenda-item broadcast-bubble">
          <AgendaItem isAnimatable={!(entry.fields.steps || []).length}>
            <span slot="button">
              {entry.fields.displayTitle || entry.fields.title}
            </span>

            <div slot="rest" let:state>
              {#if (entry.fields.steps || []).length}
                <Collapsible isExpanded={state === "EXPANDED"}>
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

<style>
  .agenda-item + .agenda-item {
    @apply mt-1;
  }
</style>
