<script>
  export let segment;
</script>

<style>
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

<nav class="mb-16">
  <ul class="flex justify-center mb-4">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li class="ml-12">
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li class="ml-12">
      <a
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="blog"
        rel="prefetch">
        blog
      </a>
    </li>
  </ul>

  <hr class="border-gray-800 border-1 mx-auto w-1/2" />
</nav>
