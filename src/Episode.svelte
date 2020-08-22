<script>
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
  .font-display {
    @apply text-3xl;
  }

  label {
    @apply ml-3;
  }

  label:hover {
    cursor: pointer;
  }

  input:checked + label {
    color: lightgray;
    text-decoration: line-through;
  }
</style>

<form>
  {#await fetchData then data}
    <ol>
      {#each data.fields.agendaItems as entry}
        <li tabindex="0">
          <div class="flex items-center">
            <input type="checkbox" />
            <label class="font-display">{entry.fields.title}</label>
          </div>

          {#if entry.fields.steps && entry.fields.steps.length}
            <ul class="ml-4">
              {#each entry.fields.steps as step}
                <li tabindex="0">
                  <input type="checkbox" />
                  <label>{step}</label>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ol>
  {/await}
</form>
