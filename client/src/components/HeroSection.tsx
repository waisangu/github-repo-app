import React, { KeyboardEvent, useEffect, useState } from 'react';
import { InputGroup, Input, InputLeftElement, InputRightAddon, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { changeQ } from "../features/paramSettings/paramSettingsSlice";
import SearchResultCard from './SearchResultCard';
import { IApiResponse } from '../types/octokit';
import SearchFilterBar from './SearchFilterBar';
import Pagination from './Pagination';
import { fetchApi } from '../utils/fetchApi';
import SearchResultAlert from './SearchResultAlert'

const HeroSection = () => {
    const params = useSelector((state: RootState) => state.paramSettings);
    const dispatch = useDispatch();
    const [repos, setRepos] = useState<IApiResponse>({
        total_count: -1,
        incomplete_results: true,
        items: []
    });
    
    const handleKeyDown = async (e: KeyboardEvent) => {
        if ((e as KeyboardEvent).key === 'Enter') {
            try {
                const results = await fetchApi(params);
                if (results) {
                    setRepos(results);
                }
            } catch (error) {
                return console.log(error);
            }
        }
    }

    const handleOnClick = async () => {
        console.log(repos)
        try {
            const results = await fetchApi(params);
            if (results) {
                setRepos(results);
            }
        } catch (error) {
            return console.error(error);
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
                    onChange={(e) => dispatch(changeQ(e.target.value))}
                    onKeyDown={handleKeyDown}
                />
                <InputRightAddon p={0}>
                    <Button 
                        borderLeftRadius={0} 
                        onClick={handleOnClick}
                    >
                        Search
                    </Button>
                </InputRightAddon>
            </InputGroup>
            <SearchFilterBar setRepos={setRepos}/>
            {repos.total_count > 0 && repos.items.map((repo) => {
                return (
                    <SearchResultCard
                        key={`${repo.id}`}
                        result={repo}
                    />
                )
            })}
            {repos.total_count === 0 && <SearchResultAlert/>}
            {repos.total_count > 0 && <Pagination setRepos={setRepos} totalPages={Math.ceil(repos.total_count/params.per_page)}/>}
        </>
    )
}

export default HeroSection;