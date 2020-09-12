<script>
  let state;

  function toggle() {
    if (state === "EXPANDED") {
      state = "COMPLETE";
    } else if (state === "COMPLETE") {
      state = "COLLAPSED";
    } else {
      state = "EXPANDED";
    }
  }
</script>

<slot {state} {toggle} />
