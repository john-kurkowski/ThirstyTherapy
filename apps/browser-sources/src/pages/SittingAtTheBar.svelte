<script lang="ts">
  import Scene0 from "./SittingAtTheBar/Scene0.svelte";
  import Scene1 from "./SittingAtTheBar/Scene1.svelte";
  import Scene2 from "./SittingAtTheBar/Scene2.svelte";
  import type { EntryProps } from "contentful-management";
  import type { TwitchUser } from "../models";
  import {
    cmsManagementAccessToken,
    pageName,
    twitchAccessToken,
  } from "../stores";
  import { cmsClient } from "../models";
  import { fade } from "svelte/transition";
  import { fetchUsers } from "./SittingAtTheBar/Twitch";
  import { isEqual } from "lodash-es";
  import { onDestroy, onMount } from "svelte";

  const FADE_DURATION = 2 * 1000;
  const POLL_INTERVAL = 10 * 1000;
  const USERNAMES_SITTING_AT_THE_BAR = "6LrlYBz1jpPXFkjvDrp8Pv";

  const urlParams = new URLSearchParams(window.location.search);
  let isVisible = true;
  let sceneNumber = 0;
  let sceneTimeout: number | undefined = undefined;

  let scenes = urlParams.getAll("scene").length
    ? urlParams.getAll("scene")
    : ["0", "1", "0", "2"];

  let usernamesSetting: EntryProps | undefined = undefined;
  let usernamesFetchError: Error | undefined = undefined;
  let usernamesFetchTimeout: number | undefined = undefined;
  let usernamesUpdate: Promise<unknown> = Promise.resolve();
  let usernames: string[] = [];

  async function poll() {
    try {
      await usernamesUpdate;

      let record;
      record = await (
        await cmsClient($cmsManagementAccessToken)
      ).entry.get({ entryId: USERNAMES_SITTING_AT_THE_BAR });
      let valueToCompare: string[] = record.fields.stringValues["en-US"];

      if (!isEqual(usernames, valueToCompare)) {
        usernamesSetting = record;
        usernames = valueToCompare;
      }
    } catch (e) {
      usernamesFetchError = e as Error;
    }

    usernamesFetchTimeout = window.setTimeout(poll, POLL_INTERVAL);
  }

  let fetchData: Promise<TwitchUser[]>;
  $: if ($twitchAccessToken instanceof Error) {
    fetchData = Promise.reject($twitchAccessToken);
  } else if (usernamesFetchError) {
    fetchData = Promise.reject(usernamesFetchError);
  } else {
    fetchData = fetchUsers($twitchAccessToken, usernames);
  }

  onMount(function () {
    pageName.set("Sitting at the bar");
    sceneTimeout = window.setTimeout(timeShow, timeShowMs());
    poll();
  });

  onDestroy(function () {
    [sceneTimeout, usernamesFetchTimeout].forEach(window.clearTimeout);
  });

  async function handleNameEdit(index: number, e: CustomEvent<string>) {
    if (!usernamesSetting) {
      return;
    } else if (usernames[index].toLowerCase() === e.detail.toLowerCase()) {
      return;
    }

    usernames[index] = e.detail;

    usernamesUpdate = (await cmsClient($cmsManagementAccessToken)).entry.update(
      { entryId: USERNAMES_SITTING_AT_THE_BAR },
      usernamesSetting
    );
  }

  function timeShowMs(): number {
    return isVisible
      ? parseInt(urlParams.get("on") || "", 10) || 10 * 1000
      : Math.max(
          parseInt(urlParams.get("off") || "", 10) || 3 * 1000,
          FADE_DURATION + 500
        );
  }

  function timeShow() {
    if (scenes.length > 1) {
      isVisible = !isVisible;
      if (!isVisible) {
        sceneNumber = (sceneNumber + 1) % scenes.length;
      }
    }

    sceneTimeout = window.setTimeout(timeShow, timeShowMs());
  }

  export const location = "";
</script>

{#if isVisible}
  {#if scenes[sceneNumber] === "0"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene0 {fetchData} {handleNameEdit} />
    </div>
  {:else if scenes[sceneNumber] === "1"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene1 />
    </div>
  {:else if scenes[sceneNumber] === "2"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene2 />
    </div>
  {/if}
{/if}
