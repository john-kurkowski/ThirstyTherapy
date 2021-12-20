<script lang="ts">
  /**
   * Cycles through an infinite slideshow of a handful of scenes, like a list
   * of users online right now, and branding.

   * The usernames can be edited inline. With a valid CMS write access token
   * set, the usernames will persist to the CMS, and be automatically synced to
   * anybody else viewing this page.
   */

  import PausableTimeout from "./SittingAtTheBar/PausableTimeout";
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
  let sceneTimeout: PausableTimeout | undefined = undefined;

  let scenes = urlParams.getAll("scene").length
    ? urlParams.getAll("scene")
    : ["0", "1", "0", "2"];

  let usernamesSetting: EntryProps | undefined = undefined;
  let usernamesFetchError: Error | undefined = undefined;
  let usernamesFetchTimeout: PausableTimeout | undefined = undefined;
  let usernamesUpdate: Promise<unknown> = Promise.resolve();
  let usernames: string[] = [];

  async function pollUsernames() {
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

    usernamesFetchTimeout = new PausableTimeout(pollUsernames, POLL_INTERVAL);
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
    sceneTimeout = new PausableTimeout(pollScenesSlideshow, sceneOnOffMs());
    pollUsernames();
  });

  onDestroy(function () {
    [sceneTimeout, usernamesFetchTimeout].forEach(function (timeout) {
      timeout?.clearTimeout();
    });
  });

  /**
   * Persist the text input username to the CMS. Ignore when there are page
   * initialization errors. Ignore refreshing the data (and thus reflowing the
   * page) when the data doesn't change.
   */
  async function handleNameEdit(index: number, e: CustomEvent<string>) {
    [sceneTimeout, usernamesFetchTimeout].forEach(function (timeout) {
      timeout?.resume();
    });

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

  function handleNameEditing() {
    [sceneTimeout, usernamesFetchTimeout].forEach(function (timeout) {
      timeout?.pause();
    });
  }

  /**
   * Gets the millisecond duration to show the current scene for.
   *
   * This has quick defaults for development. In production, configure the
   * scene on and off durations with longer values, via the "on" and "off"
   * query params.
   */
  function sceneOnOffMs(): number {
    return isVisible
      ? parseInt(urlParams.get("on") || "", 10) || 10 * 1000
      : Math.max(
          parseInt(urlParams.get("off") || "", 10) || 3 * 1000,
          FADE_DURATION + 500
        );
  }

  function pollScenesSlideshow() {
    if (scenes.length > 1) {
      isVisible = !isVisible;
      if (!isVisible) {
        sceneNumber = (sceneNumber + 1) % scenes.length;
      }
    }

    sceneTimeout = new PausableTimeout(pollScenesSlideshow, sceneOnOffMs());
  }

  export const location = "";
</script>

{#if isVisible}
  {#if scenes[sceneNumber] === "0"}
    <div transition:fade={{ duration: FADE_DURATION }}>
      <Scene0 {fetchData} {handleNameEdit} {handleNameEditing} />
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
