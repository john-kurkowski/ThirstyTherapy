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

// TODO type this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchData: () => Promise<any[]> = async () => {
  const episodeTooOldToDisplayDate = new Date();
  episodeTooOldToDisplayDate.setDate(episodeTooOldToDisplayDate.getDate() - 7);

  const episodeIsPastDate = new Date();
  episodeIsPastDate.setDate(episodeIsPastDate.getDate() - 1);

  const url = `${HOST}/entries?access_token=${ACCESS_TOKEN}&content_type=episode&fields.isReadyForViewers=true&fields.broadcast[gte]=${episodeTooOldToDisplayDate.toISOString()}&order=fields.broadcast`;
  const resp = await fetch(url);
  const entries = await resp.json();

  // @ts-expect-error TODO type this
  entries.items.forEach(function joinIncludesInMemory(episode) {
    episode.fields.isPast =
      new Date(episode.fields.broadcast) < episodeIsPastDate;

    episode.fields.agendaItems = (episode.fields.agendaItems || [])
      // @ts-expect-error TODO type this
      .map((item) => {
        return entries.includes.Entry.find(
          // @ts-expect-error TODO type this
          (entry) => entry.sys.id === item.sys.id
        );
      })
      .filter(Boolean);
  });

  return entries.items;
};
