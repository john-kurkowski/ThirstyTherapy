<script>
  import { RICH_OPTIONS } from "./UpcomingIngredients";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

  export let episode;
</script>

<div class={episode.fields.isPast ? "opacity-50" : ""}>
  {#if episode.fields.teaser_rich}
    {@html documentToHtmlString(episode.fields.teaser_rich, RICH_OPTIONS)}
  {/if}

  {#if episode.fields.agendaItems.length}
    <ul class="mb-4">
      {#each episode.fields.agendaItems as agendaItem}
        <li class="mb-4">
          <details open={!agendaItem.fields.isPast}>
            <summary>
              <h4 class="inline font-bold">
                {agendaItem.fields.title}
                {#if agendaItem.fields.badge}
                  <small class="badge">
                    {agendaItem.fields.badge}
                  </small>
                {/if}
              </h4>
            </summary>

            {#if agendaItem.fields.subtitle}
              <small class="my-1 block text-gray-500">
                {agendaItem.fields.subtitle}
              </small>
            {/if}

            <ul class="ml-4 list-outside list-disc">
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
  {:else if !episode.fields.isSkipped}
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
