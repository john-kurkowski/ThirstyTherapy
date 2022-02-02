<script lang="ts">
  import HeadingPop from "../components/HeadingPop.svelte";
  import UpcomingIngredient from "../components/UpcomingIngredient.svelte";
  import { DATETIME_FORMAT } from "../components/UpcomingIngredients";
  import { Episode, fetchData } from "../components/UpcomingIngredients";
  import { onMount } from "svelte";

  let fetchingData: Promise<Episode[]> = new Promise(() => ({}));

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

<div class="mx-auto max-w-2xl text-left xl:max-w-5xl">
  <div class="cards mx-auto mb-6">
    <div class="card">
      <header class="mb-2">
        <HeadingPop>Cocktail Distance Learning</HeadingPop>
        <a
          class="button my-1 inline-flex justify-center text-center"
          href="mailto:ThirstyTherapy@gmail.com"
        >
          Ask about a class
          <img
            alt=""
            class="ml-2 inline-block"
            src="./iconmonstr-email-3.svg"
          />
        </a>
      </header>

      <p class="mb-4">
        Welcome in, folks, to the socially safe cocktail bar! A master bartender
        leads your team or private Zoom. He handpicks ingredients and tools for
        your event. Alcoholic or non, home or office, you are worthy of good
        drinks.
      </p>

      <img
        alt="A martini glass cocktail with 2 stacks of cocktail and culinary books."
        class="mt-auto h-44 w-full object-cover object-top"
        src="./books.jpeg"
      />
    </div>

    <div class="card">
      <header class="mb-2">
        <HeadingPop>Livestream</HeadingPop>
        <a
          class="button my-1 inline-flex justify-center text-center"
          href="https://twitch.tv/thirstytherapy"
        >
          Watch on Twitch
          <img
            alt=""
            class="ml-2 inline-block"
            src="./iconmonstr-twitch-1.svg"
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
        class="mt-auto h-44 w-full object-cover"
        src="./stream.png"
      />
    </div>

    <div class="card">
      <header class="mb-2">
        <HeadingPop>Subscriptions</HeadingPop>
      </header>
      <p class="mb-4">
        Like what we do? Tip your bartender via
        <a class="underline" href="https://paypal.me/thirstytherapy">PayPal</a>
        or
        <a class="underline" href="https://venmo.com/thirstytherapy">Venmo</a>.
      </p>
      <p class="mb-4">
        Subscribe to get past and future recipes, and you pick the agenda!
      </p>
      <p class="mb-4">
        Help bartenders and bar patrons reconnect at our virtual bar. We use
        tips to bring you more creative drinks!
      </p>
      <img
        alt="Several coupes with infused gin cocktails, lemon twists, and cut sterling roses."
        class="mt-auto h-44 w-full object-cover object-top"
        src="./glasses.jpeg"
      />
    </div>
  </div>

  <hr data-hr-content="Upcoming" />

  <div class="cards mx-auto mb-6">
    {#await fetchingData then data}
      {#each data as episode}
        <div class="card">
          <header class="mb-2">
            <HeadingPop>
              {#if episode.fields.originalTime}
                <small class="block opacity-50">
                  <del
                    >{DATETIME_FORMAT.format(
                      new Date(episode.fields.originalTime)
                    )} 6-9pm PDT</del
                  >
                </small>
              {/if}

              {#if episode.fields.isPast || episode.fields.isSkipped}
                <del class="opacity-50"
                  >{DATETIME_FORMAT.format(new Date(episode.fields.broadcast))} 6-9pm
                  PDT</del
                >
                {#if !episode.fields.isSkipped}✅{/if}
              {:else}
                {DATETIME_FORMAT.format(new Date(episode.fields.broadcast))} 6-9pm
                PDT
              {/if}
            </HeadingPop>
          </header>

          <UpcomingIngredient {episode} />
        </div>
      {:else}
        <p class="mb-8 text-gray-300">No upcoming events.</p>
      {/each}
    {/await}
  </div>

  <hr data-hr-content="Team" />

  <div class="cards mx-auto mb-6">
    <div class="card">
      <header class="mb-2">
        <HeadingPop>About Billy</HeadingPop>
        <img
          alt="Billy the bartender, smiling"
          class="h-44 w-full object-cover"
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

    <div class="card">
      <header class="mb-2">
        <HeadingPop>About John</HeadingPop>
        <img
          alt="John the barback, thinking"
          class="h-44 w-full object-cover"
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

    <div class="card">
      <header class="mb-2">
        <HeadingPop>About Brie</HeadingPop>
        <img
          alt="Brie the oracle"
          class="h-44 w-full object-cover"
          src="./brie.png"
        />
      </header>
      <p class="mb-4">
        Brie Noble is the oracle and operator. She thought Billy and John looked
        like fools walking off screen to transition their camera angles. So she
        does it for them behind the scenes. She Googles chat questions
        aggressively. Say hi! #teambrie
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
    @apply mb-8;
    @apply px-4;
    @apply py-2;
    @apply rounded-lg;
    @apply text-gray-700;
    @apply w-80;
  }

  .card header {
    @apply flex;
    @apply flex-col;
    @apply relative;
  }

  .card header .button {
    @apply mx-auto;
  }

  hr {
    @apply border-0;
    @apply mb-12;
    @apply mt-8;
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
