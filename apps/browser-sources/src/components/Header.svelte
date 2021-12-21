<script lang="ts">
  import { Link } from "svelte-routing";
</script>

<header class="font-bold mb-4">
  <nav class="text-xs">
    <ul class="flex">
      <li>
        <Link to="/">
          <span class="hover:text-gray-500 hover:underline text-gray-200">
            Episodes
          </span>
        </Link>
      </li>
      <li>
        <Link to="/sitting">
          <span class="hover:text-gray-500 hover:underline ml-4 text-gray-200">
            Sitting
          </span>
        </Link>
      </li>
      <li>
        <Link to="/admin">
          <span class="hover:text-gray-500 hover:underline ml-4 text-gray-200">
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
