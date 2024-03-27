import React from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PaginationFavsProps } from "../types/types";

// Could have possibly used generic typing to reuse Pagination component
const PaginationFavs = ({
  setPage,
  currentPage,
  totalPages,
}: PaginationFavsProps) => {
  /* Passed the useState of parent component to rerender 
    new portion of the array if page changes onclick  */
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
