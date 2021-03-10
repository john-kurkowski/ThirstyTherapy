<script>
  import Header from "./Header.svelte";
  import { twitchClientSecret } from "./stores";
</script>

<div class="px-1 py-1">
  <Header />

  <form class="text-xs" on:submit|preventDefault>
    <label class="flex">
      <span>Twitch Client Secret</span>
      <input
        bind:value={$twitchClientSecret}
        class="block ml-2 px-1 text-gray-800"
        type="password"
      />
    </label>
  </form>
</div>
