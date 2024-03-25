import React, { KeyboardEvent, useState } from 'react';
import { InputGroup, Input, InputLeftElement, InputRightAddon, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { increment, decrement } from '../features/favCounter/favCounterSlice';
import SearchResultCard from './SearchResultCard';
import { ISearchResult, ISearchResultItems, SearchResultProps, IParams } from '../types/types';
import SearchFilterBar from './SearchFilterBar';
import Pagination from './Pagination';

const SearchInputBar = () => {
    const [params, setParams] = useState<IParams>({
        q: '',
        sort: 'best match',
        order: 'desc',
        per_page: 10,
        page: 1
    });
    const [repos, setRepos] = useState<ISearchResult>();
    // const favCount = useSelector((state: RootState) => state.favCounter.value);
    // const dispatch = useDispatch();

    const fetchResults = async (params: IParams):Promise<void> => {
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
    
            const result: ISearchResult = {
                total_count: data.total_count,
                items: filteredItems
            }

            setRepos(result)
        } catch (error: unknown) {
            return console.log(error);
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e as KeyboardEvent).key === 'Enter') {
            fetchResults(params)
        }
    }


    return (
        <>
            <InputGroup>
                <InputLeftElement pointerEvents='none'> 
                    <SearchIcon color='gray.300'/>
                </InputLeftElement>
                <Input 
                    type='text'
                    placeholder='Search for GitHub Repository'
                    onChange={(e) => setParams(prev => ({
                        ...prev,
                        q: (e.target as HTMLInputElement).value
                    }))}
                    onKeyDown={handleKeyDown}
                />
                <InputRightAddon p={0}>
                    <Button borderLeftRadius={0} onClick={() => fetchResults(params)}>
                        Search
                    </Button>
                </InputRightAddon>
            </InputGroup>
            <SearchFilterBar/>
            {repos && repos.items.map((repo) => {
                return (
                    <SearchResultCard key={`${repo.id}`} result={repo} />
                )
            })}
            {repos && <Pagination currentPage={params.page} totalPages={Math.ceil(repos.total_count/params.per_page)}/>}
        </>
    )
}

export default SearchInputBar;