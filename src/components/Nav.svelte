<script>
  export let segment;
</script>

<style>
  .tab-title {
    position: relative;
    display: inline-block;
  }

  [aria-current] .tab-title::after {
    @apply bg-purple-600;
  }

  [aria-current] .tab-title::after,
  a:hover .tab-title::after {
    bottom: -4px;
    content: "";
    display: block;
    height: 4px;
    position: absolute;
    width: 100%;
  }

  a:hover .tab-title::after {
    @apply bg-gray-300;
  }
</style>

<nav class="mb-12">
  <ul class="flex justify-center mb-4">
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        <span class="tab-title">home</span>
      </a>
    </li>
    <li class="ml-6">
      <a
        aria-current={segment === 'classes' ? 'page' : undefined}
        href="classes">
        <span class="tab-title">classes</span>
      </a>
    </li>

    <li class="ml-6">
      <a
        aria-current={segment === 'livestream' ? 'page' : undefined}
        href="livestream"
        rel="prefetch">
        <span class="tab-title">livestream</span>

        <span class="badge ml-1">next:
          <time datetime="2020-12-31T:18:00:00.000Z-08:00">Dec 31</time>
        </span>
      </a>
    </li>
  </ul>

  <hr
    aria-hidden="true"
    class="border-purple-600 border-1 md:w-1/3 mx-auto w-5/6" />
</nav>
