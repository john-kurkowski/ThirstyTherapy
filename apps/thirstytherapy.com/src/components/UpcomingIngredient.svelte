<script>
  import { RICH_OPTIONS } from "./UpcomingIngredients";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

  export let episode;
</script>

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
              <h4 class="font-bold inline">
                {agendaItem.fields.title}
                {#if agendaItem.fields.badge}
                  <small class="badge">
                    {agendaItem.fields.badge}
                  </small>
                {/if}
              </h4>
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
  .badge {
    @apply bg-pink-400;
    @apply inline-block;
    @apply ml-6;
    @apply text-gray-100;

    transform: rotate(-8deg);
  }

  summary {
    @apply cursor-pointer;
  }
</style>
