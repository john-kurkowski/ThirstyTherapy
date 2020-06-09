<script>
	export let name;
</script>

<style>
  label:hover {
    cursor: pointer;
  }
  
  input:checked + label {
    color: lightgray;
    text-decoration: line-through;
  }
</style>

<form>
  <ol>
    <li tabindex="0">
      <input type="checkbox"/>
      <label>Springtime for Whiskey Sour</label>
      <ul>
        <li tabindex="0">
          <input type="checkbox"/>
          <label>¾oz aquafaba</label>
        </li>
        <li tabindex="0"><input type="checkbox"/>
          <label>1oz lemon juice</li>
        <li tabindex="0"><input type="checkbox"/>
          <label>1oz bay leaf syrup</li>
        <li tabindex="0"><input type="checkbox"/>
          <label>5 leaves marjoram</li>
        <li tabindex="0"><input type="checkbox"/>
          <label>2oz bourbon</li>
      </ul>
    </li>
    <li tabindex="0">
      <input type="checkbox"/>
      <label>Bramble</label>
      <ul>
        <li tabindex="0"><input type="checkbox"/>
          <label>2 hood strawberries</label></li>
        <li tabindex="0"><input type="checkbox"/>
          <label>0.5oz bay leaf syrup</label></li>
        <li tabindex="0"><input type="checkbox"/>
          <label>1/2 dropper grapefruit bitters</li>
        <li tabindex="0"><input type="checkbox"/>
          <label>Pinch sea salt</label></li>
        <li tabindex="0"><input type="checkbox"/>
          <label>2oz bourbon</label></li>
      </ul>
    </li>
  </ol>
</form>