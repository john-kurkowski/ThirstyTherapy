import type { TwitchUser } from "../../models";
import { TWITCH_CLIENT_ID } from "../../stores";

const API_HOST = "https://api.twitch.tv/helix";

export async function fetchUsers(
  twitchAccessToken: string,
  usernames: string[]
): Promise<TwitchUser[]> {
  if (!twitchAccessToken || !usernames.length) {
    return [];
  }

  const headers = {
    Authorization: `Bearer ${twitchAccessToken}`,
    "client-id": TWITCH_CLIENT_ID,
  };
  const qs = `?login=${usernames.join("&login=")}`;
  const url = `${API_HOST}/users${qs}`;
  const resp = await fetch(url, { headers });
  const entries = await resp.json();

  if (!resp.ok) {
    throw new Error(entries.message);
  }

  const usernamesLowercase = usernames.map((username) =>
    username.toLowerCase()
  );
  return (entries.data as TwitchUser[]).sort((o1, o2) => {
    return (
      usernamesLowercase.indexOf(o1.display_name.toLowerCase()) -
      usernamesLowercase.indexOf(o2.display_name.toLowerCase())
    );
  });
}
