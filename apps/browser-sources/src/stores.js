import { derived, writable } from "svelte/store";

export const TWITCH_CLIENT_ID = "yrcihot9pxnayk7czuvy5jplj1r7yd";

export const pageName = writable("");

export const cmsManagementAccessToken = writableCookie("ttCMSMAT");

export const twitchClientSecret = writableCookie("ttTCS");

/**
 * Given the user set a client secret, use it to get an access token, and save
 * it in a cookie.
 *
 * This is derived only truly on first fetch. As long as its cookie is set,
 * subsequent changes to the upstream store will be ignored; they will not be
 * derived. It's an edge case. To truly derive, this cookie needs to know what
 * upstream store value it was made from…?
 */
export const twitchAccessToken = derived(
  twitchClientSecret,

  async function callback($twitchClientSecret, set) {
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
    const resp = await fetch(url, { method: "POST" });
    const result = await resp.json();

    if (!resp.ok) {
      set(new Error(result.message));
      return;
    }

    writeCookie(cookieName, result.access_token);
    set(result.access_token);
  }
);

function readQueryParamValue(cookieName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(cookieName);
}

function readCookieValue(cookieName) {
  return (new RegExp(`${cookieName}=([^;]+)`, "g").exec(document.cookie) ||
    [])[1];
}

function writableCookie(cookieName) {
  const initialValue =
    readQueryParamValue(cookieName) || readCookieValue(cookieName);
  const { set, subscribe } = writable(initialValue);

  return {
    set(value) {
      writeCookie(cookieName, value);
      set(...arguments);
    },

    subscribe,
  };
}

function writeCookie(cookieName, value) {
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
