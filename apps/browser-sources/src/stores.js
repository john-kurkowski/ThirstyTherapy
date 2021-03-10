import { writable } from "svelte/store";

export const pageName = writable("");

export const twitchClientSecret = (function writableCookie() {
  const cookieName = "ttTCS";

  const existingValue =
    (new RegExp(`${cookieName}=([^;]+)`, "g").exec(document.cookie) || [])[1] ||
    "";

  const { set, subscribe } = writable(existingValue);

  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const expires = new Date(Date.now() + oneMonth);

  return {
    set(value) {
      document.cookie = [
        `${cookieName}=${value}`,
        "path=/",
        "samesite=strict",
        "secure",
        `expires=${expires.toUTCString()}`,
      ].join("; ");

      set(...arguments);
    },

    subscribe,
  };
})();
