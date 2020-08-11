<script>
  const fetchImage = (async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    return await response.json();
  })();
</script>

<style>
  .font-display {
    @apply text-3xl;
  }

  label {
    @apply ml-3;
  }

  label:hover {
    cursor: pointer;
  }

  input:checked + label {
    color: lightgray;
    text-decoration: line-through;
  }
</style>

{#await fetchImage then data}
  <img src={data.message} alt="A random dog" />

  <ol>
    <li tabindex="0">
      <div class="flex items-center">
        <input type="checkbox" />
        <label class="font-display">Springtime for Whiskey Sour</label>
      </div>

      <ul class="ml-4">
        <li tabindex="0">
          <input type="checkbox" />
          <label>¾oz aquafaba</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>1oz lemon juice</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>1oz bay leaf syrup</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>5 leaves marjoram</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>2oz bourbon</label>
        </li>
      </ul>
    </li>
    <li tabindex="0">
      <div class="flex items-center">
        <input type="checkbox" />
        <label class="font-display">Bramble</label>
      </div>

      <ul class="ml-4">
        <li tabindex="0">
          <input type="checkbox" />
          <label>2 hood strawberries</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>0.5oz bay leaf syrup</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>1/2 dropper grapefruit bitters</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>Pinch sea salt</label>
        </li>
        <li tabindex="0">
          <input type="checkbox" />
          <label>2oz bourbon</label>
        </li>
      </ul>
    </li>
  </ol>
{/await}
