export interface ISearchResultItems {
    id: number,
    name: string,
    owner: {
        login: string,
        id: number,
        node_id: string,
        avatar_url: string,
        gravatar_id: number,
        url: string,
        received_events_url: string
        type: string,
        html_url: string,
        followers_url: string,
        following_url: string,
        gists_url: string,
        starred_url: string,
        subscriptions_url: string,
        organizations_url: string,
        repos_url: string,
        events_url: string,
        site_admin: boolean
    },
    html_url: string,
    description: string,
    stargazers_count: number
}

export interface ISearchResult {
    total_count: number,
    items: ISearchResultItems[]
}


export interface SearchResultProps {
    result: ISearchResultItems
}

export interface FavCounterState {
    value: number;
}

export interface PaginationProps {
    currentPage: number,
    totalPages: number
}

export type AllowedSort = 'best match' | 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

export type AllowedOrder = 'desc' | 'asc';

export interface IParams {
    q: string,
    sort: AllowedSort,
    order: AllowedOrder,
    per_page: number,
    page: number
}



