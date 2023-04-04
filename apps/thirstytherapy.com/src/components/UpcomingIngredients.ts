import type { Options } from "@contentful/rich-text-html-renderer";
import {
  BLOCKS,
  Block,
  Inline,
  INLINES,
  Text,
} from "@contentful/rich-text-types";

export const DATETIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",

  timeZone: "America/Los_Angeles",
});

export const RICH_OPTIONS: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, next) =>
      `<p class="mb-4">${next(node.content)}</p>`,
    [INLINES.HYPERLINK]: (node: Block | Inline) =>
      `<a class="underline" href="${node.data.uri}">${
        (node.content[0] as Text).value
      }</a>`,
  },
};

const SPACE_ID = "nc2tnr0lufn7";
const ENVIRONMENT_ID = "master";
const HOST = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;
const ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

export interface AgendaItem {
  sys: {
    id: string;
  };
}

export interface Episode {
  fields: {
    agendaItems: AgendaItem[];
    broadcast: Date;
    isPast: boolean;
    isSkipped: boolean;
    originalTime: Date;
  };
}

/**
 * Fetch data necessary to hydrate the "upcoming events" widget.
 *
 * Expires older events. Joins related records in memory.
 */
export async function fetchData(): Promise<Episode[]> {
  const episodeTooOldToDisplayDate = new Date();
  episodeTooOldToDisplayDate.setDate(episodeTooOldToDisplayDate.getDate() - 7);

  const episodeIsPastDate = new Date();
  episodeIsPastDate.setDate(episodeIsPastDate.getDate() - 1);

  const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}&content_type=episode&fields.isReadyForViewers=true&fields.broadcast[gte]=${episodeTooOldToDisplayDate.toISOString()}&order=fields.broadcast`;
  const resp = await fetch(url);
  const entries = await resp.json();

  entries.items.forEach(function joinIncludesInMemory(episode: Episode) {
    episode.fields.isPast =
      new Date(episode.fields.broadcast) < episodeIsPastDate;

    episode.fields.agendaItems = (episode.fields.agendaItems || [])
      .map((item) => {
        return entries.includes.Entry.find(
          (entry: AgendaItem) => entry.sys.id === item.sys.id
        );
      })
      .filter(Boolean);
  });

  return entries.items;
}
