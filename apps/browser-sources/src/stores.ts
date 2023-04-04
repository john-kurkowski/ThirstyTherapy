/**
 * Miscellaneous functions for interacting with Svelte stores.
 */

import { Readable, Writable, derived, writable } from "svelte/store";

export const TWITCH_CLIENT_ID = "yrcihot9pxnayk7czuvy5jplj1r7yd";

export const pageName = writable("");

export const cmsManagementAccessToken = writableCookie("ttCMSMAT");

export const twitchClientSecret = writableCookie("ttTCS");

/**
 * Given the user set a client secret, use it to get an access token. Saves it
 * in a cookie. This is not writable to the caller, because this function
 * handles writing automatically.
 *
 * This is derived only truly on first fetch. As long as its cookie is set,
 * subsequent changes to the upstream store will be ignored; they will not be
 * derived. It's an edge case. To truly derive, this cookie needs to know what
 * upstream store value it was made from…?
 */
export const twitchAccessToken: Readable<string | Error> = derived(
  twitchClientSecret,

  function callback($twitchClientSecret, set) {
    const cookieName = "ttTAT";

    const existingValue = readCookieValue(cookieName);
    if (existingValue) {
      set(existingValue);
      return;
    }

    const host = "https://id.twitch.tv";
    const qps = {
      client_id: TWITCH_CLIENT_ID,
      client_secret: $twitchClientSecret,
      grant_type: "client_credentials",
    };
    const qs = `?${Object.entries(qps)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")}`;
    const url = `${host}/oauth2/token${qs}`;
    (async function () {
      const resp = await fetch(url, { method: "POST" });
      const result = await resp.json();

      if (!resp.ok) {
        set(new Error(result.message));
        return;
      }

      writeCookie(cookieName, result.access_token);
      set(result.access_token);
    })();
  }
);

/**
 * Helper to read a cookie name as a query string parameter in the current URL
 * of the page.
 *
 * Cookies maintained in this file can also be read from query string params.
 */
function readQueryParamValue(cookieName: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(cookieName);
}

/**
 * Helper to read a cookie value.
 */
function readCookieValue(cookieName: string): string | undefined {
  return (new RegExp(`${cookieName}=([^;]+)`, "g").exec(document.cookie) ||
    [])[1];
}

/**
 * Svelte store object that persists to a cookie. Read initially from that same
 * cookie or query string parameters.
 */
function writableCookie(cookieName: string): Writable<string> {
  const initialValue =
    readQueryParamValue(cookieName) || readCookieValue(cookieName);
  const { set, subscribe, update } = writable(initialValue);

  return {
    set(value: string) {
      writeCookie(cookieName, value);
      set(value);
    },

    subscribe,
    update,
  };
}

/**
 * Helper to write a secure cookie with this app's preferred expiry.
 */
function writeCookie(cookieName: string, value: string): void {
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const expires = new Date(Date.now() + oneMonth);

  document.cookie = [
    `${cookieName}=${value}`,
    "path=/",
    "samesite=strict",
    "secure",
    `expires=${expires.toUTCString()}`,
  ].join("; ");
}
