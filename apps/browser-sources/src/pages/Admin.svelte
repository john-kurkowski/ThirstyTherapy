<script lang="ts">
  /**
   * Admin-only settings page.
   */

  import Header from "../components/Header.svelte";
  import { cmsManagementAccessToken, twitchClientSecret } from "../stores";
</script>

<div class="px-1 py-1">
  <Header />

  <form class="text-xs" on:submit|preventDefault>
    <label class="flex">
      <span>CMS Management Token</span>
      <input
        bind:value={$cmsManagementAccessToken}
        class="ml-2 block px-1 text-gray-800"
        type="password"
      />
    </label>
    <label class="mt-2 flex">
      <span>Twitch Client Secret</span>
      <input
        bind:value={$twitchClientSecret}
        class="ml-2 block px-1 text-gray-800"
        type="password"
      />
    </label>
  </form>
</div>
