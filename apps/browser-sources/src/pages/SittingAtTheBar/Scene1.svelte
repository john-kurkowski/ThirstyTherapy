<script lang="ts">
  const urlParams = new URLSearchParams(window.location.search);
  const isRight = urlParams.get("isRight");
</script>

<div class="inline-flex {isRight ? 'justify-end' : ''} w-full">
  <div class="broadcast-bubble scene-line flex items-center justify-between">
    <p class="font-display">Thirsty Therapy</p>
    <img
      alt=""
      class="my-1 w-8 rounded-full"
      src="https://static-cdn.jtvnw.net/jtv_user_pictures/62f1dd2d-465d-4099-aa03-475678b920c5-profile_image-300x300.png"
    />
    <p>
      <code>#worthyofgooddrinks</code>
    </p>
  </div>
</div>

<div class="inline-flex {isRight ? 'justify-end' : ''} mt-1 w-full text-sm">
  <div class="scene-line flex justify-evenly">
    <span class="broadcast-bubble inline-block"> thirstytherapy.com </span>

    <span class="broadcast-bubble inline-flex items-center">
      <a href="https://instagram.com/thirstytherapy">
        <img
          alt="Instagram"
          class="inline-block"
          src="/iconmonstr-instagram-11.svg"
          title="Instagram"
        />
      </a>

      <a href="https://paypal.me/thirstytherapy">
        <img
          alt="PayPal"
          class="ml-2 inline-block"
          height="24"
          src="/iconmonstr-paypal-1.svg"
          title="PayPal"
        />
      </a>

      <a href="https://venmo.com/thirstytherapy">
        <img
          alt="Venmo"
          class="ml-2 inline-block"
          height="24"
          src="/venmo-icon.svg"
          title="Venmo"
          width="24"
        />
      </a>

      <span class="ml-4 inline-block">@ThirstyTherapy</span>
    </span>
  </div>
</div>

<style>
  .scene-line {
    width: 23rem;
  }
</style>
