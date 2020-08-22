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

  export let url = "";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Tailwindcss />

<div class="px-4 py-2">
  <Router {url}>
    <Route path="/" component={SelectEpisode} />
    <Route path="/episode/:id" component={Episode} />
  </Router>
</div>
