<script lang="ts">
  /**
   * Global page settings, like the title, and surrounding template.
   */

  import Router from "./Router.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
  import { pageName } from "./stores";

  $: title = [$pageName, "Thirsty Therapy"].filter(Boolean).join(" - ");

  $: {
    document.title = title;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const isBroadcast = urlParams.get("isBroadcast");
</script>

<svelte:head>
  <title>{title}</title>
  <style>
    html,
    body {
      font-size: 32px;

      /* Hide scroll bar. */
      overflow-y: scroll;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
    }

    body::-webkit-scrollbar {
      /* WebKit */
      height: 0;
      width: 0;
    }

    .font-display {
      @apply text-lg;
    }
  </style>{#if isBroadcast}
    <style>
      html,
      body {
        background-color: rgba(0, 0, 0, 0) !important;
      }

      .broadcast-bubble:global {
        @apply bg-black;
        @apply bg-opacity-50;
        @apply px-1.5;
        @apply py-0.5;
        @apply rounded-md;
      }
    </style>
  {/if}
</svelte:head>

<Tailwindcss />

<Router />
