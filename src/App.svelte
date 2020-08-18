<script>
  import Episode from "./Episode.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
  import { Router, Route } from "svelte-routing";

  export let url = "";
</script>

<Tailwindcss />

<div class="px-4 py-2">
  <Router {url}>
    <Route path="/">
      <h1>Hello routing</h1>
    </Route>
    <Route path="/episode/:id" component={Episode} />
  </Router>
</div>
