<script>
  /*
  import Nav from "../components/Nav.svelte";

  export let segment;
  */
</script>

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

  .font-body {
    font-family: "DM Sans", sans-serif;
  }

  .font-brand {
    font-family: "DM Serif Display", serif;
  }
</style>

<svelte:head>
  <html class="bg-purple-900" lang="en-US" />
</svelte:head>

<div class="font-body text-center text-purple-100">
  <header
    class="after-gradient bg-purple-600 border-b-2 border-gray-800 mb-20 px-8 py-4 relative">
    <h1 class="font-bold font-brand mb-10 text-4xl">Thirsty Therapy</h1>
    <img
      alt="Thirsty Therapy logo: a bright red cocktail in a rocks glass, lined with a Hood strawberry"
      class="absolute border-gray-800 border-2 left-0 mx-auto my-1 right-0 rounded-full z-20"
      height="100"
      src="./logo.png"
      style="bottom: -56px;"
      width="100" />
  </header>

  <!-- Nav {segment} /-->

  <main>
    <slot />
  </main>

  <footer class="mt-2 px-8 py-4">
    <ul class="flex justify-center mb-6">
      <li>
        <a href="mailto:ThirstyTherapy@gmail.com">
          <img src="./iconmonstr-email-3.svg" alt="Email" />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://instagram.com/thirstytherapy">
          <img src="./iconmonstr-instagram-11.svg" alt="Instagram" />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://twitch.tv/thirstytherapy">
          <img src="./iconmonstr-twitch-1.svg" alt="Twitch" />
        </a>
      </li>
      <li class="ml-8">
        <a href="https://venmo.com/thirstytherapy">
          <img
            alt="Venmo"
            class="icon-venmo"
            height="24"
            src="./venmo-icon.svg"
            width="24" />
        </a>
      </li>
    </ul>
    <p>
      <a
        class="underline"
        href="https://docs.google.com/forms/d/e/1FAIpQLSe-jauZKAnpo3PD2MOahCj62Ss9f73QH3XSAaiPOfZFXtN0Zw/viewform?usp=sf_link">Survey</a>
    </p>
  </footer>
</div>
