import React, { useState } from 'react';
import { Flex, Button, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { PaginationProps } from '../types/types';

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(currentPage);

  const handlePageChange = (page: number):void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageIndex(page);
    }
  };

  return (
    <Flex justify="center" align="center" marginTop={4} marginBottom={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous page"
        onClick={() => handlePageChange(currentPageIndex - 1)}
        isDisabled={currentPageIndex === 1}
        marginRight={2}
      />
      <Button variant="outline" mx={2} disabled>
        Page {currentPageIndex} of {totalPages}
      </Button>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next page"
        onClick={() => handlePageChange(currentPageIndex + 1)}
        isDisabled={currentPageIndex === totalPages}
        marginLeft={2}
      />
    </Flex>
  );
};

export default Pagination;