<script context="module">
  export async function preload() {
    return this.redirect(301, "/");
  }
</script>

<svelte:head>
  <title>Livestream | Thirsty Therapy</title>
  <meta
    property="og:description"
    content="Welcome in, folks, to the socially safe cocktail bar! Watch on Twitch.
                  Follow along to put fresh spins on your favorite spirits. You are #worthyofgooddrinks."
  />
  <meta property="og:image" content="https://thirstytherapy.com/stream.png" />
  <meta property="og:title" content="Livestream | Thirsty Therapy" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://thirstytherapy.com/livestream" />
</svelte:head>
