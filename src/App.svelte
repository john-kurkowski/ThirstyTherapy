<script>
	export let name;
</script>

<style>
  input[type="checkbox"] {
/*     display: inline; */
  }
  
  li[tabindex] {
    cursor: pointer;
  }
</style>

<form>
  <ol>
    <li tabindex="0">
      Springtime for Whiskey Sour
      <ul>
        <li tabindex="0">
          <input type="checkbox"/>
          <label>¾oz aquafaba</label>
        </li>
        <li tabindex="0">1oz lemon juice</li>
        <li tabindex="0">1oz bay leaf syrup</li>
        <li tabindex="0">5 leaves marmajam</li>
        <li tabindex="0">2oz bourbon</li>
      </ul>
    </li>
    <li tabindex="0">
      Bramble
      <ul>
        <li tabindex="0">2 hood strawberries</li>
        <li tabindex="0">0.5oz bay leaf syrup</li>
        <li tabindex="0">1/2 dropper grapefruit bitters</li>
        <li tabindex="0">Pinch sea salt</li>
        <li tabindex="0">2oz bourbon</li>
      </ul>
    </li>
  </ol>
</form>