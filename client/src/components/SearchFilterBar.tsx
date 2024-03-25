import React from "react";
import { Select, Stack } from '@chakra-ui/react';
import { AllowedSort, AllowedOrder } from "../types/types";

const SearchFilterBar = () => {

    const sortByOptions: AllowedSort[] = ['best match', 'stars', 'forks', 'help-wanted-issues', 'updated'];
    const orderByOptions: AllowedOrder[] = ['desc', 'asc'];

    const capitalizeFirstLetter = (word: string):string => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    return (
        <Stack direction='row' marginTop='0.25em'>
            <Select placeholder='Sort By' defaultValue='best match' width='20%'>
                {sortByOptions.map(option => (
                    <option value={option}>{capitalizeFirstLetter(option)}</option>
                ))}
            </Select>
            <Select placeholder='Order By' defaultValue='desc' width='20%'>
                {orderByOptions.map(option => (
                    <option value={option}>{capitalizeFirstLetter(option)+'ending'}</option>
                ))}
            </Select>
        </Stack>
    )
}

export default SearchFilterBar;