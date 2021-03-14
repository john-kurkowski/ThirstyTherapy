<script>
  import UpcomingIngredient from "../components/UpcomingIngredient.svelte";
  import { DATETIME_FORMAT } from "../components/UpcomingIngredients";
  import { fetchData } from "../components/UpcomingIngredients";
  import { onMount } from "svelte";

  let fetchingData = Promise.resolve();

  onMount(() => {
    fetchingData = fetchData();
  });
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

<div class="max-w-2xl mx-auto text-left xl:max-w-5xl">
  <div class="cards mb-6 mx-auto">
    <div class="card mb-6">
      <header class="mb-2">
        <h2 class="mb-2">Cocktail Distance Learning</h2>
        <a
          class="button inline-flex justify-center my-1 text-center"
          href="mailto:ThirstyTherapy@gmail.com"
        >
          Ask about a class
          <img
            alt="Email"
            class="inline-block ml-2"
            src="./iconmonstr-email-3.svg"
          />
        </a>
      </header>

      <p class="mb-4">
        Welcome in, folks, to the socially safe cocktail bar! A master bartender
        leads your team or private Zoom. He handpicks ingredients and tools for
        your event. Alcholic or non, home or office, you are worthy of good
        drinks.
      </p>

      <img
        alt="A martini glass cocktail with 2 stacks of cocktail and culinary books."
        class="h-44 object-cover object-top mt-auto w-full"
        src="./books.jpeg"
      />
    </div>

    <div class="card mb-6">
      <header class="mb-2">
        <h2 class="mb-2">Livestream</h2>
        <a
          class="button inline-flex justify-center my-1 text-center"
          href="https://twitch.tv/thirstytherapy"
        >
          Watch on Twitch
          <img
            class="inline-block ml-2"
            src="./iconmonstr-twitch-1.svg"
            alt="Twitch logo"
          />
        </a>
      </header>
      <p class="mb-4">
        Join free livestreams every other Saturday, 6-9pm PDT, <a
          class="underline"
          href="https://www.twitch.tv/thirstytherapy">on Twitch</a
        >. Follow along to put fresh spins on your favorite spirits. Ask
        anything. Like for substitutions. Or what to do with that bottle at the
        back of the cabinet.
      </p>
      <img
        alt="Screenshot of Billy and John livestream bartending, on Twitch"
        class="h-44 object-cover mt-auto w-full"
        src="./stream.png"
      />
    </div>
  </div>

  <hr data-hr-content="Upcoming" />

  <div class="cards mb-6 mx-auto">
    {#await fetchingData then data}
      {#each data as episode}
        <div class="card mb-6">
          <header class="mb-2">
            <h2 class="mb-2">
              {#if episode.fields.isPast}
                <del class="opacity-50"
                  >{DATETIME_FORMAT.format(new Date(episode.fields.broadcast))} 6-9pm
                  PDT</del
                >
                ✅
              {:else}
                {DATETIME_FORMAT.format(new Date(episode.fields.broadcast))} 6-9pm
                PDT
              {/if}
            </h2>
          </header>

          <UpcomingIngredient {episode} />
        </div>
      {/each}
    {/await}
  </div>

  <hr data-hr-content="Team" />

  <div class="cards mb-6 mx-auto">
    <div class="card mb-6">
      <header class="mb-2">
        <h2 class="mb-2">About Billy</h2>
        <img
          alt="Billy the bartender, smiling"
          class="h-44 object-cover w-full"
          src="./billy.png"
        />
      </header>
      <p class="mb-4">
        Billy Noble is a professional bartender in Portland, OR, USA. He's
        obsessed with hospitality and alchemy. While he appreciates a classic
        cocktail, he's pushing drinking forward, using new culinary techniques
        and seasonal, homegrown ingredients.
      </p>
    </div>

    <div class="card mb-6">
      <header class="mb-2">
        <h2 class="mb-2">About John</h2>
        <img
          alt="John the barback, thinking"
          class="h-44 object-cover w-full"
          src="./john.png"
        />
      </header>
      <p class="mb-4">
        John Kurkowski is Billy's long time guest, sitting at the bar. One day
        John asked, how to take his home bartending to the next level? Billy
        told him, put on the apron, get behind the bar. Watch our livestreams to
        follow John the barback's journey.
      </p>
    </div>
  </div>
</div>

<style lang="postcss">
  .button {
    @apply bg-purple-200;
    @apply border-2;
    @apply border-gray-900;
    @apply px-3;
    @apply py-1.5;
    @apply rounded-md;
    @apply text-gray-900;
    @apply transition-colors;
  }

  .button:hover {
    @apply bg-purple-600;
    @apply text-purple-100;
  }

  .cards {
    @apply flex-wrap;
    @apply flex;
    @apply items-start;
    @apply justify-center;
  }

  .card {
    @apply bg-pink-100;
    @apply flex-col;
    @apply flex;
    @apply m-2;
    @apply px-4;
    @apply py-2;
    @apply rounded-lg;
    @apply text-gray-700;
    @apply w-80;
  }

  .card header {
    @apply mx-auto;
    @apply text-center;
  }

  .card h2 {
    @apply text-2xl;
    @apply font-display;
  }

  hr {
    @apply border-0;
    @apply my-8;
    @apply text-center;
    @apply text-lg;

    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
    height: 2px;
  }

  hr::after {
    @apply absolute;
    @apply bg-purple-900;
    @apply px-4;
    @apply whitespace-nowrap;

    content: attr(data-hr-content);
    transform: translate(-50%, -50%);
  }
</style>
