<script>
  const urlParams = new URLSearchParams(window.location.search);
  const isRight = urlParams.get("isRight");
</script>

<div class="inline-flex {isRight ? 'justify-end' : ''} w-full">
  <div class="broadcast-bubble flex justify-between items-center scene-line">
    <p class="font-display">Thirsty Therapy</p>
    <img
      alt=""
      class="my-1 rounded-full w-8"
      src="https://static-cdn.jtvnw.net/jtv_user_pictures/62f1dd2d-465d-4099-aa03-475678b920c5-profile_image-300x300.png"
    />
    <p>
      <code>#worthyofgooddrinks</code>
    </p>
  </div>
</div>

<div class="inline-flex {isRight ? 'justify-end' : ''} mt-1 text-sm w-full">
  <div class="flex justify-center scene-line">
    <div class="broadcast-bubble flex items-center">
      <p>Streaming every other Saturday, 6-9pm PDT</p>
    </div>
  </div>
</div>

<style>
  .scene-line {
    width: 23rem;
  }
</style>
