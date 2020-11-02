export interface ContentfulResponse<T> {
  items: ContentfulEntry<T>[]
}

export interface ContentfulEntry<T> {
  fields: T
  sys: {
    id: string
  }
}

export interface EpisodeModel {
  agendaItems: ContentfulEntry<AgendaItemModel>[]
  title: string
}

export interface AgendaItemModel {
  steps: string[]
  title: string
}
