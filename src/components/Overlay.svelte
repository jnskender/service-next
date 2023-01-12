<script lang="ts">
  import { storage } from "src/storage";
  import { onMount } from "svelte";
  import Options from "./Options.svelte";

  let count = 0;

  onMount(() => {
    storage.get().then((storage) => (count = storage.count));
  });
</script>

<div class="overlay">
  <Options {count} />
</div>

<style>
  .overlay {
    position: fixed;
    top: 32px;
    left: 32px;
    background-color: rgb(206, 22, 22);
    border: 1px solid black;
    padding: 4px;
  }
</style>
