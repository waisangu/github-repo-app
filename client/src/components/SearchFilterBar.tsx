import React from "react";
import { Select, Stack } from '@chakra-ui/react';
import { AllowedSort, AllowedOrder, SetStateProps } from "../types/types";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { changeSort, changeOrder } from "../features/paramSettings/paramSettingsSlice";
import { fetchResults } from "../utils/fetchResults";

const SearchFilterBar = ({setRepos}: SetStateProps) => {
    const params = useSelector((state: RootState) => state.paramSettings);
    const dispatch = useDispatch();

    const sortByOptions: AllowedSort[] = ['best match', 'stars', 'forks', 'help-wanted-issues', 'updated'];
    const orderByOptions: AllowedOrder[] = ['desc', 'asc'];

    const capitalizeFirstLetter = (word: string):string => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const handleSortChange = async (e: any) => {
        const { value } = e.target as unknown as { value: AllowedSort };
        dispatch(changeSort(value));
        try {
            const results = await fetchResults(params);
            if (results) {
                setRepos(results);
            }
        } catch (error) {
            return console.log(error);
        }
    }

    const handleOrderChange = async (e: any) => {
        const { value } = e.target as unknown as { value: AllowedOrder };
        dispatch(changeOrder(value));
        try {
            const results = await fetchResults(params);
            if (results) {
                setRepos(results);
            }
        } catch (error) {
            return console.log(error);
        }
    }

    return (
        <>
            <Stack direction='row' marginTop='0.25em'>
                <Select defaultValue={params.sort} width='25%' onChange={handleSortChange}>
                    <option hidden disabled value="">Sort By</option>
                    {sortByOptions.map((option, i) => (
                        <option key={`SortBy-${i}`} value={option}>{capitalizeFirstLetter(option)}</option>
                    ))}
                </Select>
                <Select defaultValue={params.order} width='25%' onChange={handleOrderChange}>
                    <option hidden disabled value="">Order By</option>
                    {orderByOptions.map((option, i) => (
                        <option key={`OrderBy-${i}`} value={option}>{capitalizeFirstLetter(option)+'ending'}</option>
                    ))}
                </Select>
            </Stack>
        </>
    )
}

export default SearchFilterBar;