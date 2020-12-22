<style>
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
    @apply flex;
    @apply flex-wrap;
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

  .card h2,
  .card h3 {
    @apply font-bold;
    @apply font-display;
  }

  .card h2 {
    @apply text-2xl;
  }

  .card h3 {
    @apply text-xl;
  }
</style>

<svelte:head>
  <title>Livestream | Thirsty Therapy</title>
  <meta
    property="og:description"
    content="Welcome in, folks, to the socially safe cocktail bar! Watch on Twitch.
                  Follow along to put fresh spins on your favorite spirits. You are #worthyofgooddrinks." />
  <meta property="og:image" content="https://thirstytherapy.com/stream.png" />
  <meta property="og:title" content="Livestream | Thirsty Therapy" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://thirstytherapy.com/livestream" />
</svelte:head>

<div class="text-left">
  <div class="max-w-2xl mx-auto">
    <blockquote class="border-l-2 border-purple-600 italic mb-6 pl-2">
      Welcome in, folks, to the socially safe cocktail bar! Approved for 2020.
      Sit at the bar with Billy the master bartender and alchemist, and his
      apprentice John. Follow along to put fresh spins on your favorite spirits.
      You are
      <span>#worthyofgooddrinks</span>.
    </blockquote>

    <p class="mb-6 text-center text-lg">
      <a class="align-middle button" href="https://twitch.tv/thirstytherapy">
        Watch on Twitch
        <img
          class="inline-block ml-2"
          src="./iconmonstr-twitch-1.svg"
          alt="Twitch logo" />
      </a>
    </p>

    <p class="mb-6">
      We stream every other Saturday, 6-8pm Pacific,
      <a class="underline" href="https://twitch.tv/thirstytherapy">on Twitch</a>.
    </p>

    <p class="mb-6">
      <s>Join us
        <time datetime="2020-12-19T:18:00:00.000Z-08:00">December 19, 2020</time>,
        for our last stream of the year!</s>
      By popular demand, join us
      <time class="badge" datetime="2020-12-31T:18:00:00.000Z-08:00">December
        31, 2020</time>for our last stream of the year!
    </p>
  </div>

  <div class="cards justify-between max-w-2xl mb-6 mx-auto xl:max-w-5xl">
    <div class="card mb-6">
      <header class="mb-4">
        <h2>Upcoming Ingredients</h2>
      </header>

      <h3 class="mb-4">
        <time datetime="2020-12-19T:18:00:00.000Z-08:00">Dec 19, 2020, 6pm PST</time>
        ✅
      </h3>

      <ul class="list-disc list-inside mb-4">
        <li class="font-bold">Manhattan</li>
        <li class="font-bold">Vieux Carré</li>
      </ul>

      <h3 class="mb-4">
        <time datetime="2020-12-31T:18:00:00.000Z-08:00">Dec 31, 2020, 6pm PST</time>
        ‼️
      </h3>

      <p class="mb-4">NYE Special</p>

      <!-- TODO: flex and remove bullets when list is not flat, i.e. when there are nested lists. -->
      <ul class="list-disc list-inside mb-4">
        <li class="font-bold">Moroccan Coffee</li>
        <li class="font-bold">Something for the kids</li>
        <li class="font-bold">French 75</li>
      </ul>

      <h3 class="mb-4"><s>Jan 2, 2021</s> Happy New Year!</h3>

      <h3 class="mb-4">Jan xx, 2021</h3>

      <ul class="list-disc list-inside mb-4">
        <li class="font-bold">Quick Egg Nog</li>
        <li class="font-bold">Tom & Jerry</li>
      </ul>
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2 class="mb-2">About Billy</h2>
        <img
          alt="Billy the bartender, smiling"
          class="w-full"
          src="./billy.png" />
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
          src="./stream.png" />
      </header>

      <ul class="list-disc list-inside mb-4">
        <li>
          <a
            class="underline"
            href="https://www.youtube.com/channel/UC_t71znatwtjEPL3i1MiutA">
            YouTube archive
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
