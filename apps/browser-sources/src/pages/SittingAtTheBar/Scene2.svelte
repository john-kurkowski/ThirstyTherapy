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
  <div class="scene-line flex justify-center">
    <div class="broadcast-bubble flex items-center">
      <p>Streaming every other Saturday, 6-8pm Pacific</p>
    </div>
  </div>
</div>

<style>
  .scene-line {
    width: 23rem;
  }
</style>
