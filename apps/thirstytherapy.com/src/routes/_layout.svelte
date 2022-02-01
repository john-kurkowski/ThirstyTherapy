<script lang="ts">
  import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte";
  import Tailwindcss from "../Tailwindcss.svelte";
  import { stores } from "@sapper/app";

  let ga_measurment_id = "G-KC8DC5DEDS";
</script>

<GoogleAnalytics {stores} id={ga_measurment_id} />

<Tailwindcss />

<svelte:head>
  <html class="bg-purple-900" lang="en-US" />
</svelte:head>

<div class="font-body text-center text-purple-100">
  <header
    class="after-gradient relative mb-20 border-b-2 border-gray-800 bg-purple-600 px-8 py-4"
  >
    <a href="/">
      <h1 class="font-display mb-10 text-4xl">Thirsty Therapy</h1>
      <img
        alt="Thirsty Therapy logo: a bright red cocktail in a rocks glass, lined with a Hood strawberry"
        class="absolute left-0 right-0 z-20 mx-auto my-1 rounded-full border-2 border-gray-800"
        height="100"
        src="./logo.png"
        style="bottom: -56px;"
        width="100"
      />
    </a>
  </header>

  <main class="mx-auto mb-8 px-4">
    <slot />
  </main>

  <footer class="mt-2 px-8 py-4">
    <ul class="mb-6 flex justify-center">
      <li>
        <a href="mailto:ThirstyTherapy@gmail.com">
          <img alt="Email" src="./iconmonstr-email-3.svg" title="Email" />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://instagram.com/thirstytherapy">
          <img
            alt="Instagram"
            src="./iconmonstr-instagram-11.svg"
            title="Instagram"
          />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://twitch.tv/thirstytherapy">
          <img alt="Twitch" src="./iconmonstr-twitch-1.svg" title="Twitch" />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://www.youtube.com/channel/UC_t71znatwtjEPL3i1MiutA">
          <img
            alt="YouTube archive"
            src="./iconmonstr-youtube-6.svg"
            title="YouTube archive"
          />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://paypal.me/thirstytherapy">
          <img
            alt="PayPal"
            height="24"
            src="./iconmonstr-paypal-1.svg"
            title="PayPal"
          />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://venmo.com/thirstytherapy">
          <img
            alt="Venmo"
            height="24"
            src="./venmo-icon.svg"
            title="Venmo"
            width="24"
          />
        </a>
      </li>
    </ul>
    <p>
      <a
        class="underline"
        href="https://docs.google.com/forms/d/e/1FAIpQLSe-jauZKAnpo3PD2MOahCj62Ss9f73QH3XSAaiPOfZFXtN0Zw/viewform?usp=sf_link"
        >Survey</a
      >
    </p>
  </footer>
</div>

<style>
  .after-gradient::after {
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.225) 0%,
      rgba(0, 0, 0, 0.001) 100%
    );
    bottom: -20%;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 100%;
  }
</style>
