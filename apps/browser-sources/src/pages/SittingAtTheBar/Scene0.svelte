<script lang="ts">
  import InlineInput from "./InlineInput.svelte";
  import Loader from "./Loader.svelte";
  import type { TwitchUser } from "../../models";
  import { Link } from "svelte-routing";

  const COCKTAIL_ICONS = ["🍸", "🍹", "🥃"];

  const urlParams = new URLSearchParams(window.location.search);
  const isRight = urlParams.get("isRight");

  export let fetchData: Promise<TwitchUser[]>;
  export let handleNameEdit: (
    index: number,
    value: CustomEvent<string>
  ) => void = () => {
    // default to doing nothing
  };
  export let handleNameEditing: (
    index: number,
    value: CustomEvent<string>
  ) => void = () => {
    // default to doing nothing
  };
</script>

<div class="align-top inline-flex {isRight ? 'justify-end' : ''} w-full">
  <div class="broadcast-bubble">
    {#await fetchData}
      <Loader />
    {:then data}
      <h2 class="text-xs">Sitting at the bar</h2>

      {#if data.length}
        <ol class="flex mt-1">
          {#each data as entry, i}
            <li class="flex items-center text-sm {i > 0 && 'ml-4'}">
              <span aria-label="Drinking a cocktail" role="img">
                {COCKTAIL_ICONS[i % COCKTAIL_ICONS.length]}
              </span>

              <div class="flex flex-col items-center ml-1">
                <img
                  alt=""
                  class="rounded-full w-8"
                  src={entry.profile_image_url}
                />
                <InlineInput
                  inputClasses="text-gray-800"
                  on:blur={(v) => handleNameEdit(i, v)}
                  on:focus={(v) => handleNameEditing(i, v)}
                  value={entry.display_name}
                />
              </div>
            </li>
          {/each}
        </ol>
      {:else}
        <p class="animate-pulse text-xs">…</p>
      {/if}
    {:catch error}
      <p>
        No one at the bar! 😭 Are your
        <Link to="/admin">
          <span class="underline">admin settings</span>
        </Link>
        correct?
      </p>
      <code class="text-red-600">{error.message}</code>
    {/await}
  </div>
</div>
