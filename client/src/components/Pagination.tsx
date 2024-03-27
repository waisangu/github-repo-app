import React, { useState } from 'react';
import { Flex, Button, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { PaginationProps } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/store';
import { changePage } from '../features/paramSettings/paramSettingsSlice';
import { fetchApi } from "../utils/fetchApi";

const Pagination = ({ setRepos, totalPages }: PaginationProps) => {
    const params = useSelector((state: RootState) => state.paramSettings);
    const dispatch = useDispatch();

    const handlePageChange = async (page: number):Promise<void> => {
        if (page >= 1 && page <= totalPages) {
            dispatch(changePage(page))
            try {
                const results = await fetchApi(params);
                if (results) {
                    setRepos(results);
                }
            } catch (error) {
                return console.log(error);
            }
        }
    };

    return (
        <Flex justify="center" align="center" marginTop={4} marginBottom={4}>
        <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Previous page"
            onClick={() => handlePageChange(params.page - 1)}
            isDisabled={params.page === 1}
            marginRight={2}
        />
        <Button variant="outline" mx={2} disabled>
            Page {params.page} of {totalPages}
        </Button>
        <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next page"
            onClick={() => handlePageChange(params.page + 1)}
            isDisabled={params.page === totalPages}
            marginLeft={2}
        />
        </Flex>
    );
};

export default Pagination;