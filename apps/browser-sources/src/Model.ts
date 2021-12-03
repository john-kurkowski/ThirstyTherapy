const CMS_SPACE_ID = "nc2tnr0lufn7";
const CMS_ENVIRONMENT_ID = "master";
const CMS_HOST = `https://cdn.contentful.com/spaces/${CMS_SPACE_ID}/environments/${CMS_ENVIRONMENT_ID}`;
const CMS_ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";

export interface CmsEntry {
  sys: {
    id: string;
  };
}

export interface AgendaItem extends CmsEntry {
  fields: {
    displayTitle: string;
    title: string;
    steps?: string[];
    subtitle: string;
  };
}

export interface Episode extends CmsEntry {
  fields: {
    agendaItems?: AgendaItem[];
    displayTitle: string;
    title: string;
  };
}

export interface CmsResult {
  items: CmsEntry[];
}

export interface TwitchUser {
  display_name: string;
  profile_image_url: string;
}

export function fetchCmsPath(path: string): Promise<Response> {
  const url = `${CMS_HOST}/${path}?access_token=${CMS_ACCESS_TOKEN}`;
  return fetch(url);
}
