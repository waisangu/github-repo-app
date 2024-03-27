import { IParams } from "../types/types";
import { IApiResponse } from "../types/octokit";
import { Octokit } from "octokit";


export const fetchApi = async (params: IParams):Promise<IApiResponse | void> => {

    try {

        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN
          })
        
        const response = await octokit.request('GET /search/repositories', {
                headers: {
                      'X-GitHub-Api-Version': '2022-11-28',
                    },
                    q: params.q,
                    sort: params.sort, // Default is best match which has a value of undefined
                    order: params.order, // Default is desc
                    per_page: params.per_page, // Default is 30 results per page
                    page: params.page // Default is page 1
        })

        // Handle bad responses from api
        if (response.status < 200 && response.status >= 300) {
            throw new Error(`Error: Status Code ${response.status}. Failed to get repositories.`)
        }

        const data = response.data as IApiResponse;

        return data.total_count 
        ? data : 
        {
            total_count: 0,
            incomplete_results: true,
            items: [] 
        };
        
    } catch (error: unknown) {
        console.log(error);
        return;
    }
}