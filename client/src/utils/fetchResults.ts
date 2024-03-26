import { IParams, ISearchResult, ISearchResultItems } from "../types/types";

export const fetchResults = async (params: IParams):Promise<ISearchResult | void> => {
    const baseUrl = 'https://api.github.com/search/repositories';
    const paramsUrl = new URLSearchParams({
        q: params.q,
        sort: params.sort, // Default is best match
        order: params.order, // Default is desc
        per_page: String(params.per_page), // Default is 30 results per page
        page: String(params.page) // Default is page 1
    })

    try {
        const response = await fetch(`${baseUrl}?${paramsUrl}`);

        if (!response.ok) {
            throw new Error(`Error: Status Code ${response.status}. Failed to get repositories.`)
        }

        const data = await response.json();
        const desiredKeys: string[] = ['id', 'name', 'owner', 'html_url','description', 'stargazers_count'];
        const filteredItems: ISearchResultItems[]  = [];

        for (const item of data.items) {
            filteredItems.push(Object.keys(item).filter(key => desiredKeys.includes(key)).reduce((obj: any, key) => {
                obj[key] = item[key];
                return obj
            }, {}))
        }

        return data.total_count ? {
            total_count: data.total_count,
            items: filteredItems
        } : {
            total_count: 0,
            items: []
        }
        
    } catch (error: unknown) {
        return console.log(error);
    }
}