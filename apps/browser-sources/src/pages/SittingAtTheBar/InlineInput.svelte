<script lang="ts">
  /**
   * Fork of svelte-inline-input. This project doesn't use much of its API.
   * This project needs 1 additional API to get the editing state.
   *
   * @see https://github.com/ukchukx/svelte-inline-input
   */

  import { tick, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // Props
  export let value = "";
  export let placeholder = "";
  export let labelClasses = "";
  export let inputClasses = "";

  let editing = false;
  let inputEl: HTMLInputElement;
  let label: string;

  // Computed
  $: label = value ? value : placeholder;

  const toggle = async () => {
    editing = !editing;

    if (editing) {
      await tick();
      inputEl.focus();
      dispatch("focus", inputEl.value);
    }
  };

  const handleInput = () => {
    value = inputEl.value;
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") inputEl.blur();
  };

  const handleBlur = () => {
    toggle();
    dispatch("blur", value);
  };
</script>

{#if editing}
  <input
    class={inputClasses}
    bind:this={inputEl}
    type="text"
    {value}
    {placeholder}
    on:input={handleInput}
    on:keyup={handleEnter}
    on:blur={handleBlur}
  />
{:else}
  <button class={labelClasses} on:click={toggle}>
    {label}
  </button>
{/if}
