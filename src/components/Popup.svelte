<script lang="ts">
  import { storage } from "../storage";
  import { onMount } from "svelte";
  import Monaco from "./Monaco.svelte";

  let url = ``;
  let isLoading = true;
  let defaultScript = `var current = new GlideRecord("sys_script");
current.get("sys_id");
  `;
  let token;
  let unload;

  onMount(async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id, {
      greeting: "hello",
    });
    token = response.el;
    console.log(token);

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const tabURL = new URL(decodeURIComponent(tabs[0].url)); //must decode URI otherwise URLSearchParams won't correctly split on ?

      const params = new URLSearchParams(tabURL.searchParams);

      const sysId = params.get("sys_id");
      const tableName = tabURL.href.match(/(\w*).do/)[1];
      defaultScript = `var current = new GlideRecord("${tableName}");
current.get("${sysId}");`;

      isLoading = false;
    });
  });

  async function getData() {
    var headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    headers["X-UserToken"] = token;

    const response = await fetch(
      "https://dev141147.service-now.com/api/now/table/incident?sysparm_limit=1",
      {
        headers,
      }
    );
    const data = await response.json();
    console.log(data);
  }
</script>

<div class="container">
  {#if isLoading}
    ...loading
  {:else}
    {unload}
    <button on:click={getData}>Get Data</button>
    <Monaco {defaultScript} />
  {/if}
</div>

<style>
  .container {
    min-width: 300px;
    min-height: 300px;
  }
</style>
