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
  <div class="cards justify-between max-w-2xl mb-6 mx-auto xl:max-w-5xl">
    <div class="card mb-6">
      <header class="mb-4">
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
        Welcome in, folks, to the socially safe cocktail bar! Master bartender
        and alchemist Billy noble leads your team or private Zoom. He'll
        handpick ingredients and tools just for your event. Alcholic or non,
        home or office, you are worthy of good drinks.
      </p>

      <img
        alt="A martini glass cocktail with 2 stacks of cocktail and culinary books."
        class="h-44 object-cover object-top mt-auto w-full"
        src="./books.jpeg"
      />
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2>Livestreams</h2>
      </header>
      <p class="mb-4">
        Join free livestreams every other Saturday, 6-9pm PDT, <a
          class="underline"
          href="https://www.twitch.tv/thirstytherapy">on Twitch</a
        >. Follow along to put fresh spins on your favorite spirits. Ask
        anything, like for substitutions, or what to do with that bottle at the
        back of the cabinet.
      </p>
      <img
        alt="Screenshot of Billy and John livestream bartending, on Twitch"
        class="h-44 object-cover mt-auto w-full"
        src="./stream.png"
      />
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2 class="mb-2">Upcoming</h2>

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

      <UpcomingIngredients />
    </div>

    <div class="card mb-6">
      <header class="mb-4">
        <h2 class="mb-2">About Billy</h2>
        <img
          alt="Billy the bartender, smiling"
          class="h-44 object-cover w-full"
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
        <img
          alt="John the barback, thinking"
          class="h-44 object-cover w-full"
          src="./john.png"
        />
      </header>
      <p class="mb-4">
        John is Billy's long time guest sitting at the bar. One day John asked,
        how to take his home bartending to the next level? Billy told him, put
        on the apron, get behind the bar.
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
    @apply justify-between;
  }

  /* Autofill the last space. H/T https://stackoverflow.com/a/34816625/62269 */
  .cards::after {
    @apply m-2;
    @apply w-80;

    content: "";
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

    width: theme("width.80");
  }

  @media (min-width: 640px) {
    .card:nth-of-type(1),
    .card:nth-of-type(2) {
      height: 30rem;
    }
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
