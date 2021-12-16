<script lang="ts">
  import Admin from "./pages/Admin.svelte";
  import Episode from "./pages/Episode.svelte";
  import SelectEpisode from "./pages/SelectEpisode.svelte";
  import SittingAtTheBar from "./pages/SittingAtTheBar.svelte";
  import { Router, Route } from "svelte-routing";

  export let url = "";
</script>

<Router {url}>
  <Route path="/" component={SelectEpisode} />
  <Route path="/admin" component={Admin} />
  <Route path="/episode/:id" component={Episode} />
  <Route path="/sitting" component={SittingAtTheBar} />
</Router>
