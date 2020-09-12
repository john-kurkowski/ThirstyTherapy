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

<style>
  .COMPLETE {
    color: lightgray;
    text-decoration: line-through;
  }
</style>

<button class={`font-display ${state} ${$$props.class}`} on:click={toggle}>
  <slot name="button" />
</button>

<slot name="state" {state} />
