<script>
  import Episode from "./Episode.svelte";
  import SelectEpisode from "./SelectEpisode.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
  import { Router, Route } from "svelte-routing";
  import { pageName } from "./stores";

  $: title = [$pageName, "Thirsty Therapy"].filter(Boolean).join(" - ");

  $: {
    document.title = title;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const isBroadcast = urlParams.get("isBroadcast");

  export let url = "";
</script>

<svelte:head>
  <title>{title}</title>

  <style>
    html,
    body {
      @apply overflow-x-hidden;
      @apply whitespace-no-wrap;

      font-size: 32px;
    }

    .font-display {
      @apply text-3xl;
    }
  </style>
  {#if isBroadcast}
    <style>
      html,
      body {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    </style>
  {/if}
</svelte:head>

<Tailwindcss />

<div class="px-4 py-2">
  <Router {url}>
    <Route path="/" component={SelectEpisode} />
    <Route path="/episode/:id" component={Episode} />
  </Router>
</div>
