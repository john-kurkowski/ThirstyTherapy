<script>
  import { DATETIME_FORMAT, RICH_OPTIONS } from "./UpcomingIngredients";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

  export let episode;
</script>

<h3 class="mb-4">
  {#if episode.fields.isPast}
    <del class="opacity-50"
      >{DATETIME_FORMAT.format(new Date(episode.fields.broadcast))} 6-9pm PDT</del
    >
    ✅
  {:else}{DATETIME_FORMAT.format(new Date(episode.fields.broadcast))} 6-9pm PDT{/if}
</h3>

<div class={episode.fields.isPast ? "opacity-50" : ""}>
  {#if episode.fields.teaser_rich}
    <p class="mb-4">
      {@html documentToHtmlString(episode.fields.teaser_rich, RICH_OPTIONS)}
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

<style>
  h3 {
    @apply text-xl;
    @apply font-display;
  }

  summary {
    @apply cursor-pointer;
  }
</style>
