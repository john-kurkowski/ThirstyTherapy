<script lang="ts">
  import Header from "./Header.svelte";
  import { cmsManagementAccessToken, twitchClientSecret } from "./stores";
</script>

<div class="px-1 py-1">
  <Header />

  <form class="text-xs" on:submit|preventDefault>
    <label class="flex">
      <span>CMS Management Token</span>
      <input
        bind:value={$cmsManagementAccessToken}
        class="block ml-2 px-1 text-gray-800"
        type="password"
      />
    </label>
    <label class="flex mt-2">
      <span>Twitch Client Secret</span>
      <input
        bind:value={$twitchClientSecret}
        class="block ml-2 px-1 text-gray-800"
        type="password"
      />
    </label>
  </form>
</div>
