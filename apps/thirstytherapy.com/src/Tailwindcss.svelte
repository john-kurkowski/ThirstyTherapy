<!--
  Initialize TailwindCSS. Declare other global styles.
-->

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(.badge) {
    @apply mx-0.5;
    @apply px-2;
    @apply rounded-lg;
    @apply text-sm;
  }
</style>
