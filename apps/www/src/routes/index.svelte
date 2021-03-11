<script>
  import UpcomingIngredients from "../components/UpcomingIngredients.svelte";
</script>

<svelte:head>
  <title>Thirsty Therapy</title>
  <meta
    property="og:description"
    content="You are worthy of good drinks. Virtual private group classes. Watch on Twitch."
  />
  <meta property="og:image" content="https://thirstytherapy.com/logo.png" />
  <meta property="og:title" content="Thirsty Therapy" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://thirstytherapy.com/" />
</svelte:head>

<p class="mb-10 text-xl">You are worthy of good drinks.</p>

<div class="text-left">
  <div class="max-w-2xl mx-auto">
    <p class="mb-6">
      Welcome in, folks, to the socially safe cocktail bar! Sit at the bar with
      Billy the master bartender and alchemist, and his apprentice John. Follow
      along to put fresh spins on your favorite spirits. We stream every other
      Saturday, 6-9pm Pacific, <a
        class="underline"
        href="https://twitch.tv/thirstytherapy">on Twitch</a
      >.
    </p>

    <p class="mb-6 text-center text-lg">
      <a class="align-middle button" href="https://twitch.tv/thirstytherapy">
        Watch on Twitch
        <img
          class="inline-block ml-2"
          src="./iconmonstr-twitch-1.svg"
          alt="Twitch logo"
        />
      </a>
    </p>
  </div>

  <div class="cards justify-between max-w-2xl mb-6 mx-auto xl:max-w-5xl">
    <div class="card mb-6">
      <header class="mb-4">
        <h2>Upcoming Ingredients</h2>
      </header>

      <UpcomingIngredients />
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2 class="mb-2">About Billy</h2>
        <img
          alt="Billy the bartender, smiling"
          class="w-full"
          src="./billy.png"
        />
      </header>
      <p class="mb-4">
        Billy is a professional bartender in Portland, OR, USA. He's obsessed
        with hospitality and alchemy, applying culinary techniques to his drinks
        and making his own bitters.
      </p>
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2 class="mb-2">About John</h2>
        <img alt="John the barback, thinking" class="w-full" src="./john.png" />
      </header>
      <p class="mb-4">
        John is Billy's long time guest sitting at the bar. One day John asked,
        how to take his home bartending to the next level? Billy told him, put
        on the apron, get behind the bar.
      </p>
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2 class="mb-2">More</h2>
        <img
          alt="Screenshot of Billy and John bartending remotely during a 2020 livestream"
          src="./stream.png"
        />
      </header>

      <ul class="list-disc list-inside mb-4">
        <li>
          <a
            class="underline"
            href="https://www.youtube.com/channel/UC_t71znatwtjEPL3i1MiutA"
          >
            YouTube archive
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>

<style lang="postcss">
  .button {
    @apply bg-pink-100;
    @apply border-2;
    @apply border-gray-900;
    @apply px-3;
    @apply py-1.5;
    @apply rounded-md;
    @apply text-gray-900;
  }

  .button:hover {
    @apply bg-purple-600;
    @apply text-purple-100;
  }

  .cards {
    @apply flex-wrap;
    @apply flex;
    @apply items-start;
    @apply justify-between;
  }

  .card {
    @apply bg-pink-100;
    @apply m-2;
    @apply px-4;
    @apply py-2;
    @apply rounded-lg;
    @apply text-gray-700;

    width: theme("width.80");
  }

  .card header {
    @apply mx-auto;
    @apply text-center;
  }

  .card h2 {
    @apply text-2xl;
    @apply font-display;
  }
</style>
