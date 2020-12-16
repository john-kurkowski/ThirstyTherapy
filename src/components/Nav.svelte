<script>
  export let segment;
</script>

<style>
  :global(.badge) {
    @apply align-middle;
    @apply bg-pink-600;
    @apply px-2;
    @apply text-sm;
    @apply rounded-lg;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    @apply bg-purple-600;

    position: absolute;
    content: "";
    width: 100%;
    height: 4px;
    display: block;
    bottom: -4px;
  }
</style>

<nav class="mb-12">
  <ul class="flex justify-center mb-4">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li class="ml-6">
      <a
        aria-current={segment === 'classes' ? 'page' : undefined}
        href="classes">
        classes
      </a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li class="ml-6">
      <a
        aria-current={segment === 'livestream' ? 'page' : undefined}
        href="livestream"
        rel="prefetch">
        livestream
      </a>

      <span class="badge ml-1">next:
        <time datetime="2020-12-19T:18:00:00.000Z-08:00">Dec 19</time>
      </span>
    </li>
  </ul>

  <hr class="border-purple-600 border-1 mx-auto w-1/3" />
</nav>
