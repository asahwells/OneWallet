import React from 'react';
import { Button, HStack, Text, Box } from '@chakra-ui/react';
import { IPaginationProps } from '../interfaces';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }: IPaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            w="32px"
            h="32px"
            p="10px"
            variant="outline"
            fontSize="13px"
            fontWeight={600}
            lineHeight="15.73px"
            color={i === currentPage ? '#FFFFFF' : '#344256'}
            bg={i === currentPage ? '#C5B27D' : 'white'}
            _hover={{color: '#344256'}}
            borderColor={i === currentPage ? '#C5B27D' : 'gray.300'}
            borderRadius="8px"
          >
            {i}
          </Button>
        );
      }
    } else {
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          w="32px"
          h="32px"
          p="10px"
          variant="outline"
          fontSize="13px"
          fontWeight={600}
          lineHeight="15.73px"
          color={1 === currentPage ? '#FFFFFF' : '#344256'}
          bg={1 === currentPage ? '#C5B27D' : 'white'}
          _hover={{color: '#344256'}}
          borderColor={1 === currentPage ? '#C5B27D' : 'gray.300'}
          borderRadius="8px"
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        pageNumbers.push(<Text key="dots1">...</Text>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            w="32px"
            h="32px"
            p="10px"
            variant="outline"
            fontSize="13px"
            fontWeight={600}
            lineHeight="15.73px"
            color={i === currentPage ? '#FFFFFF' : '#344256'}
            bg={i === currentPage ? '#C5B27D' : 'white'}
            _hover={{color: '#344256'}}
            borderColor={i === currentPage ? '#C5B27D' : 'gray.300'}
            borderRadius="8px"
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<Text key="dots2">...</Text>);
      }

      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          w="32px"
          h="32px"
          p="10px"
          variant="outline"
          fontSize="13px"
          fontWeight={600}
          lineHeight="15.73px"
          color={totalPages === currentPage ? '#FFFFFF' : '#344256'}
          bg={totalPages === currentPage ? '#C5B27D' : 'white'}
          _hover={{color: '#344256'}}
          borderColor={totalPages === currentPage ? '#C5B27D' : 'gray.300'}
          borderRadius="8px"
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Box
      mt={4}
      mb={4}
      p="8px"
      bg={'#F8FAFC'}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <HStack spacing={2}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          variant="ghost"
          fontSize="13px"
          fontWeight={600}
          lineHeight="15.73px"
          color="#344256"
          colorScheme="gray"
        >
          Prev
        </Button>

        {renderPageNumbers()}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          variant="ghost"
          fontSize="13px"
          fontWeight={600}
          lineHeight="15.73px"
          color="#344256"
          colorScheme="gray"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default PaginationComponent;
