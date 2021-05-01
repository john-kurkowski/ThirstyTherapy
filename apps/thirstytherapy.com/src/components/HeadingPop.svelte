<h2 class="pop">
  <slot />
</h2>

<h2 class="block invisible mb-2">
  <slot />
</h2>

<style>
  .pop {
    @apply -left-6;
    @apply -top-6;
    @apply absolute;
    @apply font-display;
    @apply px-4;
    @apply py-1;
    @apply text-2xl;
    @apply w-80;

    z-index: 0;
  }

  .pop::before {
    @apply absolute;
    @apply bg-gray-100;
    @apply border-gray-800;
    @apply h-full;
    @apply left-0;
    @apply top-0;
    @apply w-80;

    border-width: 3px;
    content: "";
    transform: skew(-10deg);
    z-index: -1;
  }
</style>
