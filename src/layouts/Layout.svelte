<script>
  import Tailwindcss from './Tailwindcss.svelte';

  export let templateHtml, settings;
</script>

<Tailwindcss />

<svelte:head>
  <link rel="stylesheet" href="/style.css" />
</svelte:head>

{@html templateHtml}
