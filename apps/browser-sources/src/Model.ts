import { PlainClientAPI, createClient } from "contentful-management";

const CMS_SPACE_ID = "nc2tnr0lufn7";
const CMS_ENVIRONMENT_ID = "master";
const CMS_HOST = `https://cdn.contentful.com/spaces/${CMS_SPACE_ID}/environments/${CMS_ENVIRONMENT_ID}`;
const CMS_ACCESS_TOKEN = "h8pCe0ZTrcn4Ga5ZpTiwB0z0zc5LJ_7rgWMEJTorgug";
// TODO: get this out of source control and revoke
const CMS_MANAGEMENT_ACCESS_TOKEN =
  "CFPAT-voFmZbBATsDEotXyJhLk4IvWa6S3pWwqMw7xtwhHsF0";
let CMS_CLIENT: PlainClientAPI;

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

export async function cmsClient(): Promise<PlainClientAPI> {
  if (CMS_CLIENT) {
    return CMS_CLIENT;
  }

  CMS_CLIENT = createClient(
    { accessToken: CMS_MANAGEMENT_ACCESS_TOKEN },
    {
      type: "plain",
      defaults: { spaceId: CMS_SPACE_ID, environmentId: CMS_ENVIRONMENT_ID },
    }
  );
  return CMS_CLIENT;
}

export function fetchCmsPath(path: string): Promise<Response> {
  const url = `${CMS_HOST}/${path}?access_token=${CMS_ACCESS_TOKEN}`;
  return fetch(url);
}
