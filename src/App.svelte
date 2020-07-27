<script>
  import Tailwindcss from "./Tailwindcss.svelte";
</script>

<style>
  .font-display {
    @apply text-3xl;
  }

  label:hover {
    cursor: pointer;
  }

  input:checked + label {
    color: lightgray;
    text-decoration: line-through;
  }
</style>

<Tailwindcss />

<form>
  <ol>
    <li tabindex="0">
      <input type="checkbox" />
      <label class="font-display">Springtime for Whiskey Sour</label>

      <ul>
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
      <input type="checkbox" />
      <label class="font-display">Bramble</label>
      <ul>
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
</form>
