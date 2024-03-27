import React, { useEffect } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PaginationFavsProps } from "../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { changePage } from "../features/paramSettings/paramSettingsSlice";
import { fetchApi } from "../utils/fetchApi";

const PaginationFavs = ({
  setPage,
  currentPage,
  totalPages,
}: PaginationFavsProps) => {
  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  return (
    <Flex justify="center" align="center" marginTop={4} marginBottom={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous page"
        onClick={() => handlePageChange(currentPage - 1)}
        /* Handles negative pages  */
        isDisabled={currentPage === 1}
        marginRight={2}
      />
      <Button variant="outline" mx={2} disabled>
        Page {currentPage} of {totalPages}
      </Button>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next page"
        onClick={() => handlePageChange(currentPage + 1)}
        /* Page state cannot exceed total page */
        isDisabled={currentPage === totalPages}
        marginLeft={2}
      />
    </Flex>
  );
};

export default PaginationFavs;
