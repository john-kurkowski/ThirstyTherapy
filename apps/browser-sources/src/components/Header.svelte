<script lang="ts">
  /**
   * The navigation of the app.
   *
   * @component Header
   */

  import { Link } from "svelte-routing";
</script>

<header class="mb-4 font-bold">
  <nav class="text-xs">
    <ul class="flex">
      <li>
        <Link to="/">
          <span class="text-gray-200 hover:text-gray-500 hover:underline">
            Episodes
          </span>
        </Link>
      </li>
      <li>
        <Link to="/sitting">
          <span class="ml-4 text-gray-200 hover:text-gray-500 hover:underline">
            Sitting
          </span>
        </Link>
      </li>
      <li>
        <Link to="/admin">
          <span class="ml-4 text-gray-200 hover:text-gray-500 hover:underline">
            Admin
          </span>
        </Link>
      </li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  :global([aria-current="page"] > *) {
    @apply underline;
  }
</style>
