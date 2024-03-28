import React, { useEffect } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PaginationProps } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { changePage } from "../features/paramSettings/paramSettingsSlice";
import { fetchApi } from "../utils/fetchApi";

const Pagination = ({ setRepos, totalPages }: PaginationProps) => {
  // RTK hooks to call and use global paramter settings state
  const params = useSelector((state: RootState) => state.paramSettings);
  const dispatch = useDispatch();

  // Changes the global state of params if the page is changed
  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      dispatch(changePage(page));
    }
  };

  /* Refetches the API whenever parent or sibling components change the parameter settings, 
  allows for correct repos to be shown, the entire API response is not stored in state */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const results = await fetchApi(params, "/search/repositories", "GET");
        // Only update state of repos if fetch from API returns json, else do nothing
        if (results) {
          setRepos(results);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return (
    <Flex justify="center" align="center" marginTop={4} marginBottom={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous page"
        onClick={(): void => handlePageChange(params.page - 1)}
        /* Handles negative pages  */
        isDisabled={params.page === 1}
        marginRight={2}
      />
      <Button variant="outline" mx={2} disabled>
        Page {params.page} of {totalPages}
      </Button>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next page"
        onClick={(): void => handlePageChange(params.page + 1)}
        /* Page state cannot exceed total page */
        isDisabled={params.page === totalPages}
        marginLeft={2}
      />
    </Flex>
  );
};

export default Pagination;
